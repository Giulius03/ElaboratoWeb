<?php
require_once '../bootstrap.php';
$product = $dbh->getArticleByName($_GET["product"], $_GET["size"]);

header('Content-Type: application/json');
echo json_encode($product);

?>