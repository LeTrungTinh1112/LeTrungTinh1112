"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Building2,
  Users,
  FileText,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Home,
  UserCheck,
  Bell,
  ArrowRight,
  Wrench,
} from "lucide-react"
import { mockRooms, mockResidents, mockContracts, mockPayments } from "@/lib/mock-data"
import Link from "next/link"

export default function ManagerPage() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [activityPage, setActivityPage] = useState(1)
  const activitiesPerPage = 5

  const [addResidentDialog, setAddResidentDialog] = useState(false)
  const [createContractDialog, setCreateContractDialog] = useState(false)
  const [processPaymentDialog, setProcessPaymentDialog] = useState(false)
  const [createMaintenanceDialog, setCreateMaintenanceDialog] = useState(false)

  const [residentForm, setResidentForm] = useState({
    name: "",
    phone: "",
    email: "",
    idCard: "",
  })
  const [contractForm, setContractForm] = useState({
    residentName: "",
    roomNumber: "",
    startDate: "",
    endDate: "",
  })
  const [paymentForm, setPaymentForm] = useState({
    residentName: "",
    amount: "",
    paymentMethod: "cash",
  })
  const [maintenanceForm, setMaintenanceForm] = useState({
    roomNumber: "",
    issue: "",
    description: "",
  })

  // Statistics calculations
  const totalRooms = mockRooms.length
  const occupiedRooms = mockRooms.filter((room) => room.status === "occupied").length
  const totalResidents = mockResidents.length
  const activeContracts = mockContracts.filter((contract) => contract.status === "active").length
  const monthlyRevenue = mockPayments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingPayments = mockPayments.filter((payment) => payment.status === "pending").length

  const stats = [
    {
      title: "Tổng phòng",
      value: totalRooms,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Phòng đã thuê",
      value: occupiedRooms,
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Cư dân",
      value: totalResidents,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "HĐ hiệu lực",
      value: activeContracts,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Doanh thu tháng",
      value: `${monthlyRevenue.toLocaleString()}đ`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "TT chờ xử lý",
      value: pendingPayments,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "contract",
      message: "Hợp đồng mới được tạo cho phòng A101",
      user: "Nguyễn Văn A",
      time: "2 giờ trước",
      status: "success",
    },
    {
      id: 2,
      type: "payment",
      message: "Thanh toán tiền phòng tháng 12 - Phòng B205",
      user: "Trần Thị B",
      time: "4 giờ trước",
      status: "success",
    },
    {
      id: 3,
      type: "maintenance",
      message: "Yêu cầu sửa chữa điều hòa - Phòng C301",
      user: "Lê Văn C",
      time: "6 giờ trước",
      status: "pending",
    },
    {
      id: 4,
      type: "resident",
      message: "Cư dân mới đăng ký - Nguyễn Văn D",
      user: "Phạm Thị D",
      time: "1 ngày trước",
      status: "success",
    },
    {
      id: 5,
      type: "contract",
      message: "Gia hạn hợp đồng phòng D102",
      user: "Hoàng Văn E",
      time: "1 ngày trước",
      status: "success",
    },
    {
      id: 6,
      type: "payment",
      message: "Thanh toán quá hạn - Phòng E201",
      user: "Vũ Thị F",
      time: "2 ngày trước",
      status: "error",
    },
    {
      id: 7,
      type: "maintenance",
      message: "Hoàn thành sửa chữa vòi nước - Phòng F301",
      user: "Đỗ Văn G",
      time: "2 ngày trước",
      status: "success",
    },
    {
      id: 8,
      type: "contract",
      message: "Hợp đồng sắp hết hạn - Phòng G101",
      user: "Bùi Thị H",
      time: "3 ngày trước",
      status: "pending",
    },
    {
      id: 9,
      type: "payment",
      message: "Thanh toán thành công - Phòng H202",
      user: "Lý Văn I",
      time: "3 ngày trước",
      status: "success",
    },
    {
      id: 10,
      type: "resident",
      message: "Cư dân chuyển phòng - Từ A101 sang B202",
      user: "Trương Thị K",
      time: "4 ngày trước",
      status: "success",
    },
  ]

  const paginatedActivities = recentActivities.slice(
    (activityPage - 1) * activitiesPerPage,
    activityPage * activitiesPerPage,
  )
  const totalActivityPages = Math.ceil(recentActivities.length / activitiesPerPage)

  const pendingTasks = [
    {
      id: 1,
      title: "Duyệt thanh toán chờ xử lý",
      count: mockPayments.filter((p) => p.status === "pending").length,
      priority: "high",
      link: "/payments",
    },
    {
      id: 2,
      title: "Xử lý yêu cầu bảo trì",
      count: 5,
      priority: "medium",
      link: "/maintenance",
    },
    {
      id: 3,
      title: "Hợp đồng sắp hết hạn",
      count: 8,
      priority: "high",
      link: "/contracts",
    },
    {
      id: 4,
      title: "Cư dân chờ phê duyệt",
      count: mockResidents.filter((r) => r.status === "pending").length,
      priority: "medium",
      link: "/residents",
    },
  ]

  const handleAddResident = () => {
    console.log("[v0] Adding resident:", residentForm)
    // In a real app, this would call an API
    alert(`Đã thêm cư dân: ${residentForm.name}`)
    setResidentForm({ name: "", phone: "", email: "", idCard: "" })
    setAddResidentDialog(false)
  }

  const handleCreateContract = () => {
    console.log("[v0] Creating contract:", contractForm)
    alert(`Đã tạo hợp đồng cho phòng: ${contractForm.roomNumber}`)
    setContractForm({ residentName: "", roomNumber: "", startDate: "", endDate: "" })
    setCreateContractDialog(false)
  }

  const handleProcessPayment = () => {
    console.log("[v0] Processing payment:", paymentForm)
    alert(`Đã xử lý thanh toán: ${paymentForm.amount}đ`)
    setPaymentForm({ residentName: "", amount: "", paymentMethod: "cash" })
    setProcessPaymentDialog(false)
  }

  const handleCreateMaintenance = () => {
    console.log("[v0] Creating maintenance request:", maintenanceForm)
    alert(`Đã tạo yêu cầu bảo trì cho phòng: ${maintenanceForm.roomNumber}`)
    setMaintenanceForm({ roomNumber: "", issue: "", description: "" })
    setCreateMaintenanceDialog(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 text-red-700 bg-red-50"
      case "medium":
        return "border-blue-500 text-blue-700 bg-blue-50"
      case "low":
        return "border-green-500 text-green-700 bg-green-50"
      default:
        return "border-gray-500 text-gray-700 bg-gray-50"
    }
  }

  return (
    <MainLayout userRole="manager" currentPage={currentPage} onNavigate={setCurrentPage}>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-black">Dashboard Manager</h1>
            <p className="text-gray-600 text-sm lg:text-base">Tổng quan quản lý chi nhánh</p>
          </div>
          <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50 w-fit">
            Manager Dashboard
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-2 border-gray-200 hover:border-black transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-lg lg:text-2xl font-bold text-black">{stat.value}</p>
                    </div>
                    <div className={`p-2 lg:p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-4 w-4 lg:h-6 lg:w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-gray-100">
            <TabsTrigger value="overview" className="text-xs lg:text-sm">
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="rooms" className="text-xs lg:text-sm">
              Phòng
            </TabsTrigger>
            <TabsTrigger value="residents" className="text-xs lg:text-sm">
              Cư dân
            </TabsTrigger>
            <TabsTrigger value="finance" className="text-xs lg:text-sm">
              Tài chính
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Hoạt động gần đây
                  </CardTitle>
                  <CardDescription>Các sự kiện mới nhất trong hệ thống</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paginatedActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {getStatusIcon(activity.status)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-black">{activity.message}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <p className="text-xs text-gray-500">{activity.user}</p>
                            <span className="text-xs text-gray-400">•</span>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalActivityPages > 1 && (
                    <div className="flex justify-center gap-2 mt-4 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActivityPage((p) => Math.max(1, p - 1))}
                        disabled={activityPage === 1}
                        className="text-xs"
                      >
                        Trước
                      </Button>
                      <span className="flex items-center px-3 text-sm text-gray-600 font-medium">
                        Trang {activityPage} / {totalActivityPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActivityPage((p) => Math.min(totalActivityPages, p + 1))}
                        disabled={activityPage === totalActivityPages}
                        className="text-xs"
                      >
                        Sau
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Thao tác nhanh</CardTitle>
                  <CardDescription>Các chức năng thường dùng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setAddResidentDialog(true)}
                      className="w-full h-auto p-4 flex flex-col items-center gap-2 border-2 hover:border-black hover:bg-gray-50 bg-transparent transition-all"
                    >
                      <UserCheck className="h-6 w-6" />
                      <span className="text-sm font-medium">Thêm cư dân</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCreateContractDialog(true)}
                      className="w-full h-auto p-4 flex flex-col items-center gap-2 border-2 hover:border-black hover:bg-gray-50 bg-transparent transition-all"
                    >
                      <FileText className="h-6 w-6" />
                      <span className="text-sm font-medium">Tạo hợp đồng</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setProcessPaymentDialog(true)}
                      className="w-full h-auto p-4 flex flex-col items-center gap-2 border-2 hover:border-black hover:bg-gray-50 bg-transparent transition-all"
                    >
                      <CreditCard className="h-6 w-6" />
                      <span className="text-sm font-medium">Xử lý thanh toán</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCreateMaintenanceDialog(true)}
                      className="w-full h-auto p-4 flex flex-col items-center gap-2 border-2 hover:border-black hover:bg-gray-50 bg-transparent transition-all"
                    >
                      <Wrench className="h-6 w-6" />
                      <span className="text-sm font-medium">Tạo yêu cầu BT</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Công việc cần xử lý
                </CardTitle>
                <CardDescription>Các nhiệm vụ đang chờ bạn xử lý</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingTasks.map((task) => (
                    <Link key={task.id} href={task.link}>
                      <div className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-black hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex-1">
                          <p className="font-medium text-black text-sm group-hover:text-black">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority === "high" ? "Ưu tiên cao" : "Ưu tiên trung bình"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-black">{task.count}</div>
                            <p className="text-xs text-gray-500">công việc</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms" className="space-y-4">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Tình trạng phòng</CardTitle>
                <CardDescription>Thống kê chi tiết về tình trạng các phòng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-2xl font-bold text-green-600">{occupiedRooms}</div>
                    <div className="text-sm text-green-700">Đã thuê</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{totalRooms - occupiedRooms}</div>
                    <div className="text-sm text-blue-700">Còn trống</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-sm text-blue-700">Bảo trì</div>
                  </div>
                </div>
                <Button
                  onClick={() => setCurrentPage("rooms-overview")}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Xem sơ đồ phòng chi tiết
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="residents" className="space-y-4">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Quản lý cư dân</CardTitle>
                <CardDescription>Thông tin tổng quan về cư dân</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{totalResidents}</div>
                    <div className="text-sm text-purple-700">Tổng cư dân</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-2xl font-bold text-green-600">{activeContracts}</div>
                    <div className="text-sm text-green-700">HĐ hiệu lực</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setCurrentPage("residents-list")}
                    variant="outline"
                    className="flex-1 border-2 hover:border-black"
                  >
                    Danh sách cư dân
                  </Button>
                  <Button
                    onClick={() => setCurrentPage("residents-add")}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    Thêm cư dân mới
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="space-y-4">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Báo cáo tài chính</CardTitle>
                <CardDescription>Thống kê doanh thu và thanh toán</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-xl font-bold text-green-600">{monthlyRevenue.toLocaleString()}đ</div>
                    <div className="text-sm text-green-700">Doanh thu tháng</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="text-xl font-bold text-blue-600">{pendingPayments}</div>
                    <div className="text-sm text-blue-700">TT chờ xử lý</div>
                  </div>
                </div>
                <Button
                  onClick={() => setCurrentPage("payments-list")}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Xem chi tiết thanh toán
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Resident Dialog */}
      <Dialog open={addResidentDialog} onOpenChange={setAddResidentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm cư dân mới</DialogTitle>
            <DialogDescription>Nhập thông tin cư dân mới vào hệ thống</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="resident-name">Họ và tên</Label>
              <Input
                id="resident-name"
                value={residentForm.name}
                onChange={(e) => setResidentForm({ ...residentForm, name: e.target.value })}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <Label htmlFor="resident-phone">Số điện thoại</Label>
              <Input
                id="resident-phone"
                value={residentForm.phone}
                onChange={(e) => setResidentForm({ ...residentForm, phone: e.target.value })}
                placeholder="0123456789"
              />
            </div>
            <div>
              <Label htmlFor="resident-email">Email</Label>
              <Input
                id="resident-email"
                type="email"
                value={residentForm.email}
                onChange={(e) => setResidentForm({ ...residentForm, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="resident-idcard">CCCD/CMND</Label>
              <Input
                id="resident-idcard"
                value={residentForm.idCard}
                onChange={(e) => setResidentForm({ ...residentForm, idCard: e.target.value })}
                placeholder="001234567890"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddResidentDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddResident} className="bg-black text-white hover:bg-gray-800">
              Thêm cư dân
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Contract Dialog */}
      <Dialog open={createContractDialog} onOpenChange={setCreateContractDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo hợp đồng mới</DialogTitle>
            <DialogDescription>Tạo hợp đồng thuê phòng cho cư dân</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="contract-resident">Tên cư dân</Label>
              <Input
                id="contract-resident"
                value={contractForm.residentName}
                onChange={(e) => setContractForm({ ...contractForm, residentName: e.target.value })}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <Label htmlFor="contract-room">Số phòng</Label>
              <Input
                id="contract-room"
                value={contractForm.roomNumber}
                onChange={(e) => setContractForm({ ...contractForm, roomNumber: e.target.value })}
                placeholder="A101"
              />
            </div>
            <div>
              <Label htmlFor="contract-start">Ngày bắt đầu</Label>
              <Input
                id="contract-start"
                type="date"
                value={contractForm.startDate}
                onChange={(e) => setContractForm({ ...contractForm, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contract-end">Ngày kết thúc</Label>
              <Input
                id="contract-end"
                type="date"
                value={contractForm.endDate}
                onChange={(e) => setContractForm({ ...contractForm, endDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateContractDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleCreateContract} className="bg-black text-white hover:bg-gray-800">
              Tạo hợp đồng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Process Payment Dialog */}
      <Dialog open={processPaymentDialog} onOpenChange={setProcessPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Xử lý thanh toán</DialogTitle>
            <DialogDescription>Ghi nhận thanh toán từ cư dân</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="payment-resident">Tên cư dân</Label>
              <Input
                id="payment-resident"
                value={paymentForm.residentName}
                onChange={(e) => setPaymentForm({ ...paymentForm, residentName: e.target.value })}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <Label htmlFor="payment-amount">Số tiền (VND)</Label>
              <Input
                id="payment-amount"
                type="number"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                placeholder="3000000"
              />
            </div>
            <div>
              <Label htmlFor="payment-method">Hình thức thanh toán</Label>
              <select
                id="payment-method"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={paymentForm.paymentMethod}
                onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
              >
                <option value="cash">Tiền mặt</option>
                <option value="transfer">Chuyển khoản</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProcessPaymentDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleProcessPayment} className="bg-black text-white hover:bg-gray-800">
              Xác nhận thanh toán
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Maintenance Dialog */}
      <Dialog open={createMaintenanceDialog} onOpenChange={setCreateMaintenanceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo yêu cầu bảo trì</DialogTitle>
            <DialogDescription>Ghi nhận yêu cầu sửa chữa, bảo trì</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="maintenance-room">Số phòng</Label>
              <Input
                id="maintenance-room"
                value={maintenanceForm.roomNumber}
                onChange={(e) => setMaintenanceForm({ ...maintenanceForm, roomNumber: e.target.value })}
                placeholder="A101"
              />
            </div>
            <div>
              <Label htmlFor="maintenance-issue">Vấn đề</Label>
              <Input
                id="maintenance-issue"
                value={maintenanceForm.issue}
                onChange={(e) => setMaintenanceForm({ ...maintenanceForm, issue: e.target.value })}
                placeholder="VD: Điều hòa hỏng"
              />
            </div>
            <div>
              <Label htmlFor="maintenance-description">Mô tả chi tiết</Label>
              <Textarea
                id="maintenance-description"
                value={maintenanceForm.description}
                onChange={(e) => setMaintenanceForm({ ...maintenanceForm, description: e.target.value })}
                placeholder="Mô tả chi tiết về vấn đề..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateMaintenanceDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleCreateMaintenance} className="bg-black text-white hover:bg-gray-800">
              Tạo yêu cầu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
