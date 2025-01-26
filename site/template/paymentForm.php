<form method="GET" onsubmit="addOrder('<?php echo $currentLanguage ?>', event)">
    <fieldset>
        <legend><?php echo $currentLanguage == "en" ? "Payment" : "Pagamento" ?></legend>
        <input onclick="cardInputsVisible(false)" type="radio" name="paymentMethod" id="ondelivery" required />
        <label for="ondelivery"><?php echo $currentLanguage == "en" ? "On Delivery" : "Alla Consegna" ?></label>
        <input onclick="cardInputsVisible(true)" type="radio" name="paymentMethod" id="bycard" />
        <label for="bycard"><?php echo $currentLanguage == "en" ? "By Card" : "Con Carta" ?></label>
        <ul>
            <li class="form-floating mb-1">
                <input name="cardNumber" type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" pattern="\d{4} \d{4} \d{4} \d{4}" />
                <label id="lblcardNumber" for="cardNumber"><?php echo $currentLanguage == "en" ? "Card Number" : "Numero di Carta" ?></label>
            </li>
            <li class="form-floating mb-1">
                <input name="holder" type="text" class="form-control" id="holder" placeholder="holder" />
                <label id="lblholder" for="holder"><?php echo $currentLanguage == "en" ? "Holder" : "Intestatario" ?></label>
            </li>
            <li class="form-floating mb-1">
                <input name="expiryDate" type="month" class="form-control" id="expiryDate" />
                <label id="lblexpiryDate" for="expiryDate"><?php echo $currentLanguage == "en" ? "Expiry" : "Scadenza" ?></label>
            </li>
            <li class="form-floating">
                <input name="cvv" type="text" class="form-control" id="cvv" placeholder="cvv" maxlength="3" minlength="3" />
                <label id="lblcvv" for="cvv">CVV</label>
            </li>
            <li>
                <input type="checkbox" id="saveCard">
                <label for="saveCard"><?php echo $currentLanguage == "en" ? "Save for future purchases" : "Salva per acquisti futuri" ?></label>
            </li>
        </ul>
    </fieldset>
    <fieldset>
        <legend><?php echo $currentLanguage == "en" ? "Delivery Method" : "Metodo di Consegna" ?></legend>
        <div>
            <div class="d-flex">
                <input onclick="showPrices()" type="radio" name="deliveryMethod" id="standard" value="standard" required />
                <label for="standard"><?php echo $currentLanguage == "en" ? "Standard (free).<br>Delivery within 3 weeks" : "Standard (gratis).<br>Consegna entro 3<br>settimane" ?></label>
            </div>
            <div class="d-flex">
                <input onclick="showPrices()" type="radio" name="deliveryMethod" id="premium" value="premium" />
                <label for="premium"><?php echo $currentLanguage == "en" ? "Premium (€4.99).<br>Delivery within a week" : "Premium (€4.99).<br>Consegna entro 1<br>settimana" ?></label>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <legend><?php echo $currentLanguage == "en" ? "Order Summary" : "Riassunto Ordine" ?></legend>
        <section>
            <h2>tit</h2>
            <section>
                <!-- Testi -->
                <h2>tit</h2>
                <p>
                    <?php echo $currentLanguage == "en" ? "Articles" : "Articoli" ?><br>
                    <?php echo $currentLanguage == "en" ? "Shipping Costs" : "Costi di Spedizione" ?><br>
                    <?php echo $currentLanguage == "en" ? "Discount Applied" : "Sconto Applicato" ?>
                </p>
                <strong><?php echo $currentLanguage == "en" ? "Total" : "Totale" ?></strong><br>
            </section>
            <section>
                <!-- prezzi -->
            </section>
        </section>
        <input type="submit" id="btnPay" value="<?php echo $currentLanguage == "en" ? "Order" : "Ordina" ?>" />
    </fieldset>
</form>