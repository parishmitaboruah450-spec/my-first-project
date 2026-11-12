/* evidence.js — Act 2: the historian's desk and what the sources actually say. Laid out natively at 1080 x 1920. */
(function (F) {
  'use strict';
  var A = F.A, C = F.C, mk = F.mk, T = F.T, L = F.L, S = F.S, p = A.p, st = A.st, c = A.c;
  var GREEN = '#3fae6a', RED = '#d8473f', AMBER = '#e9a92c', INK = '#2b1c12';

  function rise(el, t, d) {
    d = d || 0.8;
    T(el, 'opacity', [[t, 0], [t + d * 0.8, 1]]);
    T(el, 'transform', [[t, 'translateY(26px)'], [t + d, 'translateY(0px)']], 'ease-out');
    return el;
  }
  function head(parent, y, title, sub, t, size) {
    var h = mk('g', {}, parent);
    F.text(h, 540, y, title, { size: size || 56, weight: 800, fill: 'url(#g-gold)', anchor: 'middle', spacing: 4 });
    if (sub) F.text(h, 540, y + 54, sub, { font: '"Cormorant Garamond", serif', size: 36, style: 'italic', weight: 600, fill: '#efe2c2', anchor: 'middle' });
    return rise(h, t);
  }
  function scene(t0, t1) { var sc = F.scene(F.L2, t0, t1, 0.9, '540px 960px'); return sc; }
  // a palm-leaf style folio (pothi page)
  function folio(x, y, w, h, seed) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="url(#g-paper)" stroke="#9b7a46" stroke-width="2"/>' +
      st('M' + (x + 42) + ' ' + (y + 14) + ' V' + (y + h - 14) + ' M' + (x + 52) + ' ' + (y + 14) + ' V' + (y + h - 14) + ' M' + (x + w - 42) + ' ' + (y + 14) + ' V' + (y + h - 14) + ' M' + (x + w - 52) + ' ' + (y + 14) + ' V' + (y + h - 14), '#b3202e', 2) +
      c(x + w / 2, y + h / 2, 9, '#5a3a1e') +
      p(F.script(x + 70, y + 42, w / 2 - 100, Math.floor((h - 50) / 34), 34, seed) + F.script(x + w / 2 + 30, y + 42, w / 2 - 100, Math.floor((h - 50) / 34), 34, seed + 1), 'none', 'stroke="#4a2e18" stroke-width="2.2" stroke-linecap="round" opacity=".75"');
  }
  function mark(kind, x, y, r) {
    r = r || 30;
    var col = kind === 'yes' ? GREEN : kind === 'no' ? RED : AMBER;
    var sym = kind === 'yes' ? st('M' + (x - r * 0.42) + ' ' + y + ' l' + (r * 0.3) + ' ' + (r * 0.32) + ' l' + (r * 0.58) + ' ' + (-r * 0.62), '#fff', r * 0.2)
      : kind === 'no' ? st('M' + (x - r * 0.36) + ' ' + (y - r * 0.36) + ' l' + (r * 0.72) + ' ' + (r * 0.72) + ' M' + (x + r * 0.36) + ' ' + (y - r * 0.36) + ' l' + (-r * 0.72) + ' ' + (r * 0.72), '#fff', r * 0.2)
      : '<text x="' + x + '" y="' + (y + r * 0.36) + '" text-anchor="middle" font-family="Cinzel, serif" font-weight="800" font-size="' + (r * 1.1) + '" fill="#fff">?</text>';
    return c(x, y, r, col) + sym;
  }
  function magnifier(r) {
    return '<circle cx="0" cy="0" r="' + r + '" fill="#cfe6ff" fill-opacity=".14" stroke="url(#g-brass)" stroke-width="' + (r * 0.13) + '"/>' +
      '<path d="M' + (-r * 0.55) + ' ' + (-r * 0.2) + ' A' + (r * 0.6) + ' ' + (r * 0.6) + ' 0 0 1 ' + (-r * 0.15) + ' ' + (-r * 0.58) + '" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="' + (r * 0.07) + '" stroke-linecap="round"/>' +
      '<path d="M' + (r * 0.7) + ' ' + (r * 0.7) + ' L' + (r * 1.55) + ' ' + (r * 1.55) + '" stroke="#5a2a14" stroke-width="' + (r * 0.24) + '" stroke-linecap="round"/>' +
      '<path d="M' + (r * 0.74) + ' ' + (r * 0.74) + ' L' + (r * 0.98) + ' ' + (r * 0.98) + '" stroke="url(#g-brass)" stroke-width="' + (r * 0.3) + '" stroke-linecap="round"/>';
  }

  /* ====================================================================== THE DESK (the legend shrinks onto it) */
  (function () {
    var t0 = S.desk, t1 = S.raso, sc = F.scene(F.L1, t0, t1, 0.4, '540px 960px'), g = sc.cam;
    F.rect(g, -100, -100, 1280, 2120, '#24140c');
    var r = F.rng(77), grain = '';
    for (var i = 0; i < 70; i++) { var y = r() * 1920; grain += 'M-20 ' + y.toFixed(0) + ' C 300 ' + (y + (r() - 0.5) * 40).toFixed(0) + ', 700 ' + (y + (r() - 0.5) * 40).toFixed(0) + ', 1100 ' + (y + (r() - 0.5) * 30).toFixed(0); }
    F.g(g, st(grain, '#3a2214', 3, 'opacity=".7"'));
    F.glow(g, 540, 1040, 1100, 'g-warm', 0.42);
    // props: a closed book, an ink pot with a quill, loose notes
    F.g(g, '<g transform="rotate(-12 170 1640)"><rect x="40" y="1540" width="300" height="210" rx="10" fill="#5e1220"/><rect x="40" y="1540" width="300" height="210" rx="10" fill="none" stroke="' + C.gold + '" stroke-width="4"/>' +
      st('M70 1560 V1730', C.goldD, 3) + '</g>' +
      '<g transform="rotate(8 880 1660)"><rect x="760" y="1560" width="250" height="300" fill="#efe2c2"/>' + p(F.script(784, 1600, 200, 6, 34, 9), 'none', 'stroke="#6b4a2a" stroke-width="2" opacity=".6"') + '</g>' +
      '<ellipse cx="920" cy="470" rx="70" ry="22" fill="#111"/><path d="M852 470 V410 C 852 380, 988 380, 988 410 V470 Z" fill="#1b2a3a"/><ellipse cx="920" cy="404" rx="40" ry="12" fill="#0a0a12"/>' +
      p('M930 400 C 980 300, 1020 220, 1060 160 C 1040 230, 1000 310, 940 404 Z', '#efe2c2') + st('M934 402 C 990 300, 1030 220, 1058 166', '#b8a782', 2));
    // shadow under the shrunken painting
    var sh = F.rect(g, 250, 590, 600, 980, '#000', { opacity: 0, rx: 8, filter: 'url(#f-soft)', transform: 'rotate(-4 540 1080)' });
    T(sh, 'opacity', [[t0 + 0.8, 0], [t0 + 1.7, 0.55]]);
    // the legend becomes a painting lying on the desk
    T(F.legendAll, 'transform', [[t0, 'translate(0px,0px) scale(1) rotate(0deg)'], [t0 + 1.7, 'translate(0px,104px) scale(.46) rotate(-4deg)', 'cubic-bezier(.55,0,.25,1)'], [t1 + 0.5, 'translate(0px,104px) scale(.46) rotate(-4deg)']]);
    var rim = F.rect(F.lover, -100, -100, 1280, 2120, 'none', { stroke: C.gold, 'stroke-width': 18 });
    T(rim, 'opacity', [[t0 + 0.6, 0], [t0 + 1.5, 1]]);
    // a magnifying glass drifts over it
    var mg = F.g(F.L2, magnifier(130));
    T(mg, 'transform', [[t0 + 2.0, 'translate(1280px,1500px) rotate(-10deg)'], [t0 + 3.2, 'translate(640px,1160px) rotate(0deg)', 'ease-out'], [t1 - 0.4, 'translate(470px,960px) rotate(8deg)'], [t1 + 0.6, 'translate(-300px,700px) rotate(8deg)', 'ease-in']]);
    T(mg, 'opacity', [[t0 + 2.0, 0], [t0 + 2.4, 1]]);
    T(sc.cam, 'transform', [[t0, 'scale(1)'], [t1 + 1, 'scale(1.05)']], 'linear');
    F.caption(73.0, 78.2, 'So what does history actually say? Let\'s look at the evidence.');
  })();

  /* ====================================================================== ACT 2 BACKDROP AND LABEL */
  (function () {
    var t0 = S.raso, t1 = S.closing + 0.6, bg = mk('g', {}, F.L2);
    F.rect(bg, -100, -100, 1280, 2120, 'url(#g-desk)');
    var r = F.rng(31), d = '';
    for (var i = 0; i < 40; i++) d += c((r() * 1080).toFixed(0), (r() * 1920).toFixed(0), (1 + r() * 2).toFixed(1), '#7fb3b0', 'opacity=".25"');
    F.g(bg, d + st('M60 1690 H1020', '#3e6b68', 2) + st('M60 1700 H1020', '#3e6b68', 1));
    T(bg, 'opacity', [[t0, 0], [t0 + 0.9, 1], [t1 - 0.6, 1], [t1, 0]]);
    T(bg, 'visibility', [[t0 - 0.02, 'hidden'], [t0, 'visible'], [t1, 'visible'], [t1 + 0.02, 'hidden']], 'linear');
    var lab = mk('g', {}, F.L2);
    F.text(lab, 540, 104, 'THE EVIDENCE', { size: 34, weight: 800, fill: '#9ed8d2', spacing: 9, anchor: 'middle' });
    F.text(lab, 540, 140, 'what the sources actually say', { font: '"Cormorant Garamond", serif', size: 28, style: 'italic', weight: 500, fill: '#d9e9e4', anchor: 'middle' });
    F.g(lab, st('M318 92 H388 M692 92 H762', '#9ed8d2', 2) + p('M288 92 l9 -9 l9 9 l-9 9 Z M774 92 l9 -9 l9 9 l-9 9 Z', '#9ed8d2'));
    T(lab, 'opacity', [[S.question + 0.4, 0], [S.question + 1.2, 1], [t1 - 0.6, 1], [t1, 0]]);
  })();

  /* ====================================================================== 1. THE PRITHVIRAJ RASO */
  (function () {
    var t0 = S.raso, t1 = S.vijaya, sc = scene(t0, t1), g = sc.cam;
    head(g, 600, 'PRITHVIRAJ RASO', 'an epic poem, credited to Chand Bardai', t0 + 0.4);
    // the stack of folios, which grows as later verses are added
    var stack = mk('g', {}, g);
    F.g(stack, '<g filter="url(#f-shadow-s)">' + folio(110, 820, 860, 250, 3) + '</g>');
    var top = F.g(stack, folio(110, 794, 860, 250, 5));
    rise(stack, t0 + 0.8, 1);
    var adds = [0, 1, 2, 3].map(function (k) {
      var a = F.g(stack, folio(110, 768 - k * 26, 860, 250, 11 + k) +
        '<g transform="translate(' + (930 - k * 70) + ',' + (790 - k * 26) + ')">' + c(0, 0, 26, C.gold) + st('M-12 0 H12 M0 -12 V12', INK, 6) + '</g>');
      var ta = 86.4 + k * 0.75;
      T(a, 'transform', [[ta, 'translate(700px,-40px) rotate(10deg)'], [ta + 0.55, 'translate(0px,0px) rotate(0deg)', 'ease-out']]);
      T(a, 'opacity', [[ta, 0], [ta + 0.2, 1]]);
      return a;
    });
    void top; void adds;
    // the timeline: when Prithviraj lived, and when the poem's surviving versions date from
    var tl = mk('g', {}, g), Y = 1330;
    var line = mk('path', { d: 'M130 ' + Y + ' H950', stroke: '#9ed8d2', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }, tl);
    F.draw(line, 85.2, 1.2);
    var aL = F.g(tl, c(170, Y, 16, C.crimson, 'stroke="#fff" stroke-width="4"'));
    F.text(aL, 170, Y + 76, '1192', { size: 58, weight: 800, fill: '#fff', anchor: 'middle' });
    F.text(aL, 170, Y + 118, 'Prithviraj dies', { font: '"Cormorant Garamond", serif', size: 32, style: 'italic', weight: 600, fill: '#d9e9e4', anchor: 'middle' });
    F.pop(aL.firstChild, 85.4); rise(aL, 85.4);
    var aR = F.g(tl, c(900, Y, 16, C.gold, 'stroke="#fff" stroke-width="4"'));
    F.text(aR, 900, Y + 76, '1500s +', { size: 58, weight: 800, fill: '#fff', anchor: 'middle' });
    F.text(aR, 900, Y + 118, 'oldest surviving versions', { font: '"Cormorant Garamond", serif', size: 32, style: 'italic', weight: 600, fill: '#d9e9e4', anchor: 'middle' });
    rise(aR, 86.2);
    var arc = mk('path', { d: 'M186 ' + (Y - 30) + ' C 360 ' + (Y - 160) + ', 710 ' + (Y - 160) + ', 884 ' + (Y - 30), stroke: C.gold, 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '1 0' }, tl);
    F.draw(arc, 86.6, 1.1);
    var lbl = mk('g', {}, tl);
    F.text(lbl, 540, Y - 132, 'CENTURIES LATER', { size: 36, weight: 800, fill: C.goldL, anchor: 'middle', spacing: 5 });
    rise(lbl, 87.3);
    var verdict = mk('g', {}, g);
    F.g(verdict, '<rect x="220" y="1500" width="640" height="84" rx="42" fill="#0d2224" stroke="#9ed8d2" stroke-width="2.5"/>');
    F.text(verdict, 540, 1555, 'poetry, not a record', { font: '"Cormorant Garamond", serif', size: 42, weight: 700, style: 'italic', fill: '#fff', anchor: 'middle' });
    rise(verdict, 89.0);
    T(sc.cam, 'transform', [[t0, 'scale(1.04)'], [t1 + 1, 'scale(1)']], 'linear');
    F.caption(78.8, 84.8, 'The whole story comes from one source: the Prithviraj Raso, an epic poem credited to Chand Bardai, Prithviraj\'s court poet.');
    F.caption(85.2, 91.2, 'But its surviving versions were written down centuries later, and are full of added verses. Historians read it as poetry, not a record.');
  })();

  /* ====================================================================== 2. THE PRITHVIRAJA VIJAYA */
  (function () {
    var t0 = S.vijaya, t1 = S.plates, sc = scene(t0, t1), g = sc.cam;
    head(g, 600, 'PRITHVIRAJA VIJAYA', 'Sanskrit poem, c. 1191–92, by Jayanaka', t0 + 0.4);
    // a birch-bark leaf, its lower right corner missing
    var leaf = mk('g', {}, g);
    var edge = 'M150 720 L 930 712 L 936 1010 C 920 1040, 940 1070, 912 1090 L 880 1132 C 850 1150, 860 1190, 820 1210 L 760 1300 L 160 1312 C 140 1200, 160 1100, 146 1000 C 160 900, 140 820, 150 720 Z';
    var bark = '';
    var r = F.rng(5);
    for (var i = 0; i < 46; i++) { var bx = 170 + r() * 740, by = 740 + r() * 540; bark += 'M' + bx.toFixed(0) + ' ' + by.toFixed(0) + ' h' + (12 + r() * 30).toFixed(0); }
    F.g(leaf, '<g filter="url(#f-shadow)"><path d="' + edge + '" fill="url(#g-bark)"/></g>' + st(bark, '#9b6e44', 3, 'opacity=".5"') +
      '<defs><clipPath id="cp-leaf"><path d="' + edge + '"/></clipPath></defs>' +
      '<g clip-path="url(#cp-leaf)">' + p(F.script(196, 790, 690, 13, 38, 21), 'none', 'stroke="#3a2412" stroke-width="2.6" stroke-linecap="round" opacity=".85"') + '</g>' +
      '<path d="' + edge + '" fill="none" stroke="#8a6440" stroke-width="2"/>');
    rise(leaf, t0 + 0.8, 1);
    var note = mk('g', {}, g);
    F.text(note, 540, 1384, 'its one known manuscript, found in Kashmir in 1875,', { font: '"Cormorant Garamond", serif', size: 34, style: 'italic', weight: 600, fill: '#d9e9e4', anchor: 'middle' });
    F.text(note, 540, 1426, 'is incomplete', { font: '"Cormorant Garamond", serif', size: 34, style: 'italic', weight: 700, fill: C.goldL, anchor: 'middle' });
    rise(note, t0 + 2.2);
    // search for her name
    var tS = 98.2, bar = mk('g', {}, g);
    F.g(bar, '<rect x="190" y="1480" width="700" height="96" rx="48" fill="#fff"/>' + '<g transform="translate(250,1528) scale(.2)">' + magnifier(90).replace(/#cfe6ff/g, '#cfe6ff') + '</g>');
    var q = F.text(bar, 300, 1544, '', { font: '"Cormorant Garamond", serif', size: 44, weight: 700, fill: INK });
    rise(bar, tS - 0.4, 0.6);
    var word = 'Sanyogita';
    for (var k = 1; k <= word.length; k++) {
      var tt = F.text(bar, 300, 1544, word.slice(0, k), { font: '"Cormorant Garamond", serif', size: 44, weight: 700, fill: INK });
      var ti = tS + k * 0.09;
      T(tt, 'opacity', k < word.length ? [[ti, 0], [ti + 0.01, 1], [ti + 0.09, 1], [ti + 0.1, 0]] : [[ti, 0], [ti + 0.01, 1]], 'linear');
    }
    void q;
    var res = mk('g', {}, bar);
    F.g(res, '<rect x="610" y="1498" width="260" height="60" rx="30" fill="' + RED + '"/>');
    F.text(res, 740, 1540, '0 results', { size: 32, weight: 800, fill: '#fff', anchor: 'middle', spacing: 2 });
    F.pop(res, 102.4, 0.5, '50% 50%');
    // the glass sweeps along the lines
    var mg = F.g(g, magnifier(92));
    var sweep = [[99.2, 'translate(240px,820px)'], [100.0, 'translate(840px,880px)'], [100.6, 'translate(240px,990px)'], [101.4, 'translate(820px,1080px)'], [102.1, 'translate(300px,1220px)']];
    T(mg, 'transform', sweep);
    T(mg, 'opacity', [[99.0, 0], [99.3, 1], [102.2, 1], [102.6, 0]]);
    T(sc.cam, 'transform', [[t0, 'scale(1.03)'], [t1 + 1, 'scale(1)']], 'linear');
    F.caption(91.8, 97.8, 'A poem from Prithviraj\'s own lifetime does exist: the Sanskrit Prithviraja Vijaya, by his court poet Jayanaka.');
    F.caption(98.2, 104.2, 'It praises his family, his court and his battles — but in the part that survives, Sanyogita never appears.');
  })();

  /* ====================================================================== 3. JAICHAND'S COPPER PLATES */
  (function () {
    var t0 = S.plates, t1 = S.echoes, sc = scene(t0, t1), g = sc.cam;
    head(g, 590, 'COPPER-PLATE GRANTS', 'issued by Jaichand (Jayachandra) of Kannauj', t0 + 0.4, 52);
    var shift = mk('g', { transform: 'translate(0,66)' }, g), pl = mk('g', {}, shift);
    function plate(x, rot, seed) {
      return '<g transform="rotate(' + rot + ' ' + (x + 190) + ' 990)"><g filter="url(#f-shadow-s)"><rect x="' + x + '" y="740" width="380" height="500" rx="18" fill="url(#g-copper)"/></g>' +
        '<rect x="' + (x + 14) + '" y="754" width="352" height="472" rx="12" fill="none" stroke="#e3a271" stroke-opacity=".4" stroke-width="2"/>' +
        c(x + 190, 772, 14, '#3a1a08') +
        p(F.script(x + 34, 820, 312, 11, 36, seed), 'none', 'stroke="#4a2008" stroke-width="2.4" stroke-linecap="round" opacity=".8"') + '</g>';
    }
    F.g(pl, plate(80, -3, 41) + plate(620, 3, 43));
    // the ring and seal joining them
    F.g(pl, '<path d="M270 770 C 270 640, 810 640, 810 770" fill="none" stroke="#7a3d16" stroke-width="16"/>' +
      '<g filter="url(#f-shadow-s)"><circle cx="540" cy="672" r="74" fill="url(#g-copper)"/></g><circle cx="540" cy="672" r="58" fill="none" stroke="#e3a271" stroke-opacity=".6" stroke-width="3"/>' +
      // Garuda, the bird on the Gahadavala seal
      p('M540 640 C 530 640, 524 650, 528 660 L 500 652 C 486 650, 478 660, 484 668 L 520 676 L 512 706 L 540 696 L 568 706 L 560 676 L 596 668 C 602 660, 594 650, 580 652 L 552 660 C 556 650, 550 640, 540 640 Z', '#4a2008'));
    rise(pl, t0 + 0.8, 1);
    // the callouts
    var hi = F.rect(shift, 110, 892, 330, 44, C.goldL, { rx: 8, opacity: 0, transform: 'rotate(-3 270 990)' });
    T(hi, 'opacity', [[105.6, 0], [106.0, 0.55], [113.4, 0.55]]);
    var c1 = mk('g', {}, shift);
    F.g(c1, '<rect x="120" y="1300" width="840" height="110" rx="20" fill="#0d2224" stroke="' + GREEN + '" stroke-width="3"/>' + mark('yes', 186, 1355, 34));
    F.text(c1, 244, 1346, 'names his son and heir', { font: '"Cormorant Garamond", serif', size: 34, style: 'italic', weight: 600, fill: '#d9e9e4' });
    F.text(c1, 244, 1390, 'HARISHCHANDRA', { size: 44, weight: 800, fill: '#fff', spacing: 4 });
    rise(c1, 106.2);
    var c2 = mk('g', {}, shift);
    F.g(c2, '<rect x="120" y="1432" width="840" height="110" rx="20" fill="#0d2224" stroke="#8aa" stroke-width="3" stroke-dasharray="10 8"/>' + mark('maybe', 186, 1487, 34));
    F.text(c2, 244, 1478, 'a daughter?', { font: '"Cormorant Garamond", serif', size: 34, style: 'italic', weight: 600, fill: '#d9e9e4' });
    F.text(c2, 244, 1522, 'NOT NAMED', { size: 44, weight: 800, fill: '#9fb6b4', spacing: 4 });
    rise(c2, 107.6);
    T(sc.cam, 'transform', [[t0, 'scale(1.03)'], [t1 + 1, 'scale(1)']], 'linear');
    F.caption(104.8, 109.0, 'Jaichand\'s own copper-plate grants name his son and heir, Harishchandra — but never a daughter.');
    F.caption(109.3, 113.2, 'Then again, grants like these rarely named daughters at all.');
  })();

  /* ====================================================================== 4. MANY NAMES */
  (function () {
    var t0 = S.echoes, t1 = S.map, sc = scene(t0, t1), g = sc.cam;
    head(g, 600, 'ONE PRINCESS, MANY NAMES', null, t0 + 0.4, 50);
    F.glow(g, 540, 1130, 520, 'g-warm', 0.5);
    var herWrap = mk('g', {}, g), her = F.fig(herWrap, A.sanyogita(), 382, 800, 1.05);
    her.el.style.filter = 'brightness(0) drop-shadow(0 0 10px rgba(255,210,120,.9))';
    var vt = her.q('.veil-tail'); vt.style.transformOrigin = '112px 238px';
    L(vt, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(6deg)' }], t0, 1.8, { box: false });
    rise(herWrap, t0 + 0.6, 1.2);
    var names = [
      ['Sanyogita', 250, 780, 'Cinzel, serif', 60, 800, '', C.goldL],
      ['संयोगिता', 850, 840, '"Yatra One", serif', 64, 400, '', '#fff'],
      ['Sanjogita', 240, 1060, '"Cormorant Garamond", serif', 66, 700, 'italic', '#f3d489'],
      ['Samyukta', 850, 1120, '"Playfair Display", serif', 62, 800, 'italic', '#fff'],
      ['संयुक्ता', 230, 1330, '"Yatra One", serif', 62, 400, '', C.goldL],
      ['Sanyukta', 850, 1400, 'Cinzel, serif', 54, 800, '', '#f3d489']
    ];
    names.forEach(function (n, i) {
      var gg = mk('g', {}, g);
      F.text(gg, n[1], n[2], n[0], { font: n[3], size: n[4], weight: n[5], style: n[6] || undefined, fill: n[7], anchor: 'middle' });
      var ta = 114.2 + i * 0.9;
      T(gg, 'opacity', [[ta, 0], [ta + 0.6, 1], [t1 - 0.3, 1], [t1, 0]]);
      T(gg, 'transform', [[ta, 'translateY(30px) scale(.9)'], [ta + 0.8, 'translateY(0px) scale(1)', 'ease-out'], [t1, 'translateY(-26px) scale(1)']]);
      F.origin(gg);
    });
    T(sc.cam, 'transform', [[t0, 'scale(1)'], [t1 + 1, 'scale(1.06)']], 'linear');
    F.caption(113.8, 122.2, 'Later tellings don\'t even agree on her name — Sanyogita, Sanjogita, Samyukta — or on what became of her.');
  })();

  /* ====================================================================== 5. THE MAP: two rival kingdoms */
  (function () {
    var t0 = S.map, t1 = S.verdict, sc = scene(t0, t1), g = sc.cam;
    head(g, 590, 'TWO RIVAL KINGDOMS', 'north India in the late 1100s (approximate)', t0 + 0.4, 52);
    function P(lon, lat) { return [60 + (lon - 73.5) * 87.3, 690 + (31 - lat) * 87.3]; }
    function path(pts) { return pts.map(function (q, i) { var xy = P(q[0], q[1]); return (i ? (i === 1 ? ' C ' : ' ') : 'M') + xy[0].toFixed(0) + ' ' + xy[1].toFixed(0); }).join(''); }
    var map = mk('g', {}, g);
    F.g(map, '<rect x="50" y="680" width="980" height="660" rx="24" fill="#0f2a2b" stroke="#3e6b68" stroke-width="3"/>');
    // kingdoms (schematic)
    var chau = 'M90 1190 C 100 1080, 150 980, 230 900 C 300 830, 360 760, 430 760 C 480 800, 470 900, 440 980 C 410 1060, 360 1160, 300 1220 C 220 1250, 130 1240, 90 1190 Z';
    var gaha = 'M500 900 C 560 860, 660 880, 760 940 C 860 1000, 960 1040, 1010 1100 C 1010 1170, 960 1220, 880 1230 C 780 1230, 700 1190, 620 1130 C 560 1080, 500 1010, 480 960 C 476 930, 484 910, 500 900 Z';
    var k1 = F.g(map, p(chau, C.saffron, 'opacity=".55"') + p(chau, 'none', 'stroke="' + C.saffron + '" stroke-width="3"'));
    var k2 = F.g(map, p(gaha, '#2f8a5a', 'opacity=".6"') + p(gaha, 'none', 'stroke="#56c48a" stroke-width="3"'));
    // rivers
    var yam = mk('path', { d: path([[78.45, 31], [77.4, 30.0], [77.2, 28.6], [78.0, 27.18]]) + ' S ' + P(79.0, 26.77).join(' ') + ' ' + P(81.85, 25.43).join(' '), stroke: '#5fb6e8', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }, map);
    var gan = mk('path', { d: path([[78.16, 29.95], [78.7, 28.9], [79.0, 28.3], [79.92, 27.05]]) + ' S ' + P(81.0, 25.9).join(' ') + ' ' + P(81.85, 25.43).join(' ') + ' S ' + P(83.0, 25.32).join(' ') + ' ' + P(84.5, 25.6).join(' '), stroke: '#5fb6e8', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }, map);
    rise(map, t0 + 0.8, 0.8);
    F.draw(yam, t0 + 1.2, 1.4); F.draw(gan, t0 + 1.4, 1.6);
    F.fade(k1, 123.2, undefined, 0.8); F.fade(k2, 124.4, undefined, 0.8);
    function city(lon, lat, name, t, col, dx, dy, anchor) {
      var xy = P(lon, lat), gg = mk('g', {}, map);
      F.g(gg, c(xy[0], xy[1], 11, col || '#fff', 'stroke="#0f2a2b" stroke-width="3"'));
      F.text(gg, xy[0] + (dx || 0), xy[1] + (dy || -20), name, { size: 30, weight: 800, fill: '#fff', anchor: anchor || 'middle', spacing: 2 });
      F.pop(gg, t, 0.5, '50% 50%');
      return gg;
    }
    city(74.64, 26.45, 'AJMER', 123.6, C.saffron, 0, 44);
    city(77.21, 28.61, 'DELHI', 123.9, C.saffron, -18, -20, 'end');
    city(79.92, 27.05, 'KANNAUJ', 124.7, '#56c48a', 18, -18, 'start');
    city(83.0, 25.32, 'VARANASI', 125.0, '#56c48a', 0, 46);
    var l1 = mk('g', {}, map); F.text(l1, 250, 1000, 'CHAUHANS', { size: 34, weight: 800, fill: '#ffd59a', anchor: 'middle', spacing: 3 }); F.text(l1, 250, 1036, 'Prithviraj', { font: '"Cormorant Garamond", serif', size: 32, style: 'italic', weight: 700, fill: '#fff', anchor: 'middle' }); rise(l1, 125.4);
    var l2 = mk('g', {}, map); F.text(l2, 790, 1104, 'GAHADAVALAS', { size: 34, weight: 800, fill: '#a8ecc4', anchor: 'middle', spacing: 3 }); F.text(l2, 790, 1140, 'Jaichand', { font: '"Cormorant Garamond", serif', size: 32, style: 'italic', weight: 700, fill: '#fff', anchor: 'middle' }); rise(l2, 125.8);
    // the invader's two campaigns
    function strike(from, lon, lat, label, t, dx) {
      var to = P(lon, lat), gg = mk('g', {}, map);
      var ar = mk('path', { d: 'M' + from[0] + ' ' + from[1] + ' Q ' + ((from[0] + to[0]) / 2 + 40) + ' ' + ((from[1] + to[1]) / 2 - 80) + ' ' + to[0] + ' ' + to[1], stroke: RED, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '1 0' }, gg);
      F.draw(ar, t, 0.9, 'ease-in');
      var boom = F.g(gg, '<circle cx="' + to[0] + '" cy="' + to[1] + '" r="26" fill="' + RED + '"/><circle cx="' + to[0] + '" cy="' + to[1] + '" r="40" fill="none" stroke="' + RED + '" stroke-width="4"/>' +
        p('M' + to[0] + ' ' + (to[1] - 14) + ' l5 10 l11 1 l-8 7 l3 11 l-11 -6 l-11 6 l3 -11 l-8 -7 l11 -1 Z', '#fff'));
      F.pop(boom, t + 0.85, 0.5);
      var tx = mk('g', {}, gg);
      F.text(tx, to[0] + (dx || 0), to[1] - 52, label, { size: 30, weight: 800, fill: '#ffb3a8', anchor: 'middle', spacing: 1 });
      rise(tx, t + 1.0, 0.6);
      return gg;
    }
    strike([90, 700], 76.92, 29.8, 'TARAIN 1192', 127.0, 60);
    strike(P(77.0, 29.2), 78.4, 27.15, 'CHANDAWAR 1194', 130.4, 40);
    var note = mk('g', {}, g);
    F.g(note, '<rect x="120" y="1380" width="840" height="150" rx="22" fill="#0d2224" stroke="#9ed8d2" stroke-width="2.5"/>' + mark('no', 196, 1455, 38));
    F.text(note, 262, 1440, 'Jaichand\'s "betrayal"', { size: 36, weight: 800, fill: '#fff', spacing: 1 });
    F.text(note, 262, 1486, 'no source of the time says so', { font: '"Cormorant Garamond", serif', size: 34, style: 'italic', weight: 600, fill: '#d9e9e4' });
    rise(note, 131.6);
    T(sc.cam, 'transform', [[t0, 'scale(1.02)'], [t1 + 1, 'scale(1)']], 'linear');
    F.caption(122.8, 129.3, 'What is real is the rivalry: Jaichand of the Gahadavala dynasty ruled Kannauj and Varanasi, while Prithviraj ruled from Ajmer to Delhi.');
    F.caption(129.7, 136.2, 'And no source of the time says Jaichand betrayed him. He fell to the same invader at Chandawar, in 1194.');
  })();

  /* ====================================================================== 6. THE VERDICT */
  (function () {
    var t0 = S.verdict, t1 = S.closing, sc = scene(t0, t1), g = sc.cam;
    var card = mk('g', {}, g);
    F.g(card, '<g filter="url(#f-shadow)"><rect x="70" y="560" width="940" height="1040" rx="26" fill="url(#g-paper)"/></g>' +
      '<rect x="92" y="582" width="896" height="996" rx="18" fill="none" stroke="' + C.crimson + '" stroke-width="3"/>');
    F.text(card, 540, 668, 'LEGEND  vs  HISTORY', { size: 54, weight: 800, fill: INK, anchor: 'middle', spacing: 3 });
    F.g(card, st('M180 704 H900', C.goldD, 3));
    rise(card, t0 + 0.3, 0.9);
    var rows = [
      ['yes', 'Prithviraj Chauhan', 'a real king'],
      ['yes', 'Jaichand of Kannauj', 'a real king'],
      ['yes', 'Tarain, 1192', 'a real battle'],
      ['yes', 'Their rivalry', 'very likely'],
      ['maybe', 'Princess Sanyogita', 'not proven'],
      ['no', 'The statue at the door', 'no evidence'],
      ['no', 'Jaichand\'s betrayal', 'no evidence']
    ];
    rows.forEach(function (r, i) {
      var y = 790 + i * 112, gg = mk('g', {}, card), ta = 137.6 + i * 1.45;
      F.text(gg, 200, y + 2, r[1], { font: '"Cormorant Garamond", serif', size: 46, weight: 700, fill: INK });
      F.text(gg, 200, y + 42, r[2], { font: '"Cormorant Garamond", serif', size: 32, style: 'italic', weight: 600, fill: r[0] === 'yes' ? '#2c7a4a' : r[0] === 'no' ? '#b0302a' : '#a8741a' });
      rise(gg, ta, 0.5);
      var m = F.g(card, mark(r[0], 140, y + 4, 34));
      F.pop(m, ta + 0.3, 0.45);
      if (i < rows.length - 1) F.g(card, st('M130 ' + (y + 64) + ' H950', '#c9b78e', 1.5));
    });
    // the big stamp on Sanyogita's row
    var stamp = mk('g', {}, card);
    F.g(stamp, '<rect x="580" y="1186" width="330" height="96" rx="10" fill="none" stroke="' + AMBER + '" stroke-width="7"/>');
    F.text(stamp, 745, 1252, 'UNPROVEN', { size: 50, weight: 800, fill: AMBER, anchor: 'middle', spacing: 4 });
    stamp.setAttribute('transform', 'rotate(-8 745 1234)');
    var sw = mk('g', {}, card); sw.appendChild(stamp);
    F.origin(sw);
    T(sw, 'transform', [[144.4, 'scale(2.4)'], [144.75, 'scale(1)', 'ease-in']]);
    T(sw, 'opacity', [[144.4, 0], [144.55, 1]]);
    T(sc.cam, 'transform', [[t0, 'scale(1.02)'], [t1 + 1, 'scale(1)']], 'linear');
    F.caption(136.8, 143.0, 'So, was Sanyogita real? Many historians see the romance as a poet\'s invention.');
    F.caption(143.4, 150.2, 'Others think a real princess and a real elopement may lie behind it — remembered, and embellished, by the bards.');
  })();
})(window.Film);
