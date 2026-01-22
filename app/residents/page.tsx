"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  UserPlus,
  Eye,
  Edit,
  Search,
  FileText,
  Wrench,
  CreditCard,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react"
import { mockResidents, mockContracts, mockPayments, mockMaintenanceRequests } from "@/lib/mock-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function ResidentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [genderFilter, setGenderFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedResident, setSelectedResident] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [reportSearchTerm, setReportSearchTerm] = useState("")
  const [reportGenderFilter, setReportGenderFilter] = useState("all")
  const [reportStatusFilter, setReportStatusFilter] = useState("all")
  const itemsPerPage = 10

  const stats = {
    total: mockResidents.length,
    active: mockResidents.filter((r) => r.status === "active").length,
    pending: mockResidents.filter((r) => r.status === "pending").length,
    expired: mockResidents.filter((r) => r.status === "expired").length,
  }

  const filteredResidents = mockResidents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.phone.includes(searchTerm) ||
      resident.cccd.includes(searchTerm)

    const matchesGender = genderFilter === "all" || resident.gender === genderFilter
    const matchesStatus = statusFilter === "all" || resident.status === statusFilter

    return matchesSearch && matchesGender && matchesStatus
  })

  const filteredReportResidents = mockResidents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
      resident.phone.includes(reportSearchTerm) ||
      resident.cccd.includes(reportSearchTerm)

    const matchesGender = reportGenderFilter === "all" || resident.gender === reportGenderFilter
    const matchesStatus = reportStatusFilter === "all" || resident.status === reportStatusFilter

    return matchesSearch && matchesGender && matchesStatus
  })

  const paginatedResidents = filteredResidents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage)

  const getResidentContract = (residentId: string) => {
    return mockContracts.find((c) => c.residentId === residentId)
  }

  const getResidentPayments = (residentId: string) => {
    return mockPayments.filter((p) => p.residentId === residentId)
  }

  const getResidentMaintenance = (residentId: string) => {
    return mockMaintenanceRequests.filter((m) => m.reportedById === residentId)
  }

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: "Đang ở", className: "border-green-500 text-green-700 bg-green-50" },
      pending: { label: "Chờ duyệt", className: "border-yellow-500 text-yellow-700 bg-yellow-50" },
      expired: { label: "Hết hạn", className: "border-red-500 text-red-700 bg-red-50" },
    }
    const statusConfig = config[status as keyof typeof config] || config.pending
    return (
      <Badge variant="outline" className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    )
  }

  const handleViewReport = (resident: any) => {
    setSelectedResident(resident)
    setIsReportDialogOpen(true)
  }

  const handleEdit = (resident: any) => {
    setSelectedResident(resident)
    setIsEditDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-4 md:space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-black rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-black">Quản lý cư dân</h1>
              <p className="text-xs md:text-sm text-gray-600">Theo dõi thông tin cư dân</p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/residents/add")}
            className="bg-black hover:bg-gray-800 text-white text-sm w-full sm:w-auto"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Thêm cư dân
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Tổng cư dân</CardTitle>
              <Users className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{stats.total}</div>
              <p className="text-xs text-gray-600">Tất cả</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Đang ở</CardTitle>
              <Users className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{stats.active}</div>
              <p className="text-xs text-gray-600">Hoạt động</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Chờ duyệt</CardTitle>
              <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{stats.pending}</div>
              <p className="text-xs text-gray-600">Cần xử lý</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Hết hạn</CardTitle>
              <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{stats.expired}</div>
              <p className="text-xs text-gray-600">Đã hết hạn</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-xs md:text-sm"
            >
              Danh sách
            </TabsTrigger>
            <TabsTrigger
              value="report"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-xs md:text-sm"
            >
              Báo cáo
            </TabsTrigger>
          </TabsList>

          {/* List Tab */}
          <TabsContent value="list" className="space-y-4 md:space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-black text-base md:text-lg">Danh sách cư dân</CardTitle>
                    <CardDescription className="text-gray-600 text-sm">
                      Quản lý thông tin cư dân trong hệ thống
                    </CardDescription>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm theo tên, email, SĐT, CCCD..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-black text-sm"
                    />
                  </div>
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả giới tính</SelectItem>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="active">Đang ở</SelectItem>
                      <SelectItem value="pending">Chờ duyệt</SelectItem>
                      <SelectItem value="expired">Hết hạn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black min-w-[200px]">Cư dân</TableHead>
                        <TableHead className="text-black min-w-[100px]">Giới tính</TableHead>
                        <TableHead className="text-black min-w-[120px]">Liên hệ</TableHead>
                        <TableHead className="text-black min-w-[120px]">Phòng</TableHead>
                        <TableHead className="text-black min-w-[140px]">Hợp đồng</TableHead>
                        <TableHead className="text-black min-w-[120px]">Môi giới</TableHead>
                        <TableHead className="text-black min-w-[100px]">Trạng thái</TableHead>
                        <TableHead className="text-black min-w-[120px]">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedResidents.map((resident) => {
                        const contract = getResidentContract(resident.id)
                        return (
                          <TableRow key={resident.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={resident.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gray-200 text-black text-xs">
                                    {resident.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-black text-sm">{resident.name}</div>
                                  <div className="text-xs text-gray-600">{resident.cccd}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-black text-sm">{resident.gender}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="text-black">{resident.phone}</div>
                                <div className="text-xs text-gray-600">{resident.email}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-black text-sm">
                              {resident.roomId ? `A${resident.roomId}` : <span className="text-gray-500">Chưa có</span>}
                            </TableCell>
                            <TableCell>
                              {contract ? (
                                <div className="text-sm">
                                  <div className="text-black">{contract.startDate}</div>
                                  <div className="text-xs text-gray-600">đến {contract.endDate}</div>
                                </div>
                              ) : (
                                <span className="text-gray-500 text-sm">Chưa có</span>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-black">{resident.broker}</TableCell>
                            <TableCell>{getStatusBadge(resident.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="hidden sm:flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-300 bg-transparent"
                                    onClick={() => {
                                      setSelectedResident(resident)
                                      setIsViewDialogOpen(true)
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-300 bg-transparent"
                                    onClick={() => handleViewReport(resident)}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-300 bg-transparent"
                                    onClick={() => handleEdit(resident)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="sm:hidden">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedResident(resident)
                                          setIsViewDialogOpen(true)
                                        }}
                                      >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Xem chi tiết
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleViewReport(resident)}>
                                        <FileText className="h-4 w-4 mr-2" />
                                        Xem báo cáo
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleEdit(resident)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Chỉnh sửa
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Báo cáo cư dân</CardTitle>
                <CardDescription className="text-gray-600">Chọn cư dân để xem báo cáo chi tiết</CardDescription>

                {/* Search and Filter for Reports */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm cư dân để xem báo cáo..."
                      value={reportSearchTerm}
                      onChange={(e) => setReportSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-black text-sm"
                    />
                  </div>
                  <Select value={reportGenderFilter} onValueChange={setReportGenderFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả giới tính</SelectItem>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={reportStatusFilter} onValueChange={setReportStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="active">Đang ở</SelectItem>
                      <SelectItem value="pending">Chờ duyệt</SelectItem>
                      <SelectItem value="expired">Hết hạn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select
                    onValueChange={(value) => {
                      const resident = mockResidents.find((r) => r.id === value)
                      if (resident) handleViewReport(resident)
                    }}
                  >
                    <SelectTrigger className="w-full border-gray-300 focus:border-black">
                      <SelectValue placeholder="Chọn cư dân để xem báo cáo" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredReportResidents.map((resident) => (
                        <SelectItem key={resident.id} value={resident.id}>
                          {resident.name} - {resident.roomId ? `Phòng A${resident.roomId}` : "Chưa có phòng"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chọn cư dân từ danh sách để xem báo cáo chi tiết</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Chi tiết cư dân</DialogTitle>
            <DialogDescription className="text-gray-600">Thông tin đầy đủ về cư dân</DialogDescription>
          </DialogHeader>
          {selectedResident && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedResident.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-200 text-black text-xl">
                    {selectedResident.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold text-black">{selectedResident.name}</h3>
                  <p className="text-gray-600">{selectedResident.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">CCCD</Label>
                  <p className="font-medium">{selectedResident.cccd}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Giới tính</Label>
                  <p className="font-medium">{selectedResident.gender}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Số điện thoại</Label>
                  <p className="font-medium">{selectedResident.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Ngày sinh</Label>
                  <p className="font-medium">{selectedResident.dateOfBirth}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-600">Địa chỉ</Label>
                  <p className="font-medium">{selectedResident.address}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-600">Liên hệ khẩn cấp</Label>
                  <p className="font-medium">{selectedResident.emergencyContact}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Môi giới</Label>
                  <p className="font-medium">{selectedResident.broker}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                  <div className="mt-1">{getStatusBadge(selectedResident.status)}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Báo cáo cư dân</DialogTitle>
            <DialogDescription className="text-gray-600">
              Tổng hợp thông tin bảo trì, thanh toán và nhắc nhở
            </DialogDescription>
          </DialogHeader>
          {selectedResident && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedResident.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-200 text-black">{selectedResident.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-black">{selectedResident.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedResident.roomId ? `Phòng A${selectedResident.roomId}` : "Chưa có phòng"}
                  </p>
                </div>
              </div>

              {/* Maintenance History */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-gray-600" />
                  <h4 className="font-medium text-black">Lịch sử bảo trì</h4>
                </div>
                <div className="space-y-2">
                  {getResidentMaintenance(selectedResident.id).map((maintenance) => (
                    <Card key={maintenance.id} className="border border-gray-200">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{maintenance.title}</p>
                            <p className="text-xs text-gray-600">{maintenance.description}</p>
                            <p className="text-xs text-gray-600 mt-1">Ngày tạo: {maintenance.createdAt}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {maintenance.status === "completed"
                              ? "Hoàn thành"
                              : maintenance.status === "in_progress"
                                ? "Đang xử lý"
                                : "Chờ xử lý"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {getResidentMaintenance(selectedResident.id).length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">Chưa có yêu cầu bảo trì nào</p>
                  )}
                </div>
              </div>

              {/* Payment History */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <h4 className="font-medium text-black">Lịch sử thanh toán</h4>
                </div>
                <div className="space-y-2">
                  {getResidentPayments(selectedResident.id)
                    .slice(0, 5)
                    .map((payment) => (
                      <Card key={payment.id} className="border border-gray-200">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">Tiền thuê - {payment.roomName}</p>
                              <p className="text-xs text-gray-600">Hạn: {payment.dueDate}</p>
                              {payment.paidDate && (
                                <p className="text-xs text-gray-600">Đã thanh toán: {payment.paidDate}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">{payment.amount.toLocaleString()}đ</p>
                              <Badge
                                variant="outline"
                                className={
                                  payment.status === "paid"
                                    ? "border-green-500 text-green-700 bg-green-50"
                                    : payment.status === "overdue"
                                      ? "border-red-500 text-red-700 bg-red-50"
                                      : "border-yellow-500 text-yellow-700 bg-yellow-50"
                                }
                              >
                                {payment.status === "paid"
                                  ? "Đã thanh toán"
                                  : payment.status === "overdue"
                                    ? "Quá hạn"
                                    : "Chưa thanh toán"}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {getResidentPayments(selectedResident.id).length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">Chưa có lịch sử thanh toán</p>
                  )}
                </div>
              </div>

              {/* Reminders */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                  <h4 className="font-medium text-black">Nhắc nhở</h4>
                </div>
                <div className="space-y-2">
                  {getResidentPayments(selectedResident.id)
                    .filter((p) => p.status === "pending" || p.status === "overdue")
                    .map((payment) => (
                      <Card key={payment.id} className="border border-yellow-200 bg-yellow-50">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium text-yellow-800">
                            {payment.status === "overdue" ? "⚠️ Thanh toán quá hạn" : "⏰ Sắp đến hạn thanh toán"}
                          </p>
                          <p className="text-xs text-yellow-700">
                            Tiền thuê tháng - Hạn: {payment.dueDate} - {payment.amount.toLocaleString()}đ
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  {getResidentPayments(selectedResident.id).filter((p) => p.status !== "paid").length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">Không có nhắc nhở nào</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Chỉnh sửa thông tin cư dân</DialogTitle>
            <DialogDescription className="text-gray-600">Cập nhật thông tin cư dân</DialogDescription>
          </DialogHeader>
          {selectedResident && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-black">Họ và tên</Label>
                  <Input defaultValue={selectedResident.name} className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-black">CCCD</Label>
                  <Input defaultValue={selectedResident.cccd} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-black">Email</Label>
                  <Input defaultValue={selectedResident.email} className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-black">Số điện thoại</Label>
                  <Input defaultValue={selectedResident.phone} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-black">Giới tính</Label>
                  <Select defaultValue={selectedResident.gender}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-black">Ngày sinh</Label>
                  <Input type="date" defaultValue={selectedResident.dateOfBirth} className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-black">Địa chỉ</Label>
                <Input defaultValue={selectedResident.address} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-black">Liên hệ khẩn cấp</Label>
                <Input defaultValue={selectedResident.emergencyContact} className="mt-1" />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Hủy
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white">Lưu thay đổi</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
