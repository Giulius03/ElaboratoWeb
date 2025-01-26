function setAdminLang(lang) {
    document.querySelector("main > section > h1").textContent = lang === "en" ? "Control Panel" : "Pannello di Controllo";
    document.querySelector("main > section > button:nth-of-type(2)").textContent = lang === "en" ? "Add a Product" : "Aggiungi un Prodotto";
    document.querySelector("main > section > button:last-of-type").textContent = lang === "en" ? "Add Tickets" : "Aggiungi Biglietti";
    document.querySelector("main > section > form > div > input:first-of-type").setAttribute("value", lang === "en" ? "Edit" : "Modifica");
    document.querySelector("main > section > form > div > input:last-of-type").setAttribute("value", lang === "en" ? "Remove" : "Rimuovi");
    getArticles(lang);
}

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    setAdminLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setAdminLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setAdminLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setAdminLang("en");
});

function generateOptions(lang, articles) {
    let first = lang === "en" ? "Select a product" : "Seleziona un prodotto";
    let options = `<option value="" disabled selected>${first}</option>`;
    articles.forEach(article => {
        let name = lang === "en" ? article["nomeeng"] : article["nomeita"];
        let selected = document.querySelector("main > section > form > select").value === article["nomeita"] ? "selected" : "";
        options += `
        <option value="${article["nomeita"]}" ${selected}>${name}</option>
        `;
    });

    return options;
}

async function getArticles(lang) {
    document.querySelector("main > section").style.textAlign = 'center';
    const url = "utils/getArticles.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const articles = generateOptions(lang, json);
        document.querySelector("main > section > form > select").innerHTML = articles;
    } catch (error) {
        console.log(error.message);
    }
}

function setAction(event) {
    const clickedButton = event.submitter.value;
    event.preventDefault();

    const actionID = (clickedButton === "Edit" || clickedButton === "Modifica") ? 2 : 3;
    window.location.href = "productsManagement.php?action=" + actionID + "&article=" + document.querySelector("main > section > form > select").value;
}