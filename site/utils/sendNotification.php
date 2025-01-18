<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";
if (isset($_GET["user"]) && isset($_GET["title"])) {
    try {
        $dbh->sendNotification($_GET["user"], $_GET["title"]);
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>