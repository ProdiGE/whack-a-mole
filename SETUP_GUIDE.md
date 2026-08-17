# Live Leaderboard Setup Guide
### SVA Whack-a-Mole — Google Sheets Backend

Sundan mo lang ito nang paisa-isa. Walang koding kailangan — copy-paste lang. Mga 10 minuto lang ito.

---

## STEP 1 — Gumawa ng bagong Google Sheet

1. Pumunta sa **sheets.google.com** → **Blank spreadsheet**.
2. Palitan ang pangalan (top-left) ng: `SVA Whack-a-Mole Leaderboard`

---

## STEP 2 — Buksan ang Apps Script editor

1. Sa loob ng Sheet, click **Extensions** (sa menu bar) → **Apps Script**.
2. May lalabas na bagong tab na may default na `Code.gs` file na may sample code — **burahin lahat** ng laman nito.
3. I-copy-paste ang **buong laman** ng `Code.gs` na kasama sa files na ibinigay ko sa'yo, i-paste sa editor.
4. Click ang 💾 (Save) icon, o Ctrl+S / Cmd+S. Pwede mo palitan ang project name sa taas (e.g. "SVA Leaderboard Script").

---

## STEP 3 — I-deploy bilang Web App

1. Sa Apps Script editor, click ang asul na button na **Deploy** (upper right) → **New deployment**.
2. Sa "Select type", click ang ⚙️ gear icon sa tabi ng "Select type" → piliin **Web app**.
3. Punan ang settings:
   - **Description:** `SVA Leaderboard v1` (kahit ano)
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`

   ⚠️ Importante: dapat **"Anyone"** ang piliin (hindi "Only myself"), kasi ang mga estudyante mo ang magpapadala/kukuha ng data — pero walang makikita sa Sheet mo kundi ikaw lang, dahil ikaw pa rin ang "may-ari."

4. Click **Deploy**.
5. Magpapa-authorize si Google — click **Authorize access**, piliin ang Google account mo, tapos click **Advanced** → **Go to [project name] (unsafe)** → **Allow**. (Normal lang ito — sarili mong script naman ito.)
6. May lalabas na **Web app URL** — mukhang ganito:
   `https://script.google.com/macros/s/AKfycb.../exec`
   
   **I-copy ang buong URL na ito.** Ito ang gagamitin natin sa Step 4.

---

## STEP 4 — Ilagay ang URL sa laro

1. Buksan ang `index.html` (yung binigay ko) gamit ang **Notepad**, **VS Code**, o kahit anong text editor.
2. Hanapin ang linyang ito malapit sa taas ng `<script>` section (Ctrl+F: "SHEET_WEBHOOK_URL"):

   ```js
   const SHEET_WEBHOOK_URL = "";
   ```

3. Ilagay ang na-copy mong URL sa pagitan ng quotes:

   ```js
   const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```

4. I-save ang file.

---

## STEP 5 — I-upload/i-share sa mga estudyante

1. Ilagay ang na-edit mong `index.html` (kasama ang audio files na `bgm_1.*`, `FX_SNAKE.*`, `BGM_ROUND.*` sa **parehong folder**) sa kung saan mo ito ibabahagi sa klase (Google Classroom, Google Drive shared link na naka-"Anyone with the link", atbp).
2. Siguraduhing lahat ng estudyante ay pumapasok gamit ang **parehong URL** ng file — para sila lahat ay nag-lo-log sa parehong Google Sheet mo.

---

## STEP 6 — I-check ang Live Leaderboard

1. Habang naglalaro (o pagkatapos), click ang 🏆 button sa loob ng laro.
2. Makikita mo doon ang **"🟢 Live — updated [time]"** — ibig sabihin gumagana na, kumukuha na siya ng datos mula sa Sheet mo, hindi na lang sa sariling device.
3. Buksan din ang Google Sheet mo — makikita mo doon ang bawat tapos na laro bilang bagong row (Timestamp, Name, Section, Score, Time, Coins).
4. Puwede mong i-project sa harap ng klase ang leaderboard screen ng laro (🏆 button), at mag-a-auto-refresh ito kada 8 segundo habang bukas ang leaderboard — o pindutin ang **🔄 Refresh** button anytime.

---

## Paano gumagana sa likod (para lang malaman mo)

- Tuwing may nakakatapos ng laro, ang laro ay nagpapadala (POST) ng resulta niya papunta sa Web App URL mo, na nagsusulat naman nito bilang bagong row sa iyong Google Sheet.
- Tuwing may nagbubukas ng 🏆 Leaderboard screen, humihiling (GET) ang laro ng pinakabagong listahan mula sa parehong Web App URL, kaya nakikita ng lahat ang **same live results**, kahit magkaiba ang device nila.
- Kung walang internet ang isang estudyante, o hindi pa na-set-up ang URL, babalik lang ito sa dating "saved on this device" behavior — hindi masisira ang laro.

## Common issues

| Problema | Solusyon |
|---|---|
| Nakikita "⚠️ Could not reach the live scoreboard" | Siguraduhin **"Anyone"** ang access sa Step 3, at tama/kumpleto ang na-paste na URL (dapat nagtatapos sa `/exec`, hindi `/dev`). |
| Walang lumalabas sa Sheet kahit nakatapos na ng laro | I-check kung na-save at na-deploy talaga ang Apps Script (ulitin Step 2–3). Puwede ring gumawa ng **bagong deployment** (hindi lang i-edit yung luma) kung may binago kang code sa Apps Script pagkatapos ng unang deploy. |
| Gusto mag-edit ulit ng Apps Script code | Sa Apps Script editor, i-edit → Save → Deploy → **Manage deployments** → click ✏️ sa existing deployment → **New version** → Deploy. (Kailangan mo palagi mag-"New version" para mapaltan ang live na URL behavior.) |
