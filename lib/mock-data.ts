// Mock user accounts for testing different roles
export const mockUsers = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Nguyễn Văn Admin",
    email: "admin@dormitory.com",
    phone: "0901234567",
    gender: "Nam",
  },
  {
    id: "2",
    username: "manager",
    password: "manager123",
    role: "manager",
    name: "Trần Thị Manager",
    email: "manager@dormitory.com",
    phone: "0901234568",
    gender: "Nữ",
  },
  {
    id: "5",
    username: "resident",
    password: "resident123",
    role: "resident",
    name: "Hoàng Thị Resident",
    email: "resident@dormitory.com",
    phone: "0901234571",
    gender: "Nữ",
  },
]

export const mockRooms = Array.from({ length: 50 }, (_, i) => {
  const floor = Math.floor(i / 10) + 1
  const roomNum = (i % 10) + 1
  const roomId = `${floor}0${roomNum}`
  const types = ["Standard", "VIP", "Deluxe"]
  const type = types[i % 3]
  const basePrice = type === "Standard" ? 500000 : type === "VIP" ? 800000 : 1200000
  const priceVariation = Math.floor(Math.random() * 200000)

  return {
    id: roomId,
    name: `A${roomId}`,
    floor,
    type,
    price: basePrice + priceVariation,
    capacity: type === "Standard" ? 4 : type === "VIP" ? 2 : 1,
    beds: Array.from({ length: type === "Standard" ? 4 : type === "VIP" ? 2 : 1 }, (_, j) => ({
      id: `${roomId}-${j + 1}`,
      number: j + 1,
      status: Math.random() > 0.5 ? "occupied" : "available",
      residentName: Math.random() > 0.5 ? `Cư dân ${i}-${j}` : null,
    })),
  }
})

export const mockResidents = Array.from({ length: 100 }, (_, i) => {
  const genders = ["Nam", "Nữ"]
  const gender = genders[i % 2]
  const firstNames =
    gender === "Nam"
      ? ["An", "Bình", "Cường", "Dũng", "Em", "Phong", "Giang", "Hải"]
      : ["Anh", "Bích", "Chi", "Dung", "Hoa", "Lan", "Mai", "Nga"]
  const lastNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng"]
  const brokers = ["Nguyễn Văn Broker", "Fanpage ChunhieHome", "Tiktok: Trung Tinh", "Lê Thị Broker", "Không có"]

  return {
    id: `${i + 1}`,
    name: `${lastNames[i % lastNames.length]} ${firstNames[i % firstNames.length]} ${String.fromCharCode(65 + (i % 26))}`,
    cccd: `00123456${String(7890 + i).padStart(4, "0")}`,
    studentId: `SV${String(i + 1).padStart(3, "0")}`,
    email: `resident${i + 1}@email.com`,
    phone: `090${String(1234567 + i).slice(0, 7)}`,
    dateOfBirth: `${1995 + (i % 10)}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    address: `${i + 100} Đường ${String.fromCharCode(65 + (i % 26))}, Quận ${(i % 12) + 1}, TP.HCM`,
    emergencyContact: `Người thân ${i + 1} - 098765${String(4321 + i).slice(0, 4)}`,
    roomId: i < 80 ? `${Math.floor(i / 4) + 101}` : null,
    bedId: i < 80 ? `${(i % 4) + 1}` : null,
    status: i < 80 ? "active" : i < 90 ? "pending" : "expired",
    avatar: gender === "Nam" ? "/male-student-studying.png" : "/diverse-female-student.png",
    gender,
    broker: brokers[i % brokers.length],
    joinDate: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  }
})

export const mockContracts = Array.from({ length: 80 }, (_, i) => {
  const resident = mockResidents[i]
  const startDate = new Date(2024, i % 12, 1)
  const monthsDuration = i % 3 === 0 ? 6 : i % 3 === 1 ? 3 : 12
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + monthsDuration)

  const now = new Date()
  const daysUntilExpiry = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  let status = "active"
  if (daysUntilExpiry < 0) status = "expired"
  else if (i >= 75) status = "pending"

  return {
    id: `CT${String(i + 1).padStart(3, "0")}`,
    residentId: resident.id,
    residentName: resident.name,
    residentGender: resident.gender,
    roomId: resident.roomId,
    roomName: resident.roomId ? `Phòng A${resident.roomId}` : null,
    bedId: resident.bedId,
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    monthlyRent: 1500000 + (i % 5) * 100000,
    deposit: 3000000,
    status,
    type: i % 2 === 0 ? "monthly" : "manual",
    createdAt: startDate.toISOString().split("T")[0],
    daysUntilExpiry,
    brokerName: resident.broker,
  }
})

export const mockPayments = Array.from({ length: 200 }, (_, i) => {
  const contract = mockContracts[i % mockContracts.length]
  const month = i % 12
  const statuses = ["paid", "pending", "overdue"]
  const status = statuses[i % 3]
  const methods = ["Tiền mặt", "Chuyển khoản"]
  const branches = ["Chi nhánh Hà Nội", "Chi nhánh TP.HCM", "Chi nhánh Đà Nẵng"]

  return {
    id: `PAY${String(i + 1).padStart(3, "0")}`,
    contractId: contract.id,
    residentName: contract.residentName,
    residentId: contract.residentId,
    roomName: contract.roomName,
    amount: contract.monthlyRent,
    type: "rent",
    dueDate: `2024-${String(month + 1).padStart(2, "0")}-05`,
    paidDate:
      status === "paid" ? `2024-${String(month + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}` : null,
    status,
    method: status === "paid" ? methods[i % 2] : null,
    branch: branches[i % 3],
    proofImage: status === "paid" ? `/payment-proof-${i + 1}.jpg` : null,
  }
})

export const mockMaintenanceRequests = Array.from({ length: 50 }, (_, i) => {
  const priorities = ["low", "medium", "high"]
  const statuses = ["pending", "in_progress", "completed"]
  const workers = [
    { name: "Phạm Văn Thợ A", phone: "0912345678" },
    { name: "Lê Thị Thợ B", phone: "0923456789" },
    { name: "Trần Văn Thợ C", phone: "0934567890" },
  ]
  const worker = workers[i % workers.length]
  const status = statuses[i % 3]

  return {
    id: `MNT${String(i + 1).padStart(3, "0")}`,
    title: `Sửa chữa ${["điều hòa", "đèn", "vòi nước", "cửa", "ổ khóa"][i % 5]}`,
    description: `Mô tả chi tiết vấn đề ${i + 1}`,
    roomId: mockRooms[i % 20].id,
    roomName: mockRooms[i % 20].name,
    reportedBy: mockResidents[i % 50].name,
    reportedById: mockResidents[i % 50].id,
    assignedTo: status !== "pending" ? worker.name : null,
    assignedToPhone: status !== "pending" ? worker.phone : null,
    priority: priorities[i % 3],
    status,
    cost: status === "completed" ? ((i % 5) + 1) * 100000 : 0,
    createdAt: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    updatedAt: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 5).padStart(2, "0")}`,
  }
})

export const mockParkingRequests = Array.from({ length: 60 }, (_, i) => {
  const statuses = ["approved", "pending", "rejected"]
  const vehicleTypes = ["Xe máy", "Xe đạp", "Xe điện"]

  return {
    id: `PRK${String(i + 1).padStart(3, "0")}`,
    residentName: mockResidents[i % 50].name,
    residentId: mockResidents[i % 50].id,
    room: mockResidents[i % 50].roomId ? `A${mockResidents[i % 50].roomId}` : "N/A",
    vehicleType: vehicleTypes[i % 3],
    licensePlate:
      i % 3 === 1 ? "N/A" : `29${String.fromCharCode(65 + (i % 26))}${(i % 2) + 1}-${String(12345 + i).slice(0, 5)}`,
    brand: ["Honda Wave", "Yamaha Exciter", "Giant", "VinFast"][i % 4],
    color: ["Đỏ", "Xanh", "Đen", "Trắng"][i % 4],
    requestDate: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    status: statuses[i % 3],
    parkingSpot: statuses[i % 3] === "approved" ? `${String.fromCharCode(65 + (i % 5))}-${(i % 20) + 1}` : null,
    monthlyFee: vehicleTypes[i % 3] === "Xe máy" ? 50000 : 20000,
    externalParkingProof: i % 4 === 0 ? `/parking-proof-${i + 1}.jpg` : null,
    externalParkingCost: i % 4 === 0 && statuses[i % 3] === "approved" ? 100000 : 0,
  }
})

export const mockBrokers = [
  {
    id: "1",
    name: "Nguyễn Văn Broker",
    type: "Cư dân",
    contact: "0912345678",
    email: "broker1@email.com",
    totalReferrals: 15,
    activeReferrals: 12,
    revenue: 18000000,
    status: "approved",
    joinDate: "2024-01-15",
    residentId: "5",
  },
  {
    id: "2",
    name: "Fanpage ChunhieHome",
    type: "Bên ngoài",
    contact: "facebook.com/chunhiehome",
    email: "contact@chunhiehome.com",
    totalReferrals: 45,
    activeReferrals: 38,
    revenue: 57000000,
    status: "approved",
    joinDate: "2023-11-20",
    residentId: null,
  },
  {
    id: "3",
    name: "Tiktok: Trung Tinh",
    type: "Bên ngoài",
    contact: "@trungtinhofficial",
    email: "trungtinhbiz@email.com",
    totalReferrals: 28,
    activeReferrals: 22,
    revenue: 33600000,
    status: "approved",
    joinDate: "2024-02-10",
    residentId: null,
  },
  {
    id: "4",
    name: "Lê Thị Broker",
    type: "Quản lý",
    contact: "0923456789",
    email: "manager.broker@email.com",
    totalReferrals: 10,
    activeReferrals: 8,
    revenue: 0,
    status: "pending",
    joinDate: "2024-11-01",
    residentId: null,
  },
]
