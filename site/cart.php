<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Shopping Cart | Bugs Burnley";
$templateParams["nome"] = "shoppingCart.php";
$templateParams["js"] = array("js/cart.js");
$templateParams["css"] = array("css/cartStyle.css");

require 'template/base.php';
?>