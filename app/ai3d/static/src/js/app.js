import activeLinks from "./components/header/activeLinks";
import hamburgerMenu from "./components/header/hamburgerMenu";
import contact from "./components/contact";
import register from "./components/training";
import map from "./components/map";


$(function() {
    AOS.init();

    activeLinks();
    hamburgerMenu();
    register();
    contact();
    map();
});




