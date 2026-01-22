"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  Bed,
  FileText,
  CreditCard,
  Wrench,
  Car,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react"

export default function Dashboard() {
  const [userRole] = useState("admin") // This would come from auth context

  // Mock data based on role
  const stats = {
    totalRooms: 120,
    occupiedBeds: 89,
    availableBeds: 31,
    pendingContracts: 5,
    monthlyRevenue: 2450000,
    pendingPayments: 12,
    maintenanceRequests: 8,
    parkingRequests: 3,
    totalResidents: 89,
    newResidentsThisMonth: 12,
    contractsExpiringSoon: 8,
    overduePayments: 3,
  }

  const recentActivities = [
    {
      id: 1,
      type: "contract",
      title: "Hợp đồng mới được tạo",
      description: "Phòng A101 - Nguyễn Văn A",
      time: "2 phút trước",
      status: "success",
    },
    {
      id: 2,
      type: "payment",
      title: "Thanh toán được xác nhận",
      description: "2,500,000đ - Tháng 12/2024",
      time: "15 phút trước",
      status: "info",
    },
    {
      id: 3,
      type: "maintenance",
      title: "Yêu cầu bảo trì mới",
      description: "Phòng B205 - Sửa điều hòa",
      time: "1 giờ trước",
      status: "warning",
    },
    {
      id: 4,
      type: "resident",
      title: "Cư dân mới đăng ký",
      description: "Trần Thị B - Sinh viên K65",
      time: "2 giờ trước",
      status: "success",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500"
      case "info":
        return "bg-blue-500"
      case "warning":
        return "bg-blue-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <MainLayout userRole={userRole} currentPage="dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Chào mừng trở lại!</h1>
          <p className="text-gray-300">Tổng quan hệ thống quản lý ký túc xá hôm nay</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Tổng phòng</CardTitle>
              <Building2 className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.totalRooms}</div>
              <p className="text-xs text-gray-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Đang hoạt động
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Giường đã thuê</CardTitle>
              <Bed className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.occupiedBeds}</div>
              <p className="text-xs text-gray-600 flex items-center mt-1">
                <span className="text-green-600">{stats.availableBeds} giường còn trống</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Doanh thu tháng</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.monthlyRevenue.toLocaleString("vi-VN")}đ</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% so với tháng trước
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Yêu cầu chờ</CardTitle>
              <AlertCircle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {stats.pendingContracts + stats.pendingPayments + stats.maintenanceRequests + stats.parkingRequests}
              </div>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                Cần xử lý
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2 border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Hoạt động gần đây
              </CardTitle>
              <CardDescription className="text-gray-600">Các thao tác mới nhất trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(activity.status)}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4 border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                Xem tất cả hoạt động
              </Button>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Công việc cần xử lý
              </CardTitle>
              <CardDescription className="text-gray-600">Danh sách các tác vụ đang chờ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <div>
                    <span className="text-sm font-medium text-black">Hợp đồng chờ duyệt</span>
                    <p className="text-xs text-gray-600">Cần xem xét và phê duyệt</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-100">
                  {stats.pendingContracts}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  <div>
                    <span className="text-sm font-medium text-black">Thanh toán chờ xác nhận</span>
                    <p className="text-xs text-gray-600">Xác nhận giao dịch</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-100">
                  {stats.pendingPayments}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <Wrench className="h-4 w-4 text-red-600" />
                  <div>
                    <span className="text-sm font-medium text-black">Yêu cầu bảo trì</span>
                    <p className="text-xs text-gray-600">Cần phân công xử lý</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-red-500 text-red-700 bg-red-100">
                  {stats.maintenanceRequests}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <Car className="h-4 w-4 text-green-600" />
                  <div>
                    <span className="text-sm font-medium text-black">Hỗ trợ gửi xe</span>
                    <p className="text-xs text-gray-600">Đăng ký mới</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-700 bg-green-100">
                  {stats.parkingRequests}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Thao tác nhanh</CardTitle>
            <CardDescription className="text-gray-600">Các chức năng thường dùng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                <Users className="h-6 w-6" />
                <span className="text-sm">Thêm cư dân</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm">Tạo hợp đồng</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">Xử lý thanh toán</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                <Wrench className="h-6 w-6" />
                <span className="text-sm">Tạo yêu cầu BT</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
