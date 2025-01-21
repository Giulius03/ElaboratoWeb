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
    let carrelloVuoto = lang === "en" ? 'Empty Cart!' : 'Carrello Vuoto!'
    let elimina = lang === "en" ? 'Delete' : 'Elimina'
    let quantità = lang === "en" ? 'Quantity' : 'Quantità'
    let prezzo = lang === "en" ? 'Cost Single Product' : 'Prezzo Singolo Prodotto'
    let totale = 0;
    let article = "";

    if(articoli.length > 0){
        for (let i = 0; i < articoli.length; i++) {
            let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
            let descrizione = lang === "en" ? articoli[i]["descrizioneeng"] : articoli[i]["descrizioneita"];
            article += `
                <article>
                    <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}">
                    <strong>${nome}</strong><form action="utils/deleteCart.php" method="POST" onsubmit="deleteCart('<?php echo $currentLanguage ?>', event)">
                        <input type="hidden" id="articleCartName${i}" name="articleCartName" value="${articoli[i]["nomeita"]}">
                        <button class="btn-with-icon" type="submit">
                            <i class="fa fa-trash"></i>
                            ${elimina}
                        </button>
                    </form>
                    <p>${descrizione}</p>
                    <p>${quantità}: ${articoli[i]["quantità"]}</p>
                    <p>${prezzo}: €${articoli[i]["prezzo"]}</p>
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

async function deleteCart(lang, event) {
    event.preventDefault();

    const form = event.target.closest("form");
    const articleName = form.querySelector('input[name="articleCartName"]').value;
    const url = "utils/deleteCart.php";
    let formData = new FormData();
    formData.append('articleCartName', articleName);

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
            // alert(lang === "en" ? "Product deleted from cart." : "Prodotto eliminato dal carrello.");
            getArticlesData(lang);
        } else {
            alert(json["error"]);
        }
    } catch (error) {
        console.log(error.message);
    }
}