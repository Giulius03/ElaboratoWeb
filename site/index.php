<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Home | Bugs Burnley";
$templateParams["nome"] = "home.php";
$templateParams["js"] = array("js/index.js");

require 'template/base.php';
?>