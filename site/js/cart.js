function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "SHOPPING CART" : "CARRELLO";
    document.getElementById('btnLog').setAttribute("value", lang === "en" ? "Buy Now" : "Acquista Ora");
    document.getElementById('txtRel').textContent = lang === "en" ? "Releated Articles" : "Articoli Correlati";
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

btnSeePw.addEventListener('click', (event) => {
    changePwProp(btnSeePw, document.getElementById('password'));
});

function generateCards(lang, articoli) {
    let article = "<section id=articles>";

    for (let i = 0; i < articoli.length; i++) {
        let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
        let descrizione = lang === "en" ? articoli[i]["descrizioneeng"] : articoli[i]["descrizioneita"];
        article += `
            <article>
                <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}">
                <strong>${nome}</strong>
                <p>${descrizione}</p>
                <p>€${articoli[i]["prezzo"]}</p>
            </article>
        `
    }

    article += '</section>'

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
        document.querySelector("main section:first-of-type > section > section > section > section").innerHTML = articles;
    } catch (error) {
        console.log(error.message);
    }
}