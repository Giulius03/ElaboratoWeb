<?php
class DatabaseHelper{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $db->connect_error);
        }        
    }  

    public function getLastReleases(){
        $stmt = $this->db->prepare("SELECT nomeita, nomeeng, nomeimmagine, prezzo FROM articoli ORDER BY datainserimento DESC LIMIT 5");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getMostWanted(){
        $stmt = $this->db->prepare("SELECT nomeita, nomeeng, nomeimmagine, prezzo, COUNT(*) as numeroacquisti 
            FROM articoli a INNER JOIN articoli_in_ordine aio on a.nomeita = aio.nome GROUP BY nomeita, nomeeng,
            nomeimmagine, prezzo ORDER BY numeroacquisti DESC LIMIT 5");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function signUp($name, $lastName, $birthDate, $taxIDCode, $nation, $city, $address, $houseNumber, $username, $password){
        $hashPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare("INSERT INTO utenti (nome, cognome, datanascita, cf, nazione, città, via, numerocivico,
            username, password, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)");
        $stmt->bind_param('sssssssiss', $name, $lastName, $birthDate, $taxIDCode, $nation, $city, $address, $houseNumber, $username, $hashPassword);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function checkLogin($username){
        $stmt = $this->db->prepare("SELECT cf, nome, username, password, admin FROM utenti WHERE username = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function changePassword($username, $newPassword){
        $hashNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare("UPDATE utenti SET password = ? WHERE username = ?");
        $stmt->bind_param('ss', $hashNewPassword, $username);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    public function getNotifications($username){
        $stmt = $this->db->prepare("SELECT m.titoloita AS titoloita, m.titoloeng AS titoloeng, m.testoita AS testoita, 
            m.testoeng AS testoeng, n.letta AS letta, n.numerosequenza AS numseq FROM utenti u INNER JOIN notifiche n ON u.cf = n.utente INNER JOIN 
            messaggi m ON n.titolo = m.titoloita WHERE u.username = ? ORDER BY n.datainvio DESC");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getNotification($userCF, $title, $sequenceNumber) {
        $stmt = $this->db->prepare("SELECT m.titoloita AS titoloita, m.titoloeng AS titoloeng, m.testoita AS testoita, 
            m.testoeng AS testoeng, n.numerosequenza AS numseq FROM utenti u INNER JOIN notifiche n ON u.cf = n.utente INNER JOIN 
            messaggi m ON n.titolo = m.titoloita WHERE n.utente = ? AND n.titolo = ? AND n.numerosequenza = ?");
        $stmt->bind_param('ssi', $userCF, $title, $sequenceNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function deleteNotification($userCF, $title, $sequenceNumber) {
        $stmt = $this->db->prepare("DELETE FROM notifiche WHERE utente = ? AND titolo = ? AND numerosequenza = ?");
        $stmt->bind_param('ssi', $userCF, $title, $sequenceNumber);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    public function deleteAllNotifications($userCF) {
        $stmt = $this->db->prepare("DELETE FROM notifiche WHERE utente = ?");
        $stmt->bind_param('s', $userCF);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    public function readNotification($userCF, $title, $sequenceNumber) {
        $stmt = $this->db->prepare("UPDATE notifiche SET letta = 1 WHERE utente = ? AND titolo = ? AND numerosequenza = ?");
        $stmt->bind_param('ssi', $userCF, $title, $sequenceNumber);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    public function readAllNotifications($userCF) {
        $stmt = $this->db->prepare("UPDATE notifiche SET letta = 1 WHERE utente = ?");
        $stmt->bind_param('s', $userCF);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    private function calculateSequenceNumber($userCF, $title) {
        $stmt = $this->db->prepare("SELECT MAX(NumeroSequenza) as seqNumMax FROM notifiche WHERE utente = ? AND titolo = ?");
        $stmt->bind_param('ss', $userCF, $title);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function sendNotification($userCF, $title) {
        $result = $this->calculateSequenceNumber($userCF, $title);
        $stmt = $this->db->prepare("INSERT INTO notifiche (utente, titolo, numerosequenza, letta, datainvio) VALUES 
            (?, ?, ?, 0, ?)");
        $sequenceNumber = is_null($result[0]["seqNumMax"]) ? 1 : ($result[0]["seqNumMax"] + 1);
        $today = date("Y-m-d H:i:s");
        $stmt->bind_param('ssis', $userCF, $title, $sequenceNumber, $today);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function getCart($uCF){
        $stmt = $this->db->prepare("SELECT a.nomeita, a.nomeeng, a.nomeimmagine, a.prezzo, a.descrizioneita, a.descrizioneeng, c.quantità, c.taglia 
        FROM carrelli c
        JOIN articoli a ON a.nomeita = c.articolo
        JOIN utenti u ON c.proprietario = u.CF
        WHERE u.CF = ?");
        $stmt->bind_param('s', $uCF);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFavourites($uCF){
        $stmt = $this->db->prepare("SELECT a.nomeita, a.nomeeng, a.nomeimmagine, a.prezzo, a.descrizioneita, a.descrizioneeng, p.taglia
        FROM preferiti p
        JOIN articoli a ON a.nomeita = p.articolo
        JOIN utenti u ON p.utente = u.CF
        WHERE u.CF = ?");
        $stmt->bind_param('s', $uCF);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addToCart($uCF, $articolo, $quantity, $size){
        $stmt = $this->db->prepare("DELETE FROM carrelli WHERE articolo = ? AND proprietario = ? AND taglia = ?");
        $stmt->bind_param('sss', $articolo, $uCF, $size);
        $stmt->execute();
        $stmt = $this->db->prepare("INSERT INTO carrelli (articolo, proprietario, taglia, quantità) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('sssi', $articolo, $uCF, $size, $quantity);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function deleteFromCart($uCF, $articolo){
        $stmt = $this->db->prepare("DELETE FROM carrelli WHERE articolo = ? AND proprietario = ?");
        $stmt->bind_param('ss', $articolo, $uCF);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            return ['success' => true];
        } else {
            return ['success' => false];
        }
    }

    public function deleteFromFavs($uCF, $articolo){
        $stmt = $this->db->prepare("DELETE FROM preferiti WHERE utente = ? AND articolo = ?");
        $stmt->bind_param('ss', $uCF, $articolo);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            return ['success' => true];
        } else {
            return ['success' => false];
        }
    }

    public function getOrders($uCF){
        $stmt = $this->db->prepare("SELECT o.numero
        FROM ordini o
        JOIN utenti u ON o.CF = u.CF
        WHERE u.CF = ?
        ORDER BY o.numero DESC");
        $stmt->bind_param('s', $uCF);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getArticlesInOrder($numeroOrdine){
        $stmt = $this->db->prepare("SELECT aio.Id, aio.nome, aio.quantità, aio.taglia, c.numeroordine
        FROM articoli_in_ordine aio
        JOIN composizioni c ON aio.Id = c.idarticolo
        WHERE c.numeroordine = ?");
        $stmt->bind_param('i', $numeroOrdine);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getArticleInfo($IDArticolo){
        $stmt = $this->db->prepare("SELECT a.nomeita, a.nomeeng, a.nomeimmagine, a.prezzo, aio.quantità, aio.taglia
        FROM articoli a
        JOIN articoli_in_ordine aio ON a.nomeita = aio.nome
        WHERE aio.Id = ?");
        $stmt->bind_param('i', $IDArticolo);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getArticleByName($italianName, $size){
        $stmt = $this->db->prepare("SELECT a.nomeita AS nomeita, a.nomeeng AS nomeeng, a.nomeimmagine AS img, a.prezzo AS 
        prezzo, a.descrizioneita AS descita, a.descrizioneeng AS desceng, a.gruppo AS gruppo, a.categoria AS categoria, 
        a.quantità AS quantTot, (SELECT COUNT(articolo) FROM preferiti WHERE articolo = nomeita) AS likes, 
        (SELECT AVG(c.valutazione) FROM articoli_in_ordine aio INNER JOIN composizioni c ON aio.Id = c.IdArticolo WHERE 
        aio.Nome = nomeita) AS valutazione,
        (SELECT quantità FROM disponibilita WHERE taglia = ? AND articolo = nomeita) AS quantDispTaglia
        FROM articoli a WHERE a.nomeita = ?");
        $stmt->bind_param('ss', $size, $italianName);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function startOrder($sequenceNumber) {
        $stmt = $this->db->prepare("UPDATE ordini SET stato = 1 WHERE numero = (SELECT numero FROM ordini ORDER BY 
            datainserimento LIMIT 1 OFFSET ?)");
        $sequenceNumber--;
        $stmt->bind_param('i', $sequenceNumber);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    public function getUserFromNthOrder($sequenceNumber) {
        $stmt = $this->db->prepare("SELECT cf FROM ordini ORDER BY datainserimento LIMIT 1 OFFSET ?");
        $sequenceNumber--;
        $stmt->bind_param('i', $sequenceNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function evaluateOrder($userCF, $value, $sequenceNumber) {
        $stmt = $this->db->prepare("UPDATE composizioni SET valutazione = ? WHERE numeroordine = (SELECT numero FROM 
            ordini WHERE cf = ? ORDER BY dataconsegna LIMIT 1 OFFSET ?)");
        $sequenceNumber--;
        $stmt->bind_param('isi', $value, $userCF, $sequenceNumber);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    public function isOrderAlreadyEvaluated($userCF, $sequenceNumber) {
        $stmt = $this->db->prepare("SELECT o.numero AS numordine, c.valutazione AS valutazione FROM ordini o INNER JOIN composizioni c ON o.numero =
        c.numeroordine WHERE o.numero = (SELECT numero FROM ordini WHERE cf = ? ORDER BY dataconsegna LIMIT 1 OFFSET ?) GROUP BY o.numero");
        $sequenceNumber--;
        $stmt->bind_param('si',$userCF, $sequenceNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getArticlesByCat($gruppo){
        $stmt = $this->db->prepare("SELECT a.gruppo, a.nomeita, a.nomeeng, a.nomeimmagine, a.prezzo
        FROM articoli a
        WHERE a.gruppo = ?");
        $stmt->bind_param('s', $gruppo);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getShippingInfo($numeroOrdine){
        $stmt = $this->db->prepare("SELECT o.datainserimento, o.stato
        FROM ordini o
        WHERE o.numero = ?");
        $stmt->bind_param('i', $numeroOrdine);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addFavourite($userCF, $articleNameIta, $size) {
        $stmt = $this->db->prepare("INSERT INTO preferiti (utente, articolo, taglia) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $userCF, $articleNameIta, $size);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function getRelatedArticles($group, $category, $currentArticle) {
        $query = "SELECT nomeita, nomeeng, nomeimmagine, prezzo FROM articoli WHERE ";
        $types = "";
        $optParam = "";
        if ($group != "Divise") {
            $query .= "gruppo <> ? AND ";
            $optParam = $group;
        } else {
            $query .= "nomeita <> ? AND ";
            $optParam = $currentArticle;
        }
        $query .= "categoria = ? ORDER BY RAND() LIMIT 5";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $optParam, $category);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getMatch(){
        $stmt = $this->db->prepare("SELECT p.competizione, p.avversario, p.data, p.ora, p.logo, p.curvandisp, p.curvasdisp, p.triborodisp, p.tribconigliodisp
        FROM partite p");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addToTickets($uCF, $matchDate, $matchTime, $avversario, $area, $name, $surname, $ridotto, $prezzo, $ticketNumber){
        $stmt = $this->db->prepare("INSERT INTO biglietti (avversario, `data`, ora, settore, numeroposto, nome, cognome, ridotto, prezzo, cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssissdis', $avversario, $matchDate, $matchTime, $area, $ticketNumber, $name, $surname, $ridotto, $prezzo, $uCF);
        $stmt->execute();
        
        if ($stmt->error) {
            return ["successful" => false, "error" => $stmt->error];
        }
    
        $updateQuery = "";
        switch ($area) {
            case 'Golden Grandstand':
                $updateQuery = "UPDATE partite SET triborodisp = triborodisp - 1 WHERE avversario = ? AND `data` = ? AND ora = ?";
                break;
            case 'North Curve':
                $updateQuery = "UPDATE partite SET curvandisp = curvandisp - 1 WHERE avversario = ? AND `data` = ? AND ora = ?";
                break;
            case 'South Curve':
                $updateQuery = "UPDATE partite SET curvasdisp = curvasdisp - 1 WHERE avversario = ? AND `data` = ? AND ora = ?";
                break;
            case 'Rabbit Grandstand':
                $updateQuery = "UPDATE partite SET tribconigliodisp = tribconigliodisp - 1 WHERE avversario = ? AND `data` = ? AND ora = ?";
                break;
            default:
                return ["successful" => false, "error" => "Area non valida: " . $area];
        }
    
        $stmtUpdate = $this->db->prepare($updateQuery);
        $stmtUpdate->bind_param('sss', $avversario, $matchDate, $matchTime);
        $stmtUpdate->execute();
        
        if ($stmtUpdate->error) {
            return ["successful" => false, "error" => $stmtUpdate->error];
        }
    
        return ["successful" => true, "error" => ""];
    }

    public function addOrder($uCF, $dataIns, $dataCons){
        $result = $this->db->query("SELECT MAX(numero) AS max_numero FROM ordini");
        $row = $result->fetch_assoc();
        $numero = $row['max_numero'] ? $row['max_numero'] + 1 : 1;
        $stato = 0;
        $stmt = $this->db->prepare("INSERT INTO ordini (numero, stato, CF, datainserimento, dataconsegna) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('iisss', $numero, $stato, $uCF, $dataIns, $dataCons);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function addArticleOrder($nome, $quantity, $size){
        $result = $this->db->query("SELECT MAX(Id) AS max_id FROM articoli_in_ordine");
        $row = $result->fetch_assoc();
        $id = $row['max_id'] ? $row['max_id'] + 1 : 1;
        $stmt = $this->db->prepare("INSERT INTO articoli_in_ordine (Id, nome, quantità, taglia) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('isis', $id, $nome, $quantity, $size);
        $stmt->execute();

        $resultNum = $this->db->query("SELECT MAX(numero) AS max_numero FROM ordini");
        $rowNum = $resultNum->fetch_assoc();
        $numero = $rowNum['max_numero'];
        $stmt = $this->db->prepare("INSERT INTO composizioni (IdArticolo, numeroordine) VALUES (?, ?)");
        $stmt->bind_param('ii', $id, $numero);
        $stmt->execute();

        $product = $this->getArticleByName($nome, $size);
        if ($product[0]["categoria"] == "Abbigliamento") {
            $stmt = $this->db->prepare("UPDATE disponibilita SET quantità = ? WHERE articolo = ? AND taglia = ?");
            $newQuantity = $product[0]["quantDispTaglia"] - $quantity;
            $stmt->bind_param('iss', $newQuantity, $nome, $size);
            $stmt->execute();
        }
        $stmt = $this->db->prepare("UPDATE articoli SET quantità = ? WHERE nomeita = ?");
        $newQuantity = $product[0]["quantTot"] - $quantity;
        $stmt->bind_param('is', $newQuantity, $nome);
        $stmt->execute();
        // return $stmt->insert_id;
    }

    public function aggiornaStato($orderNumber){
        $stmt = $this->db->prepare("UPDATE ordini SET stato = stato + 1 WHERE numero = ?");
        $stmt->bind_param('i', $orderNumber);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function getNumberOfOrders($userCF){
        $stmt = $this->db->prepare("SELECT COUNT(*) as numOrdini FROM ordini WHERE cf = ?");
        $stmt->bind_param('s', $userCF);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addCard($cardNumber, $holder, $expiry, $userCF) {
        $stmt = $this->db->prepare("INSERT INTO carte (numerocarta, intestatario, datascadenza, utilizzatore) VALUES 
            (?, ?, ?, ?)");
        $stmt->bind_param('ssss', $cardNumber, $holder, $expiry, $userCF);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function getCard($userCF) {
        $stmt = $this->db->prepare("SELECT numerocarta, intestatario, datascadenza FROM carte WHERE utilizzatore = ?");
        $stmt->bind_param('s', $userCF);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addProduct($category, $italianName, $englishName, $imageName, $price, $italianDescription, $englishDescription, $group, $quantity){
        $stmt = $this->db->prepare("INSERT INTO articoli (categoria, nomeita, nomeeng, nomeimmagine, prezzo, descrizioneita,
            descrizioneeng, gruppo, quantità, datainserimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $today = date("Y-m-d H:i:s");
        $tot = $category != "Souvenir" ? ($quantity * 6) : $quantity;
        $stmt->bind_param('ssssdsssis', $category, $italianName, $englishName, $imageName, $price, $italianDescription, 
            $englishDescription, $group, $tot, $today);
        $stmt->execute();
        if ($category == "Abbigliamento") {
            $this->addDisponibility($italianName, $quantity);
        }
        return $stmt->insert_id;
    }

    private function addDisponibility($italianName, $quantity) {
        $sizes = ["XS", "S", "M", "L", "XL", "XXL"];
        for ($i = 0; $i < count($sizes); $i++) {
            $stmt = $this->db->prepare("INSERT INTO disponibilita (articolo, taglia, quantità) VALUES (?, ?, ?)");
            $stmt->bind_param('ssi', $italianName, $sizes[$i], $quantity);
            $stmt->execute();
        }
    }
    public function getArticles(){
        $stmt = $this->db->prepare("SELECT a.nomeita, a.nomeeng
        FROM articoli a");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function deleteArticles($articolo){
        $stmt = $this->db->prepare("UPDATE articoli SET quantità = 0 WHERE nomeita = ?");
        $stmt->bind_param('s', $articolo);
        $stmt->execute();
        $stmt = $this->db->prepare("UPDATE disponibilita SET quantità = 0 WHERE articolo = ?");
        $stmt->bind_param('s', $articolo);
        $stmt->execute();
    }

    public function getChartData($articolo){
        $stmt = $this->db->prepare("SELECT aio.quantità, a.nomeita, a.nomeeng, a.prezzo
        FROM articoli_in_ordine aio
        JOIN articoli a ON aio.nome = a.nomeita
        WHERE a.nomeita = ?
        LIMIT 5");
        $stmt->bind_param('s', $articolo);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getBestBuyers(){
        $stmt = $this->db->prepare("SELECT u.nome, u.cognome, COUNT(o.numero) AS num_ordini, SUM(a.prezzo * aio.quantità) AS totale_speso
        FROM utenti u
        JOIN ordini o ON o.CF = u.CF
        JOIN composizioni c ON c.numeroordine = o.numero
        JOIN articoli_in_ordine aio ON aio.Id = c.Idarticolo
        JOIN articoli a ON a.nomeita = aio.nome
        GROUP BY u.CF
        ORDER BY num_ordini DESC
        LIMIT 5");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function updateProduct($toUpdate, $newNameIta, $newNameEng, $newImage, $newPrice, $newDescIta, $newDescEng, $newQuantity, $newGroup, $newCat){
        if ($newCat == "Abbigliamento") {
            $sizes = ["XS", "S", "M", "L", "XL", "XXL"];
            for ($i = 0; $i < count($sizes); $i++) {
                $stmt = $this->db->prepare("UPDATE disponibilita SET articolo = ?, quantità = ? WHERE articolo = ? AND taglia = ?");
                $stmt->bind_param('siss', $newNameIta, $newQuantity, $toUpdate, $sizes[$i]);
                $stmt->execute();
            }
        }
        $stmt = $this->db->prepare("UPDATE articoli SET nomeita = ?, nomeeng = ?, nomeimmagine = ?, prezzo = ?,
            descrizioneita = ?, descrizioneeng = ?, quantità = ?, gruppo = ?, categoria = ? WHERE nomeita = ?");
        $tot = $newCat != "Souvenir" ? ($newQuantity * 6) : $newQuantity;
        $stmt->bind_param('sssdssisss', $newNameIta, $newNameEng, $newImage, $newPrice, $newDescIta, $newDescEng, $tot,
            $newGroup, $newCat, $toUpdate);
        $stmt->execute();
        return $stmt->affected_rows;
    }
}
?>