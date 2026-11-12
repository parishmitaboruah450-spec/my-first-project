/* stage.js — shared stagecraft: gradients and filters, lighting, text, captions, and the timeline of the film. */
(function (F) {
  'use strict';
  var A = F.A, C = F.C, mk = F.mk, T = F.T, L = F.L;
  var film = F.film = document.getElementById('film');

  /* The running order (seconds). Every scene reads its times from here. */
  var S = F.S = {
    open: 0, kannauj: 13, portrait: 23, ridge: 28.6, hall: 34, ride: 56.5, tarain: 65,
    desk: 72.4, question: 73, raso: 78.5, vijaya: 91.5, plates: 104.5, echoes: 113.5, map: 122.5,
    verdict: 136.5, closing: 150.5, outro: 161.5, end: 178
  };

  F.g(film,
    '<defs>' +
    '<linearGradient id="g-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#23164a"/><stop offset=".38" stop-color="#7b2a5c"/><stop offset=".7" stop-color="#e2683a"/><stop offset="1" stop-color="#f8c873"/></linearGradient>' +
    '<linearGradient id="g-gold-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a2d4e"/><stop offset=".45" stop-color="#e8703a"/><stop offset="1" stop-color="#fbd98a"/></linearGradient>' +
    '<linearGradient id="g-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060820"/><stop offset=".55" stop-color="#151b4d"/><stop offset="1" stop-color="#33306e"/></linearGradient>' +
    '<linearGradient id="g-battle" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d070c"/><stop offset=".5" stop-color="#8f1f1a"/><stop offset="1" stop-color="#f09a3a"/></linearGradient>' +
    '<linearGradient id="g-river" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3a55a"/><stop offset="1" stop-color="#6b2a5e"/></linearGradient>' +
    '<linearGradient id="g-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4d1321"/><stop offset="1" stop-color="#7c2431"/></linearGradient>' +
    '<linearGradient id="g-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a1f28"/><stop offset="1" stop-color="#2a0b12"/></linearGradient>' +
    '<linearGradient id="g-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf0b8"/><stop offset=".45" stop-color="#e9bd4f"/><stop offset="1" stop-color="#a8761c"/></linearGradient>' +
    '<linearGradient id="g-paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8efd6"/><stop offset="1" stop-color="#e3d0a2"/></linearGradient>' +
    '<linearGradient id="g-bark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9b98a"/><stop offset="1" stop-color="#b98f5c"/></linearGradient>' +
    '<linearGradient id="g-copper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d98a4e"/><stop offset=".5" stop-color="#a85a2a"/><stop offset="1" stop-color="#6f3515"/></linearGradient>' +
    '<linearGradient id="g-brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc8c"/><stop offset="1" stop-color="#9a6f1c"/></linearGradient>' +
    '<radialGradient id="g-warm"><stop offset="0" stop-color="#ffd58a" stop-opacity=".95"/><stop offset=".35" stop-color="#ffb85a" stop-opacity=".45"/><stop offset="1" stop-color="#ff9a3a" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="g-sun"><stop offset="0" stop-color="#fff3c4" stop-opacity="1"/><stop offset=".25" stop-color="#ffd27a" stop-opacity=".7"/><stop offset="1" stop-color="#ff9a3a" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="g-moon"><stop offset="0" stop-color="#fdf6d8" stop-opacity=".9"/><stop offset=".3" stop-color="#cfd6ff" stop-opacity=".35"/><stop offset="1" stop-color="#8f9cff" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="g-hall" cx=".5" cy=".55" r=".75"><stop offset="0" stop-color="#ffd98a"/><stop offset=".5" stop-color="#e9973f"/><stop offset="1" stop-color="#8a3518"/></radialGradient>' +
    '<radialGradient id="g-desk" cx=".34" cy=".3" r=".95"><stop offset="0" stop-color="#2f4a4a"/><stop offset=".5" stop-color="#172a2e"/><stop offset="1" stop-color="#090f14"/></radialGradient>' +
    '<radialGradient id="g-spot" gradientUnits="userSpaceOnUse" cx="960" cy="540" r="1000"><stop offset="0" stop-color="#08040a" stop-opacity="0"/><stop offset=".2" stop-color="#08040a" stop-opacity="0"/><stop offset=".42" stop-color="#08040a" stop-opacity=".66"/><stop offset="1" stop-color="#08040a" stop-opacity=".86"/></radialGradient>' +
    '<radialGradient id="g-stage" cx=".5" cy=".42" r=".8"><stop offset="0" stop-color="#7a1d2c"/><stop offset=".55" stop-color="#3d0d1a"/><stop offset="1" stop-color="#12040a"/></radialGradient>' +
    '<radialGradient id="g-open" cx=".3" cy=".5" r=".9"><stop offset="0" stop-color="#3a2030"/><stop offset=".5" stop-color="#17102a"/><stop offset="1" stop-color="#05040c"/></radialGradient>' +
    '<filter id="f-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>' +
    '<filter id="f-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000" flood-opacity=".5"/></filter>' +
    '<filter id="f-shadow-s" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity=".45"/></filter>' +
    '<filter id="f-glowtxt" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    '</defs>');

  /* ------------------------------------------------- vertical (9:16) layout */
  // The film is 1080 x 1920. Legend scenes are painted at 1920 x 1080 and seen through a window with a moving camera.
  var V = F.V = { W: 1080, H: 1920, WX: 36, WW: 1008, WY: 520, WH: 1100 };
  V.s0 = V.WH / 1080;
  F.L1 = mk('g', {}, film);                                  // under the legend (the historian's desk)
  var legendAll = F.legendAll = mk('g', {}, film);
  legendAll.style.transformOrigin = '540px 960px';
  F.lbg = mk('g', {}, legendAll);                            // the frame's background
  V.arch = A.archPath(V.WX, V.WY, V.WW, V.WH, 116, 5);
  F.g(film, '<defs><clipPath id="cp-window"><path d="' + V.arch + '"/></clipPath></defs>');
  var winClip = mk('g', { 'clip-path': 'url(#cp-window)' }, legendAll);
  F.world = mk('g', {}, winClip);                            // 1920 x 1080 scenes live here
  F.lover = mk('g', {}, legendAll);                          // frame lines and labels over the window
  F.L2 = mk('g', {}, film);                                  // the evidence and the outro, above the legend
  F.L3 = mk('g', {}, film);                                  // the opening, on top of everything
  var camKeys = [];
  // camera keys: [time, centre x, centre y, zoom] in scene coordinates (zoom 1 shows the full scene height)
  F.cam = function (keys) { camKeys = camKeys.concat(keys); };
  F.buildCam = function () {
    camKeys.sort(function (a, b) { return a[0] - b[0]; });
    var cx0 = V.WX + V.WW / 2, cy0 = V.WY + V.WH / 2;
    T(F.world, 'transform', camKeys.map(function (k) {
      return [k[0], 'translate(' + cx0 + 'px,' + cy0 + 'px) scale(' + (V.s0 * (k[3] || 1)).toFixed(4) + ') translate(' + (-k[1]) + 'px,' + (-(k[2] || 540)) + 'px)', k[4]];
    }));
  };

  /* ---------------------------------------------------------------- helpers */
  F.rect = function (parent, x, y, w, h, fill, more) {
    var a = { x: x, y: y, width: w, height: h, fill: fill }; if (more) for (var k in more) a[k] = more[k];
    return mk('rect', a, parent);
  };
  F.glow = function (parent, x, y, r, grad, op) { return mk('circle', { cx: x, cy: y, r: r, fill: 'url(#' + grad + ')', opacity: op === undefined ? 1 : op }, parent); };
  var DEV = /[\u0900-\u097F]/;
  F.text = function (parent, x, y, str, o) {
    o = o || {};
    if (F.LANG === 'hi') { var h = o.hi !== undefined ? o.hi : (F.HI && F.HI[str]); if (h !== undefined) str = h; }
    var font = o.font || 'Cinzel, serif', weight = o.weight || 600, spacing = o.spacing;
    if (DEV.test(str)) {
      // Devanagari: display faces become Yatra One, the serif becomes Tiro Devanagari; no letter-spacing (it breaks the headline)
      if (/Cormorant/.test(font)) { font = '"Tiro Devanagari Hindi", serif'; weight = 400; }
      else if (!/Yatra|Tiro/.test(font)) { font = '"Yatra One", serif'; weight = 400; }
      spacing = 0;
    }
    var a = { x: x, y: y, 'font-family': font, 'font-size': o.size || 40, 'font-weight': weight, fill: o.fill || C.ivory, 'text-anchor': o.anchor || 'start' };
    if (spacing) a['letter-spacing'] = spacing;
    if (o.style) a['font-style'] = o.style;
    if (o.more) for (var k in o.more) a[k] = o.more[k];
    var t = mk('text', a, parent); t.textContent = str; return t;
  };
  // Place a figure. flip mirrors it (w is the figure's box width).
  F.fig = function (parent, markup, x, y, s, flip, w) {
    var pos = mk('g', { transform: flip ? 'translate(' + (x + (w || 300) * s) + ',' + y + ') scale(' + (-s) + ',' + s + ')' : 'translate(' + x + ',' + y + ') scale(' + s + ')' }, parent);
    var el = mk('g', {}, pos); el.innerHTML = markup;
    return { pos: pos, el: el, q: function (sel) { return el.querySelector(sel); }, qa: function (sel) { return el.querySelectorAll(sel); } };
  };
  // Rotate a joint through a list of [time, degrees].
  F.pose = function (el, pts, ease) {
    if (!el) return;
    T(el, 'transform', pts.map(function (p) { return [p[0], 'rotate(' + p[1] + 'deg)']; }), ease || 'ease-in-out');
  };
  // Hanging lamp with a breathing glow.
  F.lamp = function (parent, x, yTop, len, s, seed) {
    s = s || 1;
    var g = mk('g', {}, parent), sw = mk('g', {}, g);
    sw.innerHTML = A.st('M' + x + ' ' + yTop + ' V' + (yTop + len), C.goldD, 3 * s) +
      '<circle class="lg" cx="' + x + '" cy="' + (yTop + len + 34 * s) + '" r="' + (150 * s) + '" fill="url(#g-warm)"/>' +
      A.p('M' + (x - 22 * s) + ' ' + (yTop + len) + ' h' + (44 * s) + ' l' + (8 * s) + ' ' + (16 * s) + ' c 0 ' + (30 * s) + ', ' + (-12 * s) + ' ' + (46 * s) + ', ' + (-30 * s) + ' ' + (52 * s) + ' c ' + (-18 * s) + ' ' + (-6 * s) + ', ' + (-30 * s) + ' ' + (-22 * s) + ', ' + (-30 * s) + ' ' + (-52 * s) + ' Z', C.gold) +
      A.p('M' + (x - 14 * s) + ' ' + (yTop + len + 20 * s) + ' h' + (28 * s) + ' c 0 ' + (20 * s) + ', ' + (-6 * s) + ' ' + (30 * s) + ', ' + (-14 * s) + ' ' + (34 * s) + ' c ' + (-8 * s) + ' ' + (-4 * s) + ', ' + (-14 * s) + ' ' + (-14 * s) + ', ' + (-14 * s) + ' ' + (-34 * s) + ' Z', '#fff2c2') +
      A.c(x, yTop + len + 74 * s, 5 * s, C.gold);
    var r = F.rng(seed || 7);
    sw.style.transformOrigin = x + 'px ' + yTop + 'px';
    L(sw, [{ transform: 'rotate(-1.6deg)' }, { transform: 'rotate(1.6deg)' }], -r() * 3, 2.6 + r(), { box: false });
    L(sw.querySelector('.lg'), [{ opacity: 0.72 }, { opacity: 1 }], -r() * 2, 0.7 + r() * 0.7, { box: false });
    return g;
  };
  // A place-name plate: big name, small line under it.
  F.plate = function (parent, x, y, name, sub, t0, t1) {
    var g = mk('g', { filter: 'url(#f-shadow-s)' }, F.lover), X = 84, Y = 760;
    F.text(g, X, Y, name, { size: 64, weight: 800, fill: 'url(#g-gold)', spacing: 6 });
    var ln = mk('path', { d: 'M' + X + ' ' + (Y + 20) + ' h360', stroke: C.gold, 'stroke-width': 3, fill: 'none' }, g);
    F.text(g, X, Y + 66, sub, { font: '"Cormorant Garamond", serif', size: 36, weight: 600, style: 'italic', fill: C.ivory });
    F.fade(g, t0, t1, 0.7); F.draw(ln, t0 + 0.2, 0.9);
    T(g, 'transform', [[t0, 'translateY(14px)'], [t0 + 0.8, 'translateY(0px)']], 'ease-out');
    return g;
  };
  // A palace skyline, generated from a seed so it is the same every time.
  F.city = function (base, fill, seed, x0, x1, s, lit) {
    var r = F.rng(seed), x = x0, m = '', w, h;
    while (x < x1) {
      var k = r();
      if (k < 0.32) {
        w = (120 + r() * 130) * s; h = (60 + r() * 110) * s;
        m += '<rect x="' + x.toFixed(0) + '" y="' + (base - h).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" fill="' + fill + '"/>' + A.dome(x + w / 2, base - h, w * 0.6, w * 0.5, fill);
        if (r() < 0.65) m += A.chhatri(x + 14 * s, base - h, 0.42 * s, fill) + A.chhatri(x + w - 14 * s, base - h, 0.42 * s, fill);
        if (lit) m += A.windows(x + w * 0.16, base - h * 0.72, 3, 1, w * 0.26, 0, w * 0.11, h * 0.34, lit, 'opacity="' + (0.5 + r() * 0.5).toFixed(2) + '"');
      } else if (k < 0.56) {
        w = (46 + r() * 30) * s; h = (150 + r() * 170) * s; m += A.tower(x + w / 2, base, w, h, fill, w / 100);
        if (lit) m += A.windows(x + w * 0.34, base - h * 0.8, 1, 2, 0, h * 0.3, w * 0.32, h * 0.13, lit, 'opacity=".8"');
      } else if (k < 0.8) {
        w = (130 + r() * 160) * s; m += A.wall(x, x + w, base, (40 + r() * 50) * s, fill);
      } else {
        w = (90 + r() * 60) * s; h = (50 + r() * 60) * s;
        m += '<rect x="' + x.toFixed(0) + '" y="' + (base - h).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" fill="' + fill + '"/>' + A.chhatri(x + w / 2, base - h, 0.8 * s, fill);
      }
      x += w - 4 * s;
    }
    return m;
  };
  // Scattered twinkling stars.
  F.stars = function (parent, n, seed, x0, y0, x1, y1, t0) {
    var r = F.rng(seed), g = mk('g', { fill: '#fff6d8' }, parent);
    for (var i = 0; i < n; i++) {
      var st = mk('circle', { cx: (x0 + r() * (x1 - x0)).toFixed(0), cy: (y0 + r() * (y1 - y0)).toFixed(0), r: (1 + r() * 2.2).toFixed(1) }, g);
      L(st, [{ opacity: 0.25 }, { opacity: 1 }], (t0 || 0) - r() * 3, 0.8 + r() * 1.6, { box: false });
    }
    return g;
  };
  // Lines of imitation script, so manuscripts look written without quoting any real text.
  F.script = function (x, y, w, rows, lh, seed, kind) {
    var r = F.rng(seed), d = '';
    for (var row = 0; row < rows; row++) {
      var cx = x, yy = y + row * lh, end = x + w - (row === rows - 1 ? w * (0.2 + r() * 0.4) : 0);
      if (kind === 'persian') {
        while (cx < end - 30) {
          var len = 40 + r() * 80; d += 'M' + cx.toFixed(1) + ' ' + yy;
          for (var q = 0; q < len; q += 16) d += ' q8 ' + (r() < 0.5 ? -9 : 7) + ' 16 0';
          if (r() < 0.7) d += ' M' + (cx + len * r()).toFixed(1) + ' ' + (yy - 12) + ' l2 2';
          if (r() < 0.5) d += ' M' + (cx + len * r()).toFixed(1) + ' ' + (yy + 9) + ' l2 2';
          cx += len + 14 + r() * 10;
        }
      } else {
        while (cx < end - 24) {
          var wl = Math.min(26 + r() * 74, end - cx);
          d += 'M' + cx.toFixed(1) + ' ' + yy + ' h' + wl.toFixed(1);
          for (var sx = cx + 5; sx < cx + wl - 3; sx += 9 + r() * 5) {
            var k2 = r();
            if (k2 < 0.4) d += ' M' + sx.toFixed(1) + ' ' + yy + ' v' + (9 + r() * 6).toFixed(1);
            else if (k2 < 0.7) d += ' M' + sx.toFixed(1) + ' ' + yy + ' q6 5 0 13';
            else d += ' M' + sx.toFixed(1) + ' ' + yy + ' c7 2 7 11 0 11 c-5 0 -5 -6 0 -6';
          }
          cx += wl + 10 + r() * 8;
        }
      }
    }
    return d;
  };

  /* --------------------------------------------------------------- captions */
  var capsEl = document.getElementById('caps');
  // Captions follow the narration: a caption written at story time t0 shows while its line is spoken.
  F.caption = function (t0, t1, textStr) {
    var ln = F.lineAt(t0), a, b;
    if (ln) { a = ln.f; b = Math.min(ln.f + ln.d + 0.4, ln.nextF - 0.06); textStr = ln.text; }
    else { a = F.W(t0); b = F.W(t1); }
    var d = document.createElement('div');
    d.className = 'cap'; d.textContent = textStr;
    capsEl.appendChild(d);
    var R = F.Traw;
    R(d, 'opacity', [[a, 0], [a + 0.3, 1], [b - 0.3, 1], [b, 0]]);
    R(d, 'transform', [[a, 'translateY(.7cqw)'], [a + 0.35, 'translateY(0)'], [b - 0.3, 'translateY(0)'], [b, 'translateY(-.35cqw)']], 'ease-out');
    R(d, 'visibility', [[Math.max(0, a - 0.02), 'hidden'], [a, 'visible'], [b, 'visible'], [b + 0.02, 'hidden']], 'linear');
    return d;
  };
})(window.Film);
