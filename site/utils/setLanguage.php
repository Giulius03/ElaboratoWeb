<?php
if (isset($_GET["Lang"])) {
    setcookie("Lang", $_GET["Lang"], time() + (60*60*24*30), "/");
}
?>