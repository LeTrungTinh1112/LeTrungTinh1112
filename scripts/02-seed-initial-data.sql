-- =====================================================
-- SEED INITIAL DATA
-- =====================================================

-- Insert Roles
INSERT INTO roles (name, description) VALUES
('admin', 'Quản trị viên hệ thống'),
('manager', 'Quản lý chi nhánh'),
('resident', 'Cư dân'),
('staff', 'Nhân viên')
ON CONFLICT DO NOTHING;

-- Insert Permissions
INSERT INTO permissions (name, module) VALUES
('view', 'rooms'),
('create', 'rooms'),
('edit', 'rooms'),
('delete', 'rooms'),
('view', 'residents'),
('create', 'residents'),
('edit', 'residents'),
('delete', 'residents'),
('view', 'contracts'),
('create', 'contracts'),
('edit', 'contracts'),
('delete', 'contracts'),
('view', 'payments'),
('create', 'payments'),
('edit', 'payments'),
('delete', 'payments'),
('view', 'maintenance'),
('create', 'maintenance'),
('edit', 'maintenance'),
('delete', 'maintenance'),
('view', 'reports'),
('create', 'reports'),
('view', 'settings'),
('edit', 'settings')
ON CONFLICT DO NOTHING;

-- Insert Default Users (passwords should be hashed in production)
INSERT INTO users (username, email, password, full_name, phone_number, gender, is_active, is_verified) VALUES
('admin', 'admin@dormitory.com', '$2a$10$XQKvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', 'Nguyễn Văn Admin', '0901234567', 'Nam', true, true),
('manager', 'manager@dormitory.com', '$2a$10$XQKvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', 'Trần Thị Manager', '0901234568', 'Nữ', true, true),
('resident', 'resident@dormitory.com', '$2a$10$XQKvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', 'Hoàng Thị Resident', '0901234571', 'Nữ', true, true)
ON CONFLICT DO NOTHING;

-- Assign Roles to Users
INSERT INTO user_role (user_id, role_id) VALUES
(1, 1), -- admin
(2, 2), -- manager
(3, 3)  -- resident
ON CONFLICT DO NOTHING;

-- Insert Dormitories
INSERT INTO dormitories (name, location, description) VALUES
('Chi nhánh Hà Nội', 'Số 123, Đường Giải Phóng, Hà Nội', 'Chi nhánh chính tại Hà Nội'),
('Chi nhánh TP.HCM', 'Số 456, Đường Nguyễn Văn Linh, TP.HCM', 'Chi nhánh tại TP.HCM'),
('Chi nhánh Đà Nẵng', 'Số 789, Đường Nguyễn Tất Thành, Đà Nẵng', 'Chi nhánh tại Đà Nẵng')
ON CONFLICT DO NOTHING;

-- Insert Room Types
INSERT INTO type_room (name, description) VALUES
('Standard', 'Phòng tiêu chuẩn 4 người'),
('VIP', 'Phòng VIP 2 người'),
('Deluxe', 'Phòng cao cấp 1 người')
ON CONFLICT DO NOTHING;

-- Insert Finance Categories
INSERT INTO finance_categories (name, description) VALUES
('Tiền thuê phòng', 'Thu nhập từ tiền thuê phòng'),
('Tiền điện', 'Thu nhập từ tiền điện'),
('Tiền nước', 'Thu nhập từ tiền nước'),
('Tiền gửi xe', 'Thu nhập từ phí gửi xe'),
('Bảo trì', 'Chi phí bảo trì, sửa chữa'),
('Lương nhân viên', 'Chi phí lương nhân viên'),
('Hoa hồng', 'Chi phí hoa hồng môi giới'),
('Khác', 'Thu chi khác')
ON CONFLICT DO NOTHING;
