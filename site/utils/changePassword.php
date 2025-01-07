<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_POST["confusername"]) && isset($_POST["password"])) {
    $rowsChanged = $dbh->changePassword($_POST["confusername"], $_POST["password"]);
    if ($rowsChanged == 0) {
        $status["error"] = $currentLanguage == "en" ? "This account does not exist." : "Questo account non esiste.";
    } else {
        $status["successful"] = true;
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>