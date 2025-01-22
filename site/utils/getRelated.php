<?php
require_once '../bootstrap.php';

$relatedArticles = null;
if (isset($_GET["group"]) && isset($_GET["category"]) && isset($_GET["currentArticle"])) {
    $relatedArticles = $dbh->getRelatedArticles($_GET["group"], $_GET["category"], $_GET["currentArticle"]);
}

header('Content-Type: application/json');
echo json_encode($relatedArticles);
?>