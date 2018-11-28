import setHeight from "./components/setHeight";
import nav from "./components/nav";
import map from "./components/map";
import contact from "./components/contactForm";
import register from "./components/registrationForm";

document.addEventListener("DOMContentLoaded", function(){
    AOS.init();

    setHeight();
    nav();
    register();
    contact();
    map();
});



