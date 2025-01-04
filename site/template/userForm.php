<section>
    <h1 id="signup"><?php echo $currentLanguage == "en" ? "Sign Up" : "Registrati" ?></h1>
    <form action="#" method="POST">
        <div class="form-floating mb-1">
            <input type="text" class="form-control" id="name" placeholder="name" required />
            <label id="lblname" for="name"><?php echo $currentLanguage == "en" ? "Name" : "Nome" ?></label>
        </div>
        <div class="form-floating mb-1">
            <input type="text" class="form-control" id="lastname" placeholder="lastname" required />
            <label id="lbllastname" for="lastname"><?php echo $currentLanguage == "en" ? "Last Name" : "Cognome" ?></label>
        </div>
        <div class="form-floating mb-1">
            <input type="date" class="form-control" id="date" placeholder="date" required />
            <label id="lbldate" for="date"><?php echo $currentLanguage == "en" ? "Birth Date" : "Data di Nascita" ?></label>
        </div>
        <div class="form-floating mb-1">
            <input type="text" class="form-control" id="taxid" placeholder="taxidcode" maxlength="16" required />
            <label id="lbltaxid" for="taxid"><?php echo $currentLanguage == "en" ? "TaxID Code" : "Codice Fiscale" ?></label>
        </div>
        <div class="form-floating mb-1">
            <input type="text" class="form-control" id="address" placeholder="e.g. Via Università, 50" required />
            <label id="lbladdress" for="address"><?php echo $currentLanguage == "en" ? "Address" : "Indirizzo" ?></label>
        </div>
        <div class="form-floating mb-1">
            <input type="text" class="form-control" id="username" placeholder="username" required />
            <label for="username">Username</label>
        </div>
        <div class="form-floating d-flex align-items-center">
            <input type="password" class="form-control flex-grow-1" id="password" placeholder="Password" required />
            <label for="password">Password</label>
            <span class="bi bi-eye-fill" id="btnSeePw"></span>
        </div>
        <div class="form-floating d-flex align-items-center">
            <input type="password" class="form-control flex-grow-1" id="confpassword" placeholder="confPassword" required />
            <label id="lblconf" for="confpassword"><?php echo ($currentLanguage == "en" ? "Confirm" : "Conferma")." Password" ?></label>
            <span class="bi bi-eye-fill" id="btnSeeConfPw"></span>
        </div>
        <input type="submit" id="btnCreate" value="<?php echo $currentLanguage == "en" ? "Create Account" : "Crea Account" ?>" />
    </form>
</section>
<section>
    <a id="loginLink" href="login.php"><?php echo $currentLanguage == "en" ? "Do you already have an account? Log In" : "Hai già un account? Accedi" ?></a>
</section>