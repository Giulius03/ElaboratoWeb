const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");
let nameita = "";
let initialSize = "";

btnItaPhone.addEventListener('click', (event) => {
    setProductLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setProductLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setProductLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setProductLang("en");
});

function setProductLang(lang) {
    document.querySelector("main > section > section:nth-of-type(3) > div > div > form").setAttribute("onsubmit", 
        "return handleSubmit('" + lang + "', event)");
    getProduct(lang, nameita, initialSize);
    let textDetails = lang === "en" ? "Product Details" : "Dettagli Prodotto";
    document.querySelector("main > section > section:nth-of-type(2) > button").innerHTML = `
    ${textDetails}<span class="bi bi-chevron-down"></span>
    `;
    let textOptions = lang === "en" ? "Options" : "Opzioni";
    document.querySelector("main > section > section:nth-of-type(3) > button").innerHTML = `
    ${textOptions}<span class="bi bi-chevron-down"></span>
    `;
    document.querySelector("main > section > section:nth-of-type(3) > div > div > form input:first-of-type").setAttribute("value", lang === "en" ? "Buy Now" : "Compra Ora");
    document.querySelector("main > section > section:nth-of-type(3) > div > div > form input:last-of-type").setAttribute("value", lang === "en" ? "Add to Cart" : "Aggiungi al Carrello");
}

function generateGeneralView(lang, article) {
    let title = lang === "en" ? article["nomeeng"] : article["nomeita"];
    let productView = `
    <header class="d-flex justify-content-center align-items-center">
        <h1>${title}</h1>`;
    console.log(article["valutazione"]);
    for (let i = 0; i < 5; i++) {
        let className = "";
        if (article["valutazione"] >= i + 1) {
            className = 'bi bi-star-fill';
        } else if (article["valutazione"] > i && article["valutazione"] < i + 1) {
            className = 'bi bi-star-half';
        } else {
            className = 'bi bi-star';
        }
        productView += `
        <span class="${className}"></span>
        `;
    }
    productView += `
    </header>
    <img src="upload/${article["img"]}" alt="${title}" />
    <section>
        <p>€${article["prezzo"]}</p>
        <button><span class="bi bi-heart"></span>${article["likes"]}</button>
    </section>
    `;
    return productView;
}

function generateDescription(lang, article) {
    let description = lang === "en" ? article["desceng"] : article["descita"];
    return `<p>${description}</p>`;
}

function generateOptions(lang, id, defaultSize) {
    let word = "";
    switch (id) {
        case 0:
            word = lang === "en" ? "Quantity: " : "Quantità: ";
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:first-of-type").innerHTML = "";
            for (let i = 0; i < 5; i++) {
                document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:first-of-type").innerHTML += `
                <option value="${i+1}">${word}${i+1}</option>
                `;
            }
            break;
        case 1:
            word = lang === "en" ? "Size: " : "Taglia: ";
            let sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

            let options = "";
            sizes.forEach(size => {
                let txtSelected = size === defaultSize ? "selected" : "";
                options += `
                <option value="${size}" ${txtSelected}>${word}${size}</option>
                `;
            });
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:nth-of-type(2)").innerHTML = options;
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:nth-of-type(2)").setAttribute("onchange", 
                "getProduct('" + lang + "', '" + nameita + "', this.value)");
            break;
        case 2:
            word = lang === "en" ? "Color: " : "Colore: ";
            let white = lang === "en" ? "White" : "Bianco";
            let black = lang === "en" ? "Black" : "Nero";
            let currentColor = nameita.split(" ")[1];
            let colors = ['Ner', 'Bianc', 'Bordeaux'];
            let colorsOptions = "";

            colors.forEach(color => {
                let selected = currentColor.includes(color) ? "selected" : "";
                let colorName = color === "Bianc" ? white : (color === "Ner" ? black : "Bordeaux");
                colorsOptions += `
                <option value="${colorName}" ${selected}>${word}${colorName}</option>
                `;
            });

            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:last-of-type").innerHTML = colorsOptions;
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:last-of-type").setAttribute("onchange", 
                "changeArticleColor('" + lang + "', this.value)");
            break;
        default:
            break;
    }
}

function changeArticleColor(lang, selectedValue) {
    let newColorName = "";
    if (selectedValue === "White" || selectedValue === "Bianco") {
        switch (nameita.split(" ")[0]) {
            case "Pantaloni":
                newColorName = " Bianchi"
                break;
            case "Maglietta", "Felpa":
                newColorName = " Bianca";
                break;
            case "Cappello":
                newColorName = " Bianco";
                break;
        }
    } else if (selectedValue === "Black" || selectedValue === "Nero") {
        switch (nameita.split(" ")[0]) {
            case "Pantaloni":
                newColorName = " Neri"
                break;
            case "Maglietta", "Felpa":
                newColorName = " Nera";
                break;
            case "Cappello":
                newColorName = " Nero";
                break;
        }
    } else {
        newColorName = " Bordeaux";
    }
    let newNameIta = nameita.split(" ")[0] + newColorName;
    getProduct(lang, newNameIta, initialSize);
}

async function getProduct(lang, italianName, size) {
    nameita = italianName;
    initialSize = size;
    const url = "utils/getProductByName.php?product=" + italianName + "&size=" + size;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        document.querySelector("main > section > section:first-of-type").innerHTML = generateGeneralView(lang, json[0]);
        document.querySelector("main > section > section:nth-of-type(2) > div > div").innerHTML = generateDescription(lang, json[0]);
        for (let i = 0; i < 3; i++) {
            generateOptions(lang, i, size);
        }

        let availableText = lang === "en" ? "Product available" : "Prodotto disponibile";
        let notAvailableText = lang === "en" ? "Product not available" : "Prodotto non disponibile";
        let pAvailable = document.querySelector("main > section > section:nth-of-type(3) > div > div > p");

        if (json[0]["categoria"] === "Souvenir") {
            pAvailable.style.color = json[0]["quantTot"] > 0 ? 'green' : 'red';
            pAvailable.textContent = json[0]["quantTot"] > 0 ? availableText : notAvailableText;
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:nth-of-type(2)").style.display = 'none';
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:last-of-type").style.display = 'none';    
        } else {
            pAvailable.style.color = json[0]["quantDispTaglia"] > 0 ? 'green' : 'red';
            pAvailable.textContent = json[0]["quantDispTaglia"] > 0 ? availableText : notAvailableText;    
        }
        
        let noColorsClothes = ['Maglia', 'Pantaloncini', 'Calzettoni'];
        if (noColorsClothes.includes(italianName.split(" ")[0])) {
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:last-of-type").style.display = 'none';
        }

        if (pAvailable.style.color === 'red') {
            document.querySelector("#btnBuyNow").style.display = 'none';
            document.querySelector("#btnAddToCart").style.display = 'none';
        } else {
            document.querySelector("#btnBuyNow").style.display = 'inline-block';
            document.querySelector("#btnAddToCart").style.display = 'inline-block';
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function handleSubmit(lang, event) {
    const clickedButton = event.submitter.value;
    event.preventDefault();
    let url = "";
  
    if (clickedButton === "Compra Ora" || clickedButton === "Buy Now") {
        //reindirizzamento alla pagina di pagamento passando tutti i dati e creazione dell'ordine con singolo prodotto
    } else {
        //aggiunta al carello del prodotto
        url = "utils/addToCart.php";
        let formData = new FormData();
        formData.append('articleName', nameita);
        formData.append('size', initialSize);
        formData.append('quantity', document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:first-of-type").value);
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
                let originalText = document.querySelector("#btnAddToCart").value;
                document.querySelector("#btnAddToCart").setAttribute("value", lang === "en" ? "Added" : "Aggiunto");
                setTimeout(() => {
                    document.querySelector("#btnAddToCart").setAttribute("value", originalText);
                }, 2000);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}
  