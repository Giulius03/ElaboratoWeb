<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_POST["cardNumber"]) && isset($_POST["holder"]) && isset($_POST["expiryDate"])) {
    try {
        $dbh->addCard($_POST["cardNumber"], $_POST["holder"], $_POST["expiryDate"], $_SESSION["userCF"]);
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>