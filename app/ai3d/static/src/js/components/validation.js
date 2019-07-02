function validation(requiredFields) {
    const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        regexPhone =  /^[0-9]{7,11}$/;

    requiredFields.each(function() {
        $(this).next().remove();

        if ($(this).val().length === 0) {
            $(this).css("borderColor","red")
                .after($(`<span class="tooltiptext">Uzupełnij pole</span>`))
                .parent().addClass("tooltip");

        } else if ($(this).is("textarea") && $(this).val().length < 8) {
            $(this).css("borderColor","red")
                .after($(`<span class="tooltiptext">Za krótka wiadomość. Wpisz min 8 znaków</span>`))
                .parent().addClass("tooltip");

        } else if ($(this).is("[type=tel]") && !regexPhone.test($(this).val())) {
            $(this).css("borderColor","red")
                .after($(`<span class="tooltiptext">Wpisz poprawny numer</span>`))
                .parent().addClass("tooltip");

        } else if ($(this).is("[name=email]") && !regexEmail.test($(this).val())) {
            $(this).css("borderColor","red")
                .after($(`<span class="tooltiptext">Wpisz poprawny email</span>`))
                .parent().addClass("tooltip");

        } else {
            $(this).css("borderColor","#ccc")
                .parent().removeClass("tooltip");
        }
    });
}

export default validation;