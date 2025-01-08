<?php
require_once '../bootstrap.php';
$dbh->readAllNotifications($_SESSION["userCF"]);
?>