<?php
require_once 'bootstrap.php';

$templateParams["titolo"] = "Tickets | Bugs Burnley";
$templateParams["nome"] = "ticket.php";
$templateParams["js"] = array("js/tickets.js");
$templateParams["onloadFunctions"] = "getMatchData('$currentLanguage');";

require 'template/base.php';
?>