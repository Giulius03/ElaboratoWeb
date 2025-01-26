<?php
require_once '../bootstrap.php';

$buyers = $dbh->getBestBuyers();

$bestBuyers = [];

foreach ($buyers as $buyer) {
    $bestBuyers[] = [
        'name' => $buyer['nome'],
        'surname' => $buyer['cognome'],
        'numOrders' => $buyer['num_ordini'],
        'totalSpent' => $buyer['totale_speso'],
        'frequencyValue' => $buyer['totale_speso'] / $buyer['num_ordini']
    ];
}

header('Content-Type: application/json');
echo json_encode($bestBuyers);
?>
