const dropdownLink = document.getElementById('dropdownLink');
const list = document.getElementById('dropdownList');
const btnSearchAppearPhone = document.getElementById('btnSearchAppear');
const searchBarPhone = document.getElementById('searchPhone');
const productsLink = document.getElementById('productsLink');
const productsMenu = document.getElementById('productsMenu');

dropdownLink.addEventListener('click', (event) => {
    event.preventDefault();
    list.style.display = list.style.display == 'block' ? 'none' : 'block';
});

btnSearchAppearPhone.addEventListener('click', (event) => {
    searchBarPhone.style.display = searchBarPhone.style.display == 'flex' ? 'none' : 'flex';
});

productsLink.addEventListener('mouseover', (event) => {
    productsMenu.style.display = 'block';
});

productsMenu.addEventListener('mouseover', (event) => {
    productsMenu.style.display = 'block';
});

productsMenu.addEventListener('mouseout', (event) => {
    productsMenu.style.display = 'none';
});

async function setLang(lang) {
    const url = "utils/setLanguage.php?Lang=";
    try {
        const response = await fetch(url + lang);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        document.getElementById('searchBarPC').placeholder = lang === "en" ? "Search ..." : "Cerca ...";
        document.getElementById('prodTextPC').textContent = lang === "en" ? "Products" : "Prodotti";
        document.getElementById('clotTextPC').textContent = lang === "en" ? "Clothing" : "Abbigliamento";
        document.getElementById('kitsTextPC').textContent = lang === "en" ? "Kits" : "Divise";
        document.getElementById('hoodTextPC').textContent = lang === "en" ? "Hoodies" : "Felpe";
        document.getElementById('tsTextPC').textContent = lang === "en" ? "T-Shirts" : "Magliette";
        document.getElementById('capsTextPC').textContent = lang === "en" ? "Caps" : "Cappelli";
        document.getElementById('trouTextPC').textContent = lang === "en" ? "Trousers" : "Pantaloni";
        document.getElementById('tickTextPC').textContent = lang === "en" ? "Tickets" : "Biglietti";
        document.getElementById('userText').textContent = lang === "en" ? "User" : "Utente";
        document.getElementById('logText').textContent = lang === "en" ? "Log In" : "Accedi";
        document.getElementById('signText').textContent = lang === "en" ? "Sign Up" : "Registrati";
        document.getElementById('notText').textContent = lang === "en" ? "Notifications" : "Notifiche";
        document.getElementById('currentFlag').className = lang === "en" ? "fi fi-gb" : "fi fi-it";
        document.getElementById('langText').textContent = lang === "en" ? "ENG" : "ITA";
        document.getElementById('searchBar').placeholder = lang === "en" ? "Search ..." : "Cerca ...";
        dropdownLink.textContent = lang === "en" ? "Language" : "Lingua";
        document.getElementById('prodText').textContent = lang === "en" ? "Products" : "Prodotti";
        document.getElementById('clotText').textContent = lang === "en" ? "Clothing" : "Abbigliamento";
        document.getElementById('kitsText').textContent = lang === "en" ? "Kits" : "Divise";
        document.getElementById('hoodText').textContent = lang === "en" ? "Hoodies" : "Felpe";
        document.getElementById('tsText').textContent = lang === "en" ? "T-Shirts" : "Magliette";
        document.getElementById('capsText').textContent = lang === "en" ? "Caps" : "Cappelli";
        document.getElementById('trouText').textContent = lang === "en" ? "Trousers" : "Pantaloni";
        document.getElementById('tickText').textContent = lang === "en" ? "Tickets" : "Biglietti";
        document.getElementById('contText').textContent = lang === "en" ? "Contact Us" : "Contattaci";
        document.getElementById('copyText').textContent = "2025 Bugs Burnley. " + (lang === "en" ? "All Rights Reserved" : "Tutti i Diritti Riservati") + ".";
    } catch (error) {
        console.log(error.message);
    }
} 