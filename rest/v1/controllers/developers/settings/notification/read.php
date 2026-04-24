<?php

$conn = null;
$conn = checkDbConnection();
$val  = new Notification($conn);

if (array_key_exists('id', $_GET)) {
    $val->notification_aid = $_GET['id'];
    checkId($val->notification_aid);

    $query = $this->connection->query(
        "select * from settings_notification where notification_aid = {$val->notification_aid} limit 1"
    );
    http_response_code(200);
    sendResponse($query->fetch(PDO::FETCH_ASSOC));
}

checkEndpoint();