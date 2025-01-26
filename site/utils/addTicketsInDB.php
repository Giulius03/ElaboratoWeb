<?php
require_once '../bootstrap.php';

$status = ["successful" => false, "error" => ""];

$requiredParams = [
    "matchDate", 
    "matchTime", 
    "opponent", 
    "competition", 
    "quantityGolden", 
    "quantityNorth", 
    "quantitySouth", 
    "quantityRabbit"
];

$missingParams = [];

foreach ($requiredParams as $param) {
    if (!isset($_POST[$param])) {
        $missingParams[] = $param;
    }
}

if (!empty($missingParams)) {
    $status["error"] = "Missing required POST parameters: " . implode(", ", $missingParams);
    error_log("Missing parameters: " . implode(", ", $missingParams));
    echo json_encode($status);
    exit;
}

error_log("Received POST data: " . print_r($_POST, true));

// Controllo se il file è stato caricato
if (isset($_FILES["logo"])) {
    error_log("File received: " . print_r($_FILES["logo"], true));
} else {
    error_log("No logo file uploaded.");
}

if (isset($_FILES["logo"]) && $_FILES["logo"]["error"] === UPLOAD_ERR_OK) {
    $logo = $_FILES["logo"];
    $uploadDir = __DIR__ . "/../upload/";

    // Verifica che il file sia un PNG
    $fileType = mime_content_type($logo["tmp_name"]);
    if ($fileType !== "image/png") {
        error_log("File type is not PNG: " . $fileType);
        $status["error"] = "Only PNG files are allowed.";
        echo json_encode($status);
        exit;
    }

    // Imposta un nome unico per il file per evitare conflitti
    $fileName = uniqid("logo_") . ".png";
    $filePath = $uploadDir . $fileName;

    // Salva il file
    if (!move_uploaded_file($logo["tmp_name"], $filePath)) {
        error_log("Failed to move uploaded file.");
        $status["error"] = "Failed to upload logo file.";
        echo json_encode($status);
        exit;
    }

    error_log("File uploaded successfully: " . $filePath);
} else {
    error_log("No file uploaded or error in file upload.");
    $status["error"] = "No logo file uploaded or error occurred.";
    echo json_encode($status);
    exit;
}

try {
    $tickets = $dbh->addTicketsToDB(
        $_POST["matchDate"], 
        $_POST["matchTime"], 
        $_POST["opponent"], 
        $_POST["competition"],
        $_POST["quantityGolden"], 
        $_POST["quantityNorth"], 
        $_POST["quantitySouth"], 
        $_POST["quantityRabbit"],
        $fileName
    );

    error_log("Tickets added to DB: " . print_r($tickets, true));

    $status["successful"] = true;
} catch (Exception $th) {
    error_log("Exception caught: " . $th->getMessage());
    $status["error"] = $th->getMessage();
}

error_log("Status: " . print_r($status, true));

header('Content-Type: application/json');
echo json_encode($status);
?>
