"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Home,
  FileText,
  CreditCard,
  Wrench,
  Car,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react"

// Mock data for residents
const mockResidents = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    phone: "0901234567",
    roomNumber: "A101",
    building: "Ký túc xá A",
    buildingAddress: "Khu A - Đại học, Đường Lê Văn Hưu, Q. Hai Bà Trưng, Hà Nội",
    buildingPhone: "024-3858-1234",
    studentId: "K65-001",
    gender: "Nam",
    cccd: "0123456789",
    dateOfBirth: "2005-01-15",
    address: "123 Đường ABC, Quận Hoàn Kiếm, Hà Nội",
    emergencyContact: "Nguyễn Văn Bình",
    emergencyPhone: "0987654321",
    status: "active",
    broker: "Trần Minh Phát",
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "binh.tran@email.com",
    phone: "0912345678",
    roomNumber: "B205",
    building: "Ký túc xá B",
    buildingAddress: "Khu B - Đại học, Đường Nguyễn Trãi, Q. Thanh Xuân, Hà Nội",
    buildingPhone: "024-3859-5678",
    studentId: "K65-002",
    gender: "Nữ",
    cccd: "0198765432",
    dateOfBirth: "2005-06-20",
    address: "456 Đường DEF, Quận Ba Đình, Hà Nội",
    emergencyContact: "Trần Văn Cường",
    emergencyPhone: "0976543210",
    status: "active",
    broker: "Lê Thị Hương",
  },
  {
    id: "3",
    name: "Lê Minh Cường",
    email: "cuong.le@email.com",
    phone: "0923456789",
    roomNumber: "C302",
    building: "Ký túc xá C",
    buildingAddress: "Khu C - Đại học, Đường Phạm Văn Đồng, Q. Cầu Giấy, Hà Nội",
    buildingPhone: "024-3860-9012",
    studentId: "K65-003",
    gender: "Nam",
    cccd: "0145678901",
    dateOfBirth: "2005-03-10",
    address: "789 Đường GHI, Quận Thanh Xuân, Hà Nội",
    emergencyContact: "Lê Thị Dung",
    emergencyPhone: "0965432109",
    status: "active",
    broker: "Phạm Quốc Anh",
  },
]

// Mock contracts data
const mockContracts = [
  {
    id: "CT001",
    residentId: "1",
    roomName: "A101",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    monthlyRent: 2500000,
    totalAmount: 7500000,
    deposit: 5000000,
    status: "active",
    refundStatus: "none",
    daysUntilExpiry: 45,
  },
  {
    id: "CT002",
    residentId: "2",
    roomName: "B205",
    startDate: "2024-08-15",
    endDate: "2025-02-14",
    monthlyRent: 3000000,
    totalAmount: 15000000,
    deposit: 6000000,
    status: "active",
    refundStatus: "none",
    daysUntilExpiry: 115,
  },
  {
    id: "CT003",
    residentId: "3",
    roomName: "C302",
    startDate: "2024-07-01",
    endDate: "2024-11-30",
    monthlyRent: 2800000,
    totalAmount: 11200000,
    deposit: 5600000,
    status: "active",
    refundStatus: "none",
    daysUntilExpiry: 10,
  },
]

// Mock payments data
const mockPayments = [
  {
    id: "P001",
    residentId: "1",
    roomName: "A101",
    type: "Tiền thuê phòng",
    amount: 2500000,
    dueDate: "2024-10-01",
    paidDate: "2024-09-28",
    status: "paid",
  },
  {
    id: "P002",
    residentId: "1",
    roomName: "A101",
    type: "Tiền thuê phòng",
    amount: 2500000,
    dueDate: "2024-11-01",
    paidDate: null,
    status: "pending",
  },
  {
    id: "P003",
    residentId: "2",
    roomName: "B205",
    type: "Tiền thuê phòng",
    amount: 3000000,
    dueDate: "2024-09-15",
    paidDate: "2024-09-10",
    status: "paid",
  },
]

// Mock maintenance requests
const mockMaintenanceRequests = [
  {
    id: "MR001",
    residentId: "1",
    title: "Sửa điều hòa",
    description: "Điều hòa không lạnh, có tiếng lạ",
    status: "pending",
    createdDate: "2024-11-15",
    priority: "high",
  },
  {
    id: "MR002",
    residentId: "1",
    title: "Thay đèn phòng",
    description: "Đèn trần bị cháy",
    status: "completed",
    createdDate: "2024-11-10",
    priority: "normal",
  },
]

// Mock parking data
const mockParkingRequests = [
  {
    id: "PK001",
    residentId: "1",
    vehicleType: "Xe đạp",
    licensePlate: "N/A",
    status: "approved",
    parkingSpot: "A-15",
    monthlyFee: 50000,
  },
]

export default function ResidentPortalPage() {
  const [selectedResident, setSelectedResident] = useState<typeof mockResidents[0] | null>(null)
  const [selectedResidentId, setSelectedResidentId] = useState<string>("1")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const currentResident = selectedResident || mockResidents.find((r) => r.id === selectedResidentId)
  const residentContract = mockContracts.find((c) => c.residentId === currentResident?.id)
  const residentPayments = mockPayments.filter((p) => p.residentId === currentResident?.id)
  const residentMaintenance = mockMaintenanceRequests.filter((m) => m.residentId === currentResident?.id)
  const residentParking = mockParkingRequests.find((p) => p.residentId === currentResident?.id)

  const filteredResidents = mockResidents.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentId.includes(searchTerm),
  )

  const pendingPayments = residentPayments.filter((p) => p.status !== "paid")
  const paidPayments = residentPayments.filter((p) => p.status === "paid")

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-300"
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "approved":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">Cổng Thông Tin Cư Dân</h1>
              <p className="text-sm text-gray-600">Tra cứu và quản lý thông tin ký túc xá của bạn</p>
            </div>
          </div>

          {/* Resident Selector */}
          <div className="flex items-center gap-2">
            <Select value={selectedResidentId} onValueChange={setSelectedResidentId}>
              <SelectTrigger className="w-full sm:w-80 border-gray-300 focus:border-black bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockResidents.map((resident) => (
                  <SelectItem key={resident.id} value={resident.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{resident.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{resident.name} - {resident.roomNumber}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentResident && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-black">
                    <AvatarFallback className="bg-black text-white text-xl">
                      {currentResident.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-black">{currentResident.name}</h2>
                    <p className="text-gray-600">MSSV: {currentResident.studentId}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                        Phòng {currentResident.roomNumber}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-300">Đang ở</Badge>
                    </div>
                  </div>
                  <Button className="bg-black hover:bg-gray-800 text-white">Thông tin chi tiết</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hợp Đồng</CardTitle>
                  <FileText className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">
                    {residentContract ? (residentContract.status === "active" ? "Còn hiệu lực" : "Hết hạn") : "Chưa có"}
                  </div>
                  {residentContract && (
                    <p className="text-xs text-gray-600 mt-1">Còn {residentContract.daysUntilExpiry} ngày</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Thanh Toán</CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{pendingPayments.length}</div>
                  <p className="text-xs text-gray-600 mt-1">Chờ thanh toán</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bảo Trì</CardTitle>
                  <Wrench className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{residentMaintenance.length}</div>
                  <p className="text-xs text-gray-600 mt-1">Yêu cầu đã gửi</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gửi Xe</CardTitle>
                  <Car className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">
                    {residentParking ? (residentParking.status === "approved" ? "Đã duyệt" : "Chờ duyệt") : "Chưa đăng ký"}
                  </div>
                  {residentParking && residentParking.status === "approved" && (
                    <p className="text-xs text-gray-600 mt-1">Vị trí: {residentParking.parkingSpot}</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content Sections */}
            <Tabs defaultValue="thong-tin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5 bg-gray-100 border border-gray-200 rounded-lg p-1">
                <TabsTrigger
                  value="thong-tin"
                  className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
                >
                  Thông Tin
                </TabsTrigger>
                <TabsTrigger
                  value="hop-dong"
                  className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
                >
                  Hợp Đồng
                </TabsTrigger>
                <TabsTrigger
                  value="thanh-toan"
                  className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
                >
                  Thanh Toán
                </TabsTrigger>
                <TabsTrigger
                  value="bao-tri"
                  className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
                >
                  Bảo Trì
                </TabsTrigger>
                <TabsTrigger
                  value="gui-xe"
                  className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
                >
                  Gửi Xe
                </TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="thong-tin" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Personal Info Card */}
                  <Card className="border-0 shadow-sm bg-white lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-black flex items-center gap-2">
                        <span>Thông Tin Cá Nhân</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Họ Tên</p>
                          <p className="font-semibold text-black">{currentResident.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Giới Tính</p>
                          <p className="font-semibold text-black">{currentResident.gender}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">CCCD/CMND</p>
                          <p className="font-semibold text-black">{currentResident.cccd}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Mã Sinh Viên</p>
                          <p className="font-semibold text-black">{currentResident.studentId}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Email</p>
                          <p className="font-semibold text-black flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {currentResident.email}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Số Điện Thoại</p>
                          <p className="font-semibold text-black flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {currentResident.phone}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Ngày Sinh</p>
                          <p className="font-semibold text-black">{currentResident.dateOfBirth}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Người Liên Hệ Khẩn Cấp</p>
                          <p className="font-semibold text-black">{currentResident.emergencyContact}</p>
                        </div>
                        <div className="sm:col-span-2 space-y-1">
                          <p className="text-xs text-gray-600">Địa Chỉ</p>
                          <p className="font-semibold text-black">{currentResident.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Building Info Card */}
                  <Card className="border-0 shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-black flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Thông Tin Ký Túc Xá
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600">Phòng</p>
                        <p className="font-bold text-lg text-black">{currentResident.roomNumber}</p>
                        <Badge className="bg-blue-100 text-blue-800">{currentResident.building}</Badge>
                      </div>
                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <p className="text-sm font-semibold text-black mb-2">Liên Hệ KTX</p>
                        <p className="text-xs text-gray-600">Tòa Nhà</p>
                        <p className="text-sm text-black">{currentResident.building}</p>
                        <p className="text-xs text-gray-600 mt-3">Địa Chỉ</p>
                        <p className="text-sm text-black">{currentResident.buildingAddress}</p>
                        <p className="text-xs text-gray-600 mt-3">Điện Thoại</p>
                        <p className="text-sm font-semibold text-black flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {currentResident.buildingPhone}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Contract Tab */}
              <TabsContent value="hop-dong" className="space-y-4">
                {residentContract ? (
                  <Card className="border-0 shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-black">Thông Tin Hợp Đồng</CardTitle>
                      <CardDescription>Chi tiết hợp đồng thuê phòng</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Mã Hợp Đồng</p>
                          <p className="font-semibold text-black">{residentContract.id}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Phòng</p>
                          <Badge className="bg-blue-100 text-blue-800 w-fit">{residentContract.roomName}</Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Ngày Bắt Đầu</p>
                          <p className="font-semibold text-black flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {residentContract.startDate}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Ngày Kết Thúc</p>
                          <p className="font-semibold text-black flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {residentContract.endDate}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Tiền Thuê Tháng</p>
                          <p className="font-semibold text-black flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {residentContract.monthlyRent.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Tiền Đặt Cọc</p>
                          <p className="font-semibold text-black flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {residentContract.deposit.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Trạng Thái</p>
                          <Badge
                            className={`${getStatusBadgeColor(residentContract.status)} border`}
                            variant="outline"
                          >
                            {residentContract.status === "active" ? "Còn Hiệu Lực" : "Hết Hạn"}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Thời Gian Còn Lại</p>
                          <p className="font-semibold text-black">{residentContract.daysUntilExpiry} ngày</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="py-12 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">Chưa có hợp đồng</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="thanh-toan" className="space-y-4">
                {pendingPayments.length > 0 && (
                  <Card className="border-l-4 border-l-red-500 shadow-sm bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-red-700 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Thanh Toán Chờ Xử Lý
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {pendingPayments.map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div>
                              <p className="font-semibold text-black">{payment.type}</p>
                              <p className="text-xs text-gray-600">Hạn: {payment.dueDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">{payment.amount.toLocaleString("vi-VN")}đ</p>
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Chờ Thanh Toán</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paidPayments.length > 0 && (
                  <Card className="border-0 shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-black flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Lịch Sử Thanh Toán
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {paidPayments.map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div>
                              <p className="font-semibold text-black">{payment.type}</p>
                              <p className="text-xs text-gray-600">Thanh toán: {payment.paidDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">{payment.amount.toLocaleString("vi-VN")}đ</p>
                              <Badge className="bg-green-100 text-green-800 border-green-300">Đã Thanh Toán</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {residentPayments.length === 0 && (
                  <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="py-12 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">Chưa có thông tin thanh toán</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Maintenance Tab */}
              <TabsContent value="bao-tri" className="space-y-4">
                {residentMaintenance.length > 0 ? (
                  <div className="space-y-3">
                    {residentMaintenance.map((request) => (
                      <Card key={request.id} className="border-0 shadow-sm bg-white">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-black">{request.title}</h3>
                                <Badge
                                  className={`${getStatusBadgeColor(request.status)} border`}
                                  variant="outline"
                                >
                                  {request.status === "completed" ? "Đã Hoàn Thành" : "Đang Xử Lý"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {request.createdDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  {request.priority === "high" ? "🔴" : "🟢"}
                                  {request.priority === "high" ? "Ưu Tiên" : "Bình Thường"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="py-12 text-center">
                      <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">Chưa có yêu cầu bảo trì</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Parking Tab */}
              <TabsContent value="gui-xe" className="space-y-4">
                {residentParking ? (
                  <Card className="border-0 shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-black">Thông Tin Đăng Ký Gửi Xe</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Loại Phương Tiện</p>
                          <p className="font-semibold text-black">{residentParking.vehicleType}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Biển Số</p>
                          <p className="font-semibold text-black">{residentParking.licensePlate}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Vị Trí Gửi</p>
                          <Badge className="bg-green-100 text-green-800 w-fit">{residentParking.parkingSpot}</Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Trạng Thái</p>
                          <Badge className="bg-green-100 text-green-800 border-green-300 w-fit">
                            {residentParking.status === "approved" ? "Đã Duyệt" : "Chờ Duyệt"}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Phí Tháng</p>
                          <p className="font-semibold text-black">{residentParking.monthlyFee.toLocaleString("vi-VN")}đ</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="py-12 text-center">
                      <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Chưa đăng ký gửi xe</p>
                      <Button className="bg-black hover:bg-gray-800 text-white">Đăng Ký Gửi Xe</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
