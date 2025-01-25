<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Payment | Bugs Burnley";
$templateParams["nome"] = "paymentForm.php";
$templateParams["js"] = array("js/payment.js");
// $templateParams["css"] = array("css/adjustments.css");
if (isset($_GET["cart"]) && $_GET["cart"] == "yes") {
    $templateParams["onloadFunctions"] = "getCookies(true, '', '', 0, 0)";
} else {
    $article = $_GET["article"];
    $size = $_GET["size"];
    $quantity = $_GET["quantity"];
    $price = $_GET["price"];
    $templateParams["onloadFunctions"] = "start(false, '$article', '$size', $price, $quantity)";
}
require 'template/base.php';
?>