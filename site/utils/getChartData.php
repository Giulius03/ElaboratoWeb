<?php
require_once '../bootstrap.php';

$articles = $dbh->getArticles();
$chart = [];

foreach ($articles as $article){
    $articleData = $dbh->getChartData($article["nomeita"]);
    var_dump($articleData);
    if (is_array($articleData)) {
        foreach ($articleData as $data) {
            $chart[] = [
                'group' => $data['nomeita'],
                'groupIta' => $data['nomeeng'],
                'revenue' => $data['prezzo'] * $data['quantità']
            ];
        }
    }
}

foreach ($chart as $data) {
    echo implode(',', $data) . "<br>";
}
?>
