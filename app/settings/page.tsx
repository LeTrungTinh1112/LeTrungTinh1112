"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Bell, Shield, Database, Save, Download } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    maintenance: true,
    payments: true,
    contracts: false,
  })

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    maintenanceMode: false,
    allowRegistration: true,
    requireApproval: true,
  })

  return (
    <MainLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Cài đặt hệ thống</h1>
            <p className="text-gray-600 mt-1">Quản lý cấu hình và tùy chọn hệ thống</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Lưu thay đổi
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="general">Chung</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="notifications">Thông báo</TabsTrigger>
            <TabsTrigger value="security">Bảo mật</TabsTrigger>
            <TabsTrigger value="system">Hệ thống</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Thông tin chung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dormitory_name">Tên ký túc xá</Label>
                    <Input id="dormitory_name" defaultValue="Ký túc xá Đại học ABC" />
                  </div>
                  <div>
                    <Label htmlFor="contact_phone">Số điện thoại</Label>
                    <Input id="contact_phone" defaultValue="0123-456-789" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" defaultValue="123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh" />
                </div>
                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    defaultValue="Ký túc xá hiện đại với đầy đủ tiện nghi, phục vụ sinh viên và người lao động."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email liên hệ</Label>
                    <Input id="email" type="email" defaultValue="contact@dormitory.edu.vn" />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://dormitory.edu.vn" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Cài đặt hiển thị</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Múi giờ</Label>
                    <Select defaultValue="asia_ho_chi_minh">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia_ho_chi_minh">Việt Nam (UTC+7)</SelectItem>
                        <SelectItem value="asia_bangkok">Bangkok (UTC+7)</SelectItem>
                        <SelectItem value="asia_singapore">Singapore (UTC+8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Ngôn ngữ</Label>
                    <Select defaultValue="vi">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                    <Select defaultValue="vnd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VNĐ (₫)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date_format">Định dạng ngày</Label>
                    <Select defaultValue="dd_mm_yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd_mm_yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm_dd_yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy_mm_dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Quản lý vai trò
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium">Admin</h3>
                      <p className="text-sm text-gray-600">Toàn quyền quản lý hệ thống</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800 border-red-200">Cao nhất</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium">Manager</h3>
                      <p className="text-sm text-gray-600">Quản lý vận hành hàng ngày</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Cao</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium">Broker</h3>
                      <p className="text-sm text-gray-600">Quản lý hợp đồng và thanh toán</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Trung bình</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium">Maintenance Staff</h3>
                      <p className="text-sm text-gray-600">Xử lý yêu cầu bảo trì</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Thấp</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium">Resident</h3>
                      <p className="text-sm text-gray-600">Cư dân ký túc xá</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">Cơ bản</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Cài đặt đăng ký</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow_registration">Cho phép đăng ký mới</Label>
                    <p className="text-sm text-gray-600">Người dùng có thể tự đăng ký tài khoản</p>
                  </div>
                  <Switch
                    id="allow_registration"
                    checked={systemSettings.allowRegistration}
                    onCheckedChange={(checked) =>
                      setSystemSettings((prev) => ({ ...prev, allowRegistration: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="require_approval">Yêu cầu phê duyệt</Label>
                    <p className="text-sm text-gray-600">Tài khoản mới cần được phê duyệt</p>
                  </div>
                  <Switch
                    id="require_approval"
                    checked={systemSettings.requireApproval}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, requireApproval: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Cài đặt thông báo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email_notifications">Thông báo Email</Label>
                    <p className="text-sm text-gray-600">Gửi thông báo qua email</p>
                  </div>
                  <Switch
                    id="email_notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms_notifications">Thông báo SMS</Label>
                    <p className="text-sm text-gray-600">Gửi thông báo qua tin nhắn</p>
                  </div>
                  <Switch
                    id="sms_notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push_notifications">Thông báo đẩy</Label>
                    <p className="text-sm text-gray-600">Gửi thông báo đẩy trên trình duyệt</p>
                  </div>
                  <Switch
                    id="push_notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Loại thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance_notifications">Thông báo bảo trì</Label>
                    <p className="text-sm text-gray-600">Yêu cầu bảo trì mới và cập nhật</p>
                  </div>
                  <Switch
                    id="maintenance_notifications"
                    checked={notifications.maintenance}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, maintenance: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment_notifications">Thông báo thanh toán</Label>
                    <p className="text-sm text-gray-600">Thanh toán mới và nhắc nhở</p>
                  </div>
                  <Switch
                    id="payment_notifications"
                    checked={notifications.payments}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, payments: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="contract_notifications">Thông báo hợp đồng</Label>
                    <p className="text-sm text-gray-600">Hợp đồng mới và gia hạn</p>
                  </div>
                  <Switch
                    id="contract_notifications"
                    checked={notifications.contracts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, contracts: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Cài đặt bảo mật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="password_policy">Chính sách mật khẩu</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp (6+ ký tự)</SelectItem>
                      <SelectItem value="medium">Trung bình (8+ ký tự, chữ và số)</SelectItem>
                      <SelectItem value="high">Cao (12+ ký tự, chữ, số, ký tự đặc biệt)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="session_timeout">Thời gian hết phiên (phút)</Label>
                  <Input id="session_timeout" type="number" defaultValue="60" />
                </div>
                <div>
                  <Label htmlFor="max_login_attempts">Số lần đăng nhập tối đa</Label>
                  <Input id="max_login_attempts" type="number" defaultValue="5" />
                </div>
                <div>
                  <Label htmlFor="lockout_duration">Thời gian khóa tài khoản (phút)</Label>
                  <Input id="lockout_duration" type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Xác thực hai yếu tố</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="require_2fa">Bắt buộc 2FA</Label>
                    <p className="text-sm text-gray-600">Yêu cầu xác thực hai yếu tố cho tất cả người dùng</p>
                  </div>
                  <Switch id="require_2fa" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow_sms_2fa">Cho phép SMS 2FA</Label>
                    <p className="text-sm text-gray-600">Sử dụng SMS làm phương thức 2FA</p>
                  </div>
                  <Switch id="allow_sms_2fa" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow_app_2fa">Cho phép App 2FA</Label>
                    <p className="text-sm text-gray-600">Sử dụng ứng dụng xác thực làm phương thức 2FA</p>
                  </div>
                  <Switch id="allow_app_2fa" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Cài đặt hệ thống
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto_backup">Sao lưu tự động</Label>
                    <p className="text-sm text-gray-600">Tự động sao lưu dữ liệu hàng ngày</p>
                  </div>
                  <Switch
                    id="auto_backup"
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, autoBackup: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance_mode">Chế độ bảo trì</Label>
                    <p className="text-sm text-gray-600">Tạm thời vô hiệu hóa hệ thống</p>
                  </div>
                  <Switch
                    id="maintenance_mode"
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>
                <div>
                  <Label htmlFor="backup_retention">Thời gian lưu trữ sao lưu (ngày)</Label>
                  <Input id="backup_retention" type="number" defaultValue="30" />
                </div>
                <div>
                  <Label htmlFor="log_level">Mức độ ghi log</Label>
                  <Select defaultValue="info">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Chỉ lỗi</SelectItem>
                      <SelectItem value="warn">Cảnh báo và lỗi</SelectItem>
                      <SelectItem value="info">Thông tin, cảnh báo và lỗi</SelectItem>
                      <SelectItem value="debug">Tất cả (Debug)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Thông tin hệ thống</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-600">Phiên bản</p>
                    <p className="font-mono">v2.1.0</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-600">Cơ sở dữ liệu</p>
                    <p className="font-mono">PostgreSQL 14.2</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-600">Uptime</p>
                    <p className="font-mono">15 ngày 8 giờ</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-600">Sao lưu cuối</p>
                    <p className="font-mono">2024-01-15 03:00</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Database className="w-4 h-4 mr-2" />
                    Sao lưu ngay
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Tải log hệ thống
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
