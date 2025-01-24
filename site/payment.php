<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Payment | Bugs Burnley";
$templateParams["nome"] = "paymentForm.php";
$templateParams["js"] = array("js/payment.js");
// $templateParams["css"] = array("css/adjustments.css");
// $templateParams["onloadFunctions"] = "setUserLogFormLang('$currentLanguage')";

require 'template/base.php';
?>