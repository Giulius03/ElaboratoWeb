<?php
require_once '../bootstrap.php';

if (!isUserLoggedIn()) {
    $currentLanguage = $currentLanguage == "en" ? "it" : "en";
} else {
    if (isset($_GET["Lang"])) {
        setcookie("Lang".$_SESSION["username"], $_GET["Lang"], time() + (60*60*24*360), "/");
    }
}
?>