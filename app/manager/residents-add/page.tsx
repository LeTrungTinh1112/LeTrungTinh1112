"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, Save, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResidentsAddPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    idNumber: "",
    dateOfBirth: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    room: "",
    building: "",
    checkInDate: "",
    contractEnd: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Redirect back to residents list
    router.push("/manager/residents-list")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <MainLayout userRole="manager" currentPage="residents-add">
      <div className="space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-black">Thêm cư dân mới</h1>
            <p className="text-sm lg:text-base text-gray-600">Nhập thông tin để thêm cư dân vào hệ thống</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/manager/residents-list")} className="w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>

        {/* Add Resident Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
              <CardDescription>Nhập thông tin cơ bản của cư dân</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Nguyễn Văn An"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="idNumber">CCCD/CMND *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    placeholder="123456789012"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="an.nguyen@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="0901234567"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-1">
                  <Label htmlFor="address">Địa chỉ thường trú</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="123 Đường ABC, Quận XYZ, TP.HCM"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ khẩn cấp</CardTitle>
              <CardDescription>Người liên hệ trong trường hợp khẩn cấp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Tên người liên hệ *</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    placeholder="Nguyễn Văn Bình"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Số điện thoại *</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    placeholder="0987654321"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin phòng ở</CardTitle>
              <CardDescription>Phân bổ phòng và thời gian ở</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="building">Tòa nhà *</Label>
                  <select
                    id="building"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.building}
                    onChange={(e) => handleInputChange("building", e.target.value)}
                    required
                  >
                    <option value="">Chọn tòa nhà</option>
                    <option value="Tòa A">Tòa A</option>
                    <option value="Tòa B">Tòa B</option>
                    <option value="Tòa C">Tòa C</option>
                    <option value="Tòa D">Tòa D</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="room">Phòng *</Label>
                  <Input
                    id="room"
                    value={formData.room}
                    onChange={(e) => handleInputChange("room", e.target.value)}
                    placeholder="A101"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkInDate">Ngày vào ở *</Label>
                  <Input
                    id="checkInDate"
                    type="date"
                    value={formData.checkInDate}
                    onChange={(e) => handleInputChange("checkInDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contractEnd">Ngày hết hạn hợp đồng *</Label>
                  <Input
                    id="contractEnd"
                    type="date"
                    value={formData.contractEnd}
                    onChange={(e) => handleInputChange("contractEnd", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Ghi chú thêm</CardTitle>
              <CardDescription>Thông tin bổ sung về cư dân</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Nhập ghi chú thêm về cư dân..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/manager/residents-list")}
              className="w-full sm:w-auto"
            >
              Hủy
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Thêm cư dân
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}
