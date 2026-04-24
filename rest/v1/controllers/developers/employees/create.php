<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make use of classes for database operations
$val = new Employees($conn);

$val->employee_is_active     = 1;
$val->employee_first_name    = trim($data['employee_first_name']);
$val->employee_middle_name   = trim($data['employee_middle_name']);
$val->employee_last_name     = trim($data['employee_last_name']);
$val->employee_email         = trim($data['employee_email']);
$val->employee_department_id = trim($data['employee_department_id']); // NEW
$val->employee_created       = date("Y-m-d H:i:s");
$val->employee_updated       = date("Y-m-d H:i:s");

// validations
isEmailExist($val, $val->employee_email);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Employees Create", $query);