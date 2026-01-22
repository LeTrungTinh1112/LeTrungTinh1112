"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { mockRooms } from "@/lib/mock-data"

export default function ManagerRoomsManagePage() {
  const [currentPage, setCurrentPage] = useState("rooms-manage")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredRooms = mockRooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <MainLayout userRole="manager" currentPage={currentPage} onNavigate={setCurrentPage}>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-black">Quản lý phòng</h1>
            <p className="text-gray-600 text-sm lg:text-base">Thêm, sửa, xóa thông tin phòng</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50">
              Manager - Rooms
            </Badge>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm phòng
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Thêm phòng mới</DialogTitle>
                  <DialogDescription>Nhập thông tin phòng mới</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-room-number">Số phòng</Label>
                      <Input id="new-room-number" placeholder="A101" className="border-2 focus:border-black" />
                    </div>
                    <div>
                      <Label htmlFor="new-room-type">Loại phòng</Label>
                      <Select>
                        <SelectTrigger className="border-2 focus:border-black">
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Phòng đơn">Phòng đơn</SelectItem>
                          <SelectItem value="Phòng đôi">Phòng đôi</SelectItem>
                          <SelectItem value="Phòng VIP">Phòng VIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="new-room-price">Giá thuê (VNĐ)</Label>
                      <Input
                        id="new-room-price"
                        type="number"
                        placeholder="2500000"
                        className="border-2 focus:border-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-room-area">Diện tích (m²)</Label>
                      <Input
                        id="new-room-area"
                        type="number"
                        placeholder="25"
                        className="border-2 focus:border-black"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-room-amenities">Tiện nghi</Label>
                    <Textarea
                      id="new-room-amenities"
                      placeholder="Mô tả tiện nghi của phòng..."
                      className="border-2 focus:border-black"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button className="bg-black text-white hover:bg-gray-800">Thêm phòng</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-black">{mockRooms.length}</p>
                <p className="text-sm text-gray-600">Tổng phòng</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {mockRooms.filter((r) => r.status === "occupied").length}
                </p>
                <p className="text-sm text-gray-600">Đã thuê</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {mockRooms.filter((r) => r.status === "available").length}
                </p>
                <p className="text-sm text-gray-600">Còn trống</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {mockRooms.filter((r) => r.status === "departure").length}
                </p>
                <p className="text-sm text-gray-600">Sắp trống</p>
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

        {/* Rooms Table */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Danh sách phòng</CardTitle>
            <CardDescription>Quản lý tất cả phòng trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mobile View */}
            <div className="block sm:hidden space-y-4">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{room.number}</h3>
                        <p className="text-sm text-gray-600">{room.type}</p>
                      </div>
                      {getStatusBadge(room.status)}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá:</span>
                        <span className="font-medium">{room.price.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Diện tích:</span>
                        <span className="font-medium">{room.area}m²</span>
                      </div>
                      {room.resident && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cư dân:</span>
                          <span className="font-medium">{room.resident}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRoom(room)
                          setIsEditDialogOpen(true)
                        }}
                        className="flex-1 border-2 hover:border-black"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Sửa
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRoom(room)
                          setIsDeleteDialogOpen(true)
                        }}
                        className="flex-1 border-2 hover:border-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Xóa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Số phòng</TableHead>
                    <TableHead>Loại phòng</TableHead>
                    <TableHead>Giá thuê</TableHead>
                    <TableHead>Diện tích</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Cư dân</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.number}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.price.toLocaleString()}đ</TableCell>
                      <TableCell>{room.area}m²</TableCell>
                      <TableCell>{getStatusBadge(room.status)}</TableCell>
                      <TableCell>{room.resident || "-"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRoom(room)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRoom(room)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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
                    <Label htmlFor="edit-room-number">Số phòng</Label>
                    <Input
                      id="edit-room-number"
                      defaultValue={selectedRoom.number}
                      className="border-2 focus:border-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-room-type">Loại phòng</Label>
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
                    <Label htmlFor="edit-room-price">Giá thuê (VNĐ)</Label>
                    <Input
                      id="edit-room-price"
                      type="number"
                      defaultValue={selectedRoom.price}
                      className="border-2 focus:border-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-room-area">Diện tích (m²)</Label>
                    <Input
                      id="edit-room-area"
                      type="number"
                      defaultValue={selectedRoom.area}
                      className="border-2 focus:border-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-room-status">Trạng thái</Label>
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
                  <Label htmlFor="edit-room-amenities">Tiện nghi</Label>
                  <Textarea
                    id="edit-room-amenities"
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
