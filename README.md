# 🎓 Cổng thông tin Sinh viên 5 Tốt - Khoa Công nghệ Thông tin Kinh doanh (BIT)

![Project Status](https://img.shields.io/badge/Status-Phase_1_(In_Development)-blue)
![Target](https://img.shields.io/badge/Target-October_2026-orange)

## 📖 Giới thiệu dự án (Introduction)
Dự án **Cổng thông tin Sinh viên 5 Tốt (SV5T)** được xây dựng nhằm mục đích số hóa và chuẩn hóa quy trình tra cứu, theo dõi và quản lý các hoạt động thuộc phong trào Sinh viên 5 Tốt của khoa Công nghệ Thông tin Kinh doanh (BIT) - Đại học UEH.

**Mục tiêu Phase 1:** 
Trở thành một Cổng thông tin điện tử (Information Portal) tập trung, giúp sinh viên dễ dàng tra cứu hoạt động đối chiếu theo 5 tiêu chuẩn. Đồng thời cung cấp một hệ thống quản trị (CMS) tối ưu để Ban Chấp hành (BCH) quản lý dữ liệu và tiếp nhận các yêu cầu xét duyệt hoạt động từ sinh viên một cách tự động, minh bạch.

---

## ✨ Tính năng nổi bật (Key Features)

### 🧑‍🎓 Dành cho Sinh viên (Front-end)
- **Trang chủ (Landing Page):** Giới thiệu phong trào, vinh danh cá nhân tiêu biểu, highlight lịch sử các năm và cập nhật hình ảnh nổi bật.
- **Niên biểu hoạt động:** Tra cứu hàng trăm hoạt động được phân loại chuẩn xác theo 5 tiêu chuẩn (Đạo đức, Học tập, Thể lực, Tình nguyện, Hội nhập).
- **Bộ lọc thông minh (Smart Filter):** Lọc hoạt động theo Tên, Cấp độ, Trạng thái (Đang mở/Đã hết hạn).
- **Form yêu cầu xét duyệt:** Cho phép sinh viên gửi đề xuất các hoạt động chưa có trên hệ thống. Tự động sinh `Request Code` để theo dõi tiến độ duyệt (Bảo mật thông tin cá nhân).
- **Hoạt động của tôi (Local Cart):** (Tích hợp LocalStorage) Cho phép sinh viên tick chọn các hoạt động đã tham gia để tự theo dõi tiến độ và copy danh sách nộp hồ sơ.

### 🛡️ Dành cho Quản trị viên (Back-end / CMS)
- **Đăng nhập SSO:** Tích hợp đăng nhập bằng Google Account (Chỉ cho phép tài khoản Email nội bộ/Whitelist).
- **Dashboard:** Thống kê tổng quan số liệu hệ thống.
- **Quản lý Nội dung (CMS):** Thêm/Sửa/Xóa dữ liệu Vinh danh, Lịch sử phong trào (Hỗ trợ Rich Text Editor).
- **Quản lý Hoạt động & Tiêu chuẩn con:** Cấu trúc dữ liệu theo dạng Cây (Criteria -> Sub-Criteria -> Activities) giúp admin dễ dàng phân loại.
- **Xử lý Yêu cầu (Request Management):** Hệ thống tiếp nhận form từ sinh viên, cho phép Admin chuyển trạng thái (Duyệt/Từ chối) và tự động cập nhật kết quả ra Front-end.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

*(Team Kỹ thuật điền các công nghệ tương ứng vào đây)*

- **Front-end:** `[Tên Framework/Thư viện - VD: ReactJS, VueJS, NextJS...]`
- **Back-end:** `[Tên Ngôn ngữ/Framework - VD: Node.js, Express, Laravel...]`
- **Database:** `[Tên DB - VD: PostgreSQL, MySQL, MongoDB...]`
- **UI Component/CSS:** `[VD: Tailwind CSS, Bootstrap, Material UI...]`
- **Authentication:** `Google OAuth 2.0`
- **Tools/Deployment:** `[VD: Docker, Vercel, AWS, Nginx...]`

---

## 🗄️ Cấu trúc Cơ sở dữ liệu cơ bản (Database Overview)
Hệ thống xoay quanh các thực thể (Entities) chính sau:
- `users` & `roles`: Quản lý danh sách whitelist Admin.
- `criteria` & `sub_criteria`: Quản lý 5 Tiêu chuẩn cứng và các Tiêu chuẩn con động.
- `activities`: Lưu trữ các hoạt động (Được map với `sub_criteria`).
- `activity_requests`: Quản lý form đề xuất từ sinh viên.
- `home_histories` & `home_honors`: Dữ liệu cho trang chủ.

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy (Installation & Setup)

*(Team Kỹ thuật cập nhật các lệnh cài đặt tương ứng với môi trường)*

### Yêu cầu hệ thống (Prerequisites)
- Node.js >= `[Phiên bản]`
- Database >= `[Phiên bản]`
- Google OAuth API Credentials.

### Các bước cài đặt
1. Clone dự án:
   ```bash
   git clone [Link Repo của bạn]
   cd [Tên thư mục project]
