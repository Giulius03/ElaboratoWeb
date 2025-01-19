const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");
let seqNumber = 0;
let italianTitle = "";

btnItaPhone.addEventListener('click', (event) => {
    seeNotification("it", italianTitle, seqNumber);
});

btnItaPC.addEventListener('click', (event) => {
    seeNotification("it", italianTitle, seqNumber);
});

btnEngPhone.addEventListener('click', (event) => {
    seeNotification("en", italianTitle, seqNumber);
});

btnEngPC.addEventListener('click', (event) => {
    seeNotification("en", italianTitle, seqNumber);
});

async function deleteNotification(lang, titleita, sequenceNumber) {
    const url = 'utils/deleteNotification.php';
    let formData = new FormData();
    formData.append('title', titleita);
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
            window.location.href = "notifications.php";
        } else {
            let problem = lang === "en" ? "Operation failed." : "Operazione fallita."
            document.querySelector("main").innerHTML += `<p style="text-align: center;">${problem}</p>`;
        }

    } catch (error) {
        console.log(error.message);
    }
}

function generateMessage(lang, message) {
    let articleNotification = `
    <h2>tit</h2>
    `;
    let title = lang === "en" ? message["titoloeng"] : message["titoloita"];
    let text = lang === "en" ? message["testoeng"].replace(/\n/, "<br>") : message["testoita"].replace(/\n/, "<br>");
    articleNotification += `
    <header>
        <strong>${title}</strong>
        <button onclick="deleteNotification('${lang}', '${message["titoloita"]}', ${message["numseq"]})"><span class="bi bi-trash"></span></button>
    </header>
    <p>${text}</p>
    `;
    if (message["titoloita"] === "Ordine richiesto") {
        let buttonText = lang === "en" ? "Click here" : "Clicca qui";
        articleNotification += `
        <button onclick="startOrder('${lang}', ${message["numseq"]})">${buttonText}</button>
        `;
    } else if (message["titoloita"] === "Ordine consegnato") {
        articleNotification += `
        <div class="d-flex">
        `;
        for (let i = 0; i < 5; i++) {
            articleNotification += `
            <button onclick="evaluation(${i+1})"><span id="star${i}" class="bi bi-star"></span></button>
            `;
        }
        articleNotification += `
        </div>
        `;
    }

    return articleNotification;
}

async function seeNotification(lang, titleita, sequenceNumber) {
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
        
        document.querySelector("main > article").innerHTML = generateMessage(lang, json[0]);
    
    } catch (error) {
        console.log(error.message);
    }
}

async function startOrder(lang, numSeq) {
    const url = "utils/startOrder.php?seqNum=" + numSeq;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (json["successful"] === false) {
            let communication = lang === "en" ? "Order already confirmed." : "Ordine già confermato.";
            document.querySelector("main > article").innerHTML += `<p style="text-align: center">${communication}</p>`
        } else {
            sendConfirmNotification(numSeq);
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function sendConfirmNotification(numSeq) {
    const url1 = "utils/findUserFromNthOrder.php?numSeq=" + numSeq;
    let user = "";
    try {
        let response = await fetch(url1);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let json = await response.json();
        user = json[0]["cf"];
    } catch (error) {
        console.log(error.message);
    }
    if (user !== "") {
        const url = "utils/sendNotification.php?user=" + user + "&title=Ordine confermato !";
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            let json = await response.json();
            console.log(json);
            if (json["successful"] === false) {
                console.log(json["error"]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

function evaluation(value) {
    for (let i = 0; i < 5; i++) {
        document.getElementById("star"+i).className = "bi bi-star";
    }
    for (let i = 0; i < value; i++) {
        document.getElementById("star"+i).className = "bi bi-star-fill";
    }
}