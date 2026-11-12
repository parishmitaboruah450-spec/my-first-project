/* engine.js — a small seekable film timeline built on the Web Animations API.
   Every animated property is one paused animation; play, pause and seek act on all of them,
   so any moment of the film can be rendered exactly (which is also how the video is exported). */
window.Film = (function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var anims = [], hooks = [];
  var F = { NS: NS, TOTAL: 0, anims: anims };

  /* Story clock -> film clock. Scenes are written on the story clock; the narration decides how long each
     stretch really lasts. Each line's stretch (to the next line) lasts at least as long as the line itself,
     and every stretch is scaled by one shared factor k chosen so the film keeps its total length. */
  var knots = null;
  F.setVoice = function (v) { F.VOICE = v; knots = null; };
  function build() {
    var end = F.S && F.S.end;
    if (!F.VOICE || !end) return null;
    var ls = F.VOICE.lines.slice().sort(function (a, b) { return a.a - b.a; }), GAP = F.VOICE.gap || 0.32;
    var a = [0], d = [0];
    ls.forEach(function (l) { a.push(l.a); d.push(l.d); });
    a.push(end);
    function lengths(k) { var L = []; for (var i = 0; i < a.length - 1; i++) L.push(Math.max(d[i] ? d[i] + GAP : 0, k * (a[i + 1] - a[i]))); return L; }
    function sum(L) { return L.reduce(function (x, y) { return x + y; }, 0); }
    var lo = 0, hi = 2;
    for (var it = 0; it < 60; it++) { var mid = (lo + hi) / 2; if (sum(lengths(mid)) > end) hi = mid; else lo = mid; }
    var L = lengths(lo), ks = [[0, 0]], f = 0;
    for (var j = 0; j < L.length; j++) { f += L[j]; ks.push([a[j + 1], f]); }
    ls.forEach(function (l) { l.f = W(l.a, ks); });
    F.warpK = lo;
    return ks;
  }
  function W(t, ks) {
    if (!ks) return t;
    if (t <= 0) return t;
    for (var i = 1; i < ks.length; i++) if (t <= ks[i][0]) {
      var A0 = ks[i - 1], A1 = ks[i], s = A1[0] - A0[0];
      return s > 0 ? A0[1] + (t - A0[0]) * (A1[1] - A0[1]) / s : A1[1];
    }
    var Z = ks[ks.length - 1]; return Z[1] + (t - Z[0]);
  }
  F.W = function (t) { if (!knots) knots = build(); return W(t, knots); };
  F.Winv = function (f) {
    if (!knots) knots = build();
    if (!knots || f <= 0) return f;
    for (var i = 1; i < knots.length; i++) if (f <= knots[i][1]) {
      var A0 = knots[i - 1], A1 = knots[i], s = A1[1] - A0[1];
      return s > 0 ? A0[0] + (f - A0[1]) * (A1[0] - A0[0]) / s : A1[0];
    }
    var Z = knots[knots.length - 1]; return Z[0] + (f - Z[1]);
  };
  // the narration line that starts at story time t (if any), with its film-clock start f and length d
  F.lineAt = function (t) {
    if (!F.VOICE) return null;
    F.W(0);
    var ls = F.VOICE.lines, best = null;
    for (var i = 0; i < ls.length; i++) if (Math.abs(ls[i].a - t) < 0.06) best = ls[i];
    if (!best) return null;
    var next = null;
    ls.forEach(function (l) { if (l.f > best.f + 0.01 && (!next || l.f < next.f)) next = l; });
    return { f: best.f, d: best.d, text: best.text, cap: best.cap, nextF: next ? next.f : Infinity };
  };

  F.mk = function (tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  // an SVG group whose content comes from a markup string
  F.g = function (parent, markup, attrs) {
    var g = F.mk('g', attrs || {}, parent);
    if (markup) g.innerHTML = markup;
    return g;
  };

  // One animation per element + property. pts = [[seconds, value], ...]
  F.T = function (el, prop, pts, ease) {
    return F.Traw(el, prop, pts.map(function (q) { var r = q.slice(); r[0] = F.W(q[0]); return r; }), ease);
  };
  F.Traw = function (el, prop, pts, ease) {
    var t0 = Math.max(0, pts[0][0]), t1 = pts[pts.length - 1][0], dur = Math.max(t1 - t0, 0.001);
    var kf = pts.map(function (p) {
      var f = { offset: Math.min(1, Math.max(0, (p[0] - t0) / dur)), easing: p[2] || ease || 'ease-in-out' };
      f[prop] = p[1];
      return f;
    });
    var a = el.animate(kf, { delay: t0 * 1000, duration: dur * 1000, fill: 'both' });
    a.pause(); anims.push(a); return a;
  };
  // An endless back-and-forth loop that begins at `start`
  F.L = function (el, frames, start, period, o) {
    o = o || {};
    if (o.box !== false) { el.style.transformBox = o.box || 'fill-box'; el.style.transformOrigin = o.origin || '50% 50%'; }
    var a = el.animate(frames, {
      delay: F.W(start) * 1000, duration: period * 1000, iterations: Infinity,
      direction: o.direction || 'alternate', easing: o.easing || 'ease-in-out', fill: o.fill || 'both'
    });
    a.pause(); anims.push(a); return a;
  };
  F.origin = function (el, origin, box) { el.style.transformBox = box || 'fill-box'; el.style.transformOrigin = origin || '50% 50%'; return el; };
  F.tr = function (x, y, s, r) {
    return 'translate(' + (x || 0) + 'px,' + (y || 0) + 'px)' + (s !== undefined ? ' scale(' + s + ')' : '') + (r ? ' rotate(' + r + 'deg)' : '');
  };

  // Fade something in at tin and (optionally) out at tout.
  F.fade = function (el, tin, tout, d, dout) {
    d = d === undefined ? 0.6 : d;
    var op = [[tin, 0], [tin + d, 1]];
    if (tout !== undefined) { dout = dout === undefined ? d : dout; op.push([tout - dout, 1], [tout, 0]); }
    F.T(el, 'opacity', op);
    return el;
  };
  // Pop: scale from nothing with a little overshoot.
  F.pop = function (el, t, d, origin) {
    d = d || 0.45; F.origin(el, origin || '50% 50%');
    F.T(el, 'transform', [[t, 'scale(0)'], [t + d * 0.65, 'scale(1.14)'], [t + d, 'scale(1)']], 'ease-out');
    F.T(el, 'opacity', [[t, 0], [t + 0.08, 1]]);
    return el;
  };
  // Draw a stroke from start to end.
  F.draw = function (el, t, d, ease) {
    el.setAttribute('pathLength', '1');
    el.style.strokeDasharray = '1.05 1.1';
    F.T(el, 'strokeDashoffset', [[t, 1.08], [t + d, 0]], ease || 'ease-in-out');
    return el;
  };
  // Scenes stack in story order: each fades in over the one before and is hidden when not needed.
  F.scene = function (parent, t0, t1, xf, origin) {
    xf = xf === undefined ? 0.9 : xf;
    var g = F.mk('g', { 'class': 'scene' }, parent);
    if (t0 > 0) F.T(g, 'opacity', [[t0, 0], [t0 + xf, 1]]);
    var vis = [];
    if (t0 > 0.03) vis.push([t0 - 0.02, 'hidden']);
    vis.push([t0, 'visible'], [t1 + 1.6, 'visible'], [t1 + 1.62, 'hidden']);
    F.T(g, 'visibility', vis, 'linear');
    var cam = F.mk('g', {}, g);
    cam.style.transformOrigin = origin || '960px 540px';
    return { g: g, cam: cam, t0: t0, t1: t1 };
  };

  F.onFrame = function (fn) { hooks.push(fn); };
  F.render = function (t) { for (var i = 0; i < hooks.length; i++) hooks[i](t); };

  var clock = null;
  F.finish = function (total) {
    F.TOTAL = F.W(total);
    clock = F.Traw(document.createElement('i'), 'opacity', [[0, 0], [F.TOTAL, 1]], 'linear');
  };
  F.now = function () { return clock ? Math.min(F.TOTAL, (clock.currentTime || 0) / 1000) : 0; };
  F.seek = function (t) {
    t = Math.max(0, Math.min(F.TOTAL, t));
    for (var i = 0; i < anims.length; i++) anims[i].currentTime = t * 1000;
    F.render(t);
  };
  F.play = function () { for (var i = 0; i < anims.length; i++) anims[i].play(); };
  F.pause = function () { for (var i = 0; i < anims.length; i++) anims[i].pause(); };

  // deterministic pseudo-random numbers, so every render of the film is identical
  F.rng = function (seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  };
  F.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  F.smooth = function (a, b, x) { x = F.clamp((x - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); };
  return F;
})();
