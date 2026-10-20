/* Тренажёр: смешанные наборы из банков заданий всех тем. */
(function () {
  function both(x) { return typeof x === "string" ? { ru: x, en: x } : x; }
  function build(seminar) {
    var bank = [];
    COURSE.seminars.forEach(function (s) {
      if (seminar && s.n !== seminar) return;
      (s.modules || []).forEach(function (m) {
        m.cards.forEach(function (c) {
          if (!c.task) return;
          c.task.bank.forEach(function (it) {
            var p = both(it.p), src = '<span class="tr-src">' + m.num + "</span> ";
            bank.push({ p: { ru: src + p.ru, en: src + p.en }, o: it.o || c.task.options, a: it.a, e: it.e, fixed: it.fixed || c.task.fixed });
          });
        });
      });
    });
    return { id: "trainer-" + (seminar || "all"), n: 12, pass: 10, bank: bank };
  }
  window.Trainer = { build: build };
})();
