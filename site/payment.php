<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Payment | Bugs Burnley";
$templateParams["nome"] = "paymentForm.php";
$templateParams["js"] = array("js/payment.js");

if (isset($_GET["ticket"])) {
    $price = $_GET["smallTickets"] * 29.99 + $_GET["bigTickets"] * 79.99;
    $user = $_SESSION["userCF"];
    $templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); start(false, '', '', $price, 0, true, '$user')";
} else {
    if (isset($_GET["cart"]) && $_GET["cart"] == "yes") {
        $templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); start(true, '', '', 0, 0, false, '')";
    } else {
        $article = $_GET["article"];
        $size = $_GET["size"];
        $quantity = $_GET["quantity"];
        $price = $_GET["price"];
        $templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); start(false, '$article', '$size', $price, $quantity, false, '')";
    }
}

require 'template/base.php';
?>