const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");
let buyFromCart = false;
let articleToBuy = "";
let articleSize = "";
let quantityToBuy = 0;
let price = 0;

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
    document.querySelector("main > form > fieldset:first-of-type > ul > li:nth-of-type(3) > label").textContent = lang === "en" ? "Expiry" : "Scadenza";
    document.querySelector("main > form > fieldset:first-of-type > ul > li:last-of-type > label").textContent = lang === "en" ? "Save for future purchases" : "Salva per acquisti futuri";
    document.querySelector("main > form > fieldset:nth-of-type(2) > legend").textContent = lang === "en" ? "Delivery Method" : "Metodo di Consegna";
    document.querySelector("main > form > fieldset:nth-of-type(2) > div > div:first-of-type > label").textContent = lang === "en" ? "Standard (free).\nDelivery within 3 weeks" : "Standard (gratis).\nConsegna entro 3\nsettimane";
    document.querySelector("main > form > fieldset:nth-of-type(2) > div > div:last-of-type > label").textContent = lang === "en" ? "Premium (€4.99).\nDelivery within a week" : "Premium (€4.99).\nConsegna entro 1\nsettimana";
    document.querySelector("main > form > fieldset:nth-of-type(3) > legend").textContent = lang === "en" ? "Order Summary" : "Riassunto Ordine";
    document.querySelector("main > form > fieldset:nth-of-type(3) > section > section:first-of-type > p").innerHTML = lang === "en" ? `Articles<br>Shipping Costs<br>Discount Applied` : `Articoli<br>Costi di Spedizione<br>Sconto Applicato`;
    document.querySelector("main > form > fieldset:nth-of-type(3) > input").setAttribute("value", lang === "en" ? "Order" : "Ordina");
    document.querySelector("main > form > fieldset:nth-of-type(3) > section > section:first-of-type > strong").innerHTML = lang === "en" ? "Total" : "Totale";
    document.querySelector("main > form > fieldset:nth-of-type(3) > strong").innerHTML = lang === "en" ? "Payment: " : "Pagamento: ";
}

function cardInputsVisible(visible) {
    document.querySelector("main > form > fieldset:first-of-type > ul").style.display = visible ? 'block' : 'none';
    document.getElementById("cvv").required = visible ? true : false;
}

function start(cart, article, size, pricee, quantity) {
    buyFromCart = cart;
    articleToBuy = article;
    articleSize = size;
    quantityToBuy = quantity;
    price = pricee;
    showPrices();
    getUserCard();
}

async function getUserCard() {
    const url = "utils/getUserCard.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);

        if (json.length > 0) {
            document.getElementById("cardNumber").value = json[0]["numerocarta"];
            document.getElementById("holder").value = json[0]["intestatario"];
            let data = json[0]["datascadenza"].split("-")[0] + "-" + json[0]["datascadenza"].split("-")[1];
            document.getElementById("expiryDate").value = data;
            document.getElementById("saveCard").disabled = true;
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function addOrder(lang, event) {
    event.preventDefault();

    const dataIns = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const dataCons = new Date(dataIns);
    dataCons.setHours(21, 0, 0, 0);

    let url = "utils/addOrder.php?fromCart=" + buyFromCart + "&dataIns=" + dataIns + "&dataCons=" + dataCons.toISOString().slice(0, 19).replace('T', ' ');
    if (buyFromCart === false) {
        url += "&article=" + articleToBuy + "&quantity=" + quantityToBuy + "&size=" + articleSize;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        
        if (json["successful"] === true) {
            if (document.getElementById("bycard").checked) {
                saveCard();
            } else {
                console.log("niente carta");
            }
            window.location.href = "orders.php";
        } else {
            console.log("Male");
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function saveCard() {
    const cardUrl = "utils/saveCard.php";
    let formData = new FormData();
    formData.append('cardNumber', document.getElementById('cardNumber').value);
    formData.append('holder', document.getElementById('holder').value);
    let expiry = document.getElementById('expiryDate').value + "-01";
    formData.append('expiryDate', expiry);

    if (document.getElementById("saveCard").checked) {
        try {
            const response = await fetch(cardUrl, {
                method: "POST",                   
                body: formData
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
            if (json["successful"] === true) {
                console.log("Card saved.");
            } else {
                console.log(json["error"]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

async function showPrices() {
    let discountToApply = false;

    const url = "utils/getNumberOfOrders.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        

        if (json["firstOrder"] === true) {
            discountToApply = true;
        }
    } catch (error) {
        console.log(error.message);
    }

    let selectedDeliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked');
    let txtShippingCosts = !selectedDeliveryMethod ? "€-.--" : (selectedDeliveryMethod.value == "standard" ? "€0.00" : "€4.99");
    let txtDiscount = discountToApply === true ? "30%" : "0%";
    let total = 0;
    let pricesSection = document.querySelector("main > form > fieldset:last-of-type > section > section:last-of-type");
    let txtPrices = `<h2>tit</h2>`;
    if (buyFromCart === false) {
        txtPrices += `
        <p>€${price * quantityToBuy}<br>`;
        total = price * quantityToBuy + (!selectedDeliveryMethod ? 0 : (selectedDeliveryMethod.value == "standard" ? 0 : 4.99));
    } else {
        const urlCart = "utils/getCart.php";
        let cart = "";
        let totCart = 0;
        try {
            const responseCart = await fetch(urlCart);
            if (!responseCart.ok) {
                throw new Error(`Response status: ${responseCart.status}`);
            }
            cart = await responseCart.json();
            console.log(cart);
        } catch (error) {
            console.log(error.message);
        }
        for (let i = 0; i < cart.length; i++) {
            totCart += (cart[i]["prezzo"]*cart[i]["quantità"]);
        }
        txtPrices += `
        <p>€${totCart}<br>`;
        total = totCart + (!selectedDeliveryMethod ? 0 : (selectedDeliveryMethod.value == "standard" ? 0 : 4.99));
    }
    txtPrices += `
    ${txtShippingCosts}<br>
    ${txtDiscount}</p>
    `;
    if (discountToApply === true) {
        total *= 0.7;
    }
    total = parseFloat(total.toFixed(2));
    txtPrices += `<strong>€${total}</strong>`;
    pricesSection.innerHTML = txtPrices;
}