<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_SESSION["userCF"]) && isset($_POST["articleCartName"])) {
    $deleteCart = $dbh->deleteFromCart($_SESSION["userCF"], $_POST["articleCartName"]);
    $status["successful"] = true;
}

header('Content-Type: application/json');
echo json_encode($status);

?>