<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Products Management | Bugs Burnley";
$templateParams["nome"] = "manageProdForm.php";
$templateParams["js"] = array("js/prodManag.js");
$templateParams["mediaqueries"] = "css/productPC.css";
if (isset($_GET["action"])) {
    $actionID = $_GET["action"];
    $templateParams["onloadFunctions"] = "getAction($actionID, '$currentLanguage')";
}
if (isset($_GET["article"])) {
    $templateParams["article"] = $_GET["article"];
}

require 'template/base.php';
?>