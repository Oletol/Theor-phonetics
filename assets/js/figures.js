/* Инфографика к теории. Каждая функция возвращает HTML/SVG-строку. */
(function () {
  var I = function (s) { return '<span class="ipa">' + s + "</span>"; };

  /* Нотный стан: syls = [{t, y, k, y2, y3, n}] — y от 0 (низ) до 1 (верх).
     k: u — безударный (точка), s — ударный ровный (черта), f/r — падение/подъём (y..y2),
        fr/rf — сложные (y..y2..y3), g — подъём с гортанной смычкой. n — ядро. */
  /* Правило разметки курса: если за ядром идут безударные слоги (хвост), движение тона
     распределяется по ним. Подъём: ядро — ровная черта, точки хвоста поднимаются.
     Нисходяще-восходящий: падение на ядре, точки внизу, подъём на последнем слоге.
     Падение: точки хвоста остаются внизу. b — граница группы после слога (рисуется черта). */
  var LOW = 0, STRESS = { s: 1, f: 1, r: 1, fr: 1, rf: 1, ml: 1, g: 1 };
  function spread(syls) {
    var a = syls.map(function (x) { return Object.assign({}, x); });
    var start = 0;
    a.forEach(function (sy, i) { if (sy.b || i === a.length - 1) { group(start, i); start = i + 1; } });
    function group(s0, e0) {
      var fs = -1, nu = -1, j;
      for (j = s0; j <= e0; j++) { if (fs < 0 && (STRESS[a[j].k] || a[j].n)) fs = j; if (nu < 0 && a[j].n) nu = j; }
      if (fs < 0) return;
      /* Предшкала: безударные слоги внизу, чуть выше нижней линии. */
      for (j = s0; j < fs; j++) if (a[j].k === "u" && !a[j].keep) a[j].y = LOW;
      /* Шкала: безударные слоги остаются на уровне предыдущего ударного. */
      var lvl = null, first = null, last = null, headEnd = nu >= 0 ? nu : e0 + 1;
      for (j = fs; j < headEnd; j++) {
        var x = a[j];
        if (x.k === "s" || x.k === "h") { lvl = x.y; if (x.k === "s") { if (first == null) first = x.y; last = x.y; } }
        else if ((x.k === "f" || x.k === "r") && !x.n) { lvl = x.y2; if (first == null) first = x.y; last = x.y; }
        else if (x.k === "u" && lvl != null && !x.keep) x.y = lvl;
      }
      if (nu < 0) return;
      var n = a[nu];
      /* Ядро после нисходящей или ровной шкалы не начинается выше последнего слога шкалы. */
      if (lvl != null && first != null && first >= last - .001 && lvl >= .45 && (n.k === "f" || n.k === "fr") && n.y > lvl && !n.keep) n.y = lvl;
      if (n.k === "f" && n.y2 <= .06) n.y2 = -.07;
      if (n.k === "fr" && n.y2 <= .1) n.y2 = -.05;
      if (n.k === "rf" && n.y3 <= .06) n.y3 = -.07;
      /* Хвост. */
      var tail = [];
      for (j = nu + 1; j <= e0; j++) if (a[j].k === "u" || a[j].k === "h") tail.push(j);
      var m = tail.length; if (!m || n.b) return;
      if (n.k === "r") {
        a[nu] = Object.assign({}, n, { k: "s" });
        tail.forEach(function (j, q) { if (!a[j].keep) a[j].y = n.y + (n.y2 - n.y) * (q + 1) / m; });
      } else if (n.k === "fr") {
        a[nu] = Object.assign({}, n, { k: "f" });
        tail.forEach(function (j, q) { if (q < m - 1) a[j].y = LOW; else Object.assign(a[j], { k: "r", y: Math.max(n.y2, -.02), y2: n.y3 }); });
      } else if (n.k === "f" || n.k === "rf") {
        tail.forEach(function (j) { if (!a[j].keep) a[j].y = LOW; });
      }
    }
    return a;
  }

  function staff(syls, o) {
    o = o || {};
    if (!o.raw) syls = spread(syls);
    var step = o.step || 42, padL = 26, n = syls.length, endW = o.end ? 22 : 0, W = padL * 2 + step * (n - 1) + 16 + endW;
    if (o.minW && W < o.minW) { padL += (o.minW - W) / 2; W = o.minW; }
    var top = 16, bot = 116, mid = (top + bot) / 2, Y = function (v) { return bot - 7 - v * (bot - top - 14); };
    var groups = o.groups || [], hasG = groups.length > 0;
    var H = hasG ? 182 : (o.noText ? 128 : 150);
    var s = '<svg class="staff" style="max-width:' + Math.round(W * 1.25) + 'px" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + (o.label || "") + '">' +
      '<line class="st-line" x1="6" y1="' + top + '" x2="' + (W - 6) + '" y2="' + top + '"/><line class="st-mid" x1="6" y1="' + mid + '" x2="' + (W - 6) + '" y2="' + mid + '"/><line class="st-line" x1="6" y1="' + bot + '" x2="' + (W - 6) + '" y2="' + bot + '"/>';
    syls.forEach(function (sy, i) {
      var x = padL + i * step, cls = sy.n ? "st-nuc" : "st-mark";
      if (sy.k === "u") s += '<circle class="st-dot" cx="' + x + '" cy="' + Y(sy.y) + '" r="4"/>';
      else if (sy.k === "h") s += '<circle class="st-half" cx="' + x + '" cy="' + Y(sy.y) + '" r="4"/>';
      else if (sy.k === "s") s += '<line class="' + cls + '" x1="' + (x - 10) + '" y1="' + Y(sy.y) + '" x2="' + (x + 10) + '" y2="' + Y(sy.y) + '"/>';
      else if (sy.k === "f" || sy.k === "r") s += '<path class="' + cls + '" d="M' + (x - 12) + " " + Y(sy.y) + " C" + (x - 1) + " " + Y(sy.y) + " " + (x + 6) + " " + Y(sy.y + (sy.y2 - sy.y) * .2) + " " + (x + 6) + " " + Y(sy.y2) + '"/>';
      else if (sy.k === "fr" || sy.k === "rf") s += '<path class="' + cls + '" d="M' + (x - 12) + " " + Y(sy.y) + " C" + (x - 4) + " " + Y(sy.y) + " " + (x - 4) + " " + Y(sy.y2) + " " + x + " " + Y(sy.y2) + " C" + (x + 4) + " " + Y(sy.y2) + " " + (x + 8) + " " + Y(sy.y2) + " " + (x + 10) + " " + Y(sy.y3) + '"/>';
      else if (sy.k === "ml") s += '<path class="' + cls + '" d="M' + (x - 9) + " " + (Y(sy.y) - 8) + " L" + (x + 7) + " " + Y(sy.y) + " L" + (x - 9) + " " + (Y(sy.y) + 8) + '"/>';
      else if (sy.k === "g") s += '<path class="' + cls + '" d="M' + (x - 10) + " " + Y(sy.y) + " L" + (x + 8) + " " + Y(sy.y2) + '"/><line class="st-glot" x1="' + (x + 13) + '" y1="' + (Y(sy.y2) - 10) + '" x2="' + (x + 13) + '" y2="' + (Y(sy.y2) + 10) + '"/>';
      if (sy.up) { var ax = x - 14, ay = Y(sy.y) - 2; s += '<path class="st-mark st-up" d="M' + ax + ' ' + (bot - 1) + ' L' + ax + ' ' + ay + ' M' + (ax - 6) + ' ' + (ay + 9) + ' L' + ax + ' ' + ay + ' L' + (ax + 6) + ' ' + (ay + 9) + '"/>'; }
      if (sy.b && i < n - 1) { var bx = x + step / 2; s += '<line class="st-bar st-bar-in" x1="' + bx + '" y1="' + top + '" x2="' + bx + '" y2="' + bot + '"/>'; }
      if (!o.noText) s += '<text class="st-syl' + (sy.n ? " st-syl-n" : "") + '" x="' + x + '" y="' + (bot + 22) + '">' + sy.t + "</text>";
    });
    if (o.end) {
      var ex = padL + (n - 1) * step + 24;
      s += '<line class="st-bar" x1="' + ex + '" y1="' + top + '" x2="' + ex + '" y2="' + bot + '"/>';
      if (o.end === "||") s += '<line class="st-bar" x1="' + (ex + 6) + '" y1="' + top + '" x2="' + (ex + 6) + '" y2="' + bot + '"/>';
    }
    groups.forEach(function (g) {
      var x1 = padL + g.from * step - step / 2 + 4, x2 = padL + g.to * step + step / 2 - 4, y = bot + 32;
      s += '<path class="st-grp" d="M' + x1 + " " + y + " v6 H" + x2 + " v-6" + '"/><text class="st-lab' + (g.n ? " st-lab-n" : "") + '" x="' + Math.min(Math.max((x1 + x2) / 2, 36), W - 36) + '" y="' + (y + 22) + '">' + L(g.label) + "</text>";
    });
    return s + "</svg>";
  }

  /* Мини-контур для ИК: pts — точки [x 0..1, y 0..1], c — индексы отрезков центра */
  function contour(pts, centre, o) {
    o = o || {};
    var W = o.w || 220, H = o.h || 90, X = function (v) { return 10 + v * (W - 20); }, Y = function (v) { return H - 12 - v * (H - 24); };
    var base = "", hi = "";
    for (var i = 0; i < pts.length - 1; i++) {
      var seg = "M" + X(pts[i][0]) + " " + Y(pts[i][1]) + " L" + X(pts[i + 1][0]) + " " + Y(pts[i + 1][1]);
      if (centre.indexOf(i) >= 0) hi += '<path class="ct-hi" d="' + seg + '"/>'; else base += '<path class="ct-base" d="' + seg + '"/>';
    }
    var extra = o.glottal ? '<line class="st-glot" x1="' + X(o.glottal[0]) + '" y1="' + (Y(o.glottal[1]) - 9) + '" x2="' + X(o.glottal[0]) + '" y2="' + (Y(o.glottal[1]) + 9) + '"/>' : "";
    return '<svg class="contour" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + (o.label || "") + '"><line class="st-line" x1="4" y1="' + Y(0.5) + '" x2="' + (W - 4) + '" y2="' + Y(0.5) + '" stroke-dasharray="3 5"/>' + base + hi + extra + "</svg>";
  }

  function accV(x) { return x.replace(/([а-яёА-ЯЁ])([АОУЫЭЕЁИЮЯ])/g, '$1<span class="acc-v">$2</span>'); }

  var IK = [
    { n: 1, pts: [[0, .5], [.45, .5], [.6, .12], [1, .1]], c: [1], use: t("Сообщение", "Statement"), ex: "Здесь живут мои родИтели." },
    { n: 2, pts: [[0, .55], [.45, .55], [.6, .08], [1, .06]], c: [1], bold: true, use: t("Требовательный вопрос, приказ", "Demanding question, command"), ex: "Закройте окнО!" },
    { n: 3, pts: [[0, .45], [.45, .45], [.6, .95], [.68, .3], [1, .25]], c: [1, 2], use: t("Общий вопрос, незавершённость", "Yes-no question, incompleteness"), ex: "Вы были в теАтре?" },
    { n: 4, pts: [[0, .5], [.45, .5], [.6, .2], [1, .75]], c: [1, 2], use: t("Сопоставительный вопрос с «а»", "Comparative question with «а»"), ex: "А женА?" },
    { n: 5, pts: [[0, .45], [.2, .45], [.32, .85], [.62, .85], [.76, .15], [1, .12]], c: [1, 3], use: t("Восклицание", "Exclamation"), ex: "КакАя погОда!" },
    { n: 6, pts: [[0, .45], [.45, .45], [.6, .88], [1, .88]], c: [1], use: t("Оценочное восклицание", "Evaluative exclamation"), ex: "Какой гОлос!" },
    { n: 7, pts: [[0, .45], [.45, .45], [.62, .9]], c: [1], glottal: [.66, .9], use: t("Экспрессивная оценка", "Expressive evaluation"), ex: "ХорошО он поёт!" }
  ];

  var Figures = {
    _staff: staff, _contour: contour, _IK: IK, _accV: accV,

    twoDescriptions: function () {
      return '<div class="fg-two"><div class="fg-box"><div class="fg-h">' + L(t("Артикуляционное описание", "Articulatory description")) + " " + I("[s]") + "</div><ul>" +
        [t("щель между кончиком языка и альвеолами", "narrowing between tongue tip and alveolar ridge"), t("желобок вдоль спинки языка", "a groove along the tongue"), t("края языка смыкаются с боковыми зубами", "tongue sides closed against the side teeth"), t("связки не вибрируют", "vocal cords do not vibrate"), t("сильный выдох, напряжённая артикуляция", "strong breath, tense articulation"), t("положение губ зависит от соседних гласных", "lip position depends on neighbouring vowels")].map(function (x) { return "<li>" + L(x) + "</li>"; }).join("") +
        '</ul></div><div class="fg-box fg-acc"><div class="fg-h">' + L(t("Фонологическое описание", "Phonological description")) + " " + I("/s/") + "</div><ul>" +
        [t("щелевой", "constrictive"), t("переднеязычный", "forelingual"), t("сильный (fortis)", "fortis")].map(function (x) { return "<li><b>" + L(x) + "</b></li>"; }).join("") +
        '</ul><p class="fg-note">' + L(t("Этого достаточно, чтобы отличить /s/ от всех других фонем.", "This is enough to tell /s/ from every other phoneme.")) + "</p></div></div>";
    },

    lSystems: function () {
      function panel(title, top, tops, leaves) {
        var s = '<svg viewBox="0 0 300 170" role="img" aria-label="' + title + '"><text class="fg-title" x="150" y="18">' + title + "</text>";
        tops.forEach(function (tp) { s += '<rect class="fg-ph" x="' + (tp.x - 34) + '" y="34" width="68" height="34" rx="8"/><text class="fg-ipa" x="' + tp.x + '" y="57">' + tp.t + "</text>"; });
        leaves.forEach(function (lv) { s += '<line class="fg-link" x1="' + lv.from + '" y1="68" x2="' + lv.x + '" y2="104"/><circle class="fg-node" cx="' + lv.x + '" cy="118" r="17"/><text class="fg-ipa" x="' + lv.x + '" y="124">' + lv.t + '</text><text class="fg-cap" x="' + lv.x + '" y="156">' + lv.w + "</text>"; });
        return s + "</svg>";
      }
      return '<div class="fg-two">' +
        panel(L(t("Английский: одна фонема", "English: one phoneme")), 0, [{ x: 150, t: "/l/" }], [{ from: 150, x: 90, t: "[l]", w: "lip" }, { from: 150, x: 210, t: "[ɫ]", w: "pill" }]) +
        panel(L(t("Русский: две фонемы", "Russian: two phonemes")), 0, [{ x: 90, t: "/л/" }, { x: 210, t: "/лʼ/" }], [{ from: 90, x: 90, t: "[ɫ]", w: "лук" }, { from: 210, x: 210, t: "[lʲ]", w: "люк" }]) +
        "</div>";
    },

    segmentation: function () {
      var rows = [["[sɪk] – [sæk]", t("выделяет [ɪ] и [æ]", "isolates [ɪ] and [æ]")], ["[sɪk] – [spɪk]", t("выделяет [s] и [sp]", "isolates [s] and [sp]")], ["[spɪk] – [sɪk], [tɪk] – [stɪk]", t("делит [sp], [st] на [s], [p], [t]", "splits [sp], [st] into [s], [p], [t]")], ["[s], [t], [p]", t("дальше не делятся: минимальные сегменты", "no further division: minimal segments")]];
      return '<table class="fg-table"><thead><tr><th>' + L(t("Сравнение", "Comparison")) + "</th><th>" + L(t("Результат", "Result")) + "</th></tr></thead><tbody>" + rows.map(function (r) { return '<tr><td class="ipa">' + r[0] + "</td><td>" + L(r[1]) + "</td></tr>"; }).join("") + "</tbody></table>";
    },

    featureMatrix: function () {
      var s = [["[б]", t("губно-губной", "bilabial")], ["[в]", t("губно-зубной", "labiodental")], ["[д]", t("переднеязычный", "forelingual")], ["[г]", t("заднеязычный", "velar")], ["[а]", "—"]];
      return '<div class="fg-scroll"><table class="fg-table fg-matrix"><thead><tr><th>' + L(t("Признак", "Feature")) + "</th>" + s.map(function (x) { return '<th class="ipa">' + x[0] + "</th>"; }).join("") + "</tr></thead><tbody><tr><td>" + L(t("Место образования преграды", "Place of obstruction")) + "</td>" + s.map(function (x) { return "<td>" + L(x[1]) + "</td>"; }).join("") + '</tr></tbody></table></div><p class="fg-note">' + L(t("Фрагмент признаковой матрицы по Кодзасову и Кривновой: для гласного [а] признак неприменим.", "A fragment of a feature matrix after Kodzasov and Krivnova: the feature does not apply to the vowel [а].")) + "</p>";
    },

    distribution: function () {
      var ctx = [t("начало ударного слога", "stressed-syllable onset"), t("после [s]", "after [s]"), t("конец слова", "word-final")];
      function grid(title, a, b, rowA, rowB, note) {
        return '<div class="fg-dist"><div class="fg-h">' + L(title) + '</div><div class="dist-grid"><span></span>' + ctx.map(function (c) { return '<span class="dist-c">' + L(c) + "</span>"; }).join("") +
          '<span class="ipa dist-s">' + a + "</span>" + rowA.map(function (v) { return '<span class="dist-cell ' + (v ? "on" : "") + '">' + (v ? "+" : "") + "</span>"; }).join("") +
          '<span class="ipa dist-s">' + b + "</span>" + rowB.map(function (v) { return '<span class="dist-cell ' + (v ? "on2" : "") + '">' + (v ? "+" : "") + "</span>"; }).join("") + '</div><p class="fg-note">' + L(note) + "</p></div>";
      }
      return '<div class="fg-three">' +
        grid(t("Контрастная", "Contrastive"), "[p]", "[b]", [1, 1, 1], [1, 0, 1], t("Общие контексты: pit – bit. Разные фонемы.", "Shared contexts: pit – bit. Different phonemes.")) +
        grid(t("Дополнительная", "Complementary"), "[pʰ]", "[p]", [1, 0, 0], [0, 1, 1], t("Контексты не пересекаются: pin – spin. Одна фонема.", "No shared contexts: pin – spin. One phoneme.")) +
        grid(t("Свободное варьирование", "Free variation"), "[ф]", "[п]", [0, 0, 1], [0, 0, 1], t("Общий контекст без смены смысла: шкаф – шкап.", "Shared context, same meaning: шкаф – шкап.")) + "</div>";
    },

    commutationGrid: function () {
      var r = [["p", "pin", 1], ["b", "bin", 1], ["s", "sin", 1], ["d", "din", 1], ["w", "win", 1], ["ʃ", "shin", 1], ["v", "—", 0], ["pʰ / p", "pin", 2]];
      return '<div class="comm"><div class="comm-frame ipa">[ _ ɪ n ]</div><div class="comm-grid">' + r.map(function (x) {
        var st = x[2] === 1 ? L(t("новое слово", "new word")) : x[2] === 2 ? L(t("то же слово", "same word")) : L(t("не слово", "no word"));
        return '<div class="comm-cell c' + x[2] + '"><span class="ipa">' + x[0] + '</span><span class="ex">' + x[1] + "</span><small>" + st + "</small></div>";
      }).join("") + "</div></div>";
    },

    actApt: function () {
      function row(word, up, cap) {
        var path = up ? "M120 52 Q150 52 168 26" : "M120 52 Q150 52 168 78";
        return '<g><text class="fg-cap fg-left" x="8" y="57">' + word + '</text><rect class="fg-vowel" x="60" y="34" width="110" height="36" rx="6"/><text class="fg-ipa" x="92" y="58">[æ]</text><path class="fg-trans" d="' + path + '"/><rect class="fg-gap" x="176" y="34" width="70" height="36" rx="6"/><text class="fg-cap" x="211" y="57">' + L(t("смычка", "closure")) + '</text><rect class="fg-vowel" x="252" y="34" width="40" height="36" rx="6"/><text class="fg-ipa" x="272" y="58">[t]</text><text class="fg-cap" x="150" y="96">' + cap + "</text></g>";
      }
      return '<svg viewBox="0 0 300 220" class="fg-wide" role="img" aria-label="act – apt"><g transform="translate(0,4)">' + row("act", true, L(t("переход к [k]: форманта сходится вверх", "transition to [k]: formant converges upwards"))) + '</g><g transform="translate(0,110)">' + row("apt", false, L(t("переход к [p]: форманта уходит вниз", "transition to [p]: formant goes down"))) + "</g></svg>";
    },

    strongWeak: function () {
      return '<table class="fg-table"><thead><tr><th></th><th>' + L(t("Сильная позиция", "Strong position")) + "</th><th>" + L(t("Слабая позиция", "Weak position")) + '</th></tr></thead><tbody>' +
        '<tr><td>' + L(t("Конечный согласный", "Final consonant")) + '</td><td>воды <span class="ipa">[вóды]</span></td><td>вод <span class="ipa">[вот]</span> = кот</td></tr>' +
        '<tr><td>' + L(t("Безударный гласный", "Unstressed vowel")) + '</td><td>воды <span class="ipa">[вóды]</span></td><td>вода <span class="ipa">[вʌдá]</span>, водовоз <span class="ipa">[въдʌвóс]</span></td></tr>' +
        '<tr><td>' + L(t("Английский гласный", "English vowel")) + '</td><td>photograph <span class="ipa">[ˈfəʊtəɡrɑːf]</span></td><td>photography <span class="ipa">[fəˈtɒɡrəfi]</span></td></tr></tbody></table>';
    },

    morphophoneme: function () {
      return '<div class="morph"><div class="morph-row"><span>дру<b>г</b></span><span>дру<b>зь</b>я</span><span>дру<b>ж</b>ить</span></div><div class="morph-brace"></div><div class="morph-res">' + L(t("морфонема", "morphophoneme")) + ' <span class="ipa">{г, зʼ, ж}</span></div><p class="fg-note">' + L(t("Чередование не вызвано фонетическим контекстом: это ряд разных фонем в одной морфеме.", "The alternation is not caused by phonetic context; it is a set of different phonemes within one morpheme.")) + "</p></div>";
    },

    invariant: function () {
      return '<svg viewBox="0 0 340 190" class="fg-wide" role="img" aria-label="invariant"><ellipse class="fg-zone" cx="95" cy="92" rx="80" ry="64"/><ellipse class="fg-zone fg-zone2" cx="250" cy="92" rx="80" ry="64"/>' +
        '<text class="fg-ipa" x="95" y="46">/iː/</text><text class="fg-ipa" x="250" y="46">/ɪ/</text>' +
        '<circle class="fg-pt" cx="70" cy="96" r="6"/><circle class="fg-pt" cx="115" cy="118" r="6"/><line class="fg-mv fg-ok" x1="70" y1="96" x2="115" y2="118"/>' +
        '<circle class="fg-pt" cx="125" cy="80" r="6"/><circle class="fg-pt fg-bad" cx="232" cy="96" r="6"/><line class="fg-mv fg-badl" x1="125" y1="80" x2="232" y2="96"/>' +
        '<text class="fg-cap" x="92" y="146">' + L(t("фонетическая", "phonetic")) + '</text><text class="fg-cap" x="180" y="72">' + L(t("фонологическая", "phonological")) + '</text>' +
        '<text class="fg-cap" x="95" y="178">beat ~ beat</text><text class="fg-cap" x="250" y="178">beat ~ bit</text></svg>';
    },

    sonority: function () {
      var scale = { p: 1, t: 1, ɡ: 1, d: 1, s: 2, l: 4, n: 3, r: 4, æ: 6, "ɑː": 6, "n̩": 3, ɪ: 6 };
      function word(w, segs, peaks) {
        var bw = 30, gap = 8, W = segs.length * (bw + gap) + 20, s = '<svg viewBox="0 0 ' + W + ' 150" role="img" aria-label="' + w + '"><text class="fg-title" x="' + W / 2 + '" y="16">' + w + "</text>";
        segs.forEach(function (sg, i) { var hgt = scale[sg] * 16, x = 10 + i * (bw + gap); s += '<rect class="' + (peaks.indexOf(i) >= 0 ? "fg-bar-p" : "fg-bar") + '" x="' + x + '" y="' + (124 - hgt) + '" width="' + bw + '" height="' + hgt + '" rx="4"/><text class="fg-ipa" x="' + (x + bw / 2) + '" y="142">' + sg + "</text>"; });
        return s + "</svg>";
      }
      return '<div class="fg-two">' + word("plant", ["p", "l", "æ", "n", "t"], [2]) + word("garden", ["ɡ", "ɑː", "d", "n̩"], [1, 3]) + '</div><p class="fg-note">' + L(t("Высота столбца — относительная сонорность (по Есперсену). В plant одна вершина — один слог; в garden две вершины: гласный и слоговой [n̩].", "Bar height is relative sonority (after Jespersen). Plant has one peak — one syllable; garden has two peaks: the vowel and syllabic [n̩].")) + "</p>";
    },

    syllableTypes: function () {
      return '<div class="fg-scroll"><table class="fg-table fg-2x2"><thead><tr><th></th><th>' + L(t("Открытый (на гласный)", "Open (ends in a vowel)")) + "</th><th>" + L(t("Закрытый (на согласный)", "Closed (ends in a consonant)")) + '</th></tr></thead><tbody><tr><th>' + L(t("Прикрытый (с согласного)", "Covered (starts with a consonant)")) + '</th><td><span class="ex">no</span> CV</td><td><span class="ex">note</span> CVC</td></tr><tr><th>' + L(t("Неприкрытый (с гласного)", "Uncovered (starts with a vowel)")) + '</th><td><span class="ex">oh</span> V</td><td><span class="ex">odd, oak</span> VC</td></tr></tbody></table></div>';
    },

    juncture: function () {
      function col(w, tr, cues) { return '<div class="fg-box"><div class="fg-h"><span class="ex">' + w + '</span> <span class="ipa">' + tr + "</span></div><ul>" + cues.map(function (c) { return "<li>" + L(c) + "</li>"; }).join("") + "</ul></div>"; }
      return '<div class="fg-two">' + col("nitrate", "[naɪ-ˈtreɪt]", [t("[t] сильнее аспирирован", "[t] more aspirated"), t("[r] частично оглушён", "[r] partly devoiced"), t("[aɪ] длиннее в открытом слоге", "[aɪ] longer in an open syllable")]) +
        col("night-rate", "[naɪt-ˈreɪt]", [t("[t] слабо аспирирован", "[t] weakly aspirated"), t("[r] звонкий", "[r] voiced"), t("[aɪ] короче перед глухим [t]", "[aɪ] shorter before voiceless [t]")]) + "</div>";
    },

    components: function () {
      var c = [[t("Мелодика", "Speech melody"), t("частота основного тона", "fundamental frequency")], [t("Фразовое ударение", "Sentence stress"), t("сила, высота, длительность", "force, pitch, length")], [t("Тембр", "Voice quality"), t("окраска голоса", "colouring of the voice")], [t("Темп и ритм", "Tempo and rhythm"), t("длительность, паузы", "duration, pauses")]];
      return '<div class="comp"><div class="comp-top">' + L(t("Интонация", "Intonation")) + '</div><div class="comp-grid">' + c.map(function (x) { return '<div class="comp-cell"><b>' + L(x[0]) + "</b><small>" + L(x[1]) + "</small></div>"; }).join("") + "</div></div>";
    },

    staves: function () {
      var syl = [{ t: "We", y: .12, k: "u" }, { t: "were", y: .12, k: "u" }, { t: "won", y: .92, k: "s" }, { t: "der", y: .86, k: "u" }, { t: "ing", y: .82, k: "u" }, { t: "if", y: .78, k: "u" }, { t: "you", y: .75, k: "u" }, { t: "could", y: .72, k: "u" }, { t: "come", y: .66, k: "s" }, { t: "to", y: .6, k: "u" }, { t: "din", y: .5, k: "s" }, { t: "ner", y: .45, k: "u" }, { t: "to", y: .4, k: "u" }, { t: "mor", y: .34, k: "f", y2: .03, n: true }, { t: "row", y: .02, k: "u" }];
      return '<div class="fg-scroll">' + staff(syl, { groups: [{ from: 0, to: 1, label: t("предшкала", "pre-head") }, { from: 2, to: 12, label: t("шкала", "head") }, { from: 13, to: 13, label: t("ядро", "nucleus"), n: true }, { from: 14, to: 14, label: t("хвост", "tail") }], label: "We were wondering if you could come to dinner tomorrow" }) + '</div><p class="fg-tone">We were ˈwondering if you could ˈcome to ˈdinner toˎmorrow.</p>';
    },

    levels: function () {
      var s = '<svg viewBox="0 0 340 170" class="fg-wide" role="img" aria-label="pitch levels"><line class="st-line" x1="10" y1="20" x2="330" y2="20"/><line class="st-line" x1="10" y1="140" x2="330" y2="140"/>';
      [[44, t("высокий", "high")], [80, t("средний", "mid")], [116, t("низкий", "low")]].forEach(function (l) { s += '<line class="fg-level" x1="10" y1="' + l[0] + '" x2="190" y2="' + l[0] + '"/><text class="fg-cap fg-left" x="14" y="' + (l[0] - 6) + '">' + L(l[1]) + "</text>"; });
      [[220, 30, 130, t("широкий", "wide")], [260, 55, 105, t("нормальный", "normal")], [300, 70, 92, t("узкий", "narrow")]].forEach(function (r) { s += '<line class="fg-range" x1="' + r[0] + '" y1="' + r[1] + '" x2="' + r[0] + '" y2="' + r[2] + '"/><line class="fg-range" x1="' + (r[0] - 6) + '" y1="' + r[1] + '" x2="' + (r[0] + 6) + '" y2="' + r[1] + '"/><line class="fg-range" x1="' + (r[0] - 6) + '" y1="' + r[2] + '" x2="' + (r[0] + 6) + '" y2="' + r[2] + '"/><text class="fg-cap" x="' + r[0] + '" y="160">' + L(r[3]) + "</text>"; });
      return s + "</svg>";
    },

    subsystems: function () {
      var c = [[t("Членение (tonality)", "Phrasing (tonality)"), "Last ˈsummer | we went to ˈstay with my ˋsister"], [t("Акцентуация (tonicity)", "Accentuation (tonicity)"), "I ˈthink it’s ˋraining | I ˈthink it’s ˋraining <i>now</i>"], [t("Контур (tone)", "Contour (tone)"), "ˋYes. | ˏYes? | ˇYes…"]];
      return '<div class="fg-three">' + c.map(function (x) { return '<div class="fg-box"><div class="fg-h">' + L(x[0]) + '</div><p class="fg-tone">' + x[1] + "</p></div>"; }).join("") + "</div>";
    },

    drops: function () {
      var head = [{ t: "It", y: .2, k: "u" }, { t: "was", y: .2, k: "u" }, { t: "a", y: .2, k: "u" }, { t: "ve", y: .85, k: "s" }, { t: "ry", y: .85, k: "u" }, { t: "good", y: .85, k: "s" }];
      var hi = head.concat([{ t: "film", y: .9, k: "f", y2: .05, n: true }]), lo = head.concat([{ t: "film", y: .42, k: "f", y2: .03, n: true }]);
      return '<div class="fg-two"><div><div class="fg-h">High Drop</div>' + staff(hi, { label: "High Drop" }) + '<p class="fg-note">' + L(t("Ядро начинается высоко: нейтрально, современно.", "The nucleus starts high: neutral, contemporary.")) + '</p></div><div><div class="fg-h">Low Drop</div>' + staff(lo, { label: "Low Drop" }) + '<p class="fg-note">' + L(t("Шаг вниз на ядро (даунстеп): весомо, может звучать снисходительно.", "A step down onto the nucleus (downstep): weighty, may sound patronizing.")) + "</p></div></div>";
    },

    questions: function () {
      var head = [{ t: "Are", y: .2, k: "u" }, { t: "you", y: .2, k: "u" }, { t: "tra", y: .82, k: "s" }, { t: "vel", y: .82, k: "u" }, { t: "ling", y: .82, k: "u" }, { t: "a", y: .82, k: "u" }];
      var lb = head.concat([{ t: "lone", y: .1, k: "r", y2: .4, n: true }]), fr = head.concat([{ t: "lone", y: .8, k: "fr", y2: .1, y3: .5, n: true }]);
      var hr = [{ t: "Are", y: .35, k: "u" }, { t: "you", y: .35, k: "u" }, { t: "tra", y: .4, k: "s" }, { t: "vel", y: .4, k: "u" }, { t: "ling", y: .4, k: "u" }, { t: "a", y: .4, k: "u" }, { t: "lone", y: .45, k: "r", y2: .95, n: true }];
      return '<div class="fg-three">' + [["Low Bounce", lb, t("RP; сегодня маркировано", "RP; marked today")], ["Fall-Rise", fr, t("нейтрально в SSB", "neutral in SSB")], ["High Rise", hr, t("типично для США", "typical of the US")]].map(function (x) { return '<div><div class="fg-h">' + x[0] + "</div>" + staff(x[1], { label: x[0], step: 34 }) + '<p class="fg-note">' + L(x[2]) + "</p></div>"; }).join("") + "</div>";
    },

    fourNotations: function () {
      var fries = '<svg viewBox="0 0 260 60" class="fg-inline" role="img" aria-label="Fries"><polyline class="fg-trace" points="4,38 120,38 132,14 168,14 172,50 256,50"/><text class="fg-txt" x="6" y="32">He’s gone to the</text><text class="fg-txt" x="130" y="32">o</text><text class="fg-txt" x="142" y="32">ffice</text></svg>';
      var bol = '<svg viewBox="0 0 260 60" class="fg-inline" role="img" aria-label="Bolinger"><text class="fg-txt" x="6" y="36">He’s</text><text class="fg-txt" x="44" y="36">gone</text><text class="fg-txt" x="90" y="36">to</text><text class="fg-txt" x="112" y="36">the</text><text class="fg-txt" x="144" y="16">of</text><text class="fg-txt" x="168" y="54">fice</text></svg>';
      var rows = [[t("Линия (Фриз)", "Line (Fries)"), fries], [t("Высота слогов (Болинджер)", "Syllable heights (Bolinger)"), bol], [t("Уровни (Пайк)", "Levels (Pike)"), '<div class="pike"><span>He’s gone to the<sup>2</sup></span> <span>of<sup>3</sup></span><span>fice<sup>1</sup></span></div>'], [t("Тонетические знаки", "Tonetic marks"), '<p class="fg-tone">He’s ˈgone to the ˋoffice.</p>']];
      return '<div class="notations">' + rows.map(function (r) { return '<div class="nt-row"><div class="nt-k">' + L(r[0]) + '</div><div class="nt-v">' + r[1] + "</div></div>"; }).join("") + "</div>";
    },

    tobi: function () {
      var w = ["We", "went", "to", "London"], x = [30, 100, 160, 240];
      var s = '<svg viewBox="0 0 320 196" class="fg-wide" role="img" aria-label="ToBI"><polyline class="fg-trace" points="10,70 70,64 100,30 130,50 170,56 220,40 250,32 270,90 310,96"/>';
      s += '<line class="st-line" x1="6" y1="110" x2="314" y2="110"/><line class="st-line" x1="6" y1="140" x2="314" y2="140"/><line class="st-line" x1="6" y1="170" x2="314" y2="170"/>';
      w.forEach(function (wd, i) { s += '<text class="fg-txt" x="' + x[i] + '" y="130" text-anchor="middle">' + wd + "</text>"; });
      s += '<text class="fg-tobi" x="100" y="160" text-anchor="middle">H*</text><text class="fg-tobi" x="250" y="160" text-anchor="middle">H*</text><text class="fg-tobi" x="296" y="160" text-anchor="middle">L-L%</text>';
      [[64, "1"], [130, "1"], [195, "1"], [300, "4"]].forEach(function (b) { s += '<text class="fg-cap" x="' + b[0] + '" y="188">' + b[1] + "</text>"; });
      s += '<text class="fg-cap fg-left" x="8" y="104">' + L(t("слова", "words")) + '</text><text class="fg-cap fg-left" x="8" y="152">' + L(t("тоны", "tones")) + '</text><text class="fg-cap fg-left" x="8" y="186">' + L(t("индексы", "breaks")) + "</text>";
      return s + '</svg><p class="fg-note">' + L(t("Сверху — кривая тона, ниже — три уровня разметки ToBI: слова, тоны, индексы границ.", "At the top is the pitch track; below are the three ToBI tiers: words, tones, break indices.")) + "</p>";
    },

    ikTable: function () {
      return '<div class="ik-grid">' + IK.map(function (k) {
        return '<div class="ik-cell"><div class="ik-n">ИК-' + k.n + "</div>" + contour(k.pts, k.c, { glottal: k.glottal, label: "ИК-" + k.n, w: 160, h: 70 }) + '<div class="ik-use">' + L(k.use) + '</div><div class="ik-ex">' + accV(k.ex) + "</div></div>";
      }).join("") + '</div><p class="fg-note">' + L(t("Выделенный отрезок — движение тона на центре. Заглавной гласной в примере отмечен центр.", "The highlighted segment is the pitch movement on the centre. The capitalized vowel in the example marks the centre.")) + "</p>";
    },

    centre: function () {
      return '<div class="centre"><div class="cn-part">' + L(t("предцентровая часть", "pre-centre part")) + '<span class="cn-w">Вы были в те</span></div><div class="cn-part cn-c">' + L(t("центр", "centre")) + '<span class="cn-w">А</span></div><div class="cn-part">' + L(t("постцентровая часть", "post-centre part")) + '<span class="cn-w">тре?</span></div></div>';
    },

    ik3vsEnglish: function () {
      return '<div class="fg-two"><div><div class="fg-h">ИК-3: Вы были в ЛОНдоне?</div>' + contour([[0, .45], [.5, .45], [.62, .95], [.72, .3], [1, .25]], [1, 2], { label: "ИК-3" }) + '<p class="fg-note">' + L(t("Пик на ударном слоге центра, затем падение.", "Peak on the stressed syllable of the centre, then a fall.")) + '</p></div><div><div class="fg-h">Have you been to London?</div>' + contour([[0, .75], [.5, .75], [.62, .2], [1, .65]], [1, 2], { label: "Fall-Rise" }) + '<p class="fg-note">' + L(t("Высокая шкала, нисходяще-восходящий: подъём продолжается до конца.", "High head, Fall-Rise: the rise continues to the end.")) + "</p></div></div>";
    }
  };

  window.Figures = Figures;
})();
