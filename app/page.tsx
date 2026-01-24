"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Shield, UserPlus } from "lucide-react"
import { authenticateUser, setCurrentUser } from "@/lib/auth"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationForm, setRegistrationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    mssv: "",
    cccd: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    branch: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const user = authenticateUser(username, password)

    if (user) {
      setCurrentUser(user)
      if (user.role === "admin") {
        window.location.href = "/admin"
      } else if (user.role === "resident") {
        window.location.href = "/resident"
      } else {
        setError("Vai trò không hợp lệ")
      }
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng")
    }

    setIsLoading(false)
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (registrationForm.password !== registrationForm.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }

    if (registrationForm.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    if (!registrationForm.fullName || !registrationForm.email || !registrationForm.mssv) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    // In a real application, this would send data to a backend API
    console.log("Registration data:", registrationForm)
    setRegistrationSuccess(true)
    setRegistrationForm({
      fullName: "",
      email: "",
      phone: "",
      mssv: "",
      cccd: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
      branch: "",
    })

    setTimeout(() => setRegistrationSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-black rounded-lg flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black">Quản lý ký túc xá</h1>
          <p className="text-gray-600 mt-2">Hệ thống quản lý hiện đại và hiệu quả</p>
        </div>

        {/* Tabs for Login and Registration */}
        <Card className="border-2 border-black">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 border-b-2 border-black rounded-none bg-white">
              <TabsTrigger value="login" className="text-black data-[state=active]:bg-black data-[state=active]:text-white rounded-none border-b-2 data-[state=active]:border-black">
                Đăng Nhập
              </TabsTrigger>
              <TabsTrigger value="register" className="text-black data-[state=active]:bg-black data-[state=active]:text-white rounded-none border-b-2 data-[state=active]:border-black">
                Đăng Ký
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="p-6">
              <div className="space-y-1 mb-4">
                <h2 className="text-2xl font-bold text-black">Đăng nhập</h2>
                <p className="text-gray-600">Nhập thông tin đăng nhập của bạn</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="login-username" className="text-black font-medium">
                    Tên đăng nhập
                  </Label>
                  <Input
                    id="login-username"
                    name="username"
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    required
                    className="border-2 border-gray-300 focus:border-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-black font-medium">
                    Mật khẩu
                  </Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    required
                    className="border-2 border-gray-300 focus:border-black"
                  />
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white" disabled={isLoading}>
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
            </TabsContent>

            {/* Registration Tab */}
            <TabsContent value="register" className="p-6">
              <div className="space-y-1 mb-4">
                <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                  <UserPlus className="h-6 w-6" />
                  Đăng ký tài khoản
                </h2>
                <p className="text-gray-600">Tạo tài khoản mới để sử dụng hệ thống</p>
              </div>
              <form onSubmit={handleRegistration} className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {registrationSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-600 text-sm">Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.</p>
                  </div>
                )}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-black font-medium">Họ tên *</Label>
                    <Input
                      placeholder="Nhập họ tên đầy đủ"
                      value={registrationForm.fullName}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, fullName: e.target.value })
                      }
                      className="border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-black font-medium">MSSV *</Label>
                    <Input
                      placeholder="Mã số sinh viên"
                      value={registrationForm.mssv}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, mssv: e.target.value })
                      }
                      className="border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-black font-medium">Email *</Label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={registrationForm.email}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, email: e.target.value })
                      }
                      className="border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-black font-medium">Điện thoại</Label>
                    <Input
                      placeholder="0912345678"
                      value={registrationForm.phone}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, phone: e.target.value })
                      }
                      className="border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-black font-medium">CCCD</Label>
                    <Input
                      placeholder="Số CCCD"
                      value={registrationForm.cccd}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, cccd: e.target.value })
                      }
                      className="border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-black font-medium">Giới tính</Label>
                    <Select value={registrationForm.gender} onValueChange={(value) => 
                      setRegistrationForm({ ...registrationForm, gender: value })
                    }>
                      <SelectTrigger className="border-2 border-gray-300 focus:border-black">
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                        <SelectItem value="Khác">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-black font-medium">Chi nhánh / Ký túc xá</Label>
                  <Select value={registrationForm.branch} onValueChange={(value) => 
                    setRegistrationForm({ ...registrationForm, branch: value })
                  }>
                    <SelectTrigger className="border-2 border-gray-300 focus:border-black">
                      <SelectValue placeholder="Chọn chi nhánh" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ktx-a">Ký túc xá A</SelectItem>
                      <SelectItem value="ktx-b">Ký túc xá B</SelectItem>
                      <SelectItem value="ktx-c">Ký túc xá C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-black font-medium">Tên đăng nhập *</Label>
                    <Input
                      placeholder="Tên đăng nhập"
                      value={registrationForm.username}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, username: e.target.value })
                      }
                      className="border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-black font-medium">Mật khẩu *</Label>
                    <Input
                      type="password"
                      placeholder="Tối thiểu 6 ký tự"
                      value={registrationForm.password}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, password: e.target.value })
                      }
                      className="border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-black font-medium">Xác nhận mật khẩu *</Label>
                  <Input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={registrationForm.confirmPassword}
                    onChange={(e) =>
                      setRegistrationForm({ ...registrationForm, confirmPassword: e.target.value })
                    }
                    className="border-2 border-gray-300 focus:border-black"
                  />
                </div>

                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white mt-4">
                  Đăng Ký
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-black flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Tài khoản test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-black font-medium">Admin:</span>
                </div>
                <span className="text-gray-600">admin / admin123</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-black font-medium">Cư dân:</span>
                </div>
                <span className="text-gray-600">resident / resident123</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
