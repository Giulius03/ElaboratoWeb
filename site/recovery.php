<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Recovery | Bugs Burnley";
$templateParams["nome"] = "recoveryForms.php";
$templateParams["js"] = array("js/recovery.js");
$templateParams["css"] = array("css/adjustments.css");
$templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage');";

require 'template/base.php';
?>