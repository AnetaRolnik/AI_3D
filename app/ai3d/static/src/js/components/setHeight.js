function setHeight() {

    let vHeight = $(window).height(),
        header = $('.main-header'),
        aboutUs = $('.aboutUs'),
        trainingDescription = $('.training-description'),
        trainingOffer = $('.training-offer'),
        trainingRegister = $('.training-registration'),
        contact = $('.contact');

    header.css({"height": vHeight});
    aboutUs.css({"height": vHeight});
    trainingDescription.css({"height": vHeight});
    trainingOffer.css({"height": vHeight});
    trainingRegister.css({"height": vHeight});
    contact.css({"height": vHeight});
}

export default setHeight;