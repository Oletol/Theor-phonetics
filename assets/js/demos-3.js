/* Семинар 4. Интерактивные демо. */
(function () {
  var I = function (s) { return '<span class="ipa">' + s + "</span>"; };
  var E = function (s) { return '<span class="ex">' + s + "</span>"; };

  function seg(opts, cur, name) {
    return '<div class="seg" role="radiogroup" aria-label="' + (name || "") + '">' + opts.map(function (o, i) { return '<button type="button" role="radio" aria-checked="' + (i === cur) + '" data-v="' + i + '">' + L(o) + "</button>"; }).join("") + "</div>";
  }

  /* Общий движок «отнеси к категории»: rows = [{ a, note, ok, fb }] */
  function classify(el, ctx, rows, opts, rule) {
    var ans = rows.map(function () { return null; }), checked = false;
    function paint() {
      el.innerHTML = '<div class="v4-cls">' + rows.map(function (r, i) {
        var st = checked ? (ans[i] === r.ok ? " ok" : " bad") : "";
        return '<div class="v4-cls-r' + st + '" data-i="' + i + '"><div class="v4-cls-a">' + L(r.a) + (r.note ? "<small>" + L(r.note) + "</small>" : "") + "</div><div>" + seg(opts, ans[i], "") +
          (checked ? '<small class="v4-cls-fb">' + (ans[i] === r.ok ? "" : "<b>" + L(opts[r.ok]) + ".</b> ") + L(r.fb) + "</small>" : "") + "</div></div>";
      }).join("") + '</div><div class="row" style="margin-top:14px"><button type="button" class="btn btn-sm" data-act="check">' + U("check") + '</button><button type="button" class="btn btn-sm btn-ghost" data-act="reset">' + U("reset") + '</button></div><div class="fb" aria-live="polite"></div>';
      el.querySelectorAll(".v4-cls-r").forEach(function (row) {
        row.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { if (checked) return; ans[+row.dataset.i] = +b.dataset.v; paint(); }); });
      });
      el.querySelector('[data-act="check"]').addEventListener("click", function () {
        if (checked) return; checked = true; paint();
        var right = rows.filter(function (r, i) { return ans[i] === r.ok; }).length, all = right === rows.length;
        el.querySelector(".fb").innerHTML = '<div class="feedback ' + (all ? "ok" : "bad") + '"><b>' + right + " " + U("of") + " " + rows.length + ".</b> " + L(rule) + "</div>";
        if (all) ctx.done();
      });
      el.querySelector('[data-act="reset"]').addEventListener("click", function () { ans = rows.map(function () { return null; }); checked = false; paint(); });
    }
    paint();
  }

  /* Данные лексических множеств для сравнения акцентов */
  var SETS = ["TRAP", "BATH", "LOT", "STRUT", "FOOT", "FACE", "GOAT", "PRICE", "MOUTH", "NURSE", "START", "happY"];
  var WORDS = ["cat", "path", "hot", "cup", "book", "day", "go", "time", "now", "bird", "car", "city"];
  var ACC = [
    { n: "RP", v: ["æ", "ɑː", "ɒ", "ʌ", "ʊ", "eɪ", "əʊ", "aɪ", "aʊ", "ɜː", "ɑː", "ɪ"] },
    { n: "SSB", v: ["a", "ɑː", "ɔ", "ʌ", "ɵ", "eɪ", "əʉ", "ɑɪ", "aʊ", "ɜː", "ɑː", "i"] },
    { n: "GA", v: ["æ", "æ", "ɑ", "ʌ", "ʊ", "eɪ", "oʊ", "aɪ", "aʊ", "ɝ", "ɑr", "i"] },
    { n: t("Кокни", "Cockney"), v: ["ɛ", "ɑː", "ɒ", "a", "ʊ", "æɪ", "æʊ", "ɑɪ", "æə", "ɜː", "ɑː", "iː"] },
    { n: t("Север Англии", "North of England"), v: ["a", "a", "ɒ", "ʊ", "ʊ", "eː", "oː", "aɪ", "aʊ", "ɜː", "ɑː", "ɪ"] },
    { n: t("Шотландия", "Scotland"), v: ["a", "a", "ɔ", "ʌ", "ʉ", "eː", "oː", "ʌɪ", "ʌʉ", "ɪr", "ar", "e"] },
    { n: t("Уэльс", "Wales"), v: ["a", "a", "ɔ", "ə", "ʊ", "eː", "oː", "əɪ", "əʊ", "øː", "aː", "iː"] },
    { n: t("Австралия", "Australia"), v: ["æ", "ɐː", "ɔ", "ɐ", "ʊ", "æɪ", "əʉ", "ɑe", "æɔ", "ɜː", "ɐː", "i"] }
  ];

  Object.assign(Demos, {
    /* 4.1 */
    statusSort: function (el, ctx) {
      var O = [t("акцент", "accent"), t("диалект", "dialect"), t("идиолект", "idiolect"), t("диглоссия", "diglossia"), t("билингвизм", "bilingualism"), t("национальный вариант", "national variant")];
      classify(el, ctx, [
        { a: t("Житель Йоркшира говорит " + I("[bʊk]") + " вместо " + E("buck") + ", но грамматика и лексика у него стандартные.", "A Yorkshire speaker says " + I("[bʊk]") + " for " + E("buck") + ", but his grammar and vocabulary are standard."), ok: 0, fb: t("Отличия только в произношении.", "The differences are in pronunciation only.") },
        { a: t("Житель Глазго говорит " + E("I’m no going, it’s a wee bairn") + " с шотландским произношением.", "A Glaswegian says " + E("I’m no going, it’s a wee bairn") + " with a Scottish pronunciation."), ok: 1, fb: t("Различаются произношение, грамматика и лексика.", "Pronunciation, grammar and vocabulary all differ.") },
        { a: t("Школьник говорит почти на RP с учителем и на родном местном акценте с друзьями.", "A pupil speaks near-RP with the teacher and his native local accent with friends."), ok: 3, fb: t("Две формы одного языка в разных ситуациях.", "Two forms of one language in different situations.") },
        { a: t("Жительница Монреаля говорит по-английски на работе и по-французски дома.", "A Montreal woman speaks English at work and French at home."), ok: 4, fb: t("Два разных языка.", "Two different languages.") },
        { a: t("Писатель всегда растягивает " + E("well") + " и любит слово " + E("splendid") + ".", "A writer always drawls " + E("well") + " and loves the word " + E("splendid") + "."), ok: 2, fb: t("Особенности речи одного человека.", "Features of one person’s speech.") },
        { a: t("Американский английский с собственным стандартом произношения GA.", "American English with its own pronunciation standard, GA."), ok: 5, fb: t("Вариант языка, связанный с нацией.", "A variant of the language connected with a nation.") }
      ], O, t("Акцент — только произношение; диалект — ещё грамматика и лексика; диглоссия — один язык, билингвизм — два.", "An accent is pronunciation only; a dialect adds grammar and vocabulary; diglossia is one language, bilingualism two."));
    },

    /* 4.2 */
    rpTimeline: function (el) {
      var cols = [t("Консервативный RP", "Conservative RP"), t("Общий RP", "General RP"), t("Продвинутый RP", "Advanced RP"), t("SSB (Линдси)", "SSB (Lindsey)")];
      var W = [
        ["tower", "taʊə", "taə", "tɑː", "taə ~ tɑː"],
        ["fire", "faɪə", "faə", "fɑː", "fɑə"],
        ["poor", "pʊə", "pʊə ~ pɔː", "pɔː", "poː"],
        ["go", "ɡoʊ", "ɡəʊ", "ɡɜʊ", "ɡəʉ"],
        ["good", "ɡʊd", "ɡʊd", "ɡəd", "ɡɵd"],
        ["have", "hæv", "hæv", "hav", "hav"],
        ["careful", "ˈkɛəfʊl", "ˈkɛəfʊl", "ˈkɛːfʊl", "ˈkɛːfəl"],
        ["very", "ˈverɪ", "ˈverɪ", "ˈveriː", "ˈvɛri"],
        ["loss", "lɔːs", "lɒs", "lɒs", "lɔs"],
        ["suit", "sjuːt", "sjuːt ~ suːt", "suːt", "sʉːt"]
      ];
      var cur = 0;
      function paint() {
        el.innerHTML = seg(cols, cur, "RP") + '<div class="v4-tl">' + W.map(function (w) {
          var changed = cur > 0 && w[cur + 1] !== w[1];
          return '<div class="v4-tl-c' + (changed ? " on" : "") + '"><span class="ex">' + w[0] + '</span><span class="ipa">[' + w[cur + 1] + "]</span></div>";
        }).join("") + '</div><p class="fg-note">' + L(t("Выделены слова, где произношение отличается от консервативного RP. Первые три столбца — по Соколовой, последний — по Линдси.", "Highlighted words differ from conservative RP. The first three columns follow Sokolova, the last one Lindsey.")) + "</p>";
        el.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { cur = +b.dataset.v; paint(); }); });
      }
      paint();
    },

    /* 4.3 */
    northSouth: function (el, ctx) {
      var O = [t("Юг", "South"), t("Север", "North")];
      classify(el, ctx, [
        { a: E("blood") + " " + I("[blʊd]"), ok: 1, fb: t("Нет " + I("/ʌ/") + ": FOOT и STRUT совпали.", "No " + I("/ʌ/") + ": FOOT and STRUT have merged.") },
        { a: E("path") + " " + I("[pɑːθ]"), ok: 0, fb: t("Долгий " + I("[ɑː]") + " в BATH — южная черта.", "Long " + I("[ɑː]") + " in BATH is a southern feature.") },
        { a: E("dance") + " " + I("[dans]"), ok: 1, fb: t("Краткий " + I("[a]") + " в BATH — северная черта.", "Short " + I("[a]") + " in BATH is a northern feature.") },
        { a: E("money") + " " + I("[ˈmʌniː]"), ok: 0, fb: t("Есть " + I("/ʌ/") + " и долгий конечный " + I("[iː]") + ".", "It has " + I("/ʌ/") + " and a long final " + I("[iː]") + ".") },
        { a: E("book") + " " + I("[buːk]"), ok: 1, fb: t("Долгий " + I("[uː]") + " в " + E("book, look") + " — у части северян.", "Long " + I("[uː]") + " in " + E("book, look") + " is used by some northerners.") },
        { a: E("bad") + " " + I("[bæːd]"), ok: 0, fb: t("На юге " + I("[æ]") + " часто удлиняется.", "In the south " + I("[æ]") + " is often lengthened.") },
        { a: E("city") + " " + I("[ˈsɪtɪ]"), ok: 1, fb: t("Краткий конечный " + I("[ɪ]") + " — Север (кроме Ньюкасла).", "Short final " + I("[ɪ]") + " is northern (except Newcastle).") }
      ], O, t("Главные северные приметы — отсутствие " + I("/ʌ/") + " и краткий " + I("[a]") + " в словах типа BATH.", "The main northern markers are the absence of " + I("/ʌ/") + " and short " + I("[a]") + " in BATH words."));
    },

    accentCompare: function (el) {
      var a = 0, b = 3;
      function paint() {
        var names = ACC.map(function (x) { return x.n; });
        var A = ACC[a].v, B = ACC[b].v, diff = 0;
        var rows = SETS.map(function (k, i) { var d = A[i] !== B[i]; if (d) diff++; return '<tr class="' + (d ? "v4-diff" : "") + '"><td><b>' + k + '</b></td><td class="ex">' + WORDS[i] + "</td><td>" + I("[" + A[i] + "]") + "</td><td>" + I("[" + B[i] + "]") + "</td></tr>"; }).join("");
        el.innerHTML = '<div class="v4-pick"><span class="v4-pick-l">A</span>' + seg(names, a, "A") + '</div><div class="v4-pick"><span class="v4-pick-l">B</span>' + seg(names, b, "B") + "</div>" +
          '<div class="fg-scroll"><table class="fg-table v4-cmp"><thead><tr><th>' + L(t("Множество", "Set")) + "</th><th>" + L(t("Слово", "Word")) + "</th><th>" + L(ACC[a].n) + "</th><th>" + L(ACC[b].n) + "</th></tr></thead><tbody>" + rows + "</tbody></table></div>" +
          '<p class="fg-note">' + L(t("Различий: " + diff + " из " + SETS.length + ". Значения обобщённые, типичные для акцента; у отдельных говорящих возможны варианты.", "Differences: " + diff + " of " + SETS.length + ". The values are generalized and typical of the accent; individual speakers vary.")) + "</p>";
        el.querySelectorAll(".v4-pick").forEach(function (p, pi) { p.querySelectorAll("button").forEach(function (btn) { btn.addEventListener("click", function () { if (pi === 0) a = +btn.dataset.v; else b = +btn.dataset.v; paint(); }); }); });
      }
      paint();
    },

    /* 4.4 */
    celticSort: function (el, ctx) {
      var O = [t("Уэльс", "Wales"), t("Шотландия", "Scotland"), t("Северная Ирландия", "Northern Ireland")];
      classify(el, ctx, [
        { a: t(E("loch") + " " + I("[lɔx]") + ", " + E("through") + " " + I("[ʃɾu]"), E("loch") + " " + I("[lɔx]") + ", " + E("through") + " " + I("[ʃɾu]")), ok: 1, fb: t("Велярный " + I("[x]") + " и " + I("[ʃr]") + " на месте " + I("[θr]") + ".", "Velar " + I("[x]") + " and " + I("[ʃr]") + " for " + I("[θr]") + ".") },
        { a: t(E("girl") + " " + I("[ɡøːl]") + ", " + E("rubber") + " " + I("[ˈrəbə]"), E("girl") + " " + I("[ɡøːl]") + ", " + E("rubber") + " " + I("[ˈrəbə]")), ok: 0, fb: t("Округлённый NURSE, нет " + I("[ʌ] – [ə]") + ", неротический.", "Rounded NURSE, no " + I("[ʌ] – [ə]") + ", non-rhotic.") },
        { a: t(E("city") + " " + I("[ˈsɪɾi]") + ", " + E("mother") + " " + I("[ˈmɔːər]"), E("city") + " " + I("[ˈsɪɾi]") + ", " + E("mother") + " " + I("[ˈmɔːər]")), ok: 2, fb: t("Одноударный " + I("[ɾ]") + " и выпадение " + I("[ð]") + ".", "A flap " + I("[ɾ]") + " and loss of " + I("[ð]") + ".") },
        { a: t(E("pool = pull") + ", " + E("cot = caught"), E("pool = pull") + ", " + E("cot = caught")), ok: 1, fb: t("Долгота не различительна.", "Length is not distinctive.") },
        { a: t(E("city") + " " + I("[ˈsɪtːiː]") + ", " + E("tune") + " " + I("[tɪun]"), E("city") + " " + I("[ˈsɪtːiː]") + ", " + E("tune") + " " + I("[tɪun]")), ok: 0, fb: t("Удвоение согласного и " + I("[ɪu]") + ".", "Consonant doubling and " + I("[ɪu]") + ".") },
        { a: t(E("gate") + " " + I("[ɡɪət]") + ", " + E("hay") + " " + I("[hɛ]"), E("gate") + " " + I("[ɡɪət]") + ", " + E("hay") + " " + I("[hɛ]")), ok: 2, fb: t("FACE: монофтонг или дифтонг " + I("[ɪə]") + " перед согласным.", "FACE: a monophthong, or a diphthong " + I("[ɪə]") + " before a consonant.") },
        { a: t(E("which") + " " + I("[ʍɪtʃ]") + " ≠ " + E("witch") + " " + I("[wɪtʃ]"), E("which") + " " + I("[ʍɪtʃ]") + " ≠ " + E("witch") + " " + I("[wɪtʃ]")), ok: 1, fb: t("Последовательное различение " + I("[ʍ]") + " и " + I("[w]") + ".", "A consistent distinction of " + I("[ʍ]") + " and " + I("[w]") + ".") }
      ], O, t("Шотландский и североирландский ротические и близки друг к другу; валлийский — неротический, с влиянием валлийского языка.", "Scottish and Northern Ireland English are rhotic and close to each other; Welsh English is non-rhotic and influenced by Welsh."));
    },

    /* 4.5 */
    rpGa: function (el, ctx) {
      var O = ["RP", "GA"];
      classify(el, ctx, [
        { a: E("dance") + " " + I("[dæns]"), ok: 1, fb: t("BATH с " + I("[æ]") + ".", "BATH with " + I("[æ]") + ".") },
        { a: E("dog") + " " + I("[dɒɡ]"), ok: 0, fb: t("Округлённый " + I("[ɒ]") + " есть только в RP.", "Rounded " + I("[ɒ]") + " exists only in RP.") },
        { a: E("water") + " " + I("[ˈwɑɾɚ]"), ok: 1, fb: t("Одноударный " + I("[ɾ]") + " и r-окрашенный гласный.", "A flap " + I("[ɾ]") + " and an r-coloured vowel.") },
        { a: E("news") + " " + I("[njuːz]"), ok: 0, fb: t("В GA " + I("[j]") + " после " + I("[n]") + " выпадает: " + I("[nuz]") + ".", "GA drops " + I("[j]") + " after " + I("[n]") + ": " + I("[nuz]") + ".") },
        { a: E("schedule") + " " + I("[ˈskedʒuːl]"), ok: 1, fb: t("В RP " + I("[ˈʃedjuːl] ~ [ˈʃedʒuːl]") + ".", "RP has " + I("[ˈʃedjuːl] ~ [ˈʃedʒuːl]") + ".") },
        { a: E("ballet") + " " + I("[ˈbæleɪ]"), ok: 0, fb: t("В GA ударение на последнем слоге.", "GA stresses the last syllable.") },
        { a: E("address") + " " + I("[ˈædrɛs]"), ok: 1, fb: t("В GA ударение на первом слоге.", "GA stresses the first syllable.") },
        { a: E("dear") + " " + I("[dɪə]"), ok: 0, fb: t("Центрирующий дифтонг — неротический RP.", "A centring diphthong — non-rhotic RP.") }
      ], O, t("Ротичность, " + I("[ɾ]") + ", " + I("[æ]") + " в BATH и " + I("[ɑ]") + " в LOT — главные приметы GA.", "Rhoticity, " + I("[ɾ]") + ", " + I("[æ]") + " in BATH and " + I("[ɑ]") + " in LOT are the main GA markers."));
    },

    /* 4.6 */
    featureHunt: function (el, ctx) {
      var S = [
        { n: t("Кокни", "Cockney"), toks: [
          ["My", "mɑɪ", "maɪ", t("PRICE: ядро отодвинуто назад", "PRICE: a backed nucleus")],
          ["mate", "mæɪʔ", "meɪt", t("FACE " + I("[æɪ]") + " и " + I("[ʔ]"), "FACE " + I("[æɪ]") + " and " + I("[ʔ]"))],
          ["thinks", "fɪŋks", "θɪŋks", t("TH-fronting", "TH-fronting")],
          ["it", "ɪʔ", "ɪt", t(I("[ʔ]") + " на месте " + I("[t]"), I("[ʔ]") + " for " + I("[t]"))],
          ["is", "ɪz", "ɪz", null],
          ["better", "ˈbeʔə", "ˈbetə", t(I("[ʔ]") + " между гласными", I("[ʔ]") + " between vowels")],
          ["on", "ɒn", "ɒn", null],
          ["a", "ə", "ə", null],
          ["boat", "bæʊʔ", "bəʊt", t("GOAT " + I("[æʊ]") + " и " + I("[ʔ]"), "GOAT " + I("[æʊ]") + " and " + I("[ʔ]"))]
        ] },
        { n: t("Шотландский", "Scottish"), toks: [
          ["Which", "ʍɪtʃ", "wɪtʃ", t(I("[ʍ]") + " в " + E("wh"), I("[ʍ]") + " in " + E("wh"))],
          ["girl", "ɡɪɾl", "ɡɜːl", t("ротичность, NURSE " + I("[ɪ]"), "rhoticity, NURSE " + I("[ɪ]"))],
          ["brought", "bɾɔt", "brɔːt", t("нет долготы, одноударный " + I("[ɾ]"), "no length, a tapped " + I("[ɾ]"))],
          ["a", "ə", "ə", null],
          ["book", "bʉk", "bʊk", t("FOOT " + I("[ʉ]") + " (= GOOSE)", "FOOT " + I("[ʉ]") + " (= GOOSE)")],
          ["to", "tə", "tə", null],
          ["the", "ðə", "ðə", null],
          ["loch", "lɔx", "lɒk", t("велярный " + I("[x]"), "velar " + I("[x]"))]
        ] }
      ];
      var cur = 0, on = {}, checked = false;
      function paint() {
        var s = S[cur];
        el.innerHTML = seg(S.map(function (x) { return x.n; }), cur, "sample") +
          '<p class="fg-note">' + L(t("Нажми на слова, произношение которых отличается от RP, и проверь себя.", "Click the words whose pronunciation differs from RP, then check.")) + '</p><div class="v4-hunt">' +
          s.toks.map(function (k, i) {
            var cls = on[i] ? " sel" : "";
            if (checked) cls += k[3] ? (on[i] ? " ok" : " missed") : (on[i] ? " bad" : "");
            return '<button type="button" class="v4-tok' + cls + '" data-i="' + i + '" aria-pressed="' + !!on[i] + '"><span class="ex">' + k[0] + '</span><span class="ipa">[' + k[1] + "]</span>" +
              (checked ? '<small>RP <span class="ipa">[' + k[2] + "]</span>" + (k[3] ? "<br>" + L(k[3]) : "") + "</small>" : "") + "</button>";
          }).join("") + '</div><div class="row" style="margin-top:14px"><button type="button" class="btn btn-sm" data-act="check">' + U("check") + '</button><button type="button" class="btn btn-sm btn-ghost" data-act="reset">' + U("reset") + '</button></div><div class="fb" aria-live="polite"></div>';
        el.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { cur = +b.dataset.v; on = {}; checked = false; paint(); }); });
        el.querySelectorAll(".v4-tok").forEach(function (b) { b.addEventListener("click", function () { if (checked) return; var i = +b.dataset.i; on[i] = !on[i]; paint(); }); });
        el.querySelector('[data-act="check"]').addEventListener("click", function () {
          if (checked) return; checked = true; paint();
          var right = s.toks.filter(function (k, i) { return !!k[3] === !!on[i]; }).length, all = right === s.toks.length;
          el.querySelector(".fb").innerHTML = '<div class="feedback ' + (all ? "ok" : "bad") + '"><b>' + right + " " + U("of") + " " + s.toks.length + ".</b> " + L(t("Под каждым словом — RP для сравнения и название черты. Так же начинается анализ твоей записи: сначала найти отличия, потом описать их по признакам.", "Under each word you see RP for comparison and the name of the feature. Your own recording analysis starts the same way: first find the differences, then describe them by parameters.")) + "</div>";
          if (all) ctx.done();
        });
        el.querySelector('[data-act="reset"]').addEventListener("click", function () { on = {}; checked = false; paint(); });
      }
      paint();
    }
  });
})();
