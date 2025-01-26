<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Notification | Bugs Burnley";
$templateParams["nome"] = "notTempl.php";
$templateParams["js"] = array("js/notification.js");
$templateParams["css"] = array("css/adjustments.css");

$titleita = $_GET["title"];
$sequenceNumber = $_GET["sequenceNumber"];
$templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); seeNotification('$currentLanguage', '$titleita', $sequenceNumber)";

require 'template/base.php';
?>