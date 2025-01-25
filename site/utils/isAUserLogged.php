<?php 
require_once '../bootstrap.php';

$status["logged"] = false;
if (isset($_SESSION["username"])) {
    $status["logged"] = true;
}

header('Content-Type: application/json');
echo json_encode($status);
?>