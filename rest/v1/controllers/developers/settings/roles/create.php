<?php
// check database connection 
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Roles($conn);

$val->role_is_active = 1;
$val->role_name = trim($data['role_name']);
$val->role_description = $data['role_description'];
$val->role_created = date("Y-m-d H:m:s");
$val->role_updated = date("Y-m-d H:m:s");

// validations
isNameExist($val, $val->role_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Roles Create", $query);
