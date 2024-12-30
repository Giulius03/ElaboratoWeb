<!DOCTYPE html>
<html lang="it">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><?php echo $templateParams["titolo"]; ?></title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/css/flag-icons.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="./css/style.css" />
        <link rel="stylesheet" type="text/css" href="./css/mediaqueries.css" />
    </head>
    <body>
        <header>
            <nav>
                <ul>
                    <li>
                        <form action="index.php">
                            <input id="searchBarPC" type="text" placeholder="<?php echo $currentLanguage == "en" ? "Search" : "Cerca" ?> ..." />
                            <i class="bi bi-search"></i>
                        </form>
                    </li>
                    <li>
                        <button id="menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"><i class="bi bi-list"></i></button>
                    </li>
                    <li>
                        <button id="btnSearchAppear" type="button"><i class="bi bi-search"></i></button>
                    </li>
                    <li>
                        <a id="productsLink" href="products.php"><i class="fa fa-shirt"></i><span id="prodTextPC"><?php echo $currentLanguage == "en" ? "Products" : "Prodotti" ?></span></a>
                        <ul id="productsMenu" class="dropdown-menu">
                            <li><a id="clotTextPC" class="dropdown-item" href="products.php"><?php echo $currentLanguage == "en" ? "Clothing" : "Abbigliamento" ?></a></li>
                            <li><a id="kitsTextPC" class="dropdown-item" href="products.php"><?php echo $currentLanguage == "en" ? "Kits" : "Divise" ?></a></li>
                            <li><a id="hoodTextPC" class="dropdown-item" href="products.php"><?php echo $currentLanguage == "en" ? "Hoodies" : "Felpe" ?></a></li>
                            <li><a id="tsTextPC" class="dropdown-item" href="products.php"><?php echo $currentLanguage == "en" ? "T-Shirts" : "Magliette" ?></a></li>
                            <li><a id="capsTextPC" class="dropdown-item" href="products.php"><?php echo $currentLanguage == "en" ? "Caps" : "Cappelli" ?></a></li>
                            <li><a id="trouTextPC" class="dropdown-item" href="products.php"><?php echo $currentLanguage == "en" ? "Trousers" : "Pantaloni" ?></a></li>
                            <li><a class="dropdown-item" href="products.php">Souvenirs</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="tickets.php"><i class="fa fa-ticket"></i><span id="tickTextPC"><?php echo $currentLanguage == "en" ? "Tickets" : "Biglietti" ?></span></a>
                    </li>
                    <li>
                        <a href="index.php"><img src="upload/Stemma.png" alt="Logo squadra"></a>
                    </li>
                    <li>
                        <a role="button" id="userMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person"></i><span id="userText"><?php echo $currentLanguage == "en" ? "User" : "Utente" ?></span></a>
                        <ul class="dropdown-menu" aria-labelledby="userMenuButton">
                            <li><a id="logText" class="dropdown-item" href="login.php"><?php echo $currentLanguage == "en" ? "Log In" : "Accedi" ?></a></li>
                            <li><a id="signText" class="dropdown-item" href="signup.php"><?php echo $currentLanguage == "en" ? "Sign up" : "Registrati" ?></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="notifications.php"><i class="bi bi-bell"></i><span id="notText"><?php echo $currentLanguage == "en" ? "Notifications" : "Notifiche" ?></span></a>
                    </li>
                    <li>
                        <a id="LangMenuButton" class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i id="currentFlag" class="<?php echo $currentLanguage == "en" ? "fi fi-gb" : "fi fi-it" ?>"></i><span id="langText"><?php echo $currentLanguage == "en" ? "ENG" : "ITA" ?></span></a>
                        <ul class="dropdown-menu" aria-labelledby="LangMenuButton">
                            <li><a onclick="setLang('it')" class="dropdown-item" role="button"><i class="fi fi-it"></i>Italiano</a></li>
                            <li><a onclick="setLang('en')" class="dropdown-item" role="button"><i class="fi fi-gb"></i>English</a></li>
                        </ul>
                    </li>
                </ul>
                <form id="searchPhone">
                    <input id="searchBar" class="form-control" placeholder="<?php echo $currentLanguage == "en" ? "Search" : "Cerca" ?> ..." />
                    <button type="submit"><i class="bi bi-search"></i></button>
                </form>
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h4 class="offcanvas-title" id="offcanvasNavbarLabel">Bugs Burnley Shop</h4>
                        <button type="button" data-bs-dismiss="offcanvas" aria-label="Close"><i class="bi bi-x"></i></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item dropdown">
                                <a id="dropdownLink" class="nav-link dropdown-toggle" href="#" role="button">
                                    <?php echo $currentLanguage == "en" ? "Language" : "Lingua" ?>
                                </a>
                                <ul id="dropdownList">
                                    <li><a onclick="setLang('it')" class="nav-link" role="button"><span class="fi fi-it"></span>Italiano</a></li>
                                    <li><a onclick="setLang('en')" class="nav-link" role="button"><span class="fi fi-gb"></span>English</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a id="prodText" class="nav-link" href="products.php"><?php echo $currentLanguage == "en" ? "Products" : "Prodotti" ?></a>
                                <ul>
                                    <li><a id="clotText" href="products.php" class="nav-link"><?php echo $currentLanguage == "en" ? "Clothing" : "Abbigliamento" ?></a></li>
                                    <li>
                                        <ul>
                                            <li><a id="kitsText" href="products.php" class="nav-link"><?php echo $currentLanguage == "en" ? "Kits" : "Divise" ?></a></li>
                                            <li><a id="hoodText" href="products.php" class="nav-link"><?php echo $currentLanguage == "en" ? "Hoodies" : "Felpe" ?></a></li>
                                            <li><a id="tsText" href="products.php" class="nav-link"><?php echo $currentLanguage == "en" ? "T-Shirts" : "Magliette" ?></a></li>
                                            <li><a id="capsText" href="products.php" class="nav-link"><?php echo $currentLanguage == "en" ? "Caps" : "Cappelli" ?></a></li>
                                            <li><a id="trouText" href="products.php" class="nav-link"><?php echo $currentLanguage == "en" ? "Trousers" : "Pantaloni" ?></a></li>
                                        </ul>
                                    </li>
                                    <li><a href="products.php" class="nav-link">Souvenirs</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a id="tickText" class="nav-link" href="tickets.php"><?php echo $currentLanguage == "en" ? "Tickets" : "Biglietti" ?></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <script src="./js/index.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </header>
        <footer>
            <h5 id="contText"><?php echo $currentLanguage == "en" ? "Contact Us" : "Contattaci" ?></h5>
            <ul>
                <li>
                    <ul>
                        <li><i class="bi bi-telephone"></i></li>
                        <li><p>+44 452 367 2241</p></li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li><i class="bi bi-instagram"></i></li>
                        <li><p>@bugsburnley_shop</p></li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li><i class="bi bi-youtube"></i></li>
                        <li><p>Bugs Burnley Shop</p></li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li><i class="fa-brands fa-facebook-f"></i></li>
                        <li><p>Bugs Burnley Shop</p></li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li><i class="bi bi-envelope"></i></li>
                        <li><p>bugsburnley.shop@gmail.com</p></li>
                    </ul>
                </li>
            </ul>
            <ul>
                <li><i class="bi bi-c-circle"></i></li>
                <li><p id="copyText">2025 Bugs Burnley. <?php echo $currentLanguage == "en" ? "All Rights Reserved" : "Tutti i Diritti Riservati" ?>.</p></li>
            </ul>
        </footer>
    </body>
</html>