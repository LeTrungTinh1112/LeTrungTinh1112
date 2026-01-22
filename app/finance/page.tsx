"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Upload,
  Download,
  FileSpreadsheet,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function FinancePage() {
  const [totalIncome, setTotalIncome] = useState("50000000")
  const [totalExpense, setTotalExpense] = useState("30000000")
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false)
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [incomeSearchTerm, setIncomeSearchTerm] = useState("")
  const [incomeCategoryFilter, setIncomeCategoryFilter] = useState("all")
  const [expenseSearchTerm, setExpenseSearchTerm] = useState("")
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState("all")

  // Mock data for income/expense records
  const incomeRecords = [
    { id: 1, date: "2024-12-01", description: "Tiền thuê phòng tháng 12", amount: 15000000, category: "Tiền thuê" },
    { id: 2, date: "2024-12-05", description: "Phí gửi xe", amount: 2000000, category: "Dịch vụ" },
    { id: 3, date: "2024-12-10", description: "Tiền điện nước", amount: 5000000, category: "Tiện ích" },
    { id: 4, date: "2024-12-15", description: "Phí bảo trì", amount: 3000000, category: "Bảo trì" },
    { id: 5, date: "2024-12-20", description: "Tiền cọc mới", amount: 10000000, category: "Cọc" },
  ]

  const expenseRecords = [
    { id: 1, date: "2024-12-02", description: "Sửa chữa điều hòa", amount: 5000000, category: "Bảo trì" },
    { id: 2, date: "2024-12-07", description: "Tiền điện nước chung", amount: 8000000, category: "Tiện ích" },
    { id: 3, date: "2024-12-12", description: "Lương nhân viên", amount: 12000000, category: "Nhân sự" },
    { id: 4, date: "2024-12-18", description: "Vật tư vệ sinh", amount: 2000000, category: "Vật tư" },
    { id: 5, date: "2024-12-22", description: "Bảo trì hệ thống", amount: 3000000, category: "Bảo trì" },
  ]

  const filteredIncomeRecords = incomeRecords.filter((record) => {
    const matchesSearch =
      record.description.toLowerCase().includes(incomeSearchTerm.toLowerCase()) ||
      record.date.includes(incomeSearchTerm)
    const matchesCategory = incomeCategoryFilter === "all" || record.category === incomeCategoryFilter
    return matchesSearch && matchesCategory
  })

  const filteredExpenseRecords = expenseRecords.filter((record) => {
    const matchesSearch =
      record.description.toLowerCase().includes(expenseSearchTerm.toLowerCase()) ||
      record.date.includes(expenseSearchTerm)
    const matchesCategory = expenseCategoryFilter === "all" || record.category === expenseCategoryFilter
    return matchesSearch && matchesCategory
  })

  const revenue = Number.parseInt(totalIncome) - Number.parseInt(totalExpense)

  const handleDownloadTemplate = () => {
    // Create a simple CSV template
    const csvContent = "Ngày,Mô tả,Số tiền,Danh mục\n2024-12-01,Ví dụ,1000000,Danh mục"
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "mau_thu_chi.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportData = () => {
    // Export current data to CSV
    const headers = "Loại,Ngày,Mô tả,Số tiền,Danh mục\n"
    const incomeData = incomeRecords.map((r) => `Thu,${r.date},${r.description},${r.amount},${r.category}`).join("\n")
    const expenseData = expenseRecords.map((r) => `Chi,${r.date},${r.description},${r.amount},${r.category}`).join("\n")
    const csvContent = headers + incomeData + "\n" + expenseData

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `bao_cao_thu_chi_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <MainLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-black rounded-lg flex items-center justify-center">
              <DollarSign className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-black">Quản lý Thu Chi</h1>
              <p className="text-xs md:text-sm text-gray-600">Theo dõi doanh thu và chi phí</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleDownloadTemplate} className="text-sm bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Tải mẫu Excel
            </Button>
            <Button variant="outline" onClick={handleExportData} className="text-sm bg-transparent">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Tổng Thu</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={totalIncome}
                  onChange={(e) => setTotalIncome(e.target.value)}
                  className="text-2xl font-bold border-green-300 bg-white"
                />
                <span className="text-lg font-medium text-green-900">đ</span>
              </div>
              <p className="text-xs text-green-700 mt-2">Nhập tay tổng thu</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-900">Tổng Chi</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={totalExpense}
                  onChange={(e) => setTotalExpense(e.target.value)}
                  className="text-2xl font-bold border-red-300 bg-white"
                />
                <span className="text-lg font-medium text-red-900">đ</span>
              </div>
              <p className="text-xs text-red-700 mt-2">Nhập tay tổng chi</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Doanh Thu</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{revenue.toLocaleString("vi-VN")}đ</div>
              <p className="text-xs text-blue-700 mt-2">
                {revenue >= 0 ? "Lợi nhuận" : "Thua lỗ"} ({((revenue / Number.parseInt(totalIncome)) * 100).toFixed(1)}
                %)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="income" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="income" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Thu
            </TabsTrigger>
            <TabsTrigger value="expense" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <TrendingDown className="h-4 w-4 mr-2" />
              Chi
            </TabsTrigger>
          </TabsList>

          {/* Income Tab */}
          <TabsContent value="income" className="space-y-4">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-black">Danh sách Thu</CardTitle>
                    <CardDescription>Quản lý các khoản thu nhập</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isAddIncomeOpen} onOpenChange={setIsAddIncomeOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm thu
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Thêm khoản thu mới</DialogTitle>
                          <DialogDescription>Nhập thông tin khoản thu</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="income-date">Ngày</Label>
                            <Input id="income-date" type="date" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="income-desc">Mô tả</Label>
                            <Textarea id="income-desc" placeholder="Mô tả khoản thu..." />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="income-amount">Số tiền</Label>
                            <Input id="income-amount" type="number" placeholder="1000000" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="income-category">Danh mục</Label>
                            <Input id="income-category" placeholder="Tiền thuê, Dịch vụ..." />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddIncomeOpen(false)}>
                            Hủy
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700">Thêm</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <label htmlFor="income-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Import Excel
                        </span>
                      </Button>
                      <input id="income-upload" type="file" accept=".csv,.xlsx,.xls" className="hidden" />
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    placeholder="Tìm kiếm theo mô tả hoặc ngày..."
                    value={incomeSearchTerm}
                    onChange={(e) => setIncomeSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                  />
                  <select
                    value={incomeCategoryFilter}
                    onChange={(e) => setIncomeCategoryFilter(e.target.value)}
                    className="w-full sm:w-48 border border-gray-300 rounded-md p-2 text-sm"
                  >
                    <option value="all">Tất cả danh mục</option>
                    <option value="Tiền thuê">Tiền thuê</option>
                    <option value="Dịch vụ">Dịch vụ</option>
                    <option value="Tiện ích">Tiện ích</option>
                    <option value="Bảo trì">Bảo trì</option>
                    <option value="Cọc">Cọc</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead className="text-right">Số tiền</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIncomeRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.date}</TableCell>
                          <TableCell>{record.description}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                              {record.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            +{record.amount.toLocaleString("vi-VN")}đ
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 bg-transparent"
                              >
                                <Trash2 className="h-4 w-4" />
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

          {/* Expense Tab */}
          <TabsContent value="expense" className="space-y-4">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-black">Danh sách Chi</CardTitle>
                    <CardDescription>Quản lý các khoản chi phí</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm chi
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Thêm khoản chi mới</DialogTitle>
                          <DialogDescription>Nhập thông tin khoản chi</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expense-date">Ngày</Label>
                            <Input id="expense-date" type="date" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="expense-desc">Mô tả</Label>
                            <Textarea id="expense-desc" placeholder="Mô tả khoản chi..." />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="expense-amount">Số tiền</Label>
                            <Input id="expense-amount" type="number" placeholder="1000000" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="expense-category">Danh mục</Label>
                            <Input id="expense-category" placeholder="Bảo trì, Nhân sự..." />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
                            Hủy
                          </Button>
                          <Button className="bg-red-600 hover:bg-red-700">Thêm</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <label htmlFor="expense-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Import Excel
                        </span>
                      </Button>
                      <input id="expense-upload" type="file" accept=".csv,.xlsx,.xls" className="hidden" />
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    placeholder="Tìm kiếm theo mô tả hoặc ngày..."
                    value={expenseSearchTerm}
                    onChange={(e) => setExpenseSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                  />
                  <select
                    value={expenseCategoryFilter}
                    onChange={(e) => setExpenseCategoryFilter(e.target.value)}
                    className="w-full sm:w-48 border border-gray-300 rounded-md p-2 text-sm"
                  >
                    <option value="all">Tất cả danh mục</option>
                    <option value="Bảo trì">Bảo trì</option>
                    <option value="Tiện ích">Tiện ích</option>
                    <option value="Nhân sự">Nhân sự</option>
                    <option value="Vật tư">Vật tư</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead className="text-right">Số tiền</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExpenseRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.date}</TableCell>
                          <TableCell>{record.description}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">{record.category}</span>
                          </TableCell>
                          <TableCell className="text-right font-medium text-red-600">
                            -{record.amount.toLocaleString("vi-VN")}đ
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 bg-transparent"
                              >
                                <Trash2 className="h-4 w-4" />
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
        </Tabs>
      </div>
    </MainLayout>
  )
}
