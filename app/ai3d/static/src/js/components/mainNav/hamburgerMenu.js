function hamburgerMenu() {
    const btn = $('.main-nav-toggle');
    const list = $('.main-nav-list');

    btn.on('click', function(e) {
        e.preventDefault();
        list.toggleClass('show');
        btn.toggleClass('anim');
    })
}

export default hamburgerMenu;