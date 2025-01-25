<?php
require_once '../bootstrap.php';

$card = $dbh->getCard($_SESSION["userCF"]);

header('Content-Type: application/json');
echo json_encode($card);

?>