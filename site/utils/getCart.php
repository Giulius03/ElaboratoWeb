<?php
require_once '../bootstrap.php';

$cart = $dbh->getCart($_SESSION["username"]);

header('Content-Type: application/json');
if (empty($cart)) {
    echo json_encode(['error' => echo $currentLanguage == "en" ? "Empty Cart" : "Carrello Vuoto"]);
    exit;
} else echo json_encode($cart);
?>