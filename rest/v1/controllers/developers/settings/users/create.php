<?php
// check database connection 
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Users($conn);

$val->users_is_active = 1;
$val->users_first_name = trim($data['users_first_name']);
$val->users_last_name = trim($data['users_last_name']);
$val->users_email = trim($data['users_email']);
$val->users_password = $data['users_password'];
$val->users_role_id = $data['users_role_id'];
$val->users_created = date("Y-m-d H:m:s");
$val->users_updated = date("Y-m-d H:m:s");

// validations
isFullNameExist($val, $val->users_first_name, $val->users_last_name, "User already exist.");
isEmailExist($val, $val->users_email, "Email already used");

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Users Create", $query);
