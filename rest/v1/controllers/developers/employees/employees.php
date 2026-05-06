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

require __DIR__ . '/../../../core/header.php';
require __DIR__ . '/../../../core/functions.php';
require __DIR__ . '/../../../models/developers/employees/Employees.php';

// get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

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
