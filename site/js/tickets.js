function setUserLogFormLang(lang) {
    document.getElementById("title").textContent = lang === "en" ? "TICKETS" : "BIGLIETTI";
    updateDynamicInputs(1, lang);
    getMatchData(lang);
}

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.onclick = () => setUserLogFormLang("it");
btnItaPC.onclick = () => setUserLogFormLang("it");
btnEngPhone.onclick = () => setUserLogFormLang("en");
btnEngPC.onclick = () => setUserLogFormLang("en");

function generateCards(lang, match) {
    let noMatch = lang === "en" ? "There are no matches coming soon" : "Non ci sono partite prossimamente";
    let ticketQuantity = lang === "en" ? "Quantity" : "Quantità";
    let area = lang === "en" ? "Area" : "Settore";
    let article = "";
    let ticketNum = match[0]["curvandisp"] + match[0]["curvasdisp"] + match[0]["triborodisp"] + match[0]["tribconigliodisp"];
    let buy = lang === "en" ? "Buy Now" : "Acquista Ora";
    let price = lang === "en" ? "Price for Under 18 is €29.99 and for Over 18 is €79.99" : "Il prezzo per gli Under 18 è €29.99 e per gli Over 18 è €79.99";

    if (match.length > 0) {
        article += `
            <ol class="ordered">
                <li><h2 id="competiton">${match[0]["competizione"]}</h2></li>
                <li><h3 id="data">${match[0]["data"]}</h3></li>
                <li><h3 id="ora">${match[0]["ora"]}</h3></li>
                <li><h3 id="avversario">${match[0]["avversario"]}</h3></li>
                <li><img src="upload/${match[0]["logo"]}" alt="${match[0]["avversario"]}"></li>
                <li><img class="stadium" src="upload/Stadio.png" alt="${match[0]["avversario"]}"></li>
                <li>
                    <label for="area">${area}: </label>
                    <select id="area" class="area-dropdown">
                        <option value="Golden Grandstand">Golden Grandstand</option>
                        <option value="North Curve">North Curve</option>
                        <option value="South Curve">South Curve</option>
                        <option value="Rabbit Grandstand">Rabbit Grandstand</option>
                    </select>
                </li>
                <li>
                    <label for="quantity">${ticketQuantity}: </label>
                    <select id="quantity" class="quantity-dropdown" onchange="updateDynamicInputs(this.value, '${lang}')">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </li>
                <li id="dynamic-inputs-container">
                    <!-- Dynamic inputs per 1 biglietto all'inizio -->
                </li>
                <li><p>${lang === "en" ? "Total Tickets: " : "Numero Totale Biglietti: "}${ticketNum}</p></li>
                <li><p>${price}</p></li>
                <li>
                    <form id="ticketForm" onsubmit="handleFormSubmit(event, '${lang}', '${ticketNum}')">
                        <input type="submit" id="btnBuy" value="${buy}">
                    </form>
                </li>
            </ol>
        `;
    } else {
        article += `<article><strong>${noMatch}</strong></article>`;
    }

    return article;
}

function updateDynamicInputs(quantity, lang) {
    const container = document.getElementById("dynamic-inputs-container");
    const name = lang === "en" ? "Name" : "Nome";
    const surname = lang === "en" ? "Surname" : "Cognome";
    const age = lang === "en" ? "Age" : "Anni";

    container.innerHTML = "";

    for (let i = 1; i <= quantity; i++) {
        container.innerHTML += `
            <div class="ticket-info">
                <p>${i}. ${name}:</p>
                <input type="text" id="textBoxName${i}" class="name-input">
                <p>${surname}:</p>
                <input type="text" id="textBoxSurname${i}" class="surname-input">
                <p>${age}:</p>
                <select id="age${i}" class="age-dropdown">
                    <option value="\<18">\<18</option>
                    <option value="18-25">18-25</option>
                    <option value="25+">25+</option>
                </select>
            </div>
        `;
    }
}

function getElementValueById(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Elemento con ID '${id}' non trovato.`);
        return null;
    }
    return element.value || element.innerText;
}

async function addTicket(lang, event, ticketNum) {
    const matchDate = getElementValueById("data");
    const matchTime = getElementValueById("ora");
    const avversario = getElementValueById("avversario");
    const area = getElementValueById("area");
    const quantity = getElementValueById("quantity");
    let currentTicketNum = ticketNum - 1;

    for (let i = 1; i <= quantity; i++) {
        const name = getElementValueById(`textBoxName${i}`);
        const surname = getElementValueById(`textBoxSurname${i}`);
        const age = getElementValueById(`age${i}`);

        console.log(`Ticket ${i} data:`, { name, surname, age });

        const url = "utils/addToTickets.php";
        let formData = new FormData();
        formData.append('matchDate', matchDate);
        formData.append('matchTime', matchTime);
        formData.append('avversario', avversario);
        formData.append('quantity', "1");
        formData.append('area', area);
        formData.append('name', name);
        formData.append('surname', surname);
        if (age == "<18") {
            formData.append('ridotto', "1");
            formData.append('prezzo', "29.99");
        } else {
            formData.append('ridotto', "0");
            formData.append('prezzo', "79.99");
        }

        formData.append('ticketNum', currentTicketNum);

        console.log("Sending form data to server:", Array.from(formData.entries()));

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });
        
            if (!response.ok) {
                console.log("Response not OK:", response.status);
                throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            console.log(`Response JSON:`, json);
        
            if (!json.successful) {
                console.error(`Error adding ticket:`, json.error || "Unknown error.");
            }

            currentTicketNum++;
        } catch (error) {
            console.log("Error sending data:", error.message);
        }
    }

    console.log(lang === "en" ? "All tickets have been processed." : "Tutti i biglietti sono stati elaborati.");
}


async function getMatchData(lang) {
    const url = "utils/getMatch.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const match = generateCards(lang, json);
        document.querySelector("main > section > section").innerHTML = match;
        updateDynamicInputs(1, lang);
    } catch (error) {
        console.log(error.message);
    }
}

function handleFormSubmit(event, lang, ticketNum) {
    event.preventDefault();
    addTicket(lang, event, ticketNum);

    setTimeout(() => {
        window.location.href = "payment.php";
    }, 500);
}
