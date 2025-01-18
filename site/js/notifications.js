const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");
const lblAllRead = document.querySelector("main > section > header > button:first-of-type > span:last-of-type");
const lblDeleteAll = document.querySelector("main > section > header > button:last-of-type > span:last-of-type");
const notTitle = document.querySelector("main > section > header > h1");
let seqNumber = 0;
let italianTitle = "";

btnItaPhone.addEventListener('click', (event) => {
    lblAllRead.textContent = "Segna tutte come già lette";
    lblDeleteAll.textContent = "Elimina tutte";
    notTitle.textContent = "Le Tue Notifiche";
    getNotifications("it");
});

btnItaPC.addEventListener('click', (event) => {
    lblAllRead.textContent = "Segna tutte come già lette";
    lblDeleteAll.textContent = "Elimina tutte";
    notTitle.textContent = "Le Tue Notifiche";
    getNotifications("it");
    console.log(italianTitle);
    if (italianTitle === "") {
        document.querySelector("main > section > div > section:last-of-type").style.display = 'flex';
        document.querySelector("main > section > div > section:last-of-type > em").textContent = "Nessuna notifica selezionata.";
    } else {
        seeNotification("it", italianTitle, seqNumber);
    }
});

btnEngPhone.addEventListener('click', (event) => {
    lblAllRead.textContent = "Mark all as read";
    lblDeleteAll.textContent = "Delete all";
    notTitle.textContent = "Your Notifications";
    getNotifications("en");
});

btnEngPC.addEventListener('click', (event) => {
    lblAllRead.textContent = "Mark all as read";
    lblDeleteAll.textContent = "Delete all";
    notTitle.textContent = "Your Notifications";
    getNotifications("en");
    if (italianTitle === "") {
        document.querySelector("main > section > div > section:last-of-type").style.display = 'flex';
        document.querySelector("main > section > div > section:last-of-type > em").textContent = "No notifications selected.";
    } else {
        seeNotification("en", italianTitle, seqNumber);
    }
});

async function changeStatusNotification(event, read, lang, title, sequenceNumber) {
    if (event !== null) {
        event.stopPropagation();
    }
    const url = read ? 'utils/readNotification.php' : 'utils/deleteNotification.php';
    let formData = new FormData();
    formData.append('title', title);
    formData.append('sequenceNumber', sequenceNumber);

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
            getNotifications(lang);
            if (!read && window.innerWidth >= 768) {
                document.querySelector("main > section > div > section:last-of-type").style.display = 'flex';
                getSingleNotification(lang, "", 0);
            }
        } else {
            let problem = lang === "en" ? "Operation failed." : "Operazione fallita.";
            document.querySelector("main").innerHTML += `<p style="text-align: center;">${problem}</p>`;
        }

    } catch (error) {
        console.log(error.message);
    }
}

async function changeStatusAllNotifications(lang, readAll) {
    const url = readAll ? "utils/readAllNotifications.php" : "utils/deleteAllNotifications.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        getNotifications(lang);
        if (!readAll && window.innerWidth >= 768) {
            document.querySelector("main > section > div > section:last-of-type").style.display = 'flex';
            getSingleNotification(lang, "", 0);
        }    
    } catch (error) {
        console.log(error.message);
    }
}

function seeNotification(lang, title, sequenceNumber) {
    if (window.innerWidth < 768) {
        window.location.href = "notification.php?title=" + title + "&sequenceNumber=" + sequenceNumber;
    } else {
        document.querySelector("main > section > div > section:last-of-type").style.display = 'block';
        getSingleNotification(lang, title, sequenceNumber);
    }
}

function generateNotifications(lang, notifications) {
    let notsSections = `
    <h2>tit</h2>
    `;

    if (notifications.length === 0) {
        let comunication = lang === "en" ? "You have no notification." : "Non hai nessuna notifica.";
        notsSections = `
        <p>${comunication}</p>
        `;
        return notsSections;
    }

    for (let i = 0; i < notifications.length; i++) {
        let title = lang === "en" ? notifications[i]["titoloeng"] : notifications[i]["titoloita"];
        let text = lang === "en" ? notifications[i]["testoeng"] : notifications[i]["testoita"];

        notsSections += `
        <article onclick="seeNotification('${lang}', '${notifications[i]["titoloita"]}', ${notifications[i]["numseq"]})`;
        if (notifications[i]["letta"] === 0) {
            notsSections += `; changeStatusNotification(event, true, '${lang}', '${notifications[i]["titoloita"]}', ${notifications[i]["numseq"]})`;
        }
        notsSections += `">
            <h2>tit</h2>
            <header>`;
        notsSections += notifications[i]["letta"] === 0 ? `<strong>${title}</strong>` : `<p>${title}</p>`;
        notsSections += `
                <section>
                    <h2>tit</h2>`;
        notsSections += `<button onclick="changeStatusNotification(event, false, '${lang}', '${notifications[i]["titoloita"]}', ${notifications[i]["numseq"]})"><span class="bi bi-trash"></button>`;
        notsSections += notifications[i]["letta"] === 0 ? `<button><span class="bi bi-envelope"></button>` : `<button><span class="bi bi-envelope-open"></button>`;
        if (notifications[i]["letta"] === 0) {
            notsSections += `<button onclick="changeStatusNotification(event, true, '${lang}', '${notifications[i]["titoloita"]}', ${notifications[i]["numseq"]})"><span class="bi bi-check"></span></button>`;
        }
        notsSections += `
                </section>
            </header>
            <p class="text-truncate"`;
        if (notifications[i]["letta"] === 0) {
            notsSections += ` style="font-weight: 500"`;
        }
        notsSections += `>${text}</p>
        </article>`
    }

    return notsSections;
}

async function getNotifications(lang) {
    const url = "utils/getNotifications.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const notsSections = generateNotifications(lang, json);
        document.querySelector("main > section > div > section:first-of-type").innerHTML = notsSections;
    } catch (error) {
        console.log(error.message);
    }
}

function generateMessage(lang, message) {
    let articleNotification = `
    <h2>tit</h2>
    `;

    if (message === "") {
        let communication = lang === "en" ? "No notifications selected." : "Nessuna notifica selezionata.";
        articleNotification = `<em>${communication}</em>`;
        return articleNotification;
    }

    let title = lang === "en" ? message["titoloeng"] : message["titoloita"];
    let text = lang === "en" ? message["testoeng"].replace(/\n/, "<br>") : message["testoita"].replace(/\n/, "<br>");
    articleNotification += `
    <header>
        <strong>${title}</strong>
        <button onclick="changeStatusNotification(null, false, '${lang}', '${message["titoloita"]}', ${message["numseq"]})"><span class="bi bi-trash"></span></button>
    </header>
    <p>${text}</p>
    `;

    return articleNotification;
}

async function getSingleNotification(lang, titleita, sequenceNumber) {
    italianTitle = titleita;
    seqNumber = sequenceNumber;
    const url = "utils/seeNotification.php?title=" + titleita + "&sequenceNumber=" + sequenceNumber;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        
        document.querySelector("main > section > div > section:last-of-type").innerHTML = generateMessage(lang, json.length !== 0 ? json[0] : "");
    
    } catch (error) {
        console.log(error.message);
    }
}