<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Shopping Cart| Bugs Burnley";
$templateParams["nome"] = "shoppingCart.php";
$templateParams["js"] = array("js/cart.js");
//$templateParams["css"] = array("css/loginStyle.css");

require 'template/base.php';
?>