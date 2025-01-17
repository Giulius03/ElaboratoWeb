<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Orders | Bugs Burnley";
$templateParams["nome"] = "ordersTempl.php";
$templateParams["js"] = array("js/orders.js");
$templateParams["onloadFunctions"] = "getArticlesData('$currentLanguage')";

require 'template/base.php';
?>