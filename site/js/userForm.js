const signUpTitle = document.getElementById('signup');
const btnSeePw = document.getElementById('btnSeePw');
const btnSeeConfPw = document.getElementById('btnSeeConfPw');

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    setUserFormLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setUserFormLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setUserFormLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setUserFormLang("en");
});

btnSeePw.addEventListener('click', (event) => {
    changePwProp(btnSeePw, document.getElementById('password'));
});

btnSeeConfPw.addEventListener('click', (event) => {
    changePwProp(btnSeeConfPw, document.getElementById('confpassword'));
});

function changePwProp(button, input) {
    let type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    button.className = button.className === "bi bi-eye-fill" ? "bi bi-eye-slash-fill" : "bi bi-eye-fill";
}

function setUserFormLang(lang) {
    signUpTitle.textContent = lang === "en" ? "Sign Up" : "Registrati";
    document.getElementById('lblname').textContent = lang === "en" ? "Name" : "Nome";
    document.getElementById('lbllastname').textContent = lang === "en" ? "Last Name" : "Cognome";
    document.getElementById('lbldate').textContent = lang === "en" ? "Birth Date" : "Data di Nascita";
    document.getElementById('lbltaxid').textContent = lang === "en" ? "TaxID Code" : "Codice Fiscale";
    document.getElementById('lbladdress').textContent = lang === "en" ? "Address" : "Indirizzo";
    document.getElementById('lblconf').textContent = (lang === "en" ? "Confirm" : "Conferma") + " Password";
    document.getElementById('btnCreate').setAttribute("value", (lang === "en" ? "Create" : "Crea") + " Account");
    document.getElementById('loginLink').textContent = lang === "en" ? "Do you already have an account? Log In" : "Hai già un account? Accedi";
}