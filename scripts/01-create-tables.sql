-- =====================================================
-- DORMITORY MANAGEMENT SYSTEM - DATABASE SCHEMA
-- =====================================================

-- =====================================================
-- USER MANAGEMENT
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Mã hóa bằng BCrypt hoặc Argon2
  full_name VARCHAR(150),
  phone_number VARCHAR(20),
  gender VARCHAR(10),
  address VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS roles (
  role_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS permissions (
  permission_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  module VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS role_permission (
  role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
  permission_id INTEGER REFERENCES permissions(permission_id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS user_role (
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id)
);

-- =====================================================
-- BRANCH, ROOMS, BEDS
-- =====================================================

CREATE TABLE IF NOT EXISTS dormitories (
  dormitory_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS type_room (
  typeroom_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL, -- standard | premium | other
  description TEXT
);

CREATE TABLE IF NOT EXISTS rooms (
  room_id SERIAL PRIMARY KEY,
  dormitory_id INTEGER REFERENCES dormitories(dormitory_id) ON DELETE CASCADE,
  typeroom_id INTEGER REFERENCES type_room(typeroom_id),
  room_number VARCHAR(50) NOT NULL,
  capacity INTEGER,
  availability VARCHAR(30), -- active|maintenance|full|closed
  layout_image_url TEXT, -- Ảnh sơ đồ phòng (tùy chọn)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS beds (
  bed_id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(room_id) ON DELETE CASCADE,
  label VARCHAR(50), -- A1, A2, B1, B2 ...
  position VARCHAR(20), -- upper|lower|single
  status VARCHAR(20), -- available|occupied|maintenance
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS room_pricing (
  room_pricing_id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(room_id) ON DELETE CASCADE,
  bed_id INTEGER REFERENCES beds(bed_id),
  effective_date TIMESTAMP,
  rental_price DECIMAL(15,2),
  deposit_amount DECIMAL(15,2),
  electricity_price DECIMAL(15,2),
  water_price DECIMAL(15,2),
  internet_price DECIMAL(15,2),
  cleaning_price DECIMAL(15,2),
  parking_price DECIMAL(15,2),
  note TEXT
);

-- =====================================================
-- RESIDENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS residents (
  customer_code VARCHAR(20) PRIMARY KEY, -- Mã khách hàng = CCCD
  fullname VARCHAR(150) NOT NULL,
  student_code VARCHAR(50) UNIQUE,
  email VARCHAR(150) UNIQUE,
  phone_number VARCHAR(30),
  gender VARCHAR(10),
  birthdate DATE,
  address VARCHAR(255),
  emergency_contact VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CONTRACTS & PAYMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS contracts (
  contract_id SERIAL PRIMARY KEY,
  customer_code VARCHAR(20) REFERENCES residents(customer_code),
  bed_id INTEGER REFERENCES beds(bed_id),
  start_date DATE,
  end_date DATE,
  contract_type VARCHAR(20), -- manual|monthly
  status VARCHAR(20), -- active|expired|canceled|pending
  total_amount DECIMAL(15,2),
  deposit_amount DECIMAL(15,2),
  refund_status VARCHAR(20), -- none|requested|done
  refund_amount DECIMAL(15,2),
  refund_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_active_bed_contract UNIQUE (bed_id, status)
);

CREATE TABLE IF NOT EXISTS contract_history (
  history_id SERIAL PRIMARY KEY,
  contract_id INTEGER REFERENCES contracts(contract_id) ON DELETE CASCADE,
  changed_by INTEGER REFERENCES users(user_id),
  old_status VARCHAR(20),
  new_status VARCHAR(20),
  old_start_date DATE,
  new_start_date DATE,
  old_end_date DATE,
  new_end_date DATE,
  old_deposit_amount DECIMAL(15,2),
  new_deposit_amount DECIMAL(15,2),
  old_refund_amount DECIMAL(15,2),
  new_refund_amount DECIMAL(15,2),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  note TEXT
);

CREATE TABLE IF NOT EXISTS payment_receipts (
  paymentreceipt_id SERIAL PRIMARY KEY,
  contract_id INTEGER REFERENCES contracts(contract_id) ON DELETE CASCADE,
  amount DECIMAL(15,2),
  description TEXT,
  status VARCHAR(20), -- pending|paid|failed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_transactions (
  paymenttransaction_id SERIAL PRIMARY KEY,
  paymentreceipt_id INTEGER REFERENCES payment_receipts(paymentreceipt_id) ON DELETE CASCADE,
  amount DECIMAL(15,2),
  payment_method VARCHAR(50), -- Tiền mặt|Chuyển khoản
  payment_gateway VARCHAR(50),
  proof_url TEXT,
  status VARCHAR(20), -- pending|success|failed
  transaction_date TIMESTAMP
);

-- =====================================================
-- PARKING & MAINTENANCE
-- =====================================================

CREATE TABLE IF NOT EXISTS parking (
  parking_id SERIAL PRIMARY KEY,
  customer_code VARCHAR(20) REFERENCES residents(customer_code),
  vehicle_type VARCHAR(50),
  license_plate VARCHAR(20),
  vehicle_brand VARCHAR(100),
  vehicle_color VARCHAR(50),
  parking_spot VARCHAR(20),
  monthly_fee DECIMAL(15,2),
  status VARCHAR(20), -- active|inactive
  
  support_amount DECIMAL(15,2), -- Tiền hỗ trợ gửi xe (mức tiền đề xuất)
  support_proof_url TEXT, -- Link hình ảnh chứng minh gửi xe ngoài
  support_month DATE, -- Tháng được đề xuất/duyệt hỗ trợ
  approval_status VARCHAR(20), -- pending|approved|rejected
  approved_by INTEGER REFERENCES users(user_id),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS maintenance_requests (
  id_request SERIAL PRIMARY KEY,
  dormitory_id INTEGER REFERENCES dormitories(dormitory_id),
  room_id INTEGER REFERENCES rooms(room_id),
  customer_code VARCHAR(20) REFERENCES residents(customer_code),
  title VARCHAR(255),
  description TEXT,
  priority VARCHAR(20), -- low|medium|high|urgent
  status VARCHAR(20), -- pending|in_progress|done|canceled
  request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_date TIMESTAMP,
  cost DECIMAL(15,2),
  reported_by INTEGER REFERENCES users(user_id),
  handled_by INTEGER REFERENCES users(user_id),
  assigned_to_name VARCHAR(150),
  assigned_to_phone VARCHAR(30)
);

-- =====================================================
-- INTERNAL FINANCE
-- =====================================================

CREATE TABLE IF NOT EXISTS finance_categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS finance_transactions (
  finance_id SERIAL PRIMARY KEY,
  dormitory_id INTEGER REFERENCES dormitories(dormitory_id),
  category_id INTEGER REFERENCES finance_categories(category_id),
  contract_id INTEGER REFERENCES contracts(contract_id),
  description TEXT,
  amount DECIMAL(15,2),
  type VARCHAR(20), -- income|expense
  attachment_url TEXT,
  created_by INTEGER REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BROKERS & COMMISSIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS moigioi (
  id_moigioi SERIAL PRIMARY KEY,
  ten_moigioi VARCHAR(150),
  phone VARCHAR(30),
  email VARCHAR(100),
  dia_chi VARCHAR(255),
  loai_moigioi VARCHAR(50), -- Cư dân|Bên ngoài|Quản lý
  resident_id VARCHAR(20) REFERENCES residents(customer_code),
  ghi_chu TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hoahong (
  id_hoahong SERIAL PRIMARY KEY,
  id_hopdong INTEGER REFERENCES contracts(contract_id),
  id_moigioi INTEGER REFERENCES moigioi(id_moigioi),
  
  calculation_type VARCHAR(20), -- percent|fixed
  phan_tram_hoahong DECIMAL(5,2), -- Số % (nếu calculation_type = percent)
  so_tien_hoahong DECIMAL(15,2), -- Số tiền cố định (nếu calculation_type = fixed)
  
  trang_thai VARCHAR(20), -- pending|paid|canceled
  ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ngay_thanh_toan TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- MANAGER SALARY
-- =====================================================

CREATE TABLE IF NOT EXISTS manager_salary (
  salary_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  
  base_salary DECIMAL(15,2), -- Lương cứng do admin nhập
  commission_amount DECIMAL(15,2), -- Hoa hồng upload bởi quản lý
  support_amount DECIMAL(15,2), -- Chi phí hổ trợ
  month DATE, -- Tháng lương
  
  proof_url TEXT, -- Hình ảnh minh chứng hoa hồng / chi phí
  status VARCHAR(20), -- pending|approved|paid|rejected
  
  created_by INTEGER REFERENCES users(user_id),
  approved_by INTEGER REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- AI AGENT MODULE
-- =====================================================

CREATE TABLE IF NOT EXISTS ai_agents (
  ai_agent_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  status VARCHAR(20), -- active|inactive|maintenance
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_agent_tasks (
  task_id SERIAL PRIMARY KEY,
  ai_agent_id INTEGER REFERENCES ai_agents(ai_agent_id),
  contract_id INTEGER REFERENCES contracts(contract_id),
  payment_id INTEGER REFERENCES payment_receipts(paymentreceipt_id),
  resident_code VARCHAR(20) REFERENCES residents(customer_code),
  user_id INTEGER REFERENCES users(user_id),
  action VARCHAR(50), -- send_email|send_zalo|auto_reminder|generate_report
  message_content TEXT,
  status VARCHAR(20), -- pending|completed|failed
  scheduled_time TIMESTAMP,
  executed_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_agent_log (
  id_log SERIAL PRIMARY KEY,
  ai_agent_id INTEGER REFERENCES ai_agents(ai_agent_id),
  task_id INTEGER REFERENCES ai_agent_tasks(task_id),
  user_id INTEGER REFERENCES users(user_id),
  result TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_rooms_dormitory ON rooms(dormitory_id);
CREATE INDEX idx_beds_room ON beds(room_id);
CREATE INDEX idx_contracts_customer ON contracts(customer_code);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_payments_contract ON payment_receipts(contract_id);
CREATE INDEX idx_parking_customer ON parking(customer_code);
CREATE INDEX idx_maintenance_room ON maintenance_requests(room_id);
CREATE INDEX idx_finance_dormitory ON finance_transactions(dormitory_id);
