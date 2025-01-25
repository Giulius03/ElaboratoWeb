<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Admin Home | Bugs Burnley";
$templateParams["nome"] = "admin.php";
$templateParams["js"] = array("js/adminHome.js");
$templateParams["onloadFunctions"] = "getArticles('$currentLanguage')";

require 'template/base.php';
?>