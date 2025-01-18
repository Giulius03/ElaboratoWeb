<?php 
require_once '../bootstrap.php';
session_unset();

$status["successful"] = false;
if (!isset($_SESSION["username"]) && !isset($_SESSION["userCF"]) && !isset($_SESSION["name"])) {
    $status["successful"] = true;
}

header('Content-Type: application/json');
echo json_encode($status);
?>