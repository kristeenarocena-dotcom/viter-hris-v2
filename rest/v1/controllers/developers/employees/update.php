<?php

// CORS headers - must be first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

// Handle preflight immediately
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// check database connection
$conn = null;
$conn = checkDbConnection();
// make use of classes for database operations
$val = new Employees($conn);

if (array_key_exists("id", $_GET)) {
    $val->employee_aid           = $_GET["id"];
    $val->employee_first_name    = trim($data['employee_first_name']);
    $val->employee_middle_name   = trim($data['employee_middle_name']);
    $val->employee_last_name     = trim($data['employee_last_name']);
    $val->employee_email         = trim($data['employee_email']);
    $val->employee_department_id = trim($data['employee_department_id']); // NEW
    $val->employee_updated       = date("Y-m-d H:i:s");

    $employee_email_old = $data['employee_email_old'];

    // validations
    checkId($val->employee_aid);
    compareEmail(
        $val,                  // model
        $employee_email_old,   // old record
        $val->employee_email   // new record
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Employees Update", $query);
}

checkEndpoint();