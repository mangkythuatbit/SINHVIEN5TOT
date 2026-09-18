# TIẾN ĐỘ DỰ ÁN — Cổng thông tin Sinh viên 5 Tốt khoa BIT (Phase 1)

Cập nhật lần cuối: **Nâng cấp UI/UX theo hướng gọn – hiện đại – "Gen Z" hơn** cho 2 trang Front-end, và **dựng mới hoàn chỉnh Trang Admin (CMS)** theo đúng đặc tả Phase 1 (dữ liệu demo lưu LocalStorage, sẵn sàng nối API khi có Backend thật).

## ⚠️ Lưu ý quan trọng — CHƯA kiểm tra bằng ảnh chụp trình duyệt thật
Do môi trường dựng bài không tải được trình duyệt headless (Playwright bị chặn mạng), bản cập nhật này **mới chỉ được kiểm tra qua**: parse cấu trúc HTML, kiểm tra cú pháp JS bằng Node, rà soát logic thủ công. **Chưa có ảnh chụp màn hình xác nhận layout hiển thị đúng như mong đợi.** Vui lòng mở trực tiếp 3 file `.html` trên trình duyệt (Chrome/Edge) để kiểm tra hình ảnh thực tế trước khi bàn giao — nếu có lỗi hiển thị/vỡ layout, phản hồi lại để chỉnh tiếp.

## Đợt cập nhật mới nhất — Sửa bố cục Section 1 "Về phong trào" (theo phản hồi lần 3)
- [x] **Sửa lỗi tabs đè lên khung "Tham gia group chinh phục SV5T"**: nguyên nhân do tabs dùng `position: sticky` còn khung group nằm ngay bên dưới trong cùng một cột — khi cuộn, tabs (đã "positioned") nổi đè lên khung group. Đã tách 2 khối ra khỏi nhau hoàn toàn để không còn khả năng chồng đè.
- [x] **Chuyển tabs từ bố cục dọc (cột trái) sang bố cục ngang** (hàng ngang phía trên, dạng 3 thẻ bo góc có số thứ tự + tiêu đề + mô tả ngắn), gọn và dễ quét mắt hơn theo đúng yêu cầu.
- [x] Khung "Tham gia group" (`about-stat-card`) chuyển sang cột phụ bên phải, đứng độc lập — sticky theo cột riêng của nó nên an toàn, không đè lên phần tử nào khác.
- [x] Responsive mobile: tabs cuộn ngang gọn gàng, khung group tự rớt xuống dưới nội dung (tắt sticky ở màn hình nhỏ).
- [x] Đã rà lại cấu trúc HTML bằng parser (BeautifulSoup) để đảm bảo không còn thẻ `div` thừa/thiếu sau khi tái cấu trúc.
- ⚠️ Vẫn đang **chưa xem trực tiếp bằng trình duyệt thật** theo yêu cầu người dùng (đóng gói giao ngay để tự kiểm tra) — nếu bố cục vẫn chưa như ý, phản hồi lại để chỉnh tiếp.

## Đợt cập nhật trước — UI/UX "Gen Z" + Trang Admin (theo yêu cầu chỉnh sửa lần 2)
- [x] **Nâng cấp giao diện tổng thể** cho `index.html` + `nien-bieu.html`: giữ nguyên đúng 2 màu gốc BIT (`#367CB3` xanh, `#4F464B` than), không thêm màu lạ — chỉ làm mềm mại/trẻ trung hơn bằng:
  - Bo góc lớn hơn (`--radius-lg/xl`: 20px → 24–32px), thêm gradient phái sinh từ màu gốc (`--gradient-primary`, `--gradient-dark`, `--gradient-hero`) dùng cho nút CTA, hero, thẻ nổi bật
  - Thanh nav chuyển sang dạng pill nổi (viên thuốc bo tròn) thay vì gạch chân đơn giản
  - Nút bấm có đổ bóng màu (glow) + hiệu ứng nảy nhẹ khi hover (bounce easing) thay vì chuyển động phẳng
  - Hero thêm badge "kicker" chấm nhấp nháy ("Đang mở đăng ký · 2026"), tiêu đề hero có hiệu ứng gradient chữ
  - Eyebrow (nhãn nhỏ đầu mục) chuyển từ chữ trơn sang dạng pill có nền màu + icon ✦
  - Card (gallery, lịch sử, vinh danh), bảng, toast, modal, badge trạng thái... đều được làm mềm/tăng khoảng trắng/tăng độ tương phản để dễ nhìn hơn
  - Cập nhật `root.css`: bổ sung token `--radius-xl`, `--shadow-glow`, `--shadow-glow-dark`, `--ease-bounce`, nhóm token `--gradient-*`
- [x] Thêm liên kết "BCH đăng nhập" (kín đáo, không nổi bật với sinh viên) ở thanh copyright cuối Footer của cả 2 trang, trỏ đến `admin.html`

## 🆕 Trang Admin (`admin.html` + `admin.css`) — MỚI DỰNG HOÀN CHỈNH
Trước đây trang Admin nằm ngoài phạm vi (do là hệ thống có xác thực/CSDL thật). Lần này đã dựng **bản demo đầy đủ giao diện + luồng thao tác** cho toàn bộ trang con mô tả trong tài liệu, dữ liệu lưu tạm ở LocalStorage (chưa có Backend/DB thật):
- [x] **Màn hình đăng nhập `/bit-login`**: mô phỏng luồng "chọn tài khoản Google" → nhập email → đối chiếu whitelist (demo 2 email mẫu: `bch.doanhoi.bit@ueh.edu.vn` vai trò Admin, `kythuat.sv5t.bit@ueh.edu.vn` vai trò Editor). Sai email hiện thông báo lỗi rõ ràng. **Chưa nối Google OAuth2 thật** — sẽ thay bằng SDK Google Identity khi có Backend (đúng NFR-01).
- [x] **Dashboard**: thống kê nhanh (hoạt động đang chạy, gương mặt tiêu biểu, tiêu chuẩn con, yêu cầu chờ duyệt) + banner cảnh báo số yêu cầu mới + bảng 5 hoạt động cập nhật gần nhất
- [x] **Quản lý Trang chủ**:
  - Tab "Lịch sử SV5T qua từng năm": Thêm/Sửa/Xóa (năm, mô tả bộ nhận diện, số liệu highlight)
  - Tab "Vinh danh SV5T tiêu biểu": Thêm/Sửa/Xóa hồ sơ đầy đủ trường theo tài liệu (họ tên, phân loại UEH/TP/Khoa, năm đạt giải, thành tích chi tiết, ô nhập link ảnh — chưa hỗ trợ upload file trực tiếp, đúng NFR-01)
- [x] **Quản lý Niên biểu**:
  - Tab "Tiêu chuẩn con": Thêm/Sửa/Xóa, gắn vào 1 trong 5 tiêu chuẩn gốc
  - Tab "Hoạt động": Form thêm có chọn Tiêu chuẩn → Tiêu chuẩn con (cascade), nhập đủ Tên/Cấp độ/Thời gian/Yêu cầu/Ghi chú, đổi trạng thái Bật/Tắt/Đã đóng nhanh bằng 1 click ngay trên bảng, có bộ lọc theo 5 tiêu chuẩn
- [x] **Quản lý Yêu cầu xét duyệt**: danh sách yêu cầu sinh viên gửi từ trang Niên biểu, lọc theo trạng thái, nút Duyệt (chọn cấp ghi nhận trước khi xác nhận) / Từ chối, hiện đầy đủ email cho BCH xử lý (khác với trang sinh viên — không lộ email công khai)
- [x] Sidebar điều hướng dạng CMS chuẩn (Dashboard / Quản lý Trang chủ / Quản lý Niên biểu / Yêu cầu xét duyệt), có avatar + vai trò người dùng + đăng xuất, responsive drawer cho mobile/tablet
- ⚠️ Toàn bộ dữ liệu Admin hiện là **mock lưu LocalStorage của trình duyệt**, độc lập với dữ liệu mock trên 2 trang Front-end (`index.html`, `nien-bieu.html`) — khi có Backend thật, cả Admin lẫn Front-end sẽ cùng đọc/ghi 1 nguồn CSDL duy nhất theo đúng schema trong tài liệu (`home_histories`, `home_honors`, `criteria`, `sub_criteria`, `activities`, `activity_requests`, `users`)
- ⚠️ Đã tự rà soát logic (kiểm tra cú pháp JS bằng Node, kiểm tra cấu trúc HTML bằng BeautifulSoup, sửa 2 lỗi phát hiện được: lỗi thứ tự khởi tạo biến khi khôi phục phiên đăng nhập, lỗi trùng ID giữa 2 bộ tab con gây xung đột trạng thái) nhưng **chưa xem trực tiếp trên trình duyệt** — xem mục cảnh báo ở đầu file

## Đợt cập nhật UI/UX trước đó (đã hoàn thành, giữ nguyên trong bản này)
- [x] Tách Section 1 "Về phong trào" thành **3 tabs** thay vì 1 khối dài: (1) Danh hiệu SV5T, (2) Phong trào & hoạt động, (3) 5 tiêu chuẩn đánh giá — mỗi tab 3–4 đoạn văn riêng biệt, có thể mở rộng nội dung sau mà không phá layout
- [x] Thêm khối "thông tin nhanh" (stat card) cạnh tabs thay cho box liệt kê tiêu chuẩn cũ (tránh trùng nội dung với tab 3)
- [x] Tabs có `role="tab"/"tabpanel"`, `aria-selected`, điều hướng bằng phím mũi tên — chuẩn accessibility hơn
- [x] Làm lại **Footer** thành bố cục 4 cột chuyên nghiệp: Thương hiệu (logo + mô tả + social icon Facebook/Email), Điều hướng, Tham gia, Liên hệ + thanh bản quyền riêng
- [x] Thêm hiệu ứng đổ bóng cho header khi cuộn trang (`is-scrolled`), thêm hero kicker badge, dải sóng chuyển màu trước Footer để đồng bộ mô-típ đường cong của logo
- [x] Bổ sung token `--shadow-lg`, `--shadow-header`, `--ease-out` vào `root.css`
- Áp dụng đồng bộ Footer mới + hiệu ứng header cho **cả 2 trang** (`index.html`, `nien-bieu.html`)

## Phạm vi bản dựng (Phase 1 — bản demo tĩnh, chưa có Backend/DB thật)
Theo tài liệu mô tả, hệ thống có 3 nhóm trang: **Trang chủ**, **Niên biểu hoạt động** (front-end, không cần đăng nhập) và **Trang Admin** (CMS, cần Google OAuth2, dữ liệu động). Cả 3 trang đều đã được dựng giao diện + luồng thao tác đầy đủ trong bản này. Trang Admin dùng whitelist email demo + LocalStorage thay cho Google OAuth2 + CSDL thật — sẽ thay lớp xác thực/lưu trữ này bằng Backend khi dự án bước vào giai đoạn phát triển thật (không cần đổi giao diện).

## Bộ khung kỹ thuật
- [x] Tạo cấu trúc thư mục dự án
- [x] Copy logo vào `/assets`
- [x] Lấy mã màu chuẩn từ logo: `#367CB3` (xanh), `#4F464B` (than)
- [x] `root.css` — design token (màu, font, spacing, bo góc, đổ bóng)
- [x] `style.css` — style dùng chung (header, hero, section, footer) — **đã xong phần dùng cho Trang chủ**, sẽ bổ sung thêm phần riêng cho Niên biểu ở bước tiếp theo

## Trang 1 — Trang chủ (`index.html`) ✅ HOÀN THÀNH
- [x] Header + thanh menu (Trang chủ, Niên biểu, Đăng ký SV5T, icon hoạt động đã lưu — icon đã đặt chỗ, click sẽ báo "sắp ra mắt" đúng như tài liệu ghi có thể đẩy về sau)
- [x] Hero banner slider (3 banner, tự chuyển 5s, có dot điều hướng, click ra link ngoài `target="_blank"`)
- [x] Section 1 — Giới thiệu phong trào SV5T + khối 5 tiêu chuẩn + link group Facebook
- [x] Section 2 — Slider ảnh hoạt động nổi bật (300×300, cuộn ngang) + nút xem thêm + ghi chú đề xuất Google Photos
- [x] Section 3 — SV5T qua từng năm (lưới 3×1, hover tối kèm số liệu — đúng FE-01.2)
- [x] Section 4 — Vinh danh SV5T tiêu biểu (tabs UEH/TP/Khoa mặc định UEH theo FE-01.3, lưới 3×3, click mở popup chi tiết theo FE-01.4)
- [x] Footer — 2 nút (đăng ký phong trào + group Facebook)
- ⚠️ Ảnh thật (banner, hoạt động, chân dung) đang là **placeholder có ghi chú kích thước** — cần đội nội dung cung cấp ảnh thật để thay thế
- ⚠️ Dữ liệu Vinh danh, Lịch sử SV5T hiện là dữ liệu mẫu (mock), sẽ nối API khi có Backend Admin (BE-02.1)

## Trang 2 — Niên biểu hoạt động (`nien-bieu.html`) ✅ HOÀN THÀNH
- [x] Menu 5 tiêu chuẩn (Học tập tốt, Đạo đức tốt, Tình nguyện tốt, Hội nhập tốt, Thể lực tốt) — mặc định load "Học tập tốt" theo FE-02.1
- [x] Section 1 — Bảng 5 cột (Tên HĐ | Cấp độ | Thời gian | Yêu cầu | Ghi chú) + bộ lọc kết hợp tên/cấp/trạng thái, lọc realtime (FE-02.2, FE-02.3)
- [x] Section 2 — Trạng thái rỗng khi không có kết quả → nút mở form "Đóng góp hoạt động" (Email, Tên HĐ, Link, Ghi chú) → sinh mã yêu cầu ngẫu nhiên 6 ký tự + thông báo toast (FE-03.1 → FE-03.3)
- [x] Section 3 — Bảng theo dõi yêu cầu đã gửi: chỉ hiện mã yêu cầu, tên HĐ, link, trạng thái — **không hiển thị email** (đúng FE-04.2)
- ⚠️ Dữ liệu hoạt động & yêu cầu hiện là mock trong JS (client-side) để demo giao diện/luồng thao tác — khi có Backend sẽ thay bằng gọi API tới bảng `activities` / `activity_requests`

## Việc CHƯA làm / còn thiếu trong bản này
- [ ] **Xem lại bằng trình duyệt thật** — bản này chưa có ảnh chụp xác nhận, xem cảnh báo đầu file
- [ ] Nối Google OAuth2 thật cho Trang Admin (hiện là whitelist email demo qua form nhập tay)
- [ ] Kết nối API/DB thật — toàn bộ 3 trang hiện dùng dữ liệu mock/demo (Front-end: biến JS cứng; Admin: LocalStorage)
- [ ] Trang Gallery album riêng (Section 2 trang chủ) — đề xuất dùng Google Photos, chưa dựng trang riêng
- [ ] Icon tracking hoạt động qua LocalStorage (menu số 4 - phía sinh viên) — tài liệu ghi rõ "có thể đẩy về sau Phase 1", chưa làm
- [ ] Upload ảnh trực tiếp trong Admin (Lịch sử, Vinh danh) — Phase 1 chỉ nhập link theo đúng NFR-01 (không cho upload file lên server)
- [ ] Middleware bảo vệ API `/api/admin/*` bằng Token/Session — chỉ thực hiện được khi có Backend thật
