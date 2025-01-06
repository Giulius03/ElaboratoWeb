<section>
    <h1 id="login"><?php echo $currentLanguage == "en" ? "Log In" : "Accedi" ?></h1>
    <form action="utils/checkLogin.php" method="POST" onsubmit="showLoginResult('<?php echo $currentLanguage ?>', event)">
        <ul>
            <?php require 'userPw.php' ?>
            <li>
                <a id="forgotLink" href="recovery.php"><?php echo $currentLanguage == "en" ? "Forgotten password?" : "Password dimenticata?" ?></a>
            </li>
            <li>
                <input type="submit" id="btnLog" value="<?php echo $currentLanguage == "en" ? "Enter" : "Entra" ?>" />
            </li>
            <li>
                <a id="signupLink" href="signup.php"><?php echo $currentLanguage == "en" ? "Don't you signed up yet? Sign Up" : "Non ti sei ancora registrato? Iscriviti" ?></a>
            </li>
        </ul>
    </form>
</section>