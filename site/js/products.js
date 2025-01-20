function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "PRODUCTS" : "PRODOTTI";
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

function handleFilterSubmit(event, lang) {
    event.preventDefault(); // Previene il comportamento predefinito del modulo

    const selectedCategory = document.querySelector('input[name="category"]:checked');

    if (!selectedCategory) {
        console.log("Seleziona una categoria prima di inviare!");
        return;
    }

    const categoryValue = selectedCategory.value;

    // Chiama getArticlesData con la lingua e la categoria selezionata
    getArticlesData(lang, categoryValue);
}

function generateCards(lang, articoli) {
    let view = lang === "en" ? "View Article" : "Vedi Articolo"
    let noProdotti = lang === "en" ? 'There are no products for this category!' : 'Non ci sono prodotti di questo tipo!'
    let article = "";

    if(articoli.length > 0){
        for (let i = 0; i < articoli.length; i++) {
            let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
            article += `
                <article>
                    <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}">
                    <strong>${nome}</strong>
                    <p>€${articoli[i]["prezzo"]}</p>
                </article>
                <form action="singleProduct.php" method="POST"
                    <input type="hidden" id="articleName${i}" name="articleName" value="${articoli[i]["nomeita"]}">
                    <input type="submit" id="btnAdd" value="${view}">
                </form>
            `
        }
    } else {
        article += `
                <article>
                    <strong>${noProdotti}</strong>
                </article>
            `
    }
    return article;
}

async function getArticlesData(lang, category) {
    const url = `utils/getArticlesByCat.php?category=${encodeURIComponent(category)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const articles = generateCards(lang, json);
        document.querySelector("main > section > section").innerHTML = articles;
        window.location.href = "products.php";
    } catch (error) {
        console.log(error.message);
    }
}

function toggleFilter() {
    const filterMenu = document.getElementById('filterMenu');
    if (filterMenu.style.display === 'none' || filterMenu.style.display === '') {
        filterMenu.style.display = 'block'; // Mostra il menu
    } else {
        filterMenu.style.display = 'none'; // Nasconde il menu
    }
}