import activeLinks from "./components/activeLinks";
import hamburger from "./components/hamburger";
import contact from "./components/contact";
import training from "./components/training";
import map from "./components/map";

$(function() {
    AOS.init();

    activeLinks();
    hamburger();
    training();
    contact();
    map();
});




