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
$val = new Department($conn);

if (array_key_exists("id", $_GET)) {
    $val->department_aid     = $_GET["id"];
    $val->department_name    = trim($data['department_name']);
    $val->department_updated = date("Y-m-d H:i:s");

    $department_name_old = $data['department_name_old'];

    // validations
    checkId($val->department_aid);
    compareName(
        $val,                    // model
        $department_name_old,    // old record
        $val->department_name    // new record
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Department Update", $query);
}

checkEndpoint();