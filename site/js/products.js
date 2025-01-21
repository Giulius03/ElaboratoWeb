function setUserLogFormLang(lang) {
    console.log(lang);
    document.getElementById('title').textContent = lang === "en" ? "PRODUCTS" : "PRODOTTI";
    const filterButton = document.getElementById('filter');
    filterButton.innerHTML = `<i class="fa fa-filter"></i> ${lang === "en" ? "FILTERS" : "FILTRI"}`;

    const filterForm = document.getElementById('filterForm');
    filterForm.onsubmit = function (event) {
        event.preventDefault(); // Previene il comportamento di submit
        handleFilterSubmit(event, lang);
    };

    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        const input = label.querySelector('input');
        if (input) {
            switch (input.value) {
                case 'Divise':
                    label.innerHTML = `<input id="kits" type="radio" name="category" value="Divise">${lang === "en" ? "Kits" : "Divise"}`;
                    break;
                case 'Felpe':
                    label.innerHTML = `<input id="hoods" type="radio" name="category" value="Felpe">${lang === "en" ? "Hoodies" : "Felpe"}`;
                    break;
                case 'Magliette':
                    label.innerHTML = `<input id="tshirts" type="radio" name="category" value="Magliette">${lang === "en" ? "T-Shirts" : "Magliette"}`;
                    break;
                case 'Cappelli':
                    label.innerHTML = `<input id="caps" type="radio" name="category" value="Cappelli">${lang === "en" ? "Caps" : "Cappelli"}`;
                    break;
                case 'Pantaloni':
                    label.innerHTML = `<input id="trous" type="radio" name="category" value="Pantaloni">${lang === "en" ? "Trousers" : "Pantaloni"}`;
                    break;
                case 'Souvenirs':
                    label.innerHTML = `<input id="souvs" type="radio" name="category" value="Souvenirs">${lang === "en" ? "Souvenirs" : "Souvenirs"}`;
                    break;
                default:
                    break;
            }
        }
    });
    document.getElementById('send').textContent = lang === "en" ? "Send" : "Invia";

    updateCategoryInURL();

    // Recupera la categoria dal parametro dell'URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');

    // Se c'è una categoria nell'URL, seleziona il relativo radio button
    if (selectedCategory) {
        // Trova il radio button con il valore della categoria selezionata e selezionalo
        document.querySelector(`input[name="category"][value="${selectedCategory}"]`).checked = true;
    }

    getArticlesData(lang, selectedCategory);
}

const btnSendCat = document.getElementById('send');

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

btnSendCat.addEventListener('click', (event) => {
    updateCategoryInURL();
});

function updateCategoryInURL() {
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    if (selectedCategory) {
        const currentUrl = new URL(window.location.href);  // Prendi l'URL attuale
        currentUrl.searchParams.set('category', selectedCategory.value);  // Aggiungi/aggiorna il parametro category nell'URL
        window.history.pushState({}, '', currentUrl);  // Modifica l'URL senza ricaricare la pagina
    }
}

function handleFilterSubmit(event, lang) {
    let selection = lang === "en" ? "Select one of this categories!" : "Seleziona una tra le categorie proposte!"
    event.preventDefault()

    const selectedCategory = document.querySelector('input[name="category"]:checked');

    if (!selectedCategory) {
        console.log(selection);
        return;
    }

    const categoryValue = selectedCategory.value;

    // Chiama getArticlesData con la lingua e la categoria selezionata
    getArticlesData(lang, categoryValue);
}

function generateCards(lang, articoli) {
    let view = lang === "en" ? "View Article" : "Vedi Articolo"
    let noProdotti = lang === "en" ? 'There are no products for this category!' : 'Non ci sono prodotti di questo tipo!'
    let prezzo = lang === "en" ? 'Cost' : 'Prezzo'
    let article = "";

    if(articoli.length > 0){
        for (let i = 0; i < articoli.length; i++) {
            let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
            article += `
                <article>
                    <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}">
                    <strong>${nome}</strong>
                    <p>${prezzo}: €${articoli[i]["prezzo"]}</p>
                    <form action="singleProduct.php?product=${articoli[i]["nomeita"]}" method="GET">
                        <input type="hidden" id="articleName${i}" name="articleName" value="${articoli[i]["nomeita"]}">
                        <input type="submit" id="btnView" value="${view}">
                    </form>
                </article>
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
    const url = `utils/getArticlesByCat.php?category=${category}`;
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

function toggleFilter() {
    const filterMenu = document.getElementById('filterMenu');
    if (filterMenu.style.display === 'none' || filterMenu.style.display === '') {
        filterMenu.style.display = 'block'; // Mostra il menu
    } else {
        filterMenu.style.display = 'none'; // Nasconde il menu
    }
}