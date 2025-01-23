function setUserLogFormLang(lang) {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('orderNumber');
    document.getElementById('title').textContent = lang === "en" ? `ORDER NUMBER:${orderNumber}` : `NUMERO ORDINE:${orderNumber}`;
    document.getElementById('txtShip').textContent = lang === "en" ? "Shipping Tracking" : "Tracciamento Spedizione";
    document.getElementById('txtRel').textContent = lang === "en" ? "Releated Products" : "Articoli Correlati";
    getArticlesInOrder(lang, orderNumber);
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

function generateCards(lang, ordini, number) {
    let prezzo = 0;
    let order = lang === "en" ? "Products:" : "Prodotti:"
    let article = `<strong>${order}</strong>
                        <ul>
                        `;

    for (let i = 0; i < ordini.length; i++) {
        let nome = lang === "en" ? ordini[i]["nomeeng"] : ordini[i]["nomeita"];
        article += `
                <li><img src="upload/${ordini[i]["nomeimmagine"]}" alt="${nome}"> ${nome} ${ordini[i]["taglia"]}     X ${ordini[i]["quantità"]}</li>
        `
        prezzo += ordini[i]["quantità"] * ordini[i]["prezzo"];
    }

    article += `
        </ul>
        <p>
        `
    article += lang === "en" ? 'Total:€' : 'Totale:€'
    article += `${prezzo}</p>`
    

    return article;
}

// Funzione per aggiungere giorni
// function addDays(date, days) {
//     const result = new Date(date);
//     result.setDate(result.getDate() + days);
//     return result;
// }

// Funzione per aggiungere un orario specifico
function setTime(date, hours, minutes) {
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0); // Imposta ore, minuti, secondi, millisecondi
    return result;
}

function generateShippingInfo(lang, shipping) {
    let dateDel = lang === "en" ? "Estimated Date of Delivery" : "Data Prevista di Consegna";
    let ritiro = lang === "en" ? "Schedule for pick-up" : "Pronto per il ritiro";
    let partitoSede = lang === "en" ? "Departed to Shipping Facility" : "Partito per la sede più vicina";
    let arrivoSede = lang === "en" ? "Arrived to Shipping Facility" : "Arrivato nella sede più vicina";
    let preso = lang === "en" ? "Picked up by courier" : "Preso in consegna dal corriere";
    let consegnato = lang === "en" ? "Out for Delivery" : "In consegna";

    // Prendi la data iniziale
    const initialDate = new Date(shipping[0]?.datainserimento);

    // Calcola le date e gli orari
    const dates = [
        { date: setTime(initialDate, 9, 0), text: ritiro }, // Ritiro alle 9:00
        { date: setTime(initialDate, 11, 0), text: preso }, // Preso alle 11:00
        { date: setTime(initialDate, 15, 0), text: partitoSede }, // Partito alle 15:00
        { date: setTime(initialDate, 17, 0), text: arrivoSede }, // Arrivato alle 17:00
        { date: setTime(initialDate, 21, 0), text: consegnato }, // Consegna alle 21:00
    ];

    const currentDate = new Date();

    if(shipping[0]["stato"] != 5 && shipping[0]["stato"] != 0){
        const stato = shipping[0].stato + 1;
        const statoDate = dates[stato];

        if (currentDate > statoDate.date) {
            aggiornaStato(lang, shipping[0]["numero"]);
            location.reload();
        }
    }

    // Genera la timeline HTML
    let timelineHTML = `
            <h3><strong>${dateDel}:</strong> ${dates[dates.length - 1].date.toLocaleDateString(lang === "en" ? "en-US" : "it-IT")}</h3>
            <ol class="timeline">
    `;

    for (let i = 0; i < dates.length; i++) {
        let isCompleted = false;
        const { date, text } = dates[i];
        if (i <= shipping[0]["stato"]){
            isCompleted = true;
        }

        timelineHTML += `
            <li class="timeline-step" data-status="${isCompleted ? 'completed' : 'upcoming'}">
                <span class="circle" aria-hidden="true"></span>
                <div class="info">
                    <time class="date" datetime="${date.toISOString()}">
                        ${date.toLocaleDateString(lang === "en" ? "en-US" : "it-IT")} - ${date.toLocaleTimeString(lang === "en" ? "en-US" : "it-IT", { hour: '2-digit', minute: '2-digit' })}
                    </time>
                    <p class="text">${text}</p>
                </div>
            </li>
        `;
    }

    timelineHTML += `
                </ol>
            </section>
        </main>
    `;

    return timelineHTML;
}

async function getArticlesInOrder(lang, orderNumber) {
    let allArticles = "";
    try {

            let articlesList = [];
            const url = `utils/getArticleInOrder.php?orderId=${orderNumber}`; // Passa l'ID ordine nella query string

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Errore nel recupero articoli per ordine ${orderNumber}: ${response.status}`);
                }
                const json = await response.json(); // Articoli per l'ordine corrente
                console.log(json);

                const articlesInOrder = json;
                for (let j = 0; j < articlesInOrder.length; j++){
                    const articleID = articlesInOrder[j]["Id"];
                    const url = `utils/getArticleInfo.php?articleID=${articleID}`;

                    try {
                        const response = await fetch(url);
                        if (!response.ok) {
                            throw new Error(`Response status: ${response.status}`);
                        }
                        const jsonArt = await response.json(); // Articoli per l'ordine corrente
                        console.log(jsonArt);

                        articlesList = articlesList.concat(jsonArt);

                    } catch (error) {
                        console.log(error.message);
                    }
                }
                allArticles += generateCards(lang, articlesList, orderNumber);
            } catch (error) {
                console.log(error.message);
            }
            document.querySelector("main > section > section").innerHTML = allArticles;

            const urlShip = `utils/getShippingInfo.php?orderID=${orderNumber}`;
            try {
                const responseShip = await fetch(urlShip);
                if (!responseShip.ok) {
                    throw new Error(`Response status: ${responseShip.status}`);
                }
                const jsonShip = await responseShip.json(); // Articoli per l'ordine corrente
                console.log(jsonShip);
                const shippingInfo = generateShippingInfo(lang, jsonShip);
                document.querySelector("main > section > section:nth-of-type(2)").innerHTML = shippingInfo;
            } catch (error) {
                console.log(error.message);
            }

    } catch (error) {
        console.log(error.message);
    }
}

async function aggiornaStato(lang, orderNumber) {
    const url = "utils/aggiornaStato.php";
    let formData = new FormData();
    formData.append('orderNumber', orderNumber);

    try {
        const response = await fetch(url, {
            method: "POST",                   
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if (json["successful"] === true) {
            console.log(lang === "en" ? "Updated State." : "Stato Aggiornato.");
            getArticlesData(lang);
        } else {
            console.log(json["error"]);
        }
    } catch (error) {
        console.log(error.message);
    }
}