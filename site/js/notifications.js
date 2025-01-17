const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");
const lblAllRead = document.querySelector("main > section > header > button:first-of-type > span:last-of-type");
const lblDeleteAll = document.querySelector("main > section > header > button:last-of-type > span:last-of-type");

btnItaPhone.addEventListener('click', (event) => {
    lblAllRead.textContent = "Segna tutte come già lette";
    lblDeleteAll.textContent = "Elimina tutte";
    getNotifications("it");
});

btnItaPC.addEventListener('click', (event) => {
    lblAllRead.textContent = "Segna tutte come già lette";
    lblDeleteAll.textContent = "Elimina tutte";
    getNotifications("it");
});

btnEngPhone.addEventListener('click', (event) => {
    lblAllRead.textContent = "Mark all as read";
    lblDeleteAll.textContent = "Delete all";
    getNotifications("en");
});

btnEngPC.addEventListener('click', (event) => {
    lblAllRead.textContent = "Mark all as read";
    lblDeleteAll.textContent = "Delete all";
    getNotifications("en");
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
                window.location.reload();
            }
        } else {
            alert(lang === "en" ? "Operation failed." : "Operazione fallita.");
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
            window.location.reload();
        }    } catch (error) {
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
    let notsSections = "";

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
            <header>`;
        notsSections += notifications[i]["letta"] === 0 ? `<strong>${title}</strong>` : `<p>${title}</p>`;
        notsSections += `
                <section>`;
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
    let articleNotification = "";
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
        
        document.querySelector("main > section > div > section:last-of-type").innerHTML = generateMessage(lang, json[0]);
    
    } catch (error) {
        console.log(error.message);
    }
}