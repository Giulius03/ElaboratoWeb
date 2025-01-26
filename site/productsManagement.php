<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Products Management | Bugs Burnley";
$templateParams["nome"] = "manageProdForm.php";
$templateParams["js"] = array("js/prodManag.js");
$templateParams["mediaqueries"] = "css/productPC.css";
$article = "";
if (isset($_GET["action"])) {
    $actionID = $_GET["action"];
}
if (isset($_GET["article"])) {
    $article = $_GET["article"];
}
$templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); getAction($actionID, '$currentLanguage', '$article')";

require 'template/base.php';
?>