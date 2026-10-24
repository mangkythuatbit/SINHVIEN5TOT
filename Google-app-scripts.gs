/**
 * SV5T BIT — Nhận yêu cầu đóng góp hoạt động từ trang nien-bieu.html
 * và ghi vào MỘT GOOGLE SHEET RIÊNG (khác Sheet niên biểu).
 *
 * CÁCH CÀI ĐẶT
 * 1. Tạo Google Sheet mới (VD: "SV5T – Yêu cầu xét duyệt"), để ở chế độ riêng tư.
 * 2. Extensions (Tiện ích mở rộng) → Apps Script → dán toàn bộ file này.
 * 3. Chạy setupSheet() một lần (cấp quyền khi được hỏi) để tạo tiêu đề cột.
 * 4. Chạy testMail_() một lần để cấp quyền gửi mail và kiểm tra hộp thư.
 * 5. Deploy → New deployment → loại "Web app" (Execute as: Me, Who has access: Anyone).
 *    Copy "Web app URL" dán vào REQUEST_CONFIG.WEB_APP_URL trong nien-bieu.html.
 * 6. Mỗi lần sửa code: Deploy → Manage deployments → Edit → New version.
 *
 * BCH duyệt bằng cách đổi cột "Trạng thái" và chọn cấp ở cột "Ghi nhận":
 *   Trạng thái: Chờ duyệt / Đã duyệt / Bị từ chối
 *   Ghi nhận:   Cấp UEH / Cấp khoa / Cấp TW / Cấp TP  (chỉ hiện trên web khi đã duyệt)
 */

const SHEET_NAME = 'Yêu cầu xét duyệt';
const HEADERS = ['Thời gian gửi', 'Mã yêu cầu', 'Email', 'Tên hoạt động', 'Link hoạt động', 'Ghi chú', 'Trạng thái', 'Ghi nhận'];
const COL = { TIME: 1, CODE: 2, EMAIL: 3, NAME: 4, LINK: 5, NOTE: 6, STATUS: 7, LEVEL: 8 }; // số cột, bắt đầu từ 1
const STATUSES = ['Chờ duyệt', 'Đã duyệt', 'Bị từ chối'];
const LEVELS = ['Cấp UEH', 'Cấp khoa', 'Cấp TW', 'Cấp TP'];
const NOTIFY_EMAIL = 'mangkythuat.bit@gmail.com'; // nhiều người nhận: 'a@x.com,b@y.com'
const LIST_LIMIT = 50;

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

// Chạy lại được nhiều lần, không mất dữ liệu: tạo tiêu đề + danh sách chọn cho Trạng thái và Ghi nhận
function setupSheet() {
  const sh = getSheet_();
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  sh.setFrozenRows(1);
  const rows = Math.max(sh.getMaxRows() - 1, 1);
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  const levelRule = SpreadsheetApp.newDataValidation().requireValueInList(LEVELS, true).setAllowInvalid(false).build();
  sh.getRange(2, COL.STATUS, rows, 1).setDataValidation(statusRule);
  sh.getRange(2, COL.LEVEL, rows, 1).setDataValidation(levelRule);
}

// Chống chèn công thức vào Sheet (ô bắt đầu bằng = + - @)
function clean_(v, max) {
  let s = String(v == null ? '' : v).trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Gửi mail báo cho BCH. Lỗi mail không làm hỏng việc ghi yêu cầu.
function notify_(d) {
  if (!NOTIFY_EMAIL) return;
  try {
    const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '[SV5T] Yêu cầu hoạt động mới: ' + d.name,
      body:
        'Có yêu cầu mới gửi từ trang Niên biểu.\n\n' +
        'Mã yêu cầu: ' + d.code + '\n' +
        'Email người gửi: ' + d.email + '\n' +
        'Hoạt động: ' + d.name + '\n' +
        'Link: ' + d.link + '\n' +
        'Ghi chú: ' + (d.note || '—') + '\n\n' +
        'Mở Sheet để duyệt: ' + sheetUrl,
      replyTo: d.email,
      name: 'SV5T BIT'
    });
  } catch (err) {
    console.error('Gửi mail thất bại: ' + err);
  }
}

// Chạy 1 lần trong trình soạn thảo: cấp quyền gửi mail + kiểm tra
// Chạy 1 lần trong trình soạn thảo để cấp quyền gửi mail + kiểm tra
function testMail() {
  Logger.log('Hạn mức mail còn lại hôm nay: ' + MailApp.getRemainingDailyQuota());
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '[SV5T] Thư kiểm tra',
    body: 'Nếu bạn nhận được thư này thì cấu hình gửi mail đã chạy.'
  });
  Logger.log('Đã gửi tới ' + NOTIFY_EMAIL);
}

// Nhận yêu cầu từ form (POST)
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const d = JSON.parse(e.postData.contents);

    const code = clean_(d.code, 12);
    const email = clean_(d.email, 120);
    const name = clean_(d.name, 200);
    const link = clean_(d.link, 500);
    const note = clean_(d.note, 1000);

    if (!/^[A-Z0-9]{4,12}$/.test(code)) return json_({ ok: false, error: 'invalid_code' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: 'invalid_email' });
    if (!name) return json_({ ok: false, error: 'missing_name' });
    if (!/^https?:\/\//i.test(link)) return json_({ ok: false, error: 'invalid_link' });

    const sh = getSheet_();
    if (sh.getLastRow() === 0) setupSheet();
    // Cột "Ghi nhận" để trống: BCH chọn cấp khi xét duyệt
    sh.appendRow([new Date(), code, email, name, link, note, STATUSES[0], '']);

    notify_({ code, email, name, link, note });
    return json_({ ok: true, code: code });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Trả danh sách yêu cầu cho bảng theo dõi (GET ?action=list) — KHÔNG trả về email
function doGet(e) {
  try {
    if ((e.parameter.action || 'list') !== 'list') return json_({ ok: false, error: 'unknown_action' });
    const sh = getSheet_();
    const last = sh.getLastRow();
    if (last < 2) return json_({ ok: true, items: [] });

    const rows = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
    const map = { 'Đã duyệt': 'approved', 'Bị từ chối': 'rejected' };
    const items = rows
      .filter(r => r[COL.CODE - 1])
      .reverse()
      .slice(0, LIST_LIMIT)
      .map(r => {
        const status = map[String(r[COL.STATUS - 1]).trim()] || 'pending';
        const level = String(r[COL.LEVEL - 1]).trim();
        return {
          code: String(r[COL.CODE - 1]),
          name: String(r[COL.NAME - 1]),
          link: /^https?:\/\//i.test(String(r[COL.LINK - 1])) ? String(r[COL.LINK - 1]) : '',
          status: status,
          level: (status === 'approved' && LEVELS.indexOf(level) >= 0) ? level : '' // chỉ công khai khi đã duyệt
        };
      });
    return json_({ ok: true, items: items });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
