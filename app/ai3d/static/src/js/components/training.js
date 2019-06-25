function register() {
    const trainingSelect = $(".training-select");
    const firstOption = trainingSelect.find('option:first-child')[0].value;

    function getDate(url) {
        const dateSelect = $(".date-select");
        $.ajax({
            url: url,
        }).done(function (res) {
            dateSelect.children().length>0 ? dateSelect.empty() : null;
            $.map(res, function (el) {
                return dateSelect.append("<option id="+el.id+">" + el.data + "</option>");
            });
        });
    }

    getDate("training/"+firstOption);

    trainingSelect.change(function() {
        const selectVal = $(this).find('option:selected').val();
        getDate("training/"+selectVal);
    });


    $(".training-registration-form").on("submit", function(event) {
        event.preventDefault();
        const name = $('#userName'),
            email = $('#userEmail'),
            phone = $('#userTel'),
            fields = $('.registration-form-input'),

            nameVal = name.val(),
            emailVal = email.val(),
            phoneVal = phone.val(),
            optionId = $('.date-select option:selected')[0].id,

            btn = $('.registration-form-btn'),
            containerBtn = $('.registration-btn-container'),

            //validation form
            regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            regexPhone =  /^[0-9]{6,12}$/;

        if (nameVal==='') {
            name.next().remove();
            name.after($("<span class='tooltiptext'>Uzupełnij pole</span>"));
            name.parent().addClass('tooltip');
            name.css("borderColor","red");
        } else {
            name.next().remove();
            name.parent().removeClass('tooltip');
            name.css("borderColor","#ccc");
        }

        if (emailVal==='') {
            email.next().remove();
            email.after($("<span class='tooltiptext'>Uzupełnij pole</span>"));
            email.parent().addClass('tooltip');
            email.css("borderColor", "red");
        } else if (emailVal!=='' && !regexEmail.test(emailVal)) {
            email.next().remove();
            email.after($("<span class='tooltiptext'>Wpisz poprawny email</span>"));
            email.parent().addClass('tooltip');
            email.css("borderColor", "red");
        } else {
            email.next().remove();
            email.parent().removeClass('tooltip');
            email.css("borderColor","#ccc");
        }

        if (phoneVal==='') {
            phone.next().remove();
            phone.after($("<span class='tooltiptext'>Uzupełnij pole</span>"));
            phone.parent().addClass('tooltip');
            phone.css("borderColor", "red");
        } else if (phoneVal!=='' && !regexPhone.test(phoneVal)) {
            phone.next().remove();
            phone.after($("<span class='tooltiptext'>Wpisz poprawny numer</span>"));
            phone.parent().addClass('tooltip');
            phone.css("borderColor", "red");
        } else {
            phone.next().remove();
            phone.parent().removeClass('tooltip');
            phone.css("borderColor","#ccc");
        }


        if (nameVal!=='' && regexEmail.test(emailVal) && regexPhone.test(phoneVal)) {
            $.ajax({
                url: "training",
                method: "POST",
                data: {
                    name: nameVal,
                    email: emailVal,
                    phone_number: phoneVal,
                    id: optionId,
                }
            }).done(function () {
                //clear fields
                fields.val('');
                fields.css("borderColor", "#ccc");

                //add information
                $('.registration-form-state').remove();
                const $state = $("<p class='registration-form-state'>Dziękujemy za zapisanie się na szkolenie</p>");
                containerBtn.append($state);

                //change style btn
                btn.addClass('registration-btn-success').prop('disabled', true);

                setTimeout(function(){
                    btn.removeClass('registration-btn-success').prop('disabled', false);
                    $('.registration-form-state').remove();
                },7000);

            }).fail(function () {
                //add information
                if ($('.registration-form-state').length === 0) {
                    const $state = $("<p class='registration-form-state'>Zapisanie nie powiodło się. Spróbuj ponownie za chwilę</p>");
                    containerBtn.append($state);
                }
            });
        }
    });
}

export default register;