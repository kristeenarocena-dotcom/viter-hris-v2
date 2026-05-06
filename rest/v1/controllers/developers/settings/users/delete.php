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
// make use of classes for save database
$val = new Users($conn);

if (array_key_exists("id", $_GET)) {
    $val->users_aid = $_GET["id"];

    checkId($val->users_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Users Delete", $query);
}

checkEndpoint();
