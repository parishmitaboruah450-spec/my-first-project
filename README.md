# my-first-project

## चंपा के सात रंग · Champa's Seven Colours

*एक मधुबनी कहानी — a Madhubani tale.*

An original illustrated story, told in Hindi and English, in the style of
Madhubani (Mithila) folk painting from Bihar and the Nepal Terai.

Champa has to paint the *kohbar* (wedding-chamber) wall for her sister's
wedding, but every colour pot is empty. She goes around the village asking for
the seven traditional colours. Each one comes with a motif:

| Colour | Source | Motif |
| --- | --- | --- |
| काला · Black | lamp soot + babool gum | the lamp |
| पीला · Yellow | turmeric | the sun |
| लाल · Red | kusum (safflower) blossoms | a pair of fish |
| हरा · Green | bel (wood-apple) leaves | the tree of life |
| नीला · Blue | indigo | the peacock |
| नारंगी · Orange | palash blossoms | the elephant |
| सफ़ेद · White | rice paste | the moon |

### Features

- Every illustration is hand-built SVG in code, with Madhubani's double
  outlines, hatching (*kachni*), patterned fills and no empty space.
- Switch between हिंदी, English, or both. The page remembers your choice.
- A colour shelf at the top fills Champa's pots as you read each chapter.
- The finale wall has a **"Let night fall"** button that brings the painting
  to life by moonlight.
- Works on phones, respects reduced-motion settings, and needs no build step.

### The animation

`animation.html` is a 1 minute 41 second animated short of the same story.
Each motif draws itself line by line and then fills with colour, and a drop
of that colour arcs into Champa's pot. The film ends with the whole kohbar
wall, which comes alive at night. It has bilingual captions, an optional
synthesised soundtrack (a tanpura drone, a bansuri-style tune in raag
Bhupali, and bells), chapter buttons, a scrubber and fullscreen. Keyboard:
Space plays or pauses, ← → skip five seconds.

### View it

Open `index.html` (the story) or `animation.html` (the film) in any browser.
To publish them, enable **GitHub Pages** (Settings → Pages → deploy from the
`main` branch, root folder).

## Rani Sanyogita: The Historical Truth (YouTube Short)

`sanyogita/` holds a 2 minute 58 second vertical (9:16, 1080×1920) animated
short for the **samistlei** channel. It tells the legend of Sanyogita and
Prithviraj Chauhan as the *Prithviraj Raso* tells it, then checks the legend
against the historical sources:

- the *Prithviraj Raso*, whose surviving versions are centuries later
- the *Prithviraja Vijaya*, written in Prithviraj's lifetime, which does not
  mention her in the part that survives
- Jaichand's copper-plate grants, which name his son Harishchandra
- the rivalry of the Chauhans and the Gahadavalas, and the battles of Tarain
  (1192) and Chandawar (1194)

It ends with a "legend vs history" checklist and a channel outro with a
subscribe animation.

Everything is drawn and animated in code (SVG and the Web Animations API).
The soundtrack is synthesised in `score.js`, which provides a tanpura,
bansuri, santoor, tabla, dhol and bells. Open `sanyogita/index.html` to play
it. The player has chapters, a scrubber, sound and fullscreen.

`index.html?record` shows only the stage. The export scripts use it to step
through the film frame by frame for video. Shorts must be 3 minutes or less,
and this one runs 2:58.
