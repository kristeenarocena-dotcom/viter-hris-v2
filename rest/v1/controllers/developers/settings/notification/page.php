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

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists("start", $_GET)) {
        checkPayload($data);

        $val->start                   = $_GET['start'];
        $val->total                   = 10;
        $val->notification_is_active  = $data['filterData'];
        $val->search                  = $data['searchValue'];

        checkLimitId($val->start, $val->total);

        $query        = checkReadLimit($val);
        $total_result = checkReadAll($val);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $val->total,
            $val->start
        );
    }
}

// return 404 if endpoint not found
checkEndpoint();