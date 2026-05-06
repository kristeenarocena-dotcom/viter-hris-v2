<?php
// check database connection 
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Roles($conn);

if (empty($_GET)) {
    $query = checkReadAll($val);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 if endpoint not found
checkEndpoint();