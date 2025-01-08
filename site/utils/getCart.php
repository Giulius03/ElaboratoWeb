<?php
require_once '../bootstrap.php';

$cart = $dbh->getCart($_SESSION["userCF"]);

header('Content-Type: application/json');
echo json_encode($cart);

?>