"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users, Search, Eye, Edit, Trash2, MoreHorizontal, UserCheck, UserX, Phone, Mail } from "lucide-react"

interface Resident {
  id: string
  name: string
  email: string
  phone: string
  room: string
  building: string
  checkInDate: string
  contractEnd: string
  status: "active" | "inactive" | "pending"
  emergencyContact: string
  emergencyPhone: string
  idNumber: string
}

export default function ResidentsListPage() {
  const [residents, setResidents] = useState<Resident[]>([
    {
      id: "1",
      name: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      phone: "0901234567",
      room: "A101",
      building: "Tòa A",
      checkInDate: "2024-01-15",
      contractEnd: "2024-12-15",
      status: "active",
      emergencyContact: "Nguyễn Văn Bình",
      emergencyPhone: "0987654321",
      idNumber: "123456789012",
    },
    {
      id: "2",
      name: "Trần Thị Bình",
      email: "binh.tran@email.com",
      phone: "0912345678",
      room: "B205",
      building: "Tòa B",
      checkInDate: "2024-02-01",
      contractEnd: "2025-01-31",
      status: "active",
      emergencyContact: "Trần Văn Cường",
      emergencyPhone: "0976543210",
      idNumber: "987654321098",
    },
    {
      id: "3",
      name: "Lê Minh Cường",
      email: "cuong.le@email.com",
      phone: "0923456789",
      room: "C302",
      building: "Tòa C",
      checkInDate: "2024-03-10",
      contractEnd: "2024-09-10",
      status: "inactive",
      emergencyContact: "Lê Thị Dung",
      emergencyPhone: "0965432109",
      idNumber: "456789012345",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredResidents = residents.filter(
    (resident) =>
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.phone.includes(searchTerm),
  )

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Đang ở", className: "bg-green-100 text-green-800" },
      inactive: { label: "Đã rời", className: "bg-red-100 text-red-800" },
      pending: { label: "Chờ duyệt", className: "bg-yellow-100 text-yellow-800" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const handleViewResident = (resident: Resident) => {
    setSelectedResident(resident)
    setIsViewDialogOpen(true)
  }

  const handleDeleteResident = (id: string) => {
    setResidents(residents.filter((r) => r.id !== id))
  }

  const activeResidents = residents.filter((r) => r.status === "active").length
  const inactiveResidents = residents.filter((r) => r.status === "inactive").length
  const pendingResidents = residents.filter((r) => r.status === "pending").length

  return (
    <MainLayout userRole="manager" currentPage="residents-list">
      <div className="space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-black">Danh sách cư dân</h1>
            <p className="text-sm lg:text-base text-gray-600">Quản lý thông tin tất cả cư dân trong KTX</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm cư dân..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng cư dân</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{residents.length}</div>
              <p className="text-xs text-muted-foreground">Tất cả cư dân</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đang ở</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeResidents}</div>
              <p className="text-xs text-muted-foreground">Cư dân hoạt động</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã rời</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{inactiveResidents}</div>
              <p className="text-xs text-muted-foreground">Cư dân đã rời</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
              <Users className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingResidents}</div>
              <p className="text-xs text-muted-foreground">Đang chờ duyệt</p>
            </CardContent>
          </Card>
        </div>

        {/* Residents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách cư dân ({filteredResidents.length})</CardTitle>
            <CardDescription>Thông tin chi tiết về tất cả cư dân trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Họ tên</TableHead>
                    <TableHead className="min-w-[120px]">Liên hệ</TableHead>
                    <TableHead>Phòng</TableHead>
                    <TableHead>Tòa</TableHead>
                    <TableHead>Ngày vào</TableHead>
                    <TableHead>Hết hạn</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResidents.map((resident) => (
                    <TableRow key={resident.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{resident.name}</div>
                          <div className="text-sm text-gray-500">{resident.idNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {resident.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            {resident.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{resident.room}</Badge>
                      </TableCell>
                      <TableCell>{resident.building}</TableCell>
                      <TableCell>{new Date(resident.checkInDate).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell>{new Date(resident.contractEnd).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell>{getStatusBadge(resident.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewResident(resident)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteResident(resident.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
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

        {/* View Resident Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thông tin chi tiết cư dân</DialogTitle>
              <DialogDescription>Xem thông tin đầy đủ của cư dân</DialogDescription>
            </DialogHeader>
            {selectedResident && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Họ tên</Label>
                    <p className="text-sm font-semibold">{selectedResident.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">CCCD/CMND</Label>
                    <p className="text-sm">{selectedResident.idNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="text-sm">{selectedResident.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Số điện thoại</Label>
                    <p className="text-sm">{selectedResident.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phòng</Label>
                    <p className="text-sm">{selectedResident.room}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Tòa nhà</Label>
                    <p className="text-sm">{selectedResident.building}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Ngày vào ở</Label>
                    <p className="text-sm">{new Date(selectedResident.checkInDate).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Hết hạn hợp đồng</Label>
                    <p className="text-sm">{new Date(selectedResident.contractEnd).toLocaleDateString("vi-VN")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Người liên hệ khẩn cấp</Label>
                    <p className="text-sm">{selectedResident.emergencyContact}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">SĐT khẩn cấp</Label>
                    <p className="text-sm">{selectedResident.emergencyPhone}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Trạng thái</Label>
                  <div className="mt-1">{getStatusBadge(selectedResident.status)}</div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
