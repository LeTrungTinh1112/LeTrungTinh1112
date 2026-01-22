# HỆ THỐNG QUẢN LÝ KÝ TÚC XÁ - TÀI LIỆU PHÂN TÍCH CHI TIẾT

## 📋 MỤC LỤC
1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Kiến trúc hệ thống](#2-kiến-trúc-hệ-thống)
3. [Luồng hoạt động](#3-luồng-hoạt-động)
4. [Cấu trúc dữ liệu](#4-cấu-trúc-dữ-liệu)
5. [Chức năng chi tiết](#5-chức-năng-chi-tiết)
6. [Hướng dẫn triển khai](#6-hướng-dẫn-triển-khai)

---

## 1. TỔNG QUAN HỆ THỐNG

### 1.1 Mục đích
Hệ thống quản lý ký túc xá được xây dựng để:
- Quản lý thông tin cư dân, phòng, giường
- Quản lý hợp đồng thuê phòng
- Theo dõi thanh toán tiền thuê
- Xử lý yêu cầu bảo trì
- Quản lý đăng ký gửi xe
- Quản lý môi giới (broker)

### 1.2 Vai trò người dùng
Hệ thống hỗ trợ 2 vai trò chính:

#### **ADMIN (Quản trị viên)**
- Quyền truy cập: Toàn bộ hệ thống
- Chức năng:
  - Quản lý cư dân (thêm, sửa, xóa, xem)
  - Quản lý phòng và giường
  - Quản lý hợp đồng
  - Xử lý thanh toán
  - Xử lý yêu cầu bảo trì
  - Duyệt đăng ký gửi xe
  - Quản lý môi giới
  - Xem thống kê tổng quan

#### **RESIDENT (Cư dân)**
- Quyền truy cập: Chỉ thông tin cá nhân
- Chức năng:
  - Xem thông tin cá nhân
  - Xem hợp đồng của mình
  - Xem lịch sử thanh toán
  - Gửi yêu cầu bảo trì
  - Đăng ký gửi xe
  - Xem trạng thái các yêu cầu

---

## 2. KIẾN TRÚC HỆ THỐNG

### 2.1 Công nghệ sử dụng
\`\`\`
Frontend Framework: Next.js 14 (App Router)
UI Library: React 18
Styling: Tailwind CSS v4
Component Library: shadcn/ui
State Management: React Hooks (useState, useEffect)
Data Storage: LocalStorage (mock data)
Authentication: Custom auth với localStorage
\`\`\`

### 2.2 Cấu trúc thư mục
\`\`\`
dormitorymanagement/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Trang đăng nhập
│   ├── admin/                    # Dashboard admin
│   │   └── page.tsx
│   ├── resident/                 # Dashboard cư dân
│   │   └── page.tsx
│   ├── residents/                # Quản lý cư dân
│   │   ├── page.tsx              # Danh sách cư dân
│   │   └── add/                  # Thêm cư dân mới
│   │       └── page.tsx
│   ├── rooms/                    # Quản lý phòng
│   │   └── page.tsx
│   ├── contracts/                # Quản lý hợp đồng
│   │   └── page.tsx
│   ├── payments/                 # Quản lý thanh toán
│   │   └── page.tsx
│   ├── maintenance/              # Quản lý bảo trì
│   │   └── page.tsx
│   ├── parking/                  # Quản lý gửi xe
│   │   └── page.tsx
│   ├── brokers/                  # Quản lý môi giới
│   │   └── page.tsx
│   └── settings/                 # Cài đặt
│       └── page.tsx
├── components/                   # React Components
│   ├── layout/                   # Layout components
│   │   ├── main-layout.tsx       # Layout chính
│   │   ├── sidebar.tsx           # Sidebar navigation
│   │   └── header.tsx            # Header
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── table.tsx
│       └── ...
├── lib/                          # Utilities & Logic
│   ├── auth.ts                   # Authentication logic
│   ├── mock-data.ts              # Mock data
│   └── utils.ts                  # Helper functions
└── app/globals.css               # Global styles
\`\`\`

### 2.3 Luồng dữ liệu
\`\`\`
User Input → Component State → Mock Data (lib/mock-data.ts)
                                      ↓
                              LocalStorage (auth)
                                      ↓
                              Component Re-render
\`\`\`

---

## 3. LUỒNG HOẠT ĐỘNG

### 3.1 Luồng đăng nhập

\`\`\`
┌─────────────┐
│ Trang login│
│ (page.tsx) │
└──────┬──────┘
       │
       │ User nhập username/password
       ↓
┌──────────────────┐
│ authenticateUser │ ← Kiểm tra trong mockUsers
│   (lib/auth.ts)  │
└────────┬─────────┘
         │
    ┌────┴────┐
    │ Valid?  │
    └────┬────┘
         │
    ┌────┴────────────────┐
    │                     │
   YES                   NO
    │                     │
    ↓                     ↓
┌─────────────┐    ┌──────────┐
│setCurrentUser│    │Show error│
│→ localStorage│    └──────────┘
└──────┬──────┘
       │
   ┌───┴────┐
   │ Role?  │
   └───┬────┘
       │
  ┌────┴─────┐
  │          │
admin    resident
  │          │
  ↓          ↓
/admin   /resident
\`\`\`

### 3.2 Luồng quản lý cư dân (Admin)

\`\`\`
┌──────────────┐
│/residents    │ ← Admin truy cập
│(page.tsx)    │
└──────┬───────┘
       │
       │ Load mockResidents từ lib/mock-data.ts
       ↓
┌──────────────────┐
│ Hiển thị table   │
│ - Phân trang     │
│ - Tìm kiếm       │
│ - Lọc theo status│
└────────┬─────────┘
         │
    ┌────┴────────────────┐
    │                     │
  Thêm mới            Chỉnh sửa
    │                     │
    ↓                     ↓
/residents/add      Dialog/Modal
    │                     │
    │                     │
Form nhập liệu      Form chỉnh sửa
    │                     │
    ↓                     ↓
Validate data       Validate data
    │                     │
    ↓                     ↓
Save to state       Update state
\`\`\`

### 3.3 Luồng thanh toán

\`\`\`
┌──────────────┐
│ /payments    │
└──────┬───────┘
       │
       │ Load mockPayments
       ↓
┌──────────────────────┐
│ Hiển thị danh sách   │
│ - Pending payments   │
│ - Paid payments      │
│ - Overdue payments   │
└────────┬─────────────┘
         │
    ┌────┴────┐
    │ Action? │
    └────┬────┘
         │
    ┌────┴──────────────┐
    │                   │
Xác nhận TT        Upload proof
    │                   │
    ↓                   ↓
Update status      Save image URL
to "paid"          Update payment
    │                   │
    └────────┬──────────┘
             ↓
      Refresh table
\`\`\`

### 3.4 Luồng cư dân xem thông tin

\`\`\`
┌──────────────┐
│ /resident    │ ← Resident login
└──────┬───────┘
       │
       │ getCurrentUser() từ localStorage
       ↓
┌──────────────────────┐
│ Find resident data   │
│ by user.email        │
└────────┬─────────────┘
         │
    ┌────┴────────────────────────┐
    │                             │
    ↓                             ↓
Load contracts              Load payments
by residentId               by residentId
    │                             │
    ↓                             ↓
Load maintenance            Load parking
by reportedById             by residentId
    │                             │
    └──────────┬──────────────────┘
               ↓
    ┌──────────────────┐
    │ Display in tabs: │
    │ - Info           │
    │ - Contract       │
    │ - Payments       │
    │ - Maintenance    │
    │ - Parking        │
    └──────────────────┘
\`\`\`

---

## 4. CẤU TRÚC DỮ LIỆU

### 4.1 User (Người dùng)
\`\`\`typescript
interface User {
  id: string              // ID duy nhất
  username: string        // Tên đăng nhập
  password: string        // Mật khẩu (trong thực tế cần hash)
  role: string           // "admin" | "resident"
  name: string           // Họ tên
  email: string          // Email
  phone: string          // Số điện thoại
  gender: string         // "Nam" | "Nữ"
}
\`\`\`

### 4.2 Resident (Cư dân)
\`\`\`typescript
interface Resident {
  id: string              // ID cư dân
  name: string            // Họ tên
  cccd: string            // Số CCCD
  studentId: string       // Mã sinh viên
  email: string           // Email
  phone: string           // Số điện thoại
  dateOfBirth: string     // Ngày sinh (YYYY-MM-DD)
  address: string         // Địa chỉ
  emergencyContact: string // Liên hệ khẩn cấp
  roomId: string | null   // ID phòng (null nếu chưa có)
  bedId: string | null    // ID giường (null nếu chưa có)
  status: string          // "active" | "pending" | "expired"
  avatar: string          // URL avatar
  gender: string          // "Nam" | "Nữ"
  broker: string          // Tên môi giới
  joinDate: string        // Ngày tham gia
}
\`\`\`

### 4.3 Room (Phòng)
\`\`\`typescript
interface Room {
  id: string              // ID phòng
  name: string            // Tên phòng (VD: A101)
  floor: number           // Tầng
  type: string            // "Standard" | "VIP" | "Deluxe"
  price: number           // Giá thuê/tháng
  capacity: number        // Sức chứa (số giường)
  beds: Bed[]            // Danh sách giường
}

interface Bed {
  id: string              // ID giường
  number: number          // Số giường (1, 2, 3, 4)
  status: string          // "occupied" | "available"
  residentName: string | null // Tên cư dân (null nếu trống)
}
\`\`\`

### 4.4 Contract (Hợp đồng)
\`\`\`typescript
interface Contract {
  id: string              // Mã hợp đồng (VD: CT001)
  residentId: string      // ID cư dân
  residentName: string    // Tên cư dân
  residentGender: string  // Giới tính
  roomId: string          // ID phòng
  roomName: string        // Tên phòng
  bedId: string           // ID giường
  startDate: string       // Ngày bắt đầu (YYYY-MM-DD)
  endDate: string         // Ngày kết thúc (YYYY-MM-DD)
  monthlyRent: number     // Tiền thuê hàng tháng
  deposit: number         // Tiền đặt cọc
  status: string          // "active" | "pending" | "expired"
  type: string            // "monthly" | "manual"
  createdAt: string       // Ngày tạo
  daysUntilExpiry: number // Số ngày còn lại
  brokerName: string      // Tên môi giới
}
\`\`\`

### 4.5 Payment (Thanh toán)
\`\`\`typescript
interface Payment {
  id: string              // Mã thanh toán (VD: PAY001)
  contractId: string      // Mã hợp đồng
  residentName: string    // Tên cư dân
  residentId: string      // ID cư dân
  roomName: string        // Tên phòng
  amount: number          // Số tiền
  type: string            // "rent" | "other"
  dueDate: string         // Hạn thanh toán (YYYY-MM-DD)
  paidDate: string | null // Ngày thanh toán (null nếu chưa TT)
  status: string          // "paid" | "pending" | "overdue"
  method: string | null   // "Tiền mặt" | "Chuyển khoản"
  branch: string          // Chi nhánh
  proofImage: string | null // URL ảnh chứng từ
}
\`\`\`

### 4.6 MaintenanceRequest (Yêu cầu bảo trì)
\`\`\`typescript
interface MaintenanceRequest {
  id: string              // Mã yêu cầu (VD: MNT001)
  title: string           // Tiêu đề
  description: string     // Mô tả chi tiết
  roomId: string          // ID phòng
  roomName: string        // Tên phòng
  reportedBy: string      // Người báo cáo
  reportedById: string    // ID người báo cáo
  assignedTo: string | null // Thợ được giao (null nếu chưa)
  assignedToPhone: string | null // SĐT thợ
  priority: string        // "low" | "medium" | "high"
  status: string          // "pending" | "in_progress" | "completed"
  cost: number            // Chi phí (0 nếu chưa hoàn thành)
  createdAt: string       // Ngày tạo
  updatedAt: string       // Ngày cập nhật
}
\`\`\`

### 4.7 ParkingRequest (Đăng ký gửi xe)
\`\`\`typescript
interface ParkingRequest {
  id: string              // Mã đăng ký (VD: PRK001)
  residentName: string    // Tên cư dân
  residentId: string      // ID cư dân
  room: string            // Phòng
  vehicleType: string     // "Xe máy" | "Xe đạp" | "Xe điện"
  licensePlate: string    // Biển số (N/A nếu xe đạp)
  brand: string           // Hãng xe
  color: string           // Màu sắc
  requestDate: string     // Ngày đăng ký
  status: string          // "approved" | "pending" | "rejected"
  parkingSpot: string | null // Vị trí gửi xe (null nếu chưa duyệt)
  monthlyFee: number      // Phí hàng tháng
  externalParkingProof: string | null // Ảnh chứng từ gửi ngoài
  externalParkingCost: number // Chi phí gửi ngoài
}
\`\`\`

### 4.8 Broker (Môi giới)
\`\`\`typescript
interface Broker {
  id: string              // ID môi giới
  name: string            // Tên môi giới
  type: string            // "Cư dân" | "Bên ngoài" | "Quản lý"
  contact: string         // Thông tin liên hệ
  email: string           // Email
  totalReferrals: number  // Tổng số giới thiệu
  activeReferrals: number // Số đang hoạt động
  revenue: number         // Doanh thu
  status: string          // "approved" | "pending"
  joinDate: string        // Ngày tham gia
  residentId: string | null // ID cư dân (null nếu không phải)
}
\`\`\`

---

## 5. CHỨC NĂNG CHI TIẾT

### 5.1 Authentication (Xác thực)

**File:** `lib/auth.ts`

#### Hàm `authenticateUser(username, password)`
\`\`\`typescript
// Mục đích: Xác thực thông tin đăng nhập
// Input: username (string), password (string)
// Output: User object (không có password) hoặc null
// Logic:
1. Tìm user trong mockUsers có username và password khớp
2. Nếu tìm thấy: Trả về user (loại bỏ password)
3. Nếu không: Trả về null
\`\`\`

#### Hàm `getCurrentUser()`
\`\`\`typescript
// Mục đích: Lấy thông tin user đang đăng nhập
// Input: Không
// Output: User object hoặc null
// Logic:
1. Kiểm tra môi trường (chỉ chạy trên browser)
2. Đọc "currentUser" từ localStorage
3. Parse JSON và trả về
\`\`\`

#### Hàm `setCurrentUser(user)`
\`\`\`typescript
// Mục đích: Lưu thông tin user vào localStorage
// Input: user (User object)
// Output: Không
// Logic:
1. Chuyển user object thành JSON string
2. Lưu vào localStorage với key "currentUser"
\`\`\`

#### Hàm `logout()`
\`\`\`typescript
// Mục đích: Đăng xuất
// Input: Không
// Output: Không
// Logic:
1. Xóa "currentUser" khỏi localStorage
2. Redirect về trang login (/)
\`\`\`

### 5.2 Quản lý cư dân (Admin)

**File:** `app/residents/page.tsx`

#### Chức năng chính:
1. **Hiển thị danh sách cư dân**
   - Load dữ liệu từ `mockResidents`
   - Hiển thị trong table với các cột: Tên, CCCD, MSSV, Email, SĐT, Phòng, Trạng thái
   - Phân trang: 10 cư dân/trang

2. **Tìm kiếm**
   - Tìm theo: Tên, CCCD, MSSV, Email, SĐT
   - Real-time search (onChange)

3. **Lọc theo trạng thái**
   - Tất cả / Đang ở / Chờ duyệt / Hết hạn
   - Dropdown select

4. **Thêm cư dân mới**
   - Button "Thêm cư dân" → Navigate to `/residents/add`
   - Form nhập đầy đủ thông tin
   - Validate dữ liệu trước khi lưu

5. **Chỉnh sửa cư dân**
   - Button "Sửa" trên mỗi row
   - Mở dialog/modal với form
   - Pre-fill dữ liệu hiện tại
   - Validate và update

6. **Xóa cư dân**
   - Button "Xóa" trên mỗi row
   - Confirm dialog
   - Xóa khỏi state

#### Logic phân trang:
\`\`\`typescript
const itemsPerPage = 10
const totalPages = Math.ceil(filteredResidents.length / itemsPerPage)
const paginatedData = filteredResidents.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
)
\`\`\`

### 5.3 Quản lý thanh toán (Admin)

**File:** `app/payments/page.tsx`

#### Chức năng chính:
1. **Hiển thị danh sách thanh toán**
   - 3 tabs: Chờ thanh toán / Đã thanh toán / Quá hạn
   - Mỗi tab có table riêng với phân trang

2. **Xác nhận thanh toán**
   - Button "Xác nhận" trên payment pending
   - Mở dialog nhập:
     - Ngày thanh toán
     - Phương thức (Tiền mặt/Chuyển khoản)
     - Upload ảnh chứng từ (optional)
   - Update status → "paid"

3. **Tạo thanh toán thủ công**
   - Button "Tạo thanh toán"
   - Form nhập:
     - Chọn cư dân (dropdown)
     - Số tiền
     - Hạn thanh toán
     - Loại thanh toán
   - Tạo payment mới với status "pending"

4. **Xem chi tiết**
   - Click vào row → Mở dialog
   - Hiển thị đầy đủ thông tin
   - Nếu có ảnh chứng từ → Hiển thị

#### Logic tự động tạo thanh toán:
\`\`\`typescript
// Với hợp đồng type="monthly"
// Hệ thống tự động tạo payment mỗi tháng
// Dựa trên contract.monthlyRent và contract.startDate
\`\`\`

### 5.4 Quản lý bảo trì (Admin)

**File:** `app/maintenance/page.tsx`

#### Chức năng chính:
1. **Hiển thị danh sách yêu cầu**
   - 3 tabs: Chờ xử lý / Đang xử lý / Hoàn thành
   - Card view (không phải table)
   - Phân trang: 10 yêu cầu/trang

2. **Giao việc cho thợ**
   - Button "Giao việc" trên request pending
   - Form chọn:
     - Tên thợ
     - SĐT thợ
   - Update status → "in_progress"

3. **Hoàn thành công việc**
   - Button "Hoàn thành" trên request in_progress
   - Form nhập:
     - Chi phí sửa chữa
     - Ghi chú (optional)
   - Update status → "completed"

4. **Xem chi tiết**
   - Click vào card → Mở dialog
   - Hiển thị đầy đủ thông tin
   - Lịch sử cập nhật

### 5.5 Dashboard cư dân

**File:** `app/resident/page.tsx`

#### Chức năng chính:
1. **Thông tin tổng quan**
   - Avatar, tên, phòng, giường
   - 4 cards thống kê:
     - Hợp đồng (còn bao nhiêu ngày)
     - Thanh toán (số khoản chờ TT)
     - Bảo trì (số yêu cầu đã gửi)
     - Gửi xe (trạng thái)

2. **Tab Thông tin**
   - Hiển thị thông tin cá nhân
   - Read-only (không cho sửa)

3. **Tab Hợp đồng**
   - Hiển thị hợp đồng hiện tại
   - Progress bar thời gian còn lại
   - Thông tin chi tiết: Ngày bắt đầu, kết thúc, tiền thuê, cọc

4. **Tab Thanh toán**
   - Alert box: Các khoản chờ thanh toán (màu đỏ)
   - Table: Lịch sử thanh toán đã hoàn thành
   - Phân trang: 10 thanh toán/trang

5. **Tab Bảo trì**
   - Danh sách yêu cầu đã gửi
   - Hiển thị trạng thái: Chờ xử lý / Đang xử lý / Hoàn thành
   - Phân trang: 10 yêu cầu/trang

6. **Tab Gửi xe**
   - Nếu đã đăng ký: Hiển thị thông tin xe, vị trí
   - Nếu chưa: Button "Đăng ký gửi xe"

---

## 6. HƯỚNG DẪN TRIỂN KHAI

### 6.1 Cài đặt môi trường

\`\`\`bash
# 1. Clone project
git clone <repository-url>
cd dormitorymanagement

# 2. Cài đặt dependencies
npm install

# 3. Chạy development server
npm run dev

# 4. Mở browser
http://localhost:3000
\`\`\`

### 6.2 Tài khoản test

\`\`\`
Admin:
- Username: admin
- Password: admin123

Resident:
- Username: resident
- Password: resident123
\`\`\`

### 6.3 Chuyển sang production

#### Bước 1: Thay thế Mock Data bằng Database

**Chọn database:**
- PostgreSQL (khuyến nghị)
- MySQL
- MongoDB

**Cài đặt ORM:**
\`\`\`bash
# Prisma (khuyến nghị)
npm install prisma @prisma/client

# Hoặc TypeORM
npm install typeorm pg
\`\`\`

**Tạo schema:**
\`\`\`prisma
// prisma/schema.prisma
model User {
  id       String @id @default(uuid())
  username String @unique
  password String
  role     String
  name     String
  email    String @unique
  phone    String
  // ... các field khác
}

model Resident {
  id               String @id @default(uuid())
  name             String
  cccd             String @unique
  studentId        String @unique
  // ... các field khác
  contracts        Contract[]
  payments         Payment[]
  maintenanceReqs  MaintenanceRequest[]
  parkingRequests  ParkingRequest[]
}

// ... các model khác
\`\`\`

#### Bước 2: Tạo API Routes

\`\`\`typescript
// app/api/residents/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const residents = await prisma.resident.findMany()
  return NextResponse.json(residents)
}

export async function POST(request: Request) {
  const data = await request.json()
  const resident = await prisma.resident.create({ data })
  return NextResponse.json(resident)
}
\`\`\`

#### Bước 3: Thay thế Mock Data

\`\`\`typescript
// Trước (mock):
import { mockResidents } from '@/lib/mock-data'
const residents = mockResidents

// Sau (API):
const [residents, setResidents] = useState([])

useEffect(() => {
  fetch('/api/residents')
    .then(res => res.json())
    .then(data => setResidents(data))
}, [])
\`\`\`

#### Bước 4: Implement Authentication

\`\`\`bash
# Cài đặt NextAuth.js
npm install next-auth
\`\`\`

\`\`\`typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        })
        
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user
        }
        return null
      }
    })
  ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
\`\`\`

#### Bước 5: Deploy

**Vercel (khuyến nghị cho Next.js):**
\`\`\`bash
# 1. Cài đặt Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
\`\`\`

**Hoặc Docker:**
\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### 6.4 Bảo mật

1. **Hash password:**
\`\`\`typescript
import bcrypt from 'bcrypt'

// Khi tạo user
const hashedPassword = await bcrypt.hash(password, 10)

// Khi login
const isValid = await bcrypt.compare(password, user.password)
\`\`\`

2. **JWT Token:**
\`\`\`typescript
import jwt from 'jsonwebtoken'

// Tạo token
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET)
\`\`\`

3. **Environment Variables:**
\`\`\`env
# .env.local
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"
\`\`\`

### 6.5 Tối ưu hóa

1. **Caching:**
\`\`\`typescript
// Sử dụng SWR
import useSWR from 'swr'

const { data, error } = useSWR('/api/residents', fetcher)
\`\`\`

2. **Pagination server-side:**
\`\`\`typescript
// API route
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 10
  
  const residents = await prisma.resident.findMany({
    skip: (page - 1) * limit,
    take: limit
  })
  
  return NextResponse.json(residents)
}
\`\`\`

3. **Image optimization:**
\`\`\`typescript
import Image from 'next/image'

<Image 
  src={resident.avatar || "/placeholder.svg"} 
  alt={resident.name}
  width={80}
  height={80}
  priority
/>
\`\`\`

---

## 7. KẾT LUẬN

Hệ thống quản lý ký túc xá này được thiết kế với:
- **Kiến trúc rõ ràng**: Phân tách logic, UI, data
- **Dễ mở rộng**: Có thể thêm chức năng mới dễ dàng
- **Responsive**: Tương thích mọi thiết bị
- **Bảo mật**: Có thể nâng cấp lên production với authentication mạnh mẽ

Để triển khai thực tế, cần:
1. Thay mock data bằng database thật
2. Implement authentication với NextAuth.js
3. Thêm validation và error handling
4. Deploy lên server production
5. Thêm monitoring và logging

Tài liệu này cung cấp đầy đủ thông tin để bạn hiểu và phát triển hệ thống.
