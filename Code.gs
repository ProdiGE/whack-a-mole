/* ============================================================
   SVA Whack-a-Mole — Live Leaderboard Backend
   Paste this whole file into Extensions > Apps Script,
   then deploy as a Web App (see the setup guide).
   ============================================================ */

const SHEET_NAME = "Leaderboard"; // tab name inside your Google Sheet

// Runs when the game POSTs a finished run to log it.
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      String(data.name || ""),
      String(data.section || ""),
      Number(data.score || 0),
      Number(data.timeMs || 0),
      Number(data.coins || 0),
      String(data.stamp || "")
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Runs when the game asks (GET) for the current live standings.
function doGet(e) {
  try {
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    values.shift(); // drop header row
    const entries = values
      .filter(function (r) { return r[1]; }) // skip blank rows
      .map(function (r) {
        return {
          timestamp: r[0],
          name: r[1],
          section: r[2],
          score: Number(r[3]) || 0,
          timeMs: Number(r[4]) || 0,
          coins: Number(r[5]) || 0,
          stamp: r[6]
        };
      });
    entries.sort(function (a, b) { return (b.score - a.score) || (a.timeMs - b.timeMs); });
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, entries: entries.slice(0, 200) }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err), entries: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "Name", "Section", "Score", "TimeMs", "Coins", "Stamp"]);
  }
  return sheet;
}
