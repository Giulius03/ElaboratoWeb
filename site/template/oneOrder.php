<section>
<h1 id="title"><?php echo $currentLanguage == "en" ? "MY ORDER" : "IL MIO ORDINE" ?></h1>
    <section id="articles">
        <!-- My orders -->
    </section>
    <h2 id="txtShip"><?php echo $currentLanguage == "en" ? "Shipping Tracking" : "Tracciamento Spedizione" ?></h2>
    <section id="shipping">
        <!--Shipping Info -->
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