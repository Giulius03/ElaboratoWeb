<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_GET["article"])) {
    try {
        $dbh->removeFromMarket($_GET["article"]);
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>