<?php
require_once '../bootstrap.php';
$favourites = "";

if (isset($_SESSION["userCF"])) {
    $favourites = $dbh->getFavourites($_SESSION["userCF"]);
}

header('Content-Type: application/json');
echo json_encode($favourites);

?>