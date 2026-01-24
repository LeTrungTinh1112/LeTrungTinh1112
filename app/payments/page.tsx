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
import {
  Search,
  Plus,
  Eye,
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockPayments, mockResidents } from "@/lib/mock-data"

interface Payment {
  id: string
  contractId: string
  residentName: string
  residentId: string
  roomName: string | null
  amount: number
  type: string
  dueDate: string
  paidDate: string | null
  status: string
  method: string | null
  branch: string
  proofImage: string | null
  note?: string
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [approvalFilter, setApprovalFilter] = useState("all")
  const [customerFilter, setCustomerFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [selectedPaymentForApproval, setSelectedPaymentForApproval] = useState<Payment | null>(null)
  const [branchFilter, setBranchFilter] = useState("all")

  const generateMonthOptions = () => {
    const months = []
    const currentDate = new Date()
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const displayText = date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })
      months.push({ value: monthYear, label: displayText })
    }
    return months
  }

  const monthOptions = generateMonthOptions()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Đã thanh toán</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Chờ thanh toán</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Quá hạn</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Chuyển khoản"
      case "cash":
        return "Tiền mặt"
      case "card":
        return "Thẻ"
      default:
        return "Chưa xác định"
    }
  }

  const calculateVAT = (amount: number) => {
    const VAT_RATE = 0.1 // 10% VAT
    return Math.round(amount * VAT_RATE)
  }

  const getAmountWithVAT = (amount: number) => {
    return amount + calculateVAT(amount)
  }

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.roomName && payment.roomName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesCustomer = customerFilter === "all" || payment.residentId === customerFilter
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter
    const matchesApproval =
      approvalFilter === "all" ||
      (approvalFilter === "approved" && payment.proofImage && payment.status === "paid") ||
      (approvalFilter === "pending" && payment.proofImage && payment.status === "pending")

    const matchesMonth =
      monthFilter === "all" ||
      (payment.dueDate && payment.dueDate.startsWith(monthFilter)) ||
      (payment.paidDate && payment.paidDate.startsWith(monthFilter))

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCustomer &&
      matchesMethod &&
      matchesApproval &&
      matchesMonth
    )
  })

  const calculateMonthlyStats = () => {
    const stats = {
      totalRent: 0,
      paidRent: 0,
      pendingRent: 0,
      overdueRent: 0,
      totalPayments: 0,
      paidCount: 0,
      pendingCount: 0,
      overdueCount: 0,
    }

    filteredPayments.forEach((payment) => {
      if (payment.type === "Tiền phòng" || payment.type === "room_fee" || payment.type === "rent") {
        const amountWithVAT = getAmountWithVAT(payment.amount)
        stats.totalRent += amountWithVAT
        stats.totalPayments++

        if (payment.status === "paid") {
          stats.paidRent += amountWithVAT
          stats.paidCount++
        } else if (payment.status === "pending") {
          stats.pendingRent += amountWithVAT
          stats.pendingCount++
        } else if (payment.status === "overdue") {
          stats.overdueRent += amountWithVAT
          stats.overdueCount++
        }
      }
    })

    return stats
  }

  const monthlyStats = calculateMonthlyStats()

  const paginatedPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (paymentId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thanh toán này?")) {
      console.log("Deleting payment:", paymentId)
    }
  }

  const handleApprovePayment = (payment: Payment) => {
    setSelectedPaymentForApproval(payment)
    setIsApprovalDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-black">Quản lý thanh toán</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Theo dõi và xử lý các khoản thanh toán</p>
            {monthFilter !== "all" && (
              <p className="text-sm text-blue-600 mt-1">
                Đang xem: {monthOptions.find((m) => m.value === monthFilter)?.label}
              </p>
            )}
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Tạo hóa đơn
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tạo hóa đơn mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contract">Hợp đồng</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hợp đồng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CT001">CT001 - Nguyễn Văn A</SelectItem>
                      <SelectItem value="CT002">CT002 - Trần Thị B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Loại thanh toán</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="room_fee">Tiền phòng</SelectItem>
                      <SelectItem value="deposit">Tiền cọc</SelectItem>
                      <SelectItem value="service">Dịch vụ</SelectItem>
                      <SelectItem value="penalty">Phạt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Số tiền (VNĐ)</Label>
                  <Input id="amount" type="number" placeholder="2500000" />
                </div>
                <div>
                  <Label htmlFor="due_date">Hạn thanh toán</Label>
                  <Input id="due_date" type="date" />
                </div>
                <div>
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea id="note" placeholder="Ghi chú thêm..." />
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Tạo hóa đơn</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Tổng tiền phòng</p>
                  <p className="text-lg md:text-2xl font-bold text-black">
                    {monthlyStats.totalRent.toLocaleString("vi-VN")} ₫
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{monthlyStats.totalPayments} hóa đơn</p>
                </div>
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Đã thu</p>
                  <p className="text-lg md:text-2xl font-bold text-green-600">
                    {monthlyStats.paidRent.toLocaleString("vi-VN")} ₫
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{monthlyStats.paidCount} hóa đơn</p>
                </div>
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Chờ thanh toán</p>
                  <p className="text-lg md:text-2xl font-bold text-yellow-600">
                    {monthlyStats.pendingRent.toLocaleString("vi-VN")} ₫
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{monthlyStats.pendingCount} hóa đơn</p>
                </div>
                <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Quá hạn</p>
                  <p className="text-lg md:text-2xl font-bold text-red-600">
                    {monthlyStats.overdueRent.toLocaleString("vi-VN")} ₫
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{monthlyStats.overdueCount} hóa đơn</p>
                </div>
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tên, mã thanh toán, phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger>
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tháng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả các tháng</SelectItem>
                  {monthOptions.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={customerFilter} onValueChange={setCustomerFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Khách hàng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả khách hàng</SelectItem>
                  {mockResidents.slice(0, 20).map((resident) => (
                    <SelectItem key={resident.id} value={resident.id}>
                      {resident.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Phương thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phương thức</SelectItem>
                  <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                  <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="paid">Đã thanh toán</SelectItem>
                  <SelectItem value="pending">Chờ thanh toán</SelectItem>
                  <SelectItem value="overdue">Quá hạn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Danh sách thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[120px]">Mã thanh toán</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[150px]">Cư dân</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[100px]">Phòng</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[120px]">Số tiền</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[100px]">Phương thức</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[100px]">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[100px]">Minh chứng</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[120px]">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{payment.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{payment.residentName}</div>
                          <div className="text-sm text-gray-500">Hợp đồng: {payment.contractId}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{payment.roomName}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-sm">
                        <div className="flex flex-col gap-1">
                          <span>{getAmountWithVAT(payment.amount).toLocaleString("vi-VN")} ₫</span>
                          <span className="text-xs text-gray-500">(+10% VAT)</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{payment.method || "Chưa có"}</td>
                      <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
                      <td className="py-3 px-4">
                        {payment.proofImage ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="bg-transparent">
                                <Eye className="w-4 h-4 mr-1" />
                                Xem
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Minh chứng thanh toán - {payment.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <img
                                  src={payment.proofImage || "/placeholder.svg"}
                                  alt="Payment proof"
                                  className="w-full h-auto rounded-lg border"
                                />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <Label className="text-gray-600">Cư dân</Label>
                                    <p className="font-medium">{payment.residentName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-600">Số tiền</Label>
                                    <p className="font-medium">{payment.amount.toLocaleString("vi-VN")} ₫</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-600">Phương thức</Label>
                                    <p>{payment.method}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-600">Ngày thanh toán</Label>
                                    <p>{payment.paidDate}</p>
                                  </div>
                                </div>
                                {payment.status === "pending" && (
                                  <div className="flex gap-2">
                                    <Button
                                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                      onClick={() => handleApprovePayment(payment)}
                                    >
                                      Duyệt thanh toán
                                    </Button>
                                    <Button variant="outline" className="flex-1 bg-transparent">
                                      Từ chối
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <span className="text-gray-400 text-sm">Chưa có</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="hidden sm:flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(payment)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(payment)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                              onClick={() => handleDelete(payment.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="sm:hidden">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(payment)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(payment)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(payment.id)} className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t gap-4">
                <div className="text-sm text-gray-600">
                  Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(currentPage * itemsPerPage, filteredPayments.length)} trong tổng số{" "}
                  {filteredPayments.length} thanh toán
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-300"
                  >
                    Trước
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let page
                    if (totalPages <= 5) {
                      page = i + 1
                    } else if (currentPage <= 3) {
                      page = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i
                    } else {
                      page = currentPage - 2 + i
                    }
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-black text-white" : "border-gray-300"}
                      >
                        {page}
                      </Button>
                    )
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-300"
                  >
                    Sau
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết thanh toán</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Mã thanh toán</Label>
                  <p className="font-mono">{selectedPayment.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Hợp đồng</Label>
                  <p>{selectedPayment.contractId}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Cư dân</Label>
                <p className="font-medium">{selectedPayment.residentName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phòng</Label>
                  <p>
                    {selectedPayment.roomName}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Loại thanh toán</Label>
                  <p>{selectedPayment.type}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Số tiền</Label>
                  <p className="font-bold text-lg">{selectedPayment.amount.toLocaleString("vi-VN")} ₫</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                  <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Hạn thanh toán</Label>
                  <p>{selectedPayment.dueDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Ngày thanh toán</Label>
                  <p>{selectedPayment.paidDate || "Chưa thanh toán"}</p>
                </div>
              </div>
              {selectedPayment.method && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phương thức</Label>
                  <p>{getPaymentMethodText(selectedPayment.method)}</p>
                </div>
              )}
              {selectedPayment.note && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Ghi chú</Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">{selectedPayment.note}</p>
                </div>
              )}
              {selectedPayment.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Xác nhận thanh toán</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Gửi nhắc nhở
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thanh toán</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-amount">Số tiền (VNĐ)</Label>
                <Input id="edit-amount" type="number" defaultValue={selectedPayment.amount} />
              </div>
              <div>
                <Label htmlFor="edit-status">Trạng thái</Label>
                <Select defaultValue={selectedPayment.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ thanh toán</SelectItem>
                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                    <SelectItem value="overdue">Quá hạn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-method">Hình thức thanh toán</Label>
                <Select defaultValue={selectedPayment.method || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn hình thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                    <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-note">Ghi chú</Label>
                <Textarea id="edit-note" defaultValue={selectedPayment.note || ""} placeholder="Ghi chú thêm..." />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800 flex-1">Lưu thay đổi</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Duyệt thanh toán</DialogTitle>
          </DialogHeader>
          {selectedPaymentForApproval && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Xác nhận duyệt thanh toán cho <strong>{selectedPaymentForApproval.residentName}</strong>
                </p>
                <p className="text-lg font-bold text-blue-900 mt-2">
                  {selectedPaymentForApproval.amount.toLocaleString("vi-VN")} ₫
                </p>
              </div>

              <div>
                <Label htmlFor="approval-method">Hình thức thanh toán *</Label>
                <Select defaultValue={selectedPaymentForApproval.method || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn hình thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                    <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="approval-date">Ngày thanh toán</Label>
                <Input id="approval-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>

              <div>
                <Label htmlFor="approval-note">Ghi chú</Label>
                <Textarea id="approval-note" placeholder="Ghi chú về thanh toán..." rows={3} />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)} className="flex-1">
                  Hủy
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  onClick={() => {
                    // Handle approval logic here
                    console.log("Approved payment:", selectedPaymentForApproval.id)
                    setIsApprovalDialogOpen(false)
                  }}
                >
                  Xác nhận duyệt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
