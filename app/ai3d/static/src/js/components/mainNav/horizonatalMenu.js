function horizontalMenu() {
    const nav = $('.main-nav');

    if ($(window).width() < 1140 && $(window).width() > 720) {
        $(window).on('scroll', function () {
            if (window.scrollY > 100) {
                nav.addClass('nav-fixed');
            } else {
                nav.removeClass('nav-fixed');
            }
        })
    }
}

export default horizontalMenu;