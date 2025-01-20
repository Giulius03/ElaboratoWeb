<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_GET["seqNum"]) && isset($_GET["value"])) {
    $rowsChanged = $dbh->evaluateOrder($_SESSION["userCF"], $_GET["value"], $_GET["seqNum"]);
    if ($rowsChanged == 0) {
        $status["error"] = $currentLanguage == "en" ? "Something went wrong." : "Qualcosa è andato storto.";
    } else {
        $status["successful"] = true;
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>