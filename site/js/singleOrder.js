function setUserLogFormLang(lang) {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('orderNumber');
    document.getElementById('title').textContent = lang === "en" ? `ORDER NUMBER:${orderNumber}` : `NUMERO ORDINE:${orderNumber}`;
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

function generateShippingInfo(lang, shipping) {
    let dateDel = lang === "en" ? "Estimate Date of Delivery" : "Data Prevista di Consegna"
    let ritiro = lang === "en" ? 'Schedule for pick-up' : 'Pronto per il ritiro'
    let partitoSede = lang === "en" ? 'Departed to Shipping Facility' : 'Partito per la sede più vicina'
    let arrivoSede = lang === "en" ? 'Arrived to Shipping Facility' : 'Arrivato nella sede più vicina'
    let preso = lang === "en" ? 'Picked up by courier' : 'Preso in consegna dal corriere'
    let consegnato = lang === "en" ? 'Delivered' : 'Consegnato'
    let article = `
        <p>${dateDel}: ${shipping[0]["datainserimento"]}</p>
    `;

    
    return article;
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

            const urlShip = `utils/getShippingInfo.php?orderID=${orderID}`;
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
