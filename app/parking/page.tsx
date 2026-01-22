"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Car,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  ParkingCircle,
  MapPin,
  Clock,
  CheckCircle,
  ImageIcon,
  DollarSign,
} from "lucide-react"

export default function ParkingManagement() {
  const [userRole] = useState("admin")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [selectedProof, setSelectedProof] = useState<any>(null)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isViewProofOpen, setIsViewProofOpen] = useState(false)
  const [supportCost, setSupportCost] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Mock data
  const parkingRequests = [
    {
      id: "1",
      residentName: "Nguyễn Văn An",
      room: "A101",
      vehicleType: "Xe máy",
      licensePlate: "29A1-12345",
      brand: "Honda Wave",
      color: "Đỏ",
      requestDate: "2024-12-01",
      status: "approved",
      parkingSpot: "A-15",
      monthlyFee: 50000,
    },
    {
      id: "2",
      residentName: "Trần Thị Bình",
      room: "A102",
      vehicleType: "Xe đạp",
      licensePlate: "N/A",
      brand: "Giant",
      color: "Xanh",
      requestDate: "2024-12-02",
      status: "pending",
      parkingSpot: null,
      monthlyFee: 20000,
    },
    {
      id: "3",
      residentName: "Lê Văn Cường",
      room: "B201",
      vehicleType: "Xe máy",
      licensePlate: "29B2-67890",
      brand: "Yamaha Exciter",
      color: "Đen",
      requestDate: "2024-11-28",
      status: "rejected",
      parkingSpot: null,
      monthlyFee: 50000,
    },
  ]

  const mockParkingRequests = [
    {
      id: "4",
      residentName: "Phạm Thị Dung",
      room: "C301",
      requestDate: "2024-12-03",
      month: "2024-12",
      status: "pending",
      externalParkingProof: "https://example.com/parking-proof.jpg",
      externalParkingCost: 0,
      hasSubmittedProof: false,
    },
    {
      id: "5",
      residentName: "Hoàng Văn Đông",
      room: "C302",
      requestDate: "2024-12-04",
      month: "2024-12",
      status: "approved",
      externalParkingProof: "https://example.com/parking-proof-2.jpg",
      externalParkingCost: 100000,
      hasSubmittedProof: true,
    },
    {
      id: "6",
      residentName: "Nguyễn Thị E",
      room: "D101",
      requestDate: "2024-12-05",
      month: "2024-12",
      status: "pending",
      externalParkingProof: "https://example.com/parking-proof-3.jpg",
      externalParkingCost: 0,
      hasSubmittedProof: true,
    },
    {
      id: "7",
      residentName: "Trần Văn F",
      room: "D102",
      requestDate: "2024-11-20",
      month: "2024-11",
      status: "approved",
      externalParkingProof: "https://example.com/parking-proof-4.jpg",
      externalParkingCost: 120000,
      hasSubmittedProof: true,
    },
    {
      id: "8",
      residentName: "Lê Thị G",
      room: "E201",
      requestDate: "2024-12-01",
      month: "2024-12",
      status: "pending",
      externalParkingProof: null,
      externalParkingCost: 0,
      hasSubmittedProof: false,
    },
  ]

  const parkingStats = {
    totalSpots: 200,
    occupiedSpots: 145,
    availableSpots: 55,
    pendingRequests: parkingRequests.filter((r) => r.status === "pending").length,
    monthlyRevenue: parkingRequests.filter((r) => r.status === "approved").reduce((sum, r) => sum + r.monthlyFee, 0),
  }

  const getStatusBadge = (status: string) => {
    const config = {
      approved: { label: "Đã duyệt", className: "border-green-500 text-green-700 bg-green-50" },
      pending: { label: "Chờ duyệt", className: "border-yellow-500 text-yellow-700 bg-yellow-50" },
      rejected: { label: "Từ chối", className: "border-red-500 text-red-700 bg-red-50" },
    }

    const statusConfig = config[status as keyof typeof config] || config.pending
    return (
      <Badge variant="outline" className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    )
  }

  const filteredRequests = parkingRequests.filter((request) => {
    const matchesSearch =
      request.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.room.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || request.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)

  const handleApprove = (requestId: string) => {
    console.log("Approving request:", requestId)
  }

  const handleReject = (requestId: string) => {
    console.log("Rejecting request:", requestId)
  }

  const handleCreateExternalRequest = () => {
    setSelectedExternalRequest(null)
    setIsCreateExternalOpen(true)
  }

  const handleEditExternalRequest = (request: any) => {
    setSelectedExternalRequest(request)
    setIsEditExternalOpen(true)
  }

  const handleViewExternalRequest = (request: any) => {
    setSelectedExternalRequest(request)
    setIsViewExternalOpen(true)
  }

  const handleDeleteExternalRequest = (requestId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa yêu cầu gửi xe ngoài này?")) {
      console.log("Deleting external parking request:", requestId)
    }
  }

  const handleSaveExternalRequest = (data: any) => {
    if (selectedExternalRequest) {
      console.log("Updating external parking request:", data)
    } else {
      console.log("Creating new external parking request:", data)
    }
  }

  const [externalStatusFilter, setExternalStatusFilter] = useState("all")
  const [externalMonthFilter, setExternalMonthFilter] = useState("all")
  const [externalCurrentPage, setExternalCurrentPage] = useState(1)
  const [externalSearchTerm, setExternalSearchTerm] = useState("")
  const [isCreateExternalOpen, setIsCreateExternalOpen] = useState(false)
  const [isEditExternalOpen, setIsEditExternalOpen] = useState(false)
  const [isViewExternalOpen, setIsViewExternalOpen] = useState(false)
  const [selectedExternalRequest, setSelectedExternalRequest] = useState<any>(null)
  const externalItemsPerPage = 10

  const filteredExternalRequests = mockParkingRequests.filter((request) => {
    const matchesSearch =
      request.residentName.toLowerCase().includes(externalSearchTerm.toLowerCase()) ||
      request.room.toLowerCase().includes(externalSearchTerm.toLowerCase())
    const matchesStatus = externalStatusFilter === "all" || request.status === externalStatusFilter
    const matchesMonth = externalMonthFilter === "all" || request.month === externalMonthFilter
    return matchesSearch && matchesStatus && matchesMonth
  })

  const paginatedExternalRequests = filteredExternalRequests.slice(
    (externalCurrentPage - 1) * externalItemsPerPage,
    externalCurrentPage * externalItemsPerPage,
  )
  const totalExternalPages = Math.ceil(filteredExternalRequests.length / externalItemsPerPage)

  const externalStats = {
    total: mockParkingRequests.length,
    submitted: mockParkingRequests.filter((r) => r.hasSubmittedProof).length,
    notSubmitted: mockParkingRequests.filter((r) => !r.hasSubmittedProof).length,
    approved: mockParkingRequests.filter((r) => r.status === "approved").length,
    pending: mockParkingRequests.filter((r) => r.status === "pending").length,
  }

  return (
    <MainLayout userRole={userRole}>
      <div className="space-y-4 md:space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-black">Quản lý gửi xe</h1>
            <p className="text-sm md:text-base text-gray-600">Đăng ký và quản lý chỗ gửi xe</p>
          </div>
          <Dialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Đăng ký gửi xe
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-black">Đăng ký gửi xe mới</DialogTitle>
                <DialogDescription className="text-gray-600">Nhập thông tin xe để đăng ký chỗ gửi</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="residentName" className="text-right text-black text-sm">
                    Tên cư dân *
                  </Label>
                  <Input
                    id="residentName"
                    placeholder="Họ và tên"
                    className="col-span-3 border-gray-300 focus:border-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right text-black text-sm">
                    Phòng *
                  </Label>
                  <Input id="room" placeholder="Số phòng" className="col-span-3 border-gray-300 focus:border-black" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicleType" className="text-right text-black text-sm">
                    Loại xe *
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3 border-gray-300 focus:border-black">
                      <SelectValue placeholder="Chọn loại xe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motorbike">Xe máy</SelectItem>
                      <SelectItem value="bicycle">Xe đạp</SelectItem>
                      <SelectItem value="electric">Xe điện</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="licensePlate" className="text-right text-black text-sm">
                    Biển số
                  </Label>
                  <Input
                    id="licensePlate"
                    placeholder="29A1-12345"
                    className="col-span-3 border-gray-300 focus:border-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="brand" className="text-right text-black text-sm">
                    Hãng xe
                  </Label>
                  <Input
                    id="brand"
                    placeholder="Honda, Yamaha, Giant..."
                    className="col-span-3 border-gray-300 focus:border-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="color" className="text-right text-black text-sm">
                    Màu sắc
                  </Label>
                  <Input
                    id="color"
                    placeholder="Đỏ, Xanh, Đen..."
                    className="col-span-3 border-gray-300 focus:border-black"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateRequestOpen(false)} className="border-gray-300">
                  Hủy
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white">Đăng ký</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Tổng chỗ gửi</CardTitle>
              <ParkingCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{parkingStats.totalSpots}</div>
              <p className="text-xs text-gray-600">Chỗ gửi xe</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Đã sử dụng</CardTitle>
              <Car className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{parkingStats.occupiedSpots}</div>
              <p className="text-xs text-gray-600">
                {Math.round((parkingStats.occupiedSpots / parkingStats.totalSpots) * 100)}% lấp đầy
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Còn trống</CardTitle>
              <MapPin className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{parkingStats.availableSpots}</div>
              <p className="text-xs text-gray-600">Chỗ trống</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Chờ duyệt</CardTitle>
              <Clock className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{parkingStats.pendingRequests}</div>
              <p className="text-xs text-gray-600">Yêu cầu mới</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Doanh thu</CardTitle>
              <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">
                {parkingStats.monthlyRevenue.toLocaleString("vi-VN")}đ
              </div>
              <p className="text-xs text-gray-600">Tháng này</p>
            </CardContent>
          </Card>
        </div>

        {/* Parking Requests Table */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-black">Yêu cầu gửi xe</CardTitle>
                <CardDescription className="text-gray-600">Quản lý đăng ký gửi xe của cư dân</CardDescription>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm theo tên, biển số, phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-black"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="rejected">Từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black min-w-[150px]">Cư dân</TableHead>
                    <TableHead className="text-black min-w-[80px]">Phòng</TableHead>
                    <TableHead className="text-black min-w-[100px]">Loại xe</TableHead>
                    <TableHead className="text-black min-w-[120px]">Biển số</TableHead>
                    <TableHead className="text-black min-w-[100px]">Chỗ gửi</TableHead>
                    <TableHead className="text-black min-w-[100px]">Phí tháng</TableHead>
                    <TableHead className="text-black min-w-[100px]">Trạng thái</TableHead>
                    <TableHead className="text-black min-w-[150px]">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-black text-sm">{request.residentName}</div>
                          <div className="text-xs text-gray-600">{request.requestDate}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-black text-sm">{request.room}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-black">{request.vehicleType}</div>
                          <div className="text-xs text-gray-600">
                            {request.brand} - {request.color}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-black text-sm">{request.licensePlate}</TableCell>
                      <TableCell className="text-black text-sm">
                        {request.parkingSpot || <span className="text-gray-500">Chưa phân</span>}
                      </TableCell>
                      <TableCell className="text-black text-sm">
                        {request.monthlyFee.toLocaleString("vi-VN")}đ
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 bg-transparent"
                            onClick={() => {
                              setSelectedRequest(request)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 bg-transparent"
                            onClick={() => {
                              setSelectedRequest(request)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-500 text-green-700 hover:bg-green-50 bg-transparent"
                                onClick={() => handleApprove(request.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                                onClick={() => handleReject(request.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {request.status !== "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                <span className="flex items-center px-4 text-sm">
                  Trang {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </Button>
              </div>
            )}

            {filteredRequests.length === 0 && (
              <div className="text-center py-8">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Không tìm thấy yêu cầu nào phù hợp</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* External Parking Requests */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-black">Yêu cầu gửi xe ngoài</CardTitle>
                <CardDescription className="text-gray-600">
                  Xem và duyệt minh chứng gửi xe bên ngoài để hỗ trợ chi phí
                </CardDescription>
              </div>
              <Button onClick={handleCreateExternalRequest} className="bg-black hover:bg-gray-800 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Thêm mới
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-medium">Tổng yêu cầu</p>
                <p className="text-xl font-bold text-blue-900">{externalStats.total}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-700 font-medium">Đã gửi MC</p>
                <p className="text-xl font-bold text-green-900">{externalStats.submitted}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-xs text-red-700 font-medium">Chưa gửi MC</p>
                <p className="text-xl font-bold text-red-900">{externalStats.notSubmitted}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-700 font-medium">Đã duyệt</p>
                <p className="text-xl font-bold text-purple-900">{externalStats.approved}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-700 font-medium">Chờ duyệt</p>
                <p className="text-xl font-bold text-yellow-900">{externalStats.pending}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm theo tên cư dân hoặc phòng..."
                  value={externalSearchTerm}
                  onChange={(e) => setExternalSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-black"
                />
              </div>
              <Select value={externalStatusFilter} onValueChange={setExternalStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                </SelectContent>
              </Select>
              <Select value={externalMonthFilter} onValueChange={setExternalMonthFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Lọc theo tháng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả tháng</SelectItem>
                  <SelectItem value="2024-12">Tháng 12/2024</SelectItem>
                  <SelectItem value="2024-11">Tháng 11/2024</SelectItem>
                  <SelectItem value="2024-10">Tháng 10/2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Cư dân</TableHead>
                    <TableHead className="text-black">Phòng</TableHead>
                    <TableHead className="text-black">Tháng</TableHead>
                    <TableHead className="text-black">Trạng thái MC</TableHead>
                    <TableHead className="text-black">Minh chứng</TableHead>
                    <TableHead className="text-black">Chi phí hỗ trợ</TableHead>
                    <TableHead className="text-black">Trạng thái HĐ</TableHead>
                    <TableHead className="text-black min-w-[200px]">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedExternalRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium text-sm">{request.residentName}</TableCell>
                      <TableCell className="text-sm">{request.room}</TableCell>
                      <TableCell className="text-sm">{request.month}</TableCell>
                      <TableCell>
                        {request.hasSubmittedProof ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Đã gửi
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            <Clock className="h-3 w-3 mr-1" />
                            Chưa gửi
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {request.externalParkingProof ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                            onClick={() => {
                              setSelectedProof(request)
                              setIsViewProofOpen(true)
                            }}
                          >
                            <ImageIcon className="h-4 w-4 mr-1" />
                            Xem ảnh
                          </Button>
                        ) : (
                          <span className="text-sm text-gray-500">Chưa có</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {request.externalParkingCost > 0
                          ? `${request.externalParkingCost.toLocaleString("vi-VN")}đ`
                          : "Chưa nhập"}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 bg-transparent"
                            onClick={() => handleViewExternalRequest(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 bg-transparent"
                            onClick={() => handleEditExternalRequest(request)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                            onClick={() => handleDeleteExternalRequest(request.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          {request.status === "pending" && request.hasSubmittedProof && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-500 text-green-700 hover:bg-green-50 bg-transparent"
                              onClick={() => {
                                setSelectedProof(request)
                                setIsApproveDialogOpen(true)
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Duyệt
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalExternalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExternalCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={externalCurrentPage === 1}
                >
                  Trước
                </Button>
                <span className="flex items-center px-4 text-sm">
                  Trang {externalCurrentPage} / {totalExternalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExternalCurrentPage((p) => Math.min(totalExternalPages, p + 1))}
                  disabled={externalCurrentPage === totalExternalPages}
                >
                  Sau
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Proof Dialog */}
      <Dialog open={isViewProofOpen} onOpenChange={setIsViewProofOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Minh chứng gửi xe ngoài</DialogTitle>
          </DialogHeader>
          {selectedProof && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Cư dân: {selectedProof.residentName}</p>
                <p className="text-sm text-gray-600">Phòng: {selectedProof.room}</p>
                <p className="text-sm text-gray-600">Tháng: {selectedProof.requestDate}</p>
              </div>
              <img
                src={selectedProof.externalParkingProof || "/placeholder.svg?height=400&width=600"}
                alt="Parking proof"
                className="w-full h-auto rounded-lg border"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Duyệt hỗ trợ chi phí gửi xe</DialogTitle>
          </DialogHeader>
          {selectedProof && (
            <div className="space-y-4">
              <div>
                <Label>Cư dân</Label>
                <p className="font-medium">{selectedProof.residentName}</p>
              </div>
              <div>
                <Label>Tháng</Label>
                <p>{selectedProof.requestDate}</p>
              </div>
              <div>
                <Label htmlFor="support_cost">Chi phí hỗ trợ (VNĐ) *</Label>
                <Input
                  id="support_cost"
                  type="number"
                  placeholder="100000"
                  value={supportCost}
                  onChange={(e) => setSupportCost(e.target.value)}
                />
                <p className="text-xs text-gray-600 mt-1">Nhập số tiền hỗ trợ cho cư dân</p>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Xác nhận duyệt</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu gửi xe</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Cư dân</Label>
                  <p className="font-medium">{selectedRequest.residentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phòng</Label>
                  <p className="font-medium">{selectedRequest.room}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Loại xe</Label>
                  <p>{selectedRequest.vehicleType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Biển số</Label>
                  <p>{selectedRequest.licensePlate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Hãng xe</Label>
                  <p>{selectedRequest.brand}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Màu sắc</Label>
                  <p>{selectedRequest.color}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Ngày đăng ký</Label>
                  <p>{selectedRequest.requestDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>
              {selectedRequest.parkingSpot && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Chỗ gửi</Label>
                  <p className="font-medium">{selectedRequest.parkingSpot}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-600">Phí tháng</Label>
                <p className="font-medium">{selectedRequest.monthlyFee.toLocaleString("vi-VN")}đ</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa yêu cầu gửi xe</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit_parking_spot">Chỗ gửi</Label>
                <Input id="edit_parking_spot" defaultValue={selectedRequest.parkingSpot || ""} placeholder="A-15" />
              </div>
              <div>
                <Label htmlFor="edit_status">Trạng thái</Label>
                <Select defaultValue={selectedRequest.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit_monthly_fee">Phí tháng (VNĐ)</Label>
                <Input id="edit_monthly_fee" type="number" defaultValue={selectedRequest.monthlyFee} />
              </div>
              <Button className="w-full bg-black hover:bg-gray-800 text-white">Cập nhật</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
