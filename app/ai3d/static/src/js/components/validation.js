function validation(requiredFields) {
    const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        regexPhone =  /^[0-9]{6,12}$/;
        
    requiredFields.each(function() {
        $(this).next().remove();

        if ($(this).val().length === 0) {
            $(this).css("borderColor","red")
                .after($(`<span class="tooltiptext">Uzupełnij pole</span>`))
                .parent().addClass("tooltip");
        } else {
            $(this).css("borderColor","#ccc")
                .parent().removeClass("tooltip");
        }
    });
}

export default validation;