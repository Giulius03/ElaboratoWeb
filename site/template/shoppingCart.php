<section>
    <h1 id="title"><?php echo $currentLanguage == "en" ? "SHOPPING CART" : "CARRELLO" ?></h1>
    <section id="articles">
        <!-- Products in Cart -->
    </section>
    <section>
        <form id="cartForm" onsubmit="handleFormSubmit(event, '<?php echo $currentLanguage; ?>')">
            <input type="submit" id="btnBuy" value="<?php echo $currentLanguage == "en" ? "Buy Now" : "Acquista Ora" ?>">
        </form>
    </section>
    <section id="releatedProducts">
        <h2 id="txtRel"><?php echo $currentLanguage == "en" ? "Releated Products" : "Articoli Correlati" ?></h2>
        <!-- Releated Products -->
    </section>
</section>