<?php
require_once '../bootstrap.php';

$relatedArticles = null;
if (isset($_GET["group"]) && isset($_GET["category"])) {
    $relatedArticles = $dbh->getRelatedArticles($_GET["group"], $_GET["category"]);
}

header('Content-Type: application/json');
echo json_encode($relatedArticles);
?>