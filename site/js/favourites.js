function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "FAVOURITE PRODUCTS" : "PRODOTTI PREFERITI";
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
    let aggiungi = lang === "en" ? "Add To Cart" : "Aggiungi Al Carrello"
    let noPreferiti = lang === "en" ? 'There are not favourite products!' : 'Non ci sono prodotti preferiti!'
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
                    <p>€${articoli[i]["prezzo"]}</p>
                </article>
                <form action="utils/addToCart.php" method="POST" onsubmit="addCart('<?php echo $currentLanguage ?>', event)">
                    <input type="hidden" id="articleName${i}" name="articleName" value="${articoli[i]["nomeita"]}">
                    <input type="submit" id="btnAdd" value="${aggiungi}">
                </form>
            `
        }
    } else {
        article += `
                <article>
                    <strong>${noPreferiti}</strong>
                </article>
            `
    }
    return article;
}

async function getArticlesData(lang) {
    const url = "utils/getFavourites.php";
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


async function addCart(lang, event) {
    event.preventDefault();

    const form = event.target.closest("form");
    const articleName = form.querySelector('input[name="articleName"]').value;
    const url = "utils/addToCart.php";
    let formData = new FormData();
    formData.append('articleName', articleName);

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
            alert(lang === "en" ? "Product added to cart." : "Prodotto aggiunto al carrello.");
            window.location.href = "favourites.php";
        } else {
            alert(json["error"]);
        }
    } catch (error) {
        console.log(error.message);
    }
}