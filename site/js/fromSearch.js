function setUserLogFormLang(lang) {
    const urlParams = new URLSearchParams(window.location.search);
    const article = urlParams.get('article');
    document.getElementById('title').textContent = article;
    getArticlesData(lang, article);
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
    let view = lang === "en" ? "View Article" : "Vedi Articolo"
    let noProdotti = lang === "en" ? 'There are no products for this category!' : 'Non ci sono prodotti di questo tipo!'
    let prezzo = lang === "en" ? 'Cost' : 'Prezzo'
    let article = "";

    if(articoli.length > 0){
        for (let i = 0; i < articoli.length; i++) {
            let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
            let descrizione = lang === "en" ? articoli[i]["descrizioneeng"] : articoli[i]["descrizioneita"];
            article += `
                <h2 style="display: none;">validation</h2>
                <article>
                    <h2>validation</h2>
                    <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}" />
                    <strong>${nome}</strong>
                    <p>${descrizione}</p>
                    <p>${prezzo}: €${articoli[i]["prezzo"]}</p>
                    <form action="singleProduct.php?product=${articoli[i]["nomeita"]}" method="GET">
                        <input type="hidden" id="product${i}" name="product" value="${articoli[i]["nomeita"]}" />
                        <input type="submit" id="btnView${i}" value="${view}" />
                    </form>
                </article>
            `
        }
    } else {
        article += `
                <article>
                    <h2>validation</h2>
                    <strong>${noProdotti}</strong>
                </article>
            `
    }
    return article;
}

async function getArticlesData(lang, article) {
    const url = "utils/getSearch.php";
    let formData = new FormData();
    formData.append('article', article);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Errore nella risposta: ${response.status}`);
        }

        const textResponse = await response.text();
        console.log(textResponse);

        const json = JSON.parse(textResponse);
        console.log(json);

        if (Array.isArray(json) && json.length > 0) {
            const articles = generateCards(lang, json);
            document.querySelector("main > section > section").innerHTML = articles;
        } else {
            console.log(lang === 'en' ? 'No products found' : 'Nessun articolo trovato');
            document.querySelector("main > section > section").innerHTML = "<p>Nessun articolo trovato</p>";
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error.message);
    }
}

