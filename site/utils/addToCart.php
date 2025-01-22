<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

// echo $_POST["quantity"]

if (isset($_SESSION["userCF"]) && isset($_POST["articleName"]) && isset($_POST["size"])) {
    try {
        $quantityArticle = 0;
        $cart = $dbh->getCart($_SESSION["userCF"]);
        foreach ($cart as $article) {
            if ($article['nomeita'] == $_POST["articleName"] && $article["taglia"] == $_POST["size"]) {
                $quantityArticle = $article['quantità'];
            }
        }
        $quantityArticle += $_POST["quantity"];
        $addCart = $dbh->addToCart($_SESSION["userCF"], $_POST["articleName"], $quantityArticle, $_POST["size"]);
        $status["successful"] = true;
    } catch (Exception $th) {
        $status["error"] = $th->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);

?>