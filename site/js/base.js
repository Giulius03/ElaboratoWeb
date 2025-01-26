const dropdownLink = document.getElementById('dropdownLink');
const list = document.getElementById('dropdownList');
const btnSearchAppearPhone = document.getElementById('btnSearchAppear');
const searchBarPhone = document.getElementById('searchPhone');
let id = 0;

dropdownLink.addEventListener('click', (event) => {
    event.preventDefault();
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
});

btnSearchAppearPhone.addEventListener('click', (event) => {
    searchBarPhone.style.display = searchBarPhone.style.display === 'flex' ? 'none' : 'flex';
});

function checkNotifications(lang) {
    check(lang);
    id = setInterval(() => {
        check(lang)
    }, 1500);
}

async function check(lang) {
    const url = "utils/checkNewNotifications.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json[0]["nonlette"]);
        if (json[0]["nonlette"] > 0) {
            document.getElementById('notText').textContent = (lang === "en" ? "Notifications" : "Notifiche") + "(" + json[0]["nonlette"] + ")";
        } else {
            document.getElementById('notText').textContent = (lang === "en" ? "Notifications" : "Notifiche");
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function logOut(lang) {
    const url = "utils/logOut.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if (json["successful"] === true) {
            if (window.location.href === "index.php") {
                window.location.reload();
            } else {
                window.location.href = "index.php";
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function setLang(lang) {
    const url = "utils/setLanguage.php?Lang=";
    try {
        const response = await fetch(url + lang);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        document.getElementById('searchBarPC').placeholder = lang === "en" ? "Search ..." : "Cerca ...";
        document.getElementById('prodTextPC').textContent = lang === "en" ? "Products" : "Prodotti";
        document.getElementById('kitsTextPC').textContent = lang === "en" ? "Kits" : "Divise";
        document.getElementById('hoodTextPC').textContent = lang === "en" ? "Hoodies" : "Felpe";
        document.getElementById('tsTextPC').textContent = lang === "en" ? "T-Shirts" : "Magliette";
        document.getElementById('capsTextPC').textContent = lang === "en" ? "Caps" : "Cappelli";
        document.getElementById('trouTextPC').textContent = lang === "en" ? "Trousers" : "Pantaloni";
        document.getElementById('tickTextPC').textContent = lang === "en" ? "Tickets" : "Biglietti";
        currentUserLabel = document.getElementById('userText').textContent;
        document.getElementById('userText').textContent = (currentUserLabel !== "User" && currentUserLabel !== "Utente") ? currentUserLabel : (lang === "en" ? "User" : "Utente");
        if (currentUserLabel !== "User" && currentUserLabel !== "Utente") {
            if (currentUserLabel !== "admin") {
                document.getElementById('cartText').textContent = lang === "en" ? "Cart" : "Carrello";
                document.getElementById('ordersText').textContent = lang === "en" ? "Orders" : "Ordini";
                document.getElementById('favText').textContent = lang === "en" ? "Favourites" : "Preferiti";    
            }
            document.getElementById('logOutText').textContent = lang === "en" ? "Log Out" : "Esci";
        } else {
            document.getElementById('logText').textContent = lang === "en" ? "Log In" : "Accedi";
            document.getElementById('signText').textContent = lang === "en" ? "Sign Up" : "Registrati";
        }
        document.getElementById('notText').textContent = lang === "en" ? "Notifications" : "Notifiche";
        clearInterval(id);
        checkNotifications(lang);
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

document.getElementById("searchFormPC").addEventListener("submit", (event) => {
    event.preventDefault();

    const searchQuery = document.getElementById("searchBarPC").value.trim();

    if (searchQuery) {
        const formattedQuery = searchQuery
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        window.location.href = `fromSearch.php?article=${encodeURIComponent(formattedQuery)}`;
    } else {
        console.error("Error!");
    }
});

document.getElementById("searchPhone").addEventListener("submit", (event) => {
    event.preventDefault();

    const searchQuery = document.getElementById("searchBar").value.trim();

    if (searchQuery) {
        const formattedQuery = searchQuery
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        window.location.href = `fromSearch.php?article=${encodeURIComponent(formattedQuery)}`;
    } else {
        console.error("Error!");
    }
});