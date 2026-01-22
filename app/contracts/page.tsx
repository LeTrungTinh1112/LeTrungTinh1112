"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Calendar,
  DollarSign,
  User,
  Bed,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  RefreshCw,
  History,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ContractManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRefundStatus, setFilterRefundStatus] = useState("all")
  const [isCreateContractOpen, setIsCreateContractOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [contractType, setContractType] = useState("monthly")
  const [startDate, setStartDate] = useState("") // Added state for startDate
  const [editingContractStatus, setEditingContractStatus] = useState<{[key: string]: string}>({})
  const [editingRefundStatus, setEditingRefundStatus] = useState<{[key: string]: string}>({})

  const [renewalSearchTerm, setRenewalSearchTerm] = useState("")
  const [renewalFilterPeriod, setRenewalFilterPeriod] = useState("all")

  // Mock data
  const contracts = [
    {
      id: "CT001",
      customerCode: "001234567890",
      residentName: "Nguyễn Văn An",
      residentAvatar: "/placeholder-user.jpg",
      roomNumber: "A101",
      bedLabel: "A1",
      startDate: "2024-09-01",
      endDate: "2024-12-01",
      contractType: "monthly",
      status: "active",
      totalAmount: 1500000,
      depositAmount: 500000,
      refundStatus: "none",
      refundAmount: 0,
      createdAt: "2024-08-25",
      brokerName: "Lê Văn Broker",
      daysUntilExpiry: 90, // Placeholder for calculation
    },
    {
      id: "CT002",
      customerCode: "001234567891",
      residentName: "Trần Thị Bình",
      residentAvatar: "/placeholder-user.jpg",
      roomNumber: "A101",
      bedLabel: "A2",
      startDate: "2024-09-01",
      endDate: "2024-12-01",
      contractType: "monthly",
      status: "active",
      totalAmount: 1500000,
      depositAmount: 500000,
      refundStatus: "none",
      refundAmount: 0,
      createdAt: "2024-08-25",
      brokerName: "Lê Văn Broker",
      daysUntilExpiry: 90, // Placeholder for calculation
    },
    {
      id: "CT003",
      customerCode: "001234567892",
      residentName: "Lê Văn Cường",
      residentAvatar: "/placeholder-user.jpg",
      roomNumber: "A101",
      bedLabel: "B1",
      startDate: "2024-09-15",
      endDate: "2024-12-15",
      contractType: "monthly",
      status: "active",
      totalAmount: 1500000,
      depositAmount: 500000,
      refundStatus: "none",
      refundAmount: 0,
      createdAt: "2024-09-10",
      brokerName: "Phạm Thị Broker",
      daysUntilExpiry: 105, // Placeholder for calculation
    },
    {
      id: "CT004",
      customerCode: "001234567893",
      residentName: "Phạm Thị Dung",
      residentAvatar: "/placeholder-user.jpg",
      roomNumber: null,
      bedLabel: null,
      startDate: "2024-12-01",
      endDate: "2025-03-01",
      contractType: "manual",
      status: "pending",
      totalAmount: 2400000,
      depositAmount: 800000,
      refundStatus: "none",
      refundAmount: 0,
      createdAt: "2024-11-25",
      brokerName: "Lê Văn Broker",
      daysUntilExpiry: 150, // Placeholder for calculation
    },
    {
      id: "CT005",
      customerCode: "001234567894",
      residentName: "Hoàng Văn Em",
      residentAvatar: "/placeholder-user.jpg",
      roomNumber: "A103",
      bedLabel: "A1",
      startDate: "2024-01-15",
      endDate: "2024-11-15",
      contractType: "manual",
      status: "expired",
      totalAmount: 8000000,
      depositAmount: 800000,
      refundStatus: "requested",
      refundAmount: 800000,
      createdAt: "2024-01-10",
      brokerName: "Nguyễn Văn Broker",
      daysUntilExpiry: -30, // Placeholder for calculation
    },
  ]

  // Add daysUntilExpiry to each contract
  const processedContracts = contracts.map((contract) => {
    const endDate = new Date(contract.endDate)
    const today = new Date()
    const timeDiff = endDate.getTime() - today.getTime()
    const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return { ...contract, daysUntilExpiry }
  })

  const availableRooms = [
    { roomNumber: "A101", bedLabel: "B2", price: 500000 },
    { roomNumber: "A102", bedLabel: "A1", price: 500000 },
    { roomNumber: "A103", bedLabel: "A2", price: 800000 },
    { roomNumber: "B201", bedLabel: "A1", price: 500000 },
    { roomNumber: "B202", bedLabel: "B1", price: 500000 },
  ]

  const residents = [
    { customerCode: "001234567890", fullname: "Nguyễn Văn An", hasActiveContract: true, gender: "Nam" },
    { customerCode: "001234567891", fullname: "Trần Thị Bình", hasActiveContract: true, gender: "Nữ" },
    { customerCode: "001234567892", fullname: "Lê Văn Cường", hasActiveContract: true, gender: "Nam" },
    { customerCode: "001234567893", fullname: "Phạm Thị Dung", hasActiveContract: false, gender: "Nữ" },
    { customerCode: "001234567894", fullname: "Hoàng Văn Em", hasActiveContract: false, gender: "Nam" },
    { customerCode: "001234567895", fullname: "Vũ Thị Giang", hasActiveContract: false, gender: "Nữ" },
  ]

  const stats = {
    totalContracts: processedContracts.length,
    activeContracts: processedContracts.filter((c) => c.status === "active").length,
    pendingContracts: processedContracts.filter((c) => c.status === "pending").length,
    expiredContracts: processedContracts.filter((c) => c.status === "expired").length,
    totalRevenue: processedContracts.filter((c) => c.status === "active").reduce((sum, c) => sum + c.totalAmount, 0),
  }

  const refundContracts = processedContracts.filter(
  (c) => c.refundStatus === "requested"
  )

  const refundStats = {
  totalContracts: refundContracts.length,
  totalRefundAmount: refundContracts.reduce((sum, c) => sum + (c.refundAmount || 0), 0),
  }



  const sortedContracts = [...processedContracts].sort((a, b) => {
    return a.daysUntilExpiry - b.daysUntilExpiry
  })

  const filteredContracts = sortedContracts.filter((contract) => {
    const matchesSearch =
      contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.customerCode.includes(searchTerm) ||
      (contract.roomNumber && contract.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()))

    let matchesContractStatus = true
    if (filterStatus === "active") {
      matchesContractStatus = contract.status === "active"
    } else if (filterStatus === "expired") {
      matchesContractStatus = contract.status === "expired"
    } else if (filterStatus === "expiring_soon") {
      matchesContractStatus = contract.daysUntilExpiry <= 60 && contract.daysUntilExpiry > -1
    }

    const matchesRefundStatus =
      filterRefundStatus === "all" || contract.refundStatus === filterRefundStatus

    return matchesSearch && matchesContractStatus && matchesRefundStatus
  })

  const contractsNeedingRenewal = processedContracts.filter((contract) => {
    const matchesSearch =
      contract.id.toLowerCase().includes(renewalSearchTerm.toLowerCase()) ||
      contract.residentName.toLowerCase().includes(renewalSearchTerm.toLowerCase()) ||
      (contract.roomNumber && contract.roomNumber.toLowerCase().includes(renewalSearchTerm.toLowerCase()))

    let matchesPeriod = true
    if (renewalFilterPeriod === "expired") {
      matchesPeriod = contract.daysUntilExpiry < 0
    } else if (renewalFilterPeriod === "1month") {
      matchesPeriod = contract.daysUntilExpiry >= 0 && contract.daysUntilExpiry <= 30
    } else if (renewalFilterPeriod === "2months") {
      matchesPeriod = contract.daysUntilExpiry > 30 && contract.daysUntilExpiry <= 60
    }

    return matchesSearch && matchesPeriod && contract.status === "active"
  })

  const contractHistory = [
    {
      id: 1,
      action: "Tạo hợp đồng",
      contractId: "CT001",
      residentName: "Nguyễn Văn An",
      performedBy: "Manager 1",
      timestamp: "2024-12-29 10:30",
      details: "Tạo hợp đồng mới cho phòng A101",
    },
    {
      id: 2,
      action: "Gia hạn hợp đồng",
      contractId: "CT002",
      residentName: "Trần Thị Bình",
      performedBy: "Manager 1",
      timestamp: "2024-12-28 15:45",
      details: "Gia hạn thêm 6 tháng",
    },
    {
      id: 3,
      action: "Chỉnh sửa hợp đồng",
      contractId: "CT003",
      residentName: "Lê Văn Cường",
      performedBy: "Admin",
      timestamp: "2024-12-27 09:20",
      details: "Cập nhật giá phòng từ 1,500,000đ lên 1,600,000đ",
    },
    {
      id: 4,
      action: "Hủy hợp đồng",
      contractId: "CT005",
      residentName: "Hoàng Văn Em",
      performedBy: "Manager 2",
      timestamp: "2024-12-26 14:10",
      details: "Cư dân yêu cầu hủy hợp đồng sớm",
    },
  ]

  const residentsWithoutContracts = residents.filter((r) => !r.hasActiveContract)

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: "Hiệu lực", className: "border-green-500 text-green-700", icon: CheckCircle },
      pending: { label: "Chờ duyệt", className: "border-blue-500 text-blue-700", icon: Clock },
      
      expired: { label: "Hết hạn", className: "border-red-500 text-red-700", icon: XCircle },
      canceled: { label: "Đã hủy", className: "border-gray-500 text-gray-700", icon: XCircle },
    }

    const statusConfig = config[status as keyof typeof config] || config.pending
    const Icon = statusConfig.icon

    return (
      <Badge variant="outline" className={`${statusConfig.className} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {statusConfig.label}
      </Badge>
    )
  }

  const getRefundStatusBadge = (status: string) => {
    const config = {
      none: { label: "Không", className: "border-gray-300 text-gray-700" },
      requested: { label: "Đã yêu cầu", className: "border-blue-500 text-blue-700" },
      done: { label: "Đã hoàn", className: "border-green-500 text-green-700" },
    }

    const statusConfig = config[status as keyof typeof config] || config.none
    return (
      <Badge variant="outline" className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    )
  }

  const handleViewDetails = (contract: any) => {
    setSelectedContract(contract)
    setIsViewDetailsOpen(true)
  }

  const handleEdit = (contract: any) => {
    setSelectedContract(contract)
    setIsEditOpen(true)
  }

  const handleDelete = (contractId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa hợp đồng này?")) {
      // Handle delete logic here
      console.log("Deleting contract:", contractId)
    }
  }

  const handleContractStatusChange = (contractId: string, newStatus: string) => {
    setEditingContractStatus((prev) => ({
      ...prev,
      [contractId]: newStatus,
    }))
    // Here you would normally call an API to update the database
    console.log(`Updated contract ${contractId} status to ${newStatus}`)
  }

  const handleRefundStatusChange = (contractId: string, newStatus: string) => {
    setEditingRefundStatus((prev) => ({
      ...prev,
      [contractId]: newStatus,
    }))
    // Here you would normally call an API to update the database
    console.log(`Updated contract ${contractId} refund status to ${newStatus}`)
  }

  const calculateEndDate = (startDate: string, type: string) => {
    if (!startDate) return ""
    if (type === "monthly") {
      const start = new Date(startDate)
      const end = new Date(start)
      end.setMonth(end.getMonth() + 6) // Changed from 3 to 6 months
      return end.toISOString().split("T")[0]
    }
    return ""
  }

  const getRowColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) return "bg-red-50" // Expired
    if (daysUntilExpiry <= 30) return "bg-orange-50" // Less than 1 month
    if (daysUntilExpiry <= 60) return "bg-blue-50" // Less than 2 months
    return ""
  }

  return (
    <MainLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-black rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-black">Quản lý hợp đồng</h1>
              <p className="text-xs md:text-sm text-gray-600">Tạo và theo dõi hợp đồng thuê</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Tổng hợp đồng</CardTitle>
              <FileText className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{stats.totalContracts}</div>
              <p className="text-xs text-gray-600">Đã tạo</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Đang hiệu lực</CardTitle>
              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{stats.activeContracts}</div>
              <p className="text-xs text-gray-600">Hợp đồng active</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Chờ duyệt</CardTitle>
              <Clock className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{stats.pendingContracts}</div>
              <p className="text-xs text-gray-600">Cần xử lý</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">Hết hạn</CardTitle>
              <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">{stats.expiredContracts}</div>
              <p className="text-xs text-gray-600">Cần gia hạn</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-black">
                Cần hoàn cọc
              </CardTitle>
              <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            </CardHeader>

            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-black">
                {refundStats.totalContracts} hợp đồng
              </div>
              <p className="text-xs text-gray-600">
                Tổng tiền: {refundStats.totalRefundAmount.toLocaleString("vi-VN")}đ
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 bg-gray-100">
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-xs md:text-sm"
            >
              Danh sách
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-xs md:text-sm"
            >
              Tạo mới
            </TabsTrigger>
            <TabsTrigger
              value="renewals"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-xs md:text-sm"
            >
              Gia hạn
            </TabsTrigger>
          </TabsList>

          {/* Contract List Tab */}
          <TabsContent value="list" className="space-y-4 md:space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-black text-base md:text-lg">Danh sách hợp đồng</CardTitle>
                    <CardDescription className="text-gray-600 text-sm">
                      Quản lý tất cả hợp đồng trong hệ thống
                    </CardDescription>
                  </div>
                  <Dialog open={isCreateContractOpen} onOpenChange={setIsCreateContractOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-black hover:bg-gray-800 text-white text-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Tạo hợp đồng
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-black">Tạo hợp đồng mới</DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Tạo hợp đồng thuê phòng cho cư dân
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {/* Resident Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="resident" className="md:text-right text-black">
                            Cư dân *
                          </Label>
                          <Select>
                            <SelectTrigger className="md:col-span-3 border-gray-300 focus:border-black">
                              <SelectValue placeholder="Chọn cư dân" />
                            </SelectTrigger>
                            <SelectContent>
                              {residents
                                .filter((r) => !r.hasActiveContract)
                                .map((resident) => (
                                  <SelectItem key={resident.customerCode} value={resident.customerCode}>
                                    {resident.fullname} - {resident.customerCode}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Room & Bed Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="room" className="md:text-right text-black">
                            Phòng/Giường *
                          </Label>
                          <Select>
                            <SelectTrigger className="md:col-span-3 border-gray-300 focus:border-black">
                              <SelectValue placeholder="Chọn phòng và giường" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableRooms.map((room, index) => (
                                <SelectItem key={index} value={`${room.roomNumber}-${room.bedLabel}`}>
                                  {room.roomNumber} - Giường {room.bedLabel} ({room.price.toLocaleString("vi-VN")}đ)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Contract Type */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="contractType" className="md:text-right text-black">
                            Loại hợp đồng *
                          </Label>
                          <Select value={contractType} onValueChange={setContractType}>
                            <SelectTrigger className="md:col-span-3 border-gray-300 focus:border-black">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Tự động (6 tháng)</SelectItem>
                              <SelectItem value="manual">Tùy chọn (tự chọn ngày)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Start Date */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="startDate" className="md:text-right text-black">
                            Ngày bắt đầu *
                          </Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            className="md:col-span-3 border-gray-300 focus:border-black"
                            onChange={(e) => {
                              setStartDate(e.target.value)
                              if (contractType === "monthly") {
                                const endDateInput = document.getElementById("endDate") as HTMLInputElement
                                if (endDateInput) {
                                  endDateInput.value = calculateEndDate(e.target.value, "monthly")
                                }
                              }
                            }}
                          />
                        </div>

                        {/* End Date */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="endDate" className="md:text-right text-black">
                            Ngày kết thúc *
                          </Label>
                          <Input
                            id="endDate"
                            type="date"
                            className="md:col-span-3 border-gray-300 focus:border-black"
                            disabled={contractType === "monthly"}
                          />
                          {contractType === "monthly" && (
                            <p className="md:col-span-3 md:col-start-2 text-xs text-gray-600">
                              Tự động tính 6 tháng từ ngày bắt đầu
                            </p>
                          )}
                        </div>

                        {/* Financial Info */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="totalAmount" className="md:text-right text-black">
                            Tổng tiền *
                          </Label>
                          <Input
                            id="totalAmount"
                            type="number"
                            placeholder="1500000"
                            className="md:col-span-3 border-gray-300 focus:border-black"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="depositAmount" className="md:text-right text-black">
                            Tiền cọc *
                          </Label>
                          <Input
                            id="depositAmount"
                            type="number"
                            placeholder="500000"
                            className="md:col-span-3 border-gray-300 focus:border-black"
                          />
                        </div>

                        {/* Broker */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="broker" className="md:text-right text-black">
                            Môi giới
                          </Label>
                          <Select>
                            <SelectTrigger className="md:col-span-3 border-gray-300 focus:border-black">
                              <SelectValue placeholder="Chọn môi giới (tùy chọn)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="broker1">Lê Văn Broker</SelectItem>
                              <SelectItem value="broker2">Phạm Thị Broker</SelectItem>
                              <SelectItem value="broker3">Nguyễn Văn Broker</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Notes */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="notes" className="md:text-right text-black">
                            Ghi chú
                          </Label>
                          <Textarea
                            id="notes"
                            placeholder="Ghi chú thêm về hợp đồng..."
                            className="md:col-span-3 border-gray-300 focus:border-black"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateContractOpen(false)}
                          className="border-gray-300"
                        >
                          Hủy
                        </Button>
                        <Button className="bg-black hover:bg-gray-800 text-white">Tạo hợp đồng</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm theo mã HĐ, tên cư dân, CCCD, phòng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-black text-sm"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái HĐ</SelectItem>
                      <SelectItem value="active">Hiệu lực</SelectItem>
                      <SelectItem value="expired">Hết hạn</SelectItem>
                      <SelectItem value="expiring_soon">Sắp hết hạn (&lt;2 tháng)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterRefundStatus} onValueChange={setFilterRefundStatus}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái hoàn cọc</SelectItem>
                      <SelectItem value="none">Chưa duyệt</SelectItem>
                      <SelectItem value="requested">Được duyệt</SelectItem>
                      <SelectItem value="done">Đã hoàn cọc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black min-w-[100px]">Mã HĐ</TableHead>
                        <TableHead className="text-black min-w-[150px]">Cư dân</TableHead>
                        <TableHead className="text-black min-w-[120px]">Phòng/Giường</TableHead>
                        <TableHead className="text-black min-w-[140px]">Thời hạn</TableHead>
                        <TableHead className="text-black min-w-[120px]">Tổng tiền</TableHead>
                        <TableHead className="text-black min-w-[100px]">Trạng thái</TableHead>
                        <TableHead className="text-black min-w-[100px]">Hoàn cọc</TableHead>
                        <TableHead className="text-black min-w-[120px]">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContracts.map((contract) => (
                        <TableRow key={contract.id} className={getRowColor(contract.daysUntilExpiry)}>
                          <TableCell className="font-medium text-black text-sm">{contract.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={contract.residentAvatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gray-200 text-black text-xs">
                                  {contract.residentName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-black text-sm">{contract.residentName}</div>
                                <div className="text-xs text-gray-600">{contract.customerCode}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-black">
                            {contract.roomNumber ? (
                              <div>
                                <div className="font-medium text-sm">{contract.roomNumber}</div>
                                <div className="text-xs text-gray-600">Giường {contract.bedLabel}</div>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">Chưa phân phòng</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="text-black">{contract.startDate}</div>
                              <div className="text-gray-600 text-xs">đến {contract.endDate}</div>
                              {contract.daysUntilExpiry < 0 && (
                                <div className="text-red-600 font-semibold text-xs">Đã hết hạn</div>
                              )}
                              {contract.daysUntilExpiry >= 0 && contract.daysUntilExpiry <= 60 && (
                                <div className="text-orange-600 font-semibold text-xs">
                                  Còn {contract.daysUntilExpiry} ngày
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-black font-medium text-sm">
                            {contract.totalAmount.toLocaleString("vi-VN")}đ
                          </TableCell>
                          <TableCell>
                            <Select
                              value={editingContractStatus[contract.id] || contract.status}
                              onValueChange={(value) => handleContractStatusChange(contract.id, value)}
                            >
                              <SelectTrigger className="w-full border-gray-300 focus:border-black h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Hiệu lực</SelectItem>
                                <SelectItem value="expired">Hết hạn</SelectItem>
                                <SelectItem value="pending">Chờ duyệt</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={editingRefundStatus[contract.id] || contract.refundStatus}
                              onValueChange={(value) => handleRefundStatusChange(contract.id, value)}
                            >
                              <SelectTrigger className="w-full border-gray-300 focus:border-black h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Chưa duyệt</SelectItem>
                                <SelectItem value="requested">Được duyệt</SelectItem>
                                <SelectItem value="done">Đã hoàn cọc</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="hidden sm:flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300 bg-transparent"
                                  onClick={() => handleViewDetails(contract)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300 bg-transparent"
                                  onClick={() => handleEdit(contract)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                                  onClick={() => handleDelete(contract.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
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
                                    <DropdownMenuItem onClick={() => handleViewDetails(contract)}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      Xem chi tiết
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEdit(contract)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Chỉnh sửa
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDelete(contract.id)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Xóa
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredContracts.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Không tìm thấy hợp đồng nào phù hợp</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* New Contracts */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Hợp đồng mới được tạo
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Các hợp đồng vừa được tạo trong 7 ngày qua
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {processedContracts
                      .filter((c) => c.status === "pending")
                      .slice(0, 5)
                      .map((contract) => (
                        <div key={contract.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={contract.residentAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{contract.residentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{contract.residentName}</p>
                              <p className="text-xs text-gray-600">
                                {contract.id} - {contract.roomNumber || "Chưa phân phòng"}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(contract)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Residents Without Contracts */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Cư dân chưa có hợp đồng
                  </CardTitle>
                  <CardDescription className="text-gray-600">Danh sách cư dân cần tạo hợp đồng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {residentsWithoutContracts.slice(0, 5).map((resident) => (
                      <div
                        key={resident.customerCode}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{resident.fullname}</p>
                          <p className="text-xs text-gray-600">
                            {resident.customerCode} - {resident.gender}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                              <Plus className="h-4 w-4 mr-1" />
                              Tạo HĐ
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Tạo hợp đồng cho {resident.fullname}</DialogTitle>
                            </DialogHeader>
                            {/* Contract creation form would go here */}
                            <div className="text-center py-8 text-gray-600">Form tạo hợp đồng nhanh</div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="renewals" className="space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-black flex items-center gap-2">
                      <RefreshCw className="h-5 w-5" />
                      Hợp đồng cần gia hạn
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Quản lý các hợp đồng sắp hết hạn hoặc đã hết hạn
                    </CardDescription>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm theo mã HĐ, tên cư dân, phòng..."
                      value={renewalSearchTerm}
                      onChange={(e) => setRenewalSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-black text-sm"
                    />
                  </div>
                  <Select value={renewalFilterPeriod} onValueChange={setRenewalFilterPeriod}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="expired">Đã hết hạn</SelectItem>
                      <SelectItem value="expiring">Sắp hết hạn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <Card className="border border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-red-700">
                        {processedContracts.filter((c) => c.daysUntilExpiry < 0 && c.status === "active").length}
                      </div>
                      <div className="text-sm text-red-600">Đã hết hạn</div>
                    </CardContent>
                  </Card>
                  <Card className="border border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-orange-700">
                        {
                          processedContracts.filter(
                            (c) => c.daysUntilExpiry >= 0 && c.daysUntilExpiry <= 30 && c.status === "active",
                          ).length
                        }
                      </div>
                      <div className="text-sm text-orange-600">Sắp hết hạn</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contracts List */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black">Mã HĐ</TableHead>
                        <TableHead className="text-black">Cư dân</TableHead>
                        <TableHead className="text-black">Phòng</TableHead>
                        <TableHead className="text-black">Ngày hết hạn</TableHead>
                        <TableHead className="text-black">Còn lại</TableHead>
                        <TableHead className="text-black">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contractsNeedingRenewal.map((contract) => (
                        <TableRow key={contract.id} className={getRowColor(contract.daysUntilExpiry)}>
                          <TableCell className="font-medium">{contract.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={contract.residentAvatar || "/placeholder.svg"} />
                                <AvatarFallback>{contract.residentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{contract.residentName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{contract.roomNumber || "N/A"}</TableCell>
                          <TableCell className="text-sm">{contract.endDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                contract.daysUntilExpiry < 0
                                  ? "border-red-500 text-red-700"
                                  : contract.daysUntilExpiry <= 30
                                    ? "border-orange-500 text-orange-700"
                                    : "border-blue-500 text-blue-700"
                              }
                            >
                              {contract.daysUntilExpiry < 0
                                ? `Quá ${Math.abs(contract.daysUntilExpiry)} ngày`
                                : `${contract.daysUntilExpiry} ngày`}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Gia hạn
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleViewDetails(contract)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                                onClick={() => handleDelete(contract.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {contractsNeedingRenewal.length === 0 && (
                  <div className="text-center py-8">
                    <RefreshCw className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Không có hợp đồng nào cần gia hạn</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Lịch sử hoạt động hợp đồng
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Theo dõi tất cả các thay đổi và hoạt động liên quan đến hợp đồng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractHistory.map((history) => (
                    <div key={history.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            history.action === "Tạo hợp đồng"
                              ? "bg-green-100"
                              : history.action === "Gia hạn hợp đồng"
                                ? "bg-blue-100"
                                : history.action === "Chỉnh sửa hợp đồng"
                                  ? "bg-blue-100"
                                  : "bg-red-100"
                          }`}
                        >
                          {history.action === "Tạo hợp đồng" && <Plus className="h-5 w-5 text-green-600" />}
                          {history.action === "Gia hạn hợp đồng" && <RefreshCw className="h-5 w-5 text-blue-600" />}
                          {history.action === "Chỉnh sửa hợp đồng" && <Edit className="h-5 w-5 text-blue-600" />}
                          {history.action === "Hủy hợp đồng" && <XCircle className="h-5 w-5 text-red-600" />}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-black">{history.action}</h4>
                          <span className="text-xs text-gray-500">{history.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>{history.contractId}</strong> - {history.residentName}
                        </p>
                        <p className="text-sm text-gray-600">{history.details}</p>
                        <p className="text-xs text-gray-500 mt-1">Thực hiện bởi: {history.performedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contract Details Modal */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Chi tiết hợp đồng</DialogTitle>
            <DialogDescription className="text-gray-600">Thông tin đầy đủ về hợp đồng</DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-4 md:space-y-6">
              {/* Contract Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg gap-4">
                <div>
                  <h3 className="text-lg font-bold text-black">Hợp đồng {selectedContract.id}</h3>
                  <p className="text-gray-600 text-sm">Tạo ngày {selectedContract.createdAt}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(selectedContract.status)}
                  <div className="text-sm text-gray-600 mt-1">
                    {selectedContract.contractType === "monthly" ? "Tự động" : "Thủ công"}
                  </div>
                </div>
              </div>

              {/* Resident Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-black mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Thông tin cư dân
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedContract.residentAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-200 text-black">
                          {selectedContract.residentName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-black">{selectedContract.residentName}</div>
                        <div className="text-sm text-gray-600">{selectedContract.customerCode}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-black mb-3 flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    Thông tin phòng
                  </h4>
                  <div className="space-y-2">
                    {selectedContract.roomNumber ? (
                      <div>
                        <div className="font-medium text-black">Phòng {selectedContract.roomNumber}</div>
                        <div className="text-sm text-gray-600">Giường {selectedContract.bedLabel}</div>
                      </div>
                    ) : (
                      <div className="text-gray-500">Chưa phân phòng</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contract Details */}
              <div>
                <h4 className="font-medium text-black mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Chi tiết hợp đồng
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Ngày bắt đầu: </span>
                      <span className="text-black font-medium">{selectedContract.startDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ngày kết thúc: </span>
                      <span className="text-black font-medium">{selectedContract.endDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Loại hợp đồng: </span>
                      <span className="text-black">
                        {selectedContract.contractType === "monthly" ? "Tự động (theo tháng)" : "Thủ công"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Tổng tiền: </span>
                      <span className="text-black font-medium">
                        {selectedContract.totalAmount.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Tiền cọc: </span>
                      <span className="text-black font-medium">
                        {selectedContract.depositAmount.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Môi giới: </span>
                      <span className="text-black">{selectedContract.brokerName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refund Info */}
              {selectedContract.refundStatus !== "none" && (
                <div>
                  <h4 className="font-medium text-black mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Thông tin hoàn cọc
                  </h4>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-black">
                          Số tiền hoàn: {selectedContract.refundAmount.toLocaleString("vi-VN")}đ
                        </div>
                        <div className="text-sm text-gray-600">Trạng thái hoàn cọc</div>
                      </div>
                      {getRefundStatusBadge(selectedContract.refundStatus)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)} className="border-gray-300">
              Đóng
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white" onClick={() => handleEdit(selectedContract)}>
              Chỉnh sửa
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Chỉnh sửa hợp đồng</DialogTitle>
            <DialogDescription className="text-gray-600">Cập nhật thông tin hợp đồng</DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="grid gap-4 py-4">
              {/* Similar form fields as create contract but pre-filled */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-resident" className="md:text-right text-black">
                  Cư dân *
                </Label>
                <Input
                  id="edit-resident"
                  value={selectedContract.residentName}
                  className="md:col-span-3 border-gray-300 focus:border-black"
                  disabled
                />
              </div>
              {/* Add more editable fields as needed */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-room" className="md:text-right text-black">
                  Phòng/Giường *
                </Label>
                <Input
                  id="edit-room"
                  value={`${selectedContract.roomNumber} - Giường ${selectedContract.bedLabel}`}
                  className="md:col-span-3 border-gray-300 focus:border-black"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-startDate" className="md:text-right text-black">
                  Ngày bắt đầu *
                </Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={selectedContract.startDate}
                  className="md:col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-endDate" className="md:text-right text-black">
                  Ngày kết thúc *
                </Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={selectedContract.endDate}
                  className="md:col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-totalAmount" className="md:text-right text-black">
                  Tổng tiền *
                </Label>
                <Input
                  id="edit-totalAmount"
                  type="number"
                  value={selectedContract.totalAmount}
                  className="md:col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-depositAmount" className="md:text-right text-black">
                  Tiền cọc *
                </Label>
                <Input
                  id="edit-depositAmount"
                  type="number"
                  value={selectedContract.depositAmount}
                  className="md:col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-broker" className="md:text-right text-black">
                  Môi giới
                </Label>
                <Select defaultValue={selectedContract.brokerName}>
                  <SelectTrigger className="md:col-span-3 border-gray-300 focus:border-black">
                    <SelectValue placeholder="Chọn môi giới" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lê Văn Broker">Lê Văn Broker</SelectItem>
                    <SelectItem value="Phạm Thị Broker">Phạm Thị Broker</SelectItem>
                    <SelectItem value="Nguyễn Văn Broker">Nguyễn Văn Broker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="md:text-right text-black">
                  Ghi chú
                </Label>
                <Textarea
                  id="edit-notes"
                  placeholder="Ghi chú thêm về hợp đồng..."
                  className="md:col-span-3 border-gray-300 focus:border-black"
                  defaultValue={selectedContract.notes || ""}
                />
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditOpen(false)} className="border-gray-300">
              Hủy
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">Lưu thay đổi</Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
