/* Дополнительная инфографика: объяснения со схемами и транскрипцией. */
(function () {
  var I = function (s) { return '<span class="ipa">' + s + "</span>"; };
  var E = function (s) { return '<span class="ex">' + s + "</span>"; };
  var S = Figures._staff;

  function table(head, rows, cls) {
    return '<div class="fg-scroll"><table class="fg-table ' + (cls || "") + '"><thead><tr>' + head.map(function (h) { return "<th>" + L(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + L(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }

  Object.assign(Figures, {

    /* ---------- 2.1 ---------- */
    allophonesD: function () {
      var sub = [
        ["[dʲ]", t("слегка смягчённый", "slightly palatalized"), t("перед гласными переднего ряда и [j]", "before front vowels and [j]"), "deal, day, dew"],
        ["[d̚]", t("без взрыва", "no plosion"), t("перед другим смычным", "before another stop"), "bedtime, good dog"],
        ["[dⁿ]", t("носовой взрыв", "nasal plosion"), t("перед [n], [m]", "before [n], [m]"), "sudden, admit"],
        ["[dˡ]", t("боковой взрыв", "lateral plosion"), t("перед [l]", "before [l]"), "middle, badly"],
        ["[d̠]", t("заальвеолярный", "post-alveolar"), t("перед [r]", "before [r]"), "dry, dream"],
        ["[d̪]", t("зубной", "dental"), t("перед [θ], [ð]", "before [θ], [ð]"), "breadth, lead the way"],
        ["[dʷ]", t("огубленный", "labialized"), t("перед [w]", "before [w]"), "dweller"],
        ["[d̥]", t("оглушённый", "devoiced"), t("в конце слова", "word-finally"), "road, old"]
      ];
      return '<div class="allo"><div class="allo-top"><span class="ipa allo-ph">/d/</span><span class="allo-k">' + L(t("фонема: инвариант — переднеязычный, смычный, слабый", "phoneme: invariant — forelingual, occlusive, lenis")) + '</span></div>' +
        '<div class="allo-main"><span class="ipa">[d]</span><div><b>' + L(t("основной аллофон", "principal allophone")) + '</b><small>' + L(t("в изоляции и без влияния соседей", "in isolation, no influence of neighbours")) + ": " + E("door, darn, down") + "</small></div></div>" +
        '<div class="allo-k2">' + L(t("неосновные (позиционные) аллофоны", "subsidiary (positional) allophones")) + '</div><div class="allo-grid">' +
        sub.map(function (x) { return '<div class="allo-c"><span class="ipa">' + x[0] + "</span><b>" + L(x[1]) + "</b><small>" + L(x[2]) + "</small>" + E(x[3]) + "</div>"; }).join("") +
        '</div><div class="allo-phone">' + L(t("Каждый аллофон в живой речи реализуется как <b>фон</b> — конкретный звук, на который влияют стиль, диалект и индивидуальные особенности говорящего. Поэтому двух абсолютно одинаковых звуков не бывает.", "Each allophone is realized in actual speech as a <b>phone</b> — a concrete sound shaped by style, dialect and the speaker’s individual features. That is why no two speech sounds are exactly alike.")) + "</div></div>";
    },

    phonemeFunctions: function () {
      var f = [
        [t("Дистинктивная (различительная)", "Distinctive"), t("Фонема различает слова и формы. Замена одной фонемы даёт другое слово.", "The phoneme distinguishes words and forms. Replacing one phoneme gives another word."), E("sleeper – sleepy") + "<br>" + E("bath – path") + "<br>" + E("He was heard badly – He was hurt badly")],
        [t("Конститутивная", "Constitutive"), t("Фонема в виде своих аллофонов строит звуковую оболочку морфем и слов. Аллофоны смысла не различают.", "Through its allophones the phoneme builds the sound shape of morphemes and words. Allophones do not distinguish meaning."), E("cap") + " " + I("[kʰæpʰ]") + " = " + I("[kʰæp̚]")],
        [t("Рекогнитивная (опознавательная)", "Recognitive"), t("Правильный аллофон в нужном контексте помогает слушателю опознать слово и понять сообщение.", "The right allophone in the right context helps the listener recognize the word and understand the message."), E("take it – tape it")]
      ];
      return '<div class="fg-three">' + f.map(function (x) { return '<div class="fg-box"><div class="fg-h">' + L(x[0]) + "</div><p>" + L(x[1]) + '</p><p class="fg-exs">' + x[2] + "</p></div>"; }).join("") + "</div>";
    },

    phonemeViews: function () {
      return table([t("Взгляд", "View"), t("Кто", "Who"), t("Что такое фонема", "What a phoneme is"), t("Слабое место", "Weak point")], [
        [t("<b>Психологический</b>", "<b>Psychological</b>"), "И. А. Бодуэн де Куртенэ, Э. Сепир", t("Идеальный мысленный образ звука; реальные звуки — отклонения от него.", "An ideal mental image of a sound; real sounds deviate from it."), t("Идеальный звук нельзя наблюдать (критика Блумфилда, Джоунза).", "An ideal sound cannot be observed (criticized by Bloomfield, Jones).")],
        [t("<b>Функциональный</b>", "<b>Functional</b>"), t("Н. С. Трубецкой, Р. Якобсон (Пражский кружок)", "N. S. Trubetskoy, R. Jakobson (Prague Circle)"), t("Пучок различительных признаков; неразличительные отбрасываются. " + E("ladder – latter") + ": различие только в силе третьего звука.", "A bundle of distinctive features; non-distinctive ones are removed. " + E("ladder – latter") + ": only the force of the third sound differs."), t("Фонема отрывается от реально произносимых звуков.", "The phoneme is cut off from actually pronounced sounds.")],
        [t("<b>Абстрактный</b>", "<b>Abstract</b>"), t("Л. Ельмслев и Копенгагенский кружок (Х. Ульдалль, К. Тогеби)", "L. Hjelmslev and the Copenhagen Circle (H. J. Uldall, K. Togeby)"), t("Единица, независимая от акустических и артикуляционных свойств.", "A unit independent of acoustic and articulatory properties."), t("Не учитывает реальную речь.", "Ignores real speech.")],
        [t("<b>Физический</b>", "<b>Physical</b>"), t("Д. Джоунз, Б. Блок, Дж. Трейгер", "D. Jones, B. Bloch, G. Trager"), t("«Семья» фонетически сходных звуков, которые не встречаются в одном контексте.", "A “family” of phonetically similar sounds that never occur in the same context."), t("Не учитывает функцию: почему звуки объединяются, если не по смыслу?", "Ignores function: why group sounds if not by meaning?")],
        [t("<b>Материалистический</b>", "<b>Materialistic</b>"), t("Л. В. Щерба, В. А. Васильев", "L. V. Shcherba, V. A. Vassiliev"), t("Единство функционального, материального и абстрактного аспектов: фонема реально существует в виде аллофонов.", "A unity of functional, material and abstract aspects: the phoneme really exists as its allophones."), t("Соколова считает этот взгляд самым удобным для обучения.", "Sokolova considers this view the most convenient for teaching.")]
      ], "fg-views");
    },

    /* ---------- 2.2 ---------- */
    aspirationTiming: function () {
      function row(y, label, segs) {
        var s = '<text class="fg-cap fg-left" x="6" y="' + (y + 22) + '">' + label + "</text>";
        segs.forEach(function (g) {
          if (g.k === "voice") { var path = "M" + g.x + " " + (y + 16); for (var xx = g.x; xx < g.x + g.w; xx += 8) path += " q2 -10 4 0 q2 10 4 0"; s += '<path class="fg-voice" d="' + path + '"/>'; }
          else if (g.k === "noise") { s += '<rect class="fg-noise" x="' + g.x + '" y="' + (y + 4) + '" width="' + g.w + '" height="24" rx="4"/>'; }
          else if (g.k === "asp") { s += '<rect class="fg-asp" x="' + g.x + '" y="' + (y + 4) + '" width="' + g.w + '" height="24" rx="4"/>'; }
          else if (g.k === "gap") { s += '<rect class="fg-gap" x="' + g.x + '" y="' + (y + 4) + '" width="' + g.w + '" height="24" rx="4"/>'; }
          else if (g.k === "burst") { s += '<line class="fg-burst" x1="' + g.x + '" y1="' + (y) + '" x2="' + g.x + '" y2="' + (y + 32) + '"/>'; }
          if (g.l && g.k === "burst") s += '<text class="fg-cap" x="' + g.x + '" y="' + (y - 5) + '">' + g.l + "</text>";
          else if (g.l) s += '<text class="fg-cap" x="' + (g.x + (g.w || 0) / 2) + '" y="' + (y + 46) + '">' + g.l + "</text>";
        });
        return s;
      }
      var s = '<svg viewBox="0 0 470 190" class="fg-wide fg-w470" role="img" aria-label="pin – spin">';
      s += row(22, "pin", [{ k: "gap", x: 100, w: 80, l: L(t("смычка", "closure")) }, { k: "burst", x: 182, l: L(t("взрыв", "release")) }, { k: "asp", x: 186, w: 70, l: L(t("придыхание", "aspiration")) }, { k: "voice", x: 260, w: 110, l: "[ɪ]" }, { k: "noise", x: 374, w: 40, l: "[n]" }]);
      s += row(118, "spin", [{ k: "noise", x: 54, w: 42, l: "[s]" }, { k: "gap", x: 100, w: 80, l: L(t("смычка", "closure")) }, { k: "burst", x: 182, l: L(t("взрыв", "release")) }, { k: "voice", x: 188, w: 110, l: "[ɪ]" }, { k: "noise", x: 302, w: 40, l: "[n]" }]);
      return s + '</svg><p class="fg-note">' + L(t("Волнистая линия — работа голосовых связок. В " + E("pin") + " связки начинают вибрировать не сразу после взрыва: между взрывом и гласным проходит струя воздуха — это и есть придыхание. В " + E("spin") + " гласный начинается почти сразу после взрыва, поэтому придыхания нет.", "The wavy line shows the vocal folds vibrating. In " + E("pin") + " voicing does not start right after the release: a puff of air passes between the release and the vowel — this is aspiration. In " + E("spin") + " the vowel starts almost immediately after the release, so there is no aspiration.")) + "</p>";
    },

    hNg: function () {
      return table([t("Позиция в слоге", "Position in the syllable"), "[h]", "[ŋ]"], [
        [t("в начале слога перед гласным", "syllable-initial before a vowel"), E("hat") + " " + I("[hæt]") + ", " + E("ahead") + " " + I("[əˈhed]"), "—"],
        [t("после гласного (середина или конец)", "after a vowel (medial or final)"), "—", E("sing") + " " + I("[sɪŋ]") + ", " + E("singer") + " " + I("[ˈsɪŋə]")],
        [t("фонетическое сходство", "phonetic similarity"), t("глухой глоттальный щелевой", "voiceless glottal fricative"), t("звонкий заднеязычный носовой сонант", "voiced velar nasal sonorant")]
      ]) + '<p class="fg-note">' + L(t("Позиции не пересекаются, но общего у звуков нет: место, способ, звонкость — всё разное. Поэтому одного распределения мало.", "The positions do not overlap, but the sounds share nothing: place, manner, voicing all differ. That is why distribution alone is not enough.")) + "</p>";
    },

    capCab: function () {
      return table([t("Звук", "Sound"), t("Пример", "Example"), t("Что слышно", "What is heard")], [
        [I("[pʰ]"), E("pin") + " " + I("[pʰɪn]"), t("взрыв и струя воздуха", "release plus a puff of air")],
        [I("[p̚]"), E("cap") + " " + I("[kʰæp̚]"), t("смычка без взрыва, короткий гласный", "closure without release, short vowel")],
        [I("[b̚]"), E("cab") + " " + I("[kʰæːb̚]"), t("смычка без взрыва, гласный длиннее", "closure without release, longer vowel")]
      ]) + '<p class="fg-note">' + L(t("Акустически " + I("[p̚]") + " и " + I("[b̚]") + " ближе друг к другу, чем " + I("[p̚]") + " и " + I("[pʰ]") + ". Но носитель относит " + I("[pʰ]") + " и " + I("[p̚]") + " к одной фонеме, а " + I("[b̚]") + " — к другой: решает функция, а не степень сходства.", "Acoustically " + I("[p̚]") + " and " + I("[b̚]") + " are closer to each other than " + I("[p̚]") + " and " + I("[pʰ]") + ". Yet speakers assign " + I("[pʰ]") + " and " + I("[p̚]") + " to one phoneme and " + I("[b̚]") + " to another: function decides, not the degree of similarity.")) + "</p>";
    },

    /* ---------- 2.3 ---------- */
    actApt: function () {
      function panel(x0, word, f2end, f3end, f1end) {
        var vx = x0 + 34, vw = 120, gx = vx + vw + 6;
        var s = '<text class="fg-title" x="' + (x0 + 112) + '" y="16">' + word + "</text>";
        s += '<rect class="fg-vowel" x="' + vx + '" y="26" width="' + vw + '" height="124" rx="6"/><rect class="fg-gap" x="' + gx + '" y="26" width="52" height="124" rx="6"/>';
        s += '<text class="fg-ipa" x="' + (vx + 40) + '" y="168">[æ]</text><text class="fg-cap" x="' + (gx + 26) + '" y="168">' + L(t("смычка", "closure")) + "</text>";
        var lines = [["F3", 46, f3end], ["F2", 82, f2end], ["F1", 126, f1end]];
        lines.forEach(function (ln) {
          s += '<path class="fg-formant' + (ln[0] === "F1" ? " f1" : "") + '" d="M' + (vx + 6) + " " + ln[1] + " L" + (vx + 72) + " " + ln[1] + " Q" + (vx + 104) + " " + ln[1] + " " + (vx + vw - 4) + " " + ln[2] + '"/>';
          s += '<text class="fg-cap fg-left" x="' + (x0 + 6) + '" y="' + (ln[1] + 4) + '">' + ln[0] + "</text>";
        });
        return s;
      }
      return '<svg viewBox="0 0 470 180" class="fg-wide fg-w470" role="img" aria-label="act – apt formant transitions">' +
        panel(0, "act", 62, 60, 140) + panel(236, "apt", 104, 66, 140) + '</svg>' +
        '<div class="fg-two fg-expl"><div class="fg-box"><div class="fg-h">act: ' + L(t("переход к [k]", "transition to [k]")) + "</div><p>" + L(t("Задняя часть спинки языка поднимается к мягкому нёбу. Резонатор делится на две части, и вторая и третья форманты (F2, F3) <b>сходятся</b>: F2 поднимается, F3 опускается. Это так называемая «велярная вилка».", "The back of the tongue rises to the soft palate. The vocal tract is divided, and the second and third formants (F2, F3) <b>converge</b>: F2 rises, F3 falls. This is known as the “velar pinch”.")) + '</p></div><div class="fg-box"><div class="fg-h">apt: ' + L(t("переход к [p]", "transition to [p]")) + "</div><p>" + L(t("Губы смыкаются. Резонатор как бы удлиняется, а при удлинении трубки все резонансы понижаются. Поэтому форманты, прежде всего F2, <b>опускаются</b>.", "The lips close. The vocal tract effectively lengthens, and a longer tube has lower resonances. So the formants, above all F2, <b>fall</b>.")) + "</p></div></div>" +
        '<p class="fg-note">' + L(t("Форманты — усиленные резонатором полосы частот в спектре гласного; на спектрограмме они видны как тёмные горизонтальные полосы. Сама смычка в " + E("act") + " и " + E("apt") + " — одинаковая тишина. Слушатель узнаёт согласный по тому, как форманты гласного «загибаются» к нему: вверх и навстречу друг другу перед [k], вниз перед [p].", "Formants are frequency bands strengthened by the vocal tract; on a spectrogram they look like dark horizontal bars. The closure itself in " + E("act") + " and " + E("apt") + " is the same silence. The listener identifies the consonant by how the vowel’s formants bend towards it: up and towards each other before [k], down before [p].")) + "</p>";
    },

    bedBet: function () {
      function bars(y, word, segs) {
        var s = '<text class="fg-cap fg-left" x="6" y="' + (y + 20) + '">' + word + "</text>", x = 60;
        segs.forEach(function (g) { s += '<rect class="' + g[2] + '" x="' + x + '" y="' + y + '" width="' + g[1] + '" height="28" rx="5"/><text class="fg-ipa" x="' + (x + g[1] / 2) + '" y="' + (y + 20) + '">' + g[0] + "</text>"; x += g[1] + 4; });
        return s;
      }
      return '<svg viewBox="0 0 360 96" class="fg-wide fg-w360" role="img" aria-label="bed – bet">' + bars(8, "bed", [["b", 34, "fg-bar"], ["eː", 140, "fg-bar-p"], ["d", 34, "fg-bar"]]) + bars(56, "bet", [["b", 34, "fg-bar"], ["e", 72, "fg-bar-p"], ["t", 34, "fg-bar"]]) + '</svg><p class="fg-note">' + L(t("Конечные " + I("[d]") + " и " + I("[t]") + " звучат похоже: " + I("[d]") + " в конце слова частично оглушается. Главное различие — длительность гласного: перед слабым согласным гласный заметно длиннее.", "Final " + I("[d]") + " and " + I("[t]") + " sound similar: word-final " + I("[d]") + " is partly devoiced. The main difference is vowel length: before a lenis consonant the vowel is noticeably longer.")) + "</p>";
    },

    consonantTrees: function () {
      function tree(title, src, root, l1, l2) {
        return '<div class="tree"><div class="fg-h">' + L(title) + '</div><small class="muted">' + src + '</small><div class="tree-root">' + L(root) + '</div><div class="tree-row">' + l1.map(function (b, i) {
          return '<div class="tree-branch"><div class="tree-n">' + L(b) + '</div><div class="tree-leaves">' + l2[i].map(function (lf) { return "<span>" + L(lf) + "</span>"; }).join("") + "</div></div>";
        }).join("") + "</div></div>";
      }
      return '<div class="fg-two">' +
        tree(t("Васильев: сначала тип преграды", "Vassiliev: type of obstruction first"), "tea – sea, pull – full", t("согласные", "consonants"), [t("смычные", "occlusive"), t("щелевые", "constrictive")], [[t("шумные: взрывные, аффрикаты", "noise: plosives, affricates"), t("сонанты: [m n ŋ]", "sonorants: [m n ŋ]")], [t("шумные: [f v θ ð s z ʃ ʒ h]", "noise: [f v θ ð s z ʃ ʒ h]"), t("сонанты: срединные и боковой", "sonorants: medial and lateral")]]) +
        tree(t("Соколова: сначала степень шума", "Sokolova: degree of noise first"), "bake – make, veal – wheel", t("согласные", "consonants"), [t("шумные", "noise consonants"), t("сонанты", "sonorants")], [[t("смычные", "occlusive"), t("щелевые", "constrictive"), t("смычно-щелевые", "occlusive-constrictive")], [t("смычные [m n ŋ]", "occlusive [m n ŋ]"), t("щелевые: боковой [l], срединные [w r j]", "constrictive: lateral [l], medial [w r j]")]]) + "</div>";
    },

    /* ---------- 2.4 ---------- */
    moscowColumns: function () {
      return table([t("Форма", "Form"), t("Звучание", "Sound"), t("1-й согласный", "1st consonant"), t("гласный корня", "root vowel"), t("2-й согласный", "2nd consonant")], [
        [E("воды"), I("[вóды]"), I("[в]"), "<b>" + I("[о]") + "</b>", "<b>" + I("[д]") + "</b>"],
        [E("вода"), I("[вʌдá]"), I("[в]"), I("[ʌ]"), I("[д]")],
        [E("водовоз"), I("[въдʌвóс]"), I("[в]"), I("[ъ]"), I("[д]")],
        [E("вод"), I("[вот]"), I("[в]"), I("[о]"), I("[т]")],
        [E("подводник"), I("[пʌдвóдʼнʼик]"), I("[в]"), I("[о]"), I("[дʼ]")],
        [t("<b>фонема МФШ</b>", "<b>Moscow phoneme</b>"), "", "<b>/в/</b>", "<b>/о/</b>", "<b>/д/</b>"]
      ], "fg-cols") + '<p class="fg-note">' + L(t("Каждый столбец — ряд позиционно чередующихся звуков одной морфемы. Это и есть фонема в понимании МФШ. Название фонеме даёт звук сильной позиции (выделен).", "Each column is a series of positionally alternating sounds of one morpheme. This is what the Moscow school calls a phoneme. It is named after the sound in the strong position (in bold).")) + "</p>";
    },

    schoolsCompare: function () {
      return table([t("Звук", "Sound"), t("Московская", "Moscow"), t("Пражская (Трубецкой)", "Prague (Trubetskoy)"), t("Петербургская (Щерба)", "St Petersburg (Shcherba)")], [
        [E("вод") + " " + I("[вот]"), "/д/ (" + E("вода") + ")", "/T/", "/т/"],
        [E("вода") + " " + I("[вʌда́]"), "/о/ (" + E("воды") + ")", t("архифонема о/а", "archiphoneme o/a"), "/а/"],
        [E("собака") + " " + I("[сʌба́кə]"), "{о/а}", t("архифонема о/а", "archiphoneme o/a"), "/а/"],
        [t("Опора решения", "Basis of decision"), t("морфема и сильная позиция", "morpheme and strong position"), t("общие признаки нейтрализованных фонем", "features shared by neutralized phonemes"), t("ближайшее звучание", "closest sound")]
      ]);
    },

    englishAlternations: function () {
      return table([t("Пара", "Pair"), t("Транскрипция", "Transcription"), t("Чередование", "Alternation"), t("Проверка: нет чередования", "Check: no alternation")], [
        [E("knife – knives"), I("[naɪf] – [naɪvz]"), I("/f/ ~ /v/"), E("chief – chiefs") + " " + I("[tʃiːfs]")],
        [E("electric – electricity"), I("[ɪˈlektrɪk] – [ˌɪlekˈtrɪsəti]"), I("/k/ ~ /s/"), E("kitty") + " " + I("[ˈkɪti]")],
        [E("divine – divinity"), I("[dɪˈvaɪn] – [dɪˈvɪnəti]"), I("/aɪ/ ~ /ɪ/"), E("fine – finer") + " " + I("[ˈfaɪnə]")],
        [E("photograph – photography"), I("[ˈfəʊtəɡrɑːf] – [fəˈtɒɡrəfi]"), t("редукция в безударном слоге", "reduction in an unstressed syllable"), t("автоматическая: в любом безударном слоге", "automatic: in any unstressed syllable")]
      ]);
    },

    /* ---------- 2.5 ---------- */
    mistakeSteps: function () {
      var steps = [
        [t("Какую фонему хотел произнести учащийся?", "Which phoneme did the learner intend?"), E("beat") + " " + I("/biːt/") + ": " + I("/iː/")],
        [t("Какой звук прозвучал на самом деле?", "Which sound was actually produced?"), t("более открытый, без скольжения", "more open, without a glide") + " " + I("[ɪ]")],
        [t("Это аллофон той же фонемы или другой?", "Is it an allophone of the same phoneme or of another?"), I("[ɪ]") + " " + L(t("— аллофон фонемы", "— an allophone of")) + " " + I("/ɪ/")],
        [t("Есть ли минимальная пара? Изменилось ли слово?", "Is there a minimal pair? Did the word change?"), E("beat – bit") + ": " + L(t("да, фонологическая ошибка", "yes, a phonological mistake"))]
      ];
      return '<ol class="steps">' + steps.map(function (s) { return "<li><b>" + L(s[0]) + "</b><span>" + s[1] + "</span></li>"; }).join("") + "</ol>";
    },

    mistakesTable: function () {
      var ph = t("фонологическая", "phonological"), pt = t("фонетическая", "phonetic");
      return table([t("Слово", "Word"), t("Норма", "Target"), t("Произнесено", "Produced"), t("Что произошло", "What happened"), t("Тип", "Type")], [
        [E("beat"), I("[biːt]"), I("[bɪt]"), t("изменилось качество гласного: " + E("bit"), "vowel quality changed: " + E("bit")), "<b>" + L(ph) + "</b>"],
        [E("thin"), I("[θɪn]"), I("[sɪn]"), t("зубной заменён альвеолярным: " + E("sin"), "dental replaced by alveolar: " + E("sin")), "<b>" + L(ph) + "</b>"],
        [E("bed"), I("[bed]"), I("[bet]"), t("слабый заменён сильным: " + E("bet"), "lenis replaced by fortis: " + E("bet")), "<b>" + L(ph) + "</b>"],
        [E("wet"), I("[wet]"), I("[vet]"), t("губно-губной сонант заменён губно-зубным: " + E("vet"), "bilabial sonorant replaced by labiodental: " + E("vet")), "<b>" + L(ph) + "</b>"],
        [E("pen"), I("[pʰen]"), I("[pen]"), t("нет придыхания, слово то же", "no aspiration, same word"), L(pt)],
        [E("pill"), I("[pʰɪɫ]"), I("[pʰɪl]"), t("светлый [l] вместо тёмного", "clear [l] instead of dark"), L(pt)],
        [E("sheep"), I("[ʃiːp]"), I("[ʃiːːp]"), t("чрезмерная долгота, качество то же", "excessive length, same quality"), L(pt)]
      ]);
    },

    /* ---------- 3.1 ---------- */
    syllableTheories: function () {
      var W = ["gar", "den"];
      function mini(kind) {
        var s = '<svg viewBox="0 0 150 80" role="img" aria-label="' + kind + '">';
        if (kind === "exp") { s += '<path class="fg-trace" d="M10 64 Q35 14 60 64 M80 64 Q105 18 130 64"/>'; }
        if (kind === "son") { [[10, 1], [32, 6], [54, 1], [76, 3]].forEach(function (b) { s += '<rect class="' + (b[1] > 2 ? "fg-bar-p" : "fg-bar") + '" x="' + (b[0] + 20) + '" y="' + (64 - b[1] * 9) + '" width="18" height="' + b[1] * 9 + '" rx="3"/>'; }); }
        if (kind === "ten") { s += '<path class="fg-trace" d="M10 64 L40 22 L66 64 M80 64 L106 30 L132 64"/><text class="fg-cap" x="40" y="16">' + L(t("пик", "peak")) + "</text>"; }
        if (kind === "loud") { s += '<path class="fg-trace" d="M10 62 C25 20 50 20 64 62 M78 62 C92 32 118 32 132 62"/>'; }
        return s + '<text class="fg-cap" x="37" y="78">gar</text><text class="fg-cap" x="105" y="78">den</text></svg>';
      }
      var th = [
        ["exp", t("Экспираторная", "Expiratory"), "R. H. Stetson", t("Слог — один выдыхательный толчок мышц грудной клетки.", "A syllable is one chest pulse of the breathing muscles.")],
        ["son", t("Сонорная", "Sonority"), "O. Jespersen", t("Слог — волна звучности: вершина — самый звучный звук (обычно гласный).", "A syllable is a wave of sonority: the peak is the most sonorous sound (usually a vowel).")],
        ["ten", t("Мускульного напряжения", "Muscular tension"), t("Л. В. Щерба, В. А. Васильев", "L. V. Shcherba, V. A. Vassiliev"), t("Слог — дуга нарастания и спада мускульного напряжения; граница — там, где напряжение снова растёт.", "A syllable is an arc of rising and falling muscular tension; the boundary is where tension rises again.")],
        ["loud", t("Громкости", "Loudness"), t("Н. И. Жинкин", "N. I. Zhinkin"), t("Слог — дуга громкости, связанная с сужением и расширением глотки.", "A syllable is an arc of loudness linked to narrowing and widening of the pharynx.")]
      ];
      return '<div class="theories">' + th.map(function (x) { return '<div class="fg-box"><div class="fg-h">' + L(x[1]) + '</div><small class="muted">' + L(x[2]) + "</small>" + mini(x[0]) + "<p>" + L(x[3]) + "</p></div>"; }).join("") + "</div>";
    },

    sonorityScale: function () {
      var rows = [[6, t("гласные", "vowels"), "[ɑː æ e ɪ]"], [5, t("срединные сонанты", "medial sonorants"), "[w j r]"], [4, t("боковой сонант", "lateral"), "[l]"], [3, t("носовые сонанты", "nasals"), "[m n ŋ]"], [2, t("щелевые", "fricatives"), "[f v s z ʃ]"], [1, t("смычные", "stops"), "[p b t d k ɡ]"]];
      return '<div class="scale">' + rows.map(function (r) { return '<div class="scale-r"><span class="scale-bar" style="width:' + (34 + r[0] * 11) + '%"></span><span class="scale-l">' + L(r[1]) + ' <span class="ipa">' + r[2] + "</span></span></div>"; }).join("") + '</div><p class="fg-note">' + L(t("Чем выше ступень, тем звучнее звук. Вершина слога — самый звучный звук; поэтому в " + E("garden") + " слоговым становится сонант " + I("[n̩]") + ": он звучнее соседнего " + I("[d]") + ".", "The higher the step, the more sonorous the sound. The syllable peak is the most sonorous sound; that is why the sonorant " + I("[n̩]") + " becomes syllabic in " + E("garden") + ": it is more sonorous than the neighbouring " + I("[d]") + ".")) + "</p>";
    },

    cityBoundary: function () {
      return '<div class="fg-two"><div class="fg-box"><div class="fg-h">' + L(t("Английский: граница внутри согласного", "English: the boundary inside the consonant")) + '</div><div class="cb"><span class="ipa">sɪ</span><span class="ipa cb-split"><i>t</i></span><span class="ipa">i</span></div><p class="fg-note">' + L(t("Начало " + I("[t]") + " закрывает первый слог (усечённый " + I("[ɪ]") + "), его взрыв открывает второй.", "The onset of " + I("[t]") + " closes the first syllable (checked " + I("[ɪ]") + "), its release opens the second.")) + '</p></div><div class="fg-box"><div class="fg-h">' + L(t("Русский: первый слог открыт", "Russian: the first syllable is open")) + '</div><div class="cb"><span>си</span><span class="cb-gap"></span><span>ла</span></div><p class="fg-note">' + L(t("Гласный свободный, граница проходит перед согласным. Перенос этой модели даёт " + E("ci-ty") + " с акцентом.", "The vowel is free, the boundary comes before the consonant. Transferring this gives an accented " + E("ci-ty") + ".")) + "</p></div></div>";
    },

    onsets: function () {
      return table([t("Начальные сочетания", "Initial clusters"), t("Примеры", "Examples"), t("Как делить", "How to divide")], [
        [t("<b>возможны</b>: [pl pr bl br tr dr kl kr ɡl ɡr sp st sk spl spr str skr]", "<b>possible</b>: [pl pr bl br tr dr kl kr ɡl ɡr sp st sk spl spr str skr]"), E("play, bread, street"), E("a-gree, a-brupt, ex-tra")],
        [t("<b>невозможны</b>: [dm bh tl dl pn ŋ-]", "<b>impossible</b>: [dm bh tl dl pn ŋ-]"), "—", E("ad-mire, ab-hor, at-las")]
      ]);
    },

    /* ---------- 3.2 ---------- */
    intonationSchools: function () {
      return table([t("Направление", "Approach"), t("Представители", "Representatives"), t("Основная единица и идея", "Main unit and idea")], [
        [t("<b>Контурный анализ</b> (британская традиция)", "<b>Contour analysis</b> (British tradition)"), t("Г. Суит, Д. Джоунз, Г. Палмер; О’Коннор и Арнольд", "H. Sweet, D. Jones, H. Palmer; O’Connor and Arnold"), t("Тоновая группа: предшкала, шкала, ядро, хвост. Интонация выражает отношение говорящего; О’Коннор и Арнольд выделяют десять тоновых групп.", "The tone group: pre-head, head, nucleus, tail. Intonation expresses the speaker’s attitude; O’Connor and Arnold distinguish ten tone groups.")],
        [t("<b>Грамматический подход</b>", "<b>Grammatical approach</b>"), "M. A. K. Halliday", t("Три системы выбора: <b>tonality</b> (членение), <b>tonicity</b> (место ядра), <b>tone</b> (тон). " + E("I don’t know") + ": низкий нисходящий — нейтрально, низкий восходящий — уклончиво, нисходяще-восходящий — с оговоркой.", "Three systems of choice: <b>tonality</b> (division), <b>tonicity</b> (place of the nucleus), <b>tone</b>. " + E("I don’t know") + ": Low Fall neutral, Low Rise non-committal, Fall-Rise with reservation.")],
        [t("<b>Американская школа уровней</b>", "<b>American levels school</b>"), "K. Pike", t("Тональные «фонемы» — четыре уровня высоты (1–4) и контуры из них. Многие лингвисты считают подход механистичным.", "Pitch “phonemes” — four pitch levels (1–4) and contours built from them. Many linguists consider the approach mechanical.")],
        [t("<b>Экстралингвистический подход</b>", "<b>Extralinguistic approach</b>"), "D. Crystal", t("Значение тона нельзя свести к грамматике или отношению: важны мимика и ситуация. Девять способов сказать " + E("Yes") + " в ответ на " + E("Will you marry me?") + ".", "The meaning of a tone cannot be reduced to grammar or attitude: facial expression and situation matter. Nine ways of saying " + E("Yes") + " in reply to " + E("Will you marry me?") + ".")],
        [t("<b>Российская традиция</b>", "<b>Russian tradition</b>"), t("Соколова, Васильев, Брызгунова", "Sokolova, Vassiliev, Bryzgunova"), t("Интонация — единство высоты тона, громкости и темпа (у Васильева ещё тембр). Соколова предлагает термин «просодия».", "Intonation is a unity of pitch, loudness and tempo (Vassiliev adds timbre). Sokolova proposes the term “prosody”.")]
      ], "fg-views");
    },

    pitchVsBroad: function () {
      return '<div class="fg-two"><div class="fg-box"><div class="fg-h">' + L(t("Узкое понимание", "Narrow view")) + '</div><small class="muted">Jones, Cruttenden, Roach</small><div class="comp-mini"><span class="on">' + L(t("высота тона", "pitch")) + "</span></div><p>" + L(t("«Intonation is the use of pitch variation to convey meaning» (Roach).", "“Intonation is the use of pitch variation to convey meaning” (Roach).")) + '</p></div><div class="fg-box fg-acc"><div class="fg-h">' + L(t("Широкое понимание", "Broad view")) + '</div><small class="muted">' + L(t("Соколова, российская традиция", "Sokolova, Russian tradition")) + '</small><div class="comp-mini"><span class="on">' + L(t("высота тона", "pitch")) + '</span><span class="on">' + L(t("громкость", "loudness")) + '</span><span class="on">' + L(t("темп", "tempo")) + '</span><span class="opt">' + L(t("тембр?", "timbre?")) + "</span></div><p>" + L(t("Все компоненты действуют вместе; высота тона главная, но не единственная.", "All components work together; pitch is the main one, but not the only one.")) + "</p></div></div>";
    },

    /* ---------- 3.4 ---------- */
    markingSystem: function () {
      var N = function (o) { return Object.assign({ t: "No", n: true }, o); };
      var G = [
        ["ˎ", t("Низкий нисходящий", "Low Fall"), [["ˎNo", [N({ k: "f", y: .5, y2: 0 })], "Intonation Contour 1", ""]]],
        ["˴", t("Средний нисходящий", "Medium Fall"), [["˴No", [N({ k: "f", y: .74, y2: 0 })], "", ""]]],
        ["ˋ", t("Высокий нисходящий", "High Fall"), [["ˋNo", [N({ k: "f", y: 1, y2: 0 })], "Intonation Contour 3", ""]]],
        ["ˏ", t("Низкий восходящий", "Low Rise"), [["ˏNo", [N({ k: "r", y: -.03, y2: .5 })], "Intonation Contour 2", ""], ["ˏNo, Sir", [N({ k: "r", y: .08, y2: .2 }), { t: "Sir", k: "u", keep: true, y: .2 }], "The tail with an unstressed syllable", "хвост с безударным слогом"]]],
        ["˵", t("Средний восходящий", "Medium Rise"), [["˵No", [N({ k: "r", y: .42, y2: .8 })], "", ""]]],
        ["ˊ", t("Высокий восходящий", "High Rise"), [["ˊNo", [N({ k: "r", y: .72, y2: 1.03 })], "Intonation Contour 4", ""]]],
        ["ˇ", t("Нисходяще-восходящий", "Fall Rise"), [["ˇNo", [N({ k: "fr", y: .45, y2: -.04, y3: .2 })], "Intonation Contour 5. One syllable", "один слог"], ["ˎNeˏver", [{ t: "Ne", k: "fr", y: .5, y2: -.04, y3: .3, n: true }, { t: "ver", k: "u" }], "The Fall-Rise spread over two syllables", "тон распределён на два слога"], ["ˎGenerally, Iˏdo", [{ t: "Ge", k: "fr", y: .5, y2: -.04, y3: .52, n: true }, { t: "ne", k: "u" }, { t: "ral", k: "u" }, { t: "ly", k: "u" }, { t: "I", k: "u" }, { t: "do", k: "u" }], "The Fall-Rise spread over a number of syllables", "тон распределён на несколько слогов"]]],
        ["ˆ", t("Восходяще-нисходящий", "Rise Fall"), [["ˆNo", [N({ k: "rf", y: .5, y2: 1.02, y3: 0 })], "Intonation Contour 6", ""]]],
        ["˗", t("Средний ровный", "Medium Level"), [["˗No", [N({ k: "ml", y: .5 })], "", ""]]]
      ];
      var body = "";
      G.forEach(function (g, gi) {
        g[2].forEach(function (r, ri) {
          body += '<tr class="' + (gi % 2 ? "" : "ms-odd") + '">' + (ri === 0 ? '<td rowspan="' + g[2].length + '"><span class="tn ms-mark">' + g[0] + "</span> – " + g[1].en + (I18N.lang === "ru" ? '<br><span class="muted">' + g[1].ru + "</span>" : "") + "</td>" : "") +
            '<td class="tn ms-mark ms-ph">' + r[0] + "</td><td>" + S(r[1], { step: 22, noText: true, minW: 170, label: r[0] }) + '</td><td class="ms-note">' + (r[2] ? r[2] : "") + (r[3] && I18N.lang === "ru" ? '<br><span class="muted">' + r[3] + "</span>" : "") + "</td></tr>";
        });
      });
      return '<div class="fg-scroll"><table class="fg-table ms-table ms-file"><thead><tr><th>' + L(t("Тон", "Tone")) + "</th><th>" + L(t("Фраза", "Phrase")) + "</th><th>" + L(t("Тонограмма", "Tonogram")) + "</th><th>" + L(t("Примечание", "Notes")) + "</th></tr></thead><tbody>" + body + "</tbody></table></div>" +
        '<div class="fg-scroll"><table class="fg-table ms-table ms-file"><thead><tr><th>' + L(t("Паузы", "Pauses")) + "</th><th>" + L(t("Описание", "Description")) + "</th></tr></thead><tbody>" +
        [["¦", t("короткая пауза", "a short pause")], ["|", t("средняя пауза", "a medium pause")], ["||", t("длинная пауза", "a long pause")]].map(function (r, i) { return '<tr class="' + (i % 2 ? "" : "ms-odd") + '"><td class="tn ms-mark">' + r[0] + "</td><td>– " + L(r[1]) + "</td></tr>"; }).join("") + "</tbody></table></div>" +
        '<p class="fg-note"><a href="assets/docs/marking-system.pdf" target="_blank" rel="noopener">' + L(t("Открыть исходный файл разметки (PDF)", "Open the original marking file (PDF)")) + "</a></p>";
    },

    amelia: function () {
      var C = Figures._contour;
      var rows = [
        ["(20)", "H* L-L%", t("простое утверждение: " + E("Her name is Amelia."), "a simple statement: " + E("Her name is Amelia.")), [[0, .4], [.35, .4], [.45, .9], [.62, .15], [1, .1]], [2, 3]],
        ["(21)", "L* H-H%", t("общий вопрос: " + E("Did you say Amelia?"), "a yes-no question: " + E("Did you say Amelia?")), [[0, .4], [.35, .35], [.45, .15], [.7, .6], [1, .95]], [2, 3]],
        ["(22)", "L* L-H%", t("обращение, «твоя очередь»: подъём незавершённости", "addressing Amelia, “your turn”: a continuation rise"), [[0, .4], [.35, .35], [.45, .15], [.75, .2], [1, .55]], [2, 3]],
        ["(23)", "L+H* L-H%", t("вопрос с удивлением", "a surprised question"), [[0, .4], [.38, .3], [.48, .95], [.7, .2], [1, .55]], [2, 3]],
        ["(24)", "L+H* L-L%", t("резкая реакция, упрёк", "a strong reaction, a reprimand"), [[0, .4], [.38, .3], [.48, .95], [.7, .15], [1, .08]], [2, 3]]
      ];
      return '<div class="fg-scroll"><table class="fg-table"><thead><tr><th></th><th>ToBI</th><th>' + L(t("Значение", "Meaning")) + "</th><th>" + L(t("Контур", "Contour")) + "</th></tr></thead><tbody>" +
        rows.map(function (r) { return "<tr><td>" + r[0] + ' <span class="ex">Amelia</span></td><td class="tobi-str">' + r[1] + "</td><td>" + L(r[2]) + '</td><td style="min-width:130px">' + C(r[3], r[4], { w: 130, h: 52, label: r[1] }) + "</td></tr>"; }).join("") +
        '</tbody></table></div><p class="fg-note">' + L(t("Примеры Ладефогеда и Джонсона. Подъём в (21) больше, чем в (22): фразовый акцент H- поднимает конец, а L- не даёт ему подняться высоко.", "Ladefoged and Johnson’s examples. The rise in (21) is larger than in (22): the phrase accent H- lifts the end, while L- keeps it from rising high.")) + "</p>";
    },

    downdrift: function () {
      var syl = [{ t: "Mar", y: .95, k: "s" }, { t: "y’s", y: .9, k: "u" }, { t: "young", y: .85, k: "u" }, { t: "er", y: .8, k: "u" }, { t: "bro", y: .78, k: "s" }, { t: "ther", y: .72, k: "u" }, { t: "want", y: .68, k: "u" }, { t: "ed", y: .64, k: "u" }, { t: "fif", y: .6, k: "s" }, { t: "ty", y: .55, k: "u" }, { t: "cho", y: .5, k: "u" }, { t: "co", y: .46, k: "u" }, { t: "late", y: .42, k: "u" }, { t: "pea", y: .4, k: "f", y2: .03, n: true }, { t: "nuts", y: .02, k: "u" }];
      return '<div class="fg-scroll">' + S(syl, { step: 34, label: "downdrift", end: "||" }) + '</div><p class="fg-tone tobi-str">H* &nbsp; !H* &nbsp; !H* &nbsp; !H* L-L%</p><p class="fg-note">' + L(t("Каждый следующий высокий тон чуть ниже предыдущего (downdrift). В ToBI это записывают знаком даунстепа !H*. В британской традиции та же картина — нисходящая шкала.", "Each successive high tone is a little lower than the one before (downdrift). ToBI writes this with the downstep mark !H*. In the British tradition the same picture is a descending head.")) + "</p>";
    }
  });
  Object.assign(Figures, {
    meaningViews: function () {
      return '<div class="fg-two"><div class="fg-box"><div class="fg-h">' + L(t("Дистрибутивисты (З. Харрис, Б. Блок, Дж. Трейгер)", "Distributionalists (Z. Harris, B. Bloch, G. Trager)")) + '</div><ul><li>' + L(t("фонемы выделяются по распределению звуков", "phonemes are established from the distribution of sounds")) + "</li><li>" + L(t("значение по возможности не привлекается", "meaning is avoided where possible")) + "</li><li>" + L(t("на практике спрашивают информанта, одинаковы ли слова («дифференциальное значение»)", "in practice an informant is asked whether words are the same (“differential meaning”)")) + '</li></ul></div><div class="fg-box fg-acc"><div class="fg-h">' + L(t("Сторонники семантического метода (российская традиция)", "Supporters of the semantic method (Russian tradition)")) + '</div><ul><li>' + L(t("главный критерий — изменение смысла", "the main criterion is a change of meaning")) + "</li><li>" + L(t("структуралисты недооценивали различительную функцию фонемы (Соколова)", "structuralists underestimated the distinctive function of the phoneme (Sokolova)")) + "</li><li>" + L(t("процедура — средство понять язык, а не цель", "a procedure is a means to understand language, not a goal")) + "</li></ul></div></div>";
    },
    bryzErrors: function () {
      var c = [
        [t("Преимущественно артикуляционные", "Mainly articulatory"), t("Звук произносится с чужой артикуляцией. Исправляются упражнениями со звуками-помощниками и в благоприятной фонетической позиции, затем закрепляются в сочетаниях.", "The sound is produced with a foreign articulation. Corrected with helper sounds and in a favourable phonetic position, then consolidated in combinations."), t("придыхание заднеязычных, язычковый р у иностранцев", "aspirated velars, a uvular r in foreigners’ Russian")],
        [t("Преимущественно фонологические", "Mainly phonological"), t("Смешиваются две фонемы. Исправляются упражнениями на противопоставление смешиваемых фонем во всех возможных позициях.", "Two phonemes are confused. Corrected by exercises contrasting the confused phonemes in all possible positions."), E("быть – бить") + "; " + E("beat – bit")],
        [t("Смешанные", "Mixed"), t("Исправляются последовательно: сначала артикуляция (звуки-помощники, благоприятная позиция), затем закрепление, затем фонологическое различение.", "Corrected in sequence: first articulation (helper sounds, favourable position), then consolidation, then phonological discrimination."), t("сочетание обоих типов", "a combination of both")]
      ];
      return '<div class="fg-three">' + c.map(function (x) { return '<div class="fg-box"><div class="fg-h">' + L(x[0]) + "</div><p>" + L(x[1]) + '</p><p class="fg-exs">' + L(x[2]) + "</p></div>"; }).join("") + "</div>";
    },
    divisionViews: function () {
      var row = function (who, crit, city, leader) { return "<tr><td><b>" + L(who) + "</b></td><td>" + L(crit) + "</td><td>" + city + "</td><td>" + leader + "</td></tr>"; };
      return '<div class="fg-scroll"><table class="fg-table fg-views"><thead><tr><th>' + L(t("Подход", "Approach")) + "</th><th>" + L(t("Критерий", "Criterion")) + "</th><th>" + E("city") + "</th><th>" + E("leader") + "</th></tr></thead><tbody>" +
        row(t("Л. В. Щерба, В. А. Васильев", "L. V. Shcherba, V. A. Vassiliev"), t("теория мускульного напряжения: новый слог начинается с нового усиления напряжения", "muscular tension: a new syllable starts with a new increase of tension"), L(t("граница внутри " + I("[t]"), "the boundary inside " + I("[t]"))), I("[ˈliː.də]")) +
        row(t("Курс лекций (лекция 5)", "Course lectures (Lecture 5)"), t("свободный или усечённый характер ударного гласного; для безударных — допустимые начальные сочетания: " + I("[ə-ˈɡriː]") + ", но " + I("[əd-ˈmɪt]") + "; " + I("[ˈek-strə]"), "free or checked character of the stressed vowel; for unstressed ones — possible initial clusters: " + I("[ə-ˈɡriː]") + " but " + I("[əd-ˈmɪt]") + "; " + I("[ˈek-strə]")), I("[ˈsɪt-’ɪ]") + "<br><small>" + L(t("по данным инструментального анализа", "according to instrumental analysis")) + "</small>", I("[ˈliː-də]")) +
        row(t("Дж. Уэллс (LPD)", "J. Wells (LPD)"), t("интервокальный согласный относится к ударному слогу", "the intervocalic consonant goes to the stressed syllable"), I("[ˈsɪt.i]"), I("[ˈliːd.ə]")) +
        "</tbody></table></div>";
    }
  });
})();