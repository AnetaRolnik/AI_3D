function validation(requiredFields) {
    const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        regexPhone =  /^[0-9]{7,11}$/;

    requiredFields.each(function() {
        $(this).next().remove();

        if ($(this).val().length === 0) {
            $(this).css("borderColor","red")
                .after($(`<span class="error-info">Uzupełnij pole</span>`))
                .parent().addClass("error");

        } else if ($(this).is("textarea") && $(this).val().length < 8) {
            $(this).css("borderColor","red")
                .after($(`<span class="error-info">Za krótka wiadomość. Wpisz min 8 znaków</span>`))
                .parent().addClass("error");

        } else if ($(this).is("[data-type=tel]") && !regexPhone.test($(this).val())) {
            $(this).css("borderColor","red")
                .after($(`<span class="error-info">Wpisz poprawny numer</span>`))
                .parent().addClass("error");

        } else if ($(this).is("[data-type=email]") && !regexEmail.test($(this).val())) {
            $(this).css("borderColor","red")
                .after($(`<span class="error-info">Wpisz poprawny email</span>`))
                .parent().addClass("error");

        } else {
            $(this).css("borderColor","#ccc")
                .parent().removeClass("error");
        }
    });
}

export default validation;