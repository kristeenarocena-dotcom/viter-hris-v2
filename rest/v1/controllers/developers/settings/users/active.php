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

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use models
require '../../../../models/developers/settings/users/Users.php';
// store models into variables

$conn = null;
$conn = checkDBConnection();

$val = new Users($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    // check data if exist and data is required
    checkPayload($data);
    $val->users_aid = $_GET['id'];
    $val->users_is_active = trim($data['isActive']);
    $val->users_updated = date('Y-m-d H:m:s');

    // validate is id
    checkId($val->users_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'user active', $query);
}

// return 404 if endpoint is active
checkEndpoint();
