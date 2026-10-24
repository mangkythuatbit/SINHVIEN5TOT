/**
 * SV5T BIT — Nhận yêu cầu đóng góp hoạt động từ trang nien-bieu.html
 * và ghi vào MỘT GOOGLE SHEET RIÊNG (khác Sheet niên biểu).
 *
 * CÁCH CÀI ĐẶT
 * 1. Tạo Google Sheet mới (VD: "SV5T – Yêu cầu xét duyệt"), để ở chế độ riêng tư.
 * 2. Extensions (Tiện ích mở rộng) → Apps Script → dán toàn bộ file này.
 * 3. Chạy hàm setupSheet() một lần (cấp quyền khi được hỏi) để tạo tiêu đề cột.
 * 4. Deploy (Triển khai) → New deployment → loại "Web app":
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy "Web app URL" dán vào REQUEST_CONFIG.WEB_APP_URL trong nien-bieu.html.
 * 5. Mỗi lần sửa code: Deploy → Manage deployments → Edit → New version.
 *
 * BCH duyệt bằng cách đổi cột "Trạng thái" trong Sheet:
 *   Chờ duyệt / Đã duyệt / Bị từ chối  → trang web tự cập nhật.
 */

const SHEET_NAME = 'Yêu cầu xét duyệt';
const HEADERS = ['Thời gian gửi', 'Mã yêu cầu', 'Email', 'Tên hoạt động', 'Link hoạt động', 'Ghi chú', 'Trạng thái'];
const STATUSES = ['Chờ duyệt', 'Đã duyệt', 'Bị từ chối'];
const NOTIFY_EMAIL = ''; // (tuỳ chọn) điền email BCH để nhận thông báo mỗi khi có yêu cầu mới
const LIST_LIMIT = 50;

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

// Chạy 1 lần để tạo tiêu đề cột và danh sách chọn cho cột Trạng thái
function setupSheet() {
  const sh = getSheet_();
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  sh.setFrozenRows(1);
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  sh.getRange(2, HEADERS.length, sh.getMaxRows() - 1, 1).setDataValidation(rule);
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
    sh.appendRow([new Date(), code, email, name, link, note, STATUSES[0]]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, '[SV5T] Yêu cầu hoạt động mới: ' + name,
        'Mã: ' + code + '\nEmail: ' + email + '\nHoạt động: ' + name + '\nLink: ' + link + '\nGhi chú: ' + note);
    }
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
      .filter(r => r[1])
      .reverse()
      .slice(0, LIST_LIMIT)
      .map(r => ({
        code: String(r[1]),
        name: String(r[3]),
        link: /^https?:\/\//i.test(String(r[4])) ? String(r[4]) : '',
        status: map[String(r[6]).trim()] || 'pending'
      }));
    return json_({ ok: true, items: items });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
