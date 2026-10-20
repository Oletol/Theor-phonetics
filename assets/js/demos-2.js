/* Дополнительные демо: интонирование фразы по шагам. */
(function () {
  var E = function (s) { return '<span class="ex">' + s + "</span>"; };
  var FALLS = ["lf", "mf", "hf"], RISES = ["lr", "mr", "hr", "fr"];
  var TONES = [
    { k: "lf", m: "ˎ", n: t("низкий нисходящий", "Low Fall") }, { k: "hf", m: "ˋ", n: t("высокий нисходящий", "High Fall") },
    { k: "lr", m: "ˏ", n: t("низкий восходящий", "Low Rise") }, { k: "hr", m: "ˊ", n: t("высокий восходящий", "High Rise") },
    { k: "fr", m: "ˇ", n: t("нисходяще-восходящий", "Fall-Rise") }, { k: "ml", m: "˗", n: t("средний ровный", "Mid-Level") }
  ];
  var SENT = [
    { w: ["I", "don’t", "want", "to", "go", "to", "the", "cinema."], pauses: [], nuc: [7], ok: [FALLS],
      model: "I ˈdon’t ˈwant to ˈgo to the ˋcinema. ||",
      syl: [{ t: "I", y: .2, k: "u" }, { t: "don’t", y: .92, k: "s" }, { t: "want", y: .82, k: "s" }, { t: "to", y: .78, k: "u" }, { t: "go", y: .72, k: "s" }, { t: "to", y: .68, k: "u" }, { t: "the", y: .64, k: "u" }, { t: "ci", y: .95, k: "f", y2: .03, n: true }, { t: "ne", y: .02, k: "u" }, { t: "ma", y: .02, k: "u" }],
      e: t("Утверждение: ядро на последнем знаменательном слове, нисходящий тон. Шкала нисходящая ступенчатая.", "A statement: the nucleus is on the last content word, with a falling tone. The head is descending stepping.") },
    { w: ["Are", "you", "coming", "tomorrow?"], pauses: [], nuc: [3], ok: [RISES],
      model: "Are you ˈcoming toˇmorrow? ||",
      syl: [{ t: "Are", y: .2, k: "u" }, { t: "you", y: .2, k: "u" }, { t: "co", y: .82, k: "s" }, { t: "ming", y: .8, k: "u" }, { t: "to", y: .78, k: "u" }, { t: "mor", y: .8, k: "fr", y2: .1, y3: .5, n: true }, { t: "row", y: .48, k: "u" }],
      e: t("Общий вопрос: восходящий или нисходяще-восходящий тон. По Линдси, высокая шкала и нисходяще-восходящий — нейтральный вариант в SSB.", "A yes-no question: a rise or a Fall-Rise. According to Lindsey, a high head and a Fall-Rise is the neutral SSB option.") },
    { w: ["When", "we", "get", "home,", "we’ll", "have", "dinner."], pauses: [3], nuc: [3, 6], ok: [RISES.concat(["ml"]), FALLS],
      model: "When we ˈget ˏhome | we’ll ˈhave ˎdinner. ||",
      syl: [{ t: "When", y: .2, k: "u" }, { t: "we", y: .2, k: "u" }, { t: "get", y: .88, k: "s" }, { t: "home", y: .05, k: "r", y2: .42, n: true, b: true }, { t: "we’ll", y: .2, k: "u" }, { t: "have", y: .8, k: "s" }, { t: "din", y: .45, k: "f", y2: .03, n: true }, { t: "ner", y: .02, k: "u" }],
      e: t("Две интонационные группы. Первая не завершает мысль — восходящий тон незавершённости; вторая — нисходящий.", "Two intonation groups. The first does not complete the thought — a continuation rise; the second takes a fall.") },
    { w: ["Would", "you", "like", "tea", "or", "coffee?"], pauses: [3], nuc: [3, 5], ok: [RISES, FALLS],
      model: "Would you ˈlike ˏtea | or ˎcoffee? ||",
      syl: [{ t: "Would", y: .2, k: "u" }, { t: "you", y: .2, k: "u" }, { t: "like", y: .88, k: "s" }, { t: "tea", y: .1, k: "r", y2: .5, n: true, b: true }, { t: "or", y: .2, k: "u" }, { t: "cof", y: .5, k: "f", y2: .03, n: true }, { t: "fee", y: .02, k: "u" }],
      e: t("Альтернативный вопрос: первый вариант с восходящим тоном, последний — с нисходящим, который закрывает выбор.", "An alternative question: the first option rises, the last one falls, closing the choice.") },
    { w: ["What", "time", "does", "the", "film", "start?"], pauses: [], nuc: [5], ok: [FALLS],
      model: "ˈWhat ˈtime does the ˈfilm ˋstart? ||",
      syl: [{ t: "What", y: .95, k: "s" }, { t: "time", y: .85, k: "s" }, { t: "does", y: .8, k: "u" }, { t: "the", y: .76, k: "u" }, { t: "film", y: .7, k: "s" }, { t: "start", y: .92, k: "f", y2: .03, n: true }],
      e: t("Специальный вопрос: нисходящий тон. Вопросительное слово стоит в начале шкалы.", "A wh-question: a falling tone. The question word opens the head.") }
  ];

  Demos.intone = function (el) {
    var si = 0, pauses = {}, nuc = {}, tone = {}, step = 1;
    function groups(sen) { var g = [], cur = []; sen.w.forEach(function (w, i) { cur.push(i); if (pauses[i]) { g.push(cur); cur = []; } }); g.push(cur); return g; }
    function paint(msg) {
      var sen = SENT[si], gs = groups(sen);
      var words = sen.w.map(function (w, i) {
        var isN = nuc[i] != null, cls = "in-w" + (isN ? " on" : "");
        var gap = i < sen.w.length - 1 ? '<button type="button" class="in-gap' + (pauses[i] ? " on" : "") + '" data-g="' + i + '" aria-label="' + L(t("Пауза после", "Pause after")) + " " + w + '"' + (step !== 1 ? " disabled" : "") + ">" + (pauses[i] ? "|" : "") + "</button>" : "";
        return '<button type="button" class="' + cls + '" data-w="' + i + '"' + (step !== 2 ? " disabled" : "") + ">" + w + "</button>" + gap;
      }).join("");
      var html = '<div class="intone"><ol class="in-steps"><li class="' + (step === 1 ? "cur" : "") + '">' + L(t("Поставь паузы между интонационными группами (или пропусти шаг).", "Place pauses between intonation groups (or skip the step).")) + '</li><li class="' + (step === 2 ? "cur" : "") + '">' + L(t("Найди ядро в каждой группе: нажми на слово.", "Find the nucleus in each group: click the word.")) + '</li><li class="' + (step === 3 ? "cur" : "") + '">' + L(t("Выбери ядерный тон для каждой группы.", "Choose the nuclear tone for each group.")) + "</li></ol>" +
        '<div class="in-line">' + words + "</div>";
      if (step === 3) {
        html += gs.map(function (g, gi) {
          var nw = g.filter(function (i) { return nuc[i] != null; })[0];
          return '<div class="in-tone"><span class="muted">' + L(t("Группа", "Group")) + " " + (gi + 1) + (nw != null ? ": " + E(sen.w[nw]) : "") + '</span><div class="seg">' + TONES.map(function (tn) { return '<button type="button" role="radio" aria-checked="' + (tone[gi] === tn.k) + '" data-gi="' + gi + '" data-t="' + tn.k + '"><span class="tn">' + tn.m + "</span> " + L(tn.n) + "</button>"; }).join("") + "</div></div>";
        }).join("");
      }
      html += '<div class="row" style="margin-top:12px">' + (step < 3 ? '<button type="button" class="btn btn-sm" data-act="next">' + U("next") + "</button>" : '<button type="button" class="btn btn-sm" data-act="check">' + U("check") + "</button>") + '<button type="button" class="btn btn-sm btn-ghost" data-act="other">' + L(t("Другая фраза", "Another phrase")) + '</button></div><div class="fb" aria-live="polite">' + (msg || "") + "</div></div>";
      el.innerHTML = html;
      el.querySelectorAll(".in-gap").forEach(function (b) { b.addEventListener("click", function () { var g = +b.dataset.g; pauses[g] = !pauses[g]; paint(); }); });
      el.querySelectorAll(".in-w").forEach(function (b) { b.addEventListener("click", function () {
        var i = +b.dataset.w, gs2 = groups(sen), g = gs2.filter(function (gg) { return gg.indexOf(i) >= 0; })[0];
        g.forEach(function (j) { delete nuc[j]; }); nuc[i] = true; paint();
      }); });
      el.querySelectorAll(".in-tone button").forEach(function (b) { b.addEventListener("click", function () { tone[+b.dataset.gi] = b.dataset.t; paint(); }); });
      var nx = el.querySelector('[data-act="next"]'); if (nx) nx.addEventListener("click", function () {
        if (step === 1) {
          var want = sen.pauses.slice().sort().join(","), got = Object.keys(pauses).filter(function (k) { return pauses[k]; }).sort().join(",");
          var ok = want === got;
          if (!ok) { pauses = {}; sen.pauses.forEach(function (p) { pauses[p] = true; }); }
          step = 2; paint('<div class="feedback ' + (ok ? "ok" : "bad") + '"><b>' + (ok ? U("right") : U("wrong")) + "</b> " + L(sen.pauses.length ? t("Здесь две интонационные группы; пауза поставлена по образцу.", "There are two intonation groups here; the pause is now placed as in the model.") : t("Фраза произносится одной интонационной группой.", "The phrase is said as one intonation group.")) + "</div>");
        } else if (step === 2) {
          var gs3 = groups(sen), ok2 = gs3.every(function (g, gi) { return nuc[sen.nuc[gi]] != null; });
          if (!ok2) { nuc = {}; sen.nuc.forEach(function (n) { nuc[n] = true; }); }
          step = 3; paint('<div class="feedback ' + (ok2 ? "ok" : "bad") + '"><b>' + (ok2 ? U("right") : U("wrong")) + "</b> " + L(t("Ядро — последнее знаменательное слово группы, несущее новую информацию.", "The nucleus is the last content word of the group carrying new information.")) + "</div>");
        }
      });
      var ck = el.querySelector('[data-act="check"]'); if (ck) ck.addEventListener("click", function () {
        var gs4 = groups(sen), ok3 = gs4.every(function (g, gi) { return sen.ok[gi].indexOf(tone[gi]) >= 0; });
        paint('<div class="feedback ' + (ok3 ? "ok" : "bad") + '"><b>' + (ok3 ? U("right") : U("wrong")) + "</b> " + L(sen.e) + '</div><div class="in-model"><div class="fg-h">' + L(t("Образец", "Model")) + '</div><p class="fg-tone">' + sen.model + '</p><div class="fg-scroll">' + Figures._staff(sen.syl, { label: sen.model, end: "||" }) + "</div></div>");
      });
      el.querySelector('[data-act="other"]').addEventListener("click", function () { si = (si + 1) % SENT.length; pauses = {}; nuc = {}; tone = {}; step = 1; paint(); });
    }
    paint();
  };
})();
