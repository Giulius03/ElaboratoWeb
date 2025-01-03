<?php
require_once '../bootstrap.php';
$lastReleases = $dbh->getLastReleases();

header('Content-Type: application/json');
echo json_encode($lastReleases);
?>