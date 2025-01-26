<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_POST["nameita"]) && isset($_POST["nameeng"]) && isset($_POST["category"]) && isset($_POST["image"]) &&
    isset($_POST["price"]) && isset($_POST["descriptionita"]) && isset($_POST["descriptioneng"]) && isset($_POST["group"])
    && isset($_POST["quantity"])) {
    try {
        $dbh->addProduct($_POST["category"], $_POST["nameita"], $_POST["nameeng"], $_POST["image"], $_POST["price"],
            $_POST["descriptionita"], $_POST["descriptioneng"], $_POST["group"], $_POST["quantity"]);
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>