<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Home | Bugs Burnley";
$templateParams["nome"] = "home.php";
$templateParams["js"] = array("js/index.js");
$templateParams["onloadFunctions"] = "getArticlesData(true, '$currentLanguage'); getArticlesData(false, '$currentLanguage')";

require 'template/base.php';
?>