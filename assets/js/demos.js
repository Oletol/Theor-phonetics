/* Интерактивные демо. Каждая функция монтирует упражнение в переданный элемент. */
(function () {
  var I = function (s) { return '<span class="ipa">' + s + "</span>"; };
  var E = function (s) { return '<span class="ex">' + s + "</span>"; };

  /* Общий движок «отметь подходящие» */
  function pick(el, ctx, items, rule) {
    el.innerHTML = '<div class="pick">' + items.map(function (it, i) {
      return '<button type="button" class="pick-b" aria-pressed="false" data-i="' + i + '"><span class="pick-t">' + L(it.t) + "</span></button>";
    }).join("") + '</div><div class="row" style="margin-top:14px"><button type="button" class="btn btn-sm" data-act="check">' + U("check") + '</button><button type="button" class="btn btn-sm btn-ghost" data-act="reset">' + U("reset") + '</button></div><div class="fb" aria-live="polite"></div>';
    el.querySelectorAll(".pick-b").forEach(function (b) { b.addEventListener("click", function () { if (el.dataset.done) return; b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")); }); });
    el.querySelector('[data-act="check"]').addEventListener("click", function () {
      el.dataset.done = "1"; var right = 0;
      el.querySelectorAll(".pick-b").forEach(function (b) {
        var it = items[+b.dataset.i], on = b.getAttribute("aria-pressed") === "true";
        if (on === !!it.ok) right++;
        b.classList.add(it.ok ? "ok" : (on ? "bad" : "neutral"));
        if (it.ok && !on) b.classList.add("missed");
      });
      var all = right === items.length;
      el.querySelector(".fb").innerHTML = '<div class="feedback ' + (all ? "ok" : "bad") + '"><b>' + right + " " + U("of") + " " + items.length + ".</b> " + L(rule) + "</div>";
      if (all) ctx.done();
    });
    el.querySelector('[data-act="reset"]').addEventListener("click", function () { pick(el, ctx, items, rule); });
  }

  function seg(opts, cur, name) {
    return '<div class="seg" role="radiogroup" aria-label="' + (name || "") + '">' + opts.map(function (o) { return '<button type="button" role="radio" aria-checked="' + (o.v === cur) + '" data-v="' + o.v + '">' + o.l + "</button>"; }).join("") + "</div>";
  }

  var Demos = {
    /* 2.1 */
    twoLanguages: function (el, ctx) {
      var rows = [
        { a: "[lʲ] – [ɫ]", note: t("светлый и тёмный боковой", "clear and dark lateral"), en: 1, ru: 0, exEn: t("lip – pill: позиционные варианты /l/", "lip – pill: positional variants of /l/"), exRu: t("люк – лук: две фонемы", "люк – лук: two phonemes") },
        { a: "[pʰ] – [p]", note: t("с придыханием и без", "aspirated and unaspirated"), en: 1, ru: 1, exEn: t("pin – spin: аллофоны /p/", "pin – spin: allophones of /p/"), exRu: t("придыхание не различает слов: [пʰ] — просто необычное /п/", "aspiration distinguishes no words: [пʰ] is just an unusual /п/") },
        { a: "[t] – [tʲ]", note: t("твёрдый и мягкий", "hard and soft"), en: 1, ru: 0, exEn: t("лёгкое смягчение перед [j], [iː] (tune, tea) не различает слов", "slight palatalization before [j], [iː] (tune, tea) distinguishes no words"), exRu: t("брат – брать: две фонемы", "брат – брать: two phonemes") },
        { a: "[s] – [z]", note: t("глухой и звонкий", "voiceless and voiced"), en: 0, ru: 0, exEn: t("sip – zip", "sip – zip"), exRu: t("сад – зад", "сад – зад") },
        { a: "[i] – [ɪ]", note: t("напряжённый и ненапряжённый", "tense and lax"), en: 0, ru: 1, exEn: t("beat – bit: две фонемы", "beat – bit: two phonemes"), exRu: t("ударный и безударный варианты /и/: пил – пила", "stressed and unstressed variants of /и/: пил – пила") }
      ];
      var ans = rows.map(function () { return { en: null, ru: null }; });
      var opts = [{ v: 0, l: L(t("фонемы", "phonemes")) }, { v: 1, l: L(t("аллофоны", "allophones")) }];
      function paint(checked) {
        el.innerHTML = '<div class="tl"><div class="tl-head"><span></span><span>' + L(t("Английский", "English")) + "</span><span>" + L(t("Русский", "Russian")) + "</span></div>" + rows.map(function (r, i) {
          return '<div class="tl-row"><div><span class="ipa tl-a">' + r.a + '</span><small>' + L(r.note) + "</small></div>" +
            '<div data-i="' + i + '" data-l="en">' + seg(opts, ans[i].en, "EN") + (checked ? '<small class="tl-fb ' + (ans[i].en === r.en ? "ok" : "bad") + '">' + L(r.exEn) + "</small>" : "") + "</div>" +
            '<div data-i="' + i + '" data-l="ru">' + seg(opts, ans[i].ru, "RU") + (checked ? '<small class="tl-fb ' + (ans[i].ru === r.ru ? "ok" : "bad") + '">' + L(r.exRu) + "</small>" : "") + "</div></div>";
        }).join("") + '</div><div class="row" style="margin-top:14px"><button type="button" class="btn btn-sm" data-act="check">' + U("check") + '</button><button type="button" class="btn btn-sm btn-ghost" data-act="reset">' + U("reset") + '</button></div><div class="fb" aria-live="polite"></div>';
        el.querySelectorAll(".tl-row [data-l]").forEach(function (cell) {
          cell.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { if (checked) return; ans[+cell.dataset.i][cell.dataset.l] = +b.dataset.v; paint(false); }); });
        });
        el.querySelector('[data-act="check"]').addEventListener("click", function () {
          var right = 0; rows.forEach(function (r, i) { if (ans[i].en === r.en) right++; if (ans[i].ru === r.ru) right++; });
          paint(true);
          el.querySelector(".fb").innerHTML = '<div class="feedback ' + (right === 10 ? "ok" : "bad") + '"><b>' + right + " " + U("of") + " 10.</b> " + L(t("Одна и та же пара звуков может быть фонемной в одном языке и аллофонической в другом. Об этом следующая карточка.", "The same pair of sounds can be phonemic in one language and allophonic in another. The next card explains why.")) + "</div>";
          if (right === 10) ctx.done();
        });
        el.querySelector('[data-act="reset"]').addEventListener("click", function () { ans = rows.map(function () { return { en: null, ru: null }; }); paint(false); });
      }
      paint(false);
    },

    /* 2.2 */
    aspiration: function (el, ctx) {
      pick(el, ctx, [
        { t: E("pin"), ok: 1 }, { t: E("spin"), ok: 0 }, { t: E("pen"), ok: 1 }, { t: E("spend"), ok: 0 },
        { t: E("park"), ok: 1 }, { t: E("spark"), ok: 0 }, { t: E("pie"), ok: 1 }, { t: E("spy"), ok: 0 },
        { t: E("appear"), ok: 1 }, { t: E("spoon"), ok: 0 }
      ], t("Придыхание звучит в начале ударного слога и исчезает после " + I("[s]") + ". Позиции придыхательного и непридыхательного " + I("[p]") + " не пересекаются: это дополнительная дистрибуция.",
        "Aspiration occurs at the start of a stressed syllable and disappears after " + I("[s]") + ". The positions of aspirated and unaspirated " + I("[p]") + " never overlap: this is complementary distribution."));
    },

    /* 2.3 */
    commutation: function (el, ctx) {
      var subs = [["p", "pin", 1], ["b", "bin", 1], ["t", "tin", 1], ["d", "din", 1], ["k", "kin", 1], ["s", "sin", 1], ["ʃ", "shin", 1], ["θ", "thin", 1], ["f", "fin", 1], ["w", "win", 1], ["v", "—", 0], ["h", "—", 0], ["pʰ", "pin", 2], ["p˭", "pin", 2]];
      var tried = {};
      function paint(cur) {
        var res = "";
        if (cur != null) {
          var s = subs[cur]; tried[cur] = 1;
          res = s[2] === 1 ? L(t("Новое слово " + E(s[1]) + ". Звук " + I("[" + s[0] + "]") + " — отдельная фонема, противопоставленная другим в этом контексте.", "A new word, " + E(s[1]) + ". The sound " + I("[" + s[0] + "]") + " is a separate phoneme opposed to the others in this context."))
            : s[2] === 2 ? L(t("Слово по-прежнему " + E("pin") + ". Придыхательный и непридыхательный " + I("[p]") + " — аллофоны одной фонемы " + I("/p/") + "; без придыхания слово звучит с акцентом, но узнаётся.", "Still " + E("pin") + ". Aspirated and unaspirated " + I("[p]") + " are allophones of one phoneme " + I("/p/") + "; without aspiration the word sounds accented but is recognized."))
            : L(t("Такого слова нет. Это не опровергает фонемность " + I("[" + s[0] + "]") + ": в системе бывают пустые клетки.", "There is no such word. This does not disprove that " + I("[" + s[0] + "]") + " is a phoneme: a system has empty slots."));
        }
        el.innerHTML = '<div class="comm-demo"><div class="comm-frame ipa">[ <b>' + (cur != null ? subs[cur][0] : "_") + "</b> ɪ n ]</div><div class=\"comm-keys\">" + subs.map(function (s, i) { return '<button type="button" class="key' + (tried[i] ? " tried" : "") + (i === cur ? " cur" : "") + '" data-i="' + i + '"><span class="ipa">' + s[0] + "</span></button>"; }).join("") + '</div><div class="comm-res" aria-live="polite">' + (res || L(t("Нажми на звук.", "Press a sound."))) + '</div><p class="muted">' + L(t("Попробовано", "Tried")) + ": " + Object.keys(tried).length + " / " + subs.length + "</p></div>";
        el.querySelectorAll(".key").forEach(function (b) { b.addEventListener("click", function () { paint(+b.dataset.i); }); });
        if (Object.keys(tried).length === subs.length) ctx.done();
      }
      paint(null);
    },

    oppositionLab: function (el, ctx) {
      var P = { lab: t("губной", "labial"), den: t("зубной", "dental"), alv: t("альвеолярный", "alveolar"), pal: t("заальвеолярный", "post-alveolar"), vel: t("заднеязычный", "velar"), glo: t("глоттальный", "glottal") };
      var M = { occ: t("смычный", "occlusive"), con: t("щелевой", "constrictive") };
      var F = { fort: t("сильный (fortis)", "fortis"), len: t("слабый (lenis)", "lenis") };
      var C = { p: ["occ", "lab", "fort"], b: ["occ", "lab", "len"], t: ["occ", "alv", "fort"], d: ["occ", "alv", "len"], k: ["occ", "vel", "fort"], "ɡ": ["occ", "vel", "len"], "tʃ": ["occ", "pal", "fort"], "dʒ": ["occ", "pal", "len"], f: ["con", "lab", "fort"], v: ["con", "lab", "len"], "θ": ["con", "den", "fort"], "ð": ["con", "den", "len"], s: ["con", "alv", "fort"], z: ["con", "alv", "len"], "ʃ": ["con", "pal", "fort"], "ʒ": ["con", "pal", "len"], h: ["con", "glo", "fort"] };
      var keys = Object.keys(C), a = "p", b = "ð";
      function paint() {
        var fa = C[a], fb = C[b], names = [t("Тип преграды", "Type of obstruction"), t("Место образования", "Place of articulation"), t("Сила артикуляции", "Force of articulation")], dicts = [M, P, F], diff = 0;
        var rows = names.map(function (n, i) { var d = fa[i] !== fb[i]; if (d) diff++; return '<tr class="' + (d ? "diff" : "") + '"><td>' + L(n) + "</td><td>" + L(dicts[i][fa[i]]) + "</td><td>" + L(dicts[i][fb[i]]) + "</td></tr>"; }).join("");
        var type = diff === 0 ? L(t("Это одна и та же фонема.", "This is the same phoneme.")) : [L(t("Одинарная оппозиция", "Single opposition")), L(t("Двойная оппозиция", "Double opposition")), L(t("Тройная оппозиция", "Triple opposition"))][diff - 1];
        function picker(cur, side) { return '<div class="opp-pick" data-side="' + side + '">' + keys.map(function (k) { return '<button type="button" class="key' + (k === cur ? " cur" : "") + '" data-k="' + k + '" aria-pressed="' + (k === cur) + '"><span class="ipa">' + k + "</span></button>"; }).join("") + "</div>"; }
        el.innerHTML = '<div class="opp"><div><div class="opp-l">' + L(t("Первый согласный", "First consonant")) + "</div>" + picker(a, "a") + '</div><div><div class="opp-l">' + L(t("Второй согласный", "Second consonant")) + "</div>" + picker(b, "b") + '</div></div><div class="fg-scroll"><table class="fg-table opp-t"><thead><tr><th>' + L(t("Признак", "Feature")) + '</th><th class="ipa">/' + a + '/</th><th class="ipa">/' + b + "/</th></tr></thead><tbody>" + rows + '</tbody></table></div><p class="opp-res" aria-live="polite"><b>' + type + "</b>" + (diff ? " — " + diff + " " + L(diff === 1 ? t("различительный признак", "distinctive feature") : t("различительных признака", "distinctive features")) : "") + "</p>";
        el.querySelectorAll(".opp-pick").forEach(function (p) { p.querySelectorAll(".key").forEach(function (k) { k.addEventListener("click", function () { if (p.dataset.side === "a") a = k.dataset.k; else b = k.dataset.k; paint(); ctx.done(); }); }); });
      }
      paint();
    },

    /* 2.4 */
    schools: function (el) {
      var words = [
        { w: "вод", tr: "[вот]", seg: t("конечный согласный", "final consonant"), m: t("/д/ — проверка сильной позицией: " + E("вода, воды"), "/д/ — checked by a strong position: " + E("вода, воды")), p: t("архифонема /T/: противопоставление /т/ – /д/ здесь нейтрализовано", "archiphoneme /T/: the /т/ – /д/ opposition is neutralized here"), s: t("/т/ — звук относится к ближайшей по звучанию фонеме", "/т/ — the sound belongs to the phoneme closest in sound") },
        { w: "вода", tr: "[вʌда́]", seg: t("первый гласный", "first vowel"), m: t("/о/ — проверка ударной позицией: " + E("воды") + " " + I("[вóды]"), "/о/ — checked by the stressed position: " + E("воды") + " " + I("[вóды]")), p: t("архифонема: /о/ и /а/ в этой позиции не различаются", "archiphoneme: /о/ and /а/ are not distinguished in this position"), s: t("/а/ — " + I("[ʌ]") + " ближе всего к /а/", "/а/ — " + I("[ʌ]") + " is closest to /а/") },
        { w: "собака", tr: "[сʌба́кә]", seg: t("первый гласный", "first vowel"), m: t("гиперфонема {о/а}: сильной позиции для этого корня нет", "hyperphoneme {о/а}: this root has no strong position"), p: t("архифонема: /о/ и /а/ нейтрализованы", "archiphoneme: /о/ and /а/ are neutralized"), s: t("/а/ — по звучанию", "/а/ — by sound") },
        { w: "водовоз", tr: "[въдʌво́с]", seg: t("первый гласный", "first vowel"), m: t("/о/ — проверка: " + E("воды"), "/о/ — checked by " + E("воды")), p: t("архифонема гласных в слабой позиции", "a vowel archiphoneme in a weak position"), s: t("/а/ — " + I("[ъ]") + " трактуется как вариант /а/", "/а/ — " + I("[ъ]") + " is treated as a variant of /а/") }
      ];
      var sch = [{ k: "m", l: t("Московская", "Moscow") }, { k: "p", l: t("Пражская (Трубецкой)", "Prague (Trubetskoy)") }, { k: "s", l: t("Петербургская (Щерба)", "St Petersburg (Shcherba)") }];
      var wi = 0, si = "m";
      function paint() {
        var w = words[wi];
        el.innerHTML = '<div class="sch"><div class="sch-l">' + L(t("Слово", "Word")) + "</div>" + seg(words.map(function (x, i) { return { v: i, l: x.w }; }), wi, "word") + '<div class="sch-l">' + L(t("Школа", "School")) + "</div>" + seg(sch.map(function (x) { return { v: x.k, l: L(x.l) }; }), si, "school") +
          '<div class="sch-card"><div class="sch-w">' + w.w + ' <span class="ipa">' + w.tr + '</span></div><div class="muted">' + L(w.seg) + '</div><p class="sch-ans">' + L(w[si]) + "</p></div></div>";
        var segs = el.querySelectorAll(".seg");
        segs[0].querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { wi = +b.dataset.v; paint(); }); });
        segs[1].querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { si = b.dataset.v; paint(); }); });
      }
      paint();
    },

    /* 2.5 */
    mistakes: function (el, ctx) {
      pick(el, ctx, [
        { t: t(I("[iː]") + " в " + E("beat") + " стал открытым и кратким", I("[iː]") + " in " + E("beat") + " became open and short"), ok: 1 },
        { t: t("Слишком долгий " + I("[iː]") + " в " + E("sheep"), "An over-long " + I("[iː]") + " in " + E("sheep")), ok: 0 },
        { t: t(I("[θ]") + " заменён на " + I("[s]") + " в " + E("thin"), I("[θ]") + " replaced by " + I("[s]") + " in " + E("thin")), ok: 1 },
        { t: t("Без придыхания " + I("[p]") + " в " + E("pen"), "Unaspirated " + I("[p]") + " in " + E("pen")), ok: 0 },
        { t: t("Оглушён конечный " + I("[d]") + " в " + E("bed"), "Final " + I("[d]") + " devoiced in " + E("bed")), ok: 1 },
        { t: t("Светлый " + I("[l]") + " в " + E("pill"), "A clear " + I("[l]") + " in " + E("pill")), ok: 0 },
        { t: t(I("[æ]") + " заменён на " + I("[e]") + " в " + E("man"), I("[æ]") + " replaced by " + I("[e]") + " in " + E("man")), ok: 1 },
        { t: t("Смягчённый " + I("[d]") + " в " + E("deal"), "A palatalized " + I("[d]") + " in " + E("deal")), ok: 0 }
      ], t("Слово меняется, когда не реализован различительный признак: открытость гласного, место образования, звонкость. Долгота, придыхание, оттенок " + I("[l]") + " и смягчение лишь создают акцент.",
        "The word changes when a distinctive feature is not realized: vowel openness, place of articulation, voicing. Length, aspiration, the shade of " + I("[l]") + " and palatalization only create an accent."));
    },

    /* 3.1 */
    splitter: function (el, ctx) {
      var W = [
        { w: "agree", s: ["ə", "ɡ", "r", "iː"], b: [0], e: t("[ɡr] — допустимое начальное сочетание: " + E("green") + ".", "[ɡr] is a possible initial cluster: " + E("green") + ".") },
        { w: "admire", s: ["ə", "d", "m", "aɪ", "ə"], b: [1], e: t("[dm] не начинает английских слов, поэтому сочетание делится.", "[dm] never begins an English word, so the cluster is split.") },
        { w: "meeting", s: ["m", "iː", "t", "ɪ", "ŋ"], b: [1], e: t("Долгий гласный перед одним согласным — в открытом слоге.", "A long vowel before one consonant is in an open syllable.") },
        { w: "army", s: ["ɑː", "m", "i"], b: [0], e: t("Долгий гласный — открытый слог.", "A long vowel — an open syllable.") },
        { w: "divide", s: ["d", "ɪ", "v", "aɪ", "d"], b: [1], e: t("Безударный краткий гласный стоит в открытом слоге.", "An unstressed short vowel stands in an open syllable.") },
        { w: "extra", s: ["e", "k", "s", "t", "r", "ə"], b: [1], e: t("Естественное деление " + E("ek-stra") + ": [str] — допустимое начало.", "The natural division is " + E("ek-stra") + ": [str] is a possible onset.") },
        { w: "toast-rack", s: ["t", "əʊ", "s", "t", "r", "æ", "k"], b: [3], e: t("В сложном слове граница совпадает с границей морфем.", "In a compound the boundary coincides with the morpheme boundary.") },
        { w: "abhor", s: ["ə", "b", "h", "ɔː"], b: [1], e: t("[bh] невозможно в начале слова.", "[bh] is impossible word-initially.") },
        { w: "abrupt", s: ["ə", "b", "r", "ʌ", "p", "t"], b: [0], e: t("[br] — допустимое начало: " + E("bread") + ".", "[br] is a possible onset: " + E("bread") + ".") },
        { w: "garden", s: ["ɡ", "ɑː", "d", "n̩"], b: [1], e: t("Второй слог образует слоговой [n̩].", "The second syllable is formed by syllabic [n̩].") }
      ];
      var i = 0, marks = {}, score = 0, checked = false;
      function paint() {
        var w = W[i];
        var html = '<div class="split"><div class="split-word ex">' + w.w + '</div><div class="split-row">';
        w.s.forEach(function (sg, k) {
          html += '<span class="ipa split-seg">' + sg + "</span>";
          if (k < w.s.length - 1) {
            var on = !!marks[k], cls = "split-gap" + (on ? " on" : "");
            if (checked) cls += w.b.indexOf(k) >= 0 ? " right" : on ? " wrong" : "";
            html += '<button type="button" class="' + cls + '" data-k="' + k + '" aria-pressed="' + on + '" aria-label="' + L(t("Граница после", "Boundary after")) + " " + sg + '"></button>';
          }
        });
        html += '</div><p class="muted">' + L(t("Слово", "Word")) + " " + (i + 1) + " / " + W.length + " · " + U("score") + ": " + score + '</p><div class="row"><button type="button" class="btn btn-sm" data-act="check"' + (checked ? " disabled" : "") + ">" + U("check") + "</button>" + (checked && i < W.length - 1 ? '<button type="button" class="btn btn-sm btn-ghost" data-act="next">' + U("next_item") + "</button>" : "") + (checked && i === W.length - 1 ? '<button type="button" class="btn btn-sm btn-ghost" data-act="again">' + U("new_set") + "</button>" : "") + '</div><div class="fb" aria-live="polite"></div></div>';
        el.innerHTML = html;
        el.querySelectorAll(".split-gap").forEach(function (g) { g.addEventListener("click", function () { if (checked) return; var k = +g.dataset.k; marks[k] = !marks[k]; paint(); }); });
        var c = el.querySelector('[data-act="check"]');
        if (c) c.addEventListener("click", function () {
          var sel = Object.keys(marks).filter(function (k) { return marks[k]; }).map(Number).sort();
          var ok = sel.length === w.b.length && sel.every(function (k, j) { return k === w.b[j]; });
          if (ok) score++;
          checked = true; paint();
          var right = w.s.slice(0, w.b[0] + 1).join("") + " – " + w.s.slice(w.b[0] + 1).join("");
          el.querySelector(".fb").innerHTML = '<div class="feedback ' + (ok ? "ok" : "bad") + '"><b>' + (ok ? U("right") : U("wrong")) + "</b> " + I("[" + right + "]") + ". " + L(w.e) + "</div>";
          if (i === W.length - 1 && score >= 8) ctx.done();
        });
        var n = el.querySelector('[data-act="next"]'); if (n) n.addEventListener("click", function () { i++; marks = {}; checked = false; paint(); });
        var a = el.querySelector('[data-act="again"]'); if (a) a.addEventListener("click", function () { i = 0; marks = {}; checked = false; score = 0; paint(); });
      }
      paint();
    },

    /* 3.2 */
    toneLab: function (el) {
      var S = Figures._staff;
      var tones = [
        { k: "lf", n: t("Низкий нисходящий", "Low Fall"), m: "ˎ", sy: { k: "f", y: .42, y2: .02 }, d: t("Категоричный, законченный; звучит флегматично, сдержанно, холодно (Васильев).", "Categoric and final; sounds phlegmatic, reserved, cool (Vassiliev).") },
        { k: "mf", n: t("Средний нисходящий", "Mid Fall"), m: "˴", sy: { k: "f", y: .55, y2: .02 }, d: t("Самый частотный тон: нейтральный, спокойный, дружелюбный (Васильев).", "The most common tone: neutral, calm, friendly (Vassiliev).") },
        { k: "hf", n: t("Высокий нисходящий", "High Fall"), m: "ˋ", sy: { k: "f", y: .95, y2: .02 }, d: t("Заинтересованность, оживление; превращает утверждение в восклицание (Соколова). Основа модели High Drop (Линдси).", "Involvement, liveliness; turns a statement into an exclamation (Sokolova). The basis of the High Drop (Lindsey).") },
        { k: "lr", n: t("Низкий восходящий", "Low Rise"), m: "ˏ", sy: { k: "r", y: .05, y2: .45 }, d: t("Незавершённость, вопрос, ободрение; вежливые просьбы, приветствия, продуманные перечни.", "Incompleteness, a question, encouragement; polite requests, greetings, planned lists.") },
        { k: "mr", n: t("Средний восходящий", "Medium Rise"), m: "˵", sy: { k: "r", y: .25, y2: .7 }, d: t("Подъём от низкого уровня к среднему и выше: вопрос с оттенком заинтересованности, переспрос без удивления.", "A rise from low to mid and above: a question with a note of interest, a check without surprise.") },
        { k: "hr", n: t("Высокий восходящий", "High Rise"), m: "ˊ", sy: { k: "r", y: .5, y2: .98 }, d: t("Переспрос, общий вопрос; в современном английском — uptalk в утверждениях.", "An echo question, a yes-no question; in today’s English, uptalk on statements.") },
        { k: "fr", n: t("Нисходяще-восходящий", "Fall-Rise"), m: "ˇ", sy: { k: "fr", y: .8, y2: .08, y3: .5 }, d: t("Оговорка, подразумеваемое продолжение: " + E("ˇSometimes") + ". По Линдси — нейтральный общий вопрос в SSB.", "Reservation, an implied continuation: " + E("ˇSometimes") + ". For Lindsey, the neutral SSB yes-no question.") },
        { k: "rf", n: t("Восходяще-нисходящий", "Rise-Fall"), m: "ˆ", sy: { k: "rf", y: .3, y2: .95, y3: .02 }, d: t("Впечатлённость, усиление; Соколова советует вводить его на продвинутом этапе.", "Being impressed, emphasis; Sokolova advises introducing it at an advanced stage.") },
        { k: "ml", n: t("Средний ровный", "Mid-Level"), m: "˗", sy: { k: "ml", y: .5 }, d: t("Рутинное, неинтересное; незавершённость на границе групп, спонтанные перечни.", "Something routine; non-finality at group boundaries, unplanned lists.") }
      ];
      var cur = "lf";
      function paint() {
        var tn = tones.filter(function (x) { return x.k === cur; })[0];
        var syl = [{ t: "Do", y: .5, k: "u" }, { t: "you", y: .5, k: "u" }, { t: "like", y: .7, k: "s" }, { t: "it", y: .7, k: "u" }];
        var ans = [Object.assign({ t: "Yes", n: true }, tn.sy)];
        el.innerHTML = '<div class="tonelab">' + seg(tones.map(function (x) { return { v: x.k, l: L(x.n) }; }), cur, "tones") + '<div class="fg-two tl-pair"><div><div class="fg-h">' + L(t("Вопрос", "Question")) + "</div>" + S(syl, { label: "Do you like it?", step: 40 }) + '</div><div><div class="fg-h">' + L(t("Ответ", "Answer")) + " — " + L(tn.n) + "</div>" + S(ans, { label: L(tn.n), step: 40 }) + '</div></div><p class="fg-tone">— Do you ˈlike it? — ' + tn.m + "Yes.</p><p>" + L(tn.d) + "</p></div>";
        el.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { cur = b.dataset.v; paint(); }); });
      }
      paint();
    },

    /* 3.3 */
    downstep: function (el) {
      var S = Figures._staff;
      var st = [{ t: "It", y: .2, k: "u" }, { t: "was", y: .2, k: "u" }, { t: "a", y: .2, k: "u" }, { t: "ve", y: .85, k: "s" }, { t: "ry", y: .85, k: "u" }, { t: "good", y: .85, k: "s" }];
      var qq = [{ t: "Are", y: .2, k: "u" }, { t: "you", y: .2, k: "u" }, { t: "tra", y: .82, k: "s" }, { t: "vel", y: .82, k: "u" }, { t: "ling", y: .82, k: "u" }, { t: "a", y: .82, k: "u" }];
      var P = [
        { k: "hd", n: "High Drop", syl: st.concat([{ t: "film", y: .9, k: "f", y2: .05, n: true }]), tone: "It was a ˈvery ˈgood ˋfilm.", d: t("Ядро начинается с высокого уровня. Сегодня это основная нейтральная модель утверждений и специальных вопросов.", "The nucleus starts high. Today this is the basic neutral pattern for statements and wh-questions."), ds: false },
        { k: "ld", n: "Low Drop", syl: st.concat([{ t: "film", y: .42, k: "f", y2: .03, n: true }]), tone: "It was a ˈvery ˈgood ˎfilm.", d: t("Шаг вниз на ядро. О’Коннор и Арнольд называли модель «весомой»; сегодня она может звучать снисходительно, но сохраняется в объявлениях.", "A step down onto the nucleus. O’Connor and Arnold called it “weighty”; today it may sound patronizing but survives in announcements."), ds: true },
        { k: "lb", n: "Low Bounce", syl: qq.concat([{ t: "lone", y: .1, k: "r", y2: .4, n: true }]), tone: "Are you ˈtravelling aˏlone?", d: t("Шаг вниз и низкий восходящий. В RP — обычный общий вопрос, сегодня звучит удивлённо или свысока.", "A step down and a Low Rise. The ordinary yes-no question in RP; today it sounds surprised or condescending."), ds: true },
        { k: "frq", n: "Fall-Rise", syl: qq.concat([{ t: "lone", y: .8, k: "fr", y2: .1, y3: .5, n: true }]), tone: "Are you ˈtravelling aˇlone?", d: t("Высокая шкала и нисходяще-восходящий без шага вниз — вежливый общий вопрос в SSB.", "A high head and a Fall-Rise without a step down — a polite SSB yes-no question."), ds: false },
        { k: "tr", n: "Terrace", syl: [{ t: "Bread", y: .85, k: "s" }, { t: "some", y: .85, k: "u" }, { t: "cheese", y: .5, k: "ml", n: true }], tone: "ˈBread, some ˗cheese…", d: t("Высокая шкала и средний ровный: незавершённость в RP. Сегодня средний ровный чаще идёт после низкой предъядерной части.", "A high head and a Mid-Level: non-finality in RP. Today the Mid-Level usually follows low pre-nuclear pitch."), ds: true },
        { k: "ml", n: "Mid-Level", syl: [{ t: "Bread", y: .3, k: "s" }, { t: "some", y: .3, k: "u" }, { t: "cheese", y: .5, k: "ml", n: true }], tone: "ˈBread, some ˗cheese…", d: t("Средний ровный после низкой части — современная модель спонтанного перечня.", "A Mid-Level after low pitch — the contemporary pattern of an unplanned list."), ds: false }
      ];
      var cur = "hd";
      function paint() {
        var p = P.filter(function (x) { return x.k === cur; })[0];
        el.innerHTML = '<div class="downstep">' + seg(P.map(function (x) { return { v: x.k, l: x.n }; }), cur, "patterns") + '<div class="fg-scroll">' + S(p.syl, { label: p.n }) + '</div><p class="fg-tone">' + p.tone + '</p><p><span class="pill ' + (p.ds ? "pill-warn" : "pill-done") + '">' + (p.ds ? L(t("даунстеп", "downstep")) : L(t("без даунстепа", "no downstep"))) + "</span> " + L(p.d) + "</p></div>";
        el.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { cur = b.dataset.v; paint(); }); });
      }
      paint();
    },

    /* 3.4 */
    notation: function (el) {
      var S = Figures._staff;
      var pre = [{ t: "He’s", y: .45, k: "u" }, { t: "gone", y: .92, k: "s" }, { t: "to", y: .58, k: "u" }, { t: "the", y: .56, k: "u" }];
      var T = [
        { k: "hf", n: t("Высокий нисходящий", "High Fall"), m: "ˋ", nuc: { k: "f", y: .95, y2: .05 }, tail: .03, tobi: "H* L-L%" },
        { k: "lf", n: t("Низкий нисходящий", "Low Fall"), m: "ˎ", nuc: { k: "f", y: .5, y2: 0 }, tail: 0, tobi: "L* L-L% / !H* L-L%" },
        { k: "lr", n: t("Низкий восходящий", "Low Rise"), m: "ˏ", nuc: { k: "r", y: .06, y2: .26 }, tail: .26, tobi: "L* L-H%" },
        { k: "hr", n: t("Высокий восходящий", "High Rise"), m: "ˊ", nuc: { k: "r", y: .55, y2: 1 }, tail: 1, tobi: "H* H-H%" },
        { k: "fr", n: t("Нисходяще-восходящий", "Fall-Rise"), m: "ˇ", nuc: { k: "fr", y: .5, y2: 0, y3: .4 }, tail: .4, tobi: "H* L-H%" }
      ];
      var cur = "hf";
      function paint() {
        var x = T.filter(function (y) { return y.k === cur; })[0];
        var syl = pre.concat([Object.assign({ t: "of", n: true }, x.nuc), { t: "fice", y: x.tail, k: "u" }]);
        el.innerHTML = '<div class="notation">' + seg(T.map(function (y) { return { v: y.k, l: L(y.n) }; }), cur, "tones") +
          '<div class="nt-row"><div class="nt-k">' + L(t("Нотный стан", "Staves")) + '</div><div class="nt-v fg-scroll">' + S(syl, { label: L(x.n) }) + "</div></div>" +
          '<div class="nt-row"><div class="nt-k">' + L(t("Тонетические знаки", "Tonetic marks")) + '</div><div class="nt-v"><p class="fg-tone">He’s ˈgone to the ' + x.m + "office.</p></div></div>" +
          '<div class="nt-row"><div class="nt-k">ToBI</div><div class="nt-v"><p class="fg-tone tobi-str">' + x.tobi + '</p><p class="muted">' + L(t("Конечная последовательность: последний тональный акцент, фразовый акцент, пограничный тон. Соответствия приблизительные.", "The final sequence: last pitch accent, phrase accent, boundary tone. Correspondences are approximate.")) + "</p></div></div></div>";
        el.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { cur = b.dataset.v; paint(); }); });
      }
      paint();
    },

    /* 3.5 */
    ikExplorer: function (el) {
      var IK = Figures._IK, C = Figures._contour;
      var notes = {
        1: t("Два варианта: ровный тон перед падением — типичное сообщение; подъём перед падением — дополнительные сведения: " + E("И сестра здесь живёт") + ".", "Two variants: level pitch before the fall — a typical statement; a rise before the fall — additional information: " + E("И сестра здесь живёт") + "."),
        2: t("Нисходящий тон с просодическим усилением, фонетическая природа которого, по Кодзасову, не вполне ясна.", "A fall with prosodic intensification whose phonetic nature, Kodzasov notes, is not fully clear."),
        3: t("Подъём на ударном слоге центра, падение на заударных. В незавершённости (" + E("Пока вы были в театре, …") + ") подъём меньше.", "A rise on the stressed syllable of the centre, a fall on the following syllables. In incompleteness (" + E("Пока вы были в театре, …") + ") the rise is smaller."),
        4: t("Несимметрична: падение в ударном слоге, подъём к концу слова. Если заударных нет, гласный удваивается: " + E("А жена-а?") + ".", "Asymmetric: a fall in the stressed syllable, a rise towards the end of the word. With no following syllables the vowel is doubled: " + E("А жена-а?") + "."),
        5: t("Восходящий, ровный и нисходящий тоны; в одном слове подъём на первом слоге, падение на ударном.", "Rise, level and fall; within one word the rise is on the first syllable and the fall on the stressed one."),
        6: t("Ровный тон сохраняется до конца реплики, гласный конечного слога обычно удлинён.", "The level tone continues to the end of the remark; the final vowel is usually lengthened."),
        7: t("Подъём завершается гортанной смычкой; оценка экспрессивная и часто отрицательная.", "The rise ends in a glottal stop; the evaluation is expressive and often negative.")
      };
      var cur = 1;
      function paint() {
        var k = IK[cur - 1];
        el.innerHTML = '<div class="ikx">' + seg(IK.map(function (x) { return { v: x.n, l: "ИК-" + x.n }; }), cur, "ИК") + '<div class="ikx-card"><div class="ikx-fig">' + C(k.pts, k.c, { glottal: k.glottal, w: 300, h: 110, label: "ИК-" + k.n }) + '</div><div><div class="fg-h">ИК-' + k.n + " — " + L(k.use) + '</div><p class="ikx-ex">' + Figures._accV(k.ex) + "</p><p>" + L(notes[k.n]) + "</p></div></div></div>";
        el.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { cur = +b.dataset.v; paint(); }); });
      }
      paint();
    }
  };

  window.Demos = Demos;
})();
