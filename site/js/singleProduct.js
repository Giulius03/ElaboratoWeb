const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");
let nameita = "";
let initialSize = "";
let favourites = "";
let swiperRelatedMobile = "";
let swiperRelatedPC = "";

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
    let textDetails = lang === "en" ? "Product Details" : "Dettagli Prodotto";
    document.querySelector("main > section > section:nth-of-type(2) > button").innerHTML = `
    ${textDetails}<span class="bi bi-chevron-down"></span>
    `;
    let textOptions = lang === "en" ? "Options" : "Opzioni";
    document.querySelector("main > section > section:nth-of-type(3) > button").innerHTML = `
    ${textOptions}<span class="bi bi-chevron-down"></span>
    `;
    document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > h2").innerHTML = textOptions;
    document.querySelector("main > section > section:nth-of-type(3) > div > div > form input:first-of-type").setAttribute("value", lang === "en" ? "Buy Now" : "Compra Ora");
    document.querySelector("main > section > section:nth-of-type(3) > div > div > form input:last-of-type").setAttribute("value", lang === "en" ? "Add to Cart" : "Aggiungi al Carrello");    
    document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > section > input:first-of-type").setAttribute("value", lang === "en" ? "Buy Now" : "Compra Ora");
    document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > section > input:last-of-type").setAttribute("value", lang === "en" ? "Add to Cart" : "Aggiungi al Carrello");    
    getProduct(lang, nameita, initialSize);
    document.querySelector("main > section > section:nth-of-type(4) > h2").textContent = lang === "en" ? "Related Products" : "Articoli Correlati";
    document.querySelector("main > div > section:last-of-type > h2").textContent = lang === "en" ? "Related Products" : "Articoli Correlati";
}

async function addOrDeleteFavourite(lang) {
    let alreadyFav = false;
    for (let i = 0; i < favourites.length; i++) {
        if (favourites[i]["nomeita"] === nameita) {
            alreadyFav = true;
            i = favourites.length;
        }
    }
    
    const url = alreadyFav ? "utils/deleteFavs.php" : "utils/addFavourite.php";
    let formData = new FormData();
    if (alreadyFav === true) {
        formData.append('articleFavsName', nameita);
    } else {
        formData.append('article', nameita);
        formData.append('size', initialSize);
    }
    try {
        const response = await fetch(url, {
            method: "POST",                   
            body: formData
        });
        const json = await response.json();
        console.log(json);
        if (json["successful"] === true) {
            getProduct(lang, nameita, initialSize);
        } else {
            let communication = lang === "en" ? "You have to be logged in to add a favourite." : "Devi essere loggato per aggiungere un preferito.";
            document.querySelector(window.innerWidth < 768 ? "main > section > section:first-of-type" : "main > div > section:first-of-type > section:first-of-type").innerHTML += `<br><a href="login.php">${communication}</a>`;
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

function generateGeneralViewMobile(lang, article) {
    let title = lang === "en" ? article["nomeeng"] : article["nomeita"];
    let productView = `
    <header class="d-flex justify-content-center align-items-center">
        <h2>${title}</h2>`;
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
        <h2 style="display: none">tit</h2>
        <p>€${article["prezzo"]}</p>
        <button onclick="addOrDeleteFavourite('${lang}')"><span class="bi bi-heart"></span>${article["likes"]}</button>
    </section>
    `;
    return productView;
}

function generateDescriptionMobile(lang, article) {
    let description = lang === "en" ? article["desceng"] : article["descita"];
    return `<p>${description}</p>`;
}

function generateOptionsMobile(lang, id, defaultSize) {
    let word = "";
    switch (id) {
        case 0:
            let quantitySelect = document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:first-of-type");
            word = lang === "en" ? "Quantity: " : "Quantità: ";
            quantitySelect.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                quantitySelect.innerHTML += `
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

function generateImageLikesPC(lang, article) {
    let title = lang === "en" ? article["nomeeng"] : article["nomeita"];
    let a = lang === "en" ? "" : "A ";
    let favText = lang === "en" ? " people like this article" : " persone piace questo articolo";
    let btnAddFavText = lang === "en" ? " Add to Favourites" : " Aggiungi ai Preferiti";
    let productView = `
    <h2 style="display: none">tit</h2>
    <img src="upload/${article["img"]}" alt="${title}" />
    <p>${a}${article["likes"]}${favText}</p>
    <button onclick="addOrDeleteFavourite('${lang}')"><span class="bi bi-heart"></span>${btnAddFavText}</button>
    `;

    return productView;
}

function generateGeneralViewPC(lang, article) {
    let title = lang === "en" ? article["nomeeng"] : article["nomeita"];
    let description = lang === "en" ? article["desceng"] : article["descita"];
    let detailsText = lang === "en" ? "Product Details" : "Dettagli Prodotto";
    let view = `<h2>${title}</h2>`;
    for (let i = 0; i < 5; i++) {
        let className = "";
        if (article["valutazione"] >= i + 1) {
            className = 'bi bi-star-fill';
        } else if (article["valutazione"] > i && article["valutazione"] < i + 1) {
            className = 'bi bi-star-half';
        } else {
            className = 'bi bi-star';
        }
        view += `
        <span class="${className}"></span>
        `;
    }
    view += `
    <p>€${article["prezzo"]}</p>
    <strong>${detailsText}</strong>
    <p>${description}</p>
    `;

    return view;
}

function generateOptionsPC(lang, id) {
    let word = "";
    switch (id) {
        case 0:
            let quantitySelect = document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > select:first-of-type");
            word = lang === "en" ? "Quantity: " : "Quantità: ";
            quantitySelect.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                quantitySelect.innerHTML += `
                <option value="${i+1}">${word}${i+1}</option>
                `;
            }
            break;
        case 1:
            word = lang === "en" ? "Size: " : "Taglia: ";
            let sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

            let options = "";
            sizes.forEach(size => {
                let txtSelected = size === initialSize ? "selected" : "";
                options += `
                <option value="${size}" ${txtSelected}>${word}${size}</option>
                `;
            });
            document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > select:nth-of-type(2)").innerHTML = options;
            document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > select:nth-of-type(2)").setAttribute("onchange", 
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

            document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > select:last-of-type").innerHTML = colorsOptions;
            document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > select:last-of-type").setAttribute("onchange", 
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

        getMobileProd(lang, json);
        getPCProd(lang, json);

        let availableText = lang === "en" ? "Product available" : "Prodotto disponibile";
        let notAvailableText = lang === "en" ? "Product not available" : "Prodotto non disponibile";
        let pAvailableMobile = document.querySelector("main > section > section:nth-of-type(3) > div > div > p");
        let pAvailablePC = document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > p");

        if (json[0]["categoria"] === "Souvenir") {
            pAvailableMobile.style.color = json[0]["quantTot"] > 0 ? '#006100' : '#800020';
            pAvailableMobile.textContent = json[0]["quantTot"] > 0 ? availableText : notAvailableText;
            pAvailablePC.style.color = json[0]["quantTot"] > 0 ? '#006100' : '#800020';
            pAvailablePC.textContent = json[0]["quantTot"] > 0 ? availableText : notAvailableText;
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:nth-of-type(2)").style.display = 'none';
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:last-of-type").style.display = 'none';    
            document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > select:nth-of-type(2)").style.display = 'none';
            document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > select:last-of-type").style.display = 'none';    
        } else {
            pAvailableMobile.style.color = json[0]["quantDispTaglia"] > 0 ? '#006100' : '#800020';
            pAvailableMobile.textContent = json[0]["quantDispTaglia"] > 0 ? availableText : notAvailableText;
            pAvailablePC.style.color = json[0]["quantDispTaglia"] > 0 ? '#006100' : '#800020';
            pAvailablePC.textContent = json[0]["quantDispTaglia"] > 0 ? availableText : notAvailableText;    
        }
        
        let noColorsClothes = ['Maglia', 'Pantaloncini', 'Calzettoni'];
        if (noColorsClothes.includes(nameita.split(" ")[0])) {
            document.querySelector("main > section > section:nth-of-type(3) > div > div > form > select:last-of-type").style.display = 'none';
            document.querySelector("main > div > section:first-of-type > section:nth-of-type(3) > form > select:last-of-type").style.display = 'none';    
        }

        if (pAvailableMobile.textContent === notAvailableText) {
            document.querySelector("#btnBuyNow").style.display = 'none';
            document.querySelector("#btnAddToCart").style.display = 'none';
            document.querySelector("#btnBuyNowPC").style.display = 'none';
            document.querySelector("#btnAddToCartPC").style.display = 'none';
        } else {
            document.querySelector("#btnBuyNow").style.display = 'inline-block';
            document.querySelector("#btnAddToCart").style.display = 'inline-block';
            document.querySelector("#btnBuyNowPC").style.display = 'block';
            document.querySelector("#btnAddToCartPC").style.display = 'block';

        }    
        const getFavUrl = "utils/getFavourites.php";
        try {
            const responseFav = await fetch(getFavUrl);
            if (!responseFav.ok) {
                throw new Error(`Response status: ${responseFav.status}`);
            }
            const jsonFavs = await responseFav.json();
            favourites = jsonFavs;
            for (let i = 0; i < jsonFavs.length; i++) {
                if (jsonFavs[i]["nomeita"] === nameita) {
                    document.querySelector("main > section > section:first-of-type > section > button > span").className = "bi bi-heart-fill";
                    document.querySelector("main > div > section:first-of-type > section:first-of-type button > span").className = "bi bi-heart-fill";
                    i = jsonFavs.length;
                }
            }
        } catch (error) {
            console.log(error.message);
        }
        generateRelatedCarousel(lang, json[0]["gruppo"], json[0]["categoria"]);
    } catch (error) {
        console.log(error.message);
    }
}

async function getMobileProd(lang, json) {
    document.querySelector("main > section > section:first-of-type").innerHTML = generateGeneralViewMobile(lang, json[0]);
    document.querySelector("main > section > section:nth-of-type(2) > div > div").innerHTML = generateDescriptionMobile(lang, json[0]);
    for (let i = 0; i < 3; i++) {
        generateOptionsMobile(lang, i, initialSize);
    }
}

async function getPCProd(lang, json) {
    document.querySelector("main > div > section:first-of-type > section:first-of-type").innerHTML = generateImageLikesPC(lang, json[0]);
    document.querySelector("main > div > section:first-of-type > section:nth-of-type(2)").innerHTML = generateGeneralViewPC(lang, json[0]);
    for (let i = 0; i < 3; i++) {
        generateOptionsPC(lang, i);
    }
}

function generateRelated(lang, articles) {
    let cards = "";

    for (let i = 0; i < articles.length; i++) {
        let name = lang === "en" ? articles[i]["nomeeng"] : articles[i]["nomeita"];
        let textUrl = articles[i]["nomeita"].replaceAll(" ", "%20")
        cards += `
        <h2 style="display: none">tit</h2>
        <section class="swiper-slide">
            <a href="singleProduct.php?product=${textUrl}">
                <article class="card">
                    <h2 style="display: none">tit</h2>
                    <img src="upload/${articles[i]["nomeimmagine"]}" alt="${name}">
                    <strong>${name}</strong>
                    <p>€${articles[i]["prezzo"]}</p>
                </article>
            </a>
        </section>`;
    }

    return cards;
}

async function generateRelatedCarousel(lang, group, category) {
    const url = "utils/getRelated.php?group=" + group + "&category=" + category + "&currentArticle=" + nameita;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        let related = generateRelated(lang, json);
        document.querySelector("main > section > section:nth-of-type(4) > section > section").innerHTML = related;
        document.querySelector("main > div > section:last-of-type > section > section").innerHTML = related;
        swiperRelatedMobile = new Swiper('#swiperRel', {
            loop: true, // Enables infinite scrolling
            slidesPerView: 1, // Default: 1 product visible
            navigation: {
                nextEl: '#nextRel',
                prevEl: '#prevRel',
            },
            pagination: false, // No dots at the bottom
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 90,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 130,
                }
            },
        });
        swiperRelatedPC = new Swiper('#swiperRelPC', {
            loop: true, // Enables infinite scrolling
            slidesPerView: 1, // Default: 1 product visible
            navigation: {
                nextEl: '#nextRelPC',
                prevEl: '#prevRelPC',
            },
            pagination: false, // No dots at the bottom
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 90,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 130,
                }
            },
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function handleSubmit(lang, event) {
    const clickedButton = event.submitter.value;
    event.preventDefault();
    let url = "";
    let quant = document.querySelector(window.innerWidth < 768 
        ? "main > section > section:nth-of-type(3) > div > div > form > select:first-of-type"
        : "main > div > section:first-of-type > section:nth-of-type(3) > form > select:first-of-type").value;
  
    if (clickedButton === "Compra Ora" || clickedButton === "Buy Now") {
        //reindirizzamento alla pagina di pagamento passando tutti i dati e creazione dell'ordine con singolo prodotto
        window.location.href = "payment.php?article=" + nameita + "&quantity=" + quant + "&size=" + initialSize;
    } else {
        //aggiunta al carello del prodotto
        const url = "utils/addToCart.php";
        let formData = new FormData();
        formData.append('articleName', nameita);
        formData.append('size', initialSize);
        formData.append('quantity', quant);
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
                let originalText = document.querySelector(window.innerWidth < 768 ? "#btnAddToCart" : "#btnAddToCartPC").value;
                document.querySelector(window.innerWidth < 768 ? "#btnAddToCart" : "#btnAddToCartPC").setAttribute("value", lang === "en" ? "Added" : "Aggiunto");
                setTimeout(() => {
                    document.querySelector(window.innerWidth < 768 ? "#btnAddToCart" : "#btnAddToCartPC").setAttribute("value", originalText);
                }, 1500);
            } else {
                let communication = lang === "en" ? "You have to be logged in to add to cart." : "Devi essere loggato per aggiungere al carrello.";
                document.querySelector(window.innerWidth < 768 ? "main > section > section:nth-of-type(3) > div section" : "main > div > section:first-of-type > section:nth-of-type(3)").innerHTML += `<br><a href="login.php">${communication}</a>`;    
            }
        } catch (error) {
            console.log(error.message);
        }
    }
} 