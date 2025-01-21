<?php
require_once '../bootstrap.php';

$shipInfo = $dbh->getOrders($_GET["orderId"]);

header('Content-Type: application/json');
echo json_encode($shipInfo);

?>