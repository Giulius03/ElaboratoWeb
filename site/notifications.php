<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Notifications | Bugs Burnley";
$templateParams["nome"] = "nots.php";
$templateParams["js"] = array("js/notifications.js");
$templateParams["css"] = array("css/adjustments.css");
if (isset($_SESSION["username"])) {
    $templateParams["onloadFunctions"] = "getNotifications('$currentLanguage'); getSingleNotification('$currentLanguage', '', 0);";
}

require 'template/base.php';
?>