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
    <section>
        <h2 id="txtRel"><?php echo $currentLanguage == "en" ? "Related Products" : "Articoli Correlati" ?></h2>
        <section id="swiperRelPC" class="swiper">
            <h2 style="display: none">tit</h2>
            <section class="swiper-wrapper">
                <!-- Cards -->
            </section> 
            <!-- Navigation Buttons -->
            <button id="prevRelPC" class="swiper-button-prev"></button>
            <button id="nextRelPC" class="swiper-button-next"></button>
        </section>
    </section>
</section>