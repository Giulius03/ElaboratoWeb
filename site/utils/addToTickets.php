<?php
require_once '../bootstrap.php';

$status["successful"] = false;
$status["error"] = "";

if (isset($_SESSION["userCF"]) && isset($_POST["matchDate"]) && isset($_POST["matchTime"]) && isset($_POST["avversario"]) && isset($_POST["area"]) && isset($_POST["quantity"]) 
    && isset($_POST["name"]) && isset($_POST["surname"]) && isset($_POST["ridotto"]) && isset($_POST["prezzo"]) && isset($_POST["ticketNum"])) {
    try {
        $quantity = $_POST["quantity"];
        $ticketNumber = $_POST["ticketNum"];
        for ($i = 0; $i < $quantity; $i++) { 
            $ticket = $dbh->addToTickets($_SESSION["userCF"], $_POST["matchDate"], $_POST["matchTime"], $_POST["avversario"], $_POST["area"],
            $_POST["name"], $_POST["surname"], $_POST["ridotto"], $_POST["prezzo"], $ticketNumber);
            $ticketNumber --;
        }
        
        $status["successful"] = true;
    } catch (Exception $th) {
        $status["error"] = $th->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($status);
?>