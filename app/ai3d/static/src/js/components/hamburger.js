function hamburger() {
    const btn = $('.nav-toggle');
    const nav = $('.nav');

    btn.on('click', function(e) {
        e.preventDefault();
        nav.toggleClass('show');
        btn.toggleClass('anim');
    });

    const hamburger = $('.nav-toggle span');
    const heightHero = $('.banner').height();

    $(window).on('scroll', _.debounce(function(){
        scrollY > heightHero ? hamburger.css('background', '#5fc9c9') : hamburger.css('background', 'white');
    }, 500));
}

export default hamburger;