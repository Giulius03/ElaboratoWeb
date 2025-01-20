<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Products | Bugs Burnley";
$templateParams["nome"] = "productsList.php";
$templateParams["js"] = array("js/products.js");

require 'template/base.php';
?>