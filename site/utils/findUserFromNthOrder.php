<?php
require_once '../bootstrap.php';
$result = "";
if (isset($_GET["numSeq"])) {
    $result = $dbh->getUserFromNthOrder($_GET["numSeq"]);
}
header('Content-Type: application/json');
echo json_encode($result);
?>