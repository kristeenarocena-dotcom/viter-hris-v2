<?php

// CORS headers — must be first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/notification/Notification.php';

$conn = null;
$conn = checkDBConnection();
$val  = new Notification($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    checkPayload($data);

    $val->notification_aid       = $_GET['id'];
    $val->notification_is_active = trim($data['isActive']);
    $val->notification_updated   = date('Y-m-d H:i:s');

    checkId($val->notification_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'notification active', $query);
}

checkEndpoint();