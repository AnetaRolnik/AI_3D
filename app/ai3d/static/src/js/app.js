import activeLinks from "./components/mainNav/activeLinks";
import horizontalMenu from "./components/mainNav/horizonatalMenu";
import hamburgerMenu from "./components/mainNav/hamburgerMenu";
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



