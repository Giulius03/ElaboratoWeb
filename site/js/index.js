function setHomeLang(lang) {
    document.getElementById("title").textContent = lang == "en" ? "WELCOME" : "BENVENUTO";
    document.getElementById("txtLast").textContent = lang == "en" ? "Last Releases" : "Ultime Uscite";
    document.getElementById("txtMost").textContent = lang == "en" ? "Most Wanted" : "I Più Venduti";
    document.getElementById("txtUs").textContent = lang == "en" ? "About Us" : "Su di Noi";
    const engPres = "“Purchase your official Bugs Burnley merchandise here. We offer the latest kits and lifestyle clothing as well as  trending men and women's fashion. You can also find a vast range of souvenirs and all the tickets to come at the stadium and support our magnificent team.”";
    const itaPres = "“Acquista qui il tuo merchandise ufficiale Bugs Burnley. Offriamo gli ultimi kit e abbigliamento lifestyle, nonché la moda maschile e femminile di tendenza. Inoltre potrete trovare una vasta gamma di souvenir e tutti i biglietti per venire allo stadio e sostenere la nostra magnifica squadra.”";
    document.getElementById("txtPres").textContent = lang == "en" ? engPres : itaPres;
    getArticlesData(true, lang);
    getArticlesData(false, lang);
}

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    setHomeLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setHomeLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setHomeLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setHomeLang("en");
});

const swiperLast = new Swiper(document.getElementById('swiperLast'), {
    loop: true, // Enables infinite scrolling
    slidesPerView: 1, // Default: 1 product visible
    navigation: {
        nextEl: document.getElementById('nextLast'),
        prevEl: document.getElementById('prevLast'),
    },
    pagination: false, // No dots at the bottom
    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 0,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40,
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

const swiperMost = new Swiper(document.getElementById('swiperMost'), {
    loop: true, // Enables infinite scrolling
    slidesPerView: 1, // Default: 1 product visible
    navigation: {
        nextEl: document.getElementById('nextMost'),
        prevEl: document.getElementById('prevMost'),
    },
    pagination: false, // No dots at the bottom
    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 0,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40,
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

function generateCards(lang, articoli) {
    let cards = "";

    for (let i = 0; i < articoli.length; i++) {
        let nome = lang == "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
        cards += `
        <div class="swiper-slide">
            <div class="card">
                <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}">
                <h5>${nome}</h5>
                <p>€${articoli[i]["prezzo"]}</p>
            </div>
        </div>`
    }

    return cards;
}

async function getArticlesData(lastReleases, lang) {
    const url = lastReleases ? "utils/getLastReleases.php" : "utils/getMostWanted.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const cards = generateCards(lang, json);
        document.querySelector(lastReleases ? "main > div > div" : "main > div:nth-of-type(2) > div").innerHTML = cards;
        if (lastReleases) {
            swiperLast.update();
        } else {
            swiperMost.update();
        }
    } catch (error) {
        console.log(error.message);
    }
}

setHomeLang("en");