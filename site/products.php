<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Products | Bugs Burnley";
$templateParams["nome"] = "productsList.php";
$templateParams["js"] = array("js/products.js");
$templateParams["css"] = array("css/adjustments.css");
$templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); setUserLogFormLang('$currentLanguage')";

require 'template/base.php';
?>