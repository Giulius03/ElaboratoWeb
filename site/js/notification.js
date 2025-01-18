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