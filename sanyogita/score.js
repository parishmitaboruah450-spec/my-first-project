/* score.js — the soundtrack, synthesised with the Web Audio API and rendered offline.
   Load it on index.html?record, then call Score.render() to get a WAV (base64).
   Everything is generated from code: tanpura, bansuri-like flute, santoor, tabla, dhol, bells and swooshes. */
window.Score = (function () {
  'use strict';
  var F = window.Film, S = F.S, TOTAL = F.TOTAL || F.W(S.end), w = F.W;
  var D3 = 146.83;                                         // Sa = D
  var R = { S: 1, r: 16 / 15, R: 9 / 8, g: 6 / 5, G: 5 / 4, M: 4 / 3, m: 45 / 32, P: 3 / 2, d: 8 / 5, D: 5 / 3, n: 9 / 5, N: 15 / 8 };
  function nf(tok, base) {
    var o = 1;
    while (tok[0] === '_') { o /= 2; tok = tok.slice(1); }
    while (tok[0] === '^') { o *= 2; tok = tok.slice(1); }
    return (base || D3 * 4) * R[tok] * o;               // flute octave: D5
  }
  // Times in the score are on the story clock (the scenes' clock). Single hits are mapped one by one so they
  // land on their moment; loops run at a steady tempo in film time between their mapped start and end.
  var ev = [];
  function E0(t, k, o) { o = o || {}; o.t = t; o.k = k; ev.push(o); }
  function E(t, k, o) { E0(w(t), k, o); }
  function each(a, b, step, fn) { for (var t = w(a), z = w(b), i = 0; t < z - 0.01; t += step, i++) fn(t, i); }
  function phrase(t, str, beat, k, v, base) {
    t = w(t);
    str.trim().split(/\s+/).forEach(function (tok) {
      var m = tok.match(/^([_^]*[SrRgGMmPdDnN]|-)([\d.]+)$/), d = parseFloat(m[2]) * beat;
      if (m[1] !== '-') E0(t, k || 'flute', { f: nf(m[1], base), d: d, v: v || 1 });
      t += d;
    });
  }
  function drone(t0, t1, v, low) {
    each(t0, t1 - 0.5, 2.4, function (t) {
      [[0, 1.5, 0.9], [0.6, 2, 0.8], [1.2, 2, 0.8], [1.8, 1, 1.1]].forEach(function (q) { E0(t + q[0], 'tan', { f: D3 * q[1] / (low ? 2 : 1), v: q[2] * v }); });
    });
  }
  function pad(t, d, chord, v, bright) { var a = w(t), z = w(t + d); chord.forEach(function (r) { E0(a, 'pad', { f: D3 * r, d: z - a, v: v || 1, b: bright || 1 }); }); }
  // tabla bols over a span: pattern of [bol] per step
  function tabla(t0, t1, step, pat, v) {
    each(t0, t1, step, function (t, i) { var b = pat[i % pat.length]; if (b !== '-') E0(t, 'bol', { b: b, v: v || 1 }); });
  }
  function swoosh(t, d, v) { E0(w(t) - d, 'swoosh', { d: d, v: v || 1 }); }

  /* ------------------------------------------------------------- the score */
  var minor = [1, 6 / 5, 3 / 2], major = [1, 5 / 4, 3 / 2], sus = [1, 4 / 3, 3 / 2];
  // opening: a hush, then the title
  drone(0.2, S.kannauj + 0.5, 0.8);
  pad(0.4, 8.6, [0.5, 1, 3 / 2, 2], 0.7);
  [1.0, 2.6, 4.2, 5.8, 7.4].forEach(function (t, i) { E(t, 'santoor', { f: nf(['P', 'D', 'S', 'R', 'G'][i], D3 * 2), v: 0.7 }); });
  phrase(3.2, 'G1 R.5 S.5 _D1 S2', 0.55, 'flute', 0.8);
  swoosh(8.8, 1.6, 1); E(8.8, 'boom', { v: 1 }); E(8.8, 'shimmer', { v: 1 });
  pad(8.8, 4.6, [1, 5 / 4, 3 / 2, 2, 5 / 2], 1.0, 1.4);
  ['S', 'G', 'P', '^S', '^G', '^P'].forEach(function (n, i) { E(9.1 + i * 0.12, 'santoor', { f: nf(n, D3 * 2), v: 0.8 }); });

  // the legend: romance (Yaman colour: the sharp fourth)
  drone(S.kannauj, S.tarain, 0.9);
  pad(S.kannauj, 10.2, major, 0.55); pad(S.portrait, 5.8, [1, 5 / 4, 15 / 8 / 1.0], 0.5); pad(S.ridge, 5.6, [1, 4 / 3 * 1.0, 5 / 3], 0.5);
  phrase(14.0, 'N1 R.5 G1.5 m.5 G.5 R1 S2', 0.6);
  phrase(19.0, 'G.5 m.5 D1 N.5 D.5 P2', 0.6, 'flute', 0.9);
  phrase(23.6, 'P1 m.5 G.5 R1 G1 S2', 0.6);
  for (var k = 0; k < 8; k++) E(S.portrait + 0.2 + k * 0.6, 'santoor', { f: nf(['S', 'G', 'P', 'G', 'D', 'P', 'G', 'R'][k], D3 * 2), v: 0.55 });
  tabla(S.ridge, S.hall, 0.42, ['dha', 'ge', 'na', 'ti', 'na', 'ke', 'dhi', 'na'], 0.55);
  phrase(29.0, 'S.5 G.5 P1 D.5 ^S1.5 D.5 P1', 0.6);
  // the hall
  pad(S.hall, 4.6, major, 0.6);
  tabla(S.hall, 38.4, 0.42, ['dha', '-', 'na', 'ti', 'dha', '-', 'dhi', 'na'], 0.5);
  pad(38.6, 6.0, [1, 6 / 5, 64 / 45], 0.7, 0.7); E(38.6, 'boom', { v: 0.6 }); drone(38.6, 45, 0.6, true);
  E(41.0, 'bell', { f: 880, v: 0.4 }); E(43.0, 'bell', { f: 830, v: 0.35 });
  tabla(45.2, 49.6, 0.3, ['dha', 'ge', 'na', 'ti', 'na', 'ke', 'dhi', 'na'], 0.65);
  phrase(45.4, 'S.5 R.5 G.5 m.5 P.5 D.5 N.5 ^S1.5', 0.5);
  pad(45.2, 5.6, sus, 0.55);
  swoosh(50.9, 0.9, 0.7); E(50.9, 'boom', { v: 0.8 }); E(50.9, 'shimmer', { v: 1.1 });
  pad(50.9, 5.6, [1, 5 / 4, 3 / 2, 15 / 8, 2], 1.0, 1.5);
  ['^S', 'N', 'D', 'P', 'G', 'R', 'S'].forEach(function (n, i) { E(51.1 + i * 0.13, 'bell', { f: nf(n, D3 * 4), v: 0.45 }); });
  E(53.3, 'whoosh2', { v: 0.5 });
  // the night ride
  tabla(S.ride - 0.4, S.tarain, 0.19, ['dha', 'ti', 'ge', 'na', 'dha', 'ti', 'dha', 'ge', 'ti', 'na', 'ke', 'dha', 'ge', 'na', 'dhi', 'na'], 0.75);
  pad(S.ride, 8.5, [1, 6 / 5, 3 / 2], 0.65);
  each(S.ride, S.tarain, 0.76, function (t) { E0(t, 'kick', { v: 0.55 }); });
  phrase(S.ride + 0.6, 'P.5 d.5 P.5 M.5 g1 M.5 P.5 d1 P1', 0.38, 'flute', 0.9);
  phrase(S.ride + 4.6, '^S.5 n.5 d.5 P.5 M.5 g.5 R.5 S1.5', 0.38, 'flute', 0.9);
  // Tarain
  swoosh(S.tarain, 1.2, 1);
  each(S.tarain, S.desk, 0.95, function (t) { E0(t, 'dhol', { v: 1 }); E0(t + 0.475, 'dhol', { v: 0.55, hi: 1 }); });
  E(67.6, 'boom', { v: 1.2 }); E(67.6, 'shimmer', { v: 0.6 });
  pad(S.tarain, 7.6, [0.5, 1, 6 / 5, 3 / 2], 0.9, 0.8);
  phrase(68.2, 'P1 d.5 P.5 M1 g1 R.5 S1.5', 0.5, 'flute', 0.8);

  // Act 2: the evidence — sparse and curious
  swoosh(S.desk + 0.2, 1.1, 0.9); E(S.desk + 0.2, 'boom', { v: 0.5 });
  each(S.desk + 1, S.raso, 0.5, function (t, i) { E0(t, 'tick', { v: i % 2 ? 0.4 : 0.6 }); });
  pad(S.desk + 0.4, 6.1, [0.5, 1, 6 / 5], 0.5, 0.6);
  drone(S.desk + 0.5, S.closing, 0.55, true);
  var bass = ['S', 'S', 'g', 'S', 'P', 'S', 'g', 'n'];
  each(S.raso, S.closing - 0.3, 0.33, function (t, i) {
    if (i % 2 === 0) E0(t, 'bass', { f: nf('_' + bass[(i / 2 | 0) % bass.length], D3 / 2 * 4), v: 0.75 });
    if (i % 4 === 2) E0(t, 'shaker', { v: 0.35 });
    if (i % 8 === 4) E0(t, 'pluck', { f: nf(['g', 'P', 'n', 'P'][(i / 8 | 0) % 4], D3 * 2), v: 0.45 });
  });
  [S.raso, S.vijaya, S.plates, S.echoes, S.map, S.verdict].forEach(function (t, i) { swoosh(t + 0.3, 0.9, 0.7); pad(t + 0.2, 6, i % 2 ? [1, 6 / 5, 3 / 2] : [1, 4 / 3, 8 / 5], 0.4, 0.7); });
  [86.4, 87.15, 87.9, 88.65].forEach(function (t2, i) { E(t2 + 0.3, 'pluck', { f: nf(['P', 'n', '^S', '^g'][i], D3 * 4), v: 0.6 }); });
  E(89.0, 'chime', { v: 0.6 });
  for (var tk = 98.29; tk < 99.1; tk += 0.09) E(tk, 'type', { v: 0.6 });
  E(102.4, 'buzz', { v: 0.8 });
  E(106.2, 'chime', { v: 0.8 }); E(107.6, 'pluck', { f: nf('_P', D3 * 2), v: 0.8 });
  for (var nn = 0; nn < 6; nn++) E(114.2 + nn * 0.9, 'bell', { f: nf(['P', 'n', '^S', '^g', '^S', 'n'][nn], D3 * 4), v: 0.35 });
  E(127.85, 'boom', { v: 0.9 }); E(127.85, 'dhol', { v: 0.8 }); E(131.25, 'boom', { v: 0.9 }); E(131.25, 'dhol', { v: 0.8 });
  [['yes', 0], ['yes', 1], ['yes', 2], ['yes', 3], ['maybe', 4], ['no', 5], ['no', 6]].forEach(function (r) {
    var tr = 137.6 + r[1] * 1.45 + 0.3;
    if (r[0] === 'yes') E(tr, 'chime', { v: 0.6, up: r[1] });
    else if (r[0] === 'no') E(tr, 'buzz', { v: 0.6 });
    else E(tr, 'pluck', { f: nf('M', D3 * 2), v: 0.8 });
  });
  E(144.4, 'boom', { v: 1 }); E(144.4, 'stamp', { v: 1 });

  // closing: warmth
  swoosh(S.closing, 1.4, 0.8);
  drone(S.closing, S.end - 1.5, 0.9);
  pad(S.closing, 5.5, [1, 5 / 4, 3 / 2, 2], 0.85, 1.2); pad(S.closing + 5.5, 5.6, [4 / 3, 5 / 3, 2, 8 / 3], 0.8, 1.2);
  phrase(151.0, 'G1 m.5 D.5 N1 ^S2 N.5 D.5 P2', 0.6);
  each(S.closing + 0.3, S.closing + 0.3 + 16 * 0.65, 0.65, function (t, i) { E0(t, 'santoor', { f: nf(['S', 'G', 'P', '^S', 'D', 'P', 'G', 'P'][i % 8], D3 * 2), v: 0.5 }); });
  // outro: celebration
  swoosh(S.outro, 1, 1); E(S.outro + 0.9, 'shimmer', { v: 1 }); E(S.outro + 0.9, 'boom', { v: 0.7 });
  tabla(S.outro + 0.9, S.end - 1.4, 0.26, ['dha', 'ge', 'na', 'ti', 'na', 'ke', 'dhi', 'na'], 0.7);
  each(S.outro + 0.9, S.end - 1.4, 1.04, function (t) { E0(t, 'kick', { v: 0.6 }); });
  [[S.outro + 0.9, major], [S.outro + 5.06, [4 / 3, 5 / 3, 2]], [S.outro + 9.2, [3 / 2, 15 / 8, 9 / 4]], [S.outro + 13.4, major]].forEach(function (q) { pad(q[0], 4.2, q[1], 0.7, 1.3); });
  each(S.outro + 0.9, S.outro + 0.9 + 48 * 0.26, 0.26, function (t, i) { E0(t, 'santoor', { f: nf(['S', 'G', 'P', 'G', '^S', 'P', 'G', 'P'][i % 8], D3 * 2), v: i % 2 ? 0.35 : 0.5 }); });
  phrase(S.outro + 1.4, 'G.5 P.5 D1 ^S.5 D.5 P1 G.5 R.5 S1', 0.52);
  E(168.6, 'pop', { v: 1 }); E(168.6, 'shimmer', { v: 0.8 });
  [0, 0.12, 0.24].forEach(function (o) { E(170.2 + o, 'bell', { f: 1760, v: 0.6 }); });
  E(176.0, 'boom', { v: 0.6 }); pad(176.0, 2.0, [1, 5 / 4, 3 / 2, 2], 0.9, 1.3); E(176.0, 'bell', { f: nf('^S', D3 * 4), v: 0.6 });

  /* ------------------------------------------------------------- the synthesiser */
  function render() {
    var sr = 44100, ctx = new OfflineAudioContext(2, Math.ceil(sr * TOTAL), sr);
    var master = ctx.createGain(); master.gain.value = 0.85;
    var comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.005; comp.release.value = 0.2;
    master.connect(comp); comp.connect(ctx.destination);
    master.gain.setValueAtTime(0.85, TOTAL - 1.8); master.gain.linearRampToValueAtTime(0.0001, TOTAL);
    // reverb from deterministic noise
    var len = sr * 2.8, ir = ctx.createBuffer(2, len, sr);
    for (var ch = 0; ch < 2; ch++) { var dd = ir.getChannelData(ch), s = 9 + ch * 31; for (var i = 0; i < len; i++) { s = (s * 16807) % 2147483647; dd[i] = (s / 2147483647 * 2 - 1) * Math.pow(1 - i / len, 3); } }
    var conv = ctx.createConvolver(); conv.buffer = ir;
    var wet = ctx.createGain(); wet.gain.value = 0.32; conv.connect(wet); wet.connect(master);
    var bus = ctx.createGain(); bus.connect(master); bus.connect(conv);
    var dry = ctx.createGain(); dry.gain.value = 1; dry.connect(master);           // drums: mostly dry
    var drumVerb = ctx.createGain(); drumVerb.gain.value = 0.12; drumVerb.connect(conv);
    // white noise buffer
    var nb = ctx.createBuffer(1, sr, sr), nd = nb.getChannelData(0), ns = 3;
    for (var j = 0; j < sr; j++) { ns = (ns * 16807) % 2147483647; nd[j] = ns / 2147483647 * 2 - 1; }

    function osc(type, f, t, d) { var o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.start(t); o.stop(t + d); return o; }
    function noise(t, d) { var n = ctx.createBufferSource(); n.buffer = nb; n.loop = true; n.start(t); n.stop(t + d); return n; }
    function env(t, peak, a, hold, rel) {
      var g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + a);
      if (hold) g.gain.setValueAtTime(peak, t + a + hold);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + (hold || 0) + rel); return g;
    }
    function filt(type, f, q) { var b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; return b; }
    function pan(x) { var p = ctx.createStereoPanner(); p.pan.value = x; return p; }
    function to(node, out) { node.connect(out); return out; }

    var V = {
      tan: function (e) {
        [1, 1.003].forEach(function (det, i) {
          var o = osc('sawtooth', e.f * det, e.t, 3), lp = filt('lowpass', e.f * 8, 1.2);
          lp.frequency.setValueAtTime(e.f * 9, e.t); lp.frequency.exponentialRampToValueAtTime(e.f * 2.2, e.t + 2.4);
          var g = env(e.t, 0.026 * e.v, 0.012, 0, 2.8); o.connect(lp); lp.connect(g); g.connect(pan(i ? 0.3 : -0.3)).connect(bus);
        });
      },
      pad: function (e) {
        [-7, 0, 7].forEach(function (cents, i) {
          var o = osc('sawtooth', e.f * Math.pow(2, cents / 1200), e.t, e.d + 2), lp = filt('lowpass', 900 * e.b, 0.7);
          var g = ctx.createGain(); g.gain.setValueAtTime(0.0001, e.t); g.gain.linearRampToValueAtTime(0.014 * e.v, e.t + Math.min(1.2, e.d * 0.4));
          g.gain.setValueAtTime(0.014 * e.v, e.t + Math.max(0.1, e.d - 0.6)); g.gain.exponentialRampToValueAtTime(0.0001, e.t + e.d + 1.4);
          o.connect(lp); lp.connect(g); g.connect(pan([-0.5, 0, 0.5][i])).connect(bus);
        });
      },
      flute: function (e) {
        var o = osc('sine', e.f, e.t, e.d + 0.6), o2 = osc('triangle', e.f * 2, e.t, e.d + 0.6), lfo = osc('sine', 5.3, e.t, e.d + 0.6);
        var lg = ctx.createGain(); lg.gain.setValueAtTime(0, e.t); lg.gain.linearRampToValueAtTime(e.f * 0.007, e.t + Math.min(e.d * 0.7, 0.45));
        lfo.connect(lg); lg.connect(o.frequency); lg.connect(o2.frequency);
        var g = env(e.t, 0.1 * e.v, 0.07, Math.max(e.d - 0.12, 0.02), 0.34), g2 = ctx.createGain(); g2.gain.value = 0.06;
        var br = noise(e.t, e.d + 0.4), bf = filt('bandpass', e.f * 1.5, 2), bg = env(e.t, 0.012 * e.v, 0.05, Math.max(e.d - 0.1, 0.02), 0.2);
        br.connect(bf); bf.connect(bg); bg.connect(bus);
        o.connect(g); o2.connect(g2); g2.connect(g); g.connect(pan(0.1)).connect(bus);
      },
      santoor: function (e) {
        [1, 1.004].forEach(function (det, i) {
          var o = osc('triangle', e.f * det, e.t, 1.6), g = env(e.t, 0.05 * e.v, 0.003, 0, 1.4);
          var o2 = osc('sine', e.f * 3 * det, e.t, 0.5), g2 = env(e.t, 0.012 * e.v, 0.002, 0, 0.35);
          o.connect(g); o2.connect(g2); g.connect(pan(i ? 0.35 : -0.15)).connect(bus); g2.connect(bus);
        });
        var n = noise(e.t, 0.03), hp = filt('highpass', 3000), ng = env(e.t, 0.03 * e.v, 0.001, 0, 0.03); n.connect(hp); hp.connect(ng); ng.connect(bus);
      },
      pluck: function (e) {
        var o = osc('sawtooth', e.f, e.t, 1.2), lp = filt('lowpass', e.f * 6, 3);
        lp.frequency.setValueAtTime(e.f * 8, e.t); lp.frequency.exponentialRampToValueAtTime(e.f * 1.2, e.t + 0.5);
        var g = env(e.t, 0.05 * e.v, 0.004, 0, 0.9); o.connect(lp); lp.connect(g); g.connect(pan(-0.2)).connect(bus);
      },
      bell: function (e) {
        [[1, 1, 2.2], [2.76, 0.45, 1.2], [5.4, 0.2, 0.6]].forEach(function (q) {
          var o = osc('sine', e.f * q[0], e.t, q[2] + 0.1), g = env(e.t, 0.04 * e.v * q[1], 0.003, 0, q[2]); o.connect(g); g.connect(bus);
        });
      },
      chime: function (e) {
        var base = 1174.66 * Math.pow(2, (e.up || 0) * 2 / 12);
        [1, 1.5].forEach(function (r, i) { var o = osc('sine', base * r, e.t + i * 0.07, 1.2), g = env(e.t + i * 0.07, 0.05 * e.v, 0.003, 0, 1.0); o.connect(g); g.connect(bus); });
      },
      buzz: function (e) {
        var o = osc('square', 110, e.t, 0.5), lp = filt('lowpass', 600), g = env(e.t, 0.05 * e.v, 0.005, 0.12, 0.2);
        o.frequency.setValueAtTime(130, e.t); o.frequency.linearRampToValueAtTime(98, e.t + 0.3); o.connect(lp); lp.connect(g); g.connect(bus);
      },
      bass: function (e) {
        var o = osc('sine', e.f, e.t, 0.5), o2 = osc('triangle', e.f * 2, e.t, 0.4), g = env(e.t, 0.14 * e.v, 0.01, 0.05, 0.25), g2 = env(e.t, 0.02 * e.v, 0.01, 0, 0.2);
        o.connect(g); o2.connect(g2); g.connect(dry); g2.connect(dry);
      },
      bol: function (e) {
        var t = e.t, v = e.v;
        if (e.b === 'dha' || e.b === 'ge' || e.b === 'dhi') {          // bayan: low, with a pitch bend
          var o = osc('sine', 80, t, 0.6); o.frequency.setValueAtTime(e.b === 'ge' ? 70 : 85, t); o.frequency.exponentialRampToValueAtTime(e.b === 'ge' ? 120 : 110, t + 0.18);
          var g = env(t, 0.22 * v, 0.004, 0, e.b === 'ge' ? 0.45 : 0.35); o.connect(g); g.connect(dry); g.connect(drumVerb);
        }
        if (e.b === 'dha' || e.b === 'na' || e.b === 'dhi') {          // dayan: a ringing tone
          var f = e.b === 'dhi' ? 470 : 520, o2 = osc('sine', f, t, 0.5), o3 = osc('sine', f * 2.02, t, 0.2);
          var g2 = env(t, 0.07 * v, 0.002, 0, e.b === 'na' ? 0.32 : 0.22), g3 = env(t, 0.03 * v, 0.002, 0, 0.1);
          o2.connect(g2); o3.connect(g3); g2.connect(pan(0.15)).connect(dry); g3.connect(dry); g2.connect(drumVerb);
        }
        if (e.b === 'ti' || e.b === 'ke') {                              // a dry slap
          var n = noise(t, 0.06), bp = filt('bandpass', e.b === 'ti' ? 2500 : 1200, 1.5), g4 = env(t, 0.09 * v, 0.001, 0, 0.05);
          n.connect(bp); bp.connect(g4); g4.connect(dry);
        }
      },
      kick: function (e) {
        var o = osc('sine', 120, e.t, 0.4); o.frequency.setValueAtTime(120, e.t); o.frequency.exponentialRampToValueAtTime(45, e.t + 0.2);
        var g = env(e.t, 0.32 * e.v, 0.003, 0, 0.3); o.connect(g); g.connect(dry);
      },
      dhol: function (e) {
        var f0 = e.hi ? 180 : 95, o = osc('sine', f0, e.t, 0.7); o.frequency.setValueAtTime(f0 * 1.4, e.t); o.frequency.exponentialRampToValueAtTime(f0, e.t + 0.08);
        var g = env(e.t, 0.35 * e.v, 0.003, 0, e.hi ? 0.25 : 0.55); o.connect(g); g.connect(dry); g.connect(drumVerb);
        var n = noise(e.t, 0.12), lp = filt('lowpass', 1600), g2 = env(e.t, 0.12 * e.v, 0.001, 0, 0.1); n.connect(lp); lp.connect(g2); g2.connect(dry);
      },
      boom: function (e) {
        var o = osc('sine', 70, e.t, 2.2); o.frequency.setValueAtTime(90, e.t); o.frequency.exponentialRampToValueAtTime(38, e.t + 1.2);
        var g = env(e.t, 0.42 * e.v, 0.005, 0, 1.9); o.connect(g); g.connect(dry); g.connect(drumVerb);
        var n = noise(e.t, 1.2), lp = filt('lowpass', 400), g2 = env(e.t, 0.2 * e.v, 0.005, 0, 1.0); n.connect(lp); lp.connect(g2); g2.connect(bus);
      },
      stamp: function (e) {
        var n = noise(e.t, 0.2), bp = filt('bandpass', 700, 0.8), g = env(e.t, 0.35 * e.v, 0.001, 0, 0.16); n.connect(bp); bp.connect(g); g.connect(dry);
      },
      shimmer: function (e) {
        for (var i = 0; i < 9; i++) {
          var f = 1760 * Math.pow(2, [0, 4, 7, 12, 16, 19, 24, 16, 12][i] / 12), t = e.t + i * 0.045;
          var o = osc('sine', f, t, 1.5), g = env(t, 0.018 * e.v, 0.004, 0, 1.3); o.connect(g); g.connect(pan(i % 2 ? 0.5 : -0.5)).connect(bus);
        }
      },
      swoosh: function (e) {
        var n = noise(e.t, e.d + 0.3), bp = filt('bandpass', 400, 1.2);
        bp.frequency.setValueAtTime(300, e.t); bp.frequency.exponentialRampToValueAtTime(5000, e.t + e.d);
        var g = ctx.createGain(); g.gain.setValueAtTime(0.0001, e.t); g.gain.exponentialRampToValueAtTime(0.16 * e.v, e.t + e.d * 0.9); g.gain.exponentialRampToValueAtTime(0.0001, e.t + e.d + 0.25);
        n.connect(bp); bp.connect(g); g.connect(bus);
      },
      whoosh2: function (e) { V.swoosh({ t: e.t, d: 0.7, v: e.v }); },
      tick: function (e) {
        var o = osc('square', 2200, e.t, 0.03), hp = filt('highpass', 1500), g = env(e.t, 0.03 * e.v, 0.001, 0, 0.02); o.connect(hp); hp.connect(g); g.connect(dry);
      },
      type: function (e) {
        var n = noise(e.t, 0.04), bp = filt('bandpass', 3200, 2), g = env(e.t, 0.08 * e.v, 0.001, 0, 0.03); n.connect(bp); bp.connect(g); g.connect(dry);
      },
      shaker: function (e) {
        var n = noise(e.t, 0.1), hp = filt('highpass', 6000), g = env(e.t, 0.04 * e.v, 0.01, 0, 0.06); n.connect(hp); hp.connect(g); g.connect(pan(0.4)).connect(dry);
      },
      pop: function (e) {
        var o = osc('sine', 300, e.t, 0.3); o.frequency.setValueAtTime(300, e.t); o.frequency.exponentialRampToValueAtTime(900, e.t + 0.1);
        var g = env(e.t, 0.2 * e.v, 0.004, 0, 0.2); o.connect(g); g.connect(dry);
      }
    };
    ev.forEach(function (e) { if (e.t >= 0 && e.t < TOTAL && V[e.k]) V[e.k](e); });
    return ctx.startRendering().then(function (buf) {
      var n = buf.length, L0 = buf.getChannelData(0), R0 = buf.getChannelData(1), peak = 0;
      for (var i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L0[i]), Math.abs(R0[i]));
      var gain = peak > 0 ? 0.89 / peak : 1;                          // normalise to about -1 dBFS
      var out = new DataView(new ArrayBuffer(44 + n * 4));
      function str(o, s) { for (var k = 0; k < s.length; k++) out.setUint8(o + k, s.charCodeAt(k)); }
      str(0, 'RIFF'); out.setUint32(4, 36 + n * 4, true); str(8, 'WAVE'); str(12, 'fmt ');
      out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 2, true);
      out.setUint32(24, sr, true); out.setUint32(28, sr * 4, true); out.setUint16(32, 4, true); out.setUint16(34, 16, true);
      str(36, 'data'); out.setUint32(40, n * 4, true);
      for (var j = 0, o = 44; j < n; j++, o += 4) {
        out.setInt16(o, Math.max(-1, Math.min(1, L0[j] * gain)) * 32767, true);
        out.setInt16(o + 2, Math.max(-1, Math.min(1, R0[j] * gain)) * 32767, true);
      }
      var bytes = new Uint8Array(out.buffer), bin = '', CH = 0x8000;
      for (var q = 0; q < bytes.length; q += CH) bin += String.fromCharCode.apply(null, bytes.subarray(q, q + CH));
      return { wav: btoa(bin), peak: peak, events: ev.length };
    });
  }
  return { render: render, events: ev };
})();
