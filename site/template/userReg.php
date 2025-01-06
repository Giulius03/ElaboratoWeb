<section>
    <h1 id="signup"><?php echo $currentLanguage == "en" ? "Sign Up" : "Registrati" ?></h1>
    <form action="utils/signNewUser.php" method="POST" onsubmit="showSignUpResult('<?php echo $currentLanguage ?>', event)">
        <ul>
            <li class="form-floating mb-1">
                <input name="name" type="text" class="form-control" id="name" placeholder="name" required />
                <label id="lblname" for="name"><?php echo $currentLanguage == "en" ? "Name" : "Nome" ?></label>
            </li>
            <li class="form-floating mb-1">
                <input name="lastName" type="text" class="form-control" id="lastname" placeholder="lastname" required />
                <label id="lbllastname" for="lastname"><?php echo $currentLanguage == "en" ? "Last Name" : "Cognome" ?></label>
            </li>
            <li class="form-floating mb-1">
                <input name="birthDate" type="date" class="form-control" id="date" required />
                <label id="lbldate" for="date"><?php echo $currentLanguage == "en" ? "Birth Date" : "Data di Nascita" ?></label>
            </li>
            <li class="form-floating mb-1">
                <input name="taxIDCode" type="text" class="form-control" id="taxid" placeholder="taxidcode" maxlength="16" required />
                <label id="lbltaxid" for="taxid"><?php echo $currentLanguage == "en" ? "TaxID Code" : "Codice Fiscale" ?></label>
            </li>
            <li class="form-floating mb-1">
                <select name="nation" id="nationSelect" class="form-select" aria-label="Default select example" required>
                    <option id="optDefault" disabled selected><?php echo $currentLanguage == "en" ? "Nation" : "Nazione" ?></option>
                    <!-- Nations -->
                </select>
            </li>
            <li class="form-floating mb-1">
                <input name="city" type="text" class="form-control" id="city" placeholder="city" required />
                <label id="lblcity" for="city"><?php echo $currentLanguage == "en" ? "City" : "Città" ?></label>
            </li>
            <li class="form-floating mb-1">
                <input name="address" type="text" class="form-control" id="address" placeholder="e.g. Via Università" required />
                <label id="lbladdress" for="address"><?php echo $currentLanguage == "en" ? "Address" : "Indirizzo" ?></label>
            </li>
            <li class="form-floating mb-1">
                <input name="houseNumber" type="number" class="form-control" id="housenumber" placeholder="house number" required />
                <label id="lblhousenumber" for="housenumber"><?php echo $currentLanguage == "en" ? "House Number" : "Numero Civico" ?></label>
            </li>
            <?php require 'template/userPw.php' ?>
            <li class="form-floating d-flex align-items-center">
                <input name="confirmPassword" type="password" class="form-control flex-grow-1" id="confpassword" placeholder="confPassword" required />
                <label id="lblconf" for="confpassword"><?php echo ($currentLanguage == "en" ? "Confirm" : "Conferma")." Password" ?></label>
                <span class="bi bi-eye-fill" id="btnSeeConfPw"></span>
            </li>
            <li>
                <input type="submit" id="btnCreate" value="<?php echo $currentLanguage == "en" ? "Create Account" : "Crea Account" ?>" />
            </li>
            <li>
                <a id="loginLink" href="login.php"><?php echo $currentLanguage == "en" ? "Do you already have an account? Log In" : "Hai già un account? Accedi" ?></a>
            </li>
        </ul>
    </form>
</section>