<?php
session_start();
define("UPLOAD_DIR", "./upload/");
require_once("utils/functions.php");
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "bugsburnleyshop", 3306);
$currentLanguage = isset($_COOKIE["Lang"]) ? $_COOKIE["Lang"] : "en";
?>