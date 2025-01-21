<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_SESSION["userCF"]) && isset($_POST["articleName"]) && isset($_POST["size"])) {
    $quantityArticle = 0;
    $cart = $dbh->getCart($_SESSION["userCF"]);
    foreach ($cart as $article) {
        if ($article['nomeita'] == $_POST["articleName"] && $article["taglia"] == $_POST["size"]) {
            $quantityArticle = $article['quantità'];
        }
    }
    if ($quantityArticle == 0) {
        $addCart = $dbh->addToCart($_SESSION["userCF"], $_POST["articleName"], 1, $_POST["size"]);
    } else {
        $quantityArticle += isset($_POST["quantity"]) ? $_POST["quantity"] : 1;
        $addCart = $dbh->addToCart($_SESSION["userCF"], $_POST["articleName"], $quantityArticle, $_POST["size"]);
    }
    $status["successful"] = true;
}

header('Content-Type: application/json');
echo json_encode($status);

?>