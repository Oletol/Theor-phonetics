/* Строки интерфейса RU/EN и помощники перевода. */
(function () {
  function t(ru, en) { return { ru: ru, en: en == null ? ru : en }; }
  var KEY = "cherdak-phonetics-lab:v1";
  var lang = "ru";
  try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); if (s.lang === "en") lang = "en"; } catch (e) {}

  var UI = {
    skip: t("К содержанию", "Skip to content"),
    nav_course: t("Курс", "Course"),
    nav_trainer: t("Тренажёр", "Trainer"),
    nav_glossary: t("Глоссарий", "Glossary"),
    nav_reading: t("Литература", "Reading"),
    nav_progress: t("Прогресс", "Progress"),
    theme: t("Сменить тему", "Toggle theme"),
    course_title: t("Теоретическая фонетика английского языка", "Theoretical Phonetics of English"),
    course_lead: t("Теория по вопросам семинаров, интерактивные задания и тесты. Материалы опираются на учебники М. А. Соколовой, В. А. Васильева, С. В. Кодзасова и О. Ф. Кривновой, Дж. Линдси, Дж. Уэллса и Е. А. Брызгуновой.",
      "Theory for each seminar question, interactive tasks and tests. The materials draw on the textbooks by M. A. Sokolova, V. A. Vassiliev, S. V. Kodzasov and O. F. Krivnova, G. Lindsey, J. Wells and E. A. Bryzgunova."),
    progress_of: t("тем пройдено", "topics done"),
    seminar: t("Семинар", "Seminar"),
    topic: t("Тема", "Topic"),
    soon: t("Материалы появятся позже", "Materials coming later"),
    soon_short: t("Скоро", "Coming soon"),
    min: t("мин", "min"),
    status_new: t("Не начато", "Not started"),
    status_progress: t("В процессе", "In progress"),
    status_done: t("Пройдено", "Done"),
    extras: t("Практика и справка", "Practice and reference"),
    back_map: t("Назад к карте курса", "Back to course map"),
    prev: t("Назад", "Back"),
    next: t("Далее", "Next"),
    step: t("Шаг", "Step"),
    kind_try: t("Практика", "Practice"),
    kind_idea: t("Теория", "Theory"),
    kind_web: t("Русский и английский", "Russian and English"),
    kind_task: t("Задание", "Task"),
    kind_check: t("Проверка", "Check"),
    kind_sum: t("Итог темы", "Topic summary"),
    sum_title: t("Что важно запомнить", "Key points"),
    sum_read: t("Что почитать", "Further reading"),
    mark_done: t("Отметить тему пройденной", "Mark topic as done"),
    marked: t("Тема пройдена", "Topic done"),
    next_topic: t("Следующая тема", "Next topic"),
    to_map: t("К карте курса", "To course map"),
    check: t("Проверить", "Check"),
    reset: t("Сбросить", "Reset"),
    right: t("Верно.", "Correct."),
    wrong: t("Неверно.", "Not quite."),
    show_answer: t("Показать ответ", "Show answer"),
    done_badge: t("Выполнено", "Completed"),
    new_set: t("Новый набор заданий", "New set of tasks"),
    next_item: t("Следующее", "Next"),
    of: t("из", "of"),
    score: t("Результат", "Score"),
    pass_note: t("Для зачёта нужно", "To pass you need"),
    passed: t("Зачтено. Задание отмечено в прогрессе.", "Passed. The task is recorded in your progress."),
    failed: t("Пока не зачтено. Попробуй новый набор заданий.", "Not passed yet. Try a new set of tasks."),
    fact: t("Из исследований", "From research"),
    sources: t("Источники", "Sources"),
    trainer_title: t("Тренажёр", "Trainer"),
    trainer_lead: t("Смешанные наборы заданий по всем темам. Выбери семинар и проверь себя: для зачёта нужно 10 правильных ответов из 12.",
      "Mixed sets of tasks across all topics. Choose a seminar and test yourself: 10 correct answers out of 12 are needed to pass."),
    all_seminars: t("Все семинары", "All seminars"),
    start: t("Начать", "Start"),
    glossary_title: t("Глоссарий", "Glossary"),
    glossary_lead: t("Термины из планов семинаров. Определения даны по-английски, как в планах, и с переводом на русский.", "Terms from the seminar plans, with the English definitions from the plans and a Russian translation."),
    search: t("Поиск термина", "Search terms"),
    nothing: t("Ничего не найдено.", "Nothing found."),
    reading_title: t("Литература", "Reading"),
    reading_lead: t("Учебники, по которым построены темы, и исследования, на которые ссылаются карточки «Из исследований».", "The textbooks behind the topics and the research cited in the “From research” notes."),
    rd_books: t("Учебники", "Textbooks"),
    rd_research: t("Исследования", "Research"),
    rd_tools: t("Инструменты", "Tools"),
    progress_title: t("Прогресс", "Progress"),
    progress_lead: t("Прогресс хранится только в этом браузере. Его можно сохранить в файл и загрузить на другом устройстве.", "Progress is stored only in this browser. You can save it to a file and load it on another device."),
    export: t("Сохранить в файл", "Save to file"),
    import: t("Загрузить из файла", "Load from file"),
    reset_all: t("Сбросить прогресс", "Reset progress"),
    reset_confirm: t("Нажми ещё раз, чтобы сбросить весь прогресс.", "Press again to reset all progress."),
    imported: t("Прогресс загружен.", "Progress loaded."),
    import_err: t("Не удалось прочитать файл.", "Could not read the file."),
    tasks_done: t("Зачтено заданий", "Tasks passed"),
    lang_ru: t("Русский", "Russian"),
    footer: t("Учебный проект канала «Чердак». Шрифты распространяются по лицензии SIL Open Font License.", "An educational project of the Cherdak channel. Fonts are distributed under the SIL Open Font License."),
    notfound: t("Страница не найдена.", "Page not found.")
  };

  window.t = t;
  window.I18N = {
    KEY: KEY,
    get lang() { return lang; },
    set lang(v) { lang = v === "en" ? "en" : "ru"; document.documentElement.lang = lang; },
    UI: UI
  };
  window.L = function (x) {
    if (x == null) return "";
    if (typeof x === "string") return x;
    return x[lang] != null ? x[lang] : x.ru;
  };
  window.U = function (k) { return UI[k] ? L(UI[k]) : k; };
})();
