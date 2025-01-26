<?php
require_once '../bootstrap.php';
$result = "";
if (isset($_GET["numOrder"])) {
    $result = $dbh->getUserFromOrder($_GET["numOrder"]);
}
header('Content-Type: application/json');
echo json_encode($result);
?>