<section>
    <h1 id="title">ADMIN HOME</h1>
    <section id="articles">
        <h2 style="display: none;">tit</h2>
        <form class="formMan" action="management.php" method="POST">
            <button id="btnMan" class="btnMan" type="submit" style="display: block;">
                Management
            </button>
        </form>
        <form class="formMan" action="productsManagement.php" method="POST">
            <button id="btnProd" class="btnMan" type="submit">
                <?php echo $currentLanguage == "en" ? "Products Management" : "Gestione dei Prodotti" ?>
            </button>
        </form>
        <form class="formMan" action="ticketsManagement.php" method="POST">
            <button id="btnTick" class="btnMan" type="submit">
                <?php echo $currentLanguage == "en" ? "Tickets Management" : "Gestione dei Biglietti" ?>
            </button>
        </form>
        <section id="modAndDel">
            <h2 style="display: none;">tit</h2>
            <!--Modifica o Eliminazione Prodotto-->
        </section>
    </section>
</section>