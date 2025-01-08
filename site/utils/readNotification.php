<?php
require_once '../bootstrap.php';

$status["successful"] = false;

if (isset($_POST["title"]) and isset($_POST["sequenceNumber"])) {
    $rowsChanged = $dbh->readNotification($_SESSION["userCF"], $_POST["title"], $_POST["sequenceNumber"]);
    if ($rowsChanged == 1) {
        $status["successful"] = true;
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>