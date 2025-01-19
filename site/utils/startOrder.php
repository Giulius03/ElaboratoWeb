<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_GET["seqNum"])) {
    try {
        $rowsChanged = $dbh->startOrder($_GET["seqNum"]);
        if ($rowsChanged == 0) {
            throw new Exception('problema');
        }
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>