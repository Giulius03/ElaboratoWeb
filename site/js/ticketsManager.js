// Cambio della lingua del form
function setUserLogFormLang(lang) {
    document.getElementById('title').textContent =
        lang === "en" ? "TICKETS MANAGEMENT" : "GESTIONE DEI BIGLIETTI";
}

// Gestione dei bottoni per la selezione della lingua
const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener("click", () => setUserLogFormLang("it"));
btnItaPC.addEventListener("click", () => setUserLogFormLang("it"));
btnEngPhone.addEventListener("click", () => setUserLogFormLang("en"));
btnEngPC.addEventListener("click", () => setUserLogFormLang("en"));

// Azione per la selezione e il caricamento del file
document.getElementById('customFileButton').addEventListener('click', () => {
    document.getElementById('logo').click(); // Mostra il file picker
});

// Mostra il nome del file selezionato
document.getElementById('logo').addEventListener('change', () => {
    const fileName = document.getElementById('logo').files[0]?.name || 'Nessun file selezionato';
    document.getElementById('fileNameDisplay').textContent = fileName;
    document.getElementById('fileNameDisplay').style.display = 'inline';
});

// Invio del form per aggiungere i biglietti
document.getElementById("addTicketButton").addEventListener("click", (event) => {
    event.preventDefault();
    addTicketsInDB();
});

// Funzione per inviare i dati al server
async function addTicketsInDB() {
    const competition = document.getElementById("competitionBox").value;
    const opponent = document.getElementById("opponentBox").value;
    const quantityGold = document.getElementById("quantityGold").value;
    const quantityNorth = document.getElementById("quantityNorth").value;
    const quantitySouth = document.getElementById("quantitySouth").value;
    const quantityRabbit = document.getElementById("quantityRabbit").value;
    const matchDate = document.getElementById("date").value;
    const matchTime = document.getElementById("time").value;

    // Ottieni il file selezionato
    const logo = document.getElementById("logo").files[0];

    console.log("Dati del form:", {
        competition,
        opponent,
        quantityGold,
        quantityNorth,
        quantitySouth,
        quantityRabbit,
        matchDate,
        matchTime,
        logo: logo ? logo.name : "Nessun file"
    });

    // Prepara l'URL e FormData
    const url = "utils/addTicketsInDB.php";
    const formData = new FormData();
    formData.append("competition", competition);
    formData.append("opponent", opponent);
    formData.append("quantityGolden", quantityGold);
    formData.append("quantityNorth", quantityNorth);
    formData.append("quantitySouth", quantitySouth);
    formData.append("quantityRabbit", quantityRabbit);
    formData.append("matchDate", matchDate);
    formData.append("matchTime", matchTime);
    formData.append("logo", logo); // Aggiunge il file al FormData

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.error("Errore nella risposta:", response.status);
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        const json = await response.json();
        console.log("Risposta JSON:", json);

        if (!json.successful) {
            console.error("Errore nell'aggiungere il biglietto:", json.error || "Errore sconosciuto.");
        } else {
            console.log("Biglietti aggiunti con successo!");
        }
    } catch (error) {
        console.error("Errore nell'invio dei dati:", error.message);
        alert(`Errore: ${error.message}`);
    }
}
