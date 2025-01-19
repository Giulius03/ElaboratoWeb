<?php
require_once '../bootstrap.php';

$article = $dbh->getArticleInfo($_GET['articleID']);

header('Content-Type: application/json');
echo json_encode($article);
?>