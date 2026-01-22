// =====================================================
// DATABASE TYPES - Matching SQL Schema
// =====================================================

export interface User {
  user_id: number
  username: string
  email: string
  password: string
  full_name?: string
  phone_number?: string
  gender?: string
  address?: string
  is_active: boolean
  is_verified: boolean
  created_at: Date
  updated_at: Date
}

export interface Role {
  role_id: number
  name: string
  description?: string
}

export interface Permission {
  permission_id: number
  name: string
  module?: string
}

export interface Dormitory {
  dormitory_id: number
  name: string
  location?: string
  description?: string
  created_at: Date
  updated_at: Date
}

export interface TypeRoom {
  typeroom_id: number
  name: string
  description?: string
}

export interface Room {
  room_id: number
  dormitory_id: number
  typeroom_id: number
  room_number: string
  capacity?: number
  availability?: "active" | "maintenance" | "full" | "closed"
  layout_image_url?: string
  created_at: Date
  updated_at: Date
}

export interface Bed {
  bed_id: number
  room_id: number
  label?: string
  position?: "upper" | "lower" | "single"
  status?: "available" | "occupied" | "maintenance"
  created_at: Date
}

export interface RoomPricing {
  room_pricing_id: number
  room_id: number
  bed_id?: number
  effective_date?: Date
  rental_price?: number
  deposit_amount?: number
  electricity_price?: number
  water_price?: number
  internet_price?: number
  cleaning_price?: number
  parking_price?: number
  note?: string
}

export interface Resident {
  customer_code: string // CCCD
  fullname: string
  student_code?: string
  email?: string
  phone_number?: string
  gender?: string
  birthdate?: Date
  address?: string
  emergency_contact?: string
  avatar_url?: string
  created_at: Date
  updated_at: Date
}

export interface Contract {
  contract_id: number
  customer_code: string
  bed_id: number
  start_date: Date
  end_date: Date
  contract_type?: "manual" | "monthly"
  status?: "active" | "expired" | "canceled" | "pending"
  total_amount?: number
  deposit_amount?: number
  refund_status?: "none" | "requested" | "done"
  refund_amount?: number
  refund_date?: Date
  created_at: Date
  updated_at: Date
}

export interface ContractHistory {
  history_id: number
  contract_id: number
  changed_by?: number
  old_status?: string
  new_status?: string
  old_start_date?: Date
  new_start_date?: Date
  old_end_date?: Date
  new_end_date?: Date
  old_deposit_amount?: number
  new_deposit_amount?: number
  old_refund_amount?: number
  new_refund_amount?: number
  changed_at: Date
  note?: string
}

export interface PaymentReceipt {
  paymentreceipt_id: number
  contract_id: number
  amount: number
  description?: string
  status?: "pending" | "paid" | "failed"
  created_at: Date
}

export interface PaymentTransaction {
  paymenttransaction_id: number
  paymentreceipt_id: number
  amount: number
  payment_method?: string
  payment_gateway?: string
  proof_url?: string
  status?: "pending" | "success" | "failed"
  transaction_date?: Date
}

export interface Parking {
  parking_id: number
  customer_code: string
  vehicle_type?: string
  license_plate?: string
  vehicle_brand?: string
  vehicle_color?: string
  parking_spot?: string
  monthly_fee?: number
  status?: "active" | "inactive"
  support_amount?: number
  support_proof_url?: string
  support_month?: Date
  approval_status?: "pending" | "approved" | "rejected"
  approved_by?: number
  created_at: Date
  updated_at: Date
}

export interface MaintenanceRequest {
  id_request: number
  dormitory_id?: number
  room_id?: number
  customer_code?: string
  title?: string
  description?: string
  priority?: "low" | "medium" | "high" | "urgent"
  status?: "pending" | "in_progress" | "done" | "canceled"
  request_date: Date
  resolved_date?: Date
  cost?: number
  reported_by?: number
  handled_by?: number
  assigned_to_name?: string
  assigned_to_phone?: string
}

export interface FinanceCategory {
  category_id: number
  name: string
  description?: string
}

export interface FinanceTransaction {
  finance_id: number
  dormitory_id?: number
  category_id?: number
  contract_id?: number
  description?: string
  amount: number
  type?: "income" | "expense"
  attachment_url?: string
  created_by?: number
  created_at: Date
}

export interface MoiGioi {
  id_moigioi: number
  ten_moigioi?: string
  phone?: string
  email?: string
  dia_chi?: string
  loai_moigioi?: string
  resident_id?: string
  ghi_chu?: string
  created_at: Date
  updated_at: Date
}

export interface HoaHong {
  id_hoahong: number
  id_hopdong?: number
  id_moigioi?: number
  calculation_type?: "percent" | "fixed"
  phan_tram_hoahong?: number
  so_tien_hoahong?: number
  trang_thai?: "pending" | "paid" | "canceled"
  ngay_tao: Date
  ngay_thanh_toan?: Date
  created_at: Date
  updated_at: Date
}

export interface ManagerSalary {
  salary_id: number
  user_id: number
  base_salary?: number
  commission_amount?: number
  support_amount?: number
  month?: Date
  proof_url?: string
  status?: "pending" | "approved" | "paid" | "rejected"
  created_by?: number
  approved_by?: number
  created_at: Date
  updated_at: Date
}

export interface AIAgent {
  ai_agent_id: number
  name: string
  description?: string
  status?: "active" | "inactive" | "maintenance"
  created_at: Date
  updated_at: Date
}

export interface AIAgentTask {
  task_id: number
  ai_agent_id: number
  contract_id?: number
  payment_id?: number
  resident_code?: string
  user_id?: number
  action?: string
  message_content?: string
  status?: "pending" | "completed" | "failed"
  scheduled_time?: Date
  executed_time?: Date
  created_at: Date
}

export interface AIAgentLog {
  id_log: number
  ai_agent_id: number
  task_id?: number
  user_id?: number
  result?: string
  created_at: Date
}
