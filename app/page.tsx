"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Shield } from "lucide-react"
import { authenticateUser, setCurrentUser } from "@/lib/auth"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-black rounded-lg flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black">Quản lý ký túc xá</h1>
          <p className="text-gray-600 mt-2">Đăng nhập hệ thống</p>
        </div>

        {/* Login Form */}
        <Card className="border-2 border-black">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-black">Đăng nhập</CardTitle>
            <CardDescription className="text-gray-600">Nhập thông tin đăng nhập của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-black font-medium">
                  Tên đăng nhập
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  required
                  className="border-2 border-gray-300 focus:border-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black font-medium">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
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
          </CardContent>
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
