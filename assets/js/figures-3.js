/* Инфографика для карточек, где раньше был только текст. */
(function () {
  var I = function (s) { return '<span class="ipa">' + s + "</span>"; };
  var E = function (s) { return '<span class="ex">' + s + "</span>"; };
  var A = function (v) { return '<span class="acc-v">' + v + "́</span>"; };
  var S = Figures._staff;
  var yes = '<span class="fg-yes">' + "+" + "</span>", no = '<span class="fg-no">' + "–" + "</span>";

  function table(head, rows, cls) {
    return '<div class="fg-scroll"><table class="fg-table ' + (cls || "") + '"><thead><tr>' + head.map(function (h) { return "<th>" + L(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + L(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }
  function note(x) { return '<p class="fg-note">' + L(x) + "</p>"; }
  function box(h, body) { return '<div class="fg-box"><div class="fg-h">' + L(h) + "</div>" + body + "</div>"; }
  function tone(x) { return '<p class="fg-tone">' + x + "</p>"; }

  /* Знаки шкал из системы разметки курса (рисуются SVG, не символами). */
  var HM = {
    desc: "M2 2 L10 10 M10 10 L5 10 M10 10 L10 5",
    level: "M1 6 L11 6 M11 6 L7 2.5 M11 6 L7 9.5",
    up: "M6 11 L6 1 M6 1 L2.5 5 M6 1 L9.5 5",
    slide: "M2 1 C2.5 7 5 10.5 9 10.5 M9 10.5 L11 7",
    scand: "M1.5 6 C2.5 11.5 9.5 11.5 10.5 6"
  };
  function hm(kind, lvl) { return '<span class="hm hm-' + (lvl || "hi") + '" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="' + HM[kind] + '"/></svg></span>'; }
  Figures._hm = hm;

  function cinema(ys, nucY) {
    var w = ["I", "don’t", "want", "to", "go", "to", "the"];
    var a = w.map(function (x, i) { var v = ys[i]; return typeof v === "object" ? Object.assign({ t: x }, v) : { t: x, k: v.k || "u", y: v }; });
    return a.concat([{ t: "ci", k: "f", y: nucY, y2: .03, n: true }, { t: "ne", k: "u" }, { t: "ma", k: "u" }]);
  }
  var s_ = function (y) { return { k: "s", y: y }; };

  Object.assign(Figures, {

    /* ---------- 2.1 ---------- */
    ruEnHearing: function () {
      return table([t("Различие", "Contrast"), t("В русском", "In Russian"), t("В английском", "In English"), t("Что происходит у учащегося", "What happens to the learner")], [
        [I("[л] – [лʼ]") + "<br>" + I("[l] – [ɫ]"), yes + " " + t("разные фонемы: " + E("лук – люк"), "different phonemes: " + E("лук – люк")), no + " " + t("аллофоны: светлый в " + E("leaf") + ", тёмный в " + E("feel"), "allophones: clear in " + E("leaf") + ", dark in " + E("feel")), t("слышит разницу, но в английском она смысла не меняет", "hears the difference, but in English it does not change meaning")],
        [I("[pʰ] – [p]"), no + " " + t("придыхания нет", "no aspiration"), no + " " + t("аллофоны: " + I("[pʰɪn]") + " " + E("pin") + ", " + I("[spɪn]") + " " + E("spin"), "allophones: " + I("[pʰɪn]") + " " + E("pin") + ", " + I("[spɪn]") + " " + E("spin")), t("не замечает придыхания и не произносит его", "does not notice aspiration and does not produce it")],
        [I("[iː] – [ɪ]"), no + " " + t("нет такого противопоставления", "no such contrast"), yes + " " + t("разные фонемы: " + E("beat – bit"), "different phonemes: " + E("beat – bit")), t("слышит «один и тот же [и]» и путает слова", "hears “the same [и]” and confuses words")],
        [I("[æ] – [e]"), no + " " + t("один гласный [э]", "one vowel [э]"), yes + " " + t("разные фонемы: " + E("man – men"), "different phonemes: " + E("man – men")), t("смешивает фонемы, ошибка меняет смысл", "merges the phonemes, the mistake changes meaning")]
      ]) + note(t("Знак «+» — различие фонемно, «–» — нет. Опасны строки, где в английском «+», а в русском «–»: там возникают фонологические ошибки.", "“+” means the contrast is phonemic, “–” means it is not. The dangerous rows are “+” in English and “–” in Russian: that is where phonological mistakes arise."));
    },

    /* ---------- 2.2 ---------- */
    distributionTypes: function () {
      function grid(rows) { return '<table class="fg-table fg-mini"><tbody>' + rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + L(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>"; }
      return '<div class="fg-three">' +
        box(t("Контрастная", "Contrastive"), grid([[t("позиция", "position"), I("[_ɪt]")], [I("[p]"), E("pit")], [I("[b]"), E("bit")]]) + note(t("Одна позиция, разный смысл. Это разные фонемы.", "Same position, different meaning. Different phonemes."))) +
        box(t("Дополнительная", "Complementary"), grid([[t("позиция", "position"), I("[pʰ]"), I("[p]")], [t("начало ударного слога", "start of a stressed syllable"), E("pin"), "—"], [t("после [s]", "after [s]"), "—", E("spin")]]) + note(t("Позиции не пересекаются. Это аллофоны одной фонемы.", "The positions never overlap. Allophones of one phoneme."))) +
        box(t("Свободное варьирование", "Free variation"), grid([[t("позиция", "position"), I("[_алоши]")], [I("[к]"), E("калоши")], [I("[г]"), E("галоши")]]) + note(t("Одна позиция, смысл тот же. Это свободные варианты.", "Same position, same meaning. Free variants."))) +
        "</div>";
    },

    trubetskoyRule: function () {
      return table([t("", ""), t("Смысл меняется", "Meaning changes"), t("Смысл не меняется", "Meaning does not change")], [
        ["<b>" + L(t("Звуки встречаются в одной позиции", "The sounds occur in the same position")) + "</b>", t("разные фонемы: " + E("pit – bit"), "different phonemes: " + E("pit – bit")), t("факультативные (свободные) варианты: " + E("калоши – галоши"), "optional (free) variants: " + E("калоши – галоши"))],
        ["<b>" + L(t("Звуки не встречаются в одной позиции", "The sounds never occur in the same position")) + "</b>", "—", t("если звуки фонетически близки — аллофоны одной фонемы: " + I("[pʰ]") + " и " + I("[p]") + "; если нет — косвенно-фонологическая оппозиция: нем. " + I("[h]") + " и " + I("[ŋ]"), "if the sounds are phonetically similar — allophones of one phoneme: " + I("[pʰ]") + " and " + I("[p]") + "; if not — an indirectly phonological opposition: German " + I("[h]") + " and " + I("[ŋ]"))]
      ]) + '<div class="fg-two">' +
        box(t("МФШ: [ы] — вариант фонемы /и/", "Moscow school: [ы] is a variant of /и/"), "<p>" + L(t("[ы] появляется только после твёрдых согласных, [и] — в остальных позициях: " + E("игра́ть") + " " + I("[игра́тʼ]") + ", но " + E("сыгра́ть") + " " + I("[сыгра́тʼ]") + ". Позиции дополнительны, значит, это одна фонема.", "[ы] occurs only after hard consonants, [и] elsewhere: " + E("играть") + " " + I("[игра́тʼ]") + " but " + E("сыграть") + " " + I("[сыгра́тʼ]") + ". The positions are complementary, so it is one phoneme.")) + "</p>") +
        box(t("ЛФШ: [ы] — самостоятельная фонема", "Leningrad school: [ы] is a separate phoneme"), "<p>" + L(t("Л. В. Щерба опирался на сознание носителей: [ы] можно произнести изолированно, есть глагол " + E("ы́кать") + ". Для носителя это отдельный звуковой тип.", "L. V. Shcherba relied on speakers’ awareness: [ы] can be pronounced in isolation, there is the verb " + E("ыкать") + ". For a speaker it is a separate sound type.")) + "</p>") +
        "</div>";
    },

    ruFreeVariants: function () {
      return table([t("Пример", "Example"), t("Варианты", "Variants"), t("Что стоит за варьированием", "What lies behind the variation")], [
        [E("калоши – галоши"), I("[к] ~ [г]"), t("два варианта слова в норме", "two variants of the word within the norm")],
        [E("шкаф – шкап"), I("[ф] ~ [п]"), t("второй вариант — устаревший и просторечный", "the second variant is old-fashioned and colloquial")],
        [t("безударные гласные между глухими", "unstressed vowels between voiceless consonants"), t("звонкий ~ оглушённый", "voiced ~ devoiced"), t("стиль: оглушение в беглой речи (Кодзасов)", "style: devoicing in rapid speech (Kodzasov)")],
        [E("Это[тт] ещё что такое!"), I("[т] ~ [тт]"), t("стиль: усиление согласного в экспрессивной речи", "style: a strengthened consonant in expressive speech")]
      ]) + '<ol class="steps">' + [
        t("Нет ли здесь диалектного различия?", "Is it a dialect difference?"),
        t("Не связан ли вариант с социальным престижем?", "Is the variant linked to social prestige?"),
        t("Не зависит ли он от стиля речи?", "Does it depend on the style of speech?"),
        t("Если причин не нашлось, варианты признаются свободными.", "If no reason is found, the variants are regarded as free.")
      ].map(function (x) { return "<li>" + L(x) + "</li>"; }).join("") + "</ol>" + note(t("Порядок проверки по Соколовой.", "The order of checking according to Sokolova."));
    },

    /* ---------- 2.3 ---------- */
    oppositionCount: function () {
      var d = '<span class="fg-diff">' + L(t("различие", "differs")) + "</span>", sm = '<span class="muted">' + L(t("совпадает", "same")) + "</span>";
      return table([t("Пара", "Pair"), t("Сила (работа голосовых связок)", "Force of articulation"), t("Место (активный орган)", "Place (active organ)"), t("Способ (тип преграды)", "Manner (type of obstruction)"), t("Тип", "Type")], [
        [E("pen – Ben") + "<br>" + I("/p/ – /b/"), d + "<br><small>" + L(t("сильный – слабый", "fortis – lenis")) + "</small>", sm, sm, "<b>" + L(t("одинарная", "single")) + "</b>"],
        [E("pen – den") + "<br>" + I("/p/ – /d/"), d, d + "<br><small>" + L(t("губной – язычный", "labial – lingual")) + "</small>", sm, "<b>" + L(t("двойная", "double")) + "</b>"],
        [E("pen – then") + "<br>" + I("/p/ – /ð/"), d, d + "<br><small>" + L(t("губной – зубной", "labial – dental")) + "</small>", d + "<br><small>" + L(t("смычный – щелевой", "occlusive – constrictive")) + "</small>", "<b>" + L(t("тройная", "triple")) + "</b>"]
      ]) + note(t("Придыхание " + I("[pʰ]") + " в " + E("pen") + " не учитывается: это неразличительный признак, поэтому " + E("pen – Ben") + " остаётся одинарной оппозицией.", "The aspiration " + I("[pʰ]") + " in " + E("pen") + " is not counted: it is a non-distinctive feature, so " + E("pen – Ben") + " remains a single opposition."));
    },

    trubetskoyCriteria: function () {
      return '<div class="fg-three">' +
        box(t("1. Противопоставляет смыслы", "1. It distinguishes meanings"), '<p class="fg-big">' + E("пыл") + " " + I("[пыл]") + "<br>" + E("был") + " " + I("[был]") + "</p>" + note(t("Глухость – звонкость различает слова. Признак различительный.", "Voicelessness vs voicing distinguishes words. The feature is distinctive."))) +
        box(t("2. Не выводится из контекста", "2. It is not predictable from context"), '<p class="fg-big">' + E("эти") + " " + I("[" + A("э") + "тʼи]") + "<br>" + E("это") + " " + I("[" + A("э") + "та]") + "</p>" + note(t("Перед мягким " + I("[тʼ]") + " гласный закрытее. Закрытость вызвана соседом, значит, она неразличительна.", "Before the soft " + I("[тʼ]") + " the vowel is closer. The closeness is caused by the neighbour, so it is not distinctive."))) +
        box(t("3. Не ограничен позицией", "3. It is not restricted to one position"), '<table class="fg-table fg-mini"><tbody><tr><td>' + L(t("начало", "initial")) + "</td><td>" + E("лук – люк") + "</td></tr><tr><td>" + L(t("конец", "final")) + "</td><td>" + E("пыл – пыль") + "</td></tr></tbody></table>" + note(t(I("[л] – [лʼ]") + " противопоставлены в разных позициях. Признак различительный.", I("[л] – [лʼ]") + " are contrasted in different positions. The feature is distinctive."))) +
        "</div>";
    },

    lengthQuality: function () {
      var bars = [["bead", I("[biːd]"), 100, t("долгий гласный перед слабым согласным", "a long vowel before a lenis consonant")], ["beat", I("[biːt]"), 62, t("долгий гласный сокращён перед сильным", "a long vowel clipped before a fortis consonant")], ["bid", I("[bɪd]"), 56, t("краткий гласный перед слабым", "a short vowel before a lenis consonant")], ["bit", I("[bɪt]"), 36, t("краткий гласный перед сильным", "a short vowel before a fortis consonant")]];
      var dur = '<div class="dur">' + bars.map(function (b) { return '<div class="dur-r"><span class="dur-w">' + E(b[0]) + " " + b[1] + '</span><span class="dur-bar" style="width:' + b[2] + '%"></span><small>' + L(b[3]) + "</small></div>"; }).join("") + "</div>";
      var quad = '<svg class="vq" viewBox="0 0 220 150" role="img" aria-label="vowel chart"><path class="vq-frame" d="M20 14 L200 14 L200 136 L80 136 Z"/><line class="vq-grid" x1="40" y1="55" x2="200" y2="55"/><line class="vq-grid" x1="60" y1="95" x2="200" y2="95"/>' +
        '<circle class="vq-dot" cx="30" cy="20" r="5"/><text class="vq-t" x="40" y="24">iː</text><circle class="vq-dot vq-2" cx="62" cy="38" r="5"/><text class="vq-t" x="72" y="42">ɪ</text>' +
        '<circle class="vq-dot" cx="160" cy="22" r="5"/><text class="vq-t" x="168" y="26">uː</text><circle class="vq-dot vq-2" cx="150" cy="42" r="5"/><text class="vq-t" x="158" y="46">ʊ</text>' +
        '<text class="vq-l" x="20" y="148">' + L(t("передний ряд", "front")) + '</text><text class="vq-l" x="150" y="148">' + L(t("задний ряд", "back")) + "</text></svg>";
      return '<div class="fg-two">' + box(t("Длительность зависит от соседа", "Length depends on the neighbour"), dur) + box(t("Качество различает фонемы", "Quality distinguishes the phonemes"), quad + note(t(I("[ɪ]") + " и " + I("[ʊ]") + " ниже и ближе к центру, чем " + I("[iː]") + " и " + I("[uː]") + ".", I("[ɪ]") + " and " + I("[ʊ]") + " are lower and more central than " + I("[iː]") + " and " + I("[uː]") + "."))) + "</div>" +
        note(t("Длина полос условна и показывает соотношение, а не точные миллисекунды. Гласный в " + E("bid") + " может быть почти таким же длинным, как в " + E("beat") + ": слова различает качество.", "Bar lengths are schematic: they show proportions, not exact milliseconds. The vowel in " + E("bid") + " may be almost as long as in " + E("beat") + ": it is quality that tells the words apart."));
    },

    /* ---------- 2.4 ---------- */
    morphDifficulties: function () {
      return '<div class="fg-three">' +
        box(t("Спорное членение", "Disputed segmentation"), '<p class="fg-big">' + E("по-езд") + " ?<br>" + E("поезд") + " ?</p>" + note(t("Видит ли носитель в слове приставку " + E("по-") + "? От ответа зависит фонемная запись.", "Does a speaker see the prefix " + E("по-") + " in the word? The phonemic transcription depends on the answer."))) +
        box(t("Граница морфем", "Morpheme boundary"), '<p class="fg-big">' + E("под-ъезд") + "</p>" + note(t("Сначала нужно найти границу приставки, и только потом решать, какие фонемы стоят на стыке.", "First one must find the prefix boundary, and only then decide which phonemes stand at the juncture."))) +
        box(t("Одна морфема или две?", "One morpheme or two?"), '<p class="fg-big">' + E("жена") + " – " + E("жених") + "</p>" + note(t("Родство корней не очевидно для носителя, поэтому неясно, можно ли сравнивать их звуки.", "The kinship of the roots is not obvious to speakers, so it is unclear whether their sounds can be compared."))) +
        "</div>" + note(t("Вывод Кодзасова и Кривновой: если фонемная запись зависит от морфологии, чередования удобнее отнести к морфонологии.", "Kodzasov and Krivnova’s conclusion: if the phonemic transcription depends on morphology, alternations are better assigned to morphonology."));
    },

    /* ---------- 2.5 ---------- */
    accentCost: function () {
      return table([t("Говорящий произносит", "The speaker says"), t("Что нарушено", "What is wrong"), t("Тип ошибки", "Type of mistake"), t("Последствие для слушателя", "Effect on the listener")], [
        [E("feel") + " " + I("[fiːl]"), t("светлый [l] вместо тёмного " + I("[ɫ]"), "a clear [l] instead of a dark " + I("[ɫ]")), t("фонетическая", "phonetic"), t("слово понятно, но слышен акцент", "the word is understood, but an accent is heard")],
        [E("tea") + " " + I("[tʲiː]"), t("смягчённый [t]", "a palatalized [t]"), t("фонетическая", "phonetic"), t("слово понятно, но восприятие требует больше усилий", "the word is understood, but with more effort")],
        [E("pin") + " " + I("[pɪn]"), t("нет придыхания", "no aspiration"), t("фонетическая: фонема " + I("/p/") + " сохранена, нарушен её аллофон", "phonetic: the phoneme " + I("/p/") + " is kept, its allophone is wrong"), t("придыхание служит подсказкой для различения " + I("/p/ – /b/") + "; без него слушатель может опознать " + E("bin"), "aspiration is a cue for telling " + I("/p/ – /b/") + " apart; without it the listener may identify " + E("bin"))]
      ]) + note(t("Тип ошибки определяется по тому, что сделал говорящий: в " + I("[pɪn]") + " он не заменил фонему, а исказил аллофон. Но для слушателя такая ошибка может обернуться фонологическим результатом — словом с другим значением. Поэтому Соколова советует не пренебрегать и фонетическими ошибками.", "The type of mistake is defined by what the speaker did: in " + I("[pɪn]") + " no phoneme was replaced, an allophone was distorted. Yet for the listener such a mistake may have a phonological result — a word with a different meaning. That is why Sokolova advises not to neglect phonetic mistakes either."));
    },

    ruTypicalErrors: function () {
      var F = "<b>" + L(t("фонологическая", "phonological")) + "</b>", P = L(t("фонетическая", "phonetic"));
      return table([t("Слово", "Word"), t("Норма", "Norm"), t("Ошибка", "Mistake"), t("Что слышит носитель", "What is heard"), t("Тип", "Type")], [
        [E("bed"), I("[bed]"), I("[bet]"), E("bet"), F],
        [E("thin"), I("[θɪn]"), I("[sɪn]"), E("sin"), F],
        [E("man"), I("[mæn]"), I("[men]"), E("men"), F],
        [E("sheep"), I("[ʃiːp]"), I("[ʃɪp]"), E("ship"), F],
        [E("pin"), I("[pʰɪn]"), I("[pɪn]"), t("акцент (см. предыдущую карточку)", "an accent (see the previous card)"), P],
        [E("feel"), I("[fiːɫ]"), I("[fiːl]"), t("акцент", "an accent"), P],
        [E("tea"), I("[tʰiː]"), I("[tʲiː]"), t("акцент", "an accent"), P]
      ]) + note(t("Фонологические ошибки меняют слово, фонетические создают акцент.", "Phonological mistakes change the word, phonetic ones create an accent."));
    },

    /* ---------- 3.1 ---------- */
    ruEnSyllable: function () {
      return table([t("Слово", "Word"), t("Английская норма", "English norm"), t("Русская привычка", "Russian habit"), t("Что получается", "Result")], [
        [E("city"), I("[ˈsɪt.i]"), I("[ˈsi.ti]"), t("гласный длиннее и «свободнее»", "the vowel is longer and “freer”")],
        [E("letter"), I("[ˈlet.ə]"), I("[ˈle.tə]"), t("нет тесного примыкания", "no close contact")],
        [E("family"), I("[ˈfæm.əl.i]"), I("[ˈfa.mi.li]"), t("все слоги открыты, гласные полные", "all syllables open, full vowels")],
        [E("garden"), I("[ˈɡɑːd.n̩]"), I("[ˈɡɑː.den]"), t("слоговой " + I("[n̩]") + " заменён гласным", "the syllabic " + I("[n̩]") + " is replaced by a vowel")],
        [E("little"), I("[ˈlɪt.l̩]"), I("[ˈlit]"), t("слоговой " + I("[l̩]") + " «проглочен»", "the syllabic " + I("[l̩]") + " is “swallowed”")]
      ]) + '<div class="fg-two">' + box(t("Русский", "Russian"), '<p class="fg-big">' + E("си-ла, лу-жа") + "<br>" + E("вопль, ритм") + "</p>" + note(t("Первый слог открыт; конечный сонант после согласного неслоговой: " + E("вопль") + " — один слог.", "The first syllable is open; a final sonorant after a consonant is non-syllabic: " + E("вопль") + " is one syllable."))) +
        box(t("Английский", "English"), '<p class="fg-big">' + E("cit|y, lett|er") + "<br>" + E("gar-den, lit-tle") + "</p>" + note(t("Краткий ударный гласный закрыт согласным; " + I("[n̩]") + " и " + I("[l̩]") + " образуют отдельный слог. Васильев советует слегка удлинять их.", "The short stressed vowel is closed by a consonant; " + I("[n̩]") + " and " + I("[l̩]") + " form a syllable of their own. Vassiliev advises lengthening them slightly."))) + "</div>";
    },

    /* ---------- 3.2 ---------- */
    pausesTypes: function () {
      var vol = '<div class="lvl3">' + [["piano", 34, t("пониженная", "lowered")], [t("норма", "normal"), 62, t("нормальная", "normal")], ["forte", 96, t("повышенная", "raised")]].map(function (v) { return '<div class="dur-r"><span class="dur-w">' + L(v[0]) + '</span><span class="dur-bar" style="width:' + v[1] + '%"></span><small>' + L(v[2]) + "</small></div>"; }).join("") + "</div>";
      return table([t("Пауза по функции", "Pause by function"), t("Пример в разметке", "Marked example"), t("Что она делает", "What it does")], [
        [t("синтаксическая", "syntactic"), '<span class="fg-tone">When I ˈcame ˏhome | I ˈhad ˎdinner. ||</span>', t("делит предложение на смысловые части", "divides the sentence into sense groups")],
        [t("эмфатическая", "emphatic"), '<span class="fg-tone">She is the ˈmost | ˋcharming girl I’ve ever seen. ||</span>', t("выделяет следующее слово", "highlights the next word")],
        [t("хезитации, заполненная", "hesitation, filled"), '<span class="fg-tone">ˈUm ¦ not ˈfar from ˋhere. ||</span>', t("даёт время подумать", "gives time to think")]
      ]) + '<div class="fg-two">' + box(t("Длительность пауз в разметке", "Pause length in marking"), '<p class="fg-tone fg-big">¦ &nbsp; ' + L(t("короткая", "short")) + "<br>| &nbsp; " + L(t("средняя", "medium")) + "<br>|| &nbsp; " + L(t("длинная", "long")) + "</p>") + box(t("Громкость", "Loudness"), vol) + "</div>" +
        note(t("Паузу можно воспринять и без остановки голоса — по скачку тона на границе групп.", "A pause can be perceived without a break in voicing — from a pitch jump at the group boundary."));
    },

    timbreViews: function () {
      return '<div class="fg-two">' +
        box(t("Васильев: тембр входит в интонацию", "Vassiliev: timbre is part of intonation"), "<p>" + L(t("Интонация — единство высоты тона, громкости, темпа и тембра. Аргумент: тембр явно передаёт эмоции и отношение говорящего.", "Intonation is a unity of pitch, loudness, tempo and timbre. The argument: timbre clearly conveys emotions and the speaker’s attitude.")) + "</p>") +
        box(t("Соколова: тембр не входит", "Sokolova: timbre is not included"), "<p>" + L(t("Интонация — высота тона, громкость и темп. Аргумент: тембр пока нельзя описать как систему противопоставлений.", "Intonation is pitch, loudness and tempo. The argument: timbre cannot yet be described as a system of oppositions.")) + "</p>") +
        "</div>" + table([t("Тип голоса", "Voice quality"), t("Значение в русском (Кодзасов)", "Meaning in Russian (Kodzasov)")], [
          [t("придыхательный", "breathy"), t("восхищение", "admiration")],
          [t("скрипучий", "creaky"), t("отрицательная оценка", "negative evaluation")]
        ]);
    },

    /* ---------- 3.3 ---------- */
    incompleteness: function () {
      var planned = [{ t: "You", y: .2, k: "u" }, { t: "need", y: .88, k: "s" }, { t: "eggs", y: .05, k: "r", y2: .42, n: true, b: true }, { t: "flour", y: .05, k: "r", y2: .42, n: true, b: true }, { t: "su", y: .05, k: "r", y2: .4, n: true }, { t: "gar", k: "u", b: true }, { t: "and", y: .2, k: "u" }, { t: "but", y: .9, k: "f", y2: .03, n: true }, { t: "ter", k: "u" }];
      var spont = [{ t: "We’ve", y: .2, k: "u" }, { t: "got", y: .2, k: "u" }, { t: "ap", y: .5, k: "ml", n: true }, { t: "ples", y: .5, k: "u", b: true }, { t: "pears", y: .5, k: "ml", n: true, b: true }, { t: "grapes", y: .5, k: "ml", n: true }];
      return '<div class="fg-two">' +
        box(t("Продуманный перечень", "A planned list"), tone("You ˈneed ˏeggs | ˏflour | ˏsugar | and ˋbutter. ||") + '<div class="fg-scroll">' + S(planned, { step: 34, end: "||", label: "planned list" }) + "</div>" + note(t("Низкий восходящий на каждом элементе, нисходящий на последнем. На " + E("sugar") + " подъём переходит на безударный слог.", "A Low Rise on each item, a fall on the last. On " + E("sugar") + " the rise moves to the unstressed syllable."))) +
        box(t("Спонтанный перечень", "A spontaneous list"), tone("We’ve got ˗apples | ˗pears | ˗grapes… |") + '<div class="fg-scroll">' + S(spont, { step: 38, end: "|", label: "spontaneous list" }) + "</div>" + note(t("Средний ровный: список строится по ходу речи. По Линдси, сейчас он обычно идёт после низкой предъядерной части.", "Mid-Level: the list is built as one speaks. According to Lindsey, it now usually follows a low prenuclear part."))) +
        "</div>";
    },

    uptalk: function () {
      var head = [{ t: "I", y: .3, k: "u" }, { t: "live", y: .9, k: "s" }, { t: "in", y: .62, k: "u" }];
      var st = head.concat([{ t: "Lon", y: .92, k: "f", y2: .04, n: true }, { t: "don", k: "u" }]);
      var up = head.concat([{ t: "Lon", y: .5, k: "r", y2: .96, n: true }, { t: "don", k: "u" }]);
      return '<div class="fg-two">' +
        box(t("Утверждение в RP", "A statement in RP"), tone("I ˈlive in ˋLondon. ||") + '<div class="fg-scroll">' + S(st, { step: 38, end: "||", label: "statement" }) + "</div>" + note(t("Высокий нисходящий: сообщение закончено.", "A High Fall: the message is complete."))) +
        box(t("Uptalk", "Uptalk"), tone("I ˈlive in ˊLondon. ||") + '<div class="fg-scroll">' + S(up, { step: 38, end: "||", label: "uptalk" }) + "</div>" + note(t("Высокий восходящий в утверждении: «вы следите?». Ядро ровное, подъём идёт по хвосту.", "A High Rise on a statement: “are you following?”. The nucleus is level, the rise runs through the tail."))) +
        "</div>";
    },

    ruTransfer: function () {
      var head = [{ t: "It", y: .3, k: "u" }, { t: "was", y: .3, k: "u" }, { t: "a", y: .3, k: "u" }, { t: "ve", y: .85, k: "s" }, { t: "ry", y: .8, k: "u" }, { t: "good", y: .72, k: "s" }];
      var ru = head.concat([{ t: "film", y: .45, k: "f", y2: .03, n: true }]), en = head.concat([{ t: "film", y: .92, k: "f", y2: .03, n: true }]);
      var qh = [{ t: "Are", y: 0, k: "u" }, { t: "you", y: 0, k: "u" }, { t: "co", y: .8, k: "s" }, { t: "ming", y: .8, k: "u" }, { t: "to", y: .8, k: "u" }];
      var q3 = qh.concat([{ t: "mor", y: .3, k: "r", y2: .95, n: true }, { t: "row", y: 0, k: "u" }]), qfr = qh.concat([{ t: "mor", y: .8, k: "fr", y2: .1, y3: .5, n: true }, { t: "row", k: "u" }]);
      return table([t("", ""), t("Перенос из русского", "Transfer from Russian"), t("Рекомендация Линдси", "Lindsey’s recommendation")], [
        ["<b>" + L(t("Утверждение", "Statement")) + "</b>", tone("It was a ˈvery ˈgood ˎfilm. ||") + S(ru, { step: 30, end: "||", label: "low fall" }), tone("It was a ˈvery ˈgood ˋfilm. ||") + S(en, { step: 30, end: "||", label: "high fall" })],
        ["<b>" + L(t("Общий вопрос", "Yes-no question")) + "</b>", '<p class="muted">' + L(t("как ИК-3: пик на ударном слоге, падение после", "like IC-3: a peak on the stressed syllable, a fall after it")) + "</p>" + S(q3, { step: 30, end: "||", raw: true, label: "IC-3 like" }), tone("Are you ˈcoming toˇmorrow? ||") + S(qfr, { step: 30, end: "||", label: "fall-rise" })]
      ]) + note(t("Слева — плавный спад и русский вопросительный пик, справа — то, что советует Линдси для современного британского произношения.", "Left: a gradual drop and the Russian question peak; right: what Lindsey recommends for modern British pronunciation."));
    },

    /* ---------- 3.4 ---------- */
    armstrongWard: function () {
      var syl = [{ t: "I", y: .1, k: "u" }, { t: "don’t", y: .92, k: "s" }, { t: "want", y: .78, k: "s" }, { t: "to", y: .74, k: "u" }, { t: "go", y: .62, k: "s" }, { t: "to", y: .58, k: "u" }, { t: "the", y: .55, k: "u" }, { t: "ci", y: .5, k: "f", y2: .03, n: true }, { t: "ne", k: "u" }, { t: "ma", k: "u" }];
      function mini(svg) { return '<svg class="aw-ico" viewBox="0 0 40 24">' + svg + "</svg>"; }
      return tone("I ˈdon’t ˈwant to ˈgo to the ˎcinema. ||") + '<div class="fg-scroll">' + S(syl, { step: 40, end: "||", label: "I don’t want to go to the cinema", groups: [{ from: 0, to: 0, label: t("предшкала", "pre-head") }, { from: 1, to: 6, label: t("шкала", "head") }, { from: 7, to: 7, label: t("ядро", "nucleus"), n: true }, { from: 8, to: 9, label: t("хвост", "tail") }] }) + "</div>" +
        table([t("Элемент", "Element"), t("Что обозначает", "What it shows")], [
          [mini('<line class="st-line" x1="2" y1="4" x2="38" y2="4"/><line class="st-line" x1="2" y1="20" x2="38" y2="20"/>'), t("верхняя и нижняя границы диапазона голоса; в разметке курса добавлен пунктир — средний уровень", "the top and bottom of the voice range; the course marking adds a dashed mid line")],
          [mini('<line class="st-mark" x1="10" y1="12" x2="30" y2="12"/>'), t("ударный слог с ровным тоном", "a stressed syllable with level pitch")],
          [mini('<path class="st-nuc" d="M10 5 C20 5 24 8 24 20"/>'), t("ударный слог с движением тона (ядро)", "a stressed syllable with moving pitch (the nucleus)")],
          [mini('<circle class="st-dot" cx="20" cy="12" r="4"/>'), t("безударный слог", "an unstressed syllable")],
          [mini('<circle class="st-half" cx="20" cy="12" r="4"/>'), t("полуударный слог (в разметке курса)", "a half-stressed syllable (in the course marking)")]
        ]) + note(t("Высота каждого знака показывает высоту тона слога. Соколова и соавторы добавили знаки перед первым ударным слогом для типа шкалы — они собраны в карточке «Шкалы и предшкалы в разметке курса».", "The height of each mark shows the pitch of the syllable. Sokolova and co-authors added marks before the first stressed syllable for the type of head — see the card “Heads and pre-heads in the course marking”."));
    },

    headTypes: function () {
      var K = function (y) { return { k: "u", y: y, keep: true }; };
      var rows = [
        ['<span class="tn">ˈ</span>', t("Нисходящая ступенчатая шкала", "Descending Stepping Head"), "I " + hm("desc") + "don’t ˈwant to ˈgo to the ˎcinema.", cinema([0, s_(.92), s_(.78), 0, s_(.64), 0, 0], .5)],
        [hm("slide"), t("Нисходящая скользящая шкала", "Sliding Head"), "I " + hm("slide") + "don’t " + hm("slide") + "want to " + hm("slide") + "go to the ˎcinema.", cinema([0, { k: "f", y: .98, y2: .84 }, { k: "f", y: .86, y2: .72 }, 0, { k: "f", y: .74, y2: .6 }, 0, 0], .5)],
        [hm("scand", "lo"), t("Нисходящая скандентная шкала", "Scandent Head"), "I " + hm("scand", "lo") + "don’t " + hm("scand", "lo") + "want to " + hm("scand", "lo") + "go to the ˎcinema.", cinema([0, s_(.88), s_(.72), K(.82), s_(.58), K(.66), K(.74)], .5)],
        ["", t("Восходящая ступенчатая шкала", "Ascending (Rising) Stepping Head"), "I don’t ˈwant to ˈgo to the ˋcinema.", cinema([0, s_(.16), s_(.32), 0, s_(.5), 0, 0], 1)],
        [hm("level", "hi"), t("Высокая ровная шкала", "High Level Head"), "I " + hm("level", "hi") + "don’t ˈwant to ˈgo to the ˎcinema.", cinema([0, s_(.94), s_(.94), 0, s_(.94), 0, 0], .5)],
        [hm("level", "mid"), t("Средняя ровная шкала", "Medium Level Head"), "I " + hm("level", "mid") + "don’t ˈwant to ˈgo to the ˎcinema.", cinema([0, s_(.5), s_(.5), 0, s_(.5), 0, 0], .5)],
        [hm("level", "lo"), t("Низкая ровная шкала", "Low Level Head"), "I " + hm("level", "lo") + "don’t ˈwant to ˈgo to the ˎcinema.", cinema([0, s_(0), s_(0), 0, s_(0), 0, 0], .5)]
      ];
      var acc = [{ t: "You’d", k: "u" }, { t: "get", y: .92, k: "s" }, { t: "to", k: "u" }, { t: "know", y: .8, k: "s" }, { t: "quite", k: "u" }, { t: "a", k: "u" }, { t: "lot", y: .92, k: "s", up: true }, { t: "of", k: "u" }, { t: "in", y: .8, k: "s" }, { t: "ter", k: "u" }, { t: "est", k: "u" }, { t: "ing", k: "u" }, { t: "peo", y: .5, k: "f", y2: 0, n: true }, { t: "ple", k: "u" }, { t: "there", k: "u" }];
      var W = function (o) { return Object.assign({ t: "want", k: "f", y2: 0, n: true }, o); };
      var pre = [
        ['<span class="ms-nomark">No marking</span>', t("Низкая предшкала (восходящая)", "Low Pre-head (ascending)"), "I don’t ˎwant it.", [K(0), K(.12), W({ y: .5 }), { t: "it", k: "u" }]],
        ['<span class="ms-nomark">No marking</span>', t("Низкая предшкала (ровная)", "Low Pre-head (level)"), "I don’t ˎwant it.", [{ t: "I", k: "u" }, { t: "don’t", k: "u" }, W({ y: .5 }), { t: "it", k: "u" }]],
        ['<span class="tm tm-hi">‾</span>', t("Высокая предшкала", "High Pre-head"), '<span class="tm tm-hi">‾</span>I don’t ˋwant it.', [K(.94), K(.94), W({ y: .94 }), { t: "it", k: "u" }]],
        ['<span class="tn">ˈ</span>', t("Ударный слог", "A Stressed Syllable"), "I " + hm("desc") + "don’t ˈwant to ˈgo to the ˎcinema.", cinema([0, s_(.92), s_(.78), 0, s_(.64), 0, 0], .5)],
        ['<span class="tn">ˈ / ˌ</span>', t("Полуударный слог", "A Half-stressed Syllable"), "ˈwhat we can ˎlearn ˌfrom it", [{ t: "what", y: .94, k: "s" }, { t: "we", k: "u" }, { t: "can", k: "u" }, W({ t: "learn", y: .5 }), { t: "from", k: "h", y: 0 }, { t: "it", k: "u" }]]
      ];
      function tbl(h, rs, extra) {
        return '<div class="fg-scroll"><table class="fg-table ms-table ms-file ht-table"><thead><tr><th>' + L(h) + "</th><th>" + L(t("Фраза", "Phrase")) + "</th><th>" + L(t("Тонограмма", "Tonogram")) + "</th></tr></thead><tbody>" +
          rs.map(function (r, i) { return '<tr class="' + (i % 2 ? "" : "ms-odd") + '"><td><span class="ms-mark">' + r[0] + "</span> – " + r[1].en + (I18N.lang === "ru" ? '<br><span class="muted">' + r[1].ru + "</span>" : "") + '</td><td class="fg-tone ht-ph">' + r[2] + "</td><td>" + S(r[3], { step: 24, noText: true, label: L(r[1]) }) + "</td></tr>"; }).join("") + (extra || "") + "</tbody></table></div>";
      }
      var accRow = '<tr class="ms-odd"><td><span class="ms-mark">' + hm("up", "mid") + "</span> – Accidental Rise" + (I18N.lang === "ru" ? '<br><span class="muted">случайное повышение</span>' : "") + '</td><td class="fg-tone ht-ph">You’d ' + hm("desc") + "get to ˈknow quite a " + hm("up", "mid") + "lot of ˈinteresting ˎpeople there.</td><td>" + S(acc, { step: 18, noText: true, label: "Accidental Rise" }) + "</td></tr>";
      return tbl(t("Шкала", "Scale"), rows, accRow) + tbl(t("Предшкала", "Pre-head"), pre) +
        note(t("Знак шкалы ставится перед первым ударным слогом и показывает, откуда начинается шкала; остальные ударные слоги отмечаются знаком ˈ. Безударные слоги предшкалы стоят внизу, чуть выше нижней линии. Ядро после нисходящей шкалы не начинается выше последнего ударного слога шкалы.", "The head mark is placed before the first stressed syllable and shows where the head starts; the other stressed syllables are marked ˈ. Unstressed pre-head syllables are low, just above the bottom line. After a descending head the nucleus does not start higher than the last stressed syllable of the head.")) +
        '<p class="fg-note"><a href="assets/docs/marking-system.pdf" target="_blank" rel="noopener">' + L(t("Открыть исходный файл разметки (PDF)", "Open the original marking file (PDF)")) + "</a></p>";
    },

    britishToBI: function () {
      var rows = [
        ["ˋ", t("Высокий нисходящий", "High Fall"), { k: "f", y: .95, y2: .03 }, "H* L-L%", t("нейтральное утверждение", "a neutral statement")],
        ["ˇ", t("Нисходяще-восходящий", "Fall-Rise"), { k: "fr", y: .8, y2: .08, y3: .5 }, "H* L-H%", t("незавершённость, оговорка", "incompleteness, reservation")],
        ["ˊ", t("Высокий восходящий", "High Rise"), { k: "r", y: .55, y2: .98 }, "H* H-H%", t("переспрос, uptalk", "an echo question, uptalk")],
        ["ˏ", t("Низкий восходящий", "Low Rise"), { k: "r", y: .03, y2: .45 }, "L* L-H%", t("незавершённость, перечень", "incompleteness, a list")],
        ["", t("американский общий вопрос", "an American yes-no question"), { k: "r", y: .1, y2: .98 }, "L* H-H%", t("общий вопрос", "a yes-no question")]
      ];
      return '<div class="fg-scroll"><table class="fg-table ms-table"><thead><tr><th>' + L(t("Британский тон", "British tone")) + "</th><th>" + L(t("Тонограмма", "Tonogram")) + "</th><th>ToBI</th><th>" + L(t("Типичная функция", "Typical function")) + "</th></tr></thead><tbody>" +
        rows.map(function (r) { return '<tr><td><span class="tn ms-mark">' + r[0] + "</span> " + L(r[1]) + "</td><td>" + S([Object.assign({ t: "", n: true }, r[2])], { step: 24, noText: true, label: L(r[1]) }) + '</td><td class="tobi-str">' + r[3] + "</td><td>" + L(r[4]) + "</td></tr>"; }).join("") +
        "</tbody></table></div>" + '<div class="fg-two">' + box(t("Британская система", "The British system"), "<p>" + L(t("Тон — целостная фигура на ядре. Удобна для обучения и для связи с отношением говорящего.", "A tone is a whole shape on the nucleus. Convenient for teaching and for linking with the speaker’s attitude.")) + "</p>") + box("ToBI", "<p>" + L(t("Контур раскладывается на цели H и L. Удобна для исследований, корпусов и речевых технологий.", "The contour is broken into H and L targets. Convenient for research, corpora and speech technology.")) + "</p>") + "</div>" + note(t("Соответствия приблизительные, в деталях исследователи расходятся.", "The correspondences are approximate; researchers disagree on details."));
    },

    levelsVsConfig: function () {
      var lv = '<svg class="lv" viewBox="0 0 240 130" role="img" aria-label="levels">' + [4, 3, 2, 1].map(function (n, i) { var y = 18 + i * 30; return '<line class="st-mid" x1="26" y1="' + y + '" x2="232" y2="' + y + '"/><text class="lv-n" x="8" y="' + (y + 5) + '">' + n + "</text>"; }).join("") +
        '<path class="lv-path" d="M40 78 L120 78 L160 48 L210 108"/>' + [["I’m", 50], ["going", 95], ["home", 175]].map(function (w) { return '<text class="lv-w" x="' + w[1] + '" y="126">' + w[0] + "</text>"; }).join("") + "</svg>";
      var cf = '<svg class="lv" viewBox="0 0 240 130" role="img" aria-label="configuration"><text class="cf-w" x="20" y="78">I’m</text><text class="cf-w" x="70" y="74">go</text><text class="cf-w" x="102" y="70">ing</text><text class="cf-w cf-n" x="146" y="34">ho</text><text class="cf-w cf-n" x="182" y="66">o</text><text class="cf-w cf-n" x="204" y="104">me</text></svg>';
      return '<div class="fg-two">' +
        box(t("Уровни: Трейджер и Смит", "Levels: Trager and Smith"), lv + '<p class="fg-tone tobi-str">²I’m going ³home¹</p>' + note(t("Четыре уровня, 1 — самый низкий. У Пайка нумерация обратная: 1 — самый высокий.", "Four levels, 1 is the lowest. Pike numbers them the other way round: 1 is the highest."))) +
        box(t("Фигуры: Болинджер", "Configurations: Bolinger"), cf + note(t("Слоги пишутся на разной высоте: слушатель воспринимает целую мелодическую фигуру, а не отдельные уровни.", "Syllables are written at different heights: the listener perceives a whole melodic shape, not separate levels."))) +
        "</div>" + note(t("В ToBI спор отражён так: H и L — не абсолютные уровни, а относительные цели в диапазоне говорящего.", "ToBI reflects the debate: H and L are not absolute levels but relative targets within the speaker’s range."));
    },

    /* ---------- 3.5 ---------- */
    ikLimits: function () {
      var iv = '<div class="dur">' + [[t("нейтральный общий вопрос", "a neutral yes-no question"), 50, t("около полуоктавы (6–7 полутонов)", "about half an octave (6–7 semitones)")], [t("вопрос с удивлением", "a question with surprise"), 100, t("около октавы", "about an octave")]].map(function (b) { return '<div class="dur-r"><span class="dur-w">' + L(b[0]) + '</span><span class="dur-bar" style="width:' + b[1] + '%"></span><small>' + L(b[2]) + "</small></div>"; }).join("") + "</div>";
      var C = Figures._contour;
      return '<div class="fg-two">' +
        box(t("Восходяще-нисходящий тон внутри слога", "A rise-fall within a syllable"), '<p class="fg-big">' + E("Прише" + A("е") + "л!") + "</p>" + C([[0, .3], [.4, .35], [.62, .95], [1, .1]], [1, 2, 3], { w: 200, h: 70, label: "rise-fall" }) + note(t("Отрицание неверного предположения. В семи ИК такой единицы нет.", "Denying a wrong assumption. There is no such unit among the seven ICs."))) +
        box(t("Интервал подъёма различает значения", "The size of the rise distinguishes meanings"), iv + note(t("Одна и та же ИК-3, но разный интервал — разный смысл.", "The same IC-3 but a different interval — a different meaning."))) +
        "</div>" + note(t("Кодзасов: акценты различаются также таймированием, уровнем и скоростью движения тона.", "Kodzasov: accents also differ in timing, level and speed of pitch movement."));
    },

    integralMeans: function () {
      var lv = '<svg class="lv" viewBox="0 0 320 90" role="img" aria-label="lowered register"><line class="st-line" x1="6" y1="12" x2="314" y2="12"/><line class="st-mid" x1="6" y1="45" x2="314" y2="45"/><line class="st-line" x1="6" y1="78" x2="314" y2="78"/>' +
        '<rect class="reg-band" x="10" y="20" width="90" height="30" rx="6"/><rect class="reg-band reg-low" x="108" y="46" width="110" height="26" rx="6"/><rect class="reg-band" x="226" y="20" width="88" height="30" rx="6"/>' +
        '<text class="lv-w" x="55" y="40">' + L(t("Тебя Иван Петрович", "Ivan Petrovich")) + '</text><text class="lv-w" x="163" y="64">' + L(t("кстати…", "by the way…")) + '</text><text class="lv-w" x="270" y="40">' + L(t("просил позвонить", "asked you to call")) + "</text></svg>";
      return box(t("Пониженный уровень выделяет вставку", "A lowered register marks a parenthesis"), lv + "<p>" + E("Тебя Иван Петрович — кстати, у него вчера родилась внучка — просил позвонить") + "</p>") +
        table([t("Тип голоса", "Voice quality"), t("Значение", "Meaning"), t("Где встречается", "Where it occurs")], [
          [t("придыхательный", "breathy"), t("восхищение", "admiration"), t("телереклама", "TV advertising")],
          [t("скрипучий", "creaky"), t("отрицательная оценка", "negative evaluation"), t("недовольство, критика", "displeasure, criticism")],
          [t("расслабленный", "lax"), t("ласковое обращение", "tender address"), t("речь, обращённая к ребёнку", "speech to a child")],
          [t("напряжённый", "tense"), t("приказ, запрет", "an order, a prohibition"), t("команды", "commands")]
        ]) + note(t("Интегральные средства охватывают всё высказывание или его часть, а не один ударный слог.", "Integral means cover the whole utterance or part of it, not a single stressed syllable."));
    },

    syntaxIntonation: function () {
      var q = [
        [E("Где ты был?"), t("вопросительное слово", "a question word"), 25],
        [E("Был ли ты дома?"), t("частица «ли»", "the particle «ли»"), 50],
        [E("Был ты дома?"), t("изменённый порядок слов", "changed word order"), 75],
        [E("Ты " + "б" + A("ы") + "л дома?"), t("только интонация (ИК-3)", "intonation only (IC-3)"), 100]
      ];
      return box(t("Принцип замены Пешковского: ряд М. Петер", "Peshkovsky’s substitution principle: M. Peter’s scale"), '<div class="dur">' + q.map(function (r) { return '<div class="dur-r"><span class="dur-w">' + r[0] + '</span><span class="dur-bar" style="width:' + r[2] + '%"></span><small>' + L(r[1]) + "</small></div>"; }).join("") + "</div>" + note(t("Чем меньше грамматических средств вопроса, тем больше нагрузка на интонацию.", "The fewer grammatical means of asking, the heavier the load on intonation."))) +
        box(t("Обязательное членение", "Obligatory division"), tone("Статья по эст" + A("е") + "тике | в п" + A("а") + "пке, | а по ф" + A("и") + "зике — в стол" + A("е") + ". ||") + note(t("Без паузы после «по эстетике» первая часть прозвучит как вопрос.", "Without a pause after «по эстетике» the first part would sound like a question.")));
    }
  });
})();
