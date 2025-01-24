<?php
require_once '../bootstrap.php';

$status["firstOrder"] = false;
$result = $dbh->getNumberOfOrders($_SESSION["userCF"]);
if ($result[0]["numOrdini"] == 0) {
    $status["firstOrder"] = true;
}

header('Content-Type: application/json');
echo json_encode($status);
?>
