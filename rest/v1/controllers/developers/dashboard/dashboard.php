<?php

// CORS — must be first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/../../../core/Database.php';
require __DIR__ . '/../../../models/developers/employees/Employees.php';
require __DIR__ . '/../../../models/developers/memo/Memo.php';

// ── DB connection ────────────────────────────────────────────────────────────
function getConn() {
    return Database::connectDb();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    try {
        $conn = getConn();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "DB connection failed"]);
        exit;
    }

    // ── 1. ALL ACTIVE EMPLOYEES (with department) ────────────────────────────
    try {
        $sql  = " SELECT e.employee_aid, e.employee_first_name, e.employee_middle_name,";
        $sql .= "        e.employee_last_name, e.employee_email, e.employee_birthday,";
        $sql .= "        e.employee_start_work_date, e.employee_department_id,";
        $sql .= "        d.department_name";
        $sql .= " FROM employees e";
        $sql .= " LEFT JOIN settings_department d ON e.employee_department_id = d.department_aid";
        $sql .= " WHERE e.employee_is_active = 1";
        $sql .= " ORDER BY d.department_name ASC, e.employee_last_name ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $employees = [];
    }

    // ── 2. ACTIVE ANNOUNCEMENTS (memo) ──────────────────────────────────────
    try {
        $sql  = " SELECT memo_aid, memo_from, memo_to, memo_date, memo_category, memo_text";
        $sql .= " FROM memo";
        $sql .= " WHERE memo_is_active = 1";
        $sql .= " ORDER BY memo_date DESC, memo_aid DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $announcements = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $announcements = [];
    }

    // ── 3. SERVER DATE (for JS date comparisons) ─────────────────────────────
    $serverDate  = date('Y-m-d');
    $serverMonth = (int) date('n');
    $serverYear  = (int) date('Y');

    http_response_code(200);
    echo json_encode([
        "success"       => true,
        "employees"     => $employees,
        "announcements" => $announcements,
        "server_date"   => $serverDate,
        "server_month"  => $serverMonth,
        "server_year"   => $serverYear,
    ]);
    exit;
}

http_response_code(404);
echo json_encode(["success" => false, "error" => "Endpoint not found"]);
exit;
