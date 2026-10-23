/* Роутер и рендер страниц. */
(function () {
  var view = document.getElementById("view");
  var C = window.COURSE;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function h(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }
  function hash(str) { var x = 2166136261; for (var i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  function seeded(seed) { var s = seed || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function shuffle(arr, rnd) { var a = arr.slice(); rnd = rnd || Math.random; for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var tmp = a[i]; a[i] = a[j]; a[j] = tmp; } return a; }

  var ICON = {
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
  };

  /* ---------- Тема и язык ---------- */
  function applyTheme() {
    var th = Store.data.theme;
    if (th) document.documentElement.dataset.theme = th; else delete document.documentElement.dataset.theme;
  }
  document.getElementById("themeBtn").addEventListener("click", function () {
    var cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    Store.setTheme(cur === "dark" ? "light" : "dark"); applyTheme();
  });
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { I18N.lang = b.dataset.lang; Store.setLang(I18N.lang); route(); });
  });
  function chrome() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = U(el.dataset.i18n); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === I18N.lang)); });
    document.getElementById("themeBtn").setAttribute("aria-label", U("theme"));
    document.title = U("course_title") + " — Cherdak";
  }
  function setNav(key) { document.querySelectorAll("[data-nav]").forEach(function (a) { if (a.dataset.nav === key) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); }); }

  /* ---------- Разметка курса: ударения и тоны красным ---------- */
  var MARKS = { "ˈ": '<span class="tm tm-st">ˈ</span>', "ˌ": '<span class="tm tm-hs">ˌ</span>',
    "ˋ": '<span class="tm tm-hi">\\</span>', "ˎ": '<span class="tm tm-lo">\\</span>', "˴": '<span class="tm">\\</span>',
    "ˊ": '<span class="tm tm-hi">/</span>', "ˏ": '<span class="tm tm-lo">/</span>', "˵": '<span class="tm">/</span>',
    "ˇ": '<span class="tm">\\/</span>', "ˆ": '<span class="tm">/\\</span>', "˗": '<span class="tm">&gt;</span>' };
  var MARK_RE = /[ˈˌˋˎ˴ˊˏ˵ˇˆ˗]/;
  function markText(node) {
    if (node.nodeType === 3) {
      var p = node.parentNode;
      if (!p || p.closest && (p.closest(".tm, .acc-v") || p.closest("svg") || p.closest("textarea,input,script,style"))) return;
      var txt = node.nodeValue, inTone = p.closest && p.closest(".fg-tone, .tn"), inIpa = p.closest && p.closest(".ipa");
      var ruAcc = inIpa && /[óáéíúý\u0301]/.test(txt);
      if (!MARK_RE.test(txt) && !(inTone && /[|¦]/.test(txt)) && !ruAcc) return;
      var html = App.esc(txt).replace(/[ˈˌˋˎ˴ˊˏ˵ˇˆ˗]/g, function (c) { return MARKS[c]; });
      if (ruAcc) html = html.replace(/([^\s\[\]])\u0301/g, '<span class="acc-v">$1\u0301</span>').replace(/[óáéíúý]/g, function (c) { return '<span class="acc-v">' + c + "</span>"; });
      if (inTone) html = html.replace(/\|\||\||¦/g, function (c) { return '<span class="tm tm-p">' + c + "</span>"; });
      var span = document.createElement("span"); span.innerHTML = html;
      while (span.firstChild) p.insertBefore(span.firstChild, node);
      p.removeChild(node);
    } else if (node.nodeType === 1 && !node.closest("svg") && !node.classList.contains("tm")) {
      Array.prototype.slice.call(node.childNodes).forEach(markText);
    }
  }
  new MutationObserver(function (list) { list.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1 || n.nodeType === 3) markText(n); }); }); })
    .observe(view, { childList: true, subtree: true });

  /* ---------- Тест (вопросы множественного выбора) ---------- */
  function renderQuiz(host, items, qidBase) {
    items.forEach(function (q, qi) {
      var qid = qidBase + "-" + qi;
      var order = shuffle(q.options.map(function (_, i) { return i; }), seeded(hash(typeof q.q === "string" ? q.q : q.q.ru)));
      var box = h('<div class="quiz"><p class="q">' + L(q.q) + '</p><div class="opts" role="group"></div><div class="row" style="margin-top:12px"><button type="button" class="btn btn-sm">' + U("check") + '</button></div><div class="fb" aria-live="polite"></div></div>');
      var opts = box.querySelector(".opts"); var chosen = null;
      order.forEach(function (oi) {
        var b = h('<button type="button" class="opt" aria-pressed="false"><span class="mk"></span><span>' + L(q.options[oi]) + '</span></button>');
        b.dataset.i = oi;
        b.addEventListener("click", function () {
          if (box.dataset.done) return;
          opts.querySelectorAll(".opt").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
          b.setAttribute("aria-pressed", "true"); chosen = oi;
        });
        opts.appendChild(b);
      });
      box.querySelector(".btn").addEventListener("click", function () {
        if (chosen == null || box.dataset.done) return;
        box.dataset.done = "1";
        var ok = chosen === q.answer;
        opts.querySelectorAll(".opt").forEach(function (o) {
          var i = +o.dataset.i; if (i === q.answer) o.classList.add("ok"); else if (i === chosen) o.classList.add("bad");
          o.disabled = true;
        });
        box.querySelector(".fb").innerHTML = '<div class="feedback ' + (ok ? "ok" : "bad") + '"><b>' + (ok ? U("right") : U("wrong")) + '</b> ' + L(q.explain) + '</div>';
        this.disabled = true;
        Store.quizAnswer(qid, ok);
      });
      host.appendChild(box);
    });
  }

  /* ---------- Задание с раундами и порогом ---------- */
  function runTask(host, task, opts) {
    opts = opts || {};
    var n = Math.min(task.n || 8, task.bank.length), pass = task.pass || Math.ceil(n * 0.8);
    var wrap = h('<div class="task-run"></div>');
    host.appendChild(wrap);
    function start() {
      var items = shuffle(task.bank).slice(0, n), i = 0, score = 0;
      function item() {
        var it = items[i];
        var options = it.o || task.options;
        var idx = options.map(function (_, k) { return k; });
        if (!task.fixed && !it.fixed) idx = shuffle(idx);
        var prev = Store.task(task.id);
        wrap.innerHTML = '<div class="task-head"><span class="task-count">' + (i + 1) + ' / ' + n + '</span><span class="task-score">' + U("score") + ': ' + score + '</span>' + (prev && prev.passed ? '<span class="badge-done">' + U("done_badge") + '</span>' : "") + '</div>' +
          '<div class="task-prompt">' + L(it.p) + '</div><div class="opts task-opts"></div><div class="fb" aria-live="polite"></div>';
        var box = wrap.querySelector(".task-opts");
        idx.forEach(function (k) {
          var b = h('<button type="button" class="opt"><span class="mk"></span><span>' + L(options[k]) + '</span></button>');
          b.addEventListener("click", function () {
            if (wrap.dataset.lock) return; wrap.dataset.lock = "1";
            var ok = k === it.a; if (ok) score++;
            box.querySelectorAll(".opt").forEach(function (o, j) { var kk = idx[j]; if (kk === it.a) o.classList.add("ok"); else if (o === b) o.classList.add("bad"); o.disabled = true; });
            var fb = wrap.querySelector(".fb");
            fb.innerHTML = '<div class="feedback ' + (ok ? "ok" : "bad") + '"><b>' + (ok ? U("right") : U("wrong")) + '</b> ' + L(it.e) + '</div><div class="row" style="margin-top:12px"><button type="button" class="btn btn-sm">' + (i + 1 < n ? U("next_item") : U("score")) + '</button></div>';
            fb.querySelector("button").addEventListener("click", function () { delete wrap.dataset.lock; i++; if (i < n) item(); else finish(); });
            fb.querySelector("button").focus();
          });
          box.appendChild(b);
        });
      }
      function finish() {
        var ok = score >= pass;
        if (ok && task.id) Store.taskDone(task.id, score, n); else if (task.id) Store.taskScore(task.id, score, n);
        wrap.innerHTML = '<div class="task-result ' + (ok ? "ok" : "bad") + '"><div class="big">' + score + ' ' + U("of") + ' ' + n + '</div><p>' + (ok ? U("passed") : U("failed")) + '</p><p class="muted">' + U("pass_note") + ' ' + pass + ' ' + U("of") + ' ' + n + '.</p><button type="button" class="btn">' + U("new_set") + '</button></div>';
        wrap.querySelector("button").addEventListener("click", start);
        if (opts.onFinish) opts.onFinish(ok);
      }
      item();
    }
    var intro = h('<div class="task-intro"><p class="muted">' + U("pass_note") + ' ' + pass + ' ' + U("of") + ' ' + n + '.</p><button type="button" class="btn">' + U("start") + '</button></div>');
    var prev = Store.task(task.id);
    if (prev && prev.passed) intro.insertBefore(h('<span class="badge-done">' + U("done_badge") + ' · ' + prev.best + ' ' + U("of") + ' ' + prev.total + '</span>'), intro.firstChild);
    wrap.appendChild(intro);
    intro.querySelector("button").addEventListener("click", start);
  }

  /* ---------- Карточка ---------- */
  function renderCard(card, mod, stepIdx) {
    var html = '<span class="kind ' + card.kind + '"><i></i>' + U("kind_" + card.kind) + '</span><h2>' + L(card.title) + '</h2>';
    if (card.body) html += '<div class="lesson">' + card.body.map(function (p) { return "<p>" + L(p) + "</p>"; }).join("") + "</div>";
    if (card.points) html += '<ul class="points">' + card.points.map(function (p) { return "<li>" + L(p) + "</li>"; }).join("") + "</ul>";
    if (card.figure) html += '<figure class="fig">' + Figures[card.figure]() + "</figure>";
    if (card.demo) html += '<div class="demo" data-demo="' + card.demo + '"></div>';
    if (card.task) html += '<div class="task-host"></div>';
    if (card.quiz) html += '<div class="quiz-host"></div>';
    if (card.fact) html += '<aside class="fact"><span class="fact-k">' + U("fact") + '</span><p>' + L(card.fact.text) + '</p><span class="fact-ref">' + card.fact.ref + "</span></aside>";
    if (card.sources) html += '<p class="src">' + U("sources") + ": " + card.sources.map(L).join("; ") + "</p>";
    var el = document.createElement("div"); el.innerHTML = html;
    if (card.demo) { var d = el.querySelector(".demo"); Demos[card.demo](d, { L: L, U: U, h: h, esc: esc, shuffle: shuffle, done: function () { Store.taskDone("demo-" + mod.id + "-" + stepIdx, 1, 1); } }); }
    if (card.task) runTask(el.querySelector(".task-host"), card.task);
    if (card.quiz) renderQuiz(el.querySelector(".quiz-host"), card.quiz, "q-" + mod.id + "-" + stepIdx);
    return el;
  }

  /* ---------- Страницы ---------- */
  function statusPill(id) {
    var s = Store.status(id);
    return '<span class="pill ' + (s === "done" ? "pill-done" : s === "progress" ? "pill-progress" : "") + '">' + U("status_" + s) + "</span>";
  }

  function pageMap() {
    setNav("course");
    var all = C.modules(), done = all.filter(function (m) { return Store.status(m.id) === "done"; }).length;
    var pct = all.length ? Math.round(done / all.length * 100) : 0;
    var html = '<section class="hero"><div class="eyebrow">Cherdak · Theoretical Phonetics Lab</div><h1>' + U("course_title") + '</h1><p class="lead">' + U("course_lead") + '</p>' +
      '<div class="hero-progress"><div class="bar"><i style="width:' + pct + '%"></i></div><span>' + done + " / " + all.length + " " + U("progress_of") + '</span></div></section><section class="sheet">';
    C.seminars.forEach(function (s) {
      html += '<div class="sem" id="sem-' + s.n + '"><div class="sem-head"><span class="sem-n">' + U("seminar") + " " + s.n + '</span><h2 class="section-title">' + L(s.title) + "</h2>" + (s.goal ? '<p class="section-sub">' + L(s.goal) + "</p>" : "") + "</div>";
      if (!s.modules || !s.modules.length) {
        html += '<div class="soon"><span class="pill">' + U("soon_short") + "</span><p>" + U("soon") + "</p></div>";
      } else {
        html += '<div class="grid">' + s.modules.map(function (m) {
          return '<a class="mod-card" href="#/m/' + m.id + '/1"><span class="num">' + U("topic") + " " + m.num + "</span><h3>" + L(m.title) + "</h3><p>" + L(m.goal) + '</p><div class="pills"><span class="pill">' + m.minutes + " " + U("min") + "</span>" + statusPill(m.id) + "</div></a>";
        }).join("") + "</div>";
      }
      html += "</div>";
    });
    html += '<h2 class="section-title" style="margin-top:36px">' + U("extras") + '</h2><div class="grid">' +
      extra("#/trainer", U("trainer_title"), L(t("Смешанные наборы заданий по всем темам семинаров.", "Mixed sets of tasks across all seminar topics."))) +
      extra("#/glossary", U("glossary_title"), L(t("Термины из планов семинаров с определениями.", "Terms from the seminar plans with definitions."))) +
      extra("#/reading", U("reading_title"), L(t("Учебники и исследования, на которых построен курс.", "The textbooks and research behind the course."))) +
      extra("#/progress", U("progress_title"), L(t("Пройденные темы, зачтённые задания, сохранение в файл.", "Topics done, tasks passed, saving to a file."))) + "</div></section>";
    view.innerHTML = html;
    function extra(href, title, text) { return '<a class="mod-card extra" href="' + href + '"><h3>' + title + "</h3><p>" + text + "</p></a>"; }
  }

  function pageModule(id, step) {
    var mod = C.byId(id);
    if (!mod) return notFound();
    setNav("course");
    var cards = mod.cards, total = cards.length + 1;
    step = Math.max(1, Math.min(total, step || 1));
    Store.seen(id, step);
    var seen = Store.seenSteps(id);
    var dots = "";
    for (var i = 1; i <= total; i++) dots += '<a href="#/m/' + id + "/" + i + '" class="' + (i === step ? "cur " : seen.indexOf(i) >= 0 ? "seen " : "") + (i === total ? "fin" : "") + '" aria-label="' + U("step") + " " + i + '"' + (i === step ? ' aria-current="step"' : "") + "></a>";
    view.innerHTML = '<section class="mod-head"><a class="back chev-l" href="#/#sem-' + mod.seminar + '">' + U("back_map") + '</a><div class="eyebrow">' + U("seminar") + " " + mod.seminar + " · " + U("topic") + " " + mod.num + "</div><h1>" + L(mod.title) + '</h1><p class="lead">' + L(mod.goal) + '</p><nav class="dots" aria-label="' + U("step") + '">' + dots + '</nav></section><section class="stage" id="stage"></section>';
    var stage = document.getElementById("stage");
    if (step <= cards.length) stage.appendChild(renderCard(cards[step - 1], mod, step));
    else stage.appendChild(summary(mod));
    var nextMod = C.next(id);
    var nav = h('<div class="stage-nav"></div>');
    nav.appendChild(step > 1 ? h('<a class="btn btn-ghost chev-l" href="#/m/' + id + "/" + (step - 1) + '">' + U("prev") + "</a>") : h('<a class="btn btn-ghost chev-l" href="#/#sem-' + mod.seminar + '">' + U("to_map") + "</a>"));
    nav.appendChild(h('<span class="count">' + U("step") + " " + step + " / " + total + "</span>"));
    if (step < total) nav.appendChild(h('<a class="btn chev-r" href="#/m/' + id + "/" + (step + 1) + '">' + U("next") + "</a>"));
    else nav.appendChild(nextMod ? h('<a class="btn chev-r" href="#/m/' + nextMod.id + '/1">' + U("next_topic") + "</a>") : h('<a class="btn chev-r" href="#/">' + U("to_map") + "</a>"));
    stage.appendChild(nav);
  }

  function summary(mod) {
    var el = document.createElement("div");
    var rd = (mod.readings || []).map(function (k) { return readingItem(C.R[k]); }).join("");
    el.innerHTML = '<span class="kind check"><i></i>' + U("kind_sum") + "</span><h2>" + U("sum_title") + '</h2><ul class="cheats">' + mod.cheatsheet.map(function (c) { return "<li>" + L(c) + "</li>"; }).join("") + "</ul>" +
      (rd ? '<h3 class="h3">' + U("sum_read") + '</h3><ul class="rd">' + rd + "</ul>" : "") + '<div class="row" style="margin-top:24px" id="doneRow"></div>';
    var row = el.querySelector("#doneRow");
    function paint() {
      row.innerHTML = Store.status(mod.id) === "done" ? '<span class="badge-done">' + U("marked") + "</span>" : '<button type="button" class="btn">' + U("mark_done") + "</button>";
      var b = row.querySelector("button"); if (b) b.addEventListener("click", function () { Store.markDone(mod.id); paint(); });
    }
    paint();
    return el;
  }

  function readingItem(r) {
    if (!r) return "";
    var title = L(r.title);
    var ttl = r.url ? '<a class="ttl" href="' + r.url + '" target="_blank" rel="noopener">' + title + "</a>" : '<span class="ttl ttl-plain">' + title + "</span>";
    var meta = [r.author, r.site, L(r.kindLabel || (r.type === "book" ? t("книга", "book") : r.type === "article" ? t("статья", "article") : t("онлайн", "online"))), r.lang].filter(Boolean).join(" · ");
    return "<li>" + (r.type === "online" ? ICON.link : ICON.book) + "<div>" + ttl + '<div class="meta">' + meta + "</div></div></li>";
  }

  function pageTrainer() {
    setNav("trainer");
    view.innerHTML = '<section class="page-head"><h1>' + U("trainer_title") + '</h1><p class="lead">' + U("trainer_lead") + '</p></section><section class="sheet"><div class="row trainer-pick" role="group"></div><div id="trainerHost"></div></section>';
    var pick = view.querySelector(".trainer-pick"), host = document.getElementById("trainerHost");
    var opts = [{ v: 0, l: U("all_seminars") }].concat(C.seminars.filter(function (s) { return s.modules && s.modules.length; }).map(function (s) { return { v: s.n, l: U("seminar") + " " + s.n }; }));
    var cur = 0;
    function paint() {
      pick.innerHTML = opts.map(function (o) { return '<button type="button" class="btn btn-sm ' + (o.v === cur ? "" : "btn-ghost") + '" data-v="' + o.v + '" aria-pressed="' + (o.v === cur) + '">' + o.l + "</button>"; }).join("");
      pick.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { cur = +b.dataset.v; paint(); }); });
      host.innerHTML = "";
      runTask(host, Trainer.build(cur));
    }
    paint();
  }

  function pageGlossary() {
    setNav("glossary");
    view.innerHTML = '<section class="page-head"><h1>' + U("glossary_title") + '</h1><p class="lead">' + U("glossary_lead") + '</p></section><section class="sheet"><label class="search"><span class="vh">' + U("search") + '</span><input type="search" id="gq" placeholder="' + U("search") + '"></label><div id="glist"></div></section>';
    var list = document.getElementById("glist"), q = document.getElementById("gq");
    function paint() {
      var s = q.value.trim().toLowerCase(), html = "";
      C.seminars.forEach(function (sem) {
        var items = (C.glossary[sem.n] || []).filter(function (g) { return !s || (g.term + " " + g.en + " " + g.ru + " " + (g.ruTerm || "")).toLowerCase().indexOf(s) >= 0; });
        if (!items.length) return;
        html += '<h2 class="section-title">' + U("seminar") + " " + sem.n + '</h2><dl class="gloss">' + items.map(function (g) {
          return "<div><dt>" + g.term + (g.ruTerm ? ' <span class="ru-term">' + g.ruTerm + "</span>" : "") + '</dt><dd><p lang="en">' + g.en + "</p>" + (I18N.lang === "ru" ? '<p class="gl-ru">' + g.ru + "</p>" : "") + "</dd></div>";
        }).join("") + "</dl>";
      });
      list.innerHTML = html || '<p class="muted">' + U("nothing") + "</p>";
    }
    q.addEventListener("input", paint); paint();
  }

  function pageReading() {
    setNav("reading");
    var groups = [["books", U("rd_books")], ["research", U("rd_research")], ["tools", U("rd_tools")]];
    var html = '<section class="page-head"><h1>' + U("reading_title") + '</h1><p class="lead">' + U("reading_lead") + '</p></section><section class="sheet">';
    groups.forEach(function (g) {
      var items = Object.keys(C.R).filter(function (k) { return C.R[k].group === g[0]; });
      if (!items.length) return;
      html += '<h2 class="section-title">' + g[1] + '</h2><ul class="rd" style="margin-bottom:28px">' + items.map(function (k) { return readingItem(C.R[k]); }).join("") + "</ul>";
    });
    view.innerHTML = html + "</section>";
  }

  function pageProgress() {
    setNav("progress");
    var tasks = Object.keys(Store.data.tasks).filter(function (k) { return Store.data.tasks[k].passed; }).length;
    var html = '<section class="page-head"><h1>' + U("progress_title") + '</h1><p class="lead">' + U("progress_lead") + '</p></section><section class="sheet"><p class="muted">' + U("tasks_done") + ": " + tasks + "</p>";
    C.seminars.forEach(function (s) {
      html += '<h2 class="section-title">' + U("seminar") + " " + s.n + ". " + L(s.title) + "</h2>";
      if (!s.modules || !s.modules.length) { html += '<p class="muted">' + U("soon") + "</p>"; return; }
      html += '<ul class="prog">' + s.modules.map(function (m) { return '<li><a href="#/m/' + m.id + '/1"><span class="num">' + m.num + "</span> " + L(m.title) + "</a>" + statusPill(m.id) + "</li>"; }).join("") + "</ul>";
    });
    html += '<div class="row" style="margin-top:28px"><button type="button" class="btn" id="exp">' + U("export") + '</button><label class="btn btn-ghost" for="imp">' + U("import") + '</label><input type="file" id="imp" accept="application/json" class="vh"><button type="button" class="btn btn-ghost" id="rst">' + U("reset_all") + '</button></div><p class="muted" id="pmsg" aria-live="polite"></p></section>';
    view.innerHTML = html;
    document.getElementById("exp").addEventListener("click", function () {
      var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([Store.exportJSON()], { type: "application/json" }));
      a.download = "cherdak-phonetics-progress.json"; a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    document.getElementById("imp").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return; var r = new FileReader();
      r.onload = function () { try { Store.importJSON(r.result); pageProgress(); document.getElementById("pmsg").textContent = U("imported"); } catch (err) { document.getElementById("pmsg").textContent = U("import_err"); } };
      r.readAsText(f);
    });
    var armed = false;
    document.getElementById("rst").addEventListener("click", function () {
      if (!armed) { armed = true; document.getElementById("pmsg").textContent = U("reset_confirm"); return; }
      Store.reset(); pageProgress();
    });
  }

  function notFound() { view.innerHTML = '<section class="page-head"><h1>404</h1><p class="lead">' + U("notfound") + '</p></section><section class="sheet"><a class="btn" href="#/">' + U("to_map") + "</a></section>"; }

  /* ---------- Роутер ---------- */
  function route() {
    chrome();
    var hsh = location.hash || "#/";
    var parts = hsh.replace(/^#\/?/, "").split("#")[0].split("/");
    var anchor = hsh.split("#")[2];
    if (!parts[0]) pageMap();
    else if (parts[0] === "m") pageModule(parts[1], parseInt(parts[2], 10));
    else if (parts[0] === "trainer") pageTrainer();
    else if (parts[0] === "glossary") pageGlossary();
    else if (parts[0] === "reading") pageReading();
    else if (parts[0] === "progress") pageProgress();
    else notFound();
    if (anchor) { var el = document.getElementById(anchor); if (el) { el.scrollIntoView(); return; } }
    window.scrollTo(0, 0);
  }

  window.App = { runTask: runTask, renderQuiz: renderQuiz, shuffle: shuffle, esc: esc };
  I18N.lang = Store.data.lang || "ru";
  applyTheme();
  window.addEventListener("hashchange", function () { route(); var v = document.getElementById("view"); if (v && !location.hash.split("#")[2]) v.focus({ preventScroll: true }); });
  route();
})();
