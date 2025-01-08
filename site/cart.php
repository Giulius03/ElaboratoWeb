<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Shopping Cart | Bugs Burnley";
$templateParams["nome"] = "shoppingCart.php";
$templateParams["js"] = array("js/cart.js");
$templateParams["onloadFunctions"] = "getArticlesData('$currentLanguage')";

require 'template/base.php';
?>