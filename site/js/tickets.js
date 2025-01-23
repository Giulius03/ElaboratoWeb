function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "TICKETS" : "BIGLETTI";
    getMatchData(lang);
}

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    setUserLogFormLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setUserLogFormLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setUserLogFormLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setUserLogFormLang("en");
});

function generateCards(lang, match) {
    let noMatch = lang === "en" ? 'There are no matches coming soon' : 'Non ci sono partite prossimamente';
    let ticketQuantity = lang === "en" ? 'Quantity' : 'Quantità';
    let area = lang === "en" ? 'Area' : 'Settore';
    let article = "";
    let ticketNum = match[0]["curvandisp"] + match[0]["curvasdisp"] + match[0]["triborodisp"] + match[0]["tribconigliodisp"];
    let ticket = lang === "en" ? 'Ticket Number: ' : 'Numbero Biglietto: ';
    let nome = lang === "en" ? 'Name: ' : 'Nome: ';
    let cognome = lang === "en" ? 'Surname: ' : 'Cognome: ';
    let age = lang === "en" ? 'Age: ' : 'Anni: ';
    let prezzo = lang === "en" ? 'Cost' : 'Prezzo';
    let buy = lang === "en" ? "Buy Now" : "Acquista Ora";

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
                    <select id="quantity" class="quantity-dropdown">
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
                <li><p>${ticket}${ticketNum}</p></li>
                <li><p>${nome}</p>
                <input type="text" id="textBoxName">
                </li>
                <li><p>${cognome}</p>
                <input type="text" id="textBoxSurname">
                </li>
                <li>
                    <label for="age">${age} </label>
                    <select id="age" class="area-dropdown">
                        <option value="\<18">\<18</option>
                        <option value="18-25">18-25</option>
                        <option value="25+">25+</option>
                    </select>
                </li>
                <li><p>${prezzo}:€74.99</p></li>
                <li><form id="ticketForm" onsubmit="handleFormSubmit(event, '<?php echo $currentLanguage; ?>', '${ticketNum}')">
                    <input type="submit" id="btnBuy" value="${buy}">
                </form></li>
            </ol>
        `;
    } else {
        article += `
            <article>
                <strong>${noMatch}</strong>
            </article>
        `;
    }

    return article;
}

function handleFormSubmit(event, lang, ticketNum) {
    event.preventDefault();

    addTicket(lang, event, ticketNum);

    setTimeout(() => {
         window.location.href = "payment.php";
    }, 500);
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
    } catch (error) {
        console.log(error.message);
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
    const name = getElementValueById("textBoxName");
    const surname = getElementValueById("textBoxSurname");
    const age = getElementValueById("age");

    const url = "utils/addToTickets.php";
    let formData = new FormData();
    formData.append('matchDate', matchDate);
    formData.append('matchTime', matchTime);
    formData.append('avversario', avversario);
    formData.append('area', area);
    formData.append('quantity', quantity);
    formData.append('name', name);
    formData.append('surname', surname);
    if (age == "\<18") {
        formData.append('ridotto', "1");
    }
    formData.append('prezzo', "79.99");
    formData.append('ticketNum', ticketNum);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        console.log("Risposta dal server:", json);

        if (json.successful) {
            console.log(lang === "en" ? "Product added to cart." : "Prodotto aggiunto al carrello.");
        } else {
            console.error("Errore aggiunta biglietto:", json.error || "Errore sconosciuto.");
        }
    } catch (error) {
        console.log(error.message);
    }
}