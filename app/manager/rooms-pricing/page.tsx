"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calculator, Plus, Edit, Trash2, MoreHorizontal, DollarSign, TrendingUp } from "lucide-react"

interface PricingTier {
  id: string
  name: string
  roomType: string
  electricityRate: number
  waterRate: number
  internetFee: number
  cleaningFee: number
  parkingFee: number
  description: string
  isActive: boolean
}

export default function RoomsPricingPage() {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      id: "1",
      name: "Phòng đơn tiêu chuẩn",
      roomType: "single",
      electricityRate: 3500,
      waterRate: 25000,
      internetFee: 150000,
      cleaningFee: 50000,
      parkingFee: 100000,
      description: "Phòng đơn với đầy đủ tiện nghi cơ bản",
      isActive: true,
    },
    {
      id: "2",
      name: "Phòng đôi tiêu chuẩn",
      roomType: "double",
      electricityRate: 3500,
      waterRate: 25000,
      internetFee: 150000,
      cleaningFee: 50000,
      parkingFee: 100000,
      description: "Phòng đôi chia sẻ với bạn cùng phòng",
      isActive: true,
    },
    {
      id: "3",
      name: "Phòng VIP",
      roomType: "vip",
      electricityRate: 3500,
      waterRate: 25000,
      internetFee: 200000,
      cleaningFee: 100000,
      parkingFee: 150000,
      description: "Phòng cao cấp với đầy đủ tiện nghi",
      isActive: true,
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)
  const [formData, setFormData] = useState<Partial<PricingTier>>({})

  const handleCreate = () => {
    const newTier: PricingTier = {
      id: Date.now().toString(),
      name: formData.name || "",
      roomType: formData.roomType || "single",
      electricityRate: formData.electricityRate || 3500,
      waterRate: formData.waterRate || 25000,
      internetFee: formData.internetFee || 150000,
      cleaningFee: formData.cleaningFee || 50000,
      parkingFee: formData.parkingFee || 100000,
      description: formData.description || "",
      isActive: true,
    }
    setPricingTiers([...pricingTiers, newTier])
    setFormData({})
    setIsCreateDialogOpen(false)
  }

  const handleEdit = () => {
    if (!selectedTier) return
    setPricingTiers(pricingTiers.map((tier) => (tier.id === selectedTier.id ? { ...selectedTier, ...formData } : tier)))
    setSelectedTier(null)
    setFormData({})
    setIsEditDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setPricingTiers(pricingTiers.filter((tier) => tier.id !== id))
  }

  const getRoomTypeLabel = (type: string) => {
    const types = {
      single: "Phòng đơn",
      double: "Phòng đôi",
      vip: "Phòng VIP",
    }
    return types[type as keyof typeof types] || type
  }

  return (
    <MainLayout userRole="manager" currentPage="rooms-pricing">
      <div className="space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-black">Loại phòng</h1>
            <p className="text-sm lg:text-base text-gray-600">
              Quản lý loại phòng và chính sách phí dịch vụ. Giá thuê và tiền cọc sẽ được cập nhật riêng cho từng slot
              phòng.
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-2" />
                Thêm loại phòng mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Thêm loại phòng mới</DialogTitle>
                <DialogDescription>
                  Tạo loại phòng mới cho chi nhánh. Giá thuê và tiền cọc sẽ được cập nhật riêng cho từng phòng trong
                  quản lý phòng.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên loại phòng</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="VD: Phòng đơn cao cấp"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roomType">Loại phòng</Label>
                    <select
                      id="roomType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.roomType || "single"}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    >
                      <option value="single">Phòng đơn</option>
                      <option value="double">Phòng đôi</option>
                      <option value="vip">Phòng VIP</option>
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-sm">Phí dịch vụ hàng tháng</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="electricityRate">Giá điện (VND/kWh)</Label>
                      <Input
                        id="electricityRate"
                        type="number"
                        value={formData.electricityRate || ""}
                        onChange={(e) => setFormData({ ...formData, electricityRate: Number(e.target.value) })}
                        placeholder="3500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="waterRate">Giá nước (VND/m³)</Label>
                      <Input
                        id="waterRate"
                        type="number"
                        value={formData.waterRate || ""}
                        onChange={(e) => setFormData({ ...formData, waterRate: Number(e.target.value) })}
                        placeholder="25000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="internetFee">Phí internet (VND/tháng)</Label>
                      <Input
                        id="internetFee"
                        type="number"
                        value={formData.internetFee || ""}
                        onChange={(e) => setFormData({ ...formData, internetFee: Number(e.target.value) })}
                        placeholder="150000"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="cleaningFee">Phí vệ sinh (VND/tháng)</Label>
                      <Input
                        id="cleaningFee"
                        type="number"
                        value={formData.cleaningFee || ""}
                        onChange={(e) => setFormData({ ...formData, cleaningFee: Number(e.target.value) })}
                        placeholder="50000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parkingFee">Phí gửi xe (VND/tháng)</Label>
                      <Input
                        id="parkingFee"
                        type="number"
                        value={formData.parkingFee || ""}
                        onChange={(e) => setFormData({ ...formData, parkingFee: Number(e.target.value) })}
                        placeholder="100000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả chi tiết về loại phòng này..."
                    rows={3}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Lưu ý:</strong> Loại phòng chỉ quản lý các phí dịch vụ chung. Giá thuê và tiền cọc sẽ được
                    cập nhật riêng cho từng phòng trong phần "Quản lý phòng".
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreate} className="bg-black text-white hover:bg-gray-800">
                  Tạo loại phòng
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng loại phòng</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pricingTiers.length}</div>
              <p className="text-xs text-muted-foreground">Loại phòng đang hoạt động</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phí điện trung bình</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(pricingTiers.reduce((sum, t) => sum + t.electricityRate, 0) / pricingTiers.length).toLocaleString()}
                đ/kWh
              </div>
              <p className="text-xs text-muted-foreground">Giá điện trung bình</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phí nước trung bình</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(pricingTiers.reduce((sum, t) => sum + t.waterRate, 0) / pricingTiers.length).toLocaleString()}đ/m³
              </div>
              <p className="text-xs text-muted-foreground">Giá nước trung bình</p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách loại phòng</CardTitle>
            <CardDescription>
              Quản lý loại phòng và phí dịch vụ. Giá thuê và tiền cọc được cập nhật riêng cho từng phòng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Tên loại phòng</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead className="text-right">Điện (đ/kWh)</TableHead>
                    <TableHead className="text-right">Nước (đ/m³)</TableHead>
                    <TableHead className="text-right">Internet</TableHead>
                    <TableHead className="text-right">Vệ sinh</TableHead>
                    <TableHead className="text-right">Gửi xe</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingTiers.map((tier) => (
                    <TableRow key={tier.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{tier.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">{tier.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getRoomTypeLabel(tier.roomType)}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{tier.electricityRate.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{tier.waterRate.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{tier.internetFee.toLocaleString()}đ</TableCell>
                      <TableCell className="text-right">{tier.cleaningFee.toLocaleString()}đ</TableCell>
                      <TableCell className="text-right">{tier.parkingFee.toLocaleString()}đ</TableCell>
                      <TableCell>
                        <Badge variant={tier.isActive ? "default" : "secondary"}>
                          {tier.isActive ? "Hoạt động" : "Tạm dừng"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedTier(tier)
                                setFormData(tier)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(tier.id)} className="text-red-600">
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

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa loại phòng</DialogTitle>
              <DialogDescription>Cập nhật thông tin loại phòng và phí dịch vụ</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Tên loại phòng</Label>
                  <Input
                    id="edit-name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-roomType">Loại phòng</Label>
                  <select
                    id="edit-roomType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.roomType || "single"}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  >
                    <option value="single">Phòng đơn</option>
                    <option value="double">Phòng đôi</option>
                    <option value="vip">Phòng VIP</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 text-sm">Phí dịch vụ hàng tháng</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-electricityRate">Giá điện (VND/kWh)</Label>
                    <Input
                      id="edit-electricityRate"
                      type="number"
                      value={formData.electricityRate || ""}
                      onChange={(e) => setFormData({ ...formData, electricityRate: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-waterRate">Giá nước (VND/m³)</Label>
                    <Input
                      id="edit-waterRate"
                      type="number"
                      value={formData.waterRate || ""}
                      onChange={(e) => setFormData({ ...formData, waterRate: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-internetFee">Phí internet (VND/tháng)</Label>
                    <Input
                      id="edit-internetFee"
                      type="number"
                      value={formData.internetFee || ""}
                      onChange={(e) => setFormData({ ...formData, internetFee: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="edit-cleaningFee">Phí vệ sinh (VND/tháng)</Label>
                    <Input
                      id="edit-cleaningFee"
                      type="number"
                      value={formData.cleaningFee || ""}
                      onChange={(e) => setFormData({ ...formData, cleaningFee: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-parkingFee">Phí gửi xe (VND/tháng)</Label>
                    <Input
                      id="edit-parkingFee"
                      type="number"
                      value={formData.parkingFee || ""}
                      onChange={(e) => setFormData({ ...formData, parkingFee: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleEdit} className="bg-black text-white hover:bg-gray-800">
                Cập nhật
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
