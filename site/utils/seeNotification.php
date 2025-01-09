<?php
require_once '../bootstrap.php';
$notification = "";

if (isset($_GET["title"]) && isset($_GET["sequenceNumber"])) {
    $notification = $dbh->getNotification($_SESSION["userCF"], $_GET["title"], $_GET["sequenceNumber"]);    
}

header('Content-Type: application/json');
echo json_encode($notification);

?>