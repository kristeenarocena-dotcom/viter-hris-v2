<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Memo($conn);

$query = $val->readAll();
http_response_code(200);
getQueriedData($query);