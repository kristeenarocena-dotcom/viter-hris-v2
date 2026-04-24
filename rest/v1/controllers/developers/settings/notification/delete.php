<?php

$conn = null;
$conn = checkDbConnection();
$val  = new Notification($conn);

if (array_key_exists("id", $_GET)) {
    $val->notification_aid = $_GET["id"];
    checkId($val->notification_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Notification Delete", $query);
}

checkEndpoint();