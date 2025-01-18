<?php if (!isUserLoggedIn()): ?>
<header>
    <a id="notlogged" href="login.php">Click here to LOG IN.</a>
</header>
<?php else: ?>
<section>
    <header>
        <h1><?php echo $currentLanguage == "en" ? "Your Notifications" : "Le Tue Notifiche" ?></h1>
        <button onclick="changeStatusAllNotifications('<?php echo $currentLanguage ?>', true)"><span class="bi bi-check-all"></span><span><?php echo $currentLanguage == "en" ? "Mark all as read" : "Segna tutte come già lette" ?></span></button>
        <p>|</p>
        <button onclick="changeStatusAllNotifications('<?php echo $currentLanguage ?>', false)"><span class="bi bi-trash"></span><span><?php echo $currentLanguage == "en" ? "Delete all" : "Elimina tutte" ?></button>
    </header>
    <div class="d-flex">
        <section>
            <!-- Notifications -->
        </section>
        <section>
            <!-- If selected, a notificaton will be shown below -->
        </section>
    </div>
</section>
<?php endif; ?>