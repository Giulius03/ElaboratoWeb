<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Favourites | Bugs Burnley";
$templateParams["nome"] = "favouritesTempl.php";
$templateParams["js"] = array("js/favourites.js");
$templateParams["onloadFunctions"] = "checkNotifications('$currentLanguage'); getArticlesData('$currentLanguage')";

require 'template/base.php';
?>