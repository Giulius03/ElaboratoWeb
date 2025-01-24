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
    let elimina = lang === "en" ? 'Delete' : 'Elimina'
    let prezzo = lang === "en" ? 'Cost' : 'Prezzo'
    let size = lang === "en" ? 'Size' : 'Taglia'
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
                    <strong>${nome}</strong><form action="utils/deleteFavs.php" method="POST" onsubmit="deleteFavs('<?php echo $currentLanguage ?>', event)">
                        <input type="hidden" id="articleFavsName${i}" name="articleFavsName" value="${articoli[i]["nomeita"]}" />
                        <button class="btn-with-icon" type="submit">
                            <strong class="fa fa-trash"></strong>
                            ${elimina}
                        </button>
                    </form>
                    <p>${size}: ${articoli[i]["taglia"]}</p>
                    <p>${descrizione}</p>
                    <p>${prezzo}: €${articoli[i]["prezzo"]}</p>
                    <form action="utils/addToCart.php" method="POST" onsubmit="addCart('<?php echo $currentLanguage ?>', event, \'${articoli[i]["taglia"]}\', ${i})">
                        <input type="hidden" id="articleName${i}" name="articleName" value="${articoli[i]["nomeita"]}" />
                        <input type="submit" id="btnAdd${i}" value="${aggiungi}" />
                    </form>
                </article>
            `
        }
    } else {
        article += `
                <article>
                    <h2>validation</h2>
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


async function addCart(lang, event, size, numberButton) {
    event.preventDefault();

    let buttonId = `#btnAdd${numberButton}`;
    const form = event.target.closest("form");
    const articleName = form.querySelector('input[name="articleName"]').value;
    const url = "utils/addToCart.php";
    let formData = new FormData();
    formData.append('articleName', articleName);
    formData.append('quantity', 1);  
    formData.append('size', size);  

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
            console.log(lang === "en" ? "Product added to cart." : "Prodotto aggiunto al carrello.");
            let originalText = document.querySelector(buttonId).value;
            console.log(originalText);
            document.querySelector(buttonId).setAttribute("value", lang === "en" ? "Added" : "Aggiunto");
            setTimeout(() => {
                document.querySelector(buttonId).setAttribute("value", originalText);
            }, 1500);
        } else {
            console.log(json["error"]);
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteFavs(lang, event) {
    event.preventDefault();

    const form = event.target.closest("form");
    const articleName = form.querySelector('input[name="articleFavsName"]').value;
    const url = "utils/deleteFavs.php";
    let formData = new FormData();
    formData.append('articleFavsName', articleName);

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
            console.log(lang === "en" ? "Product deleted from favourites." : "Prodotto eliminato dai preferiti.");
            getArticlesData(lang);
        } else {
            console.log(json["error"]);
        }
    } catch (error) {
        console.log(error.message);
    }
}