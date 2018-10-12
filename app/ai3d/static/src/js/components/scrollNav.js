function scrollNav() {

    const sections = $('.scrolled-part');
    const nav = $('.main-nav');

    $(window).on('scroll', function () {
        const cur_pos = $(this).scrollTop();

        sections.each(function () {
            let top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        let $el = $(this)
            , id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 500);

        return false;
    });
}

export default scrollNav;