import activeLinks from "./components/header/activeLinks";
import horizontalMenu from "./components/header/horizonatalMenu";
import hamburgerMenu from "./components/header/hamburgerMenu";
import contact from "./components/contact";
import register from "./components/training";
import map from "./components/map";


$(function() {
    AOS.init();

    activeLinks();
    horizontalMenu();
    hamburgerMenu();
    register();
    contact();
    map();
});

$( window ).resize(horizontalMenu);



