<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make use of classes for database operations
$val = new Department($conn);

// Return only active departments — used by the employee department dropdown
if (array_key_exists("active", $_GET)) {
    $query = $val->readAllActive();
    http_response_code(200);
    getQueriedData($query);
}

// Return all departments (no filter)
if (empty($_GET)) {
    $val->department_is_active = null;
    $val->search               = "";
    $query = checkReadAll($val);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 if endpoint not found
checkEndpoint();