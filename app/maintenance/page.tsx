"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Eye,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react"

// Mock data for maintenance requests
const mockMaintenanceRequests = [
  {
    id: "MNT001",
    title: "Sửa chữa điều hòa",
    description: "Điều hòa phòng A101 không hoạt động, cần kiểm tra và sửa chữa",
    room: "A101",
    reportedBy: "Nguyễn Văn A",
    assignedTo: "Trần Văn Sửa",
    assignedPhone: "0912345678",
    priority: "high",
    status: "in_progress",
    createdDate: "2024-01-10",
    dueDate: "2024-01-15",
    completedDate: null,
    category: "electrical",
    cost: 500000,
    notes: "Đã kiểm tra, cần thay linh kiện",
  },
  {
    id: "MNT002",
    title: "Thay bóng đèn",
    description: "Bóng đèn hành lang tầng 2 bị hỏng",
    room: "Hành lang T2",
    reportedBy: "Lê Thị B",
    assignedTo: "Nguyễn Văn Điện",
    assignedPhone: "0987654321",
    priority: "low",
    status: "completed",
    createdDate: "2024-01-08",
    dueDate: "2024-01-12",
    completedDate: "2024-01-11",
    category: "electrical",
    cost: 50000,
    notes: "Đã thay bóng đèn LED mới",
  },
  {
    id: "MNT003",
    title: "Sửa chữa vòi nước",
    description: "Vòi nước phòng B201 bị rò rỉ",
    room: "B201",
    reportedBy: "Phạm Văn C",
    assignedTo: null,
    assignedPhone: null,
    priority: "medium",
    status: "pending",
    createdDate: "2024-01-12",
    dueDate: "2024-01-18",
    completedDate: null,
    category: "plumbing",
    cost: null,
    notes: null,
  },
]

interface MaintenanceRequest {
  id: string
  title: string
  description: string
  room: string
  reportedBy: string
  assignedTo: string | null
  assignedPhone: string | null
  priority: string
  status: string
  createdDate: string
  dueDate: string
  completedDate: string | null
  category: string
  cost: number | null
  notes: string | null
}

const maintenanceStats = {
  totalRequests: 156,
  pendingRequests: 23,
  inProgressRequests: 12,
  completedThisMonth: 45,
}

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<MaintenanceRequest | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [workerSearchTerm, setWorkerSearchTerm] = useState("")
  const itemsPerPage = 10

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Khẩn cấp</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Cao</Badge>
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Trung bình</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Thấp</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Chờ xử lý</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Đang xử lý</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Hoàn thành</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Đã hủy</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "electrical":
        return "Điện"
      case "plumbing":
        return "Nước"
      case "furniture":
        return "Nội thất"
      case "cleaning":
        return "Vệ sinh"
      case "security":
        return "An ninh"
      case "other":
        return "Khác"
      default:
        return category
    }
  }

  const getWorkerTotalCost = (workerName: string) => {
    return mockMaintenanceRequests
      .filter((req) => req.assignedTo === workerName && req.cost)
      .reduce((sum, req) => sum + (req.cost || 0), 0)
  }

  const getAllWorkers = () =>
    Array.from(new Set(mockMaintenanceRequests.filter((r) => r.assignedTo).map((r) => r.assignedTo)))

  const filteredWorkers = getAllWorkers().filter((worker) =>
    worker?.toLowerCase().includes(workerSearchTerm.toLowerCase()),
  )

  const filteredRequests = mockMaintenanceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)

  return (
    <MainLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Quản lý bảo trì</h1>
            <p className="text-gray-600 mt-1">Theo dõi và xử lý các yêu cầu bảo trì</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Tạo yêu cầu
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-4">
              <DialogHeader>
                <DialogTitle>Tạo yêu cầu bảo trì</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input id="title" placeholder="Mô tả ngắn gọn vấn đề" />
                </div>
                <div>
                  <Label htmlFor="room">Phòng/Khu vực</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A101">A101</SelectItem>
                      <SelectItem value="A102">A102</SelectItem>
                      <SelectItem value="B201">B201</SelectItem>
                      <SelectItem value="common">Khu vực chung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Danh mục</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">Điện</SelectItem>
                      <SelectItem value="plumbing">Nước</SelectItem>
                      <SelectItem value="furniture">Nội thất</SelectItem>
                      <SelectItem value="cleaning">Vệ sinh</SelectItem>
                      <SelectItem value="security">An ninh</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Mức độ ưu tiên</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="urgent">Khẩn cấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Mô tả chi tiết</Label>
                  <Textarea id="description" placeholder="Mô tả chi tiết vấn đề cần bảo trì..." />
                </div>
                <div>
                  <Label htmlFor="due_date">Hạn hoàn thành</Label>
                  <Input id="due_date" type="date" />
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Tạo yêu cầu</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Tổng yêu cầu</p>
                  <p className="text-xl md:text-2xl font-bold text-black">{maintenanceStats.totalRequests}</p>
                </div>
                <Wrench className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Chờ xử lý</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-600">{maintenanceStats.pendingRequests}</p>
                </div>
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Đang xử lý</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-600">{maintenanceStats.inProgressRequests}</p>
                </div>
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Hoàn thành tháng này</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{maintenanceStats.completedThisMonth}</p>
                </div>
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-gray-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm theo tiêu đề, phòng, mã yêu cầu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="in_progress">Đang xử lý</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Mức độ ưu tiên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả mức độ</SelectItem>
                    <SelectItem value="urgent">Khẩn cấp</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Requests Table */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Danh sách yêu cầu bảo trì</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Mã yêu cầu</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Tiêu đề</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Phòng</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Danh mục</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Mức độ</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Trạng thái</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Phân công</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Chi phí</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-900 text-sm">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 md:px-4 font-mono text-xs md:text-sm">{request.id}</td>
                      <td className="py-3 px-2 md:px-4">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{request.title}</div>
                          <div className="text-xs text-gray-500">Báo cáo: {request.reportedBy}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2 md:px-4 font-medium text-sm">{request.room}</td>
                      <td className="py-3 px-2 md:px-4 text-sm">{getCategoryText(request.category)}</td>
                      <td className="py-3 px-2 md:px-4">{getPriorityBadge(request.priority)}</td>
                      <td className="py-3 px-2 md:px-4">{getStatusBadge(request.status)}</td>
                      <td className="py-3 px-2 md:px-4">
                        {request.assignedTo ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium">{request.assignedTo}</span>
                            </div>
                            {request.assignedPhone && (
                              <div className="text-xs text-gray-500 ml-6">{request.assignedPhone}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Chưa phân công</span>
                        )}
                      </td>
                      <td className="py-3 px-2 md:px-4 text-sm">
                        {request.cost ? `${request.cost.toLocaleString("vi-VN")}đ` : "-"}
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <div className="flex md:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedRequest(request)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingRequest(request)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              {!request.assignedTo && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingRequest(request)
                                    setIsAssignDialogOpen(true)
                                  }}
                                >
                                  <UserPlus className="w-4 h-4 mr-2" />
                                  Phân công
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="hidden md:flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md mx-4">
                              <DialogHeader>
                                <DialogTitle>Chi tiết yêu cầu bảo trì</DialogTitle>
                              </DialogHeader>
                              {selectedRequest && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Mã yêu cầu</Label>
                                      <p className="font-mono">{selectedRequest.id}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Ngày tạo</Label>
                                      <p>{selectedRequest.createdDate}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Tiêu đề</Label>
                                    <p className="font-medium">{selectedRequest.title}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Mô tả</Label>
                                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedRequest.description}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Phòng/Khu vực</Label>
                                      <p>{selectedRequest.room}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Danh mục</Label>
                                      <p>{getCategoryText(selectedRequest.category)}</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Mức độ ưu tiên</Label>
                                      <div className="mt-1">{getPriorityBadge(selectedRequest.priority)}</div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                                      <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Người báo cáo</Label>
                                      <p>{selectedRequest.reportedBy}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Phân công cho</Label>
                                      <p>{selectedRequest.assignedTo || "Chưa phân công"}</p>
                                      {selectedRequest.assignedPhone && (
                                        <p className="text-sm text-gray-500">{selectedRequest.assignedPhone}</p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Hạn hoàn thành</Label>
                                      <p>{selectedRequest.dueDate}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Ngày hoàn thành</Label>
                                      <p>{selectedRequest.completedDate || "Chưa hoàn thành"}</p>
                                    </div>
                                  </div>
                                  {selectedRequest.cost && (
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Chi phí</Label>
                                      <p className="font-medium">{selectedRequest.cost.toLocaleString("vi-VN")} ₫</p>
                                    </div>
                                  )}
                                  {selectedRequest.notes && (
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Ghi chú</Label>
                                      <p className="text-sm bg-gray-50 p-2 rounded">{selectedRequest.notes}</p>
                                    </div>
                                  )}
                                  {selectedRequest.status === "pending" && (
                                    <div className="flex gap-2 pt-4">
                                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                        Phân công
                                      </Button>
                                      <Button variant="outline" className="flex-1 bg-transparent">
                                        Cập nhật
                                      </Button>
                                    </div>
                                  )}
                                  {selectedRequest.status === "in_progress" && (
                                    <div className="flex gap-2 pt-4">
                                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                                        Hoàn thành
                                      </Button>
                                      <Button variant="outline" className="flex-1 bg-transparent">
                                        Cập nhật tiến độ
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingRequest(request)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {!request.assignedTo && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingRequest(request)
                                setIsAssignDialogOpen(true)
                              }}
                            >
                              <UserPlus className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
                <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Không tìm thấy yêu cầu bảo trì nào phù hợp</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Total Cost by Worker */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Tổng chi phí theo thợ</CardTitle>
            <div className="flex items-center gap-3 mt-4">
              <input
                placeholder="Tìm kiếm theo tên thợ..."
                value={workerSearchTerm}
                onChange={(e) => setWorkerSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredWorkers.map((worker) => {
                const totalCost = getWorkerTotalCost(worker!)
                const workerPhone = mockMaintenanceRequests.find((r) => r.assignedTo === worker)?.assignedPhone
                return (
                  <div key={worker} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-black">{worker}</span>
                      </div>
                      {workerPhone && <p className="text-sm text-gray-500 ml-6">{workerPhone}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-black">{totalCost.toLocaleString("vi-VN")}đ</p>
                      <p className="text-xs text-gray-500">
                        {mockMaintenanceRequests.filter((r) => r.assignedTo === worker).length} công việc
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa yêu cầu bảo trì</DialogTitle>
            </DialogHeader>
            {editingRequest && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit_title">Tiêu đề</Label>
                  <Input id="edit_title" defaultValue={editingRequest.title} />
                </div>
                <div>
                  <Label htmlFor="edit_priority">Mức độ ưu tiên</Label>
                  <Select defaultValue={editingRequest.priority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="urgent">Khẩn cấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit_status">Trạng thái</Label>
                  <Select defaultValue={editingRequest.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="in_progress">Đang xử lý</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit_notes">Ghi chú</Label>
                  <Textarea id="edit_notes" defaultValue={editingRequest.notes || ""} />
                </div>
                <div>
                  <Label htmlFor="edit_cost">Chi phí (VNĐ)</Label>
                  <Input id="edit_cost" type="number" defaultValue={editingRequest.cost || ""} />
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Cập nhật</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Assign Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Phân công nhân viên</DialogTitle>
            </DialogHeader>
            {editingRequest && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Yêu cầu</Label>
                  <p className="font-medium">{editingRequest.title}</p>
                  <p className="text-sm text-gray-500">Phòng: {editingRequest.room}</p>
                </div>
                <div>
                  <Label htmlFor="assign_staff">Phân công cho</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhân viên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tran_van_sua">Trần Văn Sửa - Thợ điện</SelectItem>
                      <SelectItem value="nguyen_van_dien">Nguyễn Văn Điện - Thợ điện</SelectItem>
                      <SelectItem value="le_thi_nuoc">Lê Thị Nước - Thợ nước</SelectItem>
                      <SelectItem value="pham_van_sua">Phạm Văn Sửa - Thợ đa năng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assign_phone">Số điện thoại</Label>
                  <Input id="assign_phone" type="tel" placeholder="0912345678" />
                </div>
                <div>
                  <Label htmlFor="assign_due_date">Hạn hoàn thành</Label>
                  <Input id="assign_due_date" type="date" defaultValue={editingRequest.dueDate} />
                </div>
                <div>
                  <Label htmlFor="assign_notes">Ghi chú cho nhân viên</Label>
                  <Textarea id="assign_notes" placeholder="Hướng dẫn hoặc ghi chú đặc biệt..." />
                </div>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Phân công</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
