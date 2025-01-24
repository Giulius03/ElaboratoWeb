const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    setPaymentLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setPaymentLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setPaymentLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setPaymentLang("en");
});

function setPaymentLang(lang) {
    document.querySelector("main > form > fieldset:first-of-type > legend").textContent = lang === "en" ? "Payment" : "Pagamento";
    document.querySelector("main > form > fieldset:first-of-type > label:first-of-type").textContent = lang === "en" ? "On Delivery" : "Alla Consegna";
    document.querySelector("main > form > fieldset:first-of-type > label:last-of-type").textContent = lang === "en" ? "By Card" : "Con Carta";
    document.querySelector("main > form > fieldset:first-of-type > ul > li:first-of-type > label").textContent = lang === "en" ? "Card Number" : "Numero di Carta";
    document.querySelector("main > form > fieldset:first-of-type > ul > li:nth-of-type(2) > label").textContent = lang === "en" ? "Holder" : "Intestatario";
    document.querySelector("main > form > fieldset:first-of-type > ul > li:nth-of-type(3) > label").textContent = lang === "en" ? "Expiry" : "Scandenza";
    document.querySelector("main > form > fieldset:nth-of-type(2) > legend").textContent = lang === "en" ? "Delivery Method" : "Metodo di Consegna";
    document.querySelector("main > form > fieldset:nth-of-type(2) > div > div:first-of-type > label").textContent = lang === "en" ? "Standard (free).\nDelivery within 3 weeks" : "Standard (gratis).\nConsegna entro 3\nsettimane";
    document.querySelector("main > form > fieldset:nth-of-type(2) > div > div:last-of-type > label").textContent = lang === "en" ? "Premium (€4.99).\nDelivery within a week" : "Premium (€4.99).\nConsegna entro 1\nsettimana";
    document.querySelector("main > form > fieldset:nth-of-type(3) > legend").textContent = lang === "en" ? "Order Summary" : "Riassunto Ordine";
    document.querySelector("main > form > fieldset:nth-of-type(3) > section > section:first-of-type > p").innerHTML = lang === "en" ? `Articles<br>Shipping Costs<br>Discount Applied` : `Articoli<br>Costi di Spedizione<br>Sconto Applicato`;
    document.querySelector("main > form > fieldset:nth-of-type(3) > input").setAttribute("value", lang === "en" ? "Order" : "Ordina");
}

function cardInputsVisible(visible) {
    document.querySelector("main > form > fieldset:first-of-type > ul").style.display = visible ? 'block' : 'none';
}