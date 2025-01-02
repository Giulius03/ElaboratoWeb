function setHome(lang) {
    document.getElementById("title").textContent = lang == "en" ? "WELCOME" : "BENVENUTO";
}

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    setHome("it");
});

btnItaPC.addEventListener('click', (event) => {
    setHome("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setHome("en");
});

btnEngPC.addEventListener('click', (event) => {
    setHome("en");
});