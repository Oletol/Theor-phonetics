/* Прогресс студента: только localStorage, экспорт и импорт JSON. */
(function () {
  var KEY = window.I18N.KEY;
  var empty = function () { return { v: 1, lang: "ru", theme: null, modules: {}, tasks: {}, quiz: {} }; };
  var data = empty();
  try { var raw = localStorage.getItem(KEY); if (raw) data = Object.assign(empty(), JSON.parse(raw)); } catch (e) {}

  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }
  function mod(id) { if (!data.modules[id]) data.modules[id] = { seen: [], done: false }; return data.modules[id]; }

  window.Store = {
    get data() { return data; },
    setLang: function (l) { data.lang = l; save(); },
    setTheme: function (th) { data.theme = th; save(); },
    seen: function (id, step) { var m = mod(id); if (m.seen.indexOf(step) < 0) { m.seen.push(step); save(); } },
    status: function (id) { var m = data.modules[id]; if (!m) return "new"; if (m.done) return "done"; return m.seen.length ? "progress" : "new"; },
    seenSteps: function (id) { return (data.modules[id] && data.modules[id].seen) || []; },
    markDone: function (id) { mod(id).done = true; save(); },
    taskDone: function (id, score, total) {
      var prev = data.tasks[id] || { best: 0, passed: false };
      data.tasks[id] = { best: Math.max(prev.best, score), total: total, passed: true, at: new Date().toISOString().slice(0, 10) };
      save();
    },
    taskScore: function (id, score, total) {
      var prev = data.tasks[id] || { best: 0, passed: false };
      data.tasks[id] = Object.assign(prev, { best: Math.max(prev.best || 0, score), total: total });
      save();
    },
    task: function (id) { return data.tasks[id]; },
    quizAnswer: function (qid, ok) { data.quiz[qid] = ok; save(); },
    exportJSON: function () { return JSON.stringify(data, null, 2); },
    importJSON: function (text) { var d = JSON.parse(text); if (!d || typeof d !== "object" || !d.modules) throw new Error("bad"); data = Object.assign(empty(), d); save(); },
    reset: function () { var keep = { lang: data.lang, theme: data.theme }; data = Object.assign(empty(), keep); save(); }
  };
})();
