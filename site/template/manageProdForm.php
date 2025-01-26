<form action="#" onsubmit="manageProduct(event)">
    <h1><?php echo $currentLanguage == "en" ? "Products Management" : "Gestione Prodotti" ?></h1>
    <ul>
        <li class="form-floating mb-1">
            <select name="category" id="category" class="form-select" onchange="manageGroup(this)" required>
                <option selected disabled></option>
                <option value="Clothing"><?php echo $currentLanguage == "en" ? "Clothing" : "Abbigliamento" ?></option>
                <option value="Souvenir">Souvenir</option>
            </select>
            <label id="lblname" for="name"><?php echo $currentLanguage == "en" ? "Category" : "Categoria" ?></label>
        </li>
        <li class="form-floating mb-1">
            <input name="italianName" type="text" class="form-control" id="italianName" placeholder="italian name" required />
            <label id="lblitalianName" for="italianName"><?php echo $currentLanguage == "en" ? "Italian Name" : "Nome Italiano" ?></label>
        </li>
        <li class="form-floating mb-1">
            <input name="englishName" type="text" class="form-control" id="englishName" placeholder="english name" required />
            <label id="lblenglishName" for="englishName"><?php echo $currentLanguage == "en" ? "English Name" : "Nome Inglese" ?></label>
        </li>
        <li class="input-group mb-1">
            <label class="input-group-text" for="image" id="lblimage"><?php echo $currentLanguage == "en" ? "Image" : "Immagine" ?></label>
            <input name="image" type="file" class="form-control" id="image" />
        </li>
        <li class="form-floating mb-1">
            <input step="0.01" name="price" type="number" class="form-control" id="price" placeholder="price" required />
            <label id="lblprice" for="price"><?php echo $currentLanguage == "en" ? "Price (€)" : "Prezzo (€)" ?></label>
        </li>
        <li class="form-floating mb-1">
            <textarea class="form-control" name="descita" id="descita" required></textarea>
            <label id="lbldescita" for="descita"><?php echo $currentLanguage == "en" ? "Italian Description" : "Descrizione Italiana" ?></label>
        </li>
        <li class="form-floating mb-1">
            <textarea class="form-control" name="desceng" id="desceng" required></textarea>
            <label id="lbldesceng" for="desceng"><?php echo $currentLanguage == "en" ? "English Description" : "Descrizione Inglese" ?></label>
        </li>
        <li class="form-floating mb-1">
            <select name="group" id="group" class="form-select" required>
                <option selected disabled></option>
                <option value="Hoodies"><?php echo $currentLanguage == "en" ? "Hoodies" : "Felpe" ?></option>
                <option value="Kit"><?php echo $currentLanguage == "en" ? "Kit" : "Divise" ?></option>
                <option value="Caps"><?php echo $currentLanguage == "en" ? "Caps" : "Cappelli" ?></option>
                <option value="Trousers"><?php echo $currentLanguage == "en" ? "Trousers" : "Pantaloni" ?></option>
                <option value="T-Shirts"><?php echo $currentLanguage == "en" ? "T-Shirts" : "Magliette" ?></option>
            </select>
            <label id="lblgroup" for="group"><?php echo $currentLanguage == "en" ? "Group" : "Gruppo" ?></label>
        </li>
        <li class="mb-1">
            <?php $text = $currentLanguage == "en" ? "Quantity available (for each size for the clothes) (1-100): " : "Quantità disponibile (per ogni taglia per i vestiti) (1-100): " ?>
            <label class="form-label" id="lbleachsizequantity" for="eachsizequantity"><?php echo $text . "0"?></label>
            <input value="0" oninput="getCurrentQuantity()" type="range" class="form-range" min="1" max="100" step="1" id="eachsizequantity" required>
        </li>
        <li>
            <?php
                if (isset($_GET["action"])) {
                    switch ($_GET["action"]) {
                        case 1:
                            $value = $currentLanguage == "en" ? "Add" : "Aggiungi";
                            break;
                        case 2:
                            $value = $currentLanguage == "en" ? "Edit" : "Modifica";
                            break;
                        case 3:
                            $value = $currentLanguage == "en" ? "Remove" : "Rimuovi";
                            break;
                    }
                } 
            ?>
            <input type="submit" value="<?php echo $value ?>">
        </li>
    </ul>
</form>