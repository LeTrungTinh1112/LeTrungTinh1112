"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Download, TrendingUp, Users, Home, DollarSign, Wrench } from "lucide-react"

// Mock data for reports
const occupancyData = [
  { month: "T1", occupied: 85, vacant: 15 },
  { month: "T2", occupied: 88, vacant: 12 },
  { month: "T3", occupied: 92, vacant: 8 },
  { month: "T4", occupied: 89, vacant: 11 },
  { month: "T5", occupied: 94, vacant: 6 },
  { month: "T6", occupied: 91, vacant: 9 },
]

const revenueData = [
  { month: "T1", revenue: 450000000, expenses: 120000000 },
  { month: "T2", revenue: 480000000, expenses: 125000000 },
  { month: "T3", revenue: 520000000, expenses: 130000000 },
  { month: "T4", revenue: 495000000, expenses: 128000000 },
  { month: "T5", revenue: 540000000, expenses: 135000000 },
  { month: "T6", revenue: 525000000, expenses: 132000000 },
]

const maintenanceData = [
  { category: "Điện", count: 45, cost: 25000000 },
  { category: "Nước", count: 32, cost: 18000000 },
  { category: "Nội thất", count: 28, cost: 35000000 },
  { category: "Vệ sinh", count: 15, cost: 8000000 },
  { category: "An ninh", count: 8, cost: 12000000 },
]

const roomTypeData = [
  { name: "Phòng đơn", value: 120, color: "#3B82F6" },
  { name: "Phòng đôi", value: 80, color: "#10B981" },
  { name: "Phòng VIP", value: 25, color: "#F59E0B" },
  { name: "Phòng gia đình", value: 15, color: "#EF4444" },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedReport, setSelectedReport] = useState("overview")
  const [maintenanceCategoryFilter, setMaintenanceCategoryFilter] = useState("all")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const filteredMaintenanceData =
    maintenanceCategoryFilter === "all"
      ? maintenanceData
      : maintenanceData.filter((item) => item.category === maintenanceCategoryFilter)

  return (
    <MainLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Báo cáo thống kê</h1>
            <p className="text-gray-600 mt-1">Phân tích dữ liệu và xu hướng hoạt động</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 tháng qua</SelectItem>
                <SelectItem value="3months">3 tháng qua</SelectItem>
                <SelectItem value="6months">6 tháng qua</SelectItem>
                <SelectItem value="1year">1 năm qua</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Tổng doanh thu</p>
                  <p className="text-lg md:text-2xl font-bold text-green-600">3.2 tỷ</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </p>
                </div>
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Tỷ lệ lấp đầy</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-600">91%</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3.2%
                  </p>
                </div>
                <Home className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Tổng cư dân</p>
                  <p className="text-lg md:text-2xl font-bold text-purple-600">1,248</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.8%
                  </p>
                </div>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Yêu cầu bảo trì</p>
                  <p className="text-lg md:text-2xl font-bold text-orange-600">128</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.3%
                  </p>
                </div>
                <Wrench className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Tabs */}
        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="financial">Tài chính</TabsTrigger>
            <TabsTrigger value="occupancy">Lấp đầy</TabsTrigger>
            <TabsTrigger value="maintenance">Bảo trì</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Tỷ lệ lấp đầy theo tháng</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={occupancyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="occupied" fill="#3B82F6" name="Đã thuê" />
                      <Bar dataKey="vacant" fill="#EF4444" name="Trống" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Phân bố loại phòng</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={roomTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                      >
                        {roomTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Doanh thu và chi phí</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                    <Tooltip formatter={(value: number) => [formatCurrency(value), undefined]} />
                    <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Doanh thu" />
                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Chi phí" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Doanh thu trung bình/tháng</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">501M ₫</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">+8.5%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Chi phí trung bình/tháng</p>
                    <p className="text-2xl font-bold text-red-600 mt-2">128M ₫</p>
                    <Badge className="bg-red-100 text-red-800 border-red-200 mt-2">+3.2%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Lợi nhuận trung bình/tháng</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">373M ₫</p>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 mt-2">+12.1%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Xu hướng lấp đầy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={occupancyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Line type="monotone" dataKey="occupied" stroke="#10B981" strokeWidth={3} name="Tỷ lệ lấp đầy" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Thống kê phòng trống</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Tầng 1</span>
                    <Badge className="bg-red-100 text-red-800 border-red-200">3 phòng trống</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Tầng 2</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">1 phòng trống</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Tầng 3</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Đầy</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Tầng 4</span>
                    <Badge className="bg-red-100 text-red-800 border-red-200">2 phòng trống</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Yêu cầu bảo trì theo danh mục</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={maintenanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" name="Số lượng" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Chi phí bảo trì theo danh mục</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={maintenanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Bar dataKey="cost" fill="#EF4444" name="Chi phí" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Chi tiết bảo trì</CardTitle>
                <div className="flex items-center gap-3 mt-4">
                  <Select value={maintenanceCategoryFilter} onValueChange={setMaintenanceCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      <SelectItem value="Điện">Điện</SelectItem>
                      <SelectItem value="Nước">Nước</SelectItem>
                      <SelectItem value="Nội thất">Nội thất</SelectItem>
                      <SelectItem value="Vệ sinh">Vệ sinh</SelectItem>
                      <SelectItem value="An ninh">An ninh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Danh mục</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Số lượng</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Chi phí</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Chi phí TB</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMaintenanceData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium">{item.category}</td>
                          <td className="py-3 px-4">{item.count}</td>
                          <td className="py-3 px-4">{formatCurrency(item.cost)}</td>
                          <td className="py-3 px-4">{formatCurrency(item.cost / item.count)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
