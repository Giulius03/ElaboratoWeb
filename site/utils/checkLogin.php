<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";
$status["admin"] = false;

if (isset($_POST["username"]) && isset($_POST["password"])) {
    $login_result = $dbh->checkLogin($_POST["username"]);
    if (count($login_result) == 0) {
        $status["error"] = $currentLanguage == "en" ? "This account does not exist." : "Questo account non esiste.";
    } else if (!password_verify($_POST["password"], $login_result[0]["password"])) {
        $status["error"] = $currentLanguage == "en" ? "Wrong password." : "Password errata.";
    } else {
        $status["successful"] = true;
        $status["admin"] = $login_result[0]["admin"] == 1 ? true : false;
        registerLoggedUser($login_result[0]);
    }
}

header('Content-Type: application/json');
echo json_encode($status);

?>