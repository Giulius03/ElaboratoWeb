<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_SESSION["userCF"]) && isset($_POST["articleName"])) {
    $quantityArticole = 0;
    $cart = $dbh->getCart($_SESSION["userCF"], $_POST["articleName"]);
    foreach ($cart as $articole) {
        if ($articole['nomeita'] === $_POST["articleName"]) {
            $quantityArticole = $articole['quantità'];
        }
    }
    if ($quantityArticole == 0) {
        $addCart = $dbh->addToCart($_SESSION["userCF"], $_POST["articleName"], 1);
    } else {
        $quantityArticole += 1;
        $addCart = $dbh->addToCart($_SESSION["userCF"], $_POST["articleName"], $quantityArticole);
    }
    $status["successful"] = true;
}

header('Content-Type: application/json');
echo json_encode($status);

?>