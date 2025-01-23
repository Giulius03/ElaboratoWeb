<?php
require_once '../bootstrap.php';

$status = ["successful" => false, "error" => ""];

if (isset($_POST["orderNumber"]) && isUserLoggedIn()) {
    try {
        $dbh->aggiornaStato($_POST["orderNumber"]);

        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
} else {
    $status["error"] = "Missing required parameters or user not logged in.";
}

header('Content-Type: application/json');
echo json_encode($status);
?>