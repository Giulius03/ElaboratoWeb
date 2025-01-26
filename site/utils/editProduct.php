<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_POST["nameita"]) && isset($_POST["nameeng"]) && isset($_POST["category"]) && isset($_POST["image"]) &&
    isset($_POST["price"]) && isset($_POST["descriptionita"]) && isset($_POST["descriptioneng"]) && isset($_POST["group"])
    && isset($_POST["quantity"]) && isset($_POST["articleToUpdate"])) {
    try {
        $dbh->updateProduct($_POST["articleToUpdate"], $_POST["nameita"], $_POST["nameeng"], $_POST["image"], $_POST["price"],
            $_POST["descriptionita"], $_POST["descriptioneng"], $_POST["quantity"], $_POST["group"], $_POST["category"]);
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>