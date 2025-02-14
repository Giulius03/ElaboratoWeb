<section>
    <h1 id="title"><?php echo $currentLanguage == "en" ? "PRODUCTS" : "PRODOTTI" ?></h1>
           
    <button id="filter" class="dropend" aria-expanded="false" data-bs-toggle="dropdown" style="width: 130px; margin-left: 30px">
        <i class="fa fa-filter"></i>
        <?php echo $currentLanguage == "en" ? "FILTERS" : "FILTRI" ?>
    </button>
    
    <form id="filterForm" onsubmit="handleFilterSubmit(event, '<?php echo $currentLanguage ?>')">
        <div id="filterMenu" class="dropdown-menu" aria-labelledby="filter">
                <h1 id="legend"><?php echo $currentLanguage == "en" ? "Category selection" : "Selezione categoria" ?></h1>
                
                <label for="kits">
                    <input id="kits" type="radio" name="category" value="Divise">
                    <?php echo $currentLanguage == "en" ? "Kits" : "Divise" ?>
                </label>
                <label for="hoods">
                    <input id="hoods" type="radio" name="category" value="Felpe">
                    <?php echo $currentLanguage == "en" ? "Hoodies" : "Felpe" ?>
                </label>
                <label for="tshirts">
                    <input id="tshirts" type="radio" name="category" value="Magliette">
                    <?php echo $currentLanguage == "en" ? "T-Shirts" : "Magliette" ?>
                </label>
                <label for="caps">
                    <input id="caps" type="radio" name="category" value="Cappelli">
                    <?php echo $currentLanguage == "en" ? "Caps" : "Cappelli" ?>
                </label>
                <label for="trous">
                    <input id="trous" type="radio" name="category" value="Pantaloni">
                    <?php echo $currentLanguage == "en" ? "Trousers" : "Pantaloni" ?>
                </label>
                <label for="souvs">
                    <input id="souvs" type="radio" name="category" value="Souvenirs">
                    <?php echo $currentLanguage == "en" ? "Souvenirs" : "Souvenirs" ?>
                </label>

            <button id="send" type="submit" class="submit-btn"><?php echo $currentLanguage == "en" ? "Send" : "Invia" ?></button>
        </div>
    </form>
    
    <section id="articles">
        <!-- Products -->
    </section>
</section>
