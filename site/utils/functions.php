<?php
function getIdFromName($name){
    return preg_replace("/[^a-z]/", '', strtolower($name));
}

function isUserLoggedIn(){
    return !empty($_SESSION['username']);
}

function registerLoggedUser($user){
    $_SESSION["userCF"] = $user["cf"];
    $_SESSION["username"] = $user["username"];
    $_SESSION["name"] = $user["nome"];
    $_SESSION["isAdmin"] = $user["admin"] == 1 ? true : false;
}

function isUserAnAdmin() {
    if (!isUserLoggedIn()) {
        return false;
    }
    return $_SESSION["isAdmin"] == true;
}

function generateCode(){
    $_SESSION["recoveryCode"] = strval(rand(1000, 99999));
    return $_SESSION["recoveryCode"];
}

function getEmptyArticle(){
    return array("idarticolo" => "", "titoloarticolo" => "", "imgarticolo" => "", "testoarticolo" => "", "anteprimaarticolo" => "", "categorie" => array());
}

function getAction($action){
    $result = "";
    switch($action){
        case 1:
            $result = "Inserisci";
            break;
        case 2:
            $result = "Modifica";
            break;
        case 3:
            $result = "Cancella";
            break;
    }

    return $result;
}


function uploadImage($path, $image){
    $imageName = basename($image["name"]);
    $fullPath = $path.$imageName;
    
    $maxKB = 500;
    $acceptedExtensions = array("jpg", "jpeg", "png", "gif");
    $result = 0;
    $msg = "";
    //Controllo se immagine è veramente un'immagine
    $imageSize = getimagesize($image["tmp_name"]);
    if($imageSize === false) {
        $msg .= "File caricato non è un'immagine! ";
    }
    //Controllo dimensione dell'immagine < 500KB
    if ($image["size"] > $maxKB * 1024) {
        $msg .= "File caricato pesa troppo! Dimensione massima è $maxKB KB. ";
    }

    //Controllo estensione del file
    $imageFileType = strtolower(pathinfo($fullPath,PATHINFO_EXTENSION));
    if(!in_array($imageFileType, $acceptedExtensions)){
        $msg .= "Accettate solo le seguenti estensioni: ".implode(",", $acceptedExtensions);
    }

    //Controllo se esiste file con stesso nome ed eventualmente lo rinomino
    if (file_exists($fullPath)) {
        $i = 1;
        do{
            $i++;
            $imageName = pathinfo(basename($image["name"]), PATHINFO_FILENAME)."_$i.".$imageFileType;
        }
        while(file_exists($path.$imageName));
        $fullPath = $path.$imageName;
    }

    //Se non ci sono errori, sposto il file dalla posizione temporanea alla cartella di destinazione
    if(strlen($msg)==0){
        if(!move_uploaded_file($image["tmp_name"], $fullPath)){
            $msg.= "Errore nel caricamento dell'immagine.";
        }
        else{
            $result = 1;
            $msg = $imageName;
        }
    }
    return array($result, $msg);
}

?>