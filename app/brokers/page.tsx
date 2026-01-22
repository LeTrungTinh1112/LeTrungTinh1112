"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, Trash2, Users, TrendingUp, UserCheck } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockBrokers, mockResidents } from "@/lib/mock-data"

export default function BrokersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isRevenueDialogOpen, setIsRevenueDialogOpen] = useState(false)
  const [selectedBroker, setSelectedBroker] = useState<any>(null)
  const [revenueAmount, setRevenueAmount] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const brokerStats = {
    totalBrokers: mockBrokers.length,
    totalReferrals: mockBrokers.reduce((sum, b) => sum + (b.totalReferrals || 0), 0),
    activeReferrals: mockBrokers.reduce((sum, b) => sum + (b.activeReferrals || 0), 0),
    totalRevenue: mockBrokers.reduce((sum, b) => sum + (b.revenue || 0), 0),
  }

  const filteredBrokers = mockBrokers.filter((broker) => {
    const matchesSearch =
      broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || broker.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const paginatedBrokers = filteredBrokers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredBrokers.length / itemsPerPage)

  const getResidentsByBroker = (brokerName: string) => {
    return mockResidents.filter((r) => r.broker === brokerName)
  }

  const getStatusBadge = (status: string) => {
    return status === "approved" ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">Được duyệt</Badge>
    ) : (
      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Chờ duyệt</Badge>
    )
  }

  const getBrokerTypeText = (type: string) => {
    const types: Record<string, string> = {
      "Cư dân": "🏠 Cư dân",
      "Quản lý": "👔 Quản lý",
      "Bên ngoài": "🌐 Bên ngoài",
    }
    return types[type] || type
  }

  return (
    <MainLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Quản lý môi giới</h1>
            <p className="text-gray-600 mt-1">Theo dõi thông tin khách hàng từ các kênh môi giới</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Thêm môi giới
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-4">
              <DialogHeader>
                <DialogTitle>Thêm môi giới mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="broker_name">Tên môi giới *</Label>
                  <Input id="broker_name" placeholder="Nguyễn Văn A, Fanpage XYZ..." />
                </div>
                <div>
                  <Label htmlFor="broker_type">Loại môi giới</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại môi giới" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cư dân">Cư dân</SelectItem>
                      <SelectItem value="Quản lý">Quản lý</SelectItem>
                      <SelectItem value="Bên ngoài">Bên ngoài</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="broker_contact">Thông tin liên hệ</Label>
                  <Input id="broker_contact" placeholder="Số điện thoại, link mạng xã hội..." />
                </div>
                <div>
                  <Label htmlFor="broker_email">Email</Label>
                  <Input id="broker_email" type="email" placeholder="email@example.com" />
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Thêm môi giới</Button>
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
                  <p className="text-xs md:text-sm font-medium text-gray-600">Tổng môi giới</p>
                  <p className="text-xl md:text-2xl font-bold text-black">{brokerStats.totalBrokers}</p>
                </div>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Tổng giới thiệu</p>
                  <p className="text-xl md:text-2xl font-bold text-black">{brokerStats.totalReferrals}</p>
                </div>
                <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Đang hoạt động</p>
                  <p className="text-xl md:text-2xl font-bold text-black">{brokerStats.activeReferrals}</p>
                </div>
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Doanh thu</p>
                  <p className="text-xl md:text-2xl font-bold text-black">
                    {(brokerStats.totalRevenue / 1000000).toFixed(1)}M
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Brokers Table */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Danh sách môi giới</CardTitle>
            <CardDescription className="text-gray-600">Thông tin các kênh môi giới và khách hàng</CardDescription>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tên, loại, liên hệ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-black"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="approved">Được duyệt</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black min-w-[180px]">Tên môi giới</TableHead>
                    <TableHead className="text-black min-w-[120px]">Loại</TableHead>
                    <TableHead className="text-black min-w-[150px]">Liên hệ</TableHead>
                    <TableHead className="text-black min-w-[100px]">Tổng GT</TableHead>
                    <TableHead className="text-black min-w-[100px]">Hoạt động</TableHead>
                    <TableHead className="text-black min-w-[100px]">Trạng thái</TableHead>
                    <TableHead className="text-black min-w-[150px]">Doanh thu</TableHead>
                    <TableHead className="text-black min-w-[150px]">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBrokers.map((broker) => (
                    <TableRow key={broker.id}>
                      <TableCell>
                        <div className="font-medium text-black text-sm">{broker.name}</div>
                        <div className="text-xs text-gray-500">{broker.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50 text-xs">
                          {getBrokerTypeText(broker.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{broker.contact}</TableCell>
                      <TableCell className="text-center font-medium text-sm">{broker.totalReferrals || 0}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 text-xs">
                          {broker.activeReferrals || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(broker.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {(broker.revenue || 0) > 0
                              ? `${(broker.revenue || 0).toLocaleString("vi-VN")}đ`
                              : "Chưa có"}
                          </span>
                          {broker.status === "approved" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent"
                              onClick={() => {
                                setSelectedBroker(broker)
                                setRevenueAmount(String(broker.revenue || 0))
                                setIsRevenueDialogOpen(true)
                              }}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                            onClick={() => {
                              setSelectedBroker(broker)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                            onClick={() => {
                              setSelectedBroker(broker)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
          </CardContent>
        </Card>
      </div>

      {/* Revenue Dialog */}
      <Dialog open={isRevenueDialogOpen} onOpenChange={setIsRevenueDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle>Cập nhật doanh thu</DialogTitle>
          </DialogHeader>
          {selectedBroker && (
            <div className="space-y-4">
              <div>
                <Label>Môi giới</Label>
                <p className="font-medium">{selectedBroker.name}</p>
              </div>
              <div>
                <Label htmlFor="revenue">Doanh thu (VNĐ)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="18000000"
                  value={revenueAmount}
                  onChange={(e) => setRevenueAmount(e.target.value)}
                />
                <p className="text-xs text-gray-600 mt-1">Nhập doanh thu thủ công khi đã duyệt</p>
              </div>
              <Button className="w-full bg-black hover:bg-gray-800 text-white">Lưu doanh thu</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết môi giới</DialogTitle>
          </DialogHeader>
          {selectedBroker && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tên môi giới</Label>
                  <p className="font-medium text-lg">{selectedBroker.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Loại</Label>
                  <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50 mt-1">
                    {getBrokerTypeText(selectedBroker.type)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                  <div className="mt-1">{getStatusBadge(selectedBroker.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Doanh thu</Label>
                  <p className="text-2xl font-bold text-black">
                    {(selectedBroker.revenue || 0) > 0
                      ? `${((selectedBroker.revenue || 0) / 1000000).toFixed(1)}M`
                      : "Chưa có"}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">Danh sách khách hàng</Label>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên cư dân</TableHead>
                        <TableHead>Phòng</TableHead>
                        <TableHead>Ngày vào</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getResidentsByBroker(selectedBroker.name).map((resident) => (
                        <TableRow key={resident.id}>
                          <TableCell className="font-medium text-sm">{resident.name}</TableCell>
                          <TableCell className="text-sm">{resident.roomId ? `A${resident.roomId}` : "N/A"}</TableCell>
                          <TableCell className="text-sm">{resident.joinDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 text-xs">
                              Đang ở
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin môi giới</DialogTitle>
          </DialogHeader>
          {selectedBroker && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit_name">Tên môi giới *</Label>
                <Input id="edit_name" defaultValue={selectedBroker.name} />
              </div>
              <div>
                <Label htmlFor="edit_type">Loại môi giới *</Label>
                <Select defaultValue={selectedBroker.type}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cư dân">Cư dân</SelectItem>
                    <SelectItem value="Quản lý">Quản lý</SelectItem>
                    <SelectItem value="Bên ngoài">Bên ngoài</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit_contact">Thông tin liên hệ</Label>
                <Input id="edit_contact" defaultValue={selectedBroker.contact} />
              </div>
              <div>
                <Label htmlFor="edit_email">Email</Label>
                <Input id="edit_email" type="email" defaultValue={selectedBroker.email} />
              </div>
              <div>
                <Label htmlFor="edit_status">Trạng thái</Label>
                <Select defaultValue={selectedBroker.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="approved">Được duyệt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-black text-white hover:bg-gray-800">Lưu thay đổi</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
