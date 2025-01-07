<section>
    <h1 id="recovery"><?php echo $currentLanguage == "en" ? "Create a new password" : "Crea una nuova password" ?></h1>
    <section>
        <h2>tit</h2>
        <form id="codeForm" action="utils/verifyCode.php" method="POST" onsubmit="checkCode('<?php echo $currentLanguage ?>', event)">
            <label id="lblRec" for="code"><?php echo ($currentLanguage == "en" ? "Insert the following code to verify you are not a bot: " : "Inserisci il seguente codice per verificare che non sei un bot: ") . generateCode() ?></label>
            <section>
                <h2>tit</h2>
                <input name="code" id="code" type="text" class="form-control" placeholder="<?php echo $currentLanguage == "en" ? "Insert here" : "Inserisci qui" ?> ..." required />
                <input id="btnSend" type="submit" value="<?php echo $currentLanguage == "en" ? "Send" : "Invia" ?>" />
            </section>
        </form>
    </section>
    <section>
        <h2>tit</h2>
        <form id="newForm" action="utils/changePassword.php" method="POST" onsubmit="changePassword('<?php echo $currentLanguage ?>', event)">
            <ul>
                <li class="form-floating mb-1">
                    <input name="confusername" type="text" class="form-control" id="username" placeholder="username" required />
                    <label for="username">Username</label>
                </li>
                <li class="form-floating d-flex align-items-center mb-1">
                    <input name="password" type="password" class="form-control flex-grow-1" id="password" placeholder="Password" required />
                    <label id="lblPw" for="password"><?php echo $currentLanguage == "en" ? "New" : "Nuova" ?> password</label>
                    <span class="bi bi-eye-fill" id="btnSeePw"></span>
                </li>
                <li class="form-floating d-flex align-items-center">
                    <input name="password" type="password" class="form-control flex-grow-1" id="confpassword" placeholder="Password" required />
                    <label id="lblConfPw" for="confpassword"><?php echo $currentLanguage == "en" ? "Confirm new" : "Conferma nuova" ?> password</label>
                    <span class="bi bi-eye-fill" id="btnSeeConfPw"></span>
                </li>
                <li>
                    <input type="submit" id="btnSave" value="<?php echo $currentLanguage == "en" ? "Save" : "Salva" ?>" />
                </li>
            </ul>
        </form>
    </section>
</section>