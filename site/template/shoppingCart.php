<section> <!-- all'inizio di ogni pagina metti section, così il titolo non viene come quello della home -->
    <h1 id="title"><?php echo $currentLanguage == "en" ? "SHOPPING CART" : "CARRELLO" ?></h1>
    <section id="articles">
        <!-- Articles in Cart -->
        <form action="payment.php" method="get">
            <input type="submit" id="btnBuy" value="<?php echo $currentLanguage == "en" ? "Buy Now" : "Acquista Ora" ?>">
        </form>
    </section>
    <section id="releatedArticles">
        <h2 id="txtRel"><?php echo $currentLanguage == "en" ? "Releated Articles" : "Articoli Correlati" ?></h2>
        <!-- Releated Articles -->
    </section>
</section>