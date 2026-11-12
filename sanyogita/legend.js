/* legend.js — the opening title and Act 1: the legend, staged as a jewel-coloured paper theatre. */
(function (F) {
  'use strict';
  var A = F.A, C = F.C, mk = F.mk, T = F.T, L = F.L, S = F.S, film = F.film, p = A.p, st = A.st, c = A.c;

  /* ====================================================================== OPENING */
  (function () {
    var t0 = S.open, sc = F.scene(F.L3, t0, S.kannauj, 0.9, '540px 960px'), g = sc.cam;
    F.rect(g, -100, -100, 1280, 2120, 'url(#g-open)');
    var gl = F.glow(g, 540, 1180, 900, 'g-warm', 0.3);
    L(gl, [{ opacity: 0.2 }, { opacity: 0.36 }], 0, 1.7, { box: false });

    // a manuscript page on which her portrait is drawn, line by line
    var page = mk('g', {}, mk('g', {}, g));
    var rot = mk('g', { transform: 'rotate(-3 480 540)' }, page);
    F.g(rot, '<g filter="url(#f-shadow)"><rect x="190" y="118" width="580" height="844" rx="6" fill="url(#g-paper)"/></g>' +
      '<rect x="214" y="142" width="532" height="796" fill="none" stroke="#b3202e" stroke-width="3"/>' +
      '<rect x="225" y="153" width="510" height="774" fill="none" stroke="#b98622" stroke-width="1.6"/>' +
      p(F.script(250, 868, 460, 2, 26, 5), 'none', 'stroke="#6b4a2a" stroke-width="2" stroke-linecap="round" opacity=".55"'));
    F.fade(page, 0.3, undefined, 1.2);
    // centred under the captions; at the title it slides down and shrinks
    T(page.parentNode, 'transform', [[0.3, 'translate(60px,640px) scale(1)'], [1.8, 'translate(60px,600px) scale(1)', 'ease-out'], [8.4, 'translate(60px,600px) scale(1)'], [9.6, 'translate(166px,890px) scale(.78)']]);

    var ink = F.fig(rot, A.sanyogita(), 322, 196, 1.02), col = F.fig(rot, A.sanyogita(), 322, 196, 1.02);
    // turn one copy into an ink drawing: outlines only, limbs as outlined strokes
    var els = Array.prototype.slice.call(ink.qa('path,circle,ellipse,rect'));
    els.forEach(function (e, i) {
      var isLine = e.getAttribute('fill') === 'none' || !e.getAttribute('fill');
      var f = i / els.length, ts = 1.3 + f * 4.6, d = 1.3;
      e.removeAttribute('stroke-dasharray'); e.removeAttribute('opacity');
      if (isLine) {
        var w = parseFloat(e.getAttribute('stroke-width')) || 2;
        if (w > 8) {
          var inner = e.cloneNode(false); inner.setAttribute('stroke', '#f1e5c6'); inner.setAttribute('stroke-width', w - 1.2); e.after(inner);
          e.setAttribute('stroke', '#3b2416'); e.setAttribute('stroke-width', w + 3);
          F.draw(inner, ts, d);
        } else { e.setAttribute('stroke', '#3b2416'); e.setAttribute('stroke-width', Math.min(w, 2.4)); }
      } else {
        e.setAttribute('fill', '#f1e5c6'); e.setAttribute('stroke', '#3b2416'); e.setAttribute('stroke-width', 2.2); e.setAttribute('stroke-linejoin', 'round');
        T(e, 'fillOpacity', [[ts, 0], [ts + 0.5, 1]]);
      }
      F.draw(e, ts, d);
    });
    T(col.el, 'opacity', [[8.3, 0], [9.6, 1]]);

    // a small clay lamp by the page
    var diya = F.g(mk('g', { transform: 'translate(760,690) scale(1.15)' }, g), p('M96 950 C 110 992, 214 992, 228 950 Z', '#8a4526') + '<ellipse cx="162" cy="950" rx="66" ry="11" fill="#e9a941"/>' +
      '<g class="fl">' + p('M162 946 C 140 930, 144 902, 162 872 C 180 902, 184 930, 162 946 Z', '#ffd27a') + p('M162 942 C 152 932, 154 918, 162 902 C 170 918, 172 932, 162 942 Z', '#ff8a3a') + '</g>');
    F.glow(diya, 162, 910, 190, 'g-warm', 0.8);
    L(diya.querySelector('.fl'), [{ transform: 'scale(1,1) rotate(-2deg)' }, { transform: 'scale(.93,1.08) rotate(3deg)' }], 0, 0.36, { origin: '50% 100%' });
    F.fade(diya, 0.2, undefined, 1);

    // the title
    var tt = mk('g', {}, g), X = 540;
    function line(el, t) {
      T(el, 'opacity', [[t, 0], [t + 0.9, 1]]);
      T(el, 'transform', [[t, 'translateY(26px)'], [t + 1.0, 'translateY(0px)']], 'ease-out');
    }
    line(F.text(tt, X, 214, 'THE HISTORICAL TRUTH ABOUT', { size: 34, weight: 600, anchor: 'middle', spacing: 11, fill: '#e9d9b4' }), 8.8);
    var big = mk('g', { filter: 'url(#f-glowtxt)' }, tt);
    line(F.text(big, X, 366, 'RANI', { size: 140, weight: 800, anchor: 'middle', spacing: 10, fill: 'url(#g-gold)' }), 9.2);
    line(F.text(big, X, 506, 'SANYOGITA', { size: 120, weight: 800, anchor: 'middle', spacing: 2, fill: 'url(#g-gold)' }), 9.5);
    var dv = F.g(tt, st('M' + (X - 300) + ' 560 H' + (X - 26) + ' M' + (X + 26) + ' 560 H' + (X + 300), C.gold, 3) + p('M' + (X - 14) + ' 560 l14 -14 l14 14 l-14 14 Z', C.gold));
    F.fade(dv, 10.0, undefined, 0.8);
    line(F.text(tt, X, 652, 'रानी संयोगिता', { font: '"Yatra One", serif', size: 68, weight: 400, anchor: 'middle', fill: C.ivory }), 10.2);
    line(F.text(tt, X, 738, 'Wife of Prithviraj Chauhan', { font: '"Cormorant Garamond", serif', size: 56, weight: 500, style: 'italic', anchor: 'middle', fill: '#f3d489' }), 10.6);

    T(sc.cam, 'transform', [[0, 'scale(1)'], [S.kannauj + 1, 'scale(1.06)']], 'linear');
    F.caption(1.2, 5.0, 'Everyone knows the love story of Sanyogita and Prithviraj Chauhan.');
    F.caption(5.4, 8.6, 'But how much of it really happened?');
  })();

  /* The whole legend lives in one group, so that at the end it can shrink into a painted page on the historian's desk. */
  var wrap = F.legendWrap = F.world;

  // Prithviraj in the saddle (and, on the night ride, Sanyogita behind him). Drawn in the horse's own coordinates.
  function riders(horse, withHer) {
    var m = '';
    if (withHer) {
      m += p('M168 132 C 156 176, 160 226, 180 260 L 242 250 C 232 208, 230 168, 226 130 Z', C.teal) + st('M180 260 L 242 250', C.gold, 7) +
        '<g transform="translate(116,-46) scale(.6)"><g class="her" clip-path="url(#cp-waist-f)">' + A.sanyogita() + '</g></g>';
    }
    m += p('M232 126 C 222 160, 226 196, 244 218 L 302 210 C 304 176, 298 146, 290 124 Z', C.teal) + st('M244 218 L 302 210', C.gold, 6) +
      st('M270 196 L 282 262', C.ivory, 15) + p('M270 262 C 282 256, 300 262, 310 256 C 314 266, 306 276, 292 276 L 272 276 Z', C.crimson) +
      '<g transform="translate(169,-68) scale(.62)"><g class="him" clip-path="url(#cp-waist-m)">' + A.prithviraj() + '</g></g>' +
      st('M331 100 C 372 120, 420 116, 452 102', C.gold, 3);
    var r = mk('g', {}, horse.el); r.innerHTML = m;
    var him = r.querySelector('.him');
    him.querySelector('.na1').style.transform = 'rotate(-40deg)'; him.querySelector('.na2').style.transform = 'rotate(-50deg)';
    if (withHer) {
      var her = r.querySelector('.her');
      her.querySelector('.na1').style.transform = 'rotate(-62deg)'; her.querySelector('.na2').style.transform = 'rotate(-24deg)';
      var vt = her.querySelector('.veil-tail'); vt.style.transformOrigin = '112px 238px';
      horse.veil = vt;
    }
    return r;
  }
  F.g(film, '<defs><clipPath id="cp-waist-m"><rect x="-40" y="-40" width="380" height="372"/></clipPath><clipPath id="cp-waist-f"><rect x="-40" y="-40" width="380" height="350"/></clipPath></defs>');

  function gallop(h, t0, per) {
    function leg(cls, a, b, lag) {
      L(h.q('.' + cls + 'u'), [{ transform: 'rotate(' + a[0] + 'deg)' }, { transform: 'rotate(' + b[0] + 'deg)' }], t0 - lag, per, { box: false });
      L(h.q('.' + cls + 'l'), [{ transform: 'rotate(' + a[1] + 'deg)' }, { transform: 'rotate(' + b[1] + 'deg)' }], t0 - lag, per, { box: false });
    }
    leg('fn', [-58, 6], [24, 78], 0); leg('ff', [-50, 4], [30, 82], 0.05);
    leg('hn', [52, 6], [-46, 58], 0.02); leg('hf', [46, 8], [-40, 62], 0.07);
    L(h.el, [{ transform: 'translateY(7px) rotate(1.6deg)' }, { transform: 'translateY(-11px) rotate(-2.6deg)' }], t0, per, { origin: '50% 60%' });
    var tail = h.q('.tail'); tail.style.transformOrigin = '104px 170px';
    L(tail, [{ transform: 'rotate(18deg)' }, { transform: 'rotate(34deg)' }], t0, per * 1.3, { box: false });
    var mane = h.q('.mane'); mane.style.transformOrigin = '380px 80px';
    L(mane, [{ transform: 'skewX(-4deg)' }, { transform: 'skewX(-14deg)' }], t0, per * 0.9, { box: false });
    var neck = h.q('.neck'); neck.style.transformOrigin = '350px 190px';
    L(neck, [{ transform: 'rotate(3deg)' }, { transform: 'rotate(-4deg)' }], t0, per, { box: false });
  }
  function flag(parent, x, y, len, col, t0, flip) {
    var g = mk('g', { transform: 'translate(' + x + ',' + y + ')' + (flip ? ' scale(-1,1)' : '') }, parent);
    g.innerHTML = st('M0 0 V' + (-len), '#e9d9b4', 5) + p('M-5 ' + (-len - 16) + ' L5 ' + (-len - 16) + ' L0 ' + (-len - 46) + ' Z', '#e9d9b4') +
      '<g class="fl">' + p('M0 ' + (-len) + ' C 40 ' + (-len - 14) + ', 80 ' + (-len + 12) + ', 128 ' + (-len - 4) + ' L 104 ' + (-len + 30) + ' L 130 ' + (-len + 62) + ' C 84 ' + (-len + 74) + ', 40 ' + (-len + 50) + ', 0 ' + (-len + 64) + ' Z', col) + '</g>';
    var f = g.querySelector('.fl'); f.style.transformOrigin = '0px ' + (-len + 30) + 'px';
    L(f, [{ transform: 'skewY(-7deg) scaleX(1)' }, { transform: 'skewY(8deg) scaleX(.9)' }], (t0 || 0) - 0.3, 0.55, { box: false });
    return g;
  }
  function birds(parent, n, x, y, t0, t1, dx, dy, col, seed) {
    var r = F.rng(seed || 3), g = mk('g', { style: 'color:' + col }, parent);
    for (var i = 0; i < n; i++) {
      var b = mk('g', { transform: 'translate(' + (x + r() * 220 - 60 * i) + ',' + (y + r() * 90) + ') scale(' + (0.7 + r() * 0.7) + ')' }, g), w = mk('g', {}, b);
      w.innerHTML = A.bird();
      L(w, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(-.5)' }], t0 - r(), 0.26 + r() * 0.1, { origin: '50% 100%' });
    }
    T(g, 'transform', [[t0, 'translate(0px,0px)'], [t1, 'translate(' + dx + 'px,' + dy + 'px)']], 'linear');
    return g;
  }

  /* ====================================================================== KANNAUJ */
  (function () {
    var t0 = S.kannauj, t1 = S.portrait, sc = F.scene(wrap, t0, t1), g = sc.cam;
    F.rect(g, -100, -100, 2120, 1280, 'url(#g-dusk)');
    var sun = mk('g', {}, g);
    F.glow(sun, 1290, 610, 560, 'g-sun', 0.95); mk('circle', { cx: 1290, cy: 610, r: 92, fill: '#fff0bd' }, sun);
    T(sun, 'transform', [[t0, 'translateY(-14px)'], [t1 + 1, 'translateY(18px)']], 'linear');
    var cl = F.g(g, '<g fill="#f7b874" opacity=".5"><rect x="180" y="330" width="520" height="16" rx="8"/><rect x="330" y="366" width="340" height="12" rx="6"/><rect x="1020" y="318" width="420" height="14" rx="7"/><rect x="1110" y="352" width="260" height="10" rx="5"/><rect x="820" y="210" width="300" height="10" rx="5"/></g>');
    T(cl, 'transform', [[t0, 'translateX(0px)'], [t1 + 1, 'translateX(-60px)']], 'linear');

    var far = F.g(g, F.city(676, '#93395f', 11, -80, 2040, 0.62));
    far.setAttribute('opacity', '.92');
    T(far, 'transform', [[t0, 'translateX(0px)'], [t1 + 1, 'translateX(-26px)']], 'linear');
    // the Ganga
    F.rect(g, -100, 672, 2120, 170, 'url(#g-river)');
    mk('ellipse', { cx: 1290, cy: 742, rx: 70, ry: 74, fill: '#fff0bd', opacity: 0.55, filter: 'url(#f-soft)' }, g);
    var r = F.rng(4), sh = '';
    for (var i = 0; i < 70; i++) { var sx = r() * 1900, sy = 684 + r() * 150; sh += 'M' + sx.toFixed(0) + ' ' + sy.toFixed(0) + ' h' + (20 + r() * 70).toFixed(0); }
    var shim = F.g(g, st(sh, '#ffe6b0', 2.4, 'opacity=".55"'));
    L(shim, [{ transform: 'translateX(-16px)' }, { transform: 'translateX(16px)' }], t0, 2.1, { box: false });
    var boat = F.g(g, p('M0 0 C 20 22, 110 22, 134 0 Z', '#3a1030') + st('M62 0 V-64', '#3a1030', 4) + p('M64 -62 C 96 -50, 104 -24, 100 -6 L 64 -6 Z', '#5a1c44') + c(30, -8, 5, '#ffd27a'));
    T(boat, 'transform', [[t0, 'translate(980px,772px)'], [t1 + 1, 'translate(860px,776px)']], 'linear');

    // the near bank and city
    F.g(g, p('M820 1000 L 866 826 H2040 V1000 Z', '#3e1233') + st('M836 940 H2040 M850 884 H2040', '#5a1c44', 3));
    var near = F.g(g, F.city(830, '#5a1c44', 23, 900, 2040, 0.95, '#ffcf7a'));
    T(near, 'transform', [[t0, 'translateX(0px)'], [t1 + 1, 'translateX(-46px)']], 'linear');

    // the palace balcony, with the princess
    var pal = mk('g', {}, g), D = '#2a0d24', D2 = '#3a1230';
    F.g(pal, '<rect x="-80" y="120" width="420" height="900" fill="' + D + '"/>' + A.wall(-80, 340, 122, 0, D) +
      A.windows(40, 240, 2, 3, 120, 190, 54, 110, '#ffcf7a', 'opacity=".75"') +
      st('M-80 200 H340 M-80 560 H340', C.goldD, 4) +
      // roof of the jharokha
      p('M250 424 Q 500 286 750 424 L 750 452 Q 500 330 250 452 Z', D2) + st('M250 424 Q 500 286 750 424', C.gold, 5) +
      A.dome(500, 366, 120, 90, D2) +
      '<rect x="296" y="446" width="26" height="440" fill="' + D2 + '"/><rect x="678" y="446" width="26" height="440" fill="' + D2 + '"/>' +
      st('M290 470 h38 M290 860 h38 M672 470 h38 M672 860 h38', C.gold, 5) +
      // tassels under the eave
      st('M340 452 v26 M380 452 v20 M620 452 v20 M660 452 v26', C.gold, 3) + c(340, 484, 6, C.crimson) + c(380, 478, 5, C.crimson) + c(620, 478, 5, C.crimson) + c(660, 484, 6, C.crimson));
    var her = F.fig(pal, A.sanyogita(), 388, 392, 0.77);
    var vt = her.q('.veil-tail'); vt.style.transformOrigin = '112px 238px';
    L(vt, [{ transform: 'rotate(2deg)' }, { transform: 'rotate(9deg)' }], t0, 1.5, { box: false });
    her.q('.na1').style.transform = 'rotate(-16deg)'; her.q('.na2').style.transform = 'rotate(-96deg)';
    // railing in front of her, and the platform
    var lat = '';
    for (var k = 0; k < 13; k++) lat += 'M' + (322 + k * 28) + ' 884 l28 -58 M' + (322 + k * 28) + ' 826 l28 58 ';
    F.g(pal, '<rect x="318" y="822" width="364" height="66" fill="' + D2 + '" opacity=".92"/>' + st(lat, C.goldD, 2.5) + st('M312 822 H688', C.gold, 6) +
      '<rect x="270" y="884" width="470" height="26" fill="' + D + '"/>' + st('M270 886 H740', C.gold, 5) +
      p('M300 910 L 340 910 L 300 980 Z M 710 910 L 670 910 L 710 980 Z', D) + '<rect x="-80" y="910" width="420" height="120" fill="' + D + '"/>');
    T(pal, 'transform', [[t0, 'translateX(-10px)'], [t1 + 1, 'translateX(26px)']], 'linear');

    birds(g, 6, 760, 250, t0, t1 + 1, 520, -70, '#3a1030', 9);
    F.plate(g, 1790, 236, 'KANNAUJ', 'capital of Raja Jaichand, on the Ganga', t0 + 1.2, t1 - 0.2, 'end');
    T(sc.cam, 'transform', [[t0, 'translate(14px,0px) scale(1.03)'], [t1 + 1, 'translate(-22px,-8px) scale(1.11)']], 'linear');
    F.caption(13.8, 22.6, 'Kannauj, on the banks of the Ganga. Princess Sanyogita, daughter of Raja Jaichand, grows up on songs about a fearless young king.');
  })();

  /* ====================================================================== THE PORTRAIT */
  (function () {
    var t0 = S.portrait, t1 = S.ridge, sc = F.scene(wrap, t0, t1), g = sc.cam;
    F.rect(g, -100, -100, 2120, 1280, 'url(#g-wall)');
    F.glow(g, 760, 520, 900, 'g-warm', 0.42);
    // a window on the evening
    var ap = A.archPath(1330, 170, 400, 640, 250, 5);
    F.g(g, '<defs><clipPath id="cp-win"><path d="' + ap + '"/></clipPath></defs><g clip-path="url(#cp-win)"><rect x="1300" y="150" width="460" height="700" fill="url(#g-dusk)"/>' +
      '<circle cx="1610" cy="330" r="42" fill="#fff3c8"/>' + F.city(812, '#5a1c44', 31, 1300, 1800, 0.5, '#ffcf7a') + '</g>' +
      '<path d="' + ap + '" fill="none" stroke="' + C.gold + '" stroke-width="7"/><path d="' + ap + '" fill="none" stroke="' + C.maroon + '" stroke-width="2"/>');
    // wall pattern: small gold dots
    var r = F.rng(2), dots = '';
    for (var y = 190; y < 780; y += 86) for (var x = 130 + ((y / 86) % 2) * 43; x < 1260; x += 86) dots += c(x, y, 3, C.goldD, 'opacity=".45"');
    F.g(g, dots + st('M-100 132 H2100', C.goldD, 4) + st('M-100 146 H2100', C.goldD, 1.5));
    // floor and carpet
    F.rect(g, -100, 808, 2120, 400, 'url(#g-floor)');
    F.g(g, p('M300 1000 L 420 840 H1500 L 1620 1000 Z', C.tealD) + st('M330 984 L 432 852 H1488 L 1590 984', C.gold, 4) + st('M372 968 L 452 868 H1468 L 1548 968', C.goldD, 2, 'stroke-dasharray="2 12"'));
    F.lamp(g, 330, -40, 250, 1.15, 5); F.lamp(g, 1180, -40, 170, 0.9, 9);

    // the painted portrait on its stand
    var port = mk('g', {}, g);
    F.g(port, st('M930 690 L 880 930 M1120 690 L 1170 930 M1025 690 V900', '#3a1a12', 12) +
      '<g filter="url(#f-shadow-s)"><rect x="860" y="246" width="330" height="440" rx="6" fill="url(#g-brass)"/></g>' +
      '<rect x="884" y="270" width="282" height="392" fill="#1d5c66"/><rect x="884" y="270" width="282" height="392" fill="url(#g-warm)" opacity=".35"/>' +
      '<defs><clipPath id="cp-port"><rect x="884" y="270" width="282" height="392"/></clipPath></defs>');
    var bust = mk('g', { 'clip-path': 'url(#cp-port)' }, port);
    F.fig(bust, A.prithviraj(), 842, 298, 1.22, true);
    F.g(port, '<rect x="884" y="270" width="282" height="392" fill="none" stroke="#7a5a14" stroke-width="4"/>' + c(875, 258, 6, C.goldL) + c(1175, 258, 6, C.goldL) + c(875, 674, 6, C.goldL) + c(1175, 674, 6, C.goldL));
    var sheen = F.g(port, '<rect x="884" y="270" width="282" height="392" fill="#fff6d0" opacity=".0"/>');

    var her = F.fig(g, A.sanyogita(), 452, 316, 0.92);
    F.origin(her.el, '50% 100%');
    L(her.el, [{ transform: 'rotate(-0.8deg)' }, { transform: 'rotate(0.9deg)' }], t0, 2.2, { origin: '50% 100%' });
    F.pose(her.q('.na1'), [[t0, -10], [t0 + 1.6, -34], [t1, -38]]);
    F.pose(her.q('.na2'), [[t0, -62], [t0 + 1.6, -112], [t1, -116]]);
    var vt = her.q('.veil-tail'); vt.style.transformOrigin = '112px 238px';
    L(vt, [{ transform: 'rotate(-1deg)' }, { transform: 'rotate(4deg)' }], t0, 1.9, { box: false });

    T(sc.cam, 'transform', [[t0, 'translate(40px,0px) scale(1.04)'], [t1 - 1.0, 'translate(-60px,6px) scale(1.16)', 'ease-in'], [t1 + 0.9, 'translate(-290px,300px) scale(3.3)']]);
    F.caption(23.3, 28.4, 'He is Prithviraj Chauhan of Ajmer. She has never met him — she has only seen his portrait.');
  })();

  /* ====================================================================== THE RIDGE (the portrait comes alive) */
  (function () {
    var t0 = S.ridge, t1 = S.hall, sc = F.scene(wrap, t0, t1), g = sc.cam;
    F.rect(g, -100, -100, 2120, 1280, 'url(#g-gold-sky)');
    F.glow(g, 960, 650, 900, 'g-sun', 0.9); mk('circle', { cx: 960, cy: 650, r: 300, fill: '#fff1c2', opacity: 0.92 }, g);
    var farH = F.g(g, p('M-100 770 C 200 650, 420 720, 640 672 C 860 628, 1100 712, 1320 660 C 1560 606, 1780 700, 2040 650 V1200 H-100 Z', '#c4563f', 'opacity=".75"'));
    var fort = F.g(g, A.wall(1340, 1760, 668, 44, '#a13c3a') + A.tower(1370, 668, 50, 90, '#a13c3a', 0.5) + A.tower(1560, 668, 56, 120, '#a13c3a', 0.56) + A.tower(1740, 668, 50, 84, '#a13c3a', 0.5));
    T(farH, 'transform', [[t0, 'translateX(-14px)'], [t1 + 1, 'translateX(10px)']], 'linear');
    T(fort, 'transform', [[t0, 'translateX(-20px)'], [t1 + 1, 'translateX(14px)']], 'linear');
    birds(g, 5, 380, 300, t0, t1 + 1, 360, -40, '#7a2430', 12);
    var ridge = F.g(g, p('M-100 1010 C 200 910, 420 884, 700 872 C 980 862, 1250 884, 1500 936 C 1700 976, 1850 1004, 2040 1012 V1200 H-100 Z', '#2a0c1c') +
      A.tree(1600, 962, 1.25, '#2a0c1c') + A.tree(250, 962, 0.95, '#2a0c1c'));
    var h = F.fig(g, A.horse(), 640, 352, 1.25);
    riders(h, false);
    var fl = flag(h.el, 300, 96, 250, C.saffron, t0);
    fl.setAttribute('transform', 'translate(306,104) rotate(8)');
    var tail = h.q('.tail'); tail.style.transformOrigin = '104px 170px';
    L(tail, [{ transform: 'rotate(-4deg)' }, { transform: 'rotate(8deg)' }], t0, 1.1, { box: false });
    var neck = h.q('.neck'); neck.style.transformOrigin = '350px 190px';
    L(neck, [{ transform: 'rotate(1deg)' }, { transform: 'rotate(-4deg)' }], t0, 1.7, { box: false });
    F.pose(h.q('.fnu'), [[t0 + 1.2, 0], [t0 + 1.8, -42], [t0 + 2.6, -42], [t0 + 3.2, 0]]);
    F.pose(h.q('.fnl'), [[t0 + 1.2, 0], [t0 + 1.8, 80], [t0 + 2.6, 80], [t0 + 3.2, 0]]);
    F.plate(g, 130, 236, 'AJMER', 'seat of the Chauhan kings', t0 + 0.9, t1 - 0.2);
    T(sc.cam, 'transform', [[t0, 'scale(1.22)'], [t0 + 2.2, 'scale(1.06)', 'ease-out'], [t1 + 1, 'scale(1.0)']]);
    F.caption(28.9, 33.7, 'The legend says she lost her heart to him, and he to her.');
  })();

  /* ====================================================================== THE SWAYAMVARA HALL */
  (function () {
    var t0 = S.hall, t1 = S.ride, sc = F.scene(wrap, t0, t1), g = sc.cam;
    var tSpot = 38.6, tWalk = 45.2, tArrive = 49.5, tPlace = 50.9, tHim = 53.3;
    F.rect(g, -100, -100, 2120, 1280, 'url(#g-hall)');
    // through the centre door: the night outside
    F.g(g, '<rect x="820" y="200" width="280" height="620" fill="url(#g-night)"/><circle cx="1010" cy="330" r="30" fill="#fdf6d8"/>' + F.city(800, '#141a4a', 41, 820, 1110, 0.42, '#ffcf7a'));
    F.stars(g, 16, 6, 830, 220, 1090, 520, t0);
    // side chambers glow, with a lamp in each
    [320, 640, 1280, 1600].forEach(function (x, i) { F.lamp(g, x, 180, 110, 0.7, 20 + i); });
    // the arcaded wall
    var d = 'M-100 -100 H2020 V806 H-100 Z', xs = [195, 515, 835, 1155, 1475];
    xs.forEach(function (x) { d += ' ' + A.archPath(x, 236, 250, 570, 170, 5); });
    F.g(g, '<path d="' + d + '" fill="url(#g-wall)" fill-rule="evenodd"/>' +
      xs.map(function (x) { return '<path d="' + A.archPath(x, 236, 250, 570, 170, 5) + '" fill="none" stroke="' + C.gold + '" stroke-width="5"/>'; }).join('') +
      [125, 445, 765, 1085, 1405, 1725].map(function (x) {
        return '<rect x="' + x + '" y="400" width="70" height="406" fill="#5a1626"/><rect x="' + (x - 8) + '" y="392" width="86" height="20" fill="' + C.goldD + '"/><rect x="' + (x - 8) + '" y="782" width="86" height="24" fill="' + C.goldD + '"/>' +
          st('M' + (x + 35) + ' 430 V770', '#7c2431', 3);
      }).join('') +
      st('M-100 196 H2020', C.gold, 5) + st('M-100 210 H2020', C.goldD, 2) +
      // marigold festoons
      [[125, 445], [445, 765], [765, 1085], [1085, 1405], [1405, 1725]].map(function (q) {
        return A.beads('M' + (q[0] + 35) + ' 120 C ' + (q[0] + 120) + ' 200, ' + (q[1] - 50) + ' 200, ' + (q[1] + 35) + ' 120', 11);
      }).join(''));
    // floor, aisle carpet
    F.rect(g, -100, 806, 2120, 400, 'url(#g-floor)');
    F.g(g, p('M835 806 H1085 L 1250 1000 H670 Z', C.crimson) + st('M846 812 L 696 992 M1074 812 L 1224 992', C.gold, 5) +
      st('M-100 850 H2020 M-100 910 H2020', '#4a1420', 2, 'opacity=".7"'));

    // Jaichand on his throne
    var thr = mk('g', {}, g);
    F.g(thr, '<rect x="1490" y="866" width="360" height="40" fill="' + C.goldD + '"/><rect x="1520" y="836" width="330" height="34" fill="' + C.gold + '"/>' +
      p('M1560 836 V600 C 1560 520, 1700 470, 1700 470 C 1700 470, 1840 520, 1840 600 V836 Z', '#4a0f1c') +
      '<path d="M1560 836 V600 C 1560 520, 1700 470, 1700 470 C 1700 470, 1840 520, 1840 600 V836" fill="none" stroke="' + C.gold + '" stroke-width="7"/>' +
      c(1700, 470, 13, C.gold) + st('M1700 458 V400', C.goldD, 6) +
      p('M1580 404 C 1600 350, 1800 350, 1820 404 Z', C.crimson) + st('M1580 404 C 1600 350, 1800 350, 1820 404', C.gold, 4) +
      st('M1590 404 v20 M1630 404 v24 M1670 404 v26 M1710 404 v26 M1750 404 v24 M1790 404 v20', C.gold, 4));
    var jai = F.fig(thr, A.king({ crown: true, beard: true, robe: C.maroon, cushion: C.teal, bolster: C.crimsonD }), 1560, 536, 1.02, true, 240);

    // guests
    var kings = [], spec = [
      [215, 596, 0.72, false, C.teal, C.tealD, C.saffronD], [420, 600, 0.72, false, C.rose, '#a8405a', C.indigo],
      [90, 660, 0.86, false, C.saffron, C.saffronD, '#3d5a2a'], [300, 664, 0.86, false, '#7a4aa0', '#573476', C.crimsonD], [505, 668, 0.86, false, C.ivory, C.ivoryD, C.tealD],
      [1285, 600, 0.72, true, '#3f7a3a', '#2c5a28', C.saffronD], [1215, 668, 0.86, true, C.crimson, C.crimsonD, C.indigo], [1400, 672, 0.86, true, C.saffron, C.saffronD, '#573476']
    ];
    spec.forEach(function (k, i) {
      var f = F.fig(g, A.king({ turban: k[4], turbanD: k[5], robe: k[6], beard: i % 3 === 1, hair: i === 4 ? '#8a8a8a' : undefined, bolster: i % 2 ? C.tealD : C.maroon }), k[0], k[1], k[2], k[3], 240);
      F.origin(f.el, '50% 100%');
      kings.push(f);
      var lean = i % 2 ? 2.5 : -2;
      T(f.el, 'transform', [[t0, 'rotate(0deg)'], [tPlace + 0.25, 'rotate(0deg)'], [tPlace + 0.5, 'rotate(' + (-5) + 'deg)', 'ease-out'], [tPlace + 1.4, 'rotate(' + lean + 'deg)'], [t1, 'rotate(' + lean + 'deg)']]);
      // a gasp
      var ex = F.text(f.el, 150, 20, '!', { size: 90, weight: 800, fill: C.goldL, anchor: 'middle' });
      if (k[3]) ex.setAttribute('transform', 'translate(300,0) scale(-1,1)');
      T(ex, 'opacity', [[tPlace + 0.3 + i * 0.05, 0], [tPlace + 0.5 + i * 0.05, 1], [tPlace + 1.7, 1], [tPlace + 2.1, 0]]);
      T(ex, 'transform', [[tPlace + 0.3, (k[3] ? 'translate(300px,20px) scale(-1,1)' : 'translate(0px,20px)')], [tPlace + 0.7, (k[3] ? 'translate(300px,-14px) scale(-1,1)' : 'translate(0px,-14px)')]], 'ease-out');
    });
    F.pose(jai.q('.na1'), [[t0, -16], [tSpot + 0.6, -16], [tSpot + 1.6, -74], [44.6, -74], [45.6, -20], [tPlace + 0.4, -20], [tPlace + 1.0, -118], [t1, -110]]);
    F.pose(jai.q('.na2'), [[t0, -54], [tSpot + 0.6, -54], [tSpot + 1.6, -16], [44.6, -16], [45.6, -54], [tPlace + 0.4, -54], [tPlace + 1.0, -30], [t1, -34]]);

    // the statue at the door (Prithviraj in stone, as doorkeeper)
    var stat = mk('g', {}, g);
    F.g(stat, '<rect x="880" y="764" width="160" height="44" fill="#6a6a78"/><rect x="866" y="796" width="188" height="16" fill="#55555f"/>');
    var stone = F.fig(stat, A.prithviraj(), 855, 310, 0.7, true);
    stone.pos.style.filter = 'grayscale(1) brightness(1.04) contrast(.9)';
    F.g(stat, st('M1012 420 V764', '#8a8a96', 8) + p('M1002 420 L1022 420 L1012 384 Z', '#a8a8b4'));
    var onStat = F.fig(stat, A.beads('M128 208 C 112 256, 138 306, 153 312 C 170 306, 196 256, 180 208', 14), 855, 310, 0.7, true);
    T(onStat.el, 'opacity', [[tPlace, 0], [tPlace + 0.12, 1]]);
    F.O = F.O || {}; F.O.garlandEl = onStat.el; F.O.garlandT = tPlace;
    var tag = F.g(g, st('M1022 520 H1046', C.ivory, 2) + c(1022, 520, 4, C.ivory));
    F.text(tag, 1052, 514, 'statue of', { font: '"Cormorant Garamond", serif', size: 24, style: 'italic', weight: 600 });
    F.text(tag, 1052, 540, 'Prithviraj', { font: '"Cormorant Garamond", serif', size: 28, style: 'italic', weight: 700, fill: C.goldL });
    F.fade(tag, tSpot + 1.4, 44.6, 0.5);

    // spotlight
    var spot = F.rect(g, -400, -400, 2720, 1880, 'url(#g-spot)');
    spot.setAttribute('transform', 'translate(0,20)');
    T(spot, 'opacity', [[tSpot, 0], [tSpot + 1.1, 1], [44.4, 1], [45.3, 0]]);

    // Sanyogita walks the length of the hall with her garland
    var mv = mk('g', {}, g), her = F.fig(mv, A.sanyogita(), 0, 0, 1);
    T(mv, 'transform', [[tWalk, 'translate(-70px,318px) scale(.95)', 'linear'], [tArrive, 'translate(764px,331px) scale(.74)', 'ease-out'], [tHim + 1.2, 'translate(764px,331px) scale(.74)'], [t1, 'translate(752px,331px) scale(.74)']]);
    T(mv, 'opacity', [[tWalk, 0], [tWalk + 0.3, 1]]);
    var bob = [], n = 0;
    for (var tb = tWalk; tb < tArrive - 0.1; tb += 0.2) bob.push([tb, 'translateY(' + (n++ % 2 ? -8 : 0) + 'px) rotate(' + (n % 2 ? 0.8 : -0.8) + 'deg)']);
    bob.push([tArrive + 0.2, 'translateY(0px) rotate(0deg)']);
    F.origin(her.el, '50% 100%'); T(her.el, 'transform', bob);
    var vt = her.q('.veil-tail'); vt.style.transformOrigin = '112px 238px';
    T(vt, 'transform', [[tWalk, 'rotate(10deg)'], [tArrive, 'rotate(12deg)'], [tArrive + 0.8, 'rotate(1deg)'], [t1, 'rotate(3deg)']]);
    var hand = her.q('.na2 .hand'), gar = mk('g', { transform: 'translate(0,62)' }, hand), garR = mk('g', {}, gar);
    garR.innerHTML = A.beads('M0 0 C -40 34, -34 124, 0 134 C 34 124, 40 34, 0 0', 14);
    var a1 = [[tWalk, -22], [tArrive, -26], [tPlace - 0.1, -98], [tPlace + 0.5, -98], [tPlace + 1.4, -14], [t1, -14]];
    var a2 = [[tWalk, -58], [tArrive, -54], [tPlace - 0.1, -34], [tPlace + 0.5, -34], [tPlace + 1.4, -40], [t1, -40]];
    F.pose(her.q('.na1'), a1); F.pose(her.q('.na2'), a2);
    F.pose(garR, a1.map(function (q, i) { return [q[0], -(q[1] + a2[i][1])]; }));
    F.pose(her.q('.fa1'), [[tWalk, -12], [tArrive, -16], [tPlace - 0.1, -88], [tPlace + 0.5, -88], [tPlace + 1.4, -10], [t1, -10]]);
    F.pose(her.q('.fa2'), [[tWalk, -60], [tArrive, -56], [tPlace - 0.1, -30], [tPlace + 0.5, -30], [tPlace + 1.4, -40], [t1, -40]]);
    T(gar, 'opacity', [[tPlace, 1], [tPlace + 0.12, 0]]);
    // a flash of gold as the garland lands
    var burst = F.glow(g, 960, 470, 260, 'g-sun', 0);
    T(burst, 'opacity', [[tPlace - 0.05, 0], [tPlace + 0.15, 0.95], [tPlace + 1.3, 0]]);
    F.origin(burst); T(burst, 'transform', [[tPlace - 0.05, 'scale(.3)'], [tPlace + 1.3, 'scale(1.5)']], 'ease-out');

    // Prithviraj steps out
    var hm = mk('g', {}, g), him = F.fig(hm, A.prithviraj(), 0, 0, 1, true);
    T(hm, 'transform', [[tHim, 'translate(1170px,326px) scale(.72)'], [tHim + 1.3, 'translate(1040px,330px) scale(.74)', 'ease-out'], [t1, 'translate(1030px,330px) scale(.74)']]);
    T(hm, 'opacity', [[tHim, 0], [tHim + 0.6, 1]]);
    F.pose(him.q('.na1'), [[tHim, 6], [tHim + 1.2, 6], [tHim + 2.0, -62], [t1, -66]]);
    F.pose(him.q('.na2'), [[tHim, -20], [tHim + 1.2, -20], [tHim + 2.0, -26], [t1, -24]]);

    // big lamps in the foreground
    F.lamp(g, 470, -60, 190, 1.5, 3); F.lamp(g, 1450, -60, 170, 1.5, 8);

    T(sc.cam, 'transform', [
      [t0, 'translate(0px,0px) scale(1.02)'], [tSpot, 'translate(0px,0px) scale(1.07)'], [tSpot + 1.4, 'translate(0px,-30px) scale(1.5)'],
      [44.4, 'translate(0px,-34px) scale(1.56)'], [tWalk + 0.6, 'translate(250px,-70px) scale(1.24)'], [tArrive, 'translate(60px,-50px) scale(1.5)'],
      [tPlace, 'translate(50px,-20px) scale(1.72)'], [tHim, 'translate(40px,-20px) scale(1.66)'], [tHim + 1.4, 'translate(-60px,-24px) scale(1.6)'], [t1 + 1, 'translate(-70px,-30px) scale(1.72)']
    ]);
    F.caption(34.5, 38.4, 'Jaichand announces a swayamvara. His daughter will choose her own husband.');
    F.caption(38.8, 45.0, 'Every king is invited — except his rival, Prithviraj. To mock him, Jaichand sets up his statue at the door, as the doorkeeper.');
    F.caption(45.4, 49.4, 'Sanyogita walks past every waiting king…');
    F.caption(49.7, 53.0, '…and places her garland around the statue\'s neck.');
    F.caption(53.3, 56.6, 'Prithviraj, hidden close by, steps out and lifts her onto his horse…');
  })();

  /* ====================================================================== THE NIGHT RIDE */
  (function () {
    var t0 = S.ride, t1 = S.tarain, sc = F.scene(wrap, t0, t1), g = sc.cam;
    F.rect(g, -100, -100, 2120, 1280, 'url(#g-night)');
    F.stars(g, 90, 14, -60, 40, 1980, 640, t0);
    var moon = mk('g', {}, g);
    F.glow(moon, 1440, 300, 520, 'g-moon', 0.9); mk('circle', { cx: 1440, cy: 300, r: 132, fill: '#fdf6d8' }, moon);
    F.g(moon, c(1400, 262, 22, '#e9dfb8', 'opacity=".6"') + c(1476, 330, 30, '#e9dfb8', 'opacity=".5"') + c(1430, 360, 14, '#e9dfb8', 'opacity=".5"'));
    T(moon, 'transform', [[t0, 'translateX(20px)'], [t1 + 1, 'translateX(-30px)']], 'linear');
    function scroll(markup, period) {
      var gg = mk('g', {}, g); gg.innerHTML = markup + '<g transform="translate(1920,0)">' + markup + '</g><g transform="translate(-1920,0)">' + markup + '</g>';
      L(gg, [{ transform: 'translateX(0px)' }, { transform: 'translateX(-1920px)' }], t0 - 1, period, { box: false, direction: 'normal', easing: 'linear' });
      return gg;
    }
    scroll(p('M0 712 C 240 628, 480 730, 720 668 C 960 606, 1200 712, 1440 656 C 1680 604, 1800 668, 1920 712 V1200 H0 Z', '#232a66'), 46);
    scroll(p('M0 806 C 300 734, 600 812, 960 778 C 1300 746, 1600 818, 1920 806 V1200 H0 Z', '#161a48') +
      A.wall(1180, 1480, 772, 40, '#161a48') + A.tower(1210, 772, 46, 80, '#161a48', 0.46) + A.tower(1440, 772, 46, 70, '#161a48', 0.46) + A.tree(420, 800, 0.8, '#161a48') + A.tree(760, 790, 0.6, '#161a48'), 17);
    // torches of the pursuit, falling behind
    var tor = mk('g', {}, g);
    [[150, 812], [215, 800], [290, 818], [70, 826], [360, 806]].forEach(function (q, i) {
      var f = F.g(tor, st('M' + q[0] + ' ' + q[1] + ' v26', '#0c0e2c', 4) + c(q[0], q[1] - 4, 7, '#ffb04a'));
      F.glow(f, q[0], q[1] - 4, 46, 'g-warm', 0.9);
      L(f, [{ transform: 'translateY(0px)' }, { transform: 'translateY(-7px)' }], t0 - i * 0.07, 0.2, { box: false });
    });
    T(tor, 'transform', [[t0, 'translateX(130px)'], [t1 + 1, 'translateX(-190px)']], 'linear');
    T(tor, 'opacity', [[t0 + 0.8, 0], [t0 + 1.8, 1]]);
    scroll('<rect x="0" y="884" width="1920" height="320" fill="#090a22"/>' + A.tree(260, 896, 1.5, '#090a22') + A.tree(1160, 900, 1.2, '#090a22') +
      p('M620 890 q 30 -34 60 0 Z M1520 890 q 40 -44 90 0 Z M900 890 q 16 -20 34 0 Z', '#090a22'), 3.4);

    var h = F.fig(g, A.horse(), 560, 342, 1.3);
    riders(h, true);
    gallop(h, t0 - 1, 0.21);
    L(h.veil, [{ transform: 'rotate(50deg)' }, { transform: 'rotate(68deg)' }], t0, 0.34, { box: false });
    T(h.pos, 'opacity', [[t0, 1], [t0 + 0.1, 1]]);
    var drift = mk('g', {}, g); drift.appendChild(h.pos);
    T(drift, 'transform', [[t0, 'translateX(-150px)'], [t0 + 3, 'translateX(40px)', 'ease-out'], [t1 + 1, 'translateX(120px)']]);
    scroll(p('M0 960 l14 -30 l10 30 Z M300 960 l12 -40 l14 40 Z M700 960 l10 -26 l12 26 Z M1100 960 l16 -44 l12 44 Z M1500 960 l10 -30 l14 30 Z M1750 960 l12 -36 l10 36 Z', '#04040f'), 1.5);

    T(sc.cam, 'transform', [[t0, 'scale(1.0)'], [t1 + 1, 'translate(0px,-10px) scale(1.07)']], 'linear');
    F.caption(57.0, 60.4, '…and they ride away into the night.');
    F.caption(60.8, 64.6, 'It is one of India\'s best-loved romances.');
  })();

  /* ====================================================================== THE BITTER ENDING: TARAIN */
  (function () {
    var t0 = S.tarain, t1 = S.raso, sc = F.scene(wrap, t0, t1), g = sc.cam;
    F.rect(g, -100, -100, 2120, 1280, 'url(#g-battle)');
    F.glow(g, 960, 800, 760, 'g-sun', 0.8); mk('circle', { cx: 960, cy: 800, r: 190, fill: '#ffb85a', opacity: 0.85 }, g);
    var smoke = F.g(g, '<g fill="#1d070c" opacity=".55" filter="url(#f-soft)"><ellipse cx="300" cy="330" rx="420" ry="70"/><ellipse cx="1500" cy="260" rx="520" ry="80"/><ellipse cx="900" cy="170" rx="380" ry="50"/></g>');
    T(smoke, 'transform', [[t0, 'translateX(-40px)'], [t1 + 1, 'translateX(60px)']], 'linear');
    F.g(g, p('M-100 830 C 300 790, 700 850, 960 836 C 1300 818, 1600 850, 2040 820 V1200 H-100 Z', '#3a0d12'));
    // spears and banners of two armies
    function army(side, col) {
      var a = mk('g', {}, g), r = F.rng(side > 0 ? 5 : 8), m = '';
      for (var i = 0; i < 26; i++) {
        var x = side > 0 ? 40 + i * 30 + r() * 14 : 1880 - i * 30 - r() * 14, y = 846 + r() * 26, hh = 190 + r() * 120;
        m += st('M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' l' + (side * 30) + ' ' + (-hh).toFixed(0), '#16060a', 4);
      }
      a.innerHTML = m;
      [0, 1, 2].forEach(function (i) { flag(a, side > 0 ? 150 + i * 240 : 1770 - i * 240, 850, 260 + i * 20, col, t0 + i * 0.2, side < 0); });
      [0, 1, 2].forEach(function (i) {
        var s = 0.74 + i * 0.1, x = side > 0 ? 250 + i * 190 : 1670 - i * 190 - 520 * s;
        var hf = F.fig(a, A.horse(), x, 890 - 412 * s, s, side < 0, 520);
        riders(hf, false);
        hf.pos.style.filter = 'brightness(0)'; hf.pos.setAttribute('opacity', '.92');
        gallop(hf, t0 - i * 0.11, 0.26);
      });
      T(a, 'transform', [[t0, 'translateX(' + (-side * 150) + 'px)'], [t1 + 1, 'translateX(' + (side * 70) + 'px)']], 'linear');
      return a;
    }
    army(1, C.saffron); army(-1, '#1d6a4a');
    F.g(g, p('M-100 930 C 400 900, 900 950, 2040 915 V1200 H-100 Z', '#16060a'));
    // the date
    var tt = mk('g', { filter: 'url(#f-glowtxt)' }, g);
    F.text(tt, 960, 400, 'TARAIN', { size: 168, weight: 800, anchor: 'middle', spacing: 12, fill: 'url(#g-gold)' });
    F.text(tt, 960, 548, '1192', { size: 124, weight: 800, anchor: 'middle', spacing: 22, fill: C.ivory });
    F.origin(tt); T(tt, 'transform', [[t0 + 2.6, 'scale(1.7)'], [t0 + 3.2, 'scale(1)', 'ease-out'], [t1 + 1, 'scale(1.05)']]);
    T(tt, 'opacity', [[t0 + 2.6, 0], [t0 + 3.0, 1]]);
    T(sc.cam, 'transform', [[t0, 'scale(1.08)'], [t1 + 1, 'scale(1.0)']], 'linear');
    F.caption(65.5, 72.2, 'The legend adds a bitter ending: Jaichand\'s fury, a divided north, and Prithviraj\'s fall to Muhammad of Ghor at Tarain, in 1192.');
  })();

  /* ====================================================================== THE VERTICAL FRAME (around every legend scene) */
  (function () {
    var V = F.V, t0 = S.kannauj, t1 = S.desk + 1.6;
    // behind the window: deep maroon with a soft lamp glow and a lattice of gold dots
    var bg = mk('g', {}, F.lbg), r = F.rng(17), dots = '';
    F.rect(bg, -100, -100, 1280, 2120, 'url(#g-stage)');
    for (var y = 40; y < 1900; y += 64) for (var x = 32 + ((y / 64) % 2) * 32; x < 1080; x += 64) {
      if (y > V.WY - 30 && y < V.WY + V.WH + 30) continue;
      dots += c(x, y, 2.4, C.goldD, 'opacity=".35"');
    }
    F.g(bg, dots);
    // over the window: a double gold outline on the cusped arch, a rosette band underneath
    var ov = mk('g', {}, F.lover);
    F.g(ov, '<path d="' + V.arch + '" fill="none" stroke="' + C.gold + '" stroke-width="8"/>' +
      '<path d="' + V.arch + '" fill="none" stroke="#2a060e" stroke-width="2.5"/>' +
      '<path d="' + A.archPath(V.WX - 16, V.WY - 16, V.WW + 32, V.WH + 32, 124, 5) + '" fill="none" stroke="' + C.goldD + '" stroke-width="2.5"/>');
    var band = '', bx;
    for (bx = 96; bx < 1000; bx += 96) {
      for (var a = 0; a < 8; a++) band += '<ellipse cx="' + bx + '" cy="' + (V.WY + V.WH + 52 - 10) + '" rx="4.5" ry="10" fill="' + C.gold + '" transform="rotate(' + (a * 45) + ' ' + bx + ' ' + (V.WY + V.WH + 52) + ')"/>';
      band += c(bx, V.WY + V.WH + 52, 4.5, C.crimson);
    }
    F.g(ov, band + st('M60 ' + (V.WY + V.WH + 96) + ' H1020', C.goldD, 2.5));
    // the label at the very top
    var lab = mk('g', {}, ov);
    F.text(lab, 540, 104, 'THE LEGEND', { size: 34, weight: 800, fill: 'url(#g-gold)', spacing: 9, anchor: 'middle' });
    F.text(lab, 540, 140, 'as the Prithviraj Raso tells it', { font: '"Cormorant Garamond", serif', size: 28, style: 'italic', weight: 500, fill: '#e9d9b4', anchor: 'middle' });
    F.g(lab, st('M330 92 H400 M680 92 H750', C.gold, 2) + p('M300 92 l9 -9 l9 9 l-9 9 Z M762 92 l9 -9 l9 9 l-9 9 Z', C.gold));

    T(legendAll(), 'opacity', [[t0, 0], [t0 + 0.9, 1]]);
    T(legendAll(), 'visibility', [[t0 - 0.02, 'hidden'], [t0, 'visible'], [S.raso + 0.5, 'visible'], [S.raso + 0.52, 'hidden']], 'linear');
    function legendAll() { return F.legendAll; }
  })();

  /* ====================================================================== CAMERA: where the window looks, scene by scene */
  F.cam([
    [S.kannauj, 560, 540, 1.0], [S.kannauj + 4, 560, 540, 1.0], [S.portrait - 0.6, 1180, 540, 1.0],
    [S.portrait, 800, 540, 1.0], [S.ridge - 1.2, 900, 540, 1.0],
    [S.ridge, 960, 540, 1.0], [S.hall, 960, 540, 1.0],
    [38.6, 960, 540, 1.0], [44.6, 960, 540, 1.0], [45.6, 650, 540, 1.0], [49.5, 900, 540, 1.0],
    [50.9, 960, 540, 1.0], [53.3, 980, 540, 1.0], [S.ride - 0.3, 1000, 540, 1.0],
    [S.ride, 900, 540, 1.0], [S.tarain - 0.5, 980, 540, 1.0],
    [S.tarain, 960, 540, 1.0], [S.desk + 2, 960, 540, 1.0]
  ]);
  F.buildCam();
})(window.Film);
