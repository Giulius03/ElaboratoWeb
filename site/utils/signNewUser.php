<?php
require_once '../bootstrap.php';

if (!isset($_POST["name"]) || !isset($_POST["lastName"]) || !isset($_POST["birthDate"]) || !isset($_POST["taxIDCode"]) ||
        !isset($_POST["nation"]) || !isset($_POST["city"]) || !isset($_POST["address"]) || !isset($_POST["houseNumber"]) ||
        !isset($_POST["username"]) || !isset($_POST["password"])) {
    header("location: ../signup.php");
}

try {
    $dbh->signUp(($_POST["name"]), ($_POST["lastName"]), ($_POST["birthDate"]), ($_POST["taxIDCode"]), ($_POST["nation"]),
            ($_POST["city"]), $_POST["address"], $_POST["houseNumber"], $_POST["username"], $_POST["password"]);
    header("location: ../index.php");
} catch (Exception $e) {
    echo ($currentLanguage == "en" ? "Something went wrong: " : "Qualcosa è andato storto: ") . $e->getMessage();
}
?>