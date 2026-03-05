"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Users, Bed, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
import { mockRooms } from "@/lib/mock-data"

export default function ManagerRoomsOverviewPage() {
  const [currentPage, setCurrentPage] = useState("rooms-overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Process mock data to match component expectations
  const processedRooms = mockRooms.map((room) => {
    const occupiedBeds = room.beds ? room.beds.filter((b: any) => b.status === "occupied").length : 0
    const totalBeds = room.beds ? room.beds.length : 0
    const status = occupiedBeds === totalBeds ? "occupied" : "available"
    return {
      ...room,
      number: room.name,
      status: status,
      area: 30,
      resident: room.beds
        ?.map((b: any) => b.residentName)
        .filter(Boolean)
        .join(", "),
    }
  })

  const filteredRooms = processedRooms.filter((room) => {
    const matchesSearch =
      (room.number?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (room.type?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: "Còn trống", className: "bg-green-50 text-green-700 border-green-200" },
      occupied: { label: "Đã thuê", className: "bg-blue-50 text-blue-700 border-blue-200" },
      departure: { label: "Sắp trống", className: "bg-blue-50 text-blue-700 border-blue-200" },
      reserved: { label: "Đã đặt", className: "bg-purple-50 text-purple-700 border-purple-200" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const handleViewRoom = (room: any) => {
    setSelectedRoom(room)
    setIsViewDialogOpen(true)
  }

  const handleEditRoom = (room: any) => {
    setSelectedRoom(room)
    setIsEditDialogOpen(true)
  }

  const handleDeleteRoom = (room: any) => {
    setSelectedRoom(room)
    setIsDeleteDialogOpen(true)
  }

  return (
    <MainLayout userRole="manager" currentPage={currentPage} onNavigate={setCurrentPage}>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-black">Sơ đồ phòng</h1>
            <p className="text-gray-600 text-sm lg:text-base">Quản lý và theo dõi tình trạng phòng</p>
          </div>
          <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50 w-fit">
            Manager - Rooms
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-gray-600">Tổng phòng</p>
                  <p className="text-lg lg:text-2xl font-bold text-black">{mockRooms.length}</p>
                </div>
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-gray-600">Đã thuê</p>
                  <p className="text-lg lg:text-2xl font-bold text-black">
                    {processedRooms.filter((r) => r.status === "occupied").length}
                  </p>
                </div>
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-gray-600">Còn trống</p>
                  <p className="text-lg lg:text-2xl font-bold text-black">
                    {processedRooms.filter((r) => r.status === "available").length}
                  </p>
                </div>
                <Bed className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-gray-600">Sắp trống</p>
                  <p className="text-lg lg:text-2xl font-bold text-black">
                    {processedRooms.filter((r) => r.status === "departure").length}
                  </p>
                </div>
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm phòng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 focus:border-black"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 border-2 focus:border-black">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="available">Còn trống</SelectItem>
                  <SelectItem value="occupied">Đã thuê</SelectItem>
                  <SelectItem value="departure">Sắp trống</SelectItem>
                  <SelectItem value="reserved">Đã đặt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="border-2 border-gray-200 hover:border-black transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{room.number}</CardTitle>
                  {getStatusBadge(room.status)}
                </div>
                <CardDescription className="text-sm">{room.type}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá:</span>
                    <span className="font-medium">{room.price.toLocaleString()}đ/tháng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diện tích:</span>
                    <span className="font-medium">{room.area}m²</span>
                  </div>
                  {room.resident && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cư dân:</span>
                      <span className="font-medium text-blue-600">{room.resident}</span>
                    </div>
                  )}
                </div>

                {/* Mobile Actions */}
                <div className="flex gap-2 mt-4 sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewRoom(room)}
                    className="flex-1 border-2 hover:border-black"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Xem
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditRoom(room)}
                    className="flex-1 border-2 hover:border-black"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Sửa
                  </Button>
                </div>

                {/* Desktop Actions */}
                <div className="hidden sm:flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewRoom(room)}
                    className="flex-1 border-2 hover:border-black"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditRoom(room)}
                    className="flex-1 border-2 hover:border-black"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRoom(room)}
                    className="flex-1 border-2 hover:border-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Room Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chi tiết phòng {selectedRoom?.number}</DialogTitle>
              <DialogDescription>Thông tin chi tiết về phòng</DialogDescription>
            </DialogHeader>
            {selectedRoom && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Số phòng</Label>
                    <p className="text-sm text-gray-600">{selectedRoom.number}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Loại phòng</Label>
                    <p className="text-sm text-gray-600">{selectedRoom.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Giá thuê</Label>
                    <p className="text-sm text-gray-600">{selectedRoom.price.toLocaleString()}đ/tháng</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Diện tích</Label>
                    <p className="text-sm text-gray-600">{selectedRoom.area}m²</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Trạng thái</Label>
                    <div className="mt-1">{getStatusBadge(selectedRoom.status)}</div>
                  </div>
                  {selectedRoom.resident && (
                    <div>
                      <Label className="text-sm font-medium">Cư dân</Label>
                      <p className="text-sm text-gray-600">{selectedRoom.resident}</p>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Tiện nghi</Label>
                  <p className="text-sm text-gray-600">{selectedRoom.amenities?.join(", ") || "Không có thông tin"}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Room Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa phòng {selectedRoom?.number}</DialogTitle>
              <DialogDescription>Cập nhật thông tin phòng</DialogDescription>
            </DialogHeader>
            {selectedRoom && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="room-number">Số phòng</Label>
                    <Input
                      id="room-number"
                      defaultValue={selectedRoom.number}
                      className="border-2 focus:border-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="room-type">Loại phòng</Label>
                    <Select defaultValue={selectedRoom.type}>
                      <SelectTrigger className="border-2 focus:border-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Phòng đơn">Phòng đơn</SelectItem>
                        <SelectItem value="Phòng đôi">Phòng đôi</SelectItem>
                        <SelectItem value="Phòng VIP">Phòng VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="room-price">Giá thuê (VNĐ)</Label>
                    <Input
                      id="room-price"
                      type="number"
                      defaultValue={selectedRoom.price}
                      className="border-2 focus:border-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="room-area">Diện tích (m²)</Label>
                    <Input
                      id="room-area"
                      type="number"
                      defaultValue={selectedRoom.area}
                      className="border-2 focus:border-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="room-status">Trạng thái</Label>
                    <Select defaultValue={selectedRoom.status}>
                      <SelectTrigger className="border-2 focus:border-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Còn trống</SelectItem>
                        <SelectItem value="occupied">Đã thuê</SelectItem>
                        <SelectItem value="departure">Sắp trống</SelectItem>
                        <SelectItem value="reserved">Đã đặt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="room-amenities">Tiện nghi</Label>
                  <Textarea
                    id="room-amenities"
                    placeholder="Mô tả tiện nghi của phòng..."
                    defaultValue={selectedRoom.amenities?.join(", ")}
                    className="border-2 focus:border-black"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Hủy
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">Lưu thay đổi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Room Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Xác nhận xóa phòng</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa phòng {selectedRoom?.number}? Hành động này không thể hoàn tác.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
                Xóa phòng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
