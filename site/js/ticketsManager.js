let language = 'en';
function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "TICKETS MANAGEMENT" : "GESTIONE DEI BIGLIETTI";
    document.getElementById('lblcomp').textContent = lang === "en" ? "Competition*" : "Competizione*";
    document.getElementById('lblopp').textContent = lang === "en" ? "Opponent*" : "Avversario*";
    document.getElementById('lbldate').textContent = lang === "en" ? "Match Date" : "Data della Partita";
    document.getElementById('lbltime').textContent = lang === "en" ? "Match Time" : "Orario della Partita";
    document.getElementById('lblgold').textContent = lang === "en" ? "Quantity Golden Grandstand" : "Quantità Tribuna Oro";
    document.getElementById('lblnorth').textContent = lang === "en" ? "Quantity North Curve" : "Quantità Curva Nord";
    document.getElementById('lblsouth').textContent = lang === "en" ? "Quantity South Curve" : "Quantità Curva Sud";
    document.getElementById('lblrabbit').textContent = lang === "en" ? "Quantity Rabbit Grandstand" : "Quantità Tribuna Coniglio";
    document.getElementById('lbllogo').textContent = lang === "en" ? "Upload Opponent Logo (.png)" : "Carica Logo Avversario (.png)";
    document.getElementById('customFileButton').textContent = lang === "en" ? "Select File" : "Scegli File";
    document.getElementById('addTicketButton').textContent = lang === "en" ? "Add Tickets" : "Aggiungi Biglietti";
    language = lang;
}

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener("click", () => setUserLogFormLang("it"));
btnItaPC.addEventListener("click", () => setUserLogFormLang("it"));
btnEngPhone.addEventListener("click", () => setUserLogFormLang("en"));
btnEngPC.addEventListener("click", () => setUserLogFormLang("en"));

document.getElementById('customFileButton').addEventListener('click', () => {
    document.getElementById('logo').click();
});

document.getElementById('logo').addEventListener('change', () => {
    const fileName = document.getElementById('logo').files[0]?.name || 'Nessun file selezionato';
    document.getElementById('fileNameDisplay').textContent = fileName;
    document.getElementById('fileNameDisplay').style.display = 'inline';
});

document.getElementById("addTicketButton").addEventListener("click", (event) => {
    event.preventDefault();
    addTicketsInDB();
});

async function addTicketsInDB() {
    const competition = document.getElementById("competitionBox").value;
    const opponent = document.getElementById("opponentBox").value;
    const quantityGold = document.getElementById("quantityGold").value;
    const quantityNorth = document.getElementById("quantityNorth").value;
    const quantitySouth = document.getElementById("quantitySouth").value;
    const quantityRabbit = document.getElementById("quantityRabbit").value;
    const matchDate = document.getElementById("date").value;
    const matchTime = document.getElementById("time").value;

    const today = new Date();
    const selectedDate = new Date(matchDate); 

    if (selectedDate <= today) {
        const errorDate = language === 'en' ? "The match date have to be subsequent to today." : "La data del match deve essere successiva a oggi."
        console.log(errorDate);
        return; 
    }

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
    formData.append("logo", logo); 

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
            console.error("Error:", json.error || "Unknown Error.");
        } else {
            console.log("Added Tickets.");
        }
    } catch (error) {
        console.error(":", error.message);
        alert(`Errore: ${error.message}`);
    }
}
