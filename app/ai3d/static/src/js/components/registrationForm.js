function register() {
    const trainingSelect = $(".training-select");
    const firstOption = trainingSelect.find('option:first-child')[0].value;

    getDate("training/"+firstOption);
    trainingSelect.change(function() {
        const selectVal = $(this).find('option:selected').val();
        getDate("training/"+selectVal);
    });


    $(".training-registration-form").on("submit", function(event) {
        event.preventDefault();
        const name = $('#userName');
        const surname = $('#userSurname');
        const email = $('#userEmail');
        const phone = $('#userTel');
        const fields = $('.registration-form-input');

        const nameVal = name.val();
        const surnameVal = surname.val();
        const emailVal = email.val();
        const phoneVal = phone.val();
        const optionId = $('.date-select option:selected')[0].id;

        const btn = $('.registration-form-btn');

        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const regexPhone =  /^[0-9]{6,12}$/;
        const errors = [];

        $(".registration-form-errors").remove();
        $('.registration-form-state').remove();

        if (nameVal==='') {
            name.css("border","1px solid red");
        } else {
            name.css("border","1px solid #ccc");
        }

        if (surnameVal==='') {
            surname.css("border","1px solid red");
        } else {
            surname.css("border","1px solid #ccc");
        }

        if (!regexEmail.test(emailVal)) {
            email.css("border","1px solid red");
        } else {
            email.css("border","1px solid #ccc");
        }

        if (!regexPhone.test(phoneVal)) {
            phone.css("border","1px solid red");
        } else {
            phone.css("border","1px solid #ccc");
        }

        if (nameVal==='' || surnameVal==='' || emailVal==='' || phoneVal==='') {
            errors.push('Uzupełnij puste pola');
        }

        if (emailVal!=='' && !regexEmail.test(emailVal)) {
            errors.push('Wpisz poprawny adres email');
        }

        if (phoneVal!=='' && !regexPhone.test(phoneVal)) {
            errors.push('Wpisz poprawny numer telefonu');
        }

        if (errors.length > 0) {
            const $errorContainer = $("<div class='registration-form-errors'><span><b>Niepoprawne dane</b></span></div>");
            $.map(errors, function(error) {
                return $errorContainer.append("<span class='registration-form-error'>"+error+"</span>");
            });
            btn.after( $errorContainer );
        }

        if (nameVal!=='' && surnameVal!=='' && regexEmail.test(emailVal)) {
            $.ajax({
                url: "training",
                method: "POST",
                data: {
                    name: nameVal,
                    last_name: surnameVal,
                    email: emailVal,
                    phone_number: phoneVal,
                    id: optionId,
                }
            }).done(function () {
                //clear fields
                fields.val('');
                fields.css("border", "1px solid #ccc");

                //add information
                $('.registration-form-state').remove();

                const $state = $("<p class='registration-form-state'>Wiadomość została wysłana</p>");
                btn.after($state);

                //change style btn
                btn.css({
                    "background": "#5fc9c9",
                    "color": "white",
                    "cursor": "not-allowed"
                });
                btn.prop('disabled', true);

            }).fail(function () {
                //add information
                if ($('.registration-form-state').length === 0) {
                    const $state = $("<p class='registration-form-state'>Wysyłanie wiadomości nie powiodło się.<br>Spróbuj ponownie za chwilę.</p>");
                    btn.after($state);
                }
            });
        }
    });
}


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


export default register;