<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Admin Home | Bugs Burnley";
$templateParams["nome"] = "admin.php";
$templateParams["js"] = array("js/adminHome.js");
$templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); getArticles('$currentLanguage')";
$templateParams["css"] = array("css/adjustments.css");

require 'template/base.php';
?>