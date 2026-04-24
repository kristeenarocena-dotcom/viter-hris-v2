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
    $val->users_first_name = trim($data['users_first_name']);
    $val->users_last_name = trim($data['users_last_name']);
    $val->users_email = trim($data['users_email']);
    $val->users_role_id = trim($data['users_role_id']);
    $val->users_updated = date("Y-m-d H:m:s");

    $users_first_name_old = trim($data['users_first_name_old']);
    $users_last_name_old = trim($data['users_last_name_old']);
    $users_email_old = $data['users_email_old'];

    // validations
    checkId($val->users_aid);
    compareFullName(
        $val,
        $users_first_name_old,
        $val->users_first_name,
        $users_last_name_old,
        $val->users_last_name,
        "User already exist."
    );
    compareEmail(
        $val,//models
        $users_email_old,//old record
        $val->users_email,//new record
        "Email already used"
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Users Update", $query);
}

checkEndpoint();
