<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Notification | Bugs Burnley";
$templateParams["nome"] = "notTempl.php";
$templateParams["js"] = array("js/notification.js");

$titleita = $_GET["title"];
// $titleeng = $_GET["titleeng"];
// $textita = str_replace("'", "\'", $_GET["textita"]);
// $texteng = str_replace("'", "\'", $_GET["texteng"]);
$sequenceNumber = $_GET["sequenceNumber"];
$templateParams["onloadFunctions"] = "seeNotification('$currentLanguage', '$titleita', $sequenceNumber)";

require 'template/base.php';
?>