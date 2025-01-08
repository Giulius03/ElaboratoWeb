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
            messaggi m ON n.titolo = m.titoloita WHERE u.username = ? ORDER BY n.datainvio DESC;");
        $stmt->bind_param('s', $username);
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

    public function getCart($uCF){
        $stmt = $this->db->prepare("SELECT a.nomeita, a.nomeeng, a.nomeimmagine, a.prezzo, a.descrizioneita, a.descrizioneeng 
        FROM carrelli c
        JOIN articoli a ON a.nomeita = c.articolo
        JOIN utenti u ON c.proprietario = u.CF
        WHERE u.CF = ?");
        $stmt->bind_param('s', $uCF);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

}
?>