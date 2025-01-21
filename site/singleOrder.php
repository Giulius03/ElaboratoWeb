<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Single Order | Bugs Burnley";
$templateParams["nome"] = "oneOrder.php";
$templateParams["js"] = array("js/singleOrder.js");
$templateParams["onloadFunctions"] = "setUserLogFormLang('$currentLanguage')";

require 'template/base.php';
?>