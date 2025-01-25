<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";
if (isset($_GET["fromCart"]) && $_GET["fromCart"] == "true") {
    if (isset($_GET["dataIns"]) && isset($_GET["dataCons"]) && isUserLoggedIn()) {
        try {
            $dbh->addOrder($_SESSION["userCF"], $_GET["dataIns"], $_GET["dataCons"]);
            $cart = $dbh->getCart($_SESSION["userCF"]);
    
            foreach ($cart as $article) {
                $dbh->addArticleOrder($article['nomeita'], $article['quantità'], $article['taglia']);
            }
            $dbh->sendNotification("0000000000000000", "Ordine richiesto");
            $status["successful"] = true;
        } catch (Exception $e) {
            $status["error"] = $e->getMessage();
        }
    } else {
        $status["error"] = "Missing required parameters or user not logged in.";
    }
} else {
    if (isset($_GET["dataIns"]) && isset($_GET["dataCons"]) && isUserLoggedIn() && isset($_GET["article"]) && isset($_GET["quantity"]) && isset($_GET["size"])) {
        try {
            $dbh->addOrder($_SESSION["userCF"], $_GET["dataIns"], $_GET["dataCons"]);
            $dbh->addArticleOrder($_GET["article"], $_GET["quantity"], $_GET["size"]);
            $status["successful"] = true;
        } catch (Exception $e) {
            $status["error"] = $e->getMessage();
        }
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>
