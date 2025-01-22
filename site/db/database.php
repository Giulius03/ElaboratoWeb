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
        $stmt = $this->db->prepare("SELECT cf, nome, username, password FROM utenti WHERE username = ?");
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
        $today = date("Y-m-d");
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
        WHERE u.CF = ?");
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
}
?>