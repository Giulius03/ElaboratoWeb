function setUserLogFormLang(lang) {
    document.getElementById('btnProd').textContent = lang === "en" ? "Products Management" : "Gestione dei Prodotti";
    document.getElementById('btnTick').textContent = lang === "en" ? "Tickets Management" : "Gestione dei Prodotti";
    getArticles(lang);
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
    let labelName = lang === "en" ? 'Select Product' : 'Seleziona Articolo';
    let elimina = lang === "en" ? 'Delete' : 'Elimina';
    let modifica = lang === "en" ? 'Modify' : 'Modifica';

    const urlParams = new URLSearchParams(window.location.search);
    const selectedValue = urlParams.get('selectedArticle') || '';

    let article = `
        <h2 style="display: none;">validation</h2>
        <label for="articoli">${labelName}: </label>
        <select id="articoli" class="articoli-dropdown" onchange="updateHiddenInputs()">
    `;
    
    for (let i = 0; i < articoli.length; i++) {
        let nomeEng = articoli[i]["nomeeng"];
        let nomeIta = articoli[i]["nomeita"];
        
        const displayName = lang === "en" ? nomeEng : nomeIta;
        
        const selected = selectedValue === nomeIta ? 'selected' : '';
        
        article += `
            <option value="${nomeIta}" ${selected}>${displayName}</option>
        `;
    }
    
    article += `
        </select>
        <form action="utils/deleteArticles.php" method="POST" onsubmit="deleteArticles('${lang}', event)">
            <input type="hidden" id="deleteArticleName" name="articleName" value="${selectedValue}" />
            <button class="btn-with-icon" type="submit">
                ${elimina}
            </button>
        </form>
        <form action="utils/modifyArticles.php" method="POST" onsubmit="modifyArticles('${lang}', event)">
            <input type="hidden" id="modifyArticleName" name="articleName" value="${selectedValue}" />
            <button class="btn-with-icon" type="submit">
                ${modifica}
            </button>
        </form>
    `;
    
    return article;
}

function updateHiddenInputs() {
    const selectElement = document.getElementById('articoli');
    const selectedValue = selectElement.value;

    document.getElementById('deleteArticleName').value = selectedValue;
    document.getElementById('modifyArticleName').value = selectedValue;

    const url = new URL(window.location.href);
    url.searchParams.set('selectedArticle', selectedValue);
    window.history.pushState({}, '', url);
}

async function getArticles(lang) {
    const url = "utils/getArticles.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const articles = generateCards(lang, json);
        document.querySelector("#modAndDel").innerHTML = articles;
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteArticles(lang, event) {
    event.preventDefault();

    const form = event.target.closest("form");
    const articleName = form.querySelector('input[name="articleName"]').value;
    const url = "utils/deleteArticles.php";
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
            console.log(lang === "en" ? "Product deleted from favourites." : "Prodotto eliminato dai preferiti.");
            getArticles(lang);
        } else {
            console.log(json["error"]);
        }
    } catch (error) {
        console.log(error.message);
    }
}
