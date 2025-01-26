function setUserLogFormLang(lang) {
    document.getElementById('title').textContent = lang === "en" ? "MY ORDERS" : "I MIEI ORDINI";
    document.getElementById('txtRel').textContent = lang === "en" ? "Releated Products" : "Articoli Correlati";
    getArticlesInOrder(lang);
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

function generateCards(lang, ordini, number) {
    let prezzo = 0;
    let order = lang === "en" ? "Order Number" : "Numero Ordine"
    let view = lang === "en" ? "View Order" : "Vedi Ordine"
    let article = `<h2 style="display: none;">validation</h2>
            <strong>${order}: ${number}</strong>
                <ul>
                `;

    for (let i = 0; i < ordini.length; i++) {
        let nome = lang === "en" ? ordini[i]["nomeeng"] : ordini[i]["nomeita"];
        article += `
                <li><img src="upload/${ordini[i]["nomeimmagine"]}" alt="${nome}" /> ${nome} ${ordini[i]["taglia"]}     X ${ordini[i]["quantità"]}</li>
        `
        prezzo += ordini[i]["quantità"] * ordini[i]["prezzo"];
    }

    article += `
        </ul>
        <form class="orderForm" action="singleOrder.php?orderNumber=${number}" method="POST">
            <input type="hidden" id="orderNumber${number}" name="orderNumber" value="${number}" />
            <input type="submit" id="btnAdd${number}" value="${view}" />
        </form>
        <p>
        `
    article += lang === "en" ? 'Total:€' : 'Totale:€'
    article += `${prezzo}</p>`
    

    return article;
}

async function getOrdersData() {
    const url = "utils/getOrders.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error.message);
    }
}

async function getArticlesInOrder(lang) {
    let allArticles = "";
    let gruppo = "";
    let categoria = "";
    let nomeita = "";
    try {
        // Ottieni gli ordini
        const orders = await getOrdersData(); // Attendi il completamento della funzione asincrona
        if (orders.length === 0) {
            console.log("Nessun ordine trovato.");
            return;
        }

        // Cicla attraverso gli ordini
        for (let i = 0; i < orders.length; i++) {
            let articlesList = [];
            const orderId = orders[i]["numero"];
            const url = `utils/getArticleInOrder.php?orderId=${orderId}`; // Passa l'ID ordine nella query string

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Errore nel recupero articoli per ordine ${orderId}: ${response.status}`);
                }
                const json = await response.json(); // Articoli per l'ordine corrente
                console.log(json);

                const articlesInOrder = json;
                for (let j = 0; j < articlesInOrder.length; j++){
                    const articleID = articlesInOrder[j]["Id"];
                    const url = `utils/getArticleInfo.php?articleID=${articleID}`;

                    try {
                        const response = await fetch(url);
                        if (!response.ok) {
                            throw new Error(`Response status: ${response.status}`);
                        }
                        const jsonArt = await response.json(); // Articoli per l'ordine corrente
                        console.log(jsonArt);
                        gruppo = jsonArt[0]["gruppo"];
                        categoria = jsonArt[0]["categoria"];
                        nomeita = jsonArt[0]["nomeita"];

                        articlesList = articlesList.concat(jsonArt);

                    } catch (error) {
                        console.log(error.message);
                    }
                }
                allArticles += generateCards(lang, articlesList, orderId);
            } catch (error) {
                console.log(error.message);
            }
            document.querySelector("main > section > section").innerHTML = allArticles;
        }
        generateRelatedCarousel(lang, gruppo, categoria, nomeita);
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