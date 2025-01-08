<?php
require_once '../bootstrap.php';
$dbh->deleteAllNotifications($_SESSION["userCF"]);
?>