<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";
if (isset($_POST["article"]) && isset($_POST["size"])) {
    try {
        $dbh->addFavourite($_SESSION["userCF"], $_POST["article"], $_POST["size"]);
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>