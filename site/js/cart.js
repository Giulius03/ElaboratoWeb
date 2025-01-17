function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "SHOPPING CART" : "CARRELLO";
    document.getElementById('btnBuy').setAttribute("value", lang === "en" ? "Buy Now" : "Acquista Ora");
    document.getElementById('txtRel').textContent = lang === "en" ? "Releated Products" : "Articoli Correlati";
    getArticlesData(lang);
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

function generateCards(lang, articoli) {
    let carrelloVuoto = lang === "en" ? 'Empty Cart!' : 'Carrello Vuoto!S'
    let totale = 0;
    let article = "";

    if(articoli.length > 0){
        for (let i = 0; i < articoli.length; i++) {
            let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
            let descrizione = lang === "en" ? articoli[i]["descrizioneeng"] : articoli[i]["descrizioneita"];
            article += `
                <article>
                    <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}">
                    <strong>${nome}</strong>
                    <p>${descrizione}</p>
                    <p>Quantità:${articoli[i]["quantità"]}</p>
                    <p>Prezzo Singolo:€${articoli[i]["prezzo"]}</p>
                </article>
            `
            totale += (articoli[i]["prezzo"]*articoli[i]["quantità"]);
        }
    } else {
        article += `
                <article>
                    <strong>${carrelloVuoto}</strong>
                </article>
            `
    }

    article += '<p>'
    article += lang === "en" ? 'Total:€' : 'Totale:€'
    article += `${totale}</p>`

    return article;
}

async function getArticlesData(lang) {
    const url = "utils/getCart.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const articles = generateCards(lang, json);
        document.querySelector("main > section > section").innerHTML = articles;
    } catch (error) {
        console.log(error.message);
    }
}