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
    if ($(window).width() < 1140 && $(window).width() > 720) {
        $(window).on('scroll', function () {
            if (window.scrollY > 100) {
                nav.addClass('nav-fixed');
            } else {
                nav.removeClass('nav-fixed');
            }
        })
    }

    //hamburger menu
    const btn = $('.main-nav-toggle');
    const list = $('.main-nav-list');

    btn.on('click', function(e) {
        e.preventDefault();
        list.toggleClass('show');
        btn.toggleClass('anim');
    })
}

export default nav;