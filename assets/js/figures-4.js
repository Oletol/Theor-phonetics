/* Семинар 4. Инфографика: территориальные варианты английского произношения. */
(function () {
  var I = function (s) { return '<span class="ipa">' + s + "</span>"; };
  var E = function (s) { return '<span class="ex">' + s + "</span>"; };
  var S = Figures._staff, hm = Figures._hm;

  function table(head, rows, cls) {
    return '<div class="fg-scroll"><table class="fg-table ' + (cls || "") + '"><thead><tr>' + head.map(function (h) { return "<th>" + L(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + L(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }
  function note(x) { return '<p class="fg-note">' + L(x) + "</p>"; }
  function box(h, body, cls) { return '<div class="fg-box ' + (cls || "") + '"><div class="fg-h">' + L(h) + "</div>" + body + "</div>"; }
  function p(x) { return "<p>" + L(x) + "</p>"; }
  function ul(items) { return "<ul>" + items.map(function (x) { return "<li>" + L(x) + "</li>"; }).join("") + "</ul>"; }
  function pair(rp, other) { return I(rp) + ' <span class="v4-vs">/</span> ' + I(other); }
  function staffBox(h, syls, mark, o) {
    return '<div class="v4-staff"><div class="fg-h">' + L(h) + "</div>" + S(syls, Object.assign({ step: 30, label: L(h) }, o || {})) + '<p class="fg-tone">' + mark + "</p></div>";
  }
  var u = function (x, y) { return { t: x, k: "u", y: y == null ? 0 : y }; };
  var s = function (x, y) { return { t: x, k: "s", y: y }; };

  Object.assign(Figures, {

    /* ---------- 4.1 ---------- */
    variationPlanes: function () {
      return '<div class="v4-planes">' +
        '<div class="v4-plane v4-hor"><div class="fg-h">' + L(t("Территориальная (горизонтальная) вариативность", "Territorial (horizontal) variation")) + "</div>" +
          '<div class="v4-chips">' + ["RP", "Cockney", "Yorkshire", "Geordie", "Welsh English", "Scottish English", "GA"].map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</div>" +
          p(t("Где живёт говорящий: страна, регион, город.", "Where the speaker lives: country, region, city.")) + "</div>" +
        '<div class="v4-plane v4-ver"><div class="fg-h">' + L(t("Социальная вариативность: стратификационная", "Social variation: stratificational")) + "</div>" +
          '<div class="v4-ladder">' + [t("upper class", "upper class"), t("middle class", "middle class"), t("working class", "working class")].map(function (x) { return "<span>" + L(x) + "</span>"; }).join("") + "</div>" +
          p(t("Кто говорит: класс, образование, профессия, возраст, пол.", "Who is speaking: class, education, occupation, age, gender.")) + "</div>" +
        '<div class="v4-plane"><div class="fg-h">' + L(t("Социальная вариативность: ситуативная", "Social variation: situational")) + "</div>" +
          '<div class="v4-chips">' + [t("лекция", "lecture"), t("интервью", "interview"), t("разговор с другом", "chat with a friend")].map(function (x) { return "<span>" + L(x) + "</span>"; }).join("") + "</div>" +
          p(t("В какой ситуации: функциональные стили, или фоностили.", "In what situation: functional styles, or phonostyles.")) + "</div>" +
        "</div>" + note(t("Два плана социально обусловленной вариативности выделяет А. Д. Швейцер (1983): стратификационный и ситуативный. Территориальная вариативность — предмет диалектологии.", "A. D. Shweitzer (1983) distinguishes two plans of socially conditioned variability: stratificational and situational. Territorial variation is the subject of dialectology."));
    },

    varietiesTree: function () {
      function leaf(x, cls) { return '<div class="v4-leaf ' + (cls || "") + '">' + L(x) + "</div>"; }
      return '<div class="v4-tree"><div class="v4-root">' + L(t("Варианты английского языка", "Varieties of English")) + '</div><div class="v4-branches">' +
        '<div class="v4-branch"><div class="v4-bh">' + L(t("Британские по происхождению стандарты", "English-based pronunciation standards")) + "</div>" +
          leaf(t("British English", "British English"), "v4-strong") +
          '<div class="v4-sub">' + leaf("English English") + leaf("Welsh English") + leaf("Scottish English") + leaf("Northern Ireland English") + "</div>" +
          leaf("Irish English") + leaf("Australian English") + leaf("New Zealand English") + leaf("South African English") + "</div>" +
        '<div class="v4-branch"><div class="v4-bh">' + L(t("Американские по происхождению стандарты", "American-based pronunciation standards")) + "</div>" +
          leaf("American English", "v4-strong") + leaf("Canadian English") + "</div>" +
        "</div></div>" + note(t("По Соколовой (рис. 15). Канадский английский отнесён к американской ветви: в произношении он ближе к GA, хотя в орфографии и лексике есть британские черты.", "After Sokolova (Fig. 15). Canadian English is placed in the American branch: its pronunciation is closer to GA, although its spelling and vocabulary have British features."));
    },

    nestedVarieties: function () {
      return '<div class="v4-nest"><div class="v4-n1"><b>' + L(t("Язык и национальный вариант", "Language and national variant")) + "</b><small>" + L(t("английский язык; британский, американский, австралийский варианты", "English; the British, American, Australian variants")) + "</small>" +
        '<div class="v4-n2"><b>' + L(t("Диалект", "Dialect")) + "</b><small>" + L(t("произношение + грамматика + лексика: " + E("I’m no going, wee bairn"), "pronunciation + grammar + vocabulary: " + E("I’m no going, wee bairn"))) + "</small>" +
        '<div class="v4-n3"><b>' + L(t("Акцент", "Accent")) + "</b><small>" + L(t("только произношение: " + I("[bʊk]") + " для " + E("buck"), "pronunciation only: " + I("[bʊk]") + " for " + E("buck"))) + "</small>" +
        '<div class="v4-n4"><b>' + L(t("Идиолект", "Idiolect")) + "</b><small>" + L(t("речь одного человека", "the speech of one person")) + "</small></div></div></div></div></div>" +
        note(t("Стандартное произношение — тоже акцент: RP или GA отличаются от других акцентов не «правильностью», а социальным статусом и кодификацией.", "A standard pronunciation is an accent too: RP or GA differ from other accents not in being “correct” but in their social status and codification."));
    },

    bilingDiglossia: function () {
      return '<div class="fg-two">' +
        box(t("Билингвизм", "Bilingualism"), p(t("Владение <b>двумя разными языками</b>: английским и французским в Канаде, английским и валлийским в Уэльсе. Противоположность — монолингвизм.", "Command of <b>two different languages</b>: English and French in Canada, English and Welsh in Wales. The opposite is monolingualism.")) +
          '<div class="v4-codes"><span>English</span><span class="v4-plus">+</span><span>Français</span></div>') +
        box(t("Диглоссия", "Diglossia"), p(t("Литературная форма <b>одного языка</b> и местный диалект у одного человека в разных ситуациях: имитация RP с учителем и родной акцент с друзьями.", "The standard form of <b>one language</b> and a regional dialect used by the same person in different situations: an imitation of RP with the teacher, the native accent with friends.")) +
          '<div class="v4-codes"><span>RP</span><span class="v4-plus">+</span><span>Yorkshire</span></div>') +
        "</div>" + note(t("В обоих случаях возможно переключение кодов (code-switching). Интерференция — «лингвистическое нарушение, которое возникает при контакте двух языков или диалектов в конкретной ситуации» (Crystal 1977: 254).", "Both involve code-switching. Interference is “linguistic disturbance which results from two languages (or dialects) coming into contact in a specific situation” (Crystal 1977: 254)."));
    },

    speakerVariation: function () {
      var rows = [
        [t("Физические", "Physical"), t("размер гортани и речевого тракта: диапазон частоты основного тона, форманты", "size of the larynx and vocal tract: F0 range, formants"), false],
        [t("Физиологические", "Physiological"), t("строение органов речи, дыхание, нервное управление", "anatomy of the vocal apparatus, breathing, neural control"), false],
        [t("Фонетические", "Phonetic"), t("качество гласных, выбор аллофонов, привычная высота голоса, просодия", "vowel quality, choice of allophones, habitual pitch, prosody"), true],
        [t("Фонологические", "Phonological"), t("инвентарь фонем и их распределение по словам", "the phoneme inventory and its distribution across words"), true],
        [t("Лексико-синтаксические", "Lexical and syntactic"), t("любимые слова, сочетания, конструкции", "favourite words, word sequences, constructions"), false],
        [t("Когнитивные", "Cognitive"), t("темы, отношение к событиям, знания", "topics, attitudes, knowledge"), false]
      ];
      return '<div class="v4-var">' + rows.map(function (r) { return '<div class="v4-var-r' + (r[2] ? " on" : "") + '"><b>' + L(r[0]) + "</b><span>" + L(r[1]) + "</span></div>"; }).join("") + "</div>" +
        note(t("Выделены уровни, которые описывает анализ акцента: фонетический и фонологический.", "The highlighted levels are the ones an accent analysis describes: phonetic and phonological."));
    },

    wellsTypes: function () {
      return table([t("Тип различия", "Type of difference"), t("Что меняется", "What differs"), t("Пример", "Example")], [
        ["<b>" + L(t("Системное", "Systemic")) + "</b>", t("инвентарь фонем", "the phoneme inventory"), t("на севере Англии нет фонемы " + I("/ʌ/") + ": " + E("put") + " и " + E("putt") + " звучат одинаково " + I("[pʊt]"), "the north of England has no " + I("/ʌ/") + ": " + E("put") + " and " + E("putt") + " are both " + I("[pʊt]"))],
        ["<b>" + L(t("Реализационное", "Realizational")) + "</b>", t("фонетическое качество той же фонемы", "the phonetic quality of the same phoneme"), t(E("face") + ": RP " + I("[eɪ]") + ", кокни " + I("[æɪ]") + ", Йоркшир " + I("[eː]"), E("face") + ": RP " + I("[eɪ]") + ", Cockney " + I("[æɪ]") + ", Yorkshire " + I("[eː]"))],
        ["<b>" + L(t("Дистрибутивное (фонотактическое)", "Distributional (phonotactic)")) + "</b>", t("позиции, где фонема возможна", "positions where the phoneme may occur"), t(I("/r/") + " после гласного: " + E("car") + " RP " + I("[kɑː]") + ", GA " + I("[kɑr]"), "postvocalic " + I("/r/") + ": " + E("car") + " RP " + I("[kɑː]") + ", GA " + I("[kɑr]"))],
        ["<b>" + L(t("Лексическое", "Lexical-incidental")) + "</b>", t("какая фонема выбрана в конкретном слове", "which phoneme a particular word has"), t(E("tomato") + ": RP " + I("[təˈmɑːtəʊ]") + ", GA " + I("[təˈmeɪtoʊ]"), E("tomato") + ": RP " + I("[təˈmɑːtəʊ]") + ", GA " + I("[təˈmeɪtoʊ]"))]
      ]) + note(t("Типология Дж. Уэллса (Accents of English, т. 1, 1982). Она пригодится для интерпретации изменений в собственном анализе.", "J. Wells’s typology (Accents of English, vol. 1, 1982). It helps to interpret the changes in your own analysis."));
    },

    kachruCircles: function () {
      var svg = '<svg viewBox="0 0 300 300" class="v4-kachru" role="img" aria-label="Kachru circles">' +
        '<circle class="v4-c3" cx="150" cy="150" r="146"/><circle class="v4-c2" cx="150" cy="150" r="100"/><circle class="v4-c1" cx="150" cy="150" r="52"/>' +
        '<text class="v4-ct" x="150" y="146">' + L(t("Внутренний", "Inner")) + '</text><text class="v4-cs" x="150" y="163">ENL</text>' +
        '<text class="v4-ct" x="150" y="76">' + L(t("Внешний", "Outer")) + '</text><text class="v4-cs" x="150" y="92">ESL</text>' +
        '<text class="v4-ct" x="150" y="28">' + L(t("Расширяющийся", "Expanding")) + '</text><text class="v4-cs" x="150" y="44">EFL</text></svg>';
      var leg = [[t("Внутренний круг: родной язык", "Inner circle: native language"), t("США, Великобритания, Канада, Австралия, Новая Зеландия; позже часто добавляют Ирландию", "USA, UK, Canada, Australia, New Zealand; later authors often add Ireland"), "v4-l1"],
        [t("Внешний круг: второй, официальный язык", "Outer circle: second, official language"), t("Индия, Нигерия, Сингапур, Филиппины", "India, Nigeria, Singapore, the Philippines"), "v4-l2"],
        [t("Расширяющийся круг: иностранный язык", "Expanding circle: foreign language"), t("Россия, Китай, Япония, Бразилия", "Russia, China, Japan, Brazil"), "v4-l3"]];
      return '<div class="v4-kach">' + svg + '<div class="v4-kleg">' + leg.map(function (x) { return '<div class="' + x[2] + '"><b>' + L(x[0]) + "</b><span>" + L(x[1]) + "</span></div>"; }).join("") + "</div></div>" +
        note(t("Модель трёх кругов Б. Качру (1985). Для задания семинара выбирай акцент из внутреннего круга. Место ЮАР в модели спорно: английский там родной лишь для части населения.", "B. Kachru’s three-circle model (1985). For the seminar task, choose an accent from the inner circle. The place of South Africa in the model is debated: English is native there for only part of the population."));
    },

    ruNorm: function () {
      return '<div class="fg-two">' +
        box(t("Русский язык", "Russian"), ul([
          t("Норма — литературное (орфоэпическое) произношение, единое для всей страны.", "The norm is literary (orthoepic) pronunciation, the same for the whole country."),
          t("Внутри нормы — старомосковский и петербургский варианты: " + E("булочная") + " " + I("[бу́лъшнъjъ] ~ [бу́лъчнъjъ]") + ", " + E("дожди") + " " + I("[дʌжʼжʼи́] ~ [дʌжд’и́]") + ".", "Within the norm there are Old Moscow and St Petersburg variants: " + E("булочная") + " " + I("[бу́лъшнъjъ] ~ [бу́лъчнъjъ]") + ", " + E("дожди") + " " + I("[дʌжʼжʼи́] ~ [дʌжд’и́]") + "."),
          t("Диалекты: северное оканье, южное аканье, фрикативный " + I("[ɣ]") + " на юге.", "Dialects: northern okanye, southern akanye, fricative " + I("[ɣ]") + " in the south.")
        ])) +
        box(t("Английский язык", "English"), ul([
          t("Несколько национальных стандартов: RP (SSB), GA, Educated Australian и другие.", "Several national standards: RP (SSB), GA, Educated Australian and others."),
          t("RP долго был социальным маркером, а не региональным: по нему нельзя понять, откуда говорящий.", "RP was long a social marker rather than a regional one: it does not tell you where the speaker comes from."),
          t("Региональные акценты широко звучат в образованной речи, в том числе в СМИ.", "Regional accents are widely heard in educated speech, including the media.")
        ])) + "</div>";
    },

    /* ---------- 4.2 ---------- */
    rpTypes: function () {
      return '<div class="fg-two">' +
        box(t("Гимсон (1981)", "Gimson (1981)"), '<div class="v4-types">' +
          '<div><b>' + L(t("консервативный", "conservative")) + "</b><small>" + L(t("старшее поколение, некоторые профессии и социальные группы", "older generation, certain professions and social groups")) + "</small></div>" +
          '<div class="on"><b>' + L(t("общий", "general")) + "</b><small>" + L(t("самый распространённый, типичен для BBC", "most commonly used, typified by the BBC")) + "</small></div>" +
          '<div><b>' + L(t("продвинутый", "advanced")) + "</b><small>" + L(t("молодёжь эксклюзивных социальных групп, некоторые профессии", "young people of exclusive social groups, certain professional circles")) + "</small></div></div>") +
        box(t("Круттенден (2001)", "Cruttenden (2001)"), '<div class="v4-types">' +
          '<div class="on"><b>General RP</b><small>' + L(t("нейтральный, BBC English", "neutral, BBC English")) + "</small></div>" +
          '<div><b>Refined RP</b><small>' + L(t("аристократия, Oxford English, King’s English", "the upper class, Oxford English, King’s English")) + "</small></div>" +
          '<div><b>Regional RP</b><small>' + L(t("близок к RP, но с региональными чертами; сюда относят Estuary English", "close to RP but with regional features; Estuary English belongs here")) + "</small></div></div>") +
        "</div>" + note(t("По оценкам, которые приводит Соколова, на RP говорят лишь 3–5 % населения Англии.", "According to the estimates Sokolova cites, only 3–5% of the population of England speak RP."));
    },

    ssbShift: function () {
      /* Четырёхугольник гласных: старое качество — полый кружок, новое — закрашенный. Метки расставлены вручную. */
      var V = [
        /* ключ, старая точка, символ, позиция метки [x, y, anchor], новая точка, символ, метка, метка ключа */
        ["GOOSE", [408, 40], "uː", [418, 45, "start"], [262, 40], "ʉː", [262, 62, "middle"], [262, 76, "middle"]],
        ["FOOT", [362, 82], "ʊ", [372, 80, "start"], [262, 104], "ɵ", [250, 109, "end"], [262, 124, "middle"]],
        ["THOUGHT", [408, 165], "ɔː", [418, 170, "start"], [408, 118], "oː", [418, 122, "start"], [418, 137, "start"]],
        ["LOT", [412, 250], "ɒ", [422, 256, "start"], [408, 205], "ɔ", [418, 209, "start"], [418, 224, "start"]],
        ["STRUT", [300, 200], "ʌ", [300, 188, "middle"], [356, 200], "ʌ", [356, 188, "middle"], [328, 222, "middle"]],
        ["DRESS", [107, 120], "e", [95, 124, "end"], [128, 166], "ɛ", [116, 170, "end"], [116, 184, "end"]],
        ["TRAP", [151, 214], "æ", [139, 218, "end"], [170, 254], "a", [158, 258, "end"], [158, 272, "end"]]
      ];
      var g = '<svg viewBox="0 0 480 290" class="v4-quad" role="img" aria-label="vowel shift">' +
        '<path class="v4-qline" d="M60 30 L420 30 L420 260 L172 260 Z"/>' +
        '<path class="v4-qgrid" d="M97 107 L420 107 M134 184 L420 184 M240 30 L296 260"/>';
      V.forEach(function (v) {
        var a = v[1], b = v[4];
        g += '<line class="v4-qmove" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>' +
          '<circle class="v4-qold" cx="' + a[0] + '" cy="' + a[1] + '" r="5"/><circle class="v4-qnew" cx="' + b[0] + '" cy="' + b[1] + '" r="6"/>' +
          '<text class="v4-qsym v4-qo" x="' + v[3][0] + '" y="' + v[3][1] + '" text-anchor="' + v[3][2] + '">' + v[2] + "</text>" +
          '<text class="v4-qsym" x="' + v[6][0] + '" y="' + v[6][1] + '" text-anchor="' + v[6][2] + '">' + v[5] + "</text>" +
          '<text class="v4-qkey" x="' + v[7][0] + '" y="' + v[7][1] + '" text-anchor="' + v[7][2] + '">' + v[0] + "</text>";
      });
      g += '<text class="fg-cap" x="60" y="18">' + L(t("передний", "front")) + '</text><text class="fg-cap" x="240" y="18">' + L(t("центральный", "central")) + '</text><text class="fg-cap" x="420" y="18">' + L(t("задний", "back")) + "</text></svg>";
      return g + '<p class="fg-note"><span class="v4-key-old"></span> ' + L(t("качество в RP Гимсона (1962)", "quality in Gimson’s RP (1962)")) + ' &nbsp; <span class="v4-key-new"></span> ' + L(t("качество в современном SSB по Линдси (2019). SQUARE стал монофтонгом " + I("[ɛː]") + ", PRICE начинается дальше назад, MOUTH — дальше вперёд.", "quality in present-day SSB after Lindsey (2019). SQUARE has become the monophthong " + I("[ɛː]") + ", PRICE starts further back and MOUTH further forward.")) + "</p>";
    },

    rpVowelChanges: function () {
      return table([t("Тенденция", "Tendency"), t("Пример", "Example")], [
        [t("Дифтонгизация долгих " + I("[iː], [uː]") + ": дифтонгоиды", "Diphthongization of long " + I("[iː], [uː]") + ": diphthongoids"), E("see, too")],
        [t("Сглаживание дифтонгов в конце слова", "Smoothing of word-final diphthongs"), E("today") + " " + I("[təˈdeɪ] ~ [təˈdeː]")],
        [t("Сглаживание трифтонгов", "Smoothing of triphthongs"), E("tower, fire") + ": " + I("[taʊə] [taə] [tɑː]") + ", " + I("[faɪə] [faə] [fɑː]")],
        [t("Выравнивание " + I("[ɔə], [ʊə]") + " в " + I("[ɔː]"), "Levelling of " + I("[ɔə], [ʊə]") + " to " + I("[ɔː]")), E("poor") + " " + I("[pʊə] [pɔː]") + ", " + E("pore") + " " + I("[pɔː]")],
        [t("Централизация", "Centring"), E("go") + " " + I("[ɡoʊ] [ɡəʊ]") + "; " + E("but") + " " + I("[bʌt] [bət]") + "; " + E("good") + " " + I("[ɡʊd] [ɡəd]")],
        [t("Понижение " + I("[æ]"), "Lowering of " + I("[æ]")), E("have, and") + " " + I("[hav], [and]")],
        [t("Сужение " + I("[e], [ɔː]"), "Closing of " + I("[e], [ɔː]")), E("dead") + " " + I("[ded]") + ", " + E("bought") + " " + I("[boːt]")],
        [t("Открытое ядро " + I("[ɛə]"), "An open nucleus in " + I("[ɛə]")), E("careful") + " " + I("[ˈkɛəful] [ˈkɛːful]")],
        [t("Удлинение кратких гласных", "Lengthening of short vowels"), E("big, good, yes, bad") + "; " + E("very") + " " + I("[ˈveriː]")]
      ]) + note(t("По Соколовой (6.3.3). Старшее и младшее поколения часто произносят одно слово по-разному: " + E("poor") + " — " + I("[pʊə]") + " у старших, " + I("[pɔː]") + " у молодых.", "After Sokolova (6.3.3). Older and younger speakers often say the same word differently: " + E("poor") + " is " + I("[pʊə]") + " for older speakers and " + I("[pɔː]") + " for younger ones."));
    },

    rpConsonantChanges: function () {
      return table([t("Изменение", "Change"), t("Пример", "Example"), t("Статус", "Status")], [
        [t("Оглушение конечных звонких", "Devoicing of final voiced consonants"), E("deed") + " " + I("[diːd̥]"), t("растёт; различие держится на силе (fortis/lenis) и длине гласного", "growing; the contrast is kept by force (fortis/lenis) and vowel length")],
        [t("Глottal stop " + I("[ʔ]") + " вместо " + I("[t]"), "Glottal stop " + I("[ʔ]") + " for " + I("[t]")), E("not quite") + " " + I("[ˈnɒʔ ˈkwaɪt]"), t("перед согласным — норма; между гласными — нет", "before a consonant it is standard; between vowels it is not")],
        [t("Опущение " + I("[h]") + " в служебных словах", "Loss of " + I("[h]") + " in form words"), E("She wants her to come") + " " + I("[ʃi ˈwɒnts ə tə ˈkʌm]"), t("норма в безударной позиции", "standard in unstressed position")],
        [I("[ʍ]") + " в " + E("why, which"), I("[ʍ]") + " in " + E("why, which"), I("[ʍ] [w]"), t("сохраняется у консервативных носителей", "kept by conservative speakers")],
        [t("Тёмный " + I("[ɫ]") + " и вокализация " + I("[l]"), "Dark " + I("[ɫ]") + " and " + I("[l]") + "-vocalization"), E("believe, people"), t("под влиянием американского, нормой не стал", "American influence, not a norm")],
        [t("Связующий и вставочный " + I("[r]"), "Linking and intrusive " + I("[r]")), E("far away; idea of, China and"), t("связующий — норма; вставочный — у молодых", "linking is standard; intrusive is used by younger speakers")],
        [t("Коалесценция " + I("[tj] [dj] [sj]"), "Coalescence of " + I("[tj] [dj] [sj]")), E("actual") + " " + I("[ˈækʃʊəl]") + ", " + E("issue") + " " + I("[ˈɪʃuː]"), t("широко распространена", "widespread")],
        [t("Выпадение " + I("[j]") + " после " + I("[l s]"), "Loss of " + I("[j]") + " after " + I("[l s]")), E("suit") + " " + I("[suːt]") + ", " + E("lute") + " " + I("[luːt]"), t("преобладает у молодых", "prevails among younger speakers")],
        [t("Произношение по написанию", "Spelling pronunciation"), E("often") + " " + I("[ˈɒftən]") + ", " + E("Monday") + " " + I("[ˈmʌndeɪ]"), t("свободные варианты", "free variants")]
      ]) + note(t("Соколова отмечает также озвончение интервокального " + I("[t]") + " " + E("better") + " " + I("[ˈbedə]") + " и палатализацию конечного " + I("[k]") + " " + E("week") + " " + I("[wiːkʼ]") + ".", "Sokolova also notes the voicing of intervocalic " + I("[t]") + " " + E("better") + " " + I("[ˈbedə]") + " and palatalized final " + I("[k]") + " " + E("week") + " " + I("[wiːkʼ]") + "."));
    },

    rpIntonation: function () {
      var a = [u("I"), u("was"), s("born", .86), u("in"), { t: "Lon", k: "r", y: .02, y2: .48, n: true }, u("don")];
      var b = [s("Love", .88), u("ly"), { t: "day", k: "f", y: .5, y2: 0, n: true, b: true }, { t: "is", k: "f", y: .45, y2: 0, n: true }, u("n’t"), u("it")];
      var c = [s("Where", .88), u("were"), u("you"), { t: "born", k: "r", y: .02, y2: .5, n: true }];
      return '<div class="fg-three">' +
        staffBox(t("Подъём в повествовательном монологе", "A rise in a descriptive monologue"), a, "I was ˈborn in ˏLondon.") +
        staffBox(t("Низкий нисходящий в разделительном вопросе", "Low Fall in a tag question"), b, "ˈLovely ˎday, ˎisn’t it?") +
        staffBox(t("Подъём в специальном вопросе: интерес", "A rise in a wh-question: interest"), c, "ˈWhere were you ˏborn?") +
        "</div>" + note(t("Три тенденции, которые описывает Соколова. Линдси добавляет: общий вопрос с низким подъёмом после шага вниз (Low Bounce) звучит старомодно, нейтральный вариант — нисходяще-восходящий тон; распространяется uptalk.", "The three tendencies Sokolova describes. Lindsey adds that a yes-no question with a stepped-down Low Rise (Low Bounce) now sounds old-fashioned, the neutral option is the Fall-Rise, and uptalk is spreading."));
    },

    rpVsSsb: function () {
      var rows = [["TRAP", "æ", "a"], ["DRESS", "e", "ɛ"], ["LOT", "ɒ", "ɔ"], ["THOUGHT", "ɔː", "oː"], ["GOOSE", "uː", "ʉː"], ["FOOT", "ʊ", "ɵ"], ["SQUARE", "eə", "ɛː"], ["NEAR", "ɪə", "ɪː"], ["CURE", "ʊə", "oː"], ["happY", "ɪ", "i"]];
      return '<div class="fg-two">' +
        box(t("Соколова и др. (2010)", "Sokolova et al. (2010)"), p(t("Описывают <b>RP</b> в трёх разновидностях и изменения в нём как допустимые варианты, которые появляются у молодого поколения. Опорная транскрипция — традиционная, Джоунза и Гимсона.", "Describe <b>RP</b> in three types and its changes as permissible variants emerging in the younger generation. The reference transcription is the traditional one of Jones and Gimson."))) +
        box(t("Линдси (2019)", "Lindsey (2019)"), p(t("Считает RP акцентом прошлого и описывает <b>SSB</b> — Standard Southern British. Символы Гимсона, по его мнению, «окаменели» и уже не отражают реальных качеств гласных.", "Considers RP an accent of the past and describes <b>SSB</b>, Standard Southern British. In his view Gimson’s symbols have “fossilized” and no longer reflect the actual vowel qualities."))) +
        "</div>" + table([t("Лексическое множество", "Lexical set"), t("Символ Гимсона", "Gimson’s symbol"), t("SSB по Линдси", "SSB after Lindsey")], rows.map(function (r) { return ["<b>" + r[0] + "</b>", I(r[1]), I(r[2])]; }), "fg-mini");
    },

    ruRpLearners: function () {
      return table([t("Черта", "Feature"), t("Что делать русскому учащемуся", "What a Russian learner should do")], [
        [I("[æ]") + " " + L(t("в", "in")) + " " + E("bad, man"), t("Не преувеличивать узость и «э»-образность: в современном стандарте гласный открытее, ближе к " + I("[a]") + ". Но и не заменять его русским " + I("[а]") + ": он остаётся передним.", "Do not exaggerate its closeness and “э”-like quality: in today’s standard the vowel is more open, nearer " + I("[a]") + ". But do not replace it with Russian " + I("[а]") + ": it stays front.")],
        [I("[ɛː]") + " " + L(t("в", "in")) + " " + E("care, where"), t("Долгий монофтонг, похожий на долгое русское " + I("[э]") + ", допустим и распространён.", "A long monophthong similar to a long Russian " + I("[э]") + " is acceptable and widespread.")],
        [I("[ʔ]"), t("Использовать только перед согласным: " + E("football, Great Britain") + ". Между гласными (" + E("water") + ") — это уже региональная черта.", "Use it only before a consonant: " + E("football, Great Britain") + ". Between vowels (" + E("water") + ") it is a regional feature.")],
        [t("вставочный " + I("[r]"), "intrusive " + I("[r]")), t("Не обязателен; связующий " + I("[r]") + " (" + E("far away") + ") желателен.", "Not required; linking " + I("[r]") + " (" + E("far away") + ") is desirable.")],
        [t("общий вопрос", "a yes-no question"), t("Нейтрально звучит нисходяще-восходящий тон или высокий подъём. Русская ИК-3 с пиком на ударном слоге звучит в английском непривычно (тема 3.5).", "The Fall-Rise or a High Rise sounds neutral. Russian ИК-3 with its peak on the stressed syllable sounds unusual in English (topic 3.5).")]
      ]);
    },

    /* ---------- 4.3 ---------- */
    accentGroups: function () {
      return '<div class="fg-two">' +
        box(t("Южные акценты", "Southern accents"), ul([
          t("<b>Южный</b>: Большой Лондон, кокни, Суррей, Кент, Эссекс, Хартфордшир, Бакингемшир", "<b>Southern</b>: Greater London, Cockney, Surrey, Kent, Essex, Hertfordshire, Buckinghamshire"),
          t("<b>Восточная Англия</b>: Линкольншир, Норфолк, Суффолк, Кембриджшир, Бедфордшир, Нортгемптоншир, Лестершир", "<b>East Anglia</b>: Lincolnshire, Norfolk, Suffolk, Cambridgeshire, Bedfordshire, Northamptonshire, Leicestershire"),
          t("<b>Юго-Запад</b>: Глостершир, Эйвон, Сомерсет, Уилтшир", "<b>South West</b>: Gloucestershire, Avon, Somerset, Wiltshire")
        ])) +
        box(t("Северные и центральные акценты", "Northern and Midland accents"), ul([
          t("<b>Северный</b>: Нортумберленд, Дарем (Ньюкасл)", "<b>Northern</b>: Northumberland, Durham (Newcastle)"),
          t("<b>Йоркшир</b>", "<b>Yorkshire</b>"),
          t("<b>Северо-Запад</b>: Ланкашир, Чешир (Манчестер, Ливерпуль)", "<b>North West</b>: Lancashire, Cheshire (Manchester, Liverpool)"),
          t("<b>Западный Мидленд</b>: Бирмингем, Вулвергемптон", "<b>West Midlands</b>: Birmingham, Wolverhampton")
        ])) + "</div>" + note(t("Деление по Соколовой (табл. 15) приблизительное: западные и восточные акценты по основным чертам совпадают с южными или с северными.", "Sokolova’s grouping (Table 15) is approximate: western and eastern accents coincide in their main features with either the southern or the northern ones."));
    },

    lexicalSets: function () {
      var rows = [["KIT", "ɪ", "ɪ"], ["DRESS", "e", "ɛ"], ["TRAP", "æ", "æ"], ["LOT", "ɒ", "ɑ"], ["STRUT", "ʌ", "ʌ"], ["FOOT", "ʊ", "ʊ"], ["BATH", "ɑː", "æ"], ["CLOTH", "ɒ", "ɔ"], ["NURSE", "ɜː", "ɝ"], ["FLEECE", "iː", "i"], ["FACE", "eɪ", "eɪ"], ["PALM", "ɑː", "ɑ"],
        ["THOUGHT", "ɔː", "ɔ"], ["GOAT", "əʊ", "oʊ"], ["GOOSE", "uː", "u"], ["PRICE", "aɪ", "aɪ"], ["CHOICE", "ɔɪ", "ɔɪ"], ["MOUTH", "aʊ", "aʊ"], ["NEAR", "ɪə", "ɪr"], ["SQUARE", "eə", "ɛr"], ["START", "ɑː", "ɑr"], ["NORTH", "ɔː", "ɔr"], ["FORCE", "ɔː", "or"], ["CURE", "ʊə", "ʊr"]];
      var half = Math.ceil(rows.length / 2);
      function tb(rs) { return table([t("Множество", "Set"), "RP", "GA"], rs.map(function (r) { return ["<b>" + r[0] + "</b>", I(r[1]), I(r[2])]; }), "fg-mini v4-ls"); }
      return '<div class="fg-two">' + tb(rows.slice(0, half)) + tb(rows.slice(half)) + "</div>" +
        note(t("Каждое ключевое слово — это целый класс слов с одним и тем же гласным в RP и GA. Говоря «в этом акценте гласный BATH — " + I("[a]") + "», мы имеем в виду все слова типа " + E("bath, dance, path, last") + ". Добавочные множества: happY, lettER, commA.", "Each keyword stands for a whole class of words with the same vowel in RP and GA. Saying “in this accent the BATH vowel is " + I("[a]") + "” means all words like " + E("bath, dance, path, last") + ". Additional sets: happY, lettER, commA."));
    },

    northSouth: function () {
      var rows = [
        [t("FOOT–STRUT: нет " + I("/ʌ/") + " на севере", "FOOT–STRUT: no " + I("/ʌ/") + " in the north"), E("blood, one, but"), I("[blʌd] [wʌn] [bʌt]"), I("[blʊd] [wʊn] [bʊt]")],
        [t(I("[uː]") + " в некоторых словах с " + I("oo"), I("[uː]") + " in some " + I("oo") + " words"), E("book, look"), I("[bʊk] [lʊk]"), I("[buːk] [luːk]")],
        [t("BATH: " + I("[a]") + " вместо " + I("[ɑː]"), "BATH: " + I("[a]") + " instead of " + I("[ɑː]")), E("path, dance"), I("[pɑːθ] [dɑːns]"), I("[paθ] [dans]")],
        [t("Удлинённый TRAP на юге", "Lengthened TRAP in the south"), E("bad"), I("[bæːd]"), I("[bad]")],
        [t("happY", "happY"), E("city, money"), I("[ˈsɪtiː] [ˈmʌniː]"), I("[ˈsɪtɪ] [ˈmʊnɪ]")]
      ];
      return '<div class="fg-scroll"><table class="fg-table"><thead><tr><th>' + L(t("Различие", "Difference")) + "</th><th>" + L(t("Слова", "Words")) + "</th><th>" + L(t("Юг", "South")) + "</th><th>" + L(t("Север", "North")) + "</th></tr></thead><tbody>" +
        rows.map(function (r) { return "<tr><td>" + L(r[0]) + "</td><td>" + r[1] + "</td><td>" + r[2] + "</td><td>" + r[3] + "</td></tr>"; }).join("") + "</tbody></table></div>" +
        note(t("Ньюкасл — исключение: там в " + E("city") + " долгий " + I("[iː]") + ", как на юге. У сильно южных нелитературных акцентов противопоставление " + I("/æ/ – /ɑː/") + " может быть неустойчивым.", "Newcastle is an exception: " + E("city") + " has long " + I("[iː]") + " there, as in the south. In strongly regional southern accents the " + I("/æ/ – /ɑː/") + " contrast may be variable."));
    },

    englandConsonants: function () {
      return table([t("Черта", "Feature"), t("Где", "Where"), t("Пример", "Example")], [
        [t("Ротичность: " + I("[r]") + " после гласного", "Rhoticity: postvocalic " + I("[r]")), t("юго-запад Англии, части Ланкашира; Шотландия, Ирландия", "the south-west of England, parts of Lancashire; Scotland, Ireland"), E("bar, farm") + " " + I("[bɑːr] [fɑːrm]")],
        [t("Гортанная смычка шире, чем в RP", "Glottal stop more widely than in RP"), t("большинство региональных акцентов", "most regional accents"), E("pity") + " " + I("[ˈpɪʔiː]")],
        [t("Глоттализация " + I("[p t k]"), "Glottalization of " + I("[p t k]")), t("северо-восток, Восточная Англия", "the north-east, East Anglia"), E("pity") + " " + I("[ˈpɪʔtiː]")],
        [I("-ing") + " " + L(t("как", "as")) + " " + I("[ɪn]"), t("многие нелитературные акценты", "many non-RP accents"), E("sitting") + " " + I("[ˈsɪtɪn]")],
        [I("-ing") + " " + L(t("как", "as")) + " " + I("[ɪŋɡ]"), t("Бирмингем, Манчестер, Ливерпуль", "Birmingham, Manchester, Liverpool"), E("singer") + " " + I("[ˈsɪŋɡə]") + ", " + E("wing") + " " + I("[wɪŋɡ]")],
        [t("Выпадение " + I("[j]"), "Yod-dropping"), t("Восточная Англия — после любого согласного; Лондон — после " + I("[n t d]"), "East Anglia — after any consonant; London — after " + I("[n t d]")), E("news") + " " + I("[nuːz]") + ", " + E("tune") + " " + I("[tuːn]")],
        [t("Опущение " + I("[h]"), "H-dropping"), t("почти все акценты Англии, кроме северо-востока", "almost all accents of England except the north-east"), E("house") + " " + I("[aʊs]")]
      ]);
    },

    cockney: function () {
      return '<div class="fg-two">' +
        box(t("Гласные", "Vowels"), table([t("RP", "RP"), t("Кокни", "Cockney"), t("Пример", "Example")], [
          ["TRAP " + I("[æ]"), I("[ɛ] ~ [ɛɪ]"), E("bag") + " " + I("[bɛɪɡ]")],
          ["STRUT " + I("[ʌ]"), I("[a] ~ [ɐ]"), E("blood") + " " + I("[blad]")],
          ["happY " + I("[ɪ]"), I("[iː]"), E("city") + " " + I("[ˈsɪʔiː]")],
          ["FACE " + I("[eɪ]"), I("[æɪ] ~ [aɪ]"), E("lady") + " " + I("[ˈlæɪdiː]")],
          ["GOAT " + I("[əʊ]"), I("[æʊ] ~ [ɐʊ]"), E("soaked") + " " + I("[sæʊkt]")],
          ["MOUTH " + I("[aʊ]"), I("[æə] ~ [æː]"), E("now") + " " + I("[næə]")],
          ["THOUGHT " + I("[ɔː]"), I("[oː]; [ɔə]") + " " + L(t("в конце", "finally")), E("pause, paw") + " " + I("[poːz] [pɔə]")]
        ], "fg-mini")) +
        box(t("Согласные", "Consonants"), table([t("Черта", "Feature"), t("Пример", "Example")], [
          [t("нет " + I("[h]") + " в безударной позиции", "no " + I("[h]") + " in unstressed position"), E("have you seen him")],
          [I("[ʔ]") + " " + L(t("между гласными", "between vowels")), E("butterfly") + " " + I("[ˈbaʔəflaɪ]")],
          [I("[θ] [f]") + " " + L(t("совпали", "merged")), E("thin, booth") + " " + I("[fɪn] [buːf]")],
          [I("[ð] [v]") + ", " + I("[d]") + " " + L(t("в начале слова", "word-initially")), E("weather, this") + " " + I("[ˈwevə] [dɪs]")],
          [t("вокализация " + I("[l]"), I("[l]") + "-vocalization"), E("milk, table") + " " + I("[mɪʊk] [ˈtæɪbʊ]")],
          [I("[ɪn]") + ", " + I("[ɪŋk]"), E("dancing, nothing") + " " + I("[ˈdɑːnsɪn] [ˈnafɪŋk]")],
          [t("сильная аспирация, аффрикация " + I("[t]"), "strong aspiration, affricated " + I("[t]")), E("top") + " " + I("[tsɒp]")]
        ], "fg-mini")) +
        "</div>" + note(t("Соколова (6.3.4.A) приводит для " + E("blood") + " транскрипцию " + I("[blæɪd]") + "; Уэллс описывает гласный STRUT в кокни как открытый передний " + I("[a]") + ". Сверяй свои записи со вторым описанием. Сдвиг ядер дифтонгов (FACE, GOAT, MOUTH) Уэллс называет Diphthong Shift.", "Sokolova (6.3.4.A) transcribes " + E("blood") + " as " + I("[blæɪd]") + "; Wells describes the Cockney STRUT vowel as open front " + I("[a]") + ". Check your recordings against the latter. Wells calls the shift of diphthong nuclei (FACE, GOAT, MOUTH) the Diphthong Shift."));
    },

    geordie: function () {
      return '<div class="fg-two">' +
        box(t("Ньюкасл (Tyneside, Geordie)", "Newcastle (Tyneside, Geordie)"), table([t("Черта", "Feature"), t("Пример", "Example")], [
          ["STRUT " + I("[ʊ]"), E("love") + " " + I("[lʊv]")],
          ["happY " + I("[iː]"), E("city") + " " + I("[ˈsɪtiː]")],
          ["BATH " + I("[æ] ~ [a]"), E("dance, chance") + " " + I("[dæns] [tʃæns]")],
          ["FACE, GOAT " + L(t("монофтонги или", "monophthongs or")) + " " + I("[ɪə] [ʊə]"), E("plate, boat") + " " + I("[pleːt] [boːt]")],
          [I("al") + " " + L(t("как", "as")) + " " + I("[aː]"), E("talk, all") + " " + I("[taːk] [aːl]")],
          ["NURSE " + I("[ɔː]"), E("first, shirt") + " " + I("[fɔːst] [ʃɔːt]")],
          ["PRICE " + I("[ɛɪ]") + ", MOUTH " + I("[uː]"), E("right, about") + " " + I("[rɛɪt] [əˈbuːt]")],
          [t("светлый " + I("[l]") + "; " + I("[h]") + " сохраняется", "clear " + I("[l]") + "; " + I("[h]") + " is kept"), E("hill") + " " + I("[hɪl]")],
          [t("глоттализованные " + I("[p t k]") + "; увулярный " + I("[ʁ]") + " почти исчез", "glottalized " + I("[p t k]") + "; uvular " + I("[ʁ]") + " has almost disappeared"), E("pity") + " " + I("[ˈpɪʔtiː]")]
        ], "fg-mini")) +
        box(t("Йоркшир", "Yorkshire"), table([t("Черта", "Feature"), t("Пример", "Example")], [
          ["STRUT " + I("[ʊ]"), E("cup") + " " + I("[kʊp]")],
          ["BATH " + I("[a]"), E("bath") + " " + I("[baθ]")],
          ["FACE, GOAT " + L(t("монофтонги", "monophthongs")), E("make, home") + " " + I("[meːk] [oːm]")],
          [I("ow, ou") + " " + L(t("как", "as")) + " " + I("[ɔʊ]"), E("know") + " " + I("[nɔʊ]")],
          ["happY " + I("[ɪ]"), E("city") + " " + I("[ˈsɪtɪ]")]
        ], "fg-mini") + p(t("В Йоркшире и Брадфорде гласные совпадают с северными по пунктам 1, 3, 4 у Соколовой; согласные — тоже северные.", "In Yorkshire and Bradford the vowels coincide with the northern ones in Sokolova’s points 1, 3 and 4; the consonants are northern too."))) +
        "</div>";
    },

    mle: function () {
      return table([t("Черта", "Feature"), t("Пример", "Example"), t("Комментарий", "Comment")], [
        ["FACE " + I("[e̝ɪ] ~ [eː]"), E("face"), t("ядро выше, чем в кокни " + I("[æɪ]"), "a closer nucleus than Cockney " + I("[æɪ]"))],
        ["PRICE " + I("[aɪ] ~ [a]"), E("time"), t("ядро более переднее, чем " + I("[ɑɪ]") + " кокни; возможен монофтонг", "a fronter nucleus than Cockney " + I("[ɑɪ]") + "; a monophthong is possible")],
        ["GOAT " + I("[oː] ~ [ɔʊ]"), E("home"), t("заднее ядро, в отличие от " + I("[ɐʊ]") + " кокни", "a back nucleus, unlike Cockney " + I("[ɐʊ]"))],
        ["GOOSE " + I("[yː]"), E("school"), t("сильное продвижение вперёд", "strong fronting")],
        [t("TH-fronting, " + I("[d]") + " вместо " + I("[ð]"), "TH-fronting, " + I("[d]") + " for " + I("[ð]")), E("think, them") + " " + I("[fɪŋk] [dem]"), t("общие с кокни", "shared with Cockney")],
        [t(I("[k]") + " отодвигается назад", "backed " + I("[k]")), E("cousin") + " " + I("[qʌzn]"), t("перед задними гласными нижнего и среднего подъёма", "before non-high back vowels")],
        [t("меньше опущения " + I("[h]"), "less H-dropping"), E("house") + " " + I("[haʊs]"), t("в отличие от кокни", "unlike Cockney")],
        [t("ритм ближе к слоговому", "rhythm closer to syllable-timed"), "—", t("у молодёжи неанглийского происхождения (Torgersen & Szakay 2012)", "in young speakers of non-Anglo background (Torgersen & Szakay 2012)")]
      ]) + note(t("Multicultural London English сложился в многоязычных районах восточного Лондона в 1990–2000-е годы. Соколова его не описывает; данные — по исследованиям П. Кервилла, Дж. Чешир, С. Фокс и Э. Торгерсена (2008, 2011). Кервилл описывает изменения дифтонгов как обращение Diphthong Shift: ядра возвращаются к значениям, близким к RP.", "Multicultural London English emerged in multilingual areas of East London in the 1990s–2000s. Sokolova does not describe it; the data come from research by P. Kerswill, J. Cheshire, S. Fox and E. Torgersen (2008, 2011). Kerswill describes the diphthong changes as a reversal of the Diphthong Shift: the nuclei move back towards RP-like values."));
    },

    ruDialects: function () {
      return table([t("Тип различия по Уэллсу", "Wells’s type"), t("Английский", "English"), t("Русский", "Russian")], [
        [t("Системное", "Systemic"), t("на севере Англии нет " + I("/ʌ/"), "no " + I("/ʌ/") + " in the north of England"), t("в южных говорах фрикативный " + I("[ɣ]") + " на месте " + I("[ɡ]"), "fricative " + I("[ɣ]") + " in place of " + I("[ɡ]") + " in southern dialects")],
        [t("Реализационное", "Realizational"), t(E("face") + " " + I("[eɪ] [æɪ] [eː]"), E("face") + " " + I("[eɪ] [æɪ] [eː]")), t("цоканье: " + I("[ц]") + " вместо " + I("[ч]") + " в северо-западных говорах", "tsokanye: " + I("[ц]") + " for " + I("[ч]") + " in north-western dialects")],
        [t("Дистрибутивное", "Distributional"), t(I("/r/") + " после гласного", "postvocalic " + I("/r/")), t("оканье: " + I("[о]") + " в безударном слоге " + E("вода") + " " + I("[водá]"), "okanye: " + I("[о]") + " in an unstressed syllable " + E("вода") + " " + I("[водá]"))],
        [t("Лексическое", "Lexical"), E("book") + " " + I("[buːk]"), t("ударение " + E("звóнит") + " в просторечии", "stress " + E("звóнит") + " in colloquial speech")]
      ]) + note(t("Русские говоры почти не звучат в городской речи образованных людей, а английские региональные акценты — звучат. Поэтому для англичанина акцент собеседника — привычный источник сведений о нём.", "Russian rural dialects are hardly heard in the urban speech of educated people, while English regional accents are. That is why for an English speaker the interlocutor’s accent is a familiar source of information about them."));
    },

    /* ---------- 4.4 ---------- */
    welsh: function () {
      return '<div class="fg-two">' +
        box(t("Гласные", "Vowels"), table(["", t("Пример", "Example")], [
          [t("BATH как на севере: " + I("[a]"), "BATH as in the north: " + I("[a]")), E("last, dance")],
          [t("безударное " + I("a") + " звучит как " + I("[a]"), "unstressed " + I("a") + " as " + I("[a]")), E("sofa") + " " + I("[ˈsoːfa]")],
          [t("нет противопоставления " + I("[ʌ] – [ə]"), "no " + I("[ʌ] – [ə]") + " contrast"), E("rubber") + " " + I("[ˈrəbə]")],
          [t("конечный " + I("[iː]"), "final " + I("[iː]")), E("city") + " " + I("[ˈsɪtiː]")],
          [I("[ɪu]") + " " + L(t("вместо", "for")) + " " + I("[juː]"), E("tune, few") + " " + I("[tɪun] [fɪu]")],
          [t("монофтонги в FACE, GOAT", "monophthongs in FACE, GOAT"), E("bake, boat") + " " + I("[beːk] [boːt]")],
          [t("NURSE с округлением (юго-восток)", "rounded NURSE (south-east)"), E("church") + " " + I("[tʃøːtʃ]")],
          [t("нет " + I("[ɪə] [ʊə]"), "no " + I("[ɪə] [ʊə]")), E("fear, poor") + " " + I("[ˈfiːjə] [ˈpuːwə]")]
        ], "fg-mini")) +
        box(t("Согласные и интонация", "Consonants and intonation"), table(["", t("Пример", "Example")], [
          [t("неротический; " + I("[r]") + " — одноударный " + I("[ɾ]"), "non-rhotic; " + I("[r]") + " is a tap " + I("[ɾ]")), E("very") + " " + I("[ˈvɛɾiː]")],
          [t("удвоение согласного после краткого гласного", "consonant doubling after a short vowel"), E("city") + " " + I("[ˈsɪtːiː]")],
          [t("сильная аспирация; конечные смычные без глоттализации", "strong aspiration; final stops not glottalized"), E("pit") + " " + I("[pʰɪtʰ]")],
          [t("светлый " + I("[l]") + " во всех позициях", "clear " + I("[l]") + " in all positions"), E("feel")],
          [t("в валлийских именах " + I("[ɬ]") + " и увулярный " + I("[χ]"), I("[ɬ]") + " and uvular " + I("[χ]") + " in Welsh names"), E("Llanfynydd, Amlwch")]
        ], "fg-mini") + p(t("Интонация испытывает сильное влияние валлийского языка: её часто называют «певучей» — частые подъёмы на ударных слогах, широкий диапазон.", "Intonation is strongly influenced by Welsh and is often called “sing-song”: frequent rises on stressed syllables and a wide range."))) +
        "</div>" + note(t("Уэльс — двуязычная территория. Такую ситуацию называют экзоглоссной: английский господствует в городах, на востоке и северо-востоке, валлийский сильнее на западе и северо-западе.", "Wales is bilingual. Such a situation is called exoglossic: English dominates in towns, the east and north-east, Welsh is stronger in the west and north-west."));
    },

    scottishVowels: function () {
      var r = [["beer", "bɪə", "biɾ"], ["bird", "bɜːd", "bɪɾd"], ["hurt", "hɜːt", "hʌɾt"], ["bard", "bɑːd", "baːɾd"], ["moor", "mʊə", "muɾ"]];
      return '<div class="fg-two"><div>' + table([t("Слово", "Word"), "RP", t("Шотландский", "Scottish")], r.map(function (x) { return [E(x[0]), I("[" + x[1] + "]"), I("[" + x[2] + "]")]; }), "fg-mini") +
        p(t("Шотландский английский ротический: центрирующих дифтонгов и " + I("[ɜː]") + " нет, а " + E("bird, hurt, heard") + " могут различаться гласным.", "Scottish English is rhotic: there are no centring diphthongs or " + I("[ɜː]") + ", and " + E("bird, hurt, heard") + " may have different vowels.")) + "</div>" +
        box(t("Долгота не различает слов", "Length is not distinctive"), '<div class="v4-merge"><div>' + E("pool") + " = " + E("pull") + " " + I("[pʉl]") + "</div><div>" + E("cot") + " = " + E("caught") + " " + I("[kɔt]") + "</div><div>" + E("hat") + ", " + E("dance") + " " + I("[hat] [dans]") + "</div></div>" +
          p(t("Гласный удлиняется в конечном ударном открытом слоге и перед " + I("[v ð z r]") + ": " + E("brew") + " длиннее, чем " + E("brood") + ". Это правило шотландской долготы (закон Эйткена).", "A vowel is lengthened in a final stressed open syllable and before " + I("[v ð z r]") + ": " + E("brew") + " is longer than " + E("brood") + ". This is the Scottish Vowel Length Rule (Aitken’s Law)."))) +
        "</div>";
    },

    scottishCons: function () {
      return '<div class="fg-two">' +
        box(t("Согласные", "Consonants"), table(["", t("Пример", "Example")], [
          [I("[ʍ] – [w]") + " " + L(t("различаются", "contrast")), E("which – witch") + " " + I("[ʍɪtʃ] [wɪtʃ]")],
          [t("начальные " + I("[p t k]") + " без аспирации", "initial " + I("[p t k]") + " unaspirated"), E("pin") + " " + I("[pɪn]")],
          [I("[r]") + " — " + L(t("одноударный", "a tap")) + " " + I("[ɾ]"), E("bird") + " " + I("[bɪɾd]")],
          [t("неначальный " + I("[t]") + " часто " + I("[ʔ]"), "non-initial " + I("[t]") + " often " + I("[ʔ]")), E("water") + " " + I("[ˈwɔʔəɾ]")],
          [t("тёмный " + I("[ɫ]") + " во всех позициях", "dark " + I("[ɫ]") + " in all positions"), E("leaf") + " " + I("[ɫif]")],
          [I("[x]"), E("loch") + " " + I("[lɔx]")],
          [I("[θr]") + " " + L(t("как", "as")) + " " + I("[ʃr]"), E("through") + " " + I("[ʃɾu]")],
          [I("-ing") + " " + L(t("как", "as")) + " " + I("[ɪn]") + "; " + I("[h]") + " " + L(t("сохраняется", "kept")), E("hunting") + " " + I("[ˈhʌntɪn]")]
        ], "fg-mini")) +
        box(t("Слова с особым произношением", "Words with a distinct pronunciation"), table([t("Слово", "Word"), "RP", t("Шотландский", "Scottish")], [
          [E("length"), I("[leŋθ]"), I("[lenθ]")], [E("raspberry"), I("[ˈrɑːzbrɪ]"), I("[ˈraːsbɛri]")], [E("realize"), I("[ˈrɪəlaɪz]"), I("[ˈrɪaˌlaɪz]")], [E("tortoise"), I("[ˈtɔːtəs]"), I("[ˈtɔːrtɔɪz]")], [E("with"), I("[wɪð]"), I("[wɪθ]")]
        ], "fg-mini")) +
        "</div>" + note(t("Статус шотландского английского спорен: одни считают его национальным вариантом, другие — диалектом. Соколова рассматривает его как диалект, но признаёт доводы в пользу национального варианта. Рядом существуют шотландский язык (Scots) и гэльский.", "The status of Scottish English is debated: some call it a national variant, others a dialect. Sokolova treats it as a dialect but acknowledges the arguments for a national variant. Scots and Gaelic exist alongside it."));
    },

    nie: function () {
      return '<div class="fg-two">' +
        box(t("Гласные", "Vowels"), table([t("Фонема", "Phoneme"), t("Примеры", "Examples")], [
          [I("[ɪ]"), E("pit, fir, bird") + " " + I("[pɪt] [fɪr] [bɪrd]")],
          [I("[ɛ]"), E("bay, bear, plate") + " " + I("[bɛ] [bɛr] [plɛt]")],
          [I("[a]"), E("pat, bard, hat, dance, half") + " " + I("[pat] [bard] [hat] [dans] [haf]")],
          [I("[o]"), E("boat, pole, knows") + " " + I("[bot] [pol] [noz]")],
          [I("[u]"), E("put, boot, pull, pool") + " " + I("[put] [but] [pul] [pul]")]
        ], "fg-mini") + p(t("Система близка к шотландской, " + I("[r]") + " после гласного произносится. В " + E("hay, say") + " — монофтонг " + I("[ɛ]") + "; перед согласным возможен дифтонг: " + E("gate") + " " + I("[ɡɪət]") + ".", "The system is close to the Scottish one, postvocalic " + I("[r]") + " is pronounced. " + E("hay, say") + " have a monophthong " + I("[ɛ]") + "; before a consonant a diphthong is possible: " + E("gate") + " " + I("[ɡɪət]") + "."))) +
        box(t("Согласные", "Consonants"), ul([
          t("" + I("[l]") + " в основном светлый.", I("[l]") + " is mainly clear."),
          t("Интервокальный " + I("[t]") + " — звонкий одноударный: " + E("city") + " " + I("[ˈsɪɾi]") + ".", "Intervocalic " + I("[t]") + " is a voiced tap: " + E("city") + " " + I("[ˈsɪɾi]") + "."),
          t(I("[ð]") + " между гласными может выпадать: " + E("mother") + " " + I("[ˈmɔːər]") + ".", I("[ð]") + " may be lost between vowels: " + E("mother") + " " + I("[ˈmɔːər]") + "."),
          t(I("[h]") + " произносится.", I("[h]") + " is pronounced.")
        ]) + p(t("Английский пришёл в Ольстер из Шотландии с поселенцами XVII века, поэтому север острова звучит иначе, чем Ирландская Республика, где английский восходит к западу Англии.", "English came to Ulster from Scotland with 17th-century settlers, so the north of the island sounds different from the Republic of Ireland, where English goes back to the west of England."))) +
        "</div>";
    },

    ruScots: function () {
      return table([t("Черта", "Feature"), t("Шотландский английский", "Scottish English"), t("Русский", "Russian"), "RP"], [
        [t("ротичность", "rhoticity"), t("да, одноударный " + I("[ɾ]"), "yes, a tap " + I("[ɾ]")), t("да, " + I("[р]") + " дрожащий или одноударный", "yes, " + I("[р]") + " trilled or tapped"), t("нет", "no")],
        [t("аспирация " + I("[p t k]"), "aspiration of " + I("[p t k]")), t("слабая", "weak"), t("нет", "none"), t("сильная", "strong")],
        [t("долгота как различительный признак", "length as a distinctive feature"), t("нет", "no"), t("нет", "no"), t("да (с качеством)", "yes (with quality)")],
        [I("[x]"), E("loch"), E("хор"), t("нет", "no")],
        [t("FACE, GOAT", "FACE, GOAT"), I("[eː] [oː]"), t("близко к " + I("[э] [о]"), "close to " + I("[э] [о]")), I("[eɪ] [əʊ]")]
      ]) + note(t("Поэтому русская речь по-английски иногда кажется носителям «шотландской». Сходство поверхностное: качество гласных и интонация всё равно другие.", "That is why Russian-accented English sometimes strikes native speakers as “Scottish”. The similarity is superficial: vowel quality and intonation are still different."));
    },

    /* ---------- 4.5 ---------- */
    usTypes: function () {
      return '<div class="fg-three">' +
        box(t("Восточный тип", "Eastern"), p(t("Новая Англия, Нью-Йорк. Напоминает южноанглийское произношение: часто неротический.", "New England, New York City. Resembles Southern English: often non-rhotic."))) +
        box(t("Южный тип", "Southern"), p(t("Юг и юго-восток США. Протяжность (drawl): дифтонгизация и даже трифтонгизация гласных, монофтонгизация " + I("[aɪ]") + ": " + E("time") + " " + I("[taːm]") + ".", "The South and South-East. The drawl: diphthongization and even triphthongization of vowels, monophthongization of " + I("[aɪ]") + ": " + E("time") + " " + I("[taːm]") + "."))) +
        box(t("General American", "General American"), p(t("Северные и западные штаты. Стандарт радио и телевидения, науки и бизнеса.", "The northern and western states. The standard of radio and television, science and business.")), "fg-acc") +
        "</div>" + note(t("Классификация по Швейцеру и Соколовой. Уэллс называет GA речь двух третей американцев, у которых нет явно локального акцента, и подчёркивает, что это «отнюдь не единый акцент».", "The classification follows Shweitzer and Sokolova. Wells applies GA to the two thirds of Americans without a recognizably local accent and stresses that it is “by no means a uniform accent”."));
    },

    gaVowels: function () {
      var r = [["dad", "æ", "æ"], ["dog", "ɒ", "ɑ"], ["path", "ɑː", "æ"], ["dance", "ɑː", "æ"], ["half", "ɑː", "æ"]];
      return '<div class="fg-two"><div>' + table([t("Слово", "Word"), "RP", "GA"], r.map(function (x) { return [E(x[0]), I("[" + x[1] + "]"), I("[" + x[2] + "]")]; }), "fg-mini") +
        p(t("Трём гласным RP " + I("[ɒ] [æ] [ɑː]") + " соответствуют два гласных GA " + I("[ɑ] [æ]") + ". " + I("[ɔ]") + " в GA — между " + I("[ɔː]") + " и " + I("[ɒ]") + " RP, со слабым округлением.", "The three RP vowels " + I("[ɒ] [æ] [ɑː]") + " correspond to two GA vowels " + I("[ɑ] [æ]") + ". GA " + I("[ɔ]") + " lies between RP " + I("[ɔː]") + " and " + I("[ɒ]") + ", with weak rounding.")) + "</div>" +
        box(t("Другие черты гласных GA", "Other GA vowel features"), ul([
          t("Нет строгого деления на долгие и краткие; говорят о напряжённых и ненапряжённых: " + I("[i]") + " в " + E("seat") + ", " + I("[u]") + " в " + E("pool") + ".", "No strict division into long and short; tense and lax are distinguished: " + I("[i]") + " in " + E("seat") + ", " + I("[u]") + " in " + E("pool") + "."),
          t("Ротичность: " + E("turn, bird, star") + " " + I("[tɝn] [bɝd] [stɑr]") + "; нет " + I("[ɪə] [ɛə] [ʊə]") + ": " + E("dear, dare, tour") + " " + I("[dɪr] [dɛr] [tʊr]") + ".", "Rhoticity: " + E("turn, bird, star") + " " + I("[tɝn] [bɝd] [stɑr]") + "; no " + I("[ɪə] [ɛə] [ʊə]") + ": " + E("dear, dare, tour") + " " + I("[dɪr] [dɛr] [tʊr]") + "."),
          t("Назализация рядом с носовым: " + E("take, small, name") + " (American twang).", "Nasalization next to a nasal: " + E("take, small, name") + " (American twang)."),
          t(I("[i]") + " в " + E("very, pity") + "; " + I("[e]") + " открытее, перед " + I("[p t k]") + " дифтонгизируется: " + E("let") + " " + I("[lɛət]") + ".", I("[i]") + " in " + E("very, pity") + "; " + I("[e]") + " is opener and diphthongized before " + I("[p t k]") + ": " + E("let") + " " + I("[lɛət]") + "."),
          t("Пять дифтонгов (по Шахбаговой): " + I("[eɪ] [aɪ] [ɔɪ] [aʊ] [oʊ]") + "; " + I("[eɪ]") + " уже, ядро " + I("[oʊ]") + " более заднее.", "Five diphthongs (after Shakhbagova): " + I("[eɪ] [aɪ] [ɔɪ] [aʊ] [oʊ]") + "; " + I("[eɪ]") + " is closer, the nucleus of " + I("[oʊ]") + " more back.")
        ])) + "</div>";
    },

    gaConsonants: function () {
      return table([t("Черта", "Feature"), t("Пример", "Example"), t("RP", "RP")], [
        [t("" + I("[l]") + " тёмный во всех позициях", I("[l]") + " is dark in all positions"), E("leaf") + " " + I("[ɫif]"), I("[liːf]")],
        [t("интервокальный " + I("[t]") + " — звонкий одноударный " + I("[ɾ]"), "intervocalic " + I("[t]") + " is a voiced flap " + I("[ɾ]")), E("latter = ladder") + " " + I("[ˈlæɾɚ]"), I("[ˈlætə] [ˈlædə]")],
        [t("" + I("[t]") + " после " + I("[n]") + " может выпадать", I("[t]") + " may drop after " + I("[n]")), E("winter = winner") + " " + I("[ˈwɪnɚ]"), I("[ˈwɪntə]")],
        [t("" + I("[r]") + " ретрофлексный", "retroflex " + I("[r]")), E("far") + " " + I("[fɑɻ]"), I("[fɑː]")],
        [t("" + I("[ʍ]") + " в " + E("wh") + "-словах", I("[ʍ]") + " in " + E("wh") + "-words"), E("where – ware") + " " + I("[ʍɛr] [wɛr]"), I("[weə]")],
        [t("" + I("[j]") + " выпадает после переднеязычных", I("[j]") + " drops after alveolars"), E("news, Tuesday, student") + " " + I("[nuz] [ˈtuzdeɪ]"), I("[njuːz]")]
      ]) + note(t("Соколова пишет, что большинство американцев различают " + E("where – ware, which – witch") + ". Уэллс (1982) тоже называет " + I("[hw]") + " широко распространённым в Северной Америке, но отмечает, что совпадение с " + I("[w]") + " растёт в крупных городах. По данным «Атласа североамериканского английского» (Labov, Ash, Boberg 2006), различие сохранили лишь 71 из 587 опрошенных, в основном на Юге, в Техасе и отчасти в Новой Англии.", "Sokolova says most Americans distinguish " + E("where – ware, which – witch") + ". Wells (1982) also calls " + I("[hw]") + " widespread in North America but notes that the merger with " + I("[w]") + " is growing in big cities. According to the Atlas of North American English (Labov, Ash, Boberg 2006), only 71 of 587 speakers kept the contrast, mainly in the South, Texas and partly New England."));
    },

    gaWords: function () {
      var w = [["Asia", "ˈeɪʃə", "ˈeɪʒə"], ["either", "ˈaɪðə", "ˈiðɚ"], ["leisure", "ˈleʒə", "ˈliʒɚ"], ["lever", "ˈliːvə", "ˈlɛvɚ"], ["schedule", "ˈʃedjuːl", "ˈskɛdʒəl"], ["shone", "ʃɒn", "ʃoʊn"], ["tomato", "təˈmɑːtəʊ", "təˈmeɪtoʊ"], ["vase", "vɑːz", "veɪs"], ["missile", "ˈmɪsaɪl", "ˈmɪsəl"]];
      var st = [["ballet", "ˈbæleɪ", "bæˈleɪ"], ["beret", "ˈbereɪ", "bəˈreɪ"], ["address", "əˈdres", "ˈædrɛs"], ["cigarette", "ˌsɪɡəˈret", "ˈsɪɡərɛt"], ["magazine", "ˌmæɡəˈziːn", "ˈmæɡəzin"], ["research", "rɪˈsɜːtʃ", "ˈrisɝtʃ"], ["adult", "ˈædʌlt", "əˈdʌlt"], ["laboratory", "ləˈbɒrətrɪ", "ˈlæbrəˌtɔri"], ["dictionary", "ˈdɪkʃənrɪ", "ˈdɪkʃəˌnɛri"]];
      function tb(h, rs) { return table([t("Слово", "Word"), "RP", "GA"], rs.map(function (x) { return [E(x[0]), I("[" + x[1] + "]"), I("[" + x[2] + "]")]; }), "fg-mini"); }
      return '<div class="fg-two"><div><div class="fg-h">' + L(t("Разные фонемы в отдельных словах", "Different phonemes in individual words")) + "</div>" + tb("", w) + "</div>" +
        '<div><div class="fg-h">' + L(t("Разное ударение", "Different stress")) + "</div>" + tb("", st) + "</div></div>" +
        note(t("Французские заимствования в GA чаще ударны на последнем слоге. Многие слова, наоборот, получают в GA ударение на первом слоге. В словах на " + E("-ory, -ary, -mony") + " у GA есть второстепенное («третичное») ударение. По Соколовой, " + E("adult") + " в RP " + I("[əˈdʌlt]") + ", в GA " + I("[ˈædʌlt]") + "; современные словари дают оба варианта в обоих стандартах.", "French loans in GA are more often stressed on the last syllable. Many other words, on the contrary, take first-syllable stress in GA. Words in " + E("-ory, -ary, -mony") + " have a secondary (“tertiary”) stress in GA. Sokolova gives " + E("adult") + " as RP " + I("[əˈdʌlt]") + ", GA " + I("[ˈædʌlt]") + "; current dictionaries list both in both standards."));
    },

    gaIntonation: function () {
      var lvl = hm("level", "mid"), desc = hm("desc");
      function cinema(ys, nuc) {
        var w = ["I", "don’t", "want", "to", "go", "to", "the"];
        return w.map(function (x, i) { var v = ys[i]; return typeof v === "object" ? Object.assign({ t: x }, v) : { t: x, k: "u", y: v }; }).concat([Object.assign({ t: "thea", n: true }, nuc), { t: "tre", k: "u" }]);
      }
      var rows = [
        [t("Шкала", "Head"), S(cinema([0, s("", .9), s("", .76), 0, s("", .62), 0, 0], { k: "f", y: .5, y2: 0 }), { step: 26, noText: true, minW: 230 }), "I " + desc + "don’t ˈwant to ˈgo to the ˎtheatre.", S(cinema([0, s("", .5), s("", .5), 0, s("", .5), 0, 0], { k: "f", y: .5, y2: 0 }), { step: 26, noText: true, minW: 230 }), "I " + lvl + "don’t ˈwant to ˈgo to the ˎtheatre.", t("нисходящая ступенчатая в RP, средняя ровная в GA", "descending stepping in RP, medium level in GA")],
        [t("Нисходящий тон", "Falling tone"), S([s("Come", .8), u("and"), s("see", .7), u("me"), u("to"), { t: "mor", k: "f", y: .55, y2: 0, n: true }, u("row")], { step: 26, noText: true, minW: 230 }), "ˈCome and ˈsee me to˴morrow.", S([s("Come", .5), u("and"), s("see", .5), u("me"), u("to"), { t: "mor", k: "rf", y: .5, y2: .85, y3: 0, n: true }, u("row")], { step: 26, noText: true, minW: 230 }), "ˈCome and ˈsee me toˆmorrow.", t("средний или низкий нисходящий в RP, восходяще-нисходящий в GA", "Medium or Low Fall in RP, rising-falling in GA")],
        [t("Восходящий тон", "Rising tone"), S([u("Do"), u("you"), { t: "like", k: "r", y: .02, y2: .35, n: true }, u("it")], { step: 34, noText: true, minW: 230 }), "Do you ˏlike it?", S([u("Do", .3), u("you", .3), { t: "like", k: "r", y: .4, y2: .75, n: true }, u("it")], { step: 34, noText: true, minW: 230 }), "Do you ˵like it?", t("низкий подъём в RP, средний в GA (или ровный)", "Low Rise in RP, Mid Rise in GA (or level)")],
        [t("Нисходяще-восходящий", "Fall-Rise"), S([{ t: "Real", k: "fr", y: .7, y2: .02, y3: .38, n: true }, { t: "ly", k: "u", y: .4, keep: true }], { step: 34, noText: true, raw: true, minW: 230 }), "ˇReally?", S([{ t: "Real", k: "f", y: .7, y2: .05, n: true, keep: true }, { t: "ly", k: "r", y: .1, y2: .55, keep: true }], { step: 34, noText: true, raw: true, minW: 230 }), "ˎReaˏlly?", t("в GA падение и подъём разнесены", "in GA the fall and the rise are separated")],
        [t("Общий вопрос", "Yes-no question"), S([s("Shall", .7), u("we"), s("stay", .7), { t: "here", k: "r", y: .02, y2: .45, n: true }], { step: 34, noText: true, minW: 230 }), "ˈShall we ˈstay ˏhere?", S([s("Shall", .5), u("we"), s("stay", .5), { t: "here", k: "rf", y: .5, y2: .75, y3: .1, n: true }], { step: 34, noText: true, minW: 230 }), "ˈShall we ˈstay ˆhere?", t("подъём в RP, нисходящий конец в GA", "a rise in RP, a falling end in GA")],
        [t("Просьба", "Request"), S([{ t: "O", k: "r", y: .02, y2: .3, n: true }, u("pen"), u("the"), u("door")], { step: 34, noText: true, minW: 230 }), "ˏOpen the door.", S([{ t: "O", k: "fr", y: .75, y2: 0, y3: .45, n: true }, u("pen"), u("the"), u("door")], { step: 34, noText: true, minW: 230 }), "ˇOpen the door.", t("подъём в RP, нисходяще-восходящий в GA", "a rise in RP, a Fall-Rise in GA")]
      ];
      return '<div class="fg-scroll"><table class="fg-table ms-table v4-int"><thead><tr><th></th><th>RP</th><th>GA</th><th>' + L(t("Различие", "Difference")) + "</th></tr></thead><tbody>" +
        rows.map(function (r) { return "<tr><td><b>" + L(r[0]) + "</b></td><td>" + r[1] + '<div class="fg-tone">' + r[2] + "</div></td><td>" + r[3] + '<div class="fg-tone">' + r[4] + "</div></td><td>" + L(r[5]) + "</td></tr>"; }).join("") +
        "</tbody></table></div>" + note(t("По Соколовой (рис. на с. 187–188), в нашей системе разметки. В GA голос реже падает до самого низа; поэтому британская речь кажется американцам «манерной», а американская британцам — «монотонной».", "After Sokolova (pp. 187–188), in our marking system. In GA the voice falls to the very bottom less often; that is why British speech sounds “affected” to Americans and American speech sounds “monotonous” to the British."));
    },

    yesNoViews: function () {
      var head = [u("Are", .2), u("you", .2), s("tra", .82), u("vel"), u("ling"), u("a")];
      var lb = head.concat([{ t: "lone", k: "r", y: .1, y2: .42, n: true }]);
      var fr = head.concat([{ t: "lone", k: "fr", y: .8, y2: .08, y3: .5, n: true }]);
      var hr = [u("Are", .35), u("you", .35), s("tra", .42), u("vel"), u("ling"), u("a"), { t: "lone", k: "r", y: .45, y2: .98, n: true }];
      var ga = [u("Are", .4), u("you", .4), s("tra", .55), u("vel"), u("ling"), u("a"), { t: "lone", k: "f", y: .55, y2: 0, n: true }];
      function c(h, syl, m, n) { return '<div><div class="fg-h">' + L(h) + "</div>" + S(syl, { step: 26, noText: true }) + '<p class="fg-tone">' + m + "</p>" + note(n) + "</div>"; }
      return '<div class="v4-four">' +
        c(t("RP: Low Bounce", "RP: Low Bounce"), lb, "Are you ˈtravelling aˏlone?", t("О’Коннор и Арнольд (1973): самый частый тип; сегодня старомоден", "O’Connor & Arnold (1973): the most common type; old-fashioned today")) +
        c(t("SSB: Fall-Rise", "SSB: Fall-Rise"), fr, "Are you ˈtravelling aˇlone?", t("Линдси: нейтральный и вежливый", "Lindsey: neutral and polite")) +
        c(t("США по Линдси: High Rise", "US after Lindsey: High Rise"), hr, "Are you travelling aˊlone?", t("простой подъём без шага вниз", "a plain rise without a step down")) +
        c(t("GA по Соколовой: нисходящий", "GA after Sokolova: falling"), ga, "Are you ˈtravelling a˴lone?", t("нисходящий терминальный тон", "a falling terminal tone")) +
        "</div>";
    },

    ruGa: function () {
      return table([t("Ситуация", "Situation"), t("Совет", "Advice")], [
        [t("Учащийся слышит GA в сериалах и RP на занятиях", "The learner hears GA in TV series and RP in class"), t("Выбрать одну модель и держаться её. Смешение " + E("dance") + " " + I("[dæns]") + " с неротическим " + E("car") + " " + I("[kɑː]") + " — признак непоследовательности.", "Choose one model and stick to it. Mixing " + E("dance") + " " + I("[dæns]") + " with non-rhotic " + E("car") + " " + I("[kɑː]") + " shows inconsistency.")],
        [t("Ротичность", "Rhoticity"), t("Русский " + I("[р]") + " — дрожащий переднеязычный; американский " + I("[ɹ]") + " — без вибрации, с подъёмом или загибом кончика языка.", "Russian " + I("[р]") + " is a trilled alveolar; the American " + I("[ɹ]") + " has no vibration and a raised or curled-back tongue tip.")],
        [t("Тёмный " + I("[ɫ]"), "Dark " + I("[ɫ]")), t("Русский твёрдый " + I("[л]") + " тоже веляризован, поэтому американский " + I("[ɫ]") + " даётся легче британского светлого " + I("[l]") + ".", "Russian hard " + I("[л]") + " is velarized too, so the American " + I("[ɫ]") + " is easier than British clear " + I("[l]") + ".")],
        [I("[ɾ]") + " " + L(t("в", "in")) + " " + E("water, better"), t("Американский одноударный " + I("[ɾ]") + " похож на русский одноударный " + I("[р]") + ", и русские учащиеся иногда заменяют им английский " + I("[r]") + ".", "The American flap " + I("[ɾ]") + " resembles the Russian tapped " + I("[р]") + ", and Russian learners sometimes use it for English " + I("[r]") + ".")]
      ]);
    },

    /* ---------- 4.6 ---------- */
    assignmentSteps: function () {
      var st = [
        [t("Выбор акцента", "Choose an accent"), t("Внутренний круг на сайте IDEA: кокни, валлийский, MLE, австралийский и т. д.", "The inner circle on the IDEA website: Cockney, Welsh, MLE, Australian, etc.")],
        [t("Данные о говорящем", "Speaker’s data"), t("Ссылка на файл корпуса, возраст, пол, место рождения и проживания, образование. Место на карте.", "The corpus file, age, gender, place of birth and residence, education. The location on the map.")],
        [t("Лингвистический статус", "Linguistic status"), t("Норма, национальный или региональный стандарт, диалект, акцент?", "A norm, a national or regional standard, a dialect, an accent?")],
        [t("Сегментный анализ", "Segmental analysis"), t("Два гласных и два согласных по классификационным признакам, примеры в IPA.", "Two vowels and two consonants by classification parameters, examples in IPA.")],
        [t("Сверхсегментный анализ", "Suprasegmental analysis"), t("Не меньше трёх компонентов интонации; пример в нашей системе разметки.", "At least three components of intonation; an example in our marking system.")],
        [t("Интерпретация", "Interpretation"), t("Сравнение с RP или GA (L1 говорящего): какой тип различия, чем объясняется.", "Comparison with RP or GA (the speaker’s L1): what type of difference, what explains it.")],
        [t("Слайды и выступление", "Slides and talk"), t("Короткие фрагменты аудио, размеченные примеры, устный рассказ.", "Short trimmed audio clips, marked examples, an oral talk.")]
      ];
      return '<ol class="v4-steps">' + st.map(function (x) { return "<li><b>" + L(x[0]) + "</b><span>" + L(x[1]) + "</span></li>"; }).join("") + "</ol>" +
        '<p class="fg-note"><a href="https://www.dialectsarchive.com/dialects-accents" target="_blank" rel="noopener">IDEA: Dialects &amp; Accents</a> · <a href="https://www.dialectsarchive.com/globalmap" target="_blank" rel="noopener">' + L(t("карта IDEA", "IDEA map")) + '</a> · <a href="https://www.ipachart.com/" target="_blank" rel="noopener">' + L(t("интерактивная таблица IPA", "interactive IPA chart")) + "</a></p>";
    },

    innerCircle: function () {
      return table([t("Акцент", "Accent"), t("Яркие черты", "Hallmark features"), t("Пример", "Example")], [
        ["<b>" + L(t("Австралийский", "Australian")) + "</b>", t("неротический; FACE " + I("[æɪ]") + ", PRICE " + I("[ɑe]") + ", GOAT " + I("[əʉ]") + ", GOOSE " + I("[ʉː]") + "; " + E("dance") + " часто с " + I("[æ]") + ", " + E("path") + " с " + I("[ɐː]") + "; подъём на утверждениях (HRT)", "non-rhotic; FACE " + I("[æɪ]") + ", PRICE " + I("[ɑe]") + ", GOAT " + I("[əʉ]") + ", GOOSE " + I("[ʉː]") + "; " + E("dance") + " often with " + I("[æ]") + ", " + E("path") + " with " + I("[ɐː]") + "; rises on statements (HRT)"), E("mate") + " " + I("[mæɪt]")],
        ["<b>" + L(t("Новозеландский", "New Zealand")) + "</b>", t("неротический (кроме Саутленда); KIT централизован до " + I("[ə]") + ", DRESS и TRAP повышены; NEAR и SQUARE у молодёжи совпадают", "non-rhotic (except Southland); KIT centralized to " + I("[ə]") + ", DRESS and TRAP raised; NEAR and SQUARE merged among the young"), E("fish and chips") + " " + I("[fəʃ ən tʃəps]")],
        ["<b>" + L(t("Ирландский (Республика)", "Irish (Republic)")) + "</b>", t("ротический; " + I("[t̪ d̪]") + " на месте " + I("[θ ð]") + "; светлый " + I("[l]") + "; FACE, GOAT монофтонги", "rhotic; " + I("[t̪ d̪]") + " for " + I("[θ ð]") + "; clear " + I("[l]") + "; FACE, GOAT monophthongs"), E("think") + " " + I("[t̪ɪŋk]")],
        ["<b>" + L(t("Канадский", "Canadian")) + "</b>", t("ротический; канадское повышение " + I("[ʌɪ ʌʊ]") + " перед глухими; " + E("cot = caught") + "; " + I("[ɾ]") + " между гласными", "rhotic; Canadian raising " + I("[ʌɪ ʌʊ]") + " before voiceless consonants; " + E("cot = caught") + "; " + I("[ɾ]") + " between vowels"), E("about") + " " + I("[əˈbʌʊt]")],
        ["<b>" + L(t("Южноафриканский", "South African")) + "</b>", t("неротический; KIT расщеплён: " + I("[ɪ]") + " у велярных (" + E("kit") + "), " + I("[ə]") + " в остальных позициях; в Broad-варианте " + I("[r]") + " одноударный", "non-rhotic; KIT split: " + I("[ɪ]") + " next to velars (" + E("kit") + "), " + I("[ə]") + " elsewhere; in Broad SAE " + I("[r]") + " is a tap"), E("bit") + " " + I("[bət]")],
        ["<b>" + L(t("Нью-Йорк", "New York City")) + "</b>", t("традиционно неротический; THOUGHT повышен " + I("[ɔə]") + "; напряжённый " + I("[æə]") + " в " + E("bad, man"), "traditionally non-rhotic; THOUGHT raised " + I("[ɔə]") + "; tense " + I("[æə]") + " in " + E("bad, man")), E("coffee") + " " + I("[ˈkɔəfi]")],
        ["<b>" + L(t("Юг США", "Southern US")) + "</b>", t("протяжность; PRICE монофтонг " + I("[aː]") + "; " + E("pin = pen"), "the drawl; PRICE monophthong " + I("[aː]") + "; " + E("pin = pen")), E("I") + " " + I("[aː]")]
      ]) + note(t("Ориентиры по Дж. Уэллсу (т. 3, 1982) для первого прослушивания. Описывай то, что слышишь в своей записи: у конкретного говорящего части черт может не быть.", "Pointers after J. Wells (vol. 3, 1982) for a first listening. Describe what you hear in your recording: a particular speaker may lack some of these features."));
    },

    vowelParams: function () {
      return '<div class="fg-two">' +
        box(t("Признаки гласного", "Vowel parameters"), "<ol>" + [
          t("<b>стабильность артикуляции</b>: монофтонг, дифтонг, дифтонгоид", "<b>stability of articulation</b>: monophthong, diphthong, diphthongoid"),
          t("<b>ряд</b> (горизонтальное движение языка): передний, передний отодвинутый, смешанный, задний, задний продвинутый", "<b>horizontal tongue position</b>: front, front-retracted, central, back, back-advanced"),
          t("<b>подъём</b> (вертикальное движение): высокий, средний, низкий; узкий и широкий вариант", "<b>vertical tongue position</b>: close, mid, open; narrow and broad variety"),
          t("<b>положение губ</b>: округлённый, неокруглённый", "<b>lip position</b>: rounded, unrounded"),
          t("<b>долгота</b>: исторически долгий или краткий", "<b>length</b>: historically long or short"),
          t("<b>напряжённость</b>: напряжённый, ненапряжённый", "<b>tenseness</b>: tense, lax"),
          t("<b>характер конца</b>: усечённый, неусечённый", "<b>character of the end</b>: checked, free")
        ].map(function (x) { return "<li>" + L(x) + "</li>"; }).join("") + "</ol>") +
        box(t("Образец: FACE в кокни", "Sample: FACE in Cockney"), '<p class="v4-sample">' + E("lady") + " " + I("[ˈlæɪdiː]") + " &nbsp;RP " + I("[ˈleɪdɪ]") + "</p>" + ul([
          t("Дифтонг, как и в RP.", "A diphthong, as in RP."),
          t("Ядро — передний гласный <b>низкого</b> подъёма " + I("[æ]") + " вместо переднего среднего " + I("[e]") + " в RP; скольжение к " + I("[ɪ]") + ".", "The nucleus is a front <b>open</b> vowel " + I("[æ]") + " instead of front mid " + I("[e]") + " in RP; the glide goes to " + I("[ɪ]") + "."),
          t("Неокруглённый, неусечённый.", "Unrounded, free."),
          t("<b>Интерпретация</b>: реализационное различие; ядро сдвинуто вниз, как у других дифтонгов кокни (Diphthong Shift по Уэллсу).", "<b>Interpretation</b>: a realizational difference; the nucleus is lowered, like the other Cockney diphthongs (Wells’s Diphthong Shift).")
        ]), "fg-acc") + "</div>";
    },

    consParams: function () {
      return '<div class="fg-two">' +
        box(t("Признаки согласного", "Consonant parameters"), "<ol>" + [
          t("<b>степень шума</b>: шумный или сонант", "<b>degree of noise</b>: noise consonant or sonorant"),
          t("<b>тип преграды и способ образования шума</b>: смычный (взрывной, носовой), щелевой, смычно-щелевой (аффриката)", "<b>type of obstruction and manner of noise production</b>: occlusive (plosive, nasal), constrictive (fricative), occlusive-constrictive (affricate)"),
          t("<b>активный орган</b>: губной, переднеязычный (апикальный, дорсальный, какуминальный), среднеязычный, заднеязычный, фарингальный", "<b>active organ</b>: labial, forelingual (apical, dorsal, cacuminal), mediolingual, backlingual, pharyngal"),
          t("<b>место преграды</b>: губно-губной, губно-зубной, межзубный, альвеолярный, заальвеолярный, палатально-альвеолярный, палатальный, велярный, глоттальный", "<b>place of obstruction</b>: bilabial, labio-dental, interdental, alveolar, post-alveolar, palato-alveolar, palatal, velar, glottal"),
          t("<b>работа голосовых связок и сила</b>: звонкий слабый (lenis), глухой сильный (fortis)", "<b>work of the vocal cords and force</b>: voiced lenis, voiceless fortis"),
          t("<b>положение мягкого нёба</b>: ротовой, носовой", "<b>position of the soft palate</b>: oral, nasal"),
          t("<b>прохождение воздуха</b>: срединный, боковой", "<b>air passage</b>: median, lateral")
        ].map(function (x) { return "<li>" + L(x) + "</li>"; }).join("") + "</ol>") +
        box(t("Образец: TH-fronting в кокни", "Sample: TH-fronting in Cockney"), '<p class="v4-sample">' + E("think") + " " + I("[fɪŋk]") + " &nbsp;RP " + I("[θɪŋk]") + "</p>" + ul([
          t("Шумный щелевой, глухой сильный, ротовой, срединный — как и " + I("[θ]") + ".", "A noise constrictive, voiceless fortis, oral, median — like " + I("[θ]") + "."),
          t("Активный орган — <b>нижняя губа</b>, а не кончик языка; место — <b>губно-зубное</b>, а не межзубное.", "The active organ is the <b>lower lip</b>, not the tongue tip; the place is <b>labio-dental</b>, not interdental."),
          t("<b>Интерпретация</b>: системное различие — " + I("/θ/") + " совпадает с " + I("/f/") + ", противопоставление " + E("thin – fin") + " утрачено. У Линдси: черта распространяется среди молодёжи по всей Британии.", "<b>Interpretation</b>: a systemic difference — " + I("/θ/") + " merges with " + I("/f/") + ", the contrast " + E("thin – fin") + " is lost. Lindsey: the feature is spreading among young people all over Britain.")
        ]), "fg-acc") + "</div>";
    },

    supraParams: function () {
      var a = [u("We"), s("went", .8), u("to"), u("the"), s("beach", .7), u("on"), { t: "Sat", k: "r", y: .5, y2: .98, n: true }, u("ur"), u("day")];
      return '<div class="fg-two">' +
        box(t("Что описывать", "What to describe"), ul([
          t("<b>диапазон</b>: широкий, нормальный, узкий;", "<b>range</b>: wide, normal, narrow;"),
          t("<b>уровень</b>: высокий, средний, низкий;", "<b>level</b>: high, mid, low;"),
          t("<b>шкала</b> и <b>предшкала</b>: тип, направление;", "<b>head</b> and <b>pre-head</b>: type, direction;"),
          t("<b>ядерный тон</b> и его крутизна;", "<b>nuclear tone</b> and its steepness;"),
          t("<b>ритм</b>: тактовый (stress-timed) или ближе к слоговому;", "<b>rhythm</b>: stress-timed or closer to syllable-timed;"),
          t("<b>темп</b> и <b>паузы</b>;", "<b>tempo</b> and <b>pauses</b>;"),
          t("<b>тембр</b>: скрипучий голос (vocal fry), придыхательный и т. п.", "<b>voice quality</b>: creaky voice (vocal fry), breathy voice, etc.")
        ])) +
        box(t("Образец: австралийское утверждение", "Sample: an Australian statement"), S(a, { step: 30, label: "We went to the beach on Saturday" }) + '<p class="fg-tone">We ˈwent to the ˈbeach on ˊSaturday.</p>' + ul([
          t("Повествовательное предложение с <b>высоким подъёмом</b> на ядре: подъём продолжается на хвосте.", "A statement with a <b>High Rise</b> on the nucleus: the rise continues over the tail."),
          t("Шкала нисходящая, диапазон широкий.", "A descending head, a wide range."),
          t("<b>Интерпретация</b>: high rising terminal — проверка, слушает ли собеседник; в RP такой контур означал бы вопрос.", "<b>Interpretation</b>: a high rising terminal checks that the listener is following; in RP this contour would signal a question.")
        ]), "fg-acc") + "</div>";
    },

    criteria: function () {
      var R = [
        [t("Данные о говорящем, статус речи", "Speaker’s data / speech linguistic status"), "0", t("ссылка на файл, данные говорящего, место на карте, статус речи", "the corpus file, speaker’s data, location on the map, linguistic status"), "—", "—", "0.5"],
        [t("Сегментный анализ", "Segmental analysis"), "0", "—", t("звуки выбраны, признаки описаны неточно, нет интерпретации", "sounds chosen, parameters inaccurate, no interpretation"), t("признаки точны и подкреплены теорией из учебника, есть интерпретация", "parameters accurate and supported by the textbook, interpretation given"), "1.5"],
        [t("Сверхсегментный анализ", "Suprasegmental analysis"), "0", "—", t("1–2 компонента, описаны неточно", "1–2 components, stated inaccurately"), t("больше трёх компонентов, точно, с теорией и интерпретацией", "more than 3 components, accurate, with theory and interpretation"), "1.5"],
        [t("Произношение и грамматика выступающего", "Pronunciation and grammar"), t("больше 5 ошибок", "more than 5 mistakes"), "—", t("нет ошибок в ударении, фонемах, интонации и грамматике", "no mistakes in stress, phonemes, intonation and grammar"), "—", "1"],
        [t("Презентация и слайды", "Presentation and slides"), t("нет выступления или слайдов", "no talk or slides"), t("устное выступление со структурированными слайдами и размеченными фрагментами аудио", "an oral talk with structured slides and marked trimmed audio clips"), "—", "—", "0.5"]
      ];
      return '<div class="fg-scroll"><table class="fg-table v4-crit"><thead><tr><th>' + L(t("Критерий", "Criterion")) + "</th><th>0</th><th>0.5</th><th>1</th><th>1.5</th><th>" + L(t("Макс.", "Max")) + "</th></tr></thead><tbody>" +
        R.map(function (r) { return "<tr>" + r.map(function (c, i) { return "<td" + (i === 5 ? ' class="v4-max"' : "") + ">" + (typeof c === "string" ? c : L(c)) + "</td>"; }).join("") + "</tr>"; }).join("") +
        '</tbody></table></div><p class="fg-note">' + L(t("Максимум — 5 баллов.", "The maximum is 5 points.")) + "</p>";
    }
  });
})();
