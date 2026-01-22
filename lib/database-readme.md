# Database Setup Guide

## Overview
This dormitory management system uses a comprehensive PostgreSQL database schema designed to handle all aspects of dormitory operations including user management, room allocation, contracts, payments, parking, maintenance, finance tracking, broker commissions, and AI automation.

## Database Structure

### Core Modules

1. **User Management**
   - `users` - User accounts with authentication
   - `roles` - Role definitions (admin, manager, resident, staff)
   - `permissions` - Granular permissions per module
   - `role_permission` - Role-permission mappings
   - `user_role` - User-role assignments

2. **Dormitory & Rooms**
   - `dormitories` - Branch locations
   - `type_room` - Room type definitions (Standard, VIP, Deluxe)
   - `rooms` - Physical rooms in each dormitory
   - `beds` - Individual bed slots in rooms
   - `room_pricing` - Pricing per bed/room with service fees

3. **Residents**
   - `residents` - Resident information (CCCD as primary key)

4. **Contracts & Payments**
   - `contracts` - Rental contracts linking residents to beds
   - `contract_history` - Audit trail of contract changes
   - `payment_receipts` - Payment invoices
   - `payment_transactions` - Actual payment transactions with proof

5. **Parking & Maintenance**
   - `parking` - Vehicle registration and external parking support
   - `maintenance_requests` - Maintenance and repair requests

6. **Finance**
   - `finance_categories` - Income/expense categories
   - `finance_transactions` - All financial transactions

7. **Brokers & Commissions**
   - `moigioi` - Broker information
   - `hoahong` - Commission calculations and payments

8. **Manager Salary**
   - `manager_salary` - Manager compensation tracking

9. **AI Automation**
   - `ai_agents` - AI agent definitions
   - `ai_agent_tasks` - Scheduled automation tasks
   - `ai_agent_log` - Execution logs

## Setup Instructions

### Option 1: Using Supabase (Recommended)

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor in your Supabase dashboard
3. Run the scripts in order:
   - `scripts/01-create-tables.sql`
   - `scripts/02-seed-initial-data.sql`
4. Add your Supabase credentials to environment variables:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

### Option 2: Using Neon

1. Create a Neon project at https://neon.tech
2. Copy your connection string
3. Run the SQL scripts using the Neon SQL Editor or CLI
4. Add your connection string to environment variables:
   \`\`\`
   DATABASE_URL=your_neon_connection_string
   \`\`\`

### Option 3: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a new database: `createdb dormitory_management`
3. Run the scripts: `psql dormitory_management < scripts/01-create-tables.sql`
4. Run seed data: `psql dormitory_management < scripts/02-seed-initial-data.sql`

## Key Features

### Pricing Logic
- Room types define the category (Standard, VIP, Deluxe)
- Pricing is set per individual bed slot, not per room type
- Each bed can have different pricing including:
  - Rental price
  - Deposit amount
  - Service fees (electricity, water, internet, cleaning, parking)

### Contract Management
- Contracts link residents to specific bed slots
- Support both manual and monthly contract types
- Track contract history with full audit trail
- Handle deposit refunds

### Payment System
- Generate payment receipts for contracts
- Track payment transactions with proof images
- Support multiple payment methods (cash, bank transfer)
- Payment status tracking (pending, paid, failed)

### Parking Management
- Register vehicles for residents
- Track external parking with support payments
- Approval workflow for parking support claims

### Broker Commission System
- Track brokers (residents, external, managers)
- Calculate commissions (percentage or fixed amount)
- Manage commission payments

### AI Automation
- Schedule automated tasks (email, Zalo, reminders)
- Generate reports automatically
- Track execution logs

## Data Relationships

\`\`\`
users ←→ user_role ←→ roles ←→ role_permission ←→ permissions
dormitories → rooms → beds → contracts ← residents
contracts → payment_receipts → payment_transactions
contracts → hoahong ← moigioi
residents → parking
rooms → maintenance_requests
dormitories → finance_transactions
users → manager_salary
\`\`\`

## Security Considerations

1. **Password Hashing**: Always use BCrypt or Argon2 for password hashing
2. **Row Level Security**: Implement RLS policies in Supabase for data isolation
3. **API Keys**: Never commit API keys or connection strings to version control
4. **User Verification**: Implement email verification before allowing access
5. **Audit Trails**: Use contract_history and ai_agent_log for tracking changes

## Next Steps

1. Connect your application to the database
2. Implement authentication using Supabase Auth or custom solution
3. Create API routes for CRUD operations
4. Set up Row Level Security policies
5. Implement real-time subscriptions for live updates
6. Add data validation and error handling
7. Set up automated backups
