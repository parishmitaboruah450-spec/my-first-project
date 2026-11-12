/* player.js — particles drawn on a canvas (dust, petals, embers, sparkles) and the player controls. */
(function (F) {
  'use strict';
  var S = F.S, O = F.O = F.O || {}, W = 1080, H = 1920;
  var RECORD = /[?&]record\b/.test(location.search);
  if (RECORD) document.documentElement.classList.add('rec');

  F.finish(S.end);
  var TOTAL = F.TOTAL;

  /* ------------------------------------------------------------------ particles */
  var cv = document.getElementById('fx'), ctx = cv.getContext('2d'), TAU = Math.PI * 2;
  var COLS = ['#e98a1c', '#f7c948', '#d4607a', '#f4ead2', '#c8311f'];
  function make(n, seed, fn) { var r = F.rng(seed), a = []; for (var i = 0; i < n; i++) a.push(fn(r, i)); return a; }
  function env(t, a, b, fi, fo) { if (t < a || t > b) return 0; return F.smooth(a, a + (fi || 0.8), t) * (1 - F.smooth(b - (fo || 0.8), b, t)); }

  var motes = make(110, 11, function (r) { return { x: r() * W, y: r() * H, vy: 6 + r() * 18, amp: 20 + r() * 50, f: 0.2 + r() * 0.5, ph: r() * TAU, s: 1 + r() * 2.4, tw: 1 + r() * 2.5 }; });
  function drawMotes(t, alpha, color) {
    if (alpha <= 0.002) return;
    ctx.fillStyle = color;
    for (var i = 0; i < motes.length; i++) {
      var m = motes[i], x = m.x + Math.sin(t * m.f + m.ph) * m.amp, y = ((m.y - m.vy * t) % H + H) % H;
      ctx.globalAlpha = alpha * (0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * m.tw + m.ph * 3)));
      ctx.beginPath(); ctx.arc(x, y, m.s, 0, TAU); ctx.fill();
    }
  }
  function petal(x, y, rot, flip, s, col, a) {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, flip);
    ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, 12 * s, 7 * s, 0, 0, TAU); ctx.fill(); ctx.restore();
  }
  var petals = make(60, 21, function (r) { return { x: r() * 1260 - 90, sp: 110 + r() * 120, amp: 30 + r() * 70, f: 0.5 + r() * 0.9, ph: r() * TAU, off: r() * 14, rot: r() * TAU, rs: (r() - 0.5) * 4, s: 0.7 + r() * 0.8, c: COLS[(r() * 5) | 0] }; });
  function drawPetals(t, a, b, alpha) {
    var e = env(t, a, b, 1.2, 1.2); if (e <= 0) return;
    for (var i = 0; i < petals.length; i++) {
      var q = petals[i], tau = ((t - a) + q.off) % 14, y = -60 + q.sp * tau;
      if (y > H + 50) continue;
      petal(q.x + Math.sin(tau * q.f + q.ph) * q.amp + 14 * tau, y, q.rot + q.rs * tau, 0.5 + 0.5 * Math.sin(tau * 3 + q.ph), q.s, q.c, e * alpha);
    }
  }
  var burstP = make(84, 31, function (r) { return { a: r() * TAU, v: 160 + r() * 560, rot: r() * TAU, rs: (r() - 0.5) * 9, s: 0.55 + r() * 0.8, c: COLS[(r() * 5) | 0], life: 1.5 + r() * 1.5 }; });
  function drawBurst(t, t0, ox, oy, golden) {
    var tau = t - t0; if (tau < 0 || tau > 3.1) return;
    for (var i = 0; i < burstP.length; i++) {
      var q = burstP[i]; if (tau > q.life) continue;
      var k = (1 - Math.exp(-2.4 * tau)) / 2.4;
      petal(ox + Math.cos(q.a) * q.v * k, oy + Math.sin(q.a) * q.v * k * 0.8 + 190 * tau * tau, q.rot + q.rs * tau, 0.5 + 0.5 * Math.sin(tau * 5 + q.rot), q.s,
        golden ? (i % 3 ? '#f7dc8a' : '#e8b84a') : q.c, 1 - tau / q.life);
    }
  }
  var dust = make(44, 41, function (r) { return { x: r() * 420, off: r() * 0.9, life: 0.7 + r() * 0.5, sz: 14 + r() * 30, vy: 20 + r() * 50 }; });
  var streaks = make(16, 43, function (r) { return { x: r() * 1500, y: 640 + r() * 860, v: 1500 + r() * 1200, len: 90 + r() * 200, a: 0.05 + r() * 0.1 }; });
  function drawRide(t) {
    var e = env(t, S.ride + 0.3, S.tarain + 0.5, 0.6, 0.6); if (e <= 0) return;
    ctx.fillStyle = '#9aa0e0';
    for (var i = 0; i < dust.length; i++) {
      var d = dust[i], tau = ((t + d.off) % d.life) / d.life;
      ctx.globalAlpha = e * 0.32 * (1 - tau);
      ctx.beginPath(); ctx.arc(330 + d.x * 0.55 - 420 * tau * d.life, 1418 - d.vy * tau, d.sz * (0.4 + tau), 0, TAU); ctx.fill();
    }
    ctx.strokeStyle = '#cfd6ff'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    for (var j = 0; j < streaks.length; j++) {
      var s = streaks[j], x = ((s.x - s.v * t) % 1500 + 1500) % 1500 - 210;
      ctx.globalAlpha = e * s.a; ctx.beginPath(); ctx.moveTo(x, s.y); ctx.lineTo(x + s.len, s.y); ctx.stroke();
    }
  }
  var embers = make(110, 51, function (r) { return { x: r() * W, y: r() * H, vy: 60 + r() * 150, amp: 10 + r() * 40, f: 0.6 + r() * 1.4, ph: r() * TAU, s: 1.4 + r() * 2.8, c: r() < 0.5 ? '#ffb04a' : '#ff7a3a' }; });
  function drawEmbers(t) {
    var e = env(t, S.tarain + 0.3, S.desk + 0.6, 0.8, 0.5); if (e <= 0) return;
    for (var i = 0; i < embers.length; i++) {
      var m = embers[i];
      ctx.globalAlpha = e * (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 6 * m.f + m.ph)));
      ctx.fillStyle = m.c; ctx.beginPath();
      ctx.arc(m.x + Math.sin(t * m.f + m.ph) * m.amp + 20 * (t - S.tarain), ((m.y - m.vy * t) % H + H) % H, m.s, 0, TAU); ctx.fill();
    }
  }
  var sparks = make(60, 61, function (r) { return { x: 540 + (r() - 0.5) * 960, y: (O.sparkY || 900) + (r() - 0.5) * 760, off: r() * 2, per: 1.1 + r() * 1.7, s: 7 + r() * 14 }; });
  function star(x, y, s, a) {
    ctx.globalAlpha = a; ctx.beginPath();
    ctx.moveTo(x, y - s); ctx.quadraticCurveTo(x, y, x + s, y); ctx.quadraticCurveTo(x, y, x, y + s); ctx.quadraticCurveTo(x, y, x - s, y); ctx.quadraticCurveTo(x, y, x, y - s); ctx.fill();
  }
  function drawSparks(t) {
    if (!O.name) return;
    var e = env(t, O.name, TOTAL + 2, 0.8, 0.2); if (e <= 0) return;
    ctx.fillStyle = '#ffe9a8';
    for (var i = 0; i < sparks.length; i++) { var q = sparks[i], ph = ((t + q.off) % q.per) / q.per, a = Math.sin(Math.PI * ph); star(q.x, q.y, q.s * a, e * a * 0.9); }
  }

  // Where is an element on screen at time t? Used to aim the particle bursts.
  function spot(el, t) {
    if (!el) return null;
    F.seek(t);
    var st = document.getElementById('stage').getBoundingClientRect(), r = el.getBoundingClientRect();
    return [t, (r.left + r.width / 2 - st.left) * W / st.width, (r.top + r.height * (el.dataset.ay ? +el.dataset.ay : 0.5) - st.top) * H / st.height];
  }
  if (O.garlandEl) O.garland = spot(O.garlandEl, F.W(O.garlandT + 0.2)), O.garland && (O.garland[0] = O.garlandT);
  if (O.clickEl) O.click = spot(O.clickEl, F.W(O.clickT + 0.05)), O.click && (O.click[0] = O.clickT);

  F.onFrame(function (ft) {
    var t = F.Winv(ft);
    ctx.clearRect(0, 0, W, H);
    drawMotes(t, 0.5 * env(t, 0.5, S.kannauj + 0.5, 1.5, 1), '#ffdca0');
    drawMotes(t, 0.6 * env(t, S.portrait, S.ride + 0.5, 1, 1), '#ffe2ae');
    drawMotes(t, 0.28 * env(t, S.desk + 1, S.closing + 0.5, 1.5, 1), '#d8ecff');
    drawMotes(t, 0.55 * env(t, S.closing, TOTAL + 2, 1.5, 0.5), '#ffdca0');
    drawPetals(t, 8.4, S.kannauj + 0.9, 0.95);
    if (O.garland) drawBurst(t, O.garland[0], O.garland[1], O.garland[2], false);
    drawRide(t); drawEmbers(t);
    drawPetals(t, S.closing + 0.5, S.outro + 1.2, 0.9);
    drawSparks(t);
    if (O.click) drawBurst(t, O.click[0], O.click[1], O.click[2], true);
    ctx.globalAlpha = 1;
  });

  /* --------------------------------------------------------------------- player */
  var playing = false, started = false, soundOn = true, audioOK = true, frame = 0;
  var overlay = document.getElementById('overlay'), playbtn = document.getElementById('playbtn'), playicon = document.getElementById('playicon');
  var scrub = document.getElementById('scrub'), timeEl = document.getElementById('time');
  var soundbtn = document.getElementById('soundbtn'), soundwave = document.getElementById('soundwave'), chaptersEl = document.getElementById('chapters');
  var audio = document.getElementById('track');
  scrub.max = TOTAL;
  audio.addEventListener('error', function () { audioOK = false; soundbtn.disabled = true; soundbtn.style.opacity = 0.4; });

  var CH = [[0, 'Title'], [S.kannauj, 'The legend'], [S.hall, 'The swayamvara'], [S.ride, 'The ride'], [S.question, 'The evidence'], [S.map, 'Jaichand'], [S.verdict, 'The verdict'], [S.outro, 'samistlei']]
    .map(function (q) { return [F.W(q[0]), q[1]]; });
  function fmt(t) { t = Math.max(0, Math.floor(t)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }
  var chBtns = CH.map(function (q) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = q[1];
    b.addEventListener('click', function () { begin(); seek(q[0]); if (!playing) play(); });
    chaptersEl.appendChild(b); return b;
  });
  function syncAudio(force) {
    if (!audioOK || RECORD) return;
    if (soundOn && playing) {
      var t = F.now();
      if (force || Math.abs(audio.currentTime - t) > 0.18) { try { audio.currentTime = t; } catch (e) {} }
      if (audio.paused) { var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {}); }
    } else if (!audio.paused) audio.pause();
  }
  function ui(t) {
    scrub.value = t; timeEl.textContent = fmt(t) + ' / ' + fmt(TOTAL);
    var cur = 0; CH.forEach(function (q, i) { if (t >= q[0] - 0.01) cur = i; });
    chBtns.forEach(function (b, i) { b.classList.toggle('on', i === cur); });
    playicon.setAttribute('d', playing ? 'M6 4h4v16H6zM14 4h4v16h-4z' : 'M7 4.5v15l13-7.5z');
    playbtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  }
  function seek(t) { F.seek(t); syncAudio(true); ui(F.now()); }
  function play() {
    if (F.now() >= TOTAL - 0.05) F.seek(0);
    F.play(); playing = true; syncAudio(true); ui(F.now()); requestAnimationFrame(tick);
  }
  function pause() { F.pause(); playing = false; syncAudio(true); ui(F.now()); }
  function tick() {
    if (!playing) return;
    var t = F.now();
    if (t >= TOTAL) { pause(); F.seek(TOTAL); ui(TOTAL); return; }
    F.render(t); ui(t);
    if (++frame % 45 === 0) syncAudio(false);
    requestAnimationFrame(tick);
  }
  function begin() { if (started) return; started = true; overlay.hidden = true; F.seek(0); }
  overlay.addEventListener('click', function () { begin(); play(); });
  playbtn.addEventListener('click', function () { begin(); playing ? pause() : play(); });
  document.getElementById('restart').addEventListener('click', function () { begin(); seek(0); if (!playing) play(); });
  scrub.addEventListener('input', function () { begin(); seek(parseFloat(scrub.value)); });
  soundbtn.addEventListener('click', function () {
    soundOn = !soundOn; soundbtn.setAttribute('aria-pressed', String(soundOn)); soundwave.setAttribute('opacity', soundOn ? '1' : '.3'); syncAudio(true);
  });
  document.getElementById('fsbtn').addEventListener('click', function () {
    var st = document.getElementById('stage');
    if (document.fullscreenElement) document.exitFullscreen(); else if (st.requestFullscreen) st.requestFullscreen();
  });
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' && e.key !== ' ') return;
    if (e.key === ' ') { e.preventDefault(); begin(); playing ? pause() : play(); }
    else if (e.key === 'ArrowRight') { begin(); seek(F.now() + 5); }
    else if (e.key === 'ArrowLeft') { begin(); seek(F.now() - 5); }
  });

  F.seek(RECORD ? 0 : 11.9);   // poster frame: the finished title card
  ui(F.now());
})(window.Film);
