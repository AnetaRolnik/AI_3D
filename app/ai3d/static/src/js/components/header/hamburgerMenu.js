function hamburgerMenu() {
    const btn = $('.nav-toggle');
    const list = $('.nav-list');

    btn.on('click', function(e) {
        e.preventDefault();
        list.toggleClass('show');
        btn.toggleClass('anim');
    })
}

export default hamburgerMenu;