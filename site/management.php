<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Management | Bugs Burnley";
$templateParams["nome"] = "manager.php";
$templateParams["js"] = array("js/management.js");
$templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); setUserLogFormLang('$currentLanguage')";

require 'template/base.php';
?>