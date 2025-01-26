<section>
    <h1 id="title"><?php echo $currentLanguage == "en" ? "TICKETS MANAGEMENT" : "GESTIONE DEI BIGLIETTI" ?></h1>
    <section id="tickets">
        <h2 style="display: none;">tit</h2>
        <ol class="ordered border-0">
            <li>
                <label id="lblcomp" for="competitionBox"><?php echo $currentLanguage == "en" ? "Competition*" : "Competizione*" ?></label>
                <input type="text" id="competitionBox" class="competition-input" required />
            </li>
            <li>
                <label id="lblopp" for="opponentBox"><?php echo $currentLanguage == "en" ? "Opponent Name*" : "Nome Avversario*" ?></label>
                <input type="text" id="opponentBox" class="opponent-input" required />
            </li>
            <li>
                <label id="lbldate" for="date">
                    <?php echo $currentLanguage == "en" ? "Match Date" : "Data della Partita" ?>
                </label>
                <input name="matchDate" type="date" class="date-control" id="date" required />
            </li>
            <li>
                <label id="lbltime" for="time">
                    <?php echo $currentLanguage == "en" ? "Match Time" : "Ora della Partita" ?>
                </label>
                <input name="matchTime" type="time" class="time-control" id="time" required />
            </li>
            <li>
                <label id="lblgold" for="quantityGold"><?php echo $currentLanguage == "en" ? "Quantity Golden Grandstand" : "Quantità Tribuna Oro" ?></label>
                <select id="quantityGold" name="quantityGold" class="quantity-dropdown">
                    <option value="200">200</option>
                    <option value="400">400</option>
                    <option value="600">600</option>
                </select>
            </li>
            <li>
                <label id="lblnorth" for="quantityNorth"><?php echo $currentLanguage == "en" ? "Quantity North Curve" : "Quantità Curva Nord" ?></label>
                <select id="quantityNorth" name="quantityNorth" class="quantity-dropdown">
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                </select>
            </li>
            <li>
                <label id="lblsouth" for="quantitySouth"><?php echo $currentLanguage == "en" ? "Quantity South Curve" : "Quantità Curva Sud" ?></label>
                <select id="quantitySouth" name="quantitySouth" class="quantity-dropdown">
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                </select>
            </li>
            <li>
                <label id="lblrabbit" for="quantityRabbit"><?php echo $currentLanguage == "en" ? "Quantity Rabbit Grandstand" : "Quantità Tribuna Coniglio" ?></label>
                <select id="quantityRabbit" name="quantityRabbit" class="quantity-dropdown">
                    <option value="200">200</option>
                    <option value="400">400</option>
                    <option value="600">600</option>
                </select>
            </li>
            <li>
                <form id="ticketForm" action="utils/addTicketsInDB.php" method="POST" enctype="multipart/form-data">
                    <label id="lbllogo" for="logo"><?php echo $currentLanguage == "en" ? "Upload Opponent Logo (.png)" : "Carica Logo Avversario (.png)" ?></label>
                    <input type="file" name="logo" id="logo" accept="image/png" style="display: none;"/>
                    <button type="button" id="customFileButton"><?php echo $currentLanguage == "en" ? "Select File" : "Scegli File" ?></button>
                    <span id="fileNameDisplay" style="display: none;">Nessun file selezionato</span>

                    <button id="addTicketButton" class="btnAddTicket" type="submit">
                        <?php echo $currentLanguage == "en" ? "Add Tickets" : "Aggiungi Biglietti" ?>
                    </button>
                </form>
            </li>
        </ol>
    </section>
</section>
