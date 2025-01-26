<?php
require_once '../bootstrap.php';

$status = 0;
if (isUserLoggedIn()) {
    $status = $dbh->checkNewNotifications($_SESSION["userCF"]);
}

header('Content-Type: application/json');
echo json_encode($status);
?>