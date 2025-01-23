<?php
require_once '../bootstrap.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);

$status = ["successful" => false, "error" => ""];

if (isset($_POST["dataIns"]) && isset($_POST["dataCons"]) && isUserLoggedIn()) {
    try {
        $dbh->addOrder($_SESSION["userCF"], $_POST["dataIns"], $_POST["dataCons"]);
        $cart = $dbh->getCart($_SESSION["userCF"]);

        foreach ($cart as $article) {
            $dbh->addArticleOrder($article['nomeita'], $article['quantità'], $article['taglia']);
        }

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
