<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Products | Bugs Burnley";
$templateParams["nome"] = "search.php";
$templateParams["js"] = array("js/fromSearch.js");
$templateParams["onloadFunctions"] = "setUserLogFormLang('$currentLanguage')";

require 'template/base.php';
?>