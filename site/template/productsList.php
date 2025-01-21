<section>
<h1 id="title"><?php echo $currentLanguage == "en" ? "PRODUCTS" : "PRODOTTI" ?></h1>
           
    <button id="filter" class="filter-btn" onclick="toggleFilter()">
        <i class="fa fa-filter"></i>
        <?php echo $currentLanguage == "en" ? "FILTERS" : "FILTRI" ?>
    </button>
    <form id="filterForm" onsubmit="handleFilterSubmit(event, '<?php echo $currentLanguage?>')">   
        <div class="filter-content" id="filterMenu">
            <p><?php echo $currentLanguage == "en" ? "Select category:" : "Seleziona categoria:" ?></p>
            <label>
                <input id="kits" type="radio" name="category" value="Divise"><?php echo $currentLanguage == "en" ? "Kits" : "Divise" ?>
            </label>
            <label>
                <input id="hoods" type="radio" name="category" value="Felpe"><?php echo $currentLanguage == "en" ? "Hoodies" : "Felpe" ?>
            </label>
            <label>
                <input id="tshirts" type="radio" name="category" value="Magliette"><?php echo $currentLanguage == "en" ? "T-Shirts" : "Magliette" ?>
            </label>
            <label>
                <input id="caps" type="radio" name="category" value="Cappelli"><?php echo $currentLanguage == "en" ? "Caps" : "Cappelli" ?>
            </label>
            <label>
                <input id="trous" type="radio" name="category" value="Pantaloni"><?php echo $currentLanguage == "en" ? "Trousers" : "Pantaloni" ?>
            </label>
            <label>
                <input id="souvs" type="radio" name="category" value="Souvenirs">Souvenirs
            </label>
            <button id="send" type="submit" class="submit-btn"><?php echo $currentLanguage == "en" ? "Send" : "Invia" ?></button>
        </div>
    </form>
    <section id="articles">
        <!-- Products -->
    </section>
</section>