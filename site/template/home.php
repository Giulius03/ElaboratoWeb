<h1 id="title"><?php echo $currentLanguage == "en" ? "WELCOME" : "BENVENUTO" ?></h1>
<h2><?php echo $currentLanguage == "en" ? "Last Releases" : "Ultime Uscite" ?></h2>
<div class="swiper">
  <div class="swiper-wrapper">
    <!-- Card 1 -->
    <div class="swiper-slide">
      <div class="card">
        <img src="upload/AwayShirt.png" alt="Product 1">
        <h5>Black Cap</h5>
        <p>€9.99</p>
      </div>
    </div>
    <!-- Card 2 -->
    <div class="swiper-slide">
      <div class="card">
        <img src="upload/BlackHoodie.png" alt="Product 2">
        <h5>Black Hoodie</h5>
        <p>€49.99</p>
      </div>
    </div>
    <div class="swiper-slide">
      <div class="card">
        <img src="upload/HomeSocks.png" alt="Product 2">
        <h5>Home Socks</h5>
        <p>€4.99</p>
      </div>
    </div>
    <div class="swiper-slide">
      <div class="card">
        <img src="image2.jpg" alt="Product 2">
        <h5>Product 2</h5>
        <p>Description of Product 2</p>
      </div>
    </div>
    <div class="swiper-slide">
      <div class="card">
        <img src="image2.jpg" alt="Product 2">
        <h5>Product 2</h5>
        <p>Description of Product 2</p>
      </div>
    </div>
  </div>

  <!-- Navigation Buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>

<!-- Include Swiper.js -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

<script>
  const swiper = new Swiper('.swiper', {
    loop: true, // Enables infinite scrolling
    slidesPerView: 1, // Default: 1 product visible
    // spaceBetween: 10, // Space between slides
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: false, // No dots at the bottom
    breakpoints: {
      768: {
        slidesPerView: 3, // Show 3 products for screens >= 768px
        // spaceBetween: 20, // Larger space between slides
      },
    },
  });
</script>
