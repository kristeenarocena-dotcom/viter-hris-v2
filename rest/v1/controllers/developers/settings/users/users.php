<?php

// CORS headers - must be first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

// Handle preflight immediately
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/users/Users.php';

// get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if ($_SERVER['HTTP_AUTHORIZATION']) {
    // CREATE / POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }

    // READ / GET
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $result = require 'read.php';
        sendResponse($result);
        exit;
    }

    // UPDATE / PUT
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $result = require 'update.php';
        sendResponse($result);
        exit;
    }

    // DELETE / PUT
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $result = require 'delete.php';
        sendResponse($result);
        exit;
    }
}

// return access error
checkAccess();