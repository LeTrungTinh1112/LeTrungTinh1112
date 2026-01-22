"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  Shield,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Handshake,
  Home,
  DollarSign,
} from "lucide-react"

interface SidebarProps {
  userRole: string
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  isMobile?: boolean
  onNavigate?: () => void
}

export function Sidebar({
  userRole,
  isCollapsed = false,
  onToggleCollapse,
  isMobile = false,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    // Admin menu items
    {
      id: "admin",
      label: "Tổng quan",
      icon: BarChart3,
      roles: ["admin"],
      href: "/admin",
    },
    {
      id: "rooms",
      label: "Quản lý phòng",
      icon: Bed,
      roles: ["admin"],
      href: "/rooms",
    },
    {
      id: "residents",
      label: "Quản lý cư dân",
      icon: Users,
      roles: ["admin"],
      href: "/residents",
    },
    {
      id: "brokers",
      label: "Môi giới",
      icon: Handshake,
      roles: ["admin"],
      href: "/brokers",
    },
    {
      id: "contracts",
      label: "Hợp đồng",
      icon: FileText,
      roles: ["admin"],
      href: "/contracts",
    },
    {
      id: "payments",
      label: "Thanh toán",
      icon: CreditCard,
      roles: ["admin"],
      href: "/payments",
    },
    {
      id: "finance",
      label: "Thu Chi",
      icon: DollarSign,
      roles: ["admin", "manager"],
      href: "/finance",
    },
    {
      id: "maintenance",
      label: "Bảo trì",
      icon: Wrench,
      roles: ["admin"],
      href: "/maintenance",
    },
    {
      id: "parking",
      label: "Gửi xe",
      icon: Car,
      roles: ["admin"],
      href: "/parking",
    },
    {
      id: "reports",
      label: "Báo cáo",
      icon: Shield,
      roles: ["admin"],
      href: "/reports",
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: Settings,
      roles: ["admin"],
      href: "/settings",
    },
    // Resident menu items
    {
      id: "resident",
      label: "Trang chủ",
      icon: Home,
      roles: ["resident"],
      href: "/resident",
    },
  ]

  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed && !isMobile) return
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const visibleItems = menuItems.filter((item) => item.roles.includes(userRole.toLowerCase()))

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: "Admin", className: "border-red-500 text-red-700 bg-red-50" },
      resident: { label: "Cư dân", className: "border-purple-500 text-purple-700 bg-purple-50" },
    }

    const config = roleConfig[role.toLowerCase() as keyof typeof roleConfig] || roleConfig.admin
    return (
      <Badge variant="outline" className={`${config.className} text-xs`}>
        {config.label}
      </Badge>
    )
  }

  const isActiveRoute = (href: string) => {
    if (pathname === href) return true
    // Check if current path starts with the href (for nested routes)
    if (href !== "/admin" && href !== "/resident" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <div
      className={`bg-white border-r-2 border-black transition-all duration-300 ${
        isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64"
      } min-h-screen flex flex-col shadow-lg`}
    >
      {/* Header */}
      <div className="p-3 lg:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {(isMobile || !isCollapsed) && (
            <div className="flex items-center gap-2 lg:gap-3 min-w-0">
              <div className="h-6 w-6 lg:h-8 lg:w-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="h-3 w-3 lg:h-5 lg:w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-black text-xs lg:text-sm truncate">Quản lý KTX</h2>
                <p className="text-xs text-gray-600 truncate">Hệ thống</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="hover:bg-gray-100 p-1 lg:p-2">
            {isMobile || isCollapsed ? (
              <Menu className=" h-3 w-3 lg:h-4 lg:w-4" />
            ) : (
              <X className="h-3 w-3 lg:h-4 lg:w-4" />
            )}
          </Button>
        </div>
        {(isMobile || !isCollapsed) && <div className="mt-2 lg:mt-3">{getRoleBadge(userRole)}</div>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 lg:p-4 overflow-y-auto">
        <div className="space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = isActiveRoute(item.href)

            return (
              <div key={item.id}>
                <Link href={item.href} onClick={onNavigate}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full  justify-center text-xs lg:text-sm ${
                      isActive ? "bg-black text-white hover:bg-gray-800" : "text-black hover:bg-gray-100"
                    } ${isMobile || !isCollapsed ? "px-2 lg:px-3" : "px-2"} py-2 lg:py-2`}
                  >
                    <Icon
                      className={`h-3 w-3 lg:h-4 lg:w-4 ${isMobile || !isCollapsed ? "mr-2 lg:mr-3" : ""} flex-shrink-0`}
                    />
                    {(isMobile || !isCollapsed) && <span className="flex-1 text-left truncate">{item.label}</span>}
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2 lg:p-4 border-t border-gray-200">
        <Link href="/">
          <Button
            variant="ghost"
            className={`w-full justify-start text-black hover:bg-gray-100 text-xs lg:text-sm ${
              isMobile || !isCollapsed ? "px-2 lg:px-3" : "px-2"
            } py-2`}
          >
            <LogOut
              className={`h-3 w-3 lg:h-4 lg:w-4 ${isMobile || !isCollapsed ? "mr-2 lg:mr-3" : ""} flex-shrink-0`}
            />
            {(isMobile || !isCollapsed) && <span className="truncate">Đăng xuất</span>}
          </Button>
        </Link>
      </div>
    </div>
  )
}
