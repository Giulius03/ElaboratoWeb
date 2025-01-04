<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Sign Up | Bugs Burnley";
$templateParams["nome"] = "userForm.php";
$templateParams["js"] = array("js/userForm.js");

require 'template/base.php';
?>