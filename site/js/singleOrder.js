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

    } catch (error) {
        console.log(error.message);
    }
}
