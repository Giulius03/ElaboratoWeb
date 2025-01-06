<?php 
require_once '../bootstrap.php';
session_unset();

$status["successful"] = false;
if (!isset($_SESSION["username"]) && !isset($_SESSION["userCF"])) {
    $status["successful"] = true;
}

// unset($_SESSION["username"]);
// unset($_SESSION["userCF"]);
header('Content-Type: application/json');
echo json_encode($status);
?>