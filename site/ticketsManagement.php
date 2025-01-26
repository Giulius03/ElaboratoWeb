<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Tickets Management | Bugs Burnley";
$templateParams["nome"] = "ticketsManager.php";
$templateParams["js"] = array("js/ticketsManager.js");
$templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage');";

require 'template/base.php';
?>