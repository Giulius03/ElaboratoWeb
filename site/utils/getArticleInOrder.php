<?php
require_once '../bootstrap.php';

$articles = $dbh->getArticlesInOrder($_GET['orderId']);

header('Content-Type: application/json');
echo json_encode($articles);

?>