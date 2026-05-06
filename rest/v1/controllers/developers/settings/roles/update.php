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
$val = new Roles($conn);

if (array_key_exists("id", $_GET)) {
    $val->role_aid = $_GET["id"];
    $val->role_name = $data['role_name'];
    $val->role_description = $data['role_description'];
    $val->role_updated = date("Y-m-d H:m:s");

    $role_name_old = $data['role_name_old'];

    // validations
    checkId($val->role_aid);
    compareName(
        $val,//models
        $role_name_old,//old record
        $val->role_name//new record
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Roles Update", $query);
}

checkEndpoint();

