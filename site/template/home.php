<h1 id="title"><?php echo ($currentLanguage == "en" ? "WELCOME " : "BENVENUTO ") . (isUserLoggedIn() ? $_SESSION["name"] : "") ?><h1></h1></h1>
<section>
  <h2 id="txtLast"><?php echo $currentLanguage == "en" ? "Last Releases" : "Ultime Uscite" ?></h2>
  <section id="swiperLast" class="swiper">
    <h2>tit</h2>
    <section class="swiper-wrapper">
      <h2>tit</h2>
      <!-- Cards -->
    </section> 
    <!-- Navigation Buttons -->
    <button id="prevLast" class="swiper-button-prev"></button>
    <button id="nextLast" class="swiper-button-next"></button>
  </section>
</section>
<section>
  <h2 id="txtMost"><?php echo $currentLanguage == "en" ? "Most Wanted" : "I Più Venduti" ?></h2>
  <section id="swiperMost" class="swiper">
    <h2>tit</h2>
    <section class="swiper-wrapper">
      <h2>tit</h2>
      <!-- Cards -->
    </section> 
    <!-- Navigation Buttons -->
    <button id="prevMost" class="swiper-button-prev"></button>
    <button id="nextMost" class="swiper-button-next"></button>
  </section>
</section>
<section>
  <h2 id="txtUs"><?php echo $currentLanguage == "en" ? "About Us" : "Su di Noi" ?></h2>
  <p id="txtPres"><?php echo $currentLanguage == "en" ? "“Purchase your official Bugs Burnley merchandise here. We offer the latest kits and lifestyle clothing as well as  trending men and women's fashion. You can also find a vast range of souvenirs and all the tickets to come at the stadium and support our magnificent team.”" : "“Acquista qui il tuo merchandise ufficiale Bugs Burnley. Offriamo gli ultimi kit e abbigliamento lifestyle, nonché la moda maschile e femminile di tendenza. Inoltre potrete trovare una vasta gamma di souvenir e tutti i biglietti per venire allo stadio e sostenere la nostra magnifica squadra.”" ?></p>
</section>