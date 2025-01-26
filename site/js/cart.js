function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "SHOPPING CART" : "CARRELLO";
    document.getElementById('btnBuy').setAttribute("value", lang === "en" ? "Buy Now" : "Acquista Ora");
    document.getElementById('txtRel').textContent = lang === "en" ? "Releated Products" : "Articoli Correlati";
    getArticlesData(lang);
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
    let carrelloVuoto = lang === "en" ? 'Empty Cart!' : 'Carrello Vuoto!'
    let elimina = lang === "en" ? 'Delete' : 'Elimina'
    let quantità = lang === "en" ? 'Quantity' : 'Quantità'
    let prezzo = lang === "en" ? 'Cost Single Product' : 'Prezzo Singolo Prodotto'
    let size = lang === "en" ? 'Size' : 'Taglia'
    let acquista= lang == "en" ? "Buy Now" : "Acquista Ora";
    let totale = 0;
    let article = "";

    if(articoli.length > 0){
        for (let i = 0; i < articoli.length; i++) {
            let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
            let descrizione = lang === "en" ? articoli[i]["descrizioneeng"] : articoli[i]["descrizioneita"];
            article += `
                <h2 style="display: none;">validation</h2>
                <article>
                    <h2>validation</h2>
                    <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}"/>
                    <strong>${nome}</strong><form action="utils/deleteCart.php" method="POST" onsubmit="deleteCart('<?php echo $currentLanguage ?>', event)">
                        <input type="hidden" id="articleCartName${i}" name="articleCartName" value="${articoli[i]["nomeita"]}"/>
                        <button class="btn-with-icon" type="submit">
                            <strong class="fa fa-trash"></strong>
                            ${elimina}
                        </button>
                    </form>
                    <p>${size}: ${articoli[i]["taglia"]}</p>
                    <p>${descrizione}</p>
                    <p>${quantità}: ${articoli[i]["quantità"]}</p>
                    <p>${prezzo}: €${articoli[i]["prezzo"]}</p>
                </article>
            `
            totale += (articoli[i]["prezzo"]*articoli[i]["quantità"]);
        }
    } else {
        article += `
                <article>
                    <h2>validation</h2>
                    <strong>${carrelloVuoto}</strong>
                </article>
            `
    }

    article += `<form class="formCart" action="payment.php?" id="cartForm" method="GET">
                    <input type="submit" id="btnBuy" class="buyCart" value="${acquista}" />
                    <input type="hidden" name="cart" value="yes" />
                </form>
                <p>`
    article += lang === "en" ? 'Total:€' : 'Totale:€'
    totale = parseFloat(totale.toFixed(2));
    article += `${totale}</p>
        `

    return article;
}

async function getArticlesData(lang) {
    const url = "utils/getCart.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        console.log(json[0]["gruppo"], json[0]["categoria"]);
        const articles = generateCards(lang, json);
        document.querySelector("main > section > section").innerHTML = articles;
        generateRelatedCarousel(lang, json[0]["gruppo"], json[0]["categoria"], json[0]["nomeita"]);
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteCart(lang, event) {
    event.preventDefault();

    const form = event.target.closest("form");
    const articleName = form.querySelector('input[name="articleCartName"]').value;
    const url = "utils/deleteCart.php";
    let formData = new FormData();
    formData.append('articleCartName', articleName);

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
            console.log(lang === "en" ? "Product deleted from cart." : "Prodotto eliminato dal carrello.");
            getArticlesData(lang);
        } else {
            console.log(json["error"]);
        }
    } catch (error) {
        console.log(error.message);
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

async function generateRelatedCarousel(lang, group, category, nameita) {
    const url = "utils/getRelated.php?group=" + group + "&category=" + category + "&currentArticle=" + nameita;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        let related = generateRelated(lang, json);
        document.querySelector("main > section > section:last-of-type > section > section").innerHTML = related;
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