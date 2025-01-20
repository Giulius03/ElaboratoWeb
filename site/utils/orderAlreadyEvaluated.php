<?php
require_once '../bootstrap.php';

$result = "";

if (isset($_GET["seqNum"])) {
    $result = $dbh->isOrderAlreadyEvaluated($_SESSION["userCF"], $_GET["seqNum"]);
}

header('Content-Type: application/json');
echo json_encode($result);
?>