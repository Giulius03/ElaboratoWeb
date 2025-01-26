<?php
require_once '../bootstrap.php';

if (isset($_POST['article'])) {
    $article = $_POST['article'];
    try {
        $articles = $dbh->getArticlesBySearch($article);

        header('Content-Type: application/json');
        echo json_encode($articles ?: []);

    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Failed to fetch articles', 'message' => $e->getMessage()]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No article provided']);
}


?>
