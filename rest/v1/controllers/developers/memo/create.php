<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Memo($conn);

$val->memo_is_active = 1;
$val->memo_from = trim($data['memo_from']);
$val->memo_to = trim($data['memo_to']);
$val->memo_date = trim($data['memo_date']);
$val->memo_category = trim($data['memo_category']);
$val->memo_text = trim($data['memo_text']);
$val->memo_created = date("Y-m-d H:i:s");
$val->memo_updated = date("Y-m-d H:i:s");

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Memo Create", $query);