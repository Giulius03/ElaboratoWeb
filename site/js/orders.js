function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "MY ORDERS" : "I MIEI ORDINI";
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

function generateCards(lang, ordini, number) {
    let prezzo = 0;
    let order = lang === "en" ? "Order Number" : "Numero Ordine"
    let view = lang === "en" ? "View Order" : "Vedi Ordine"
    let article = `<strong>${order}: ${number}</strong>
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
        <form class="orderForm" action="singleOrder.php" method="POST">
            <input type="hidden" id="orderNumber${number}" name="orderNumber" value="${number}">
            <input type="submit" id="btnAdd" value="${view}">
        </form>
        <p>
        `
    article += lang === "en" ? 'Total:€' : 'Totale:€'
    article += `${prezzo}</p>`
    

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
            let articlesList = [];
            const orderId = orders[i]["numero"];
            const url = `utils/getArticleInOrder.php?orderId=${orderId}`; // Passa l'ID ordine nella query string

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Errore nel recupero articoli per ordine ${orderId}: ${response.status}`);
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
                allArticles += generateCards(lang, articlesList, orderId);
            } catch (error) {
                console.log(error.message);
            }
            document.querySelector("main > section > section").innerHTML = allArticles;
        }
    } catch (error) {
        console.log(error.message);
    }
}
