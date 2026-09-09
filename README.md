# GPS Corrections Options

A phone and desktop reference for finding the right GPS correction subscription and part
number by receiver. Replaces the `GPS_Corrections_Options.xlsm` flowchart — same decision
path, no Excel, no macros, no "enable content" prompt. Share one URL with the parts counter
and sales floor.

## Put it online

1. Create a new GitHub repository and upload every file here, keeping the `img/` and
   `icons/` folders intact.
2. **Settings → Pages → Build and deployment**, source **Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
3. A minute later it's live at `https://<user>.github.io/<repo>/`.

Staff can bookmark it, or install it: Safari → Share → *Add to Home Screen*, or Chrome
menu → *Install app*. It works offline after the first load.

## What it does

- **Drill down** from brand → receiver → accuracy → term, exactly like the workbook.
- **Search** any part number or product name from the box at the top. Typing `48084211`
  or `CenterPoint` jumps straight there — faster than clicking through, which is the main
  thing the spreadsheet couldn't do.
- **Copy** puts a part number on the clipboard for pasting into an order.
- **Shareable links.** Every screen has its own URL. Sending
  `…/#cp_standard` opens CenterPoint RTX Standard directly, so you can paste a specific
  answer into an email or text.
- **Breadcrumbs** across the top show where you are and jump back a level.
- Accuracy badges are colour-coded: 6-8" bronze, 2-4" blue, <2" indigo, 1" RTK green.

## Updating part numbers

Everything lives in `data.js` as plain text. Find the product and edit the `parts` list:

```js
afs_plm1: {
  title: 'AFS / PLM 1', accuracy: '6-8"',
  question: 'How many years of AFS/PLM 1?',
  parts: [
    {term: '1 Year', pn: '48024525', via: 'VMS'},
    {term: '3 Year', pn: '92245714', via: 'VMS'}
  ]
},
```

Commit the change and everyone gets it on their next load. **Also bump `CACHE` in `sw.js`**
(`gps-corrections-v1` → `-v2`) or people who installed the app will keep seeing the old
numbers from their offline cache.

`via` must be `VMS`, `Trimble`, or `Raven` — it sets the "Order through" line and the
colour stripe. To add a whole new receiver or correction level, copy an existing node,
give it a new id, and add that id to the parent node's `children` list.

## Where the content came from

Extracted from `GPS_Corrections_Options.xlsm`. The flowchart lived in drawing shapes rather
than cells, with VBA macros (`Sheets("...").Select`) doing the navigation. Shape text,
click targets and the eight receiver photos were pulled from the file and rebuilt as a
decision tree: 30 screens, 48 subscription options, 27 unique part numbers.

Two small fixes were made in transcription: the repeated typo "Accruacy" is spelled
correctly, and "Onmistar" reads "OmniSTAR". No part numbers were changed.

## Files

```
index.html            app shell
styles.css            styling
app.js                navigation, search, deep links
data.js               the decision tree — edit this to update part numbers
manifest.webmanifest  install metadata
sw.js                 offline cache
img/                  receiver photos
icons/                home screen icons
```

Reference only. Confirm availability and pricing before ordering. Not affiliated with CNH
Industrial, Case IH, New Holland, Trimble, or Raven.
