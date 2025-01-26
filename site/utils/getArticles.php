<?php
require_once '../bootstrap.php';

$articles = $dbh->getAllArticles();

header('Content-Type: application/json');
echo json_encode($articles);

?>