function activeLinks() {
    const sections = $('.scrolled');
    const nav = $('.nav');

    $(window).on('scroll', function () {
        const cur_pos = $(this).scrollTop();

        sections.each(function () {
            const top = $(this).offset().top - $(this).outerHeight() / 4;
            const bottom = $(this).offset().top + $(this).outerHeight() / 4;

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
}

export default activeLinks;