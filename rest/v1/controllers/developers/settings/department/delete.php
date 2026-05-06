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
    $val->department_aid = $_GET["id"];

    checkId($val->department_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Department Delete", $query);
}

checkEndpoint();