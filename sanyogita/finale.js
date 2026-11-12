/* finale.js — the closing thought, and the channel outro (samistlei). Laid out natively at 1080 x 1920. */
(function (F) {
  'use strict';
  var A = F.A, C = F.C, mk = F.mk, T = F.T, L = F.L, S = F.S, p = A.p, st = A.st, c = A.c;
  var CHANNEL = 'samistlei';

  function rise(el, t, d) {
    d = d || 0.8;
    T(el, 'opacity', [[t, 0], [t + d * 0.8, 1]]);
    T(el, 'transform', [[t, 'translateY(26px)'], [t + d, 'translateY(0px)']], 'ease-out');
    return el;
  }

  /* ====================================================================== CLOSING */
  (function () {
    var t0 = S.closing, t1 = S.outro, sc = F.scene(F.L2, t0, t1, 1.0, '540px 960px'), g = sc.cam;
    F.rect(g, -100, -100, 1280, 2120, 'url(#g-dusk)');
    F.glow(g, 540, 1180, 900, 'g-sun', 0.8);
    mk('circle', { cx: 540, cy: 1180, r: 250, fill: '#fff0bd', opacity: 0.9 }, g);
    F.g(g, F.city(1470, '#7a2a52', 61, -80, 1160, 0.55, '#ffd27a'));
    F.g(g, p('M-100 1520 C 200 1440, 400 1460, 540 1452 C 700 1444, 900 1470, 1180 1430 V2020 H-100 Z', '#3a1030'));
    var her = F.fig(g, A.sanyogita(), 352, 890, 0.98);
    F.origin(her.el, '50% 100%');
    L(her.el, [{ transform: 'rotate(-0.6deg)' }, { transform: 'rotate(0.7deg)' }], t0, 2.4, { origin: '50% 100%' });
    var vt = her.q('.veil-tail'); vt.style.transformOrigin = '112px 238px';
    L(vt, [{ transform: 'rotate(4deg)' }, { transform: 'rotate(14deg)' }], t0, 1.6, { box: false });
    F.pose(her.q('.na1'), [[t0, -10], [t0 + 2, -24], [t1, -24]]);
    F.pose(her.q('.na2'), [[t0, -62], [t0 + 2, -128], [t1, -128]]);
    // she holds a little lamp
    var lamp = F.g(her.q('.na2 .hand'), '<g transform="translate(0,62) rotate(-40)">' + p('M-26 0 C -20 18, 20 18, 26 0 Z', '#8a4526') + '<ellipse cx="0" cy="0" rx="26" ry="5" fill="#e9a941"/>' +
      '<g class="fl">' + p('M0 -2 C -10 -10, -8 -24, 0 -38 C 8 -24, 10 -10, 0 -2 Z', '#ffd27a') + '</g><circle cx="0" cy="-20" r="70" fill="url(#g-warm)"/></g>');
    L(lamp.querySelector('.fl'), [{ transform: 'scale(1,1)' }, { transform: 'scale(.9,1.1)' }], t0, 0.34, { origin: '50% 100%' });
    var words = mk('g', { filter: 'url(#f-glowtxt)' }, g);
    F.text(words, 540, 700, 'IN POETRY,', { size: 76, weight: 800, fill: 'url(#g-gold)', anchor: 'middle', spacing: 6 });
    F.text(words, 540, 790, 'NOT IN STONE', { size: 76, weight: 800, fill: 'url(#g-gold)', anchor: 'middle', spacing: 6 });
    rise(words, t0 + 1.2, 1.2);
    T(sc.cam, 'transform', [[t0, 'scale(1.08)'], [t1 + 1, 'scale(1)']], 'ease-out');
    F.caption(150.8, 155.8, 'Sanyogita lives in poetry, not in stone.');
    F.caption(156.1, 161.2, 'But for eight hundred years, people have kept her story alive — and that is part of history too.');
  })();

  /* ====================================================================== OUTRO: subscribe to samistlei */
  (function () {
    var t0 = S.outro, t1 = S.end, sc = F.scene(F.L2, t0, t1, 0.9, '540px 960px'), g = sc.cam;
    var NY = 900, BY = 1150, tClick = 168.6;
    F.rect(g, -100, -100, 1280, 2120, 'url(#g-stage)');
    F.glow(g, 540, NY - 40, 760, 'g-warm', 0.45);
    // a slowly turning mandala behind the name
    var md = mk('g', {}, g), ring = '';
    for (var k = 0; k < 24; k++) {
      var a = k * 15;
      ring += '<ellipse cx="540" cy="' + (NY - 280) + '" rx="19" ry="58" fill="none" stroke="' + C.gold + '" stroke-width="3" transform="rotate(' + a + ' 540 ' + NY + ')"/>';
      ring += c(540, NY - 362, 5, C.goldD, 'transform="rotate(' + (a + 7.5) + ' 540 ' + NY + ')"');
    }
    md.innerHTML = ring + '<circle cx="540" cy="' + NY + '" r="206" fill="none" stroke="' + C.goldD + '" stroke-width="2"/><circle cx="540" cy="' + NY + '" r="380" fill="none" stroke="' + C.goldD + '" stroke-width="2"/>';
    md.setAttribute('opacity', '.26');
    md.style.transformOrigin = '540px ' + NY + 'px';
    L(md, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], t0, 60, { box: false, direction: 'normal', easing: 'linear' });
    F.pop(md, t0 + 0.2, 1.2);

    var thx = mk('g', {}, g);
    F.text(thx, 540, 640, 'THANKS FOR WATCHING', { size: 44, weight: 800, fill: '#f3d489', anchor: 'middle', spacing: 6 });
    rise(thx, t0 + 0.4);

    // the channel name: keep the font's own spacing; letters fade in one after another, then the word settles
    var nm = mk('g', { filter: 'url(#f-glowtxt)' }, g), pop = mk('g', {}, nm);
    var word = F.text(pop, 540, NY + 52, '', { font: '"Playfair Display", serif', size: 172, weight: 800, style: 'italic', fill: 'url(#g-gold)', anchor: 'middle' });
    CHANNEL.split('').forEach(function (ch, i) {
      var ts = document.createElementNS(F.NS, 'tspan'); ts.textContent = ch; word.appendChild(ts);
      var ta = t0 + 0.9 + i * 0.1;
      T(ts, 'fillOpacity', [[ta, 0], [ta + 0.25, 1]], 'linear');
    });
    F.origin(pop);
    T(pop, 'transform', [[t0 + 0.8, 'scale(.86)'], [t0 + 1.9, 'scale(1.04)', 'ease-out'], [t0 + 2.3, 'scale(1)']]);
    var at = mk('g', {}, g);
    F.text(at, 540, NY + 130, '@' + CHANNEL, { font: '"Cormorant Garamond", serif', size: 44, weight: 600, style: 'italic', fill: '#efe2c2', anchor: 'middle' });
    rise(at, t0 + 2.4);
    F.O = F.O || {}; F.O.sparkY = NY;

    // the subscribe button and its bell
    var btn = mk('g', {}, g), press = mk('g', {}, btn);
    F.origin(press);
    var red = F.rect(press, 250, BY, 480, 120, '#e8202e', { rx: 60 });
    var grey = F.rect(press, 250, BY, 480, 120, '#3a3036', { rx: 60, opacity: 0 });
    var sub = F.text(press, 490, BY + 78, 'SUBSCRIBE', { size: 50, weight: 800, fill: '#fff', anchor: 'middle', spacing: 4 });
    var done = mk('g', { opacity: 0 }, press);
    F.g(done, st('M290 ' + (BY + 60) + ' l18 18 l34 -38', '#fff', 10));
    F.text(done, 532, BY + 75, 'SUBSCRIBED', { size: 42, weight: 800, fill: '#fff', anchor: 'middle', spacing: 3 });
    rise(btn, t0 + 3.2);
    T(press, 'transform', [[tClick - 0.12, 'scale(1)'], [tClick, 'scale(.92)'], [tClick + 0.22, 'scale(1.06)', 'ease-out'], [tClick + 0.45, 'scale(1)']]);
    T(grey, 'opacity', [[tClick, 0], [tClick + 0.15, 1]]);
    T(red, 'opacity', [[tClick, 1], [tClick + 0.15, 0]]);
    T(sub, 'opacity', [[tClick, 1], [tClick + 0.1, 0]]);
    T(done, 'opacity', [[tClick + 0.08, 0], [tClick + 0.25, 1]]);
    F.O.clickEl = red; F.O.clickT = tClick;

    var bell = mk('g', {}, g), bs = mk('g', {}, bell);
    F.g(bs, '<circle cx="830" cy="' + (BY + 60) + '" r="60" fill="#2a1a22" stroke="' + C.gold + '" stroke-width="4"/>' +
      p('M830 ' + (BY + 22) + ' C 806 ' + (BY + 22) + ', 798 ' + (BY + 44) + ', 798 ' + (BY + 62) + ' L 792 ' + (BY + 82) + ' H 868 L 862 ' + (BY + 62) + ' C 862 ' + (BY + 44) + ', 854 ' + (BY + 22) + ', 830 ' + (BY + 22) + ' Z', C.goldL) +
      c(830, BY + 92, 8, C.goldL) + c(830, BY + 18, 5, C.goldL));
    rise(bell, t0 + 3.5);
    bs.style.transformOrigin = '830px ' + (BY + 18) + 'px';
    var ring2 = [], tb = 170.2;
    [0, -18, 16, -14, 11, -8, 5, 0].forEach(function (a, i) { ring2.push([tb + i * 0.11, 'rotate(' + a + 'deg)']); });
    T(bs, 'transform', ring2);
    var waves = F.g(bell, st('M902 ' + (BY + 30) + ' q 16 30 0 60 M922 ' + (BY + 16) + ' q 26 44 0 88 M758 ' + (BY + 30) + ' q -16 30 0 60 M738 ' + (BY + 16) + ' q -26 44 0 88', C.goldL, 5));
    T(waves, 'opacity', [[tb, 0], [tb + 0.1, 1], [tb + 0.9, 1], [tb + 1.2, 0]]);

    // a hand pointer glides in, clicks the button, then the bell
    var hand = mk('g', {}, g), hs = mk('g', {}, hand);
    hs.innerHTML = p('M0 0 L 0 64 L 16 50 L 28 78 L 40 72 L 28 46 L 50 46 Z', '#fff', 'stroke="#1c1014" stroke-width="5" stroke-linejoin="round"');
    F.origin(hs, '0% 0%');
    T(hand, 'transform', [[tClick - 1.5, 'translate(1000px,1660px)'], [tClick - 0.15, 'translate(500px,' + (BY + 62) + 'px)', 'ease-out'], [tClick + 0.7, 'translate(500px,' + (BY + 62) + 'px)'],
      [tb - 0.15, 'translate(842px,' + (BY + 70) + 'px)', 'ease-in-out'], [tb + 1.0, 'translate(842px,' + (BY + 70) + 'px)'], [tb + 2.0, 'translate(1150px,1500px)', 'ease-in']]);
    T(hand, 'opacity', [[tClick - 1.5, 0], [tClick - 1.2, 1]]);
    T(hs, 'transform', [[tClick - 0.12, 'scale(1)'], [tClick, 'scale(.82)'], [tClick + 0.2, 'scale(1)'], [tb - 0.12, 'scale(1)'], [tb, 'scale(.82)'], [tb + 0.2, 'scale(1)']]);

    var more = mk('g', {}, g);
    F.text(more, 540, BY + 260, 'more true stories from Indian history', { font: '"Cormorant Garamond", serif', size: 46, weight: 700, style: 'italic', fill: '#f3d489', anchor: 'middle' });
    F.text(more, 540, BY + 320, 'every week', { font: '"Cormorant Garamond", serif', size: 40, weight: 600, style: 'italic', fill: '#efe2c2', anchor: 'middle' });
    rise(more, 171.6);
    T(sc.cam, 'transform', [[t0, 'scale(1.06)'], [t0 + 2.5, 'scale(1)', 'ease-out'], [t1, 'scale(1.02)']]);
    F.caption(162.0, 168.0, 'Thanks for watching! Subscribe to samistlei for more true stories from history.');
    F.caption(168.4, 177.6, 'Hit the bell so you never miss the next one.');
  })();
})(window.Film);
