import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

// Import Inter từ Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Hệ thống quản lý ký túc xá",
  description: "Quản lý ký túc xá hiện đại và hiệu quả",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans">{children}</body>
    </html>
  )
}
