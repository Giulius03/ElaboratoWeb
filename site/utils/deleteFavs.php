<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_SESSION["userCF"]) && isset($_POST["articleFavsName"]) && isUserLoggedIn()) {
    $deleteFavs = $dbh->deleteFromFavs($_SESSION["userCF"], $_POST["articleFavsName"]);
    $status["successful"] = true;
}

header('Content-Type: application/json');
echo json_encode($status);

?>