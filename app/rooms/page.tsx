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
import { Bed, Plus, Edit, Trash2, Eye, Users, DollarSign, Home, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function RoomManagement() {
  const [userRole] = useState("admin")
  const [selectedDormitory, setSelectedDormitory] = useState("1")
  const [isCreateBedOpen, setIsCreateBedOpen] = useState(false)
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false)
  const [isViewRoomOpen, setIsViewRoomOpen] = useState(false)
  const [selectedRoomData, setSelectedRoomData] = useState<any>(null)
  const [isCreateRoomTypeOpen, setIsCreateRoomTypeOpen] = useState(false)
  const [isEditRoomTypeOpen, setIsEditRoomTypeOpen] = useState(false)
  const [selectedRoomType, setSelectedRoomType] = useState<any>(null)
  const [isEditBedOpen, setIsEditBedOpen] = useState(false)
  const [selectedBed, setSelectedBed] = useState<any>(null)
  const [roomSearchTerm, setRoomSearchTerm] = useState("")
  const [roomTypeFilter, setRoomTypeFilter] = useState("all")
  const [roomCapacityFilter, setRoomCapacityFilter] = useState("all")
  const [roomStatusFilter, setRoomStatusFilter] = useState("all")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Mock data
  const dormitories = [
    { id: "1", name: "Ký túc xá A", location: "Khu A - Đại học", totalRooms: 50, occupiedRooms: 37 },
    { id: "2", name: "Ký túc xá B", location: "Khu B - Đại học", totalRooms: 40, occupiedRooms: 28 },
    { id: "3", name: "Ký túc xá C", location: "Khu C - Đại học", totalRooms: 30, occupiedRooms: 24 },
  ]

  const roomTypes = [
    { id: "1", name: "Standard", description: "Phòng tiêu chuẩn 4 người", capacity: 4, price: 500000 },
    { id: "2", name: "Premium", description: "Phòng cao cấp 2 người", capacity: 2, price: 800000 },
    { id: "3", name: "VIP", description: "Phòng VIP 1 người", capacity: 1, price: 1200000 },
  ]

  const rooms = [
    {
      id: "101",
      number: "A101",
      type: "Standard",
      floor: 1,
      capacity: 4,
      occupied: 3,
      status: "active",
      price: 500000,
      beds: [
        { id: "1", label: "A1", position: "upper", status: "occupied", resident: "Nguyễn Văn A", price: 500000 },
        { id: "2", label: "A2", position: "lower", status: "occupied", resident: "Trần Thị B", price: 500000 },
        { id: "3", label: "B1", position: "upper", status: "occupied", resident: "Lê Văn C", price: 500000 },
        { id: "4", label: "B2", position: "lower", status: "available", resident: null, price: 500000 },
      ],
    },
    {
      id: "102",
      number: "A102",
      type: "Standard",
      floor: 1,
      capacity: 4,
      occupied: 4,
      status: "full",
      price: 550000,
      beds: [
        { id: "5", label: "A1", position: "upper", status: "occupied", resident: "Phạm Văn D", price: 550000 },
        { id: "6", label: "A2", position: "lower", status: "occupied", resident: "Hoàng Thị E", price: 550000 },
        { id: "7", label: "B1", position: "upper", status: "occupied", resident: "Vũ Văn F", price: 550000 },
        { id: "8", label: "B2", position: "lower", status: "occupied", resident: "Đỗ Thị G", price: 550000 },
      ],
    },
    {
      id: "103",
      number: "A103",
      type: "Premium",
      floor: 1,
      capacity: 2,
      occupied: 1,
      status: "active",
      price: 850000,
      beds: [
        { id: "9", label: "A1", position: "single", status: "occupied", resident: "Bùi Văn H", price: 850000 },
        { id: "10", label: "A2", position: "single", status: "available", resident: null, price: 850000 },
      ],
    },
    {
      id: "104",
      number: "A104",
      type: "Standard",
      floor: 1,
      capacity: 4,
      occupied: 0,
      status: "departure",
      price: 500000,
      beds: [
        { id: "11", label: "A1", position: "upper", status: "departure", resident: null, price: 500000 },
        { id: "12", label: "A2", position: "lower", status: "departure", resident: null, price: 500000 },
        { id: "13", label: "B1", position: "upper", status: "departure", resident: null, price: 500000 },
        { id: "14", label: "B2", position: "lower", status: "departure", resident: null, price: 500000 },
      ],
    },
  ]

  const handleViewRoom = (room: any) => {
    setSelectedRoomData(room)
    setIsViewRoomOpen(true)
  }

  const handleEditRoom = (room: any) => {
    setSelectedRoomData(room)
    setIsEditRoomOpen(true)
  }

  const handleDeleteRoom = (roomId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
      console.log("Deleting room:", roomId)
    }
  }

  const handleEditRoomType = (roomType: any) => {
    setSelectedRoomType(roomType)
    setIsEditRoomTypeOpen(true)
  }

  const handleDeleteRoomType = (roomTypeId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa loại phòng này?")) {
      console.log("Deleting room type:", roomTypeId)
    }
  }

  const handleEditBed = (room: any, bed: any) => {
    setSelectedRoomData(room)
    setSelectedBed(bed)
    setIsEditBedOpen(true)
  }

  const handleAddBed = (room: any) => {
  setSelectedRoomData(room)
  setIsCreateBedOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "departure":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: "Hoạt động", className: "border-green-500 text-green-700" },
      full: { label: "Đầy", className: "border-red-500 text-red-700" },
      departure: { label: "Sắp trống", className: "border-blue-500 text-blue-700" },
      closed: { label: "Đóng", className: "border-gray-500 text-gray-700" },
    }

    const statusConfig = config[status as keyof typeof config] || config.active
    return (
      <Badge variant="outline" className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    )
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(roomSearchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(roomSearchTerm.toLowerCase())
    const matchesType = roomTypeFilter === "all" || room.type === roomTypeFilter
    const matchesCapacity =
      roomCapacityFilter === "all" || room.capacity.toString() === roomCapacityFilter
    const matchesStatus = roomStatusFilter === "all" || room.status === roomStatusFilter
    return matchesSearch && matchesType && matchesCapacity && matchesStatus
  })

  const paginatedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage)

  return (
    <MainLayout userRole={userRole}>
      <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-black">Quản lý phòng & giường</h1>
            <p className="text-sm lg:text-base text-gray-600">Sơ đồ trực quan và quản lý trạng thái</p>
          </div>
          <Select value={selectedDormitory} onValueChange={setSelectedDormitory}>
            <SelectTrigger className="w-full lg:w-48 border-gray-300 focus:border-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dormitories.map((dorm) => (
                <SelectItem key={dorm.id} value={dorm.id}>
                  {dorm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-black">Tổng phòng</CardTitle>
              <Home className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg lg:text-2xl font-bold text-black">
                {dormitories.find((d) => d.id === selectedDormitory)?.totalRooms}
              </div>
              <p className="text-xs text-gray-600">Phòng trong KTX</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-black">Có người</CardTitle>
              <Users className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg lg:text-2xl font-bold text-black">
                {dormitories.find((d) => d.id === selectedDormitory)?.occupiedRooms}
              </div>
              <p className="text-xs text-gray-600">
                {Math.round(
                  ((dormitories.find((d) => d.id === selectedDormitory)?.occupiedRooms || 0) /
                    (dormitories.find((d) => d.id === selectedDormitory)?.totalRooms || 1)) *
                    100,
                )}
                % lấp đầy
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-black">Tổng giường</CardTitle>
              <Bed className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg lg:text-2xl font-bold text-black">
                {rooms.reduce((acc, room) => acc + room.capacity, 0)}
              </div>
              <p className="text-xs text-gray-600">{rooms.reduce((acc, room) => acc + room.occupied, 0)} có người</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-black">Doanh thu</CardTitle>
              <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-sm lg:text-2xl font-bold text-black">
                {rooms
                  .reduce((acc, room) => {
                    const occupiedBeds = room.beds.filter((b: any) => b.status === "occupied")
                    return acc + occupiedBeds.reduce((sum: number, bed: any) => sum + bed.price, 0)
                  }, 0)
                  .toLocaleString("vi-VN")}
                đ
              </div>
              <p className="text-xs text-gray-600">Tháng này</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 text-xs lg:text-sm">
            <TabsTrigger value="list" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Danh sách
            </TabsTrigger>
            <TabsTrigger value="types" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Loại phòng
            </TabsTrigger>
          </TabsList>

          {/* Room List Tab - Updated with pagination */}
          <TabsContent value="list" className="space-y-4 lg:space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Danh sách phòng</CardTitle>
                <CardDescription className="text-gray-600">
                  Quản lý thông tin chi tiết các phòng và giường
                </CardDescription>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="relative">
                    <input
                      placeholder="Tìm kiếm theo tên hoặc loại phòng..."
                      value={roomSearchTerm}
                      onChange={(e) => setRoomSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                      <SelectTrigger className="border-gray-300 focus:border-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả loại phòng</SelectItem>
                        {roomTypes.map((type) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={roomCapacityFilter} onValueChange={setRoomCapacityFilter}>
                      <SelectTrigger className="border-gray-300 focus:border-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả sức chứa</SelectItem>
                        <SelectItem value="1">1 người</SelectItem>
                        <SelectItem value="2">2 người</SelectItem>
                        <SelectItem value="4">4 người</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={roomStatusFilter} onValueChange={setRoomStatusFilter}>
                      <SelectTrigger className="border-gray-300 focus:border-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="full">Đầy</SelectItem>
                        <SelectItem value="departure">Sắp trống</SelectItem>
                        <SelectItem value="closed">Đóng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {paginatedRooms.map((room) => (
                    <Card key={room.id} className="border border-gray-200">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <CardTitle className="text-lg text-black">Phòng {room.number}</CardTitle>
                            <CardDescription className="text-gray-600">
                              {room.type} - Tầng {room.floor} - {room.capacity} giường
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(room.status)}
                            <div className="hidden sm:flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 bg-transparent"
                                onClick={() => handleViewRoom(room)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 bg-transparent"
                                onClick={() => handleEditRoom(room)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                                onClick={() => handleDeleteRoom(room.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                                onClick={() => handleAddBed(room)}
                                title="Thêm giường"
                              >
                                <Plus className="h-4 w-4" />
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
                                  <DropdownMenuItem onClick={() => handleViewRoom(room)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Chi tiết
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditRoom(room)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Sửa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteRoom(room.id)} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Xóa
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium text-black">Vị trí giường trong phòng:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {room.beds.map((bed: any) => (
                              <Card
                                key={bed.id}
                                className={`border-2 cursor-pointer transition-all hover:shadow-md ${
                                  bed.status === "available"
                                    ? "border-green-500 bg-green-50"
                                    : bed.status === "occupied"
                                      ? "border-red-500 bg-red-50"
                                      : "border-blue-500 bg-blue-50"
                                }`}
                                onClick={() => handleEditBed(room, bed)}
                              >
                                <CardContent className="p-3">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <div className="font-medium text-black">Giường {bed.label}</div>
                                      <div className="text-xs text-gray-600 capitalize">{bed.position}</div>
                                    </div>
                                    <div
                                      className={`w-3 h-3 rounded-full ${
                                        bed.status === "available"
                                          ? "bg-green-500"
                                          : bed.status === "occupied"
                                            ? "bg-red-500"
                                            : "bg-blue-500"
                                      }`}
                                    ></div>
                                  </div>
                                  <div className="text-sm font-medium text-black mb-1">
                                    {bed.price.toLocaleString("vi-VN")}đ/tháng
                                  </div>
                                  {bed.resident ? (
                                    <div className="text-xs text-black truncate" title={bed.resident}>
                                      {bed.resident}
                                    </div>
                                  ) : (
                                    <div className="text-xs text-gray-500">
                                      {bed.status === "available" ? "Trống" : "Sắp trống"}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t gap-4">
                    <div className="text-sm text-gray-600">
                      Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
                      {Math.min(currentPage * itemsPerPage, rooms.length)} trong tổng số {rooms.length} phòng
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
          </TabsContent>

          <TabsContent value="types" className="space-y-4 lg:space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-black">Loại phòng</CardTitle>
                    <CardDescription className="text-gray-600">Cấu hình các loại phòng và sức chứa</CardDescription>
                  </div>
                  <Dialog open={isCreateRoomTypeOpen} onOpenChange={setIsCreateRoomTypeOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-black hover:bg-gray-800 text-white text-sm lg:text-base">
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm loại phòng
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-md lg:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-black">Tạo loại phòng mới</DialogTitle>
                        <DialogDescription className="text-gray-600">Thêm loại phòng vào hệ thống</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="typeName" className="text-right text-black text-sm">
                            Tên loại
                          </Label>
                          <Input
                            id="typeName"
                            placeholder="VD: Deluxe"
                            className="col-span-3 border-gray-300 focus:border-black"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="typeDescription" className="text-right text-black text-sm">
                            Mô tả
                          </Label>
                          <Input
                            id="typeDescription"
                            placeholder="Phòng deluxe 3 người"
                            className="col-span-3 border-gray-300 focus:border-black"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="typeCapacity" className="text-right text-black text-sm">
                            Sức chứa
                          </Label>
                          <Input
                            id="typeCapacity"
                            type="number"
                            placeholder="3"
                            className="col-span-3 border-gray-300 focus:border-black"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateRoomTypeOpen(false)}
                          className="border-gray-300"
                        >
                          Hủy
                        </Button>
                        <Button className="bg-black hover:bg-gray-800 text-white">Tạo loại phòng</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  {roomTypes.map((type) => (
                    <Card key={type.id} className="border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-base lg:text-lg text-black">{type.name}</CardTitle>
                        <CardDescription className="text-gray-600 text-sm">{type.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-black">Sức chứa:</span>
                            <span className="text-sm font-medium text-black">{type.capacity} người</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 bg-transparent flex-1"
                            onClick={() => handleEditRoomType(type)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent flex-1"
                            onClick={() => handleDeleteRoomType(type.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isViewRoomOpen} onOpenChange={setIsViewRoomOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Chi tiết phòng {selectedRoomData?.number}</DialogTitle>
            <DialogDescription className="text-gray-600">Thông tin đầy đủ về phòng và giường</DialogDescription>
          </DialogHeader>
          {selectedRoomData && (
            <div className="space-y-6">
              {/* Room Basic Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Số phòng: </span>
                    <span className="text-black font-medium">{selectedRoomData.number}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Loại phòng: </span>
                    <span className="text-black">{selectedRoomData.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tầng: </span>
                    <span className="text-black">Tầng {selectedRoomData.floor}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Sức chứa: </span>
                    <span className="text-black font-medium">{selectedRoomData.capacity} người</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Đã thuê: </span>
                    <span className="text-black">
                      {selectedRoomData.occupied}/{selectedRoomData.capacity}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Trạng thái: </span>
                    {getStatusBadge(selectedRoomData.status)}
                  </div>
                  <div>
                    <span className="text-gray-600">Giá phòng: </span>
                    <span className="text-black font-medium">{selectedRoomData.price.toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </div>

              {/* Beds Info */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-black mb-3">Thông tin giường</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {selectedRoomData.beds.map((bed: any) => (
                    <div key={bed.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-black">Giường {bed.label}</span>
                        <Badge
                          variant="outline"
                          className={
                            bed.status === "available"
                              ? "border-green-500 text-green-700"
                              : bed.status === "occupied"
                                ? "border-red-500 text-red-700"
                                : "border-yellow-500 text-yellow-700"
                          }
                        >
                          {bed.status === "available" ? "Trống" : bed.status === "occupied" ? "Có người" : "Sắp trống"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 capitalize mb-1">Vị trí: {bed.position}</div>
                      <div className="text-sm font-medium text-black">Giá: {bed.price.toLocaleString("vi-VN")}đ</div>
                      {bed.resident && <div className="text-sm text-black mt-1">Cư dân: {bed.resident}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewRoomOpen(false)} className="border-gray-300">
              Đóng
            </Button>
            <Button
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => {
                setIsViewRoomOpen(false)
                handleEditRoom(selectedRoomData)
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditRoomOpen} onOpenChange={setIsEditRoomOpen}>
        <DialogContent className="w-[95vw] max-w-md lg:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-black">Chỉnh sửa phòng {selectedRoomData?.number}</DialogTitle>
            <DialogDescription className="text-gray-600">Cập nhật thông tin phòng</DialogDescription>
          </DialogHeader>
          {selectedRoomData && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editRoomNumber" className="text-right text-black text-sm">
                  Số phòng
                </Label>
                <Input
                  id="editRoomNumber"
                  defaultValue={selectedRoomData.number}
                  className="col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editRoomType" className="text-right text-black text-sm">
                  Loại phòng
                </Label>
                <Select defaultValue={selectedRoomData.type}>
                  <SelectTrigger className="col-span-3 border-gray-300 focus:border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name} - {type.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editFloor" className="text-right text-black text-sm">
                  Tầng
                </Label>
                <Input
                  id="editFloor"
                  type="number"
                  defaultValue={selectedRoomData.floor}
                  className="col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editRoomPrice" className="text-right text-black text-sm">
                  Giá phòng
                </Label>
                <Input
                  id="editRoomPrice"
                  type="number"
                  defaultValue={selectedRoomData.price}
                  className="col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editStatus" className="text-right text-black text-sm">
                  Trạng thái
                </Label>
                <Select defaultValue={selectedRoomData.status}>
                  <SelectTrigger className="col-span-3 border-gray-300 focus:border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="departure">Sắp trống</SelectItem>
                    <SelectItem value="closed">Đóng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditRoomOpen(false)} className="border-gray-300">
              Hủy
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">Lưu thay đổi</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditRoomTypeOpen} onOpenChange={setIsEditRoomTypeOpen}>
        <DialogContent className="w-[95vw] max-w-md lg:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-black">Chỉnh sửa loại phòng</DialogTitle>
            <DialogDescription className="text-gray-600">Cập nhật thông tin loại phòng</DialogDescription>
          </DialogHeader>
          {selectedRoomType && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTypeName" className="text-right text-black text-sm">
                  Tên loại
                </Label>
                <Input
                  id="editTypeName"
                  defaultValue={selectedRoomType.name}
                  className="col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTypeDescription" className="text-right text-black text-sm">
                  Mô tả
                </Label>
                <Input
                  id="editTypeDescription"
                  defaultValue={selectedRoomType.description}
                  className="col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTypeCapacity" className="text-right text-black text-sm">
                  Sức chứa
                </Label>
                <Input
                  id="editTypeCapacity"
                  type="number"
                  defaultValue={selectedRoomType.capacity}
                  className="col-span-3 border-gray-300 focus:border-black"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditRoomTypeOpen(false)} className="border-gray-300">
              Hủy
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">Lưu thay đổi</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Bed Modal */}
      <Dialog open={isCreateBedOpen} onOpenChange={setIsCreateBedOpen}>
        <DialogContent className="w-[95vw] max-w-md lg:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-black">Thêm giường mới</DialogTitle>
            <DialogDescription className="text-gray-600">
              Thêm giường vào phòng{" "}
              <span className="font-medium text-black">
                {selectedRoomData?.number}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bedLabel" className="text-right text-black text-sm">
                Nhãn giường
              </Label>
              <Input id="bedLabel" placeholder="VD: C1" className="col-span-3 border-gray-300 focus:border-black" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bedPosition" className="text-right text-black text-sm">
                Vị trí
              </Label>
              <Select>
                <SelectTrigger className="col-span-3 border-gray-300 focus:border-black">
                  <SelectValue placeholder="Chọn vị trí" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upper">Giường trên</SelectItem>
                  <SelectItem value="lower">Giường dưới</SelectItem>
                  <SelectItem value="single">Giường đơn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateBedOpen(false)} className="border-gray-300">
              Hủy
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">Thêm giường</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditBedOpen} onOpenChange={setIsEditBedOpen}>
        <DialogContent className="w-[95vw] max-w-md lg:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-black">
              Chỉnh sửa giường {selectedBed?.label} - Phòng {selectedRoomData?.number}
            </DialogTitle>
            <DialogDescription className="text-gray-600">Cập nhật thông tin và giá giường</DialogDescription>
          </DialogHeader>
          {selectedBed && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bedLabel" className="text-right text-black text-sm">
                  Nhãn giường
                </Label>
                <Input
                  id="bedLabel"
                  defaultValue={selectedBed.label}
                  className="col-span-3 border-gray-300 focus:border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bedPosition" className="text-right text-black text-sm">
                  Vị trí
                </Label>
                <Select defaultValue={selectedBed.position}>
                  <SelectTrigger className="col-span-3 border-gray-300 focus:border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upper">Giường trên</SelectItem>
                    <SelectItem value="lower">Giường dưới</SelectItem>
                    <SelectItem value="single">Giường đơn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bedPrice" className="text-right text-black text-sm">
                  Giá giường
                </Label>
                <Input
                  id="bedPrice"
                  type="number"
                  defaultValue={selectedBed.price}
                  className="col-span-3 border-gray-300 focus:border-black"
                  placeholder="500000"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bedStatus" className="text-right text-black text-sm">
                  Trạng thái
                </Label>
                <Select defaultValue={selectedBed.status}>
                  <SelectTrigger className="col-span-3 border-gray-300 focus:border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Trống</SelectItem>
                    <SelectItem value="occupied">Có người</SelectItem>
                    <SelectItem value="departure">Sắp trống</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditBedOpen(false)} className="border-gray-300">
              Hủy
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">Lưu thay đổi</Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
