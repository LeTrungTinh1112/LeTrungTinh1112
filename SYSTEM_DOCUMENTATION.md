# HỆ THỐNG QUẢN LÝ KÝ TÚC XÁ - TÀI LIỆU HOẠT ĐỘNG

## 1. TỔNG QUAN HỆ THỐNG

Hệ thống Quản Lý Ký Túc Xá là một ứng dụng web hiện đại được xây dựng bằng Next.js 16, giúp quản lý toàn bộ quy trình hoạt động của các ký túc xá từ quản lý cư dân, phòng, thanh toán cho đến bảo trì và báo cáo.

**Phiên bản**: 1.0
**Nền tảng**: Next.js 16 + React 19 + Tailwind CSS v4
**Ngôn ngữ**: TypeScript, Vietnamese UI

---

## 2. KIẾN TRÚC HỆ THỐNG

### 2.1 Cấu Trúc Thư Mục

```
/app                    # Thư mục ứng dụng chính
├── /admin             # Trang quản trị
├── /resident          # Trang cư dân
├── /dashboard         # Bảng điều khiển
├── /residents         # Quản lý cư dân
├── /rooms             # Quản lý phòng
├── /payments          # Quản lý thanh toán
├── /contracts         # Quản lý hợp đồng
├── /maintenance       # Quản lý bảo trì
├── /parking           # Quản lý đỗ xe
├── /finance           # Quản lý tài chính
├── /reports           # Báo cáo
├── /brokers           # Quản lý môi giới
├── /manager           # Quản lý ký túc xá
├── /settings          # Cài đặt
├── layout.tsx         # Root layout
├── page.tsx           # Trang login
└── globals.css        # CSS toàn cục

/components           # Thành phần tái sử dụng
├── /ui               # Thành phần UI cơ bản (Button, Card, etc.)
└── /layout           # Thành phần layout

/lib                  # Thư viện công cụ
├── mock-data.ts      # Dữ liệu giả lập
└── auth.ts           # Logic xác thực
```

### 2.2 Luồng Dữ Liệu

```
User Login → Authentication (Mock) → Role Check (Admin/Resident) → Dashboard → Specific Module
```

---

## 3. CÁC MODULE CHÍNH

### 3.1 Quản Lý CƯ DÂN (Residents)
**Đường dẫn**: `/residents`

**Chức năng chính**:
- Xem danh sách cư dân với phân trang (10 dòng/trang)
- Tìm kiếm theo: tên, email, điện thoại, CCCD
- Lọc theo: giới tính, trạng thái (Đang ở, Chờ duyệt, Hết hạn)
- Thêm cư dân mới
- Xem chi tiết cư dân (hợp đồng, thanh toán, bảo trì)
- Chỉnh sửa thông tin
- Xuất báo cáo

**Dữ liệu chính**:
- ID, Họ tên, Email, Điện thoại, CCCD
- Giới tính, Trạng thái, Ảnh đại diện
- Ngày tạo

---

### 3.2 Quản Lý PHÒNG (Rooms)
**Đường dẫn**: `/rooms`

**Chức năng chính**:
- Xem danh sách phòng với phân trang (10 dòng/trang)
- Lọc theo: loại phòng, sức chứa, trạng thái
- Tìm kiếm theo tên hoặc loại phòng
- Xem chi tiết phòng và tình trạng giường
- Quản lý loại phòng (thêm, sửa, xóa)
- Quản lý giường (thêm, sửa, xóa)
- Xem doanh thu theo phòng

**Loại phòng**:
- Standard: 4 người - 500.000đ/tháng
- Premium: 2 người - 800.000đ/tháng
- VIP: 1 người - 1.200.000đ/tháng

**Trạng thái phòng**: Hoạt động, Đầy, Sắp trống, Đóng

**Trạng thái giường**: Trống, Có người, Sắp trống

---

### 3.3 Quản Lý THANH TOÁN (Payments)
**Đường dẫn**: `/payments`

**Chức năng chính**:
- Xem danh sách thanh toán với phân trang (10 dòng/trang)
- Tìm kiếm theo: tên cư dân, mã thanh toán, tên phòng
- Lọc theo: trạng thái, khách hàng, phương thức, tháng
- Tạo hóa đơn mới
- Xem minh chứng thanh toán
- Duyệt/từ chối thanh toán
- Chỉnh sửa thông tin thanh toán

**Loại thanh toán**:
- Tiền phòng
- Tiền cọc
- Dịch vụ
- Phạt

**Trạng thái thanh toán**:
- Đã thanh toán (Đã hoàn thành)
- Chờ thanh toán (Đang chờ)
- Quá hạn (Trễ hạn thanh toán)

**TÍNH TOÁN THUẾ VAT**:
- Tất cả thanh toán được tính thêm 10% VAT (Value Added Tax)
- Công thức: Số tiền cuối cùng = Số tiền gốc × 1.10
- Ví dụ: Thanh toán 500.000đ → Thực tế = 550.000đ (+50.000đ VAT)
- VAT được hiển thị rõ trong bảng danh sách và biểu mẫu chi tiết
- Tất cả báo cáo doanh thu đều tính VAT vào

**Phương thức thanh toán**: Tiền mặt, Chuyển khoản

---

### 3.4 Quản Lý HỢP ĐỒNG (Contracts)
**Đường dẫn**: `/contracts`

**Chức năng chính**:
- Xem danh sách hợp đồng với phân trang (10 dòng/trang)
- Tìm kiếm theo tên cư dân, mã hợp đồng
- Lọc theo trạng thái
- Tạo hợp đồng mới
- Xem chi tiết hợp đồng
- Chỉnh sửa hợp đồng
- Kết thúc hợp đồng

**Trạng thái hợp đồng**: Đang hoạt động, Sắp hết hạn, Đã kết thúc

---

### 3.5 Quản Lý BẢO TRÌ (Maintenance)
**Đường dẫn**: `/maintenance`

**Chức năng chính**:
- Xem danh sách yêu cầu bảo trì với phân trang (10 dòng/trang)
- Tìm kiếm theo tên cư dân, mã yêu cầu
- Lọc theo: ưu tiên, trạng thái
- Tạo yêu cầu bảo trì mới
- Phân công nhân viên bảo trì
- Cập nhật trạng thái (Chờ, Đang làm, Hoàn thành, Từ chối)
- Xem lịch sử bảo trì

**Mức độ ưu tiên**: Thấp, Trung bình, Cao, Khẩn cấp

---

### 3.6 Quản Lý ĐỖ XE (Parking)
**Đường dẫn**: `/parking`

**Chức năng chính**:
- Xem danh sách yêu cầu đỗ xe với phân trang (10 dòng/trang)
- Tìm kiếm và lọc yêu cầu
- Phê duyệt/từ chối yêu cầu đỗ xe
- Quản lý vị trí đỗ xe
- Tính phí đỗ xe hàng tháng

---

### 3.7 Quản Lý TÀI CHÍNH (Finance)
**Đường dẫn**: `/finance`

**Chức năng chính**:
- Xem tổng quan doanh thu
- Phân tích chi phí
- Báo cáo tài chính theo tháng/năm
- Xu hướng doanh thu

---

### 3.8 Báo Cáo (Reports)
**Đường dẫn**: `/reports`

**Chức năng chính**:
- Báo cáo cư dân
- Báo cáo doanh thu
- Báo cáo bảo trì
- Xuất báo cáo PDF/Excel
- Lập lịch báo cáo định kỳ

---

### 3.9 Quản Lý Ký Túc Xá (Manager)
**Đường dẫn**: `/manager`

**Các trang con**:
- `/manager/residents-list` - Danh sách cư dân
- `/manager/residents-add` - Thêm cư dân
- `/manager/rooms-overview` - Tổng quan phòng
- `/manager/rooms-manage` - Quản lý phòng
- `/manager/rooms-pricing` - Giá phòng

---

### 3.10 Cài Đặt (Settings)
**Đường dẫn**: `/settings`

**Chức năng chính**:
- Cài đặt hệ thống
- Quản lý người dùng
- Cài đặt thông báo

---

## 4. PHÂN TRANG (Pagination)

### Tiêu Chuẩn Phân Trang
- **Số dòng trên một trang**: 10 dòng
- **Áp dụng cho**: Tất cả danh sách (cư dân, phòng, thanh toán, hợp đồng, bảo trì, đỗ xe, etc.)
- **Kiểu phân trang**: Nút trước/sau + Nút số trang
- **Hiển thị**: "Hiển thị X - Y trong tổng số Z"

### Các Trang Sử Dụng Phân Trang
1. `/residents` - Danh sách cư dân
2. `/rooms` - Danh sách phòng
3. `/payments` - Danh sách thanh toán
4. `/contracts` - Danh sách hợp đồng
5. `/maintenance` - Danh sách bảo trì
6. `/parking` - Danh sách đỗ xe
7. `/brokers` - Danh sách môi giới
8. `/manager/residents-list` - Danh sách cư dân (Manager)
9. `/manager/rooms-overview` - Danh sách phòng (Manager)
10. Và các trang danh sách khác

### Cách Hoạt Động
```
1. Người dùng xem trang 1 (10 dòng đầu tiên)
2. Nếu có > 10 dòng, hiện nút phân trang
3. Người dùng click nút "Sau" hoặc số trang
4. Danh sách được tải lại với dữ liệu của trang đó
5. Không làm mới toàn bộ trang, chỉ cập nhật dữ liệu bảng
```

---

## 5. HỆ THỐNG XĐTICATION (Authentication)

### Loại Tài Khoản

**Admin Account**:
- Tên đăng nhập: `admin`
- Mật khẩu: `admin123`
- Quyền truy cập: Tất cả các tính năng

**Resident Account**:
- Tên đăng nhập: `resident`
- Mật khẩu: `resident123`
- Quyền truy cập: Chỉ trang cư dân và thông tin cá nhân

### Luồng Đăng Nhập
1. Người dùng nhập tên đăng nhập và mật khẩu
2. Hệ thống kiểm tra thông tin (hiện tại là mock, có thể kết nối API)
3. Nếu đúng, lưu user info vào localStorage
4. Chuyển hướng đến dashboard phù hợp (Admin → /admin, Resident → /resident)
5. Nếu sai, hiển thị lỗi

---

## 6. TÍNH NĂNG LỌCCÓ ỨNG DỤNG

### Lọc Được Áp Dụng
- **Cư dân**: Giới tính, Trạng thái
- **Phòng**: Loại phòng, Sức chứa, Trạng thái
- **Thanh toán**: Trạng thái, Khách hàng, Phương thức, Tháng
- **Hợp đồng**: Trạng thái
- **Bảo trì**: Ưu tiên, Trạng thái
- **Đỗ xe**: Ưu tiên, Trạng thái

### Lọc ĐÃ XÓA
- **Thanh toán**: Lọc "Chi nhánh" - Đã được xóa khỏi giao diện và logic
  - Tất cả chi nhánh/ký túc xá giờ được chọn từ dropdown "Lựa chọn Ký Túc Xá" ở đầu trang hoặc từ profil người dùng
  - Dữ liệu chi nhánh vẫn tồn tại nhưng không sử dụng để lọc

- **Phòng**: Không bao giờ có lọc chi nhánh, chỉ có lựa chọn ký túc xá

---

## 7. TÍNH TOÁN THUẾ VÀ GIẢM GIÁ

### VAT (Value Added Tax) - 10%
- **Áp dụng cho**: Tất cả khoản thanh toán trong hệ thống
- **Tỷ lệ**: 10%
- **Công thức**: `Số tiền cuối = Số tiền gốc × 1.10`
- **Hiển thị**: 
  - Trong bảng danh sách: Hiển thị số tiền đã có VAT với ghi chú "(+10% VAT)"
  - Trong biểu mẫu chi tiết: Hiển thị rõ ràng số tiền gốc và tiền VAT
  - Trong báo cáo: Tất cả doanh thu đều tính VAT vào

**Ví dụ tính toán**:
```
Số tiền gốc: 500.000đ
VAT (10%): 50.000đ
Tổng cộng: 550.000đ
```

### Quản Lý Doanh Thu
- Tất cả báo cáo doanh thu hiển thị số tiền đã bao gồm VAT
- Biểu mẫu thống kê: Tổng tiền phòng, Đã thu, Chờ thanh toán, Quá hạn - tất cả đều tính VAT

---

## 8. GIAO DIỆN NGƯỜI DÙNG (UI/UX)

### Thiết Kế
- **Màu chính**: Đen (#000000)
- **Màu phụ**: Xám, Trắng
- **Kiểu**: Modern, Clean, Minimalist
- **Font**: Inter (Google Fonts)

### Thành Phần UI
- Button: Nút hành động với các trạng thái
- Card: Chứa nội dung chính
- Badge: Hiển thị trạng thái
- Dialog/Modal: Form và xác nhận
- Table: Danh sách dữ liệu
- Select: Dropdown lựa chọn

### Responsive Design
- Desktop: Đầy đủ tất cả chức năng
- Tablet: Giao diện tối ưu
- Mobile: Giao diện rút gọn, dropdown menu

---

## 9. LUỒNG CÔNG VIỆC CHÍNH

### Luồng Tiếp Nhận Cư Dân
1. Admin vào `/residents` → Click "Thêm cư dân"
2. Điền thông tin cư dân (Họ tên, Email, Điện thoại, CCCD, Giới tính, Trạng thái)
3. Click "Lưu" → Cư dân được thêm vào danh sách
4. Từ đó có thể tạo hợp đồng, thanh toán cho cư dân

### Luồng Thanh Toán
1. Admin vào `/payments` → Click "Tạo hóa đơn"
2. Chọn hợp đồng, loại thanh toán, nhập số tiền
3. Hệ thống tự động tính VAT 10%
4. Click "Tạo hóa đơn" → Thanh toán được tạo
5. Cư dân có thể nộp chứng minh (ảnh) thanh toán
6. Admin duyệt chứng minh → Thanh toán xác nhận

### Luồng Báo Cáo Bảo Trì
1. Cư dân vào `/maintenance` → Click "Báo cáo bảo trì"
2. Chọn loại vấn đề, mô tả chi tiết, ưu tiên
3. Submit → Tạo yêu cầu bảo trì
4. Admin xem yêu cầu → Phân công nhân viên
5. Nhân viên hoàn thành → Admin xác nhận

---

## 10. DỮ LIỆU VÀ LƯỚI GHI

### Nguồn Dữ Liệu (Hiện Tại)
- **Mock Data**: Tất cả dữ liệu hiện tại được lưu trong `/lib/mock-data.ts`
- Không có cơ sở dữ liệu thực, dữ liệu là giả lập

### Cấu Trúc Dữ Liệu

**Cư Dân (Resident)**
```typescript
{
  id: string
  name: string
  email: string
  phone: string
  cccd: string
  gender: string
  avatar?: string
  status: 'active' | 'pending' | 'expired'
  createdDate: string
}
```

**Thanh Toán (Payment)**
```typescript
{
  id: string
  contractId: string
  residentName: string
  residentId: string
  roomName: string
  amount: number           // Số tiền gốc (không bao gồm VAT)
  type: string
  dueDate: string
  paidDate?: string
  status: 'paid' | 'pending' | 'overdue'
  method?: string
  branch: string
  proofImage?: string
  note?: string
}
```

**Phòng (Room)**
```typescript
{
  id: string
  number: string
  type: string
  floor: number
  capacity: number
  occupied: number
  status: 'active' | 'full' | 'departure' | 'closed'
  price: number
  beds: Bed[]
}
```

---

## 11. HƯỚNG DẪN CHO CÁC THÀNH VIÊN

### Cho Quản Trị Viên (Admin)
1. Đăng nhập với tài khoản admin
2. Quản lý toàn bộ hệ thống từ dashboard
3. Sử dụng các tính năng:
   - Thêm/sửa/xóa cư dân, phòng, hợp đồng
   - Xem và duyệt thanh toán
   - Xử lý yêu cầu bảo trì
   - Xem báo cáo doanh thu

### Cho Cư Dân (Resident)
1. Đăng nhập với tài khoản resident
2. Xem thông tin cá nhân của mình
3. Xem hợp đồng và thanh toán
4. Nộp minh chứng thanh toán
5. Báo cáo yêu cầu bảo trì

---

## 12. TỐI ƯU HÓA VÀ HIỆU SUẤT

### Phân Trang
- Giảm tải dữ liệu: Chỉ hiển thị 10 dòng mỗi trang
- Cải thiện tốc độ: Không tải toàn bộ dữ liệu cùng lúc
- Tốt hơn cho UX: Dễ nhìn, dễ tìm kiếm

### Tìm Kiếm
- Tìm kiếm phía client (fast)
- Hỗ trợ tìm kiếm theo nhiều trường
- Cập nhật thực thi khi gõ

### Lọc
- Lọc tổng hợp: Áp dụng nhiều điều kiện cùng lúc
- Xóa các lọc không cần thiết (chi nhánh thanh toán)
- Giữ các lọc phổ biến

---

## 13. BẢNG CÓC CHÍNH CẦN LƯU Ý

| Tính Năng | Vị Trí | Chú Ý |
|-----------|-------|-------|
| Phân trang | Tất cả danh sách | 10 dòng/trang cố định |
| VAT 10% | `/payments` | Tự động tính trong stats và table |
| Lọc chi nhánh | `/payments` | Đã xóa, không sử dụng |
| Lựa chọn ký túc xá | `/rooms` | Vẫn hiện "selectedDormitory" để chọn KTX |
| Hạn chế đăng nhập | `/page.tsx` | Mock auth, không kết nối API |
| Metadata | `layout.tsx` | Cập nhật thông tin ứng dụng |

---

## 14. LỰA CHỌN HƯỚNG PHÁT TRIỂN

### Các Tính Năng Cần Thêm Trong Tương Lai
1. **Cơ sở dữ liệu thực**: Kết nối PostgreSQL/MongoDB
2. **API backend**: Tạo API endpoints
3. **Xác thực thực**: Sử dụng JWT, OAuth
4. **Thông báo real-time**: WebSocket, push notifications
5. **Xuất báo cáo**: PDF, Excel generation
6. **Tính năng upload**: Cho ảnh, tài liệu
7. **Quản lý vai trò**: Phân quyền chi tiết
8. **Audit log**: Ghi lại mọi thay đổi
9. **Backup tự động**: Backup dữ liệu định kỳ
10. **Mobile app**: Ứng dụng di động

---

## 15. LIÊN HỆ VÀ HỖ TRỢ

Để thêm tính năng hoặc báo cáo vấn đề, vui lòng liên hệ với nhóm phát triển.

---

**Tài liệu này cập nhật lần cuối**: 22/01/2026
**Phiên bản tài liệu**: 1.0
**Trạng thái**: Hoàn chỉnh
