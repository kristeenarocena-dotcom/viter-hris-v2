-- ============================================================
-- MIGRATION: Dashboard v2 — Celebrations & New Employees
-- Database: viter_hris_v1
-- Run this SQL on your database BEFORE deploying the new code.
-- ============================================================

-- STEP 1: Add employee_birthday column
ALTER TABLE `employees`
  ADD COLUMN `employee_birthday` date DEFAULT NULL
  COMMENT 'Date of birth for birthday celebrations (YYYY-MM-DD)'
  AFTER `employee_email`;

-- STEP 2: Add employee_start_work_date column
ALTER TABLE `employees`
  ADD COLUMN `employee_start_work_date` date DEFAULT NULL
  COMMENT 'Official start date at the company — used for work anniversaries and new employee tracking (YYYY-MM-DD)'
  AFTER `employee_birthday`;

-- STEP 3: (if not yet added) Add employee_department_id column
-- Skip this if settings_department and the FK column already exist.
-- ALTER TABLE `employees`
--   ADD COLUMN `employee_department_id` int(11) DEFAULT NULL
--   AFTER `employee_last_name`;

-- ============================================================
-- VERIFY: run this after the migration
-- ============================================================
-- DESCRIBE employees;
-- Expected new columns:
--   employee_birthday         date  DEFAULT NULL
--   employee_start_work_date  date  DEFAULT NULL
