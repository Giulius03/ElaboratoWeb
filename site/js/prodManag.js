const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");
let action = 0;
let currentQuantity = 0;
let currentLanguage = "";

btnItaPhone.addEventListener('click', (event) => {
    setProdFormLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setProdFormLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setProdFormLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setProdFormLang("en");
});

function setProdFormLang(lang) {
    currentLanguage = lang;
    document.querySelector("main > form > h1").textContent = lang === "en" ? "Products Management" : "Gestione Prodotti";
    document.querySelector("main > form > ul > li:first-of-type > label").textContent = lang === "en" ? "Category" : "Categoria";
    document.querySelector("main > form > ul > li:first-of-type > select > option:nth-of-type(2)").textContent = lang === "en" ? "Clothing" : "Abbigliamento";
    document.querySelector("main > form > ul > li:nth-of-type(2) > label").textContent = lang === "en" ? "Italian Name" : "Nome Italiano";
    document.querySelector("main > form > ul > li:nth-of-type(3) > label").textContent = lang === "en" ? "English Name" : "Nome Inglese";
    document.querySelector("main > form > ul > li:nth-of-type(4) > label").textContent = lang === "en" ? "Image" : "Immagine";
    document.querySelector("main > form > ul > li:nth-of-type(5) > label").textContent = lang === "en" ? "Price (€)" : "Prezzo (€)";
    document.querySelector("main > form > ul > li:nth-of-type(6) > label").textContent = lang === "en" ? "Italian Description" : "Descrizione Italiana";
    document.querySelector("main > form > ul > li:nth-of-type(7) > label").textContent = lang === "en" ? "English Description" : "Descrizione Inglese";
    document.querySelector("main > form > ul > li:nth-of-type(8) > label").textContent = lang === "en" ? "Group" : "Gruppo";
    document.querySelector("main > form > ul > li:nth-of-type(8) > select > option:nth-of-type(2)").textContent = lang === "en" ? "Hoodies" : "Felpe";
    document.querySelector("main > form > ul > li:nth-of-type(8) > select > option:nth-of-type(3)").textContent = lang === "en" ? "Kit" : "Divise";
    document.querySelector("main > form > ul > li:nth-of-type(8) > select > option:nth-of-type(4)").textContent = lang === "en" ? "Caps" : "Cappelli";
    document.querySelector("main > form > ul > li:nth-of-type(8) > select > option:nth-of-type(5)").textContent = lang === "en" ? "Trousers" : "Pantaloni";
    document.querySelector("main > form > ul > li:nth-of-type(8) > select > option:nth-of-type(6)").textContent = lang === "en" ? "T-Shirts" : "Magliette";
    document.querySelector("main > form > ul > li:nth-of-type(9) > label").textContent = lang === "en" ? "Quantity available (for each size for the clothes) (1-100): " + currentQuantity : "Quantità disponibile (per ogni taglia per i vestiti) (1-100): " + currentQuantity;
    let value = "";
    switch (action) {
        case 1:
            value = currentLanguage === "en" ? "Add" : "Aggiungi";
            break;
        case 2:
            value = currentLanguage === "en" ? "Edit" : "Modifica";
            break;
        case 3:
            value = currentLanguage === "en" ? "Remove" : "Rimuovi";
            break;
    }
    document.querySelector("main > form > ul > li:last-of-type > input").setAttribute("value", value);
}

function getCurrentQuantity() {
    currentQuantity = document.querySelector("main > form > ul > li:nth-of-type(9) > input").value;
    document.querySelector("main > form > ul > li:nth-of-type(9) > label").textContent = currentLanguage === "en" ? "Quantity available (for each size for the clothes) (1-100): " + currentQuantity : "Quantità disponibile (per ogni taglia per i vestiti) (1-100): " + currentQuantity;
}

function getAction(actionID, lang) {
    currentLanguage = lang;
    action = actionID;
}

function manageProduct(event) {
    event.preventDefault();
    switch (action) {
        case 1:
            addProduct();
            break;
        default:
            break;
    }
}

function manageGroup(select) {
    document.querySelector("main > form > ul > li:nth-of-type(8)").style.display = select.value === "Clothing" ? 'block' : 'none';
}

async function addProduct() {
    const url = "utils/addProduct.php";
    let formData = new FormData();
    let image = (document.getElementById("image").value).split("\\")[2];
    formData.append('nameita', document.getElementById('italianName').value);
    formData.append('nameeng', document.getElementById('englishName').value);
    let category = "";
    if (document.getElementById('category').value === "Clothing" || document.getElementById('category').value === "Abbigliamento") {
        category = "Abbigliamento";
    } else {
        category = "Souvenir";
    }
    formData.append('category', category);
    formData.append('image', image);
    formData.append('price', document.getElementById('price').value);
    formData.append('descriptionita', document.getElementById('descita').value);
    formData.append('descriptioneng', document.getElementById('desceng').value);
    let group = document.getElementById('group').value;
    if (category !== "Souvenir") {
        switch (group) {
            case "Kit", "Divise":
                group = "Divise";
                break;
            case "Trousers", "Pantaloni":
                group = "Pantaloni";
                break;
            case "Felpe", "Hoodies":
                group = "Felpe";
                break;
            case "T-Shirts", "Magliette":
                group = "Magliette";
                break;
            case "Caps", "Cappelli":
                group = "Cappelli";
                break;
        }
    } else {
        group = "Souvenir";
    }
    formData.append('group', group);    
    formData.append('quantity', document.getElementById('eachsizequantity').value);

    try {
        const response = await fetch(url, {
            method: "POST",                   
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        window.location.href = url;
        // const json = await response.json();
        // console.log(json);
        // if (json["successful"] === true) {
        //     window.location.href = "adminHome.php";
        // } else {
        //     document.querySelector("main").innerHTML += `<p style="text-align: center;">${json["error"]}</p>`;
        // }
    } catch (error) {
        console.log(error.message);
    }
}