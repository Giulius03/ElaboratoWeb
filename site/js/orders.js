function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "MY ORDERS" : "I MIEI ORDINI";
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

function generateArticles(lang, ordini) {
    let view = lang === "en" ? "View Order" : "Vedi Ordine"
    let noOrdini = lang === "en" ? 'There are no orders to see!' : 'Non ci sono ordini da vedere!'
    let ordine = lang === "en" ? 'Order Number' : 'Numero Ordine'
    let article = "";

    if(ordini.length > 0){
        for (let i = 0; i < ordini.length; i++) {
            article += `
                <article>
                    <strong>${ordine}: ${ordini[i]["numero"]}</strong>
                </article>
                <form action="utils/singleOrder.php" method="POST">
                    <input type="hidden" id="orderNumber${i}" name="orderNumber" value="${ordini[i]["numero"]}">
                    <input type="submit" id="btnAdd" value="${view}">
                </form>
            `
        }
    } else {
        article += `
                <article>
                    <strong>${noOrdini}</strong>
                </article>
            `
    }
    return article;
}

function generateCards(lang, articoli) {
    let view = lang === "en" ? "View Order" : "Vedi Ordine"
    let noOrdini = lang === "en" ? 'There are no orders to see!' : 'Non ci sono ordini da vedere!'
    let article = "";

    if(articoli.length > 0){
        for (let i = 0; i < articoli.length; i++) {
            let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
            let descrizione = lang === "en" ? articoli[i]["descrizioneeng"] : articoli[i]["descrizioneita"];
            article += `
                <article>
                    <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}">
                    <strong>${nome}</strong><form action="utils/deleteFavs.php" method="POST" onsubmit="deleteFavs('<?php echo $currentLanguage ?>', event)">
                        <input type="hidden" id="articleFavsName${i}" name="articleFavsName" value="${articoli[i]["nomeita"]}">
                        <button class="btn-with-icon" type="submit">
                            <i class="fa fa-trash"></i>
                            Elimina
                        </button>
                    </form>
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

async function getArticleInOrder(lang) {
    const orders = getOrdersData();
    for(let i = 0; i < orders.length; i++){
        const url = "utils/getArticleInOrder.php";
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
}
