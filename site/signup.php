<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Sign Up | Bugs Burnley";
$templateParams["nome"] = "userReg.php";
$templateParams["js"] = array("js/userReg.js");

require 'template/base.php';
?>