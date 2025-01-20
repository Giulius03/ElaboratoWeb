<?php
require_once '../bootstrap.php';

$articles = $dbh->getArticlesByCat($_GET["category"]);

header('Content-Type: application/json');
echo json_encode($articles);

?>