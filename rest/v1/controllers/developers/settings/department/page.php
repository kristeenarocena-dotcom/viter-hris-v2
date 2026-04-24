<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use models
require '../../../../models/developers/settings/department/Department.php';

$conn = null;
$conn = checkDBConnection();

$val = new Department($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists("start", $_GET)) {
        // check data if exist and data is required
        checkPayload($data);

        $val->start                = $_GET['start'];
        $val->total                = 10;
        $val->department_is_active = $data['filterData'];
        $val->search               = $data['searchValue'];

        // validation
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
