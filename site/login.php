<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Log In | Bugs Burnley";
$templateParams["nome"] = "userLog.php";
$templateParams["js"] = array("js/userLog.js");
$templateParams["css"] = array("css/adjustments.css");

require 'template/base.php';
?>