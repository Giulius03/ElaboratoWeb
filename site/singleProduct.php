<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Single Product | Bugs Burnley";
$templateParams["nome"] = "product.php";
$templateParams["js"] = array("js/singleProduct.js");
$templateParams["css"] = array("css/adjustments.css");
$articleName = $_GET["product"];
$templateParams["onloadFunctions"] = "getProduct('$currentLanguage', '$articleName', 'M')";
$templateParams["mediaqueries"] = "css/productPC.css";

require 'template/base.php';
?>