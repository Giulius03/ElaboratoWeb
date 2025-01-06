<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_POST["name"]) && isset($_POST["lastName"]) && isset($_POST["birthDate"]) && isset($_POST["taxIDCode"]) &&
        isset($_POST["nation"]) && isset($_POST["city"]) && isset($_POST["address"]) && isset($_POST["houseNumber"]) &&
        isset($_POST["username"]) && isset($_POST["password"])) {
    
    try {
        $dbh->signUp(($_POST["name"]), ($_POST["lastName"]), ($_POST["birthDate"]), ($_POST["taxIDCode"]), ($_POST["nation"]),
            ($_POST["city"]), $_POST["address"], $_POST["houseNumber"], $_POST["username"], $_POST["password"]);
        $status["successful"] = true;
    } catch (Exception $e) {
        $status["error"] = $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>