<?php
require_once '../bootstrap.php';

$status["rightCode"] = false;

if (isset($_POST["code"])) {
    if ($_POST["code"] == $_SESSION["recoveryCode"]) {
        $status["rightCode"] = true;
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>