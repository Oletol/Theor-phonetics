/* Структура курса: семинары, литература, глоссарий.
   Чтобы добавить семинар: создать assets/js/course-sN.js по образцу course-s2.js,
   подключить его в index.html и заменить заглушку ниже на window.COURSE_SN. */
(function () {
  function placeholder(n, title) { return { n: n, title: title, modules: [] }; }

  var seminars = [
    placeholder(1, t("Тема семинара будет добавлена", "The seminar topic will be added")),
    window.COURSE_S2,
    window.COURSE_S3,
    placeholder(4, t("Тема семинара будет добавлена", "The seminar topic will be added")),
    placeholder(5, t("Тема семинара будет добавлена", "The seminar topic will be added")),
    placeholder(6, t("Тема семинара будет добавлена", "The seminar topic will be added")),
    placeholder(7, t("Тема семинара будет добавлена", "The seminar topic will be added"))
  ];
  seminars.forEach(function (s) { (s.modules || []).forEach(function (m) { m.seminar = s.n; }); });

  var R = {
    sokolova: { group: "books", type: "book", lang: "EN", author: "М. А. Соколова, И. С. Тихонова, Р. М. Тихонова, Е. Л. Фрейдина", site: "Дубна: Феникс+, 2010", title: t("Теоретическая фонетика английского языка", "Theoretical Phonetics of English") },
    vassiliev: { group: "books", type: "book", lang: "EN", author: "В. А. Васильев, А. Р. Катанская и др.", site: "2017", title: t("Фонетика английского языка. Практический курс", "English Phonetics. A Practical Course") },
    kodzasov: { group: "books", type: "book", lang: "RU", author: "С. В. Кодзасов, О. Ф. Кривнова", site: "М., 2001", title: t("Общая фонетика", "General Phonetics") },
    lindsey: { group: "books", type: "online", lang: "EN", author: "G. Lindsey", site: "Palgrave Macmillan, 2019", url: "https://doi.org/10.1007/978-3-030-04357-5", title: t("English After RP: Standard British Pronunciation Today", "English After RP: Standard British Pronunciation Today") },
    bryzgunova: { group: "books", type: "book", lang: "RU", author: "Е. А. Брызгунова", site: "М., 1963", title: t("Практическая фонетика и интонация русского языка", "Practical Phonetics and Intonation of Russian") },
    ladefoged: { group: "books", type: "book", lang: "EN", author: "P. Ladefoged, K. Johnson", site: "Cengage, 7th ed., 2015", title: t("A Course in Phonetics", "A Course in Phonetics") },
    evstifeeva: { group: "books", type: "book", lang: "RU", author: "М. В. Евстифеева", site: "М.: Флинта, Наука, 2012", title: t("Теоретическая фонетика английского языка. Лекции, семинары, упражнения", "Theoretical Phonetics of English. Lectures, seminars, exercises") },
    trubetskoy: { group: "research", type: "book", lang: "DE / RU", author: "Н. С. Трубецкой", site: "Prague, 1939; М., 1960", title: t("Основы фонологии (Grundzüge der Phonologie)", "Principles of Phonology (Grundzüge der Phonologie)") },
    harris: { group: "research", type: "book", lang: "EN", author: "Z. Harris", site: "University of Chicago Press, 1951", title: t("Methods in Structural Linguistics", "Methods in Structural Linguistics") },
    werker: { group: "research", type: "article", lang: "EN", author: "J. Werker, R. Tees", site: "Infant Behavior and Development 7, 1984", title: t("Cross-language speech perception: evidence for perceptual reorganization during the first year of life", "Cross-language speech perception: evidence for perceptual reorganization during the first year of life") },
    munro: { group: "research", type: "article", lang: "EN", author: "M. Munro, T. Derwing", site: "Language Learning 45, 1995", title: t("Foreign accent, comprehensibility, and intelligibility in the speech of second language learners", "Foreign accent, comprehensibility, and intelligibility in the speech of second language learners") },
    jenkins: { group: "research", type: "book", lang: "EN", author: "J. Jenkins", site: "Oxford University Press, 2000", title: t("The Phonology of English as an International Language", "The Phonology of English as an International Language") },
    lehiste: { group: "research", type: "book", lang: "EN", author: "I. Lehiste", site: "Phonetica, Suppl. 5, 1960", title: t("An Acoustic-Phonetic Study of Internal Open Juncture", "An Acoustic-Phonetic Study of Internal Open Juncture") },
    mampe: { group: "research", type: "article", lang: "EN", author: "B. Mampe, A. Friederici, A. Christophe, K. Wermke", site: "Current Biology 19, 2009", title: t("Newborns’ cry melody is shaped by their native language", "Newborns’ cry melody is shaped by their native language") },
    guy: { group: "research", type: "article", lang: "EN", author: "G. Guy, B. Horvath, J. Vonwiller, E. Daisley, I. Rogers", site: "Language in Society 15, 1986", title: t("An intonational change in progress in Australian English", "An intonational change in progress in Australian English") },
    pierrehumbert: { group: "research", type: "book", lang: "EN", author: "J. Pierrehumbert", site: "MIT, PhD dissertation, 1980", title: t("The Phonology and Phonetics of English Intonation", "The Phonology and Phonetics of English Intonation") },
    silverman: { group: "research", type: "article", lang: "EN", author: "K. Silverman et al.", site: "Proceedings of ICSLP, 1992", title: t("ToBI: a standard for labeling English prosody", "ToBI: a standard for labeling English prosody") },
    praat: { group: "tools", type: "online", lang: "EN", author: "P. Boersma, D. Weenink", site: "University of Amsterdam", url: "https://www.fon.hum.uva.nl/praat/", title: t("Praat: doing phonetics by computer", "Praat: doing phonetics by computer") }
  };

  var glossary = {
    2: [
      { term: "Functional linguistics", ruTerm: "функциональная лингвистика", en: "An approach to the language study which is characterized by systematically taking into account the speaker’s and the listener’s side, and the communicative needs of the speaker and of a given language community. It studies the language as a means of communication.", ru: "Подход к изучению языка, который систематически учитывает позиции говорящего и слушающего и коммуникативные потребности говорящего и языкового сообщества. Изучает язык как средство общения." },
      { term: "Descriptive linguistics", ruTerm: "дескриптивная лингвистика", en: "The scientific endeavor to systematically describe the languages of the world in their diversity, based on the empirical observation of regular patterns in natural speech.", ru: "Научное направление, систематически описывающее языки мира во всём их разнообразии на основе эмпирического наблюдения закономерностей естественной речи." },
      { term: "Generative grammar", ruTerm: "генеративная грамматика", en: "The structure and interpretation of sentences that native speakers of a language accept as belonging to their language. It assumes that all humans have an innate language capacity.", ru: "Описание структуры и интерпретации предложений, которые носители признают принадлежащими своему языку. Исходит из того, что у всех людей есть врождённая языковая способность." },
      { term: "Distinctive phonetic features", ruTerm: "различительные фонетические признаки", en: "The most basic articulatory feature that distinguishes one sound from another within a language: e.g. voiced – voiceless English consonants.", ru: "Базовые артикуляционные признаки, которые отличают один звук от другого в пределах языка, например звонкость и глухость английских согласных." },
      { term: "Non-distinctive phonetic features", ruTerm: "неразличительные фонетические признаки", en: "The articulatory features which appear in the phonetic context and do not change the meaning of a unit: e.g. aspiration – non-aspiration in the English consonants.", ru: "Артикуляционные признаки, которые возникают в фонетическом контексте и не меняют значения единицы, например придыхание и его отсутствие у английских согласных." },
      { term: "Oppositions (by Trubetskoy)", ruTerm: "оппозиции (по Трубецкому)", en: "Opposed entities where the elements have some different / distinctive features (e.g. voiced – voiceless); non-distinctive features can also form oppositions (e.g. /p/ can be aspirated and it can be unaspirated).", ru: "Противопоставленные единицы, элементы которых различаются некоторыми, в том числе различительными, признаками (звонкий – глухой); оппозиции могут образовывать и неразличительные признаки (аспирированный и неаспирированный /p/)." },
      { term: "Constitutive function of a phoneme", ruTerm: "конститутивная функция фонемы", en: "The phoneme is realized in speech in the form of its variants or allophones, which do not make meaningful distinctions and serve to constitute the material form of morphemes.", ru: "Фонема реализуется в речи в виде вариантов, или аллофонов, которые не различают значения и служат для построения материальной формы морфем." },
      { term: "Significative function of a phoneme", ruTerm: "сигнификативная функция фонемы", en: "The phoneme serves to distinguish and understand the meaning, because the use of the right allophone in the certain phonetic context helps the listener to understand the message and facilitates normal recognition.", ru: "Фонема служит для различения и понимания значения: правильный аллофон в данном контексте помогает слушателю понять сообщение и облегчает распознавание." },
      { term: "Morphophoneme", ruTerm: "морфонема", en: "The set of phonemes or sequences of phonemes that constitute the various allomorphs of a morpheme, e.g. друг, друзья, дружить.", ru: "Совокупность фонем или их последовательностей, образующих разные алломорфы морфемы: друг, друзья, дружить." }
    ],
    3: [
      { term: "Intonation", ruTerm: "интонация", en: "The pattern of pitch changes that occur during a phrase, which may be a complete sentence.", ru: "Рисунок изменений высоты тона в пределах фразы, которая может быть целым предложением." },
      { term: "Utterance", ruTerm: "высказывание", en: "A continuous stretch of speech, by one person, before or after which there is a pause in phonation.", ru: "Непрерывный отрезок речи одного говорящего, до и после которого есть пауза в фонации." },
      { term: "Integral intonational characteristics", ruTerm: "интегральные интонационные характеристики", en: "Denote complex semantic signs in the utterance: e.g. tone level, duration and voice quality.", ru: "Сложные смысловые признаки высказывания: уровень тона, длительность, качество голоса." },
      { term: "Sentence stress / accent / tone", ruTerm: "фразовое ударение, акцент, тон", en: "That property of a syllable which makes it stand out in an utterance relative to its neighbouring syllables; a variation in the pitch of the voice while speaking.", ru: "Свойство слога, выделяющее его в высказывании среди соседних; изменение высоты голоса в речи." },
      { term: "Speech melody", ruTerm: "мелодика речи", en: "A pitch fluctuation in different parts of the utterance: pre-head (high or low); head and the terminal tone which consists of a nuclear tone and a tail.", ru: "Колебания высоты тона в разных частях высказывания: предшкала (высокая или низкая), шкала и терминальный тон, состоящий из ядерного тона и хвоста." },
      { term: "Pause", ruTerm: "пауза", en: "A break in speaking or phonation.", ru: "Перерыв в речи или фонации." },
      { term: "Rhythm", ruTerm: "ритм", en: "Regularity or periodicity in the occurrence of a particular phenomenon in an utterance; in some languages the recurring phenomena are stresses, in others – syllables.", ru: "Регулярность, периодичность появления какого-либо явления в высказывании; в одних языках повторяются ударения, в других — слоги." },
      { term: "Phonetic word", ruTerm: "фонетическое слово", en: "A word usually with unstressed prepositions or particles before or after (i.e. clitics).", ru: "Слово вместе с безударными предлогами или частицами до или после него (клитиками)." },
      { term: "Intonation contours", ruTerm: "интонационные контуры", en: "A distinctive pattern of pitches, tones, or stresses in an utterance; they are directly related to meaning.", ru: "Различительный рисунок высоты, тонов или ударений в высказывании, непосредственно связанный со значением." },
      { term: "Functions of intonation", ruTerm: "функции интонации", en: "Communicative function is expressing ideas and emotions in communication. Distinctive function is distinguishing the syntactic type of sentence, the attitudinal meaning and the actual meaning of the utterance. Organizing function is to structure the text. Pragmatic function is in the use of intonation with a specific purpose. Rhetorical function is to persuade.", ru: "Коммуникативная — выражение мыслей и эмоций. Дистинктивная — различение синтаксического типа предложения, значения отношения и актуального смысла высказывания. Организующая — структурирование текста. Прагматическая — использование интонации с определённой целью. Риторическая — убеждение." }
    ]
  };

  var flat = [];
  seminars.forEach(function (s) { (s.modules || []).forEach(function (m) { flat.push(m); }); });

  window.COURSE = {
    seminars: seminars,
    R: R,
    glossary: glossary,
    modules: function () { return flat; },
    byId: function (id) { for (var i = 0; i < flat.length; i++) if (flat[i].id === id) return flat[i]; return null; },
    next: function (id) { for (var i = 0; i < flat.length; i++) if (flat[i].id === id) return flat[i + 1] || null; return null; }
  };
})();
