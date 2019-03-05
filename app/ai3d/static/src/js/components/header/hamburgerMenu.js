function hamburgerMenu() {
    const btn = $('.nav-toggle');
    const list = $('.nav-list');

    btn.on('click', function(e) {
        e.preventDefault();
        list.toggleClass('show');
        btn.toggleClass('anim');
    });

    const hamburger = $('.nav-toggle span');
    const heightHero = $('.home').height();

    $(window).on('scroll', _.debounce(function(){
        scrollY > heightHero ? hamburger.css('background', '#5fc9c9') : hamburger.css('background', 'white');
    }, 500));
}

export default hamburgerMenu;