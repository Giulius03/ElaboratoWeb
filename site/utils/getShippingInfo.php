<?php
require_once '../bootstrap.php';

$shipInfo = $dbh->getShippingInfo($_GET["orderID"]);

header('Content-Type: application/json');
echo json_encode($shipInfo);

?>