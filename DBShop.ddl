-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Tue Dec 24 12:17:00 2024 
-- * LUN file: C:\Users\Marco\Desktop\Università\Anno3\TecnologieWeb\Elaborato\DBShop.lun 
-- * Schema: BugsBurnleyShopDB/1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database BugsBurnleyShop;
use BugsBurnleyShop;


-- Tables Section
-- _____________ 

create table ARTICOLI (
     NomeITA varchar(25) not null,
     NomeENG varchar(25) not null,
     NomeImmagine varchar(25) not null,
     Prezzo float not null,
     DescrizioneITA varchar(25) not null,
     DescrizioneENG varchar(25) not null,
     DataInserimento datetime not null,
     Quantità int not null,
     Gruppo varchar(25) not null,
     Valutazione float not null,
     Categoria varchar(15) not null,
     constraint IDTIPO_ARTICOLO primary key (NomeITA),
     constraint IDTIPO_ARTICOLO_1 unique (NomeENG));

create table ARTICOLI_IN_ORDINE (
     Id int not null auto_increment,
     Nome varchar(25) not null,
     Quantità int not null,
     Taglia varchar(3) not null,
     constraint FKR_ID primary key (Id));

create table BIGLIETTI (
     Avversario varchar(25) not null,
     Data date not null,
     Ora time not null,
     Settore varchar(25) not null,
     NumeroPosto int not null,
     Nome varchar(25) not null,
     Cognome varchar(25) not null,
     Ridotto bool not null,
     Prezzo float not null,
     Cliente varchar(16) not null,
     constraint IDBIGLIETTO primary key (Avversario, Data, Ora, Settore, NumeroPosto));

create table CARRELLI (
     Articolo varchar(25) not null,
     Proprietario varchar(16) not null,
     Quantità int not null,
     constraint IDCARRELLO primary key (Articolo, Proprietario));

create table CATEGORIE (
     Nome varchar(25) not null,
     constraint IDCATEGORIA_ID primary key (Nome));

create table COMPOSIZIONI (
     IdArticolo int not null,
     NumeroOrdine int not null,
     constraint IDComposizione primary key (NumeroOrdine, IdArticolo));

create table DISPONIBILITA (
     Articolo varchar(25) not null,
     Taglia varchar(3) not null,
     Quantità int not null,
     constraint IDDisponibilità primary key (Taglia, Articolo));

create table MESSAGGI (
     TitoloITA varchar(25) not null,
     TestoITA varchar(250) not null,
     TitoloENG varchar(25) not null,
     TestoENG varchar(250) not null,
     constraint IDMESSAGGIO_ID primary key (TitoloITA));

create table NOTIFICHE (
     Utente varchar(16) not null,
     Titolo varchar(25) not null,
     NumeroSequenza int not null,
     Letta bool not null,
     constraint IDNOTIFICA primary key (Utente, Titolo, NumeroSequenza));

create table ORDINI (
     Numero int not null,
     Stato varchar(100) not null,
     CF varchar(16) not null,
     constraint IDORDINE primary key (Numero));

create table PARTITE (
     Competizione varchar(25) not null,
     Avversario varchar(25) not null,
     Data date not null,
     Ora time not null,
     Logo varchar(25) not null,
     CurvaNDisp int not null,
     CurvaSDisp int not null,
     TribOroDisp int not null,
     TribConiglioDisp int not null,
     constraint IDPARTITA_ID primary key (Avversario, Data, Ora));

create table PREFERITI (
     Utente varchar(25) not null,
     Articolo varchar(25) not null,
     constraint IDPreferito primary key (Articolo, Utente));

create table TAGLIE (
     Nome varchar(3) not null,
     constraint IDTAGLIA primary key (Nome));

create table UTENTI (
     CF varchar(16) not null,
     Nome varchar(15) not null,
     Cognome varchar(20) not null,
     DataNascita date not null,
     Nazione varchar(30) not null,
     Città varchar(25) not null,
     Via varchar(25) not null,
     NumeroCivico int not null,
     Username varchar(40) not null,
     Password varchar(255) not null,
     Admin boolean not null,
     constraint IDUTENTE primary key (CF),
     constraint IDUTENTE_1 unique (Username)
);

create table CARTE (
     NumeroCarta int not null,
     Intestatario varchar(55) not null,
     DataScadenza date not null,
     Utilizzatore varchar(16) not null,
     constraint IDCARTA primary key (NumeroCarta)
);


-- Constraints Section
-- ___________________ 

alter table CARTE add constraint FKUtilizzatore
     foreign key (Utilizzatore)
     references UTENTI (CF);

alter table ARTICOLI add constraint FKAppartenenza
     foreign key (Categoria)
     references CATEGORIE (Nome);

alter table ARTICOLI_IN_ORDINE add constraint FKR_FK
     foreign key (Nome)
     references ARTICOLI (NomeITA);

alter table ARTICOLI_IN_ORDINE add constraint FKR_1
     foreign key (Taglia)
     references TAGLIE (Nome);

alter table BIGLIETTI add constraint FKRiferimento
     foreign key (Avversario, Data, Ora)
     references PARTITE (Avversario, Data, Ora);

alter table BIGLIETTI add constraint FKCompra
     foreign key (Cliente)
     references UTENTI (CF);

alter table CARRELLI add constraint FKProprietario
     foreign key (Proprietario)
     references UTENTI (CF);

alter table CARRELLI add constraint FKArticolo
     foreign key (Articolo)
     references ARTICOLI (NomeITA);

-- Not implemented
-- alter table CATEGORIA add constraint IDCATEGORIA_CHK
--     check(exists(select * from ARTICOLO
--                  where ARTICOLO.Categoria = Nome)); 

alter table COMPOSIZIONI add constraint FKNumeroOrdine
     foreign key (NumeroOrdine)
     references ORDINI (Numero);

alter table COMPOSIZIONI add constraint FKArticoloOrdine
     foreign key (IdArticolo)
     references ARTICOLI_IN_ORDINE (Id);

alter table DISPONIBILITA add constraint FKTaglia
     foreign key (Taglia)
     references TAGLIE (Nome);

alter table DISPONIBILITA add constraint FKNome
     foreign key (Articolo)
     references ARTICOLI (NomeITA);

-- Not implemented
-- alter table MESSAGGIO add constraint IDMESSAGGIO_CHK
--     check(exists(select * from NOTIFICA
--                  where NOTIFICA.Titolo = Titolo)); 

alter table NOTIFICHE add constraint FKMessaggio
     foreign key (Titolo)
     references MESSAGGI (TitoloITA);

alter table NOTIFICHE add constraint FKUtente
     foreign key (Utente)
     references UTENTI (CF);

alter table ORDINI add constraint FKEffettuazione
     foreign key (CF)
     references UTENTI (CF);

-- Not implemented
-- alter table PARTITA add constraint IDPARTITA_CHK
--     check(exists(select * from BIGLIETTO
--                  where BIGLIETTO.Avversario = Avversario and BIGLIETTO.Data = Data and BIGLIETTO.Ora = Ora)); 

alter table PREFERITI add constraint FKNomeITA
     foreign key (Articolo)
     references ARTICOLI (NomeITA);

alter table PREFERITI add constraint FKUsername
     foreign key (Utente)
     references UTENTI (CF);


-- Index Section
-- _____________ 

insert into CATEGORIE (Nome) values
("Abbigliamento"),
("Souvenir");

insert into TAGLIE (Nome) values
("No"),
("XS"),
("S"),
("M"),
("L"),
("XL"),
("XXL");

insert into MESSAGGI (TitoloENG, TestoENG, TitoloITA, TestoITA) values
("Welcome discount !", "Hi, welcome to our web site!\nAs a new user, you are entitled to a 30% discount for your first purchase, enjoy it!", "Sconto di benvenuto !", "Ciao, benvenuto sul nostro sito web!\nCome nuovo utente, hai diritto a uno sconto del 30% per il tuo primo acquisto, goditelo!"),
("Order confirmed !", "Your order has been confirmed by the seller and is ready to go. Thank you for purchasing from us!", "Ordine confermato !", "Il tuo ordine è stato confermato dal venditore ed è pronto a partire. Grazie per aver acquistato da noi!"),
("Order requested", "An order has been requested by a user. Please click in the button below to confirm it.", "Ordine richiesto", "Un ordine è stato richiesto da un utente. Fare clic sul pulsante in basso per confermarlo."),
("Order delivered", "Your order has been just delivered, enjoy it!\nIf you want, you can leave a review of the product(s) you ordered. We hope it will be good!\nCan't wait for your next order, bye!", "Ordine consegnato", "Il tuo ordine è stato appena consegnato, goditelo!\Se vuoi, puoi lasciare una recensione del/i prodotto/i che hai ordinato. Speriamo che sia buona!\nTi aspettiamo per un altro ordine, ciao!");

