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

    public function getCart($username){
        $stmt = $this->db->prepare("SELECT nomeita, nomeeng, nomeimmagine, prezzo, descrizioneita, descrizioneeng FROM carrelli c, articoli a, utenti u WHERE utenti u.username = ? AND
            c.proprietario = u.username AND a.nomeita = c.articolo");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

}
?>