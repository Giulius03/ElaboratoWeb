<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

// if (!isUserLoggedIn()) {
//     // $status["error"] = $currentLanguage == "en" ? "You have to be logged in to add a favourite." : "Devi essere loggato per aggiungere un preferito.";
// } else 
if (isset($_POST["article"]) && isset($_POST["size"]) && isUserLoggedIn()) {
    try {
        $dbh->addFavourite($_SESSION["userCF"], $_POST["article"], $_POST["size"]);
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>