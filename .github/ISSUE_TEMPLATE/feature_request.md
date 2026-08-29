---
name: Task Phase 1 - BIT SV5T
about: Tạo task giao việc chuẩn hóa cho các hạng mục trong dự án SV5T
title: '[TASK] '
labels: 'enhancement'
assignees: ''
---

**Mô tả công việc:**
[Tech Lead ghi rõ chi tiết cần làm là gì, ví dụ: Code giao diện Trang chủ section 4 Vinh danh dạng tabs và modal popup]

**Yêu cầu kỹ thuật / Ghi chú BRD:**
- [ ] Tham khảo tài liệu đặc tả Phase 1 (Trang chủ / Niên biểu / Form / CMS).
- [ ] 
**User Story (Câu chuyện người dùng):**
*Là một [Sinh viên / Admin / Khách], tôi muốn [tính năng gì] để [lợi ích / mục đích mang lại gì].*

**Luồng nghiệp vụ chi tiết (Business Flow):**
1. Bước 1: Người dùng thao tác...
2. Bước 2: Hệ thống xử lý...
3. Bước 3: Kết quả trả về...

**Yêu cầu dữ liệu & Ràng buộc (Data & Constraints):**
- Các trường dữ liệu bắt buộc: [Ví dụ: Email, Tên hoạt động,...]
- Ràng buộc logic: [Ví dụ: Mã request_code phải là duy nhất, tự sinh 6-8 ký tự...]

**Tiêu chí nghiệm thu (Acceptance Criteria - AC):**
**Tiêu chí hoàn thành (Definition of Done):**
- [ ] **Chức năng đúng BRD:** Đáp ứng đầy đủ các yêu cầu nghiệp vụ đã đặc tả trong tài liệu (không thiếu trường, đúng luồng, đúng logic).
- [ ] **Giao diện Responsive:** Hiển thị mượt mà, không vỡ layout trên cả 3 kích thước: Mobile (< 768px), Tablet (768px - 1024px) và Desktop (> 1024px).
- [ ] **Kiểm thử cục bộ (Local Testing):** Đã tự test kỹ trên máy cá nhân, không phát sinh lỗi Console (Error/Warning đỏ) ở trình duyệt.
- [ ] **Bảo mật & Dữ liệu:** 
    - [ ] Các trường dữ liệu nhạy cảm (như email ở bảng yêu cầu) đã được ẩn tuyệt đối ở Front-end theo đúng BRD.
    - [ ] Dữ liệu lưu LocalStorage (nếu có) hoạt động ổn định, không bị mất khi F5 lại trang.
- [ ] **Chất lượng mã nguồn (Code Quality):** Code sạch, đặt tên biến/hàm có ý nghĩa, đã xóa các đoạn code dư thừa (console.log test) trước khi đẩy lên.
- [ ] **Quy trình Git chuẩn:** Đã tạo Pull Request (PR) từ nhánh cá nhân (`feature/...`) trỏ vào đúng nhánh `dev`, điền mô tả rõ ràng và gắn thẻ Reviewer.
