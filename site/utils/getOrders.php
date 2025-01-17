<?php
require_once '../bootstrap.php';

$orders = $dbh->getOrders($_SESSION["userCF"]);

header('Content-Type: application/json');
echo json_encode($orders);

?>