"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, LogOut, Menu } from "lucide-react"
import Link from "next/link"

interface MainLayoutProps {
  children: React.ReactNode
  userRole?: string
  currentPage?: string
  onNavigate?: (page: string) => void
}

export function MainLayout({ children, userRole = "admin" }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMobileNavigate = () => {
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }

  const getRoleLabel = (role: string) => {
    const roleLabels = {
      admin: "Quản trị viên",
    }
    return roleLabels[role.toLowerCase() as keyof typeof roleLabels] || "Quản trị viên"
  }

  const getRoleBadgeClass = (role: string) => {
    return "border-red-500 text-red-700 bg-red-50"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${isMobile ? "fixed z-50" : "relative"} ${isMobile && sidebarCollapsed ? "-translate-x-full" : "translate-x-0"} transition-transform duration-300`}
      >
        <Sidebar
          userRole={userRole}
          isCollapsed={!isMobile && sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={isMobile}
          onNavigate={handleMobileNavigate}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b-2 border-black shadow-sm">
          <div className="px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 lg:gap-4 min-w-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 inline-flex lg:hidden"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                  <div className="h-6 w-6 lg:h-8 lg:w-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-3 w-3 lg:h-5 lg:w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm lg:text-lg font-bold text-black truncate">
                        {isMobile ? "KTX Manager" : "Hệ thống quản lý ký túc xá"}
                      </h1>
                      {!isMobile && <span className="text-xs lg:text-sm text-gray-600">- Chi nhánh Hà Nội</span>}
                    </div>
                    <p className="text-xs lg:text-sm text-gray-600 truncate">
                      {isMobile ? getRoleLabel(userRole) : "123 Đường Giải Phóng, Hà Nội • Quản lý: Nguyễn Văn Quản"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
                <div className="hidden sm:block">
                  <Badge variant="outline" className={`text-xs ${getRoleBadgeClass(userRole)}`}>
                    {isMobile ? getRoleLabel(userRole).split(" ")[0] : getRoleLabel(userRole)}
                  </Badge>
                </div>
                <Link href="/">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-black text-black hover:bg-black hover:text-white bg-transparent text-xs lg:text-sm px-2 lg:px-4"
                  >
                    <LogOut className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-2" />
                    <span className="hidden lg:inline">Đăng xuất</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
