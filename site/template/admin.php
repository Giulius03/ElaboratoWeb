<section>
    <h1><?php echo $currentLanguage == "en" ? "Control Panel" : "Pannello di Controllo" ?></h1>
    <button onclick="window.location.href='management.php'">Management</button><br>
    <button onclick="window.location.href='productsManagement.php?action=1'"><?php echo $currentLanguage == "en" ? "Add a Product" : "Aggiungi un Prodotto" ?></button>
    <form action="#" onsubmit="return setAction(event)">
        <select name="article" id="articleSelect" class="form-select" required>
            <!-- articles -->
        </select>
        <label id="lblarticle" for="articleSelect" class="visually-hidden">Select a product</label>
        <div class="d-flex w-100 p-0">
            <input type="submit" value="<?php echo $currentLanguage == "en" ? "Edit" : "Modifica" ?>" />
            <input type="submit" value="<?php echo $currentLanguage == "en" ? "Remove" : "Rimuovi" ?>" />
        </div>
    </form>
    <button onclick="window.location.href='ticketsManagement.php'"><?php echo $currentLanguage == "en" ? "Add Tickets" : "Aggiungi Biglietti" ?></button>
</section>