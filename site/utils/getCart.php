<?php
require_once '../bootstrap.php';

$cart = $dbh->getCart($_SESSION["userCF"]);

header('Content-Type: application/json');

if (empty($cart)) {
    echo json_encode(['error' => $currentLanguage == "en" ? "Empty Cart" : "Carrello Vuoto"]);
    exit;
} else echo json_encode($cart);

?>