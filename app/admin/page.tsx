"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Settings, Plus, Edit, Trash2, Eye, BarChart3, DollarSign, AlertTriangle, Building2 } from "lucide-react"

export default function AdminDashboard() {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isManageRolesOpen, setIsManageRolesOpen] = useState(false)
  const [isBranchAssignmentOpen, setIsBranchAssignmentOpen] = useState(false)
  const [selectedUserForBranch, setSelectedUserForBranch] = useState<any>(null)
  const [userSearchTerm, setUserSearchTerm] = useState("")
  const [userRoleFilter, setUserRoleFilter] = useState("all")
  const [roleSearchTerm, setRoleSearchTerm] = useState("")
  const [branchSearchTerm, setBranchSearchTerm] = useState("")
  const [branchFilter, setBranchFilter] = useState("all")

  const users = [
    {
      id: 1,
      username: "admin1",
      fullName: "Nguyễn Văn Admin",
      email: "admin@ktx.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-12-29 10:30",
    },
    {
      id: 2,
      username: "manager1",
      fullName: "Trần Thị Manager",
      email: "manager1@ktx.com",
      role: "Manager",
      status: "active",
      lastLogin: "2024-12-29 09:15",
    },
  ]

  const roles = [
    { id: 1, name: "Admin", description: "Toàn quyền quản lý hệ thống", userCount: 2 },
    { id: 2, name: "Manager", description: "Quản lý chi nhánh", userCount: 5 },
    { id: 5, name: "Resident", description: "Cư dân", userCount: 150 },
  ]

  const permissions = [
    { module: "User Management", permissions: ["create_user", "edit_user", "delete_user", "view_user"] },
    { module: "Room Management", permissions: ["create_room", "edit_room", "delete_room", "view_room"] },
    {
      module: "Contract Management",
      permissions: ["create_contract", "edit_contract", "delete_contract", "view_contract"],
    },
    { module: "Payment Management", permissions: ["create_payment", "edit_payment", "delete_payment", "view_payment"] },
  ]

  const systemStats = {
    totalUsers: 177,
    activeUsers: 165,
    totalDormitories: 3,
    totalRooms: 120,
    occupancyRate: 74.2,
    monthlyRevenue: 2450000,
    pendingApprovals: 15,
    systemUptime: "99.8%",
  }

  const branches = [
    { id: "1", name: "Chi nhánh Hà Nội", location: "123 Đường Giải Phóng, Hà Nội", totalRooms: 50 },
    { id: "2", name: "Chi nhánh TP.HCM", location: "456 Đường Lê Lợi, TP.HCM", totalRooms: 40 },
    { id: "3", name: "Chi nhánh Đà Nẵng", location: "789 Đường Trần Phú, Đà Nẵng", totalRooms: 30 },
  ]

  const [userBranchPermissions, setUserBranchPermissions] = useState([
    {
      userId: 2,
      username: "manager1",
      branches: ["1"],
      permissions: {
        rooms: { view: true, create: true, edit: true, delete: false },
        residents: { view: true, create: true, edit: true, delete: false },
        contracts: { view: true, create: true, edit: true, delete: false },
        payments: { view: true, create: false, edit: true, delete: false },
      },
    },
  ])

  const handleAssignBranch = (user: any) => {
    setSelectedUserForBranch(user)
    setIsBranchAssignmentOpen(true)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
    const matchesRole = userRoleFilter === "all" || user.role === userRoleFilter
    return matchesSearch && matchesRole
  })

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(roleSearchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(roleSearchTerm.toLowerCase())
  )

  const filteredBranchAssignments = userBranchPermissions.filter((assignment) => {
    const user = users.find((u) => u.id === assignment.userId)
    const matchesSearch =
      (user?.username.toLowerCase().includes(branchSearchTerm.toLowerCase()) ||
        user?.fullName.toLowerCase().includes(branchSearchTerm.toLowerCase())) ??
      false
    const matchesBranch =
      branchFilter === "all" || assignment.branches.includes(branchFilter)
    return matchesSearch && matchesBranch
  })

  return (
    <MainLayout userRole="admin">
      <div className="space-y-4 lg:space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-black">Tổng người dùng</CardTitle>
              <Users className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg lg:text-2xl font-bold text-black">{systemStats.totalUsers}</div>
              <p className="text-xs text-gray-600">{systemStats.activeUsers} đang hoạt động</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-black">Tỷ lệ lấp đầy</CardTitle>
              <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg lg:text-2xl font-bold text-black">{systemStats.occupancyRate}%</div>
              <p className="text-xs text-gray-600">{systemStats.totalRooms} phòng tổng cộng</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-black">Doanh thu tháng</CardTitle>
              <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-sm lg:text-2xl font-bold text-black">
                {systemStats.monthlyRevenue.toLocaleString("vi-VN")}đ
              </div>
              <p className="text-xs text-gray-600">+8.2% so với tháng trước</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-black">Chờ duyệt</CardTitle>
              <AlertTriangle className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg lg:text-2xl font-bold text-black">{systemStats.pendingApprovals}</div>
              <p className="text-xs text-gray-600">Yêu cầu cần xử lý</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4 lg:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 min-w-max">
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-black data-[state=active]:text-white text-xs lg:text-sm"
              >
                Quản lý người dùng
              </TabsTrigger>
              <TabsTrigger
                value="roles"
                className="data-[state=active]:bg-black data-[state=active]:text-white text-xs lg:text-sm"
              >
                Vai trò & Quyền
              </TabsTrigger>
              <TabsTrigger
                value="branches"
                className="data-[state=active]:bg-black data-[state=active]:text-white text-xs lg:text-sm"
              >
                Phân công chi nhánh
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="users" className="space-y-4 lg:space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-black text-sm lg:text-base">Danh sách người dùng</CardTitle>
                    <CardDescription className="text-gray-600 text-xs lg:text-sm">
                      Quản lý tài khoản và phân quyền người dùng
                    </CardDescription>
                  </div>
                  <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-black hover:bg-gray-800 text-white text-xs lg:text-sm">
                        <Plus className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                        Thêm người dùng
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] mx-4">
                      <DialogHeader>
                        <DialogTitle className="text-black">Tạo người dùng mới</DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Nhập thông tin để tạo tài khoản mới
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right text-black text-xs lg:text-sm">
                            Tên đăng nhập
                          </Label>
                          <Input
                            id="username"
                            className="col-span-3 border-gray-300 focus:border-black text-xs lg:text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="fullname" className="text-right text-black text-xs lg:text-sm">
                            Họ tên
                          </Label>
                          <Input
                            id="fullname"
                            className="col-span-3 border-gray-300 focus:border-black text-xs lg:text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right text-black text-xs lg:text-sm">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            className="col-span-3 border-gray-300 focus:border-black text-xs lg:text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right text-black text-xs lg:text-sm">
                            Vai trò
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3 border-gray-300 focus:border-black text-xs lg:text-sm">
                              <SelectValue placeholder="Chọn vai trò" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="resident">Resident</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateUserOpen(false)}
                          className="border-gray-300 text-xs lg:text-sm"
                        >
                          Hủy
                        </Button>
                        <Button className="bg-black hover:bg-gray-800 text-white text-xs lg:text-sm">
                          Tạo người dùng
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      placeholder="Tìm theo tên, email, tên đăng nhập..."
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      className="pl-10 w-full border border-gray-300 rounded-md p-2 text-xs lg:text-sm"
                    />
                  </div>
                  <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black text-xs lg:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả vai trò</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Resident">Resident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black text-xs lg:text-sm">Tên đăng nhập</TableHead>
                        <TableHead className="text-black text-xs lg:text-sm">Họ tên</TableHead>
                        <TableHead className="text-black text-xs lg:text-sm hidden lg:table-cell">Email</TableHead>
                        <TableHead className="text-black text-xs lg:text-sm">Vai trò</TableHead>
                        <TableHead className="text-black text-xs lg:text-sm">Trạng thái</TableHead>
                        <TableHead className="text-black text-xs lg:text-sm hidden lg:table-cell">
                          Đăng nhập cuối
                        </TableHead>
                        <TableHead className="text-black text-xs lg:text-sm">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium text-black text-xs lg:text-sm">{user.username}</TableCell>
                          <TableCell className="text-black text-xs lg:text-sm">{user.fullName}</TableCell>
                          <TableCell className="text-gray-600 text-xs lg:text-sm hidden lg:table-cell">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                user.role === "Admin"
                                  ? "border-red-500 text-red-700"
                                  : user.role === "Manager"
                                    ? "border-blue-500 text-blue-700"
                                    : "border-purple-500 text-purple-700"
                              }`}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                user.status === "active"
                                  ? "border-green-500 text-green-700"
                                  : "border-gray-500 text-gray-700"
                              }`}
                            >
                              {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600 text-xs lg:text-sm hidden lg:table-cell">
                            {user.lastLogin}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 lg:gap-2">
                              <Button variant="outline" size="sm" className="border-gray-300 bg-transparent p-1 lg:p-2">
                                <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-300 bg-transparent p-1 lg:p-2">
                                <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
                              </Button>
                              {user.role === "Manager" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent p-1 lg:p-2"
                                  onClick={() => handleAssignBranch(user)}
                                  title="Phân công chi nhánh"
                                >
                                  <Building2 className="h-3 w-3 lg:h-4 lg:w-4" />
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent p-1 lg:p-2"
                              >
                                <Trash2 className="h-3 w-3 lg:h-4 lg:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-black text-sm lg:text-base">Vai trò hệ thống</CardTitle>
                      <CardDescription className="text-gray-600 text-xs lg:text-sm">
                        Quản lý các vai trò người dùng
                      </CardDescription>
                    </div>
                    <Dialog open={isManageRolesOpen} onOpenChange={setIsManageRolesOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-black text-black hover:bg-black hover:text-white bg-transparent text-xs lg:text-sm"
                        >
                          <Plus className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                          Thêm vai trò
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="mx-4">
                        <DialogHeader>
                          <DialogTitle className="text-black">Tạo vai trò mới</DialogTitle>
                          <DialogDescription className="text-gray-600">
                            Định nghĩa vai trò và quyền hạn mới
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rolename" className="text-right text-black text-xs lg:text-sm">
                              Tên vai trò
                            </Label>
                            <Input
                              id="rolename"
                              className="col-span-3 border-gray-300 focus:border-black text-xs lg:text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right text-black text-xs lg:text-sm">
                              Mô tả
                            </Label>
                            <Input
                              id="description"
                              className="col-span-3 border-gray-300 focus:border-black text-xs lg:text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsManageRolesOpen(false)}
                            className="border-gray-300 text-xs lg:text-sm"
                          >
                            Hủy
                          </Button>
                          <Button className="bg-black hover:bg-gray-800 text-white text-xs lg:text-sm">
                            Tạo vai trò
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <input
                      placeholder="Tìm kiếm vai trò..."
                      value={roleSearchTerm}
                      onChange={(e) => setRoleSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-xs lg:text-sm"
                    />
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    {filteredRoles.map((role) => (
                      <div
                        key={role.id}
                        className="flex items-center justify-between p-2 lg:p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-black text-xs lg:text-sm">{role.name}</h4>
                          <p className="text-xs lg:text-sm text-gray-600">{role.description}</p>
                          <p className="text-xs text-gray-500">{role.userCount} người dùng</p>
                        </div>
                        <div className="flex items-center gap-1 lg:gap-2">
                          <Button variant="outline" size="sm" className="border-gray-300 bg-transparent p-1 lg:p-2">
                            <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent p-1 lg:p-2"
                          >
                            <Trash2 className="h-3 w-3 lg:h-4 lg:w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black text-sm lg:text-base">Phân quyền chi tiết</CardTitle>
                  <CardDescription className="text-gray-600 text-xs lg:text-sm">
                    Cấu hình quyền hạn cho từng vai trò
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 lg:space-y-6">
                    {permissions.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="space-y-2 lg:space-y-3">
                        <h4 className="font-medium text-black border-b border-gray-200 pb-2 text-xs lg:text-sm">
                          {module.module}
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                          {module.permissions.map((permission, permIndex) => (
                            <div key={permIndex} className="flex items-center justify-between">
                              <Label htmlFor={`${moduleIndex}-${permIndex}`} className="text-xs lg:text-sm text-black">
                                {permission.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </Label>
                              <Switch id={`${moduleIndex}-${permIndex}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branches" className="space-y-4 lg:space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Phân công quản lý chi nhánh</CardTitle>
                    <CardDescription className="text-sm">
                      Gán chi nhánh và quyền hạn cho các tài khoản quản lý
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsBranchAssignmentOpen(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      placeholder="Tìm kiếm tài khoản quản lý..."
                      value={branchSearchTerm}
                      onChange={(e) => setBranchSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-xs lg:text-sm"
                    />
                  </div>
                  <Select value={branchFilter} onValueChange={setBranchFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black text-xs lg:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả chi nhánh</SelectItem>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-6">
                  {filteredBranchAssignments.map((userPerm) => {
                    const user = users.find((u) => u.id === userPerm.userId)
                    if (!user) return null

                    return (
                      <Card key={userPerm.userId} className="border border-gray-200">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-base">{user.fullName}</CardTitle>
                              <CardDescription className="text-sm">
                                @{user.username} - {user.role}
                              </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleAssignBranch(user)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Chi nhánh được quản lý:</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {userPerm.branches.map((branchId) => {
                                const branch = branches.find((b) => b.id === branchId)
                                return branch ? (
                                  <Badge key={branchId} variant="outline" className="border-blue-500 text-blue-700">
                                    {branch.name}
                                  </Badge>
                                ) : null
                              })}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Quyền hạn chức năng:</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              {Object.entries(userPerm.permissions).map(([module, perms]: [string, any]) => (
                                <div key={module} className="border rounded-lg p-3">
                                  <h4 className="font-medium text-sm mb-2 capitalize">{module}</h4>
                                  <div className="space-y-1 text-xs">
                                    {Object.entries(perms).map(([action, enabled]: [string, any]) => (
                                      <div key={action} className="flex items-center justify-between">
                                        <span className="text-gray-600 capitalize">{action}</span>
                                        <Badge
                                          variant="outline"
                                          className={
                                            enabled
                                              ? "border-green-500 text-green-700"
                                              : "border-gray-300 text-gray-500"
                                          }
                                        >
                                          {enabled ? "Có" : "Không"}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4 lg:space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-black text-sm lg:text-base">Cấu hình hệ thống</CardTitle>
                <CardDescription className="text-gray-600 text-xs lg:text-sm">
                  Thiết lập các thông số hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 lg:py-12">
                  <Settings className="h-12 w-12 lg:h-16 lg:w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-xs lg:text-sm">
                    Chức năng cấu hình hệ thống sẽ được phát triển tiếp theo
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 lg:space-y-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-black text-sm lg:text-base">Báo cáo hệ thống</CardTitle>
                <CardDescription className="text-gray-600 text-xs lg:text-sm">
                  Thống kê và báo cáo tổng quan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 lg:py-12">
                  <BarChart3 className="h-12 w-12 lg:h-16 lg:w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-xs lg:text-sm">Chức năng báo cáo sẽ được phát triển tiếp theo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isBranchAssignmentOpen} onOpenChange={setIsBranchAssignmentOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Phân công chi nhánh và quyền hạn</DialogTitle>
            <DialogDescription>
              Gán chi nhánh và cấu hình quyền hạn cho {selectedUserForBranch?.fullName}
            </DialogDescription>
          </DialogHeader>
          {selectedUserForBranch && (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Chọn chi nhánh quản lý:</Label>
                <div className="grid grid-cols-1 gap-3">
                  {branches.map((branch) => (
                    <div key={branch.id} className="flex items-center space-x-3 border rounded-lg p-3">
                      <Checkbox id={`branch-${branch.id}`} />
                      <div className="flex-1">
                        <label
                          htmlFor={`branch-${branch.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {branch.name}
                        </label>
                        <p className="text-xs text-gray-600">
                          {branch.location} - {branch.totalRooms} phòng
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Cấu hình quyền hạn chức năng:</Label>
                <div className="space-y-4">
                  {["Rooms", "Residents", "Contracts", "Payments", "Maintenance", "Reports"].map((module) => (
                    <Card key={module} className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">{module}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {["View", "Create", "Edit", "Delete"].map((action) => (
                            <div key={action} className="flex items-center justify-between">
                              <Label htmlFor={`${module}-${action}`} className="text-xs">
                                {action}
                              </Label>
                              <Switch id={`${module}-${action}`} />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsBranchAssignmentOpen(false)}>
                  Hủy
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white">Lưu phân công</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
