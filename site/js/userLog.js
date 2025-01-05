const logInTitle = document.getElementById('login');
const btnSeePw = document.getElementById('btnSeePw');

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

btnSeePw.addEventListener('click', (event) => {
    changePwProp(btnSeePw, document.getElementById('password'));
});

function changePwProp(button, input) {
    let type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    button.className = button.className === "bi bi-eye-fill" ? "bi bi-eye-slash-fill" : "bi bi-eye-fill";
}

function setUserLogFormLang(lang) {
    logInTitle.textContent = lang === "en" ? "Log In" : "Accedi";
    document.getElementById('forgotLink').textContent = lang === "en" ? "Forgotten password?" : "Password dimenticata?";
    document.getElementById('btnLog').setAttribute("value", lang === "en" ? "Enter" : "Entra");
    document.getElementById('signupLink').textContent = lang === "en" ? "Don't you signed up yet? Sign Up" : "Non ti sei ancora registrato? Iscriviti";
}