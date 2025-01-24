<section>
    <h1 id="title"><?php echo $currentLanguage == "en" ? "SHOPPING CART" : "CARRELLO" ?></h1>
    <section id="articles">
        <!-- Products in Cart -->
    </section>
    <section>
        <h2 style="display: none;">validation</h2>
        <form action="payment.php?" id="cartForm" method="GET">
            <input type="submit" id="btnBuy" value="<?php echo $currentLanguage == "en" ? "Buy Now" : "Acquista Ora" ?>" />
            <input type="hidden" name="cart" value="yes" />
        </form>
    </section>
    <section id="releatedProducts">
        <h2 id="txtRel"><?php echo $currentLanguage == "en" ? "Releated Products" : "Articoli Correlati" ?></h2>
        <!-- Releated Products -->
    </section>
</section>