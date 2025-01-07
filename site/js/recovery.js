const recoveryTitle = document.getElementById('recovery');
const btnSeePw = document.getElementById('btnSeePw');
const btnSeeConfPw = document.getElementById('btnSeeConfPw');

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    setRecoveryFormLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setRecoveryFormLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setRecoveryFormLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setRecoveryFormLang("en");
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

function setRecoveryFormLang(lang) {
    recoveryTitle.textContent = lang === "en" ? "Create a new password" : "Crea una nuova password";
    let code = document.getElementById("lblRec").textContent.split(': ')[1];
    document.getElementById("lblRec").textContent = (lang === "en" ? "Insert the following code to verify you are not a bot: " : "Inserisci il seguente codice per verificare che non sei un bot: ") + code;
    document.getElementById("code").placeholder = lang === "en" ? "Insert here ..." : "Inserisci qui ...";
    document.getElementById("btnSend").setAttribute("value", lang === "en" ? "Send" : "Invia");
    document.getElementById("lblPw").textContent = (lang === "en" ? "New" : "Nuova") + " password";
    document.getElementById("lblConfPw").textContent = (lang === "en" ? "Confirm new" : "Conferma nuova") + " password"; 
    document.getElementById("btnSave").setAttribute("value", lang === "en" ? "Save" : "Salva");
}

async function checkCode(lang, event) {
    event.preventDefault();
    const url = "utils/verifyCode.php";
    let formData = new FormData();
    formData.append('code', document.getElementById('code').value);

    try {
        const response = await fetch(url, {
            method: "POST",                   
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (json["rightCode"] == true) {
            document.getElementById("codeForm").style.display = 'none';
            document.getElementById("newForm").style.display = 'block';
        } else {
            alert(lang === "en" ? "Wrong code." : "Codice errato.");
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function changePassword(lang, event) {
    event.preventDefault();

    const url = "utils/changePassword.php";
    let formData = new FormData();
    let password = document.getElementById('password').value;
    formData.append('confusername', document.getElementById('username').value);
    formData.append('password', password);
    try {
        if (password !== document.getElementById('confpassword').value) {
            alert(lang === "en" ? "The passwords don't match." : "Le password non corrispondono.");
            throw new Error('');
        }
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
            alert(lang === "en" ? "Password changed successfully." : "Password cambiata correttamente.");
            window.location.href = "login.php";
        } else {
            alert(json["error"]);
        }
    } catch (error) {
        console.log(error.message);
    }
}