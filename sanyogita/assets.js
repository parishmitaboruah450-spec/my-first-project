/* assets.js — the paper-cut art kit: figures (with jointed limbs), the horse, and palace architecture.
   Every function returns SVG markup, so pieces can be re-coloured and reused in any scene. */
(function (F) {
  'use strict';
  var C = F.C = {
    ink: '#1c1014', skin: '#d79a6a', skinD: '#b97c52', skinF: '#e9b98d', skinFD: '#cf9a70',
    gold: '#e8b84a', goldL: '#f7dc8a', goldD: '#b98622',
    crimson: '#b3202e', crimsonD: '#8a1525', maroon: '#5e1220',
    teal: '#12606a', tealD: '#0b434b', saffron: '#e98a1c', saffronD: '#bf6610',
    ivory: '#f4ead2', ivoryD: '#d9cba8', rose: '#d4607a', indigo: '#1a1f4a', night: '#0d1030'
  };
  var A = F.A = {};
  function p(d, fill, more) { return '<path d="' + d + '" fill="' + (fill || 'none') + '"' + (more ? ' ' + more : '') + '/>'; }
  function st(d, stroke, w, more) {
    return '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (more ? ' ' + more : '') + '/>';
  }
  function c(x, y, r, fill, more) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '"' + (more ? ' ' + more : '') + '/>'; }
  A.p = p; A.st = st; A.c = c;

  /* ------------------------------------------------------------------ figures */
  var FACE_F = 'M150 84 C 164 84, 176 94, 179 110 C 180 116, 178 120, 179 124 L 193 140 C 194 143, 190 146, 183 146 C 183 149, 187 151, 186 154 C 185 156, 182 155, 181 156 C 184 158, 186 161, 184 164 C 182 166, 179 165, 179 168 C 181 173, 181 178, 175 181 C 170 183, 164 183, 160 182 L 160 210 L 128 210 L 128 170 C 116 150, 118 110, 130 94 C 136 87, 143 84, 150 84 Z';
  var FACE_M = 'M150 86 C 166 86, 178 96, 180 112 C 181 118, 179 121, 180 125 L 196 142 C 197 146, 192 149, 184 148 C 184 151, 186 153, 186 156 C 186 158, 184 159, 183 160 C 186 163, 187 167, 184 170 C 186 176, 184 184, 176 187 C 170 189, 164 188, 160 186 L 160 212 L 126 212 L 126 172 C 116 152, 118 112, 130 96 C 136 89, 143 86, 150 86 Z';

  // Rani Sanyogita, standing, facing right. Box 300 x 640, feet on y = 640.
  // Joints: .na1/.na2 near arm (shoulder, elbow), .fa1/.fa2 far arm, .veil-tail the flowing end of her odhni.
  A.sanyogita = function (o) {
    o = o || {};
    var sk = C.skinF, veil = o.veil || C.crimson, veilD = o.veilD || C.crimsonD, skirt = o.skirt || C.teal, skirtD = o.skirtD || C.tealD;
    return '<g class="fig">' +
      '<g transform="translate(142,220)"><g class="fa1" style="transform:rotate(-12deg)">' + st('M0 0 L0 56', veilD, 19) +
        '<g transform="translate(0,56)"><g class="fa2" style="transform:rotate(-60deg)">' + st('M0 0 L0 50', C.skinFD, 13) + '</g></g></g></g>' +
      // lehenga
      p('M112 300 C 98 380, 54 520, 28 626 Q 150 652 272 626 C 248 520, 204 380, 190 300 Z', skirt) +
      p('M112 300 C 98 380, 54 520, 28 626 Q 77 636.4 126 638.5 C 122 520, 128 400, 140 300 Z', skirtD, 'opacity=".5"') +
      st('M132 312 C 120 400, 98 520, 88 606 M152 312 L152 612 M172 312 C 184 400, 206 520, 216 606', skirtD, 3) +
      st('M46 566 Q 150 590 254 566', C.gold, 3, 'stroke-dasharray="1 11"') +
      st('M38 588 Q 150 612 262 588', C.gold, 5) +
      st('M32 610 Q 150 636 268 610', C.gold, 11) +
      st('M32 610 Q 150 636 268 610', C.crimson, 3.5, 'stroke-dasharray="1 12"') +
      // face, hair
      p(FACE_F, sk) +
      p('M152 80 C 126 76, 108 100, 110 134 C 111 154, 118 170, 128 176 L 132 150 C 126 126, 136 104, 160 98 C 168 96, 174 96, 178 100 C 174 88, 164 81, 152 80 Z', C.ink) +
      (o.eyes === 'closed' ? st('M163 123 q 7 4 14 0', C.ink, 2.6) :
        p('M163 123 q 8 -6 15 0 q -8 4 -15 0 Z', C.ivory) + c(172.5, 122.6, 2.7, C.ink) + st('M162 122 q 8 -7 17 -1 l 5 -3', C.ink, 2.4)) +
      st('M161 114 q 9 -6 18 -2', C.ink, 2.4) +
      c(178.5, 112, 2.6, C.crimson) +
      p('M182 153 C 185 152, 187 154, 186 156 C 184 158, 182 157, 181 156 Z', C.crimson) +
      '<circle cx="189" cy="147" r="6.5" fill="none" stroke="' + C.gold + '" stroke-width="2.2"/>' +
      st('M160 96 C 166 92, 172 94, 176 100', C.gold, 2.4) + c(177, 103, 3.4, C.gold) +
      // odhni (veil): flowing tail, then the part over her head
      '<g class="veil-tail">' + p('M98 232 C 88 300, 60 400, 60 470 C 60 502, 68 524, 80 534 C 86 502, 96 470, 104 440 C 110 400, 116 330, 126 248 Z', veil) +
        st('M126 250 C 116 330, 110 400, 104 440 C 96 470, 86 502, 80 534', C.gold, 4) +
        c(92, 330, 2.6, C.gold) + c(82, 400, 2.6, C.gold) + c(100, 380, 2.6, C.gold) + c(76, 462, 2.6, C.gold) + c(90, 440, 2.6, C.gold) + '</g>' +
      p('M172 82 C 150 62, 112 70, 100 108 C 90 142, 100 196, 96 250 L 127 256 C 130 226, 128 196, 126 160 C 124 126, 138 100, 173 94 Z', veil) +
      st('M173 93 C 138 100, 124 126, 126 160 C 128 196, 130 226, 127 256', C.gold, 4) +
      c(118, 104, 2.6, C.gold) + c(108, 140, 2.6, C.gold) + c(113, 186, 2.6, C.gold) + c(136, 84, 2.6, C.gold) + c(108, 224, 2.6, C.gold) +
      // choli, necklaces, waistband
      p('M120 206 C 110 238, 112 274, 114 306 L 188 306 C 192 274, 196 240, 186 206 C 170 196, 134 196, 120 206 Z', veilD) +
      st('M134 208 Q 152 232 171 208', C.gold, 4) + st('M128 210 Q 153 264 180 210', C.gold, 3) + c(153, 238, 6, C.crimson, 'stroke="' + C.gold + '" stroke-width="2.5"') +
      p('M112 296 L 190 296 L 191 310 L 111 310 Z', C.gold) + st('M114 303 H188', C.crimson, 2, 'stroke-dasharray="1 8"') +
      // near arm
      '<g transform="translate(158,220)"><g class="na1" style="transform:rotate(-10deg)">' + st('M0 0 L0 58', veilD, 21) + st('M-9 30 h18', C.gold, 3.5) + st('M0 34 L0 58', sk, 16) +
        '<g transform="translate(0,58)"><g class="na2" style="transform:rotate(-62deg)">' + st('M0 0 L0 52', sk, 14) + st('M-7 38 h14 M-7 44 h14 M-7 50 h14', C.gold, 3) +
        '<ellipse cx="0" cy="61" rx="8" ry="10" fill="' + sk + '"/><g class="hand"></g></g></g></g></g>' +
      '</g>';
  };

  A.maleHead = function (o) {
    o = o || {};
    var hair = o.hair || C.ink, tur = o.turban || C.saffron, turD = o.turbanD || C.saffronD;
    var s = p(FACE_M, o.skin || C.skin) +
      '<ellipse cx="140" cy="140" rx="7" ry="10" fill="' + C.skinD + '"/><circle cx="140" cy="155" r="4.5" fill="none" stroke="' + C.gold + '" stroke-width="2.5"/>' +
      p('M128 118 C 122 140, 124 162, 130 176 L 137 170 C 133 152, 133 134, 138 120 Z', hair) +
      p('M165 125 q 8 -6 15 0 q -8 5 -15 0 Z', C.ivory) + c(174, 125, 2.8, C.ink) + st('M162 117 q 10 -7 21 -1', C.ink, 3) +
      p('M189 151 C 181 148, 171 154, 161 152 C 155 151, 152 146, 154 142 C 148 146, 149 157, 158 160 C 168 163, 183 161, 189 155 Z', hair);
    if (o.beard) s += p('M185 166 C 188 186, 177 204, 160 207 C 143 209, 131 197, 127 176 C 138 189, 154 193, 168 187 C 176 183, 182 175, 185 166 Z', hair);
    if (o.crown) {
      s += p('M116 124 C 111 110, 113 98, 119 90 L 199 90 C 203 98, 201 108, 197 114 C 180 102, 152 104, 135 116 C 129 120, 123 123, 116 124 Z', C.goldD) +
        p('M118 92 L 113 52 L 132 76 L 142 40 L 156 74 L 170 44 L 181 76 L 199 56 L 199 92 Z', C.gold) +
        c(142, 62, 5, C.crimson) + c(170, 64, 5, C.teal) + c(124, 78, 4, C.crimson) + c(190, 76, 4, C.crimson) + st('M118 91 H199', C.goldL, 4);
    } else {
      s += p('M120 118 C 110 142, 108 172, 112 198 L 125 198 C 122 170, 124 142, 131 120 Z', turD) +
        p('M116 124 C 100 92, 124 56, 162 56 C 192 56, 206 80, 197 106 C 181 97, 156 101, 138 113 C 130 118, 123 122, 116 124 Z', tur) +
        st('M124 108 C 138 86, 170 78, 197 94 M120 118 C 134 98, 166 90, 197 102 M132 82 C 148 66, 176 64, 194 78', turD, 3) +
        p('M186 93 C 180 85, 184 73, 190 67 C 196 73, 198 85, 192 93 Z', C.gold) + c(189, 82, 3.5, C.crimson);
      if (o.plume) s += p('M188 69 C 184 44, 192 22, 208 12 C 203 30, 203 50, 196 72 Z', C.ivory) + st('M194 66 C 193 46, 198 30, 206 16', C.ivoryD, 1.6);
    }
    return s;
  };

  // Prithviraj Chauhan, standing, facing right. Box 300 x 650. Joints .na1/.na2 (near arm), .fa1/.fa2.
  A.prithviraj = function (o) {
    o = o || {};
    var robe = o.robe || C.teal, robeD = o.robeD || C.tealD, tur = o.turban || C.saffron, turD = o.turbanD || C.saffronD;
    return '<g class="fig">' +
      '<g transform="translate(140,222)"><g class="fa1" style="transform:rotate(10deg)">' + st('M0 0 L0 60', robeD, 21) +
        '<g transform="translate(0,60)"><g class="fa2" style="transform:rotate(-12deg)">' + st('M0 0 L0 48', robeD, 17) + '<ellipse cx="0" cy="58" rx="8" ry="10" fill="' + C.skinD + '"/></g></g></g></g>' +
      p('M155 478 L 157 630 L 185 630 L 181 478 Z', C.ivoryD) + p('M122 478 L 119 630 L 147 630 L 149 478 Z', C.ivory) +
      st('M124 560 h20 M123 580 h21 M122 600 h22', '#cbbd98', 2) +
      p('M148 630 C 150 622, 188 622, 194 630 C 202 640, 210 634, 211 626 C 216 638, 208 648, 192 648 L 154 648 C 146 648, 146 638, 148 630 Z', C.crimsonD) +
      p('M110 630 C 112 622, 150 622, 156 630 C 164 640, 172 634, 173 626 C 178 638, 170 648, 154 648 L 116 648 C 108 648, 108 638, 110 630 Z', C.crimson) +
      // jama (flared tunic)
      p('M114 208 C 102 252, 104 292, 110 322 C 96 382, 80 442, 68 500 Q 150 522 232 500 C 220 442, 204 382, 190 322 C 196 292, 198 252, 186 208 C 170 196, 130 196, 114 208 Z', robe) +
      p('M110 322 C 96 382, 80 442, 68 500 Q 100 510 132 513 C 128 440, 132 380, 142 322 Z', robeD, 'opacity=".55"') +
      st('M72 486 Q 150 508 228 486', C.gold, 8) + st('M77 469 Q 150 491 223 469', C.gold, 3, 'stroke-dasharray="1 10"') +
      st('M152 202 C 160 240, 158 290, 150 322 C 154 380, 160 450, 164 506', C.gold, 3) +
      p('M107 310 L 193 310 L 192 332 L 108 332 Z', tur) + st('M108 321 H192', turD, 2) +
      p('M146 330 L 138 404 L 160 408 L 164 330 Z', tur) + st('M139 399 L160 403', C.gold, 4) +
      st('M132 211 Q 152 240 174 211', C.ivory, 4.5, 'stroke-dasharray="0.1 7.5"') + st('M128 213 Q 153 270 181 213', C.gold, 3.5) + c(153.5, 242, 6.5, C.crimson, 'stroke="' + C.gold + '" stroke-width="2.5"') +
      A.maleHead({ turban: tur, turbanD: turD, plume: true }) +
      // talwar at the hip
      p('M118 328 C 104 372, 84 422, 54 466 L 63 473 C 94 432, 117 380, 131 334 Z', C.maroon) + st('M110 352 l12 5 M88 404 l11 6', C.gold, 4) + p('M54 466 L 44 482 L 63 473 Z', C.gold) +
      p('M108 304 L 136 315 L 131 327 L 103 316 Z', C.gold) + st('M116 306 C 108 290, 120 280, 132 288', C.gold, 4) +
      '<g transform="translate(160,222)"><g class="na1" style="transform:rotate(6deg)">' + st('M0 0 L0 62', robe, 23) + st('M-10 30 h20', C.gold, 3.5) +
        '<g transform="translate(0,62)"><g class="na2" style="transform:rotate(-20deg)">' + st('M0 0 L0 50', robe, 19) + st('M-9 44 h18', C.gold, 5) +
        '<ellipse cx="0" cy="62" rx="9" ry="11" fill="' + C.skin + '"/><g class="hand"></g></g></g></g></g>' +
      '</g>';
  };

  // A seated king, facing right. Box 240 x 300, cushion on y = 296.
  A.king = function (o) {
    o = o || {};
    var robe = o.robe || C.maroon, tur = o.turban || C.saffron, turD = o.turbanD || C.saffronD;
    return '<g class="fig">' +
      '<rect x="8" y="262" width="224" height="34" rx="15" fill="' + (o.cushion || C.crimsonD) + '"/>' + st('M24 279 H216', C.gold, 3, 'stroke-dasharray="1 9"') +
      '<ellipse cx="44" cy="212" rx="30" ry="54" fill="' + (o.bolster || C.tealD) + '"/>' + st('M27 176 Q 44 186 61 176 M27 248 Q 44 238 61 248', C.gold, 3) +
      p('M38 268 C 32 232, 80 212, 128 220 C 178 212, 216 236, 206 268 Z', o.dhoti || C.ivory) + st('M96 262 C 120 240, 160 236, 196 252', C.ivoryD, 3) +
      p('M82 230 C 72 192, 76 152, 90 136 C 106 126, 142 126, 154 138 C 168 156, 168 198, 160 230 Z', robe) +
      st('M100 138 C 120 170, 140 200, 158 226', C.gold, 5) + st('M106 134 Q 122 158 142 134', C.gold, 3.5) +
      '<g transform="translate(-22,-82)">' + A.maleHead({ turban: tur, turbanD: turD, crown: o.crown, beard: o.beard, hair: o.hair, plume: o.plume }) + '</g>' +
      '<g transform="translate(138,152)"><g class="na1" style="transform:rotate(-16deg)">' + st('M0 0 L0 50', robe, 20) +
        '<g transform="translate(0,50)"><g class="na2" style="transform:rotate(-54deg)">' + st('M0 0 L0 42', robe, 17) + st('M-8 38 h16', C.gold, 4) + '<ellipse cx="0" cy="52" rx="8" ry="10" fill="' + C.skin + '"/><g class="hand"></g></g></g></g></g>' +
      '</g>';
  };

  // The horse, facing right. Box 520 x 430. Joints: .hnu/.hnl hind-near upper/lower, .hfu/.hfl, .fnu/.fnl, .ffu/.ffl; .tail, .mane, .neck.
  A.horse = function (o) {
    o = o || {};
    var b = o.body || '#f1e7cf', bd = o.shade || '#cdbc97', m = o.mane || '#5b2e1d';
    function leg(x, y, col, cls, up, lo, wU, wL) {
      return '<g transform="translate(' + x + ',' + y + ')"><g class="' + cls + 'u">' + st('M0 0 L0 ' + up, col, wU) +
        '<g transform="translate(0,' + up + ')"><g class="' + cls + 'l">' + st('M0 0 L0 ' + lo, col, wL) +
        p('M-9 ' + (lo - 2) + ' L9 ' + (lo - 2) + ' L12 ' + (lo + 16) + ' L-12 ' + (lo + 16) + ' Z', C.ink) + '</g></g></g></g>';
    }
    return '<g class="horse">' +
      '<g class="tail">' + p('M104 158 C 62 146, 26 176, 6 236 C -6 272, 0 300, 12 318 C 16 280, 34 252, 58 242 C 50 262, 52 284, 62 298 C 70 256, 88 220, 108 196 Z', m) + '</g>' +
      leg(160, 222, bd, 'hf', 86, 84, 30, 15) + leg(350, 224, bd, 'ff', 84, 82, 24, 14) +
      p('M108 150 C 150 120, 300 118, 356 140 C 392 156, 404 196, 392 232 C 372 262, 312 262, 262 250 C 210 262, 150 266, 112 244 C 80 222, 82 170, 108 150 Z', b) +
      p('M104 232 C 140 252, 200 250, 262 238 C 330 250, 380 244, 394 226 C 392 232, 372 262, 312 262 C 290 262, 276 254, 262 250 C 210 262, 150 266, 112 244 Z', bd) +
      leg(138, 226, b, 'hn', 86, 84, 32, 16) + leg(368, 228, b, 'fn', 84, 82, 26, 15) +
      '<g class="neck">' +
      p('M330 152 C 346 104, 372 66, 404 44 C 420 34, 440 40, 446 56 C 430 90, 416 150, 400 228 C 378 222, 342 192, 330 152 Z', b) +
      p('M398 50 C 410 26, 440 22, 456 38 C 470 56, 492 86, 502 104 C 508 116, 500 128, 488 124 C 474 122, 456 112, 444 104 C 428 96, 410 84, 404 70 Z', b) +
      p('M430 34 L 437 10 L 449 33 Z', bd) + p('M418 34 L 421 4 L 438 29 Z', b) +
      c(447, 58, 4.5, C.ink) + c(492, 108, 2.6, C.ink) + st('M478 120 q 8 2 14 -2', C.ink, 2) +
      '<g class="mane">' + p('M414 32 C 396 28, 370 52, 354 84 C 342 108, 334 130, 326 154 L 346 150 C 352 124, 366 98, 382 78 C 394 62, 406 50, 418 46 Z', m) + '</g>' +
      st('M452 100 L 432 62 M470 84 L 452 102 M432 62 L 418 44', C.gold, 3.5) +
      '</g>' +
      p('M196 130 C 232 120, 292 120, 320 134 L 328 212 C 292 226, 232 226, 194 212 Z', C.crimson) +
      st('M200 143 C 234 133, 290 133, 316 145 M199 203 C 236 215, 290 215, 323 203', C.gold, 4) +
      st('M204 214 l-2 14 M224 220 l-1 14 M246 223 v14 M270 223 v14 M292 220 l1 14 M314 214 l2 14', C.gold, 4) +
      st('M320 140 C 350 150, 378 176, 392 214', C.gold, 5) + c(356, 172, 6, C.gold) + c(378, 196, 6, C.gold) +
      '</g>';
  };

  /* ------------------------------------------------------------- architecture */
  // Opening of a cusped (multifoil) arch: spans x..x+w, apex at y, springing line at y+rise, floor at y+h.
  A.archPath = function (x, y, w, h, rise, cusps) {
    var n = cusps || 5, cx = x + w / 2, ys = y + rise, pts = [], i;
    var H = rise, half = w / 2;
    if (H > half) {                         // pointed: two arcs with centres pushed across the centre line
      var d = (H * H - half * half) / w, R = half + d, ta = Math.acos(-d / R);
      for (i = 0; i <= n; i++) { var th = Math.PI - (Math.PI - ta) * i / n; pts.push([cx + d + R * Math.cos(th), ys - R * Math.sin(th), cx + d, ys]); }
    } else {                                // low arch: ellipse
      for (i = 0; i <= n; i++) { var a = Math.PI - (Math.PI / 2) * i / n; pts.push([cx + half * Math.cos(a), ys - H * Math.sin(a), cx, ys]); }
    }
    function bulge(a, b) {
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, nx = mx - a[2], ny = my - a[3], l = Math.hypot(nx, ny) || 1;
      var k = Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.42;
      return [mx + nx / l * k, my + ny / l * k];
    }
    var dS = 'M' + x + ' ' + (y + h) + ' L' + x + ' ' + ys;
    for (i = 0; i < n; i++) { var q = bulge(pts[i], pts[i + 1]); dS += ' Q' + q[0].toFixed(1) + ' ' + q[1].toFixed(1) + ' ' + pts[i + 1][0].toFixed(1) + ' ' + pts[i + 1][1].toFixed(1); }
    for (i = n; i > 0; i--) {
      var a1 = [2 * cx - pts[i][0], pts[i][1], 2 * cx - pts[i][2], pts[i][3]], b1 = [2 * cx - pts[i - 1][0], pts[i - 1][1], 2 * cx - pts[i - 1][2], pts[i - 1][3]];
      var q2 = bulge(a1, b1);
      dS += ' Q' + q2[0].toFixed(1) + ' ' + q2[1].toFixed(1) + ' ' + b1[0].toFixed(1) + ' ' + b1[1].toFixed(1);
    }
    return dS + ' L' + (x + w) + ' ' + (y + h) + ' Z';
  };
  A.dome = function (x, base, w, h, fill) {
    var hw = w / 2;
    return p('M' + (x - hw * 0.84) + ' ' + base + ' V' + (base - h * 0.24) + ' C' + (x - hw * 1.24) + ' ' + (base - h * 0.62) + ', ' + (x - hw * 0.44) + ' ' + (base - h * 0.93) + ', ' + x + ' ' + (base - h) +
      ' C' + (x + hw * 0.44) + ' ' + (base - h * 0.93) + ', ' + (x + hw * 1.24) + ' ' + (base - h * 0.62) + ', ' + (x + hw * 0.84) + ' ' + (base - h * 0.24) + ' V' + base + ' Z', fill) +
      '<path d="M' + x + ' ' + (base - h) + ' v' + (-h * 0.2) + '" stroke="' + fill + '" stroke-width="' + Math.max(2, w * 0.03) + '"/>' + c(x, base - h * 1.13, Math.max(2.5, w * 0.035), fill);
  };
  A.chhatri = function (x, base, s, fill) {
    var w = 90 * s, h = 120 * s;
    return '<g>' + p('M' + (x - w * 0.56) + ' ' + base + ' h' + (w * 1.12) + ' v' + (-8 * s) + ' h' + (-w * 1.12) + ' Z', fill) +
      [-0.4, 0, 0.4].map(function (k) { return '<rect x="' + (x + w * k - 3.5 * s) + '" y="' + (base - h * 0.62) + '" width="' + (7 * s) + '" height="' + (h * 0.56) + '" fill="' + fill + '"/>'; }).join('') +
      p('M' + (x - w * 0.66) + ' ' + (base - h * 0.58) + ' L' + (x + w * 0.66) + ' ' + (base - h * 0.58) + ' L' + (x + w * 0.52) + ' ' + (base - h * 0.68) + ' L' + (x - w * 0.52) + ' ' + (base - h * 0.68) + ' Z', fill) +
      A.dome(x, base - h * 0.66, w * 0.9, h * 0.42, fill) + '</g>';
  };
  A.wall = function (x1, x2, base, h, fill) {
    var top = base - h, d = 'M' + x1 + ' ' + base + ' V' + top, x = x1;
    while (x + 26 <= x2) { d += ' v-12 l7 -8 l7 8 v12 h12'; x += 26; }
    return p(d + ' H' + x2 + ' V' + base + ' Z', fill);
  };
  A.tower = function (x, base, w, h, fill, s) {
    return '<rect x="' + (x - w / 2) + '" y="' + (base - h) + '" width="' + w + '" height="' + h + '" fill="' + fill + '"/>' +
      p('M' + (x - w * 0.66) + ' ' + (base - h) + ' h' + (w * 1.32) + ' l' + (-w * 0.12) + ' ' + (-10) + ' h' + (-w * 1.08) + ' Z', fill) +
      A.chhatri(x, base - h - 9, s || w / 90, fill);
  };
  A.windows = function (x, y, cols, rows, dx, dy, w, h, fill, more) {
    var s = '';
    for (var r = 0; r < rows; r++) for (var k = 0; k < cols; k++) {
      var wx = x + k * dx, wy = y + r * dy;
      s += p('M' + wx + ' ' + (wy + h) + ' V' + (wy + w * 0.6) + ' C' + wx + ' ' + (wy + w * 0.15) + ', ' + (wx + w / 2) + ' ' + wy + ', ' + (wx + w / 2) + ' ' + wy +
        ' C' + (wx + w / 2) + ' ' + wy + ', ' + (wx + w) + ' ' + (wy + w * 0.15) + ', ' + (wx + w) + ' ' + (wy + w * 0.6) + ' V' + (wy + h) + ' Z', fill, more);
    }
    return s;
  };
  A.tree = function (x, base, s, fill) {
    return '<g transform="translate(' + x + ',' + base + ') scale(' + s + ')">' +
      p('M-7 0 C -5 -40, -10 -70, -30 -96 L -22 -100 C -10 -84, -2 -70, 0 -56 C 4 -76, 16 -92, 34 -104 L 40 -97 C 22 -84, 10 -60, 8 0 Z', fill) +
      p('M-92 -98 C -96 -124, -60 -140, -30 -134 C -10 -156, 40 -156, 56 -134 C 86 -138, 104 -118, 96 -98 C 60 -88, -50 -88, -92 -98 Z', fill) +
      p('M-50 -128 C -40 -150, 10 -158, 28 -140 C 10 -132, -30 -128, -50 -128 Z', fill) + '</g>';
  };
  A.bird = function () { return st('M-15 0 Q -8 -9 0 0 Q 8 -9 15 0', 'currentColor', 3); };
  // marigold garland as a string of beads along any path
  A.beads = function (d, w) {
    w = w || 13;
    return st(d, C.saffron, w, 'stroke-dasharray="0.1 ' + (w * 1.12) + '"') + st(d, C.goldL, w * 0.45, 'stroke-dasharray="0.1 ' + (w * 1.12) + '"');
  };
})(window.Film);
