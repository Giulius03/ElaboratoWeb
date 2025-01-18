function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "MY ORDERS" : "I MIEI ORDINI";
    document.getElementById('txtRel').textContent = lang === "en" ? "Releated Products" : "Articoli Correlati";
    getArticlesInOrder(lang);
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

function generateCards(lang, articoli, number) {
    let order = lang === "en" ? "Order Number" : "Numero Ordine"
    let view = lang === "en" ? "View Order" : "Vedi Ordine"
    let article = `<article>
                        <strong>${order}: ${articoli[0]["numeroordine"]}
                        <ul>
                        `;

    for (let i = 0; i < articoli.length; i++) {
        let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
        article += `
                <li>${articoli[i]["nome"]} ${articoli[i]["taglia"]}     X ${articoli[i]["quantità"]}</li>
        `
    }

    article += `
        </ul>
        <form action="utils/singleOrder.php" method="POST" onsubmit="addCart('<?php echo $currentLanguage ?>', event)">
            <input type="hidden" id="orderNumber${number}" name="orderNumber" value="${number}">
            <input type="submit" id="btnAdd" value="${view}">
        </form>
    </article>
    `

    return article;
}

async function getOrdersData() {
    const url = "utils/getOrders.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error.message);
    }
}

async function getArticlesInOrder(lang) {
    let allArticles = "";
    try {
        // Ottieni gli ordini
        const orders = await getOrdersData(); // Attendi il completamento della funzione asincrona
        if (orders.length === 0) {
            console.log("Nessun ordine trovato.");
            return;
        }

        // Cicla attraverso gli ordini
        for (let i = 0; i < orders.length; i++) {
            const orderId = orders[i]["numero"]; // Supponendo che ogni ordine abbia un campo "id"
            const url = `utils/getArticleInOrder.php?orderId=${orderId}`; // Passa l'ID ordine nella query string

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Errore nel recupero articoli per ordine ${orderId}: ${response.status}`);
                }
                const json = await response.json(); // Articoli per l'ordine corrente
                console.log(json);

                // Genera e aggiungi le carte per gli articoli all'HTML
                allArticles += generateCards(lang, json, orderId); // `generateCards` genera HTML per gli articoli
            } catch (error) {
                console.log(error.message);
            }
            document.querySelector("main > section > section").innerHTML = allArticles;
        }
    } catch (error) {
        console.log(error.message);
    }
}
