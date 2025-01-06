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
        let nome = lang === "en" ? articoli[i]["nomeeng"] : articoli[i]["nomeita"];
        let descrizione = lang === "en" ? articoli[i]["descrizioneeng"] : articoli[i]["descrizioneita"];
        cards += `
        <section class="swiper-slide">
            <article class="card">
                <img src="upload/${articoli[i]["nomeimmagine"]}" alt="${nome}">
                <strong>${nome}</strong>
                <p>${descrizione}</p>
                <p>€${articoli[i]["prezzo"]}</p>
            </article>
        </section>`
    }

    return cards;
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
        const cards = generateCards(lang, json);
        document.querySelector("main section:first-of-type > section > section > section > section").innerHTML = cards;
        if (lastReleases) {
            swiperLast.update();
        } else {
            swiperMost.update();
        }
    } catch (error) {
        console.log(error.message);
    }
}