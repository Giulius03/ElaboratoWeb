<!-- Mobile -->
<section>
    <section>
        <!-- immagine, titolo, prezzo, likes e valutazione -->
    </section>
    <section>
        <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseDescription" aria-expanded="false" aria-controls="collapseDescription">
            <?php echo $currentLanguage == "en" ? "Product Details" : "Dettagli Prodotto" ?>
            <span class="bi bi-chevron-down"></span>
        </button>
        <div class="collapse" id="collapseDescription">
            <div class="card card-body">
                <!-- descrizione -->
            </div>
        </div>
    </section>
    <section>
        <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseOptions" aria-expanded="false" aria-controls="collapseOptions">
            <?php echo $currentLanguage == "en" ? "Options" : "Opzioni" ?>
            <span class="bi bi-chevron-down"></span>
        </button>
        <div class="collapse" id="collapseOptions">
            <div class="card card-body">
                <!-- opzioni -->
                <p><!-- disponibile? --></p>
                <form action="#" onsubmit="return handleSubmit('<?php echo $currentLanguage ?>', event)">
                    <select name="quantity" id="quantity" class="form-select" aria-label="Default select example">
                        <!-- quantità -->
                    </select>
                    <label for="quantity" class="visually-hidden">Select quantity</label> 
                    <select name="size" id="size" class="form-select" aria-label="Default select example">
                        <!-- taglie -->
                    </select>
                    <label for="size" class="visually-hidden">Select size</label> 
                    <select name="color" id="color" class="form-select" aria-label="Default select example">
                        <!-- colori -->
                    </select>
                    <label for="color" class="visually-hidden">Select color</label>
                    <section>
                        <input type="submit" id="btnBuyNow" name="btnBuyNow" value="<?php echo $currentLanguage == "en" ? "Buy Now" : "Compra Ora" ?>" />
                        <input type="submit" id="btnAddToCart" name="btnAddToCart" value="<?php echo $currentLanguage == "en" ? "Add to Cart" : "Aggiungi al Carrello" ?>" />
                    </section>            
                </form>
            </div>
        </div>
    </section>
    <!-- correlati -->
    <section>
        <h2><?php echo $currentLanguage == "en" ? "Related Products" : "Articoli Correlati" ?></h2>
        <section id="swiperRel" class="swiper">
            <section class="swiper-wrapper">
                <!-- Cards -->
            </section> 
            <!-- Navigation Buttons -->
            <button id="prevRel" class="swiper-button-prev"></button>
            <button id="nextRel" class="swiper-button-next"></button>
        </section>
    </section>
</section>
<div>
    <!-- contenitore info prodotto -->
    <section>
        <section>

        </section>
        <section>
            <!-- <p>ciao</p> -->
        </section>
        <section>
            <form action="#" onsubmit="return handleSubmit('<?php echo $currentLanguage ?>', event)">
                <h2><?php echo $currentLanguage == "en" ? "Options" : "Opzioni" ?></h2>
                <p></p>
                <select name="quantity" id="quantity" class="form-select" aria-label="Default select example">
                    <!-- quantità -->
                </select>
                <label for="quantity" class="visually-hidden">Select quantity</label> 
                <select name="size" id="size" class="form-select" aria-label="Default select example">
                    <!-- taglie -->
                </select>
                <label for="size" class="visually-hidden">Select size</label> 
                <select name="color" id="color" class="form-select" aria-label="Default select example">
                    <!-- colori -->
                </select>
                <label for="color" class="visually-hidden">Select color</label>
                <section>
                    <input type="submit" id="btnBuyNowPC" name="btnBuyNowPC" value="<?php echo $currentLanguage == "en" ? "Buy Now" : "Compra Ora" ?>" />
                    <input type="submit" id="btnAddToCartPC" name="btnAddToCartPC" value="<?php echo $currentLanguage == "en" ? "Add to Cart" : "Aggiungi al Carrello" ?>" />
                </section>            
            </form>
        </section>
    </section>
    <!-- correlati -->
    <section>
        <h2><?php echo $currentLanguage == "en" ? "Related Products" : "Articoli Correlati" ?></h2>
        <section id="swiperRelPC" class="swiper">
            <section class="swiper-wrapper">
                <!-- Cards -->
            </section> 
            <!-- Navigation Buttons -->
            <button id="prevRelPC" class="swiper-button-prev"></button>
            <button id="nextRelPC" class="swiper-button-next"></button>
        </section>
    </section>
</div>