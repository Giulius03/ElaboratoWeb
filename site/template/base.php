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
    </head>
    <body>
        <header>
            <nav>
                <ul>
                    <li>
                        <button id="menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"><i class="bi bi-list"></i></button>
                    </li>
                    <li>
                        <button id="btnSearchAppear" type="button"><i class="bi bi-search"></i></button>
                    </li>
                    <li>
                        <a href="index.php"><img src="upload/Stemma.png" alt="Logo squadra"></a>
                    </li>
                    <li>
                        <button type="button" id="userMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person"></i></button>
                        <ul class="dropdown-menu" aria-labelledby="userMenuButton">
                            <li><a class="dropdown-item" href="#">Log In</a></li>
                            <li><a class="dropdown-item" href="#">Sign Up</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="notifications.php"><i class="bi bi-bell"></i></a>
                    </li>
                </ul>
                <form id="searchPhone">
                    <input class="form-control" placeholder="Search ..." />
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
                                    Language
                                </a>
                                <ul id="dropdownList">
                                    <li><a class="nav-link" href="#"><span class="fi fi-it"></span>Italiano</a></li>
                                    <li><a class="nav-link" href="#"><span class="fi fi-gb"></span>English</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Products</a>
                                <ul>
                                    <li><a href="#" class="nav-link">Clothing</a></li>
                                    <li>
                                        <ul>
                                            <li><a href="#" class="nav-link">Kit</a></li>
                                            <li><a href="#" class="nav-link">Hoodies</a></li>
                                            <li><a href="#" class="nav-link">T-Shirts</a></li>
                                            <li><a href="#" class="nav-link">Caps</a></li>
                                            <li><a href="#" class="nav-link">Trousers</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#" class="nav-link">Souvenirs</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Tickets</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <script src="./js/index.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </header>
        <footer>
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
                <li><p>2025 Bugs Burnley. All Rights Reserved.</p></li>
            </ul>
        </footer>
    </body>
</html>