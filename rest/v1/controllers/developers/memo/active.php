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
require __DIR__ . '/../../../core/header.php';
// use needed functions
require __DIR__ . '/../../../core/functions.php';
// use models
require __DIR__ . '/../../../models/developers/memo/Memo.php';

$conn = null;
$conn = checkDbConnection();

$val = new Memo($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    // check data if exist and data is required
    checkPayload($data);
    $val->memo_aid = $_GET['id'];
    $val->memo_is_active = trim($data['isActive']);
    $val->memo_updated = date('Y-m-d H:i:s');

    // validate id
    checkId($val->memo_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'memo active', $query);
}

// return 404 if endpoint not found
checkEndpoint();