<?php
require_once '../bootstrap.php';

$match = $dbh->getMatch();

header('Content-Type: application/json');
echo json_encode($match);
?>