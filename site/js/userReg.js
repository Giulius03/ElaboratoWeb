const signUpTitle = document.getElementById('signup');
const btnSeePw = document.getElementById('btnSeePw');
const btnSeeConfPw = document.getElementById('btnSeeConfPw');

const btnItaPhone = document.getElementById("btnIta1");
const btnItaPC = document.getElementById("btnIta2");
const btnEngPhone = document.getElementById("btnEng1");
const btnEngPC = document.getElementById("btnEng2");

btnItaPhone.addEventListener('click', (event) => {
    setUserRegFormLang("it");
});

btnItaPC.addEventListener('click', (event) => {
    setUserRegFormLang("it");
});

btnEngPhone.addEventListener('click', (event) => {
    setUserRegFormLang("en");
});

btnEngPC.addEventListener('click', (event) => {
    setUserRegFormLang("en");
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

function setUserRegFormLang(lang) {
    signUpTitle.textContent = lang === "en" ? "Sign Up" : "Registrati";
    document.getElementById('lblname').textContent = lang === "en" ? "Name" : "Nome";
    document.getElementById('lbllastname').textContent = lang === "en" ? "Last Name" : "Cognome";
    document.getElementById('lbldate').textContent = lang === "en" ? "Birth Date" : "Data di Nascita";
    document.getElementById('lbltaxid').textContent = lang === "en" ? "TaxID Code" : "Codice Fiscale";
    document.getElementById('lblnation').textContent = lang === "en" ? "Nation" : "Nazione";
    document.getElementById('lblcity').textContent = lang === "en" ? "City" : "Città";
    document.getElementById('lbladdress').textContent = lang === "en" ? "Address" : "Indirizzo";
    document.getElementById('lblhousenumber').textContent = lang === "en" ? "House Number" : "Numero Civico";
    document.getElementById('lblconf').textContent = (lang === "en" ? "Confirm" : "Conferma") + " Password";
    document.getElementById('btnCreate').setAttribute("value", (lang === "en" ? "Create" : "Crea") + " Account");
    document.getElementById('loginLink').textContent = lang === "en" ? "Do you already have an account? Log In" : "Hai già un account? Accedi";
}

const nations = [
    'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla',
    'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
    'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory',
    'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
    'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island',
    'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, Democratic Republic of the',
    'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti',
    'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
    'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana',
    'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland',
    'Grenada', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong',
    'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
    'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'South Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
    'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'North Macedonia',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania',
    'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat',
    'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand',
    'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan',
    'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands',
    'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal',
    'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
    'South Africa', 'South Georgia and the South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
    'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
    'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands',
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Venezuela', 'Vietnam', 'Virgin Islands', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'
];

const nationsSelect = document.getElementById('nationSelect');

nations.forEach(nation => {
    nationsSelect.innerHTML += `
    <option value="${nation}">${nation}</option>
    `;
});

function is16YearsOld() {
    let today = new Date();
    let inputDate = new Date(document.getElementById('date').value);

    if (today.getFullYear() - inputDate.getFullYear() > 16) {
        return true;
    } else if (today.getFullYear() - inputDate.getFullYear() < 16) {
        return false;
    }
    
    if (today.getMonth() - inputDate.getMonth() > 0) {
        return true;
    } else if (today.getMonth() - inputDate.getMonth() < 0) {
        return false;
    }

    if (today.getDate() - inputDate.getDate() >= 0) {
        return true;
    }
    return false;
}

function signUpFormValid(lang) {    
    let problem = "";
    if (!is16YearsOld()) {
        problem = lang === "en" ? "You have to be at least 16 years old to sign up." : "Devi avere almeno 16 anni per iscriverti.";
        document.querySelector("main").innerHTML += `<p style="text-align: center;">${problem}</p>`;
        return false;
    }
    if (document.getElementById('housenumber').value <= 0) {
        problem = lang === "en" ? "House number not valid." : "Numero civico non valido.";
        document.querySelector("main").innerHTML += `<p style="text-align: center;">${problem}</p>`;
        return false;
    }
    if (document.getElementById('password').value !== document.getElementById('confpassword').value) {
        problem = lang === "en" ? "The passwords don't match." : "Le password non corrispondono.";
        document.querySelector("main").innerHTML += `<p style="text-align: center;">${problem}</p>`;
        return false;
    }
    return true;
}

async function showSignUpResult(lang, event) {
    event.preventDefault();

    const url = 'utils/signNewUser.php';
    let formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('lastName', document.getElementById('lastname').value);
    let month = new Date(document.getElementById('date').value).getMonth()+1;
    formData.append('birthDate', new Date(document.getElementById('date').value).getFullYear() + "-" + month + "-" + new Date(document.getElementById('date').value).getDate());
    let taxIDCode = document.getElementById('taxid').value
    formData.append('taxIDCode', taxIDCode);
    formData.append('nation', nationsSelect.value);
    formData.append('city', document.getElementById('city').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('houseNumber', document.getElementById('housenumber').value);
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);

    try {
        if (signUpFormValid(lang) === false) {
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
            sendWelcomeNotification(taxIDCode);
        } else {
            document.querySelector("main").innerHTML += `<p style="text-align: center;">${json["error"]}</p>`;
        }
    } catch (error) {
        console.log(error.message)
    }
}

async function sendWelcomeNotification(user) {
    const url = "utils/sendNotification.php?user=" + user + "&title=Sconto di benvenuto !";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if (json["successful"] === false) {
            console.log(json["error"]);
        } else {
            window.location.href = "login.php";
        }
    } catch (error) {
        console.log(error.message);
    }
}