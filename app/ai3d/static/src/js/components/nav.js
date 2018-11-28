function nav() {

    const sections = $('.scrolled');
    const nav = $('.main-nav');

    //add active class
    $(window).on('scroll', function () {
        const cur_pos = $(this).scrollTop();

        sections.each(function () {
            const top = $(this).offset().top - $(this).outerHeight()/4;
            const bottom = $(this).offset().top + $(this).outerHeight()/4;

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');

                if ($(this).attr('id') !== undefined) {
                    nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
                } else {
                    nav.find('a[href="#' + $(this).parent().attr('id') + '"]').addClass('active');
                }
            }
        });
    });

    //add class to horizontal menu
    if ($(window).width() < 1140) {
        $(window).on('scroll', function () {
            if (window.scrollY > 100) {
                nav.addClass('nav-fixed');
            } else {
                nav.removeClass('nav-fixed');
            }
        })
    }
}

export default nav;