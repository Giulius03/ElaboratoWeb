<?php
require_once '../bootstrap.php';
$mostWanted = $dbh->getMostWanted();

header('Content-Type: application/json');
echo json_encode($mostWanted);
?>