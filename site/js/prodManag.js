const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");
let action = 0;
let currentQuantity = 0;
let currentLanguage = "";
let editArticle = "";

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

async function getAction(actionID, lang, article) {
    currentLanguage = lang;
    action = actionID;
    if (action === 2 || action === 3) {
        const findArticleUrl = "utils/getProductByName.php?product=" + article + "&size=M";
        try {
            const responseArticle = await fetch(findArticleUrl);
            if (!responseArticle.ok) {
                throw new Error(`Response status: ${responseArticle.status}`);
            }
            editArticle = await responseArticle.json();
            console.log(editArticle);
            document.getElementById("category").value = editArticle[0]["categoria"] === "Abbigliamento" ? "Clothing" : "Souvenir";
            document.getElementById("italianName").value = editArticle[0]["nomeita"];
            document.getElementById("englishName").value = editArticle[0]["nomeeng"];
            // document.getElementById("image").value = editArticle[0]["img"];
            document.getElementById("price").value = editArticle[0]["prezzo"];
            document.getElementById("descita").value = editArticle[0]["descita"];
            document.getElementById("desceng").value = editArticle[0]["desceng"];
            document.getElementById("eachsizequantity").value = editArticle[0]["categoria"] === "Souvenir" ? editArticle[0]["quantTot"] : editArticle[0]["quantDispTaglia"];
            getCurrentQuantity();
            manageGroup(document.getElementById("category"));
            switch (editArticle[0]["gruppo"]) {
                case "Felpe":
                    document.getElementById("group").value = "Hoodies";
                    break;
                case "Pantaloni":
                    document.getElementById("group").value = "Trousers";
                    break;
                case "Divise":
                    document.getElementById("group").value = "Kit";
                    break;
                case "Cappelli":
                    document.getElementById("group").value = "Caps";
                    break;
                case "Magliette":
                    document.getElementById("group").value = "T-Shirts";
                    break;
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    if (action === 3) {
        document.getElementById("category").disabled = true;
        document.getElementById("italianName").disabled = true;
        document.getElementById("englishName").disabled = true;
        document.getElementById("image").disabled = true;
        document.getElementById("price").disabled = true;
        document.getElementById("descita").disabled = true;
        document.getElementById("desceng").disabled = true;
        document.getElementById("eachsizequantity").disabled = true;
        document.getElementById("group").disabled = true;
    }
}

function manageProduct(event) {
    event.preventDefault();
    switch (action) {
        case 1:
            addProduct();
            break;
        case 2:
            editProduct();
            break;
        default:
            break;
    }
}

function manageGroup(select) {
    document.querySelector("main > form > ul > li:nth-of-type(8)").style.display = select.value === "Clothing" ? 'block' : 'none';
    document.getElementById("group").required = select.value === "Clothing" ? true : false;
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
        console.log(category);
        switch (group) {
            case "Kit":
                group = "Divise";
                break;
            case "Trousers":
                group = "Pantaloni";
                break;
            case "Hoodies":
                group = "Felpe";
                break;
            case "T-Shirts":
                group = "Magliette";
                break;
            case "Caps":
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
        const json = await response.json();
        console.log(json);
        if (json["successful"] === true) {
            window.location.href = "adminHome.php";
        } else {
            document.querySelector("main").innerHTML += `<p style="text-align: center;">${json["error"]}</p>`;
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function editProduct() {
    
}