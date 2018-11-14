function contact() {

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    let csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });


    $(".contact-form").on("submit", function(event){
        event.preventDefault();

        const name = $('#contactName');
        const surname = $('#contactSurname');
        const email =  $('#contactEmail');
        const message = $('#contactMessage');
        const fields = $(".contact-form .field");

        const nameVal = name.val();
        const surnameVal = surname.val();
        const emailVal = email.val();
        const messageVal = message.val();

        const btn = $(".contact-form-btn");

        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const errors = [];

        $(".contact-form-errors").remove();

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
            email.css("border","1px solid #ccc")
        }

        if (nameVal==='' || surnameVal==='' || emailVal==='' || messageVal==='') {
            errors.push('Uzupełnij puste pola');
        }

        if (emailVal!=='' && !regexEmail.test(emailVal)) {
            errors.push('Wpisz poprawny adres email')
        }

        if (messageVal.length < 8 || messageVal.length > 200) {
            message.css("border","1px solid red");
            errors.push("W wiadomości użyj co najmniej 8 znaków");
        } else {
            message.css("border","1px solid #ccc");
        }

        if (errors.length > 0) {
            const $errorContainer = $("<div class='contact-form-errors'><span><b>Niepoprawne dane</b></span></div>");
            $.map(errors, function(error) {
                return $errorContainer.append("<span class='contact-form-error'>"+error+"</span>");
            });
            btn.after( $errorContainer );
        }

        if (nameVal!=='' && surnameVal!=='' && regexEmail.test(emailVal) && messageVal.length>=8 && messageVal.length<=200) {
            $.ajax({
                url: "contact",
                method: "POST",
                data : {
                    name: nameVal,
                    last_name: surnameVal,
                    email: emailVal,
                    message: messageVal,
                }
            }).done(function(){
                //clear fields
                fields.val("");
                fields.css("border","1px solid #ccc");

                //add information
                const $state = $("<p class='contact-form-state'>Wiadomość została wysłana</p>");
                btn.after( $state );

                //change style btn
                btn.css({
                    "background" : "#5fc9c9",
                    "color" : "white",
                    "cursor" : "not-allowed"
                });
                btn.prop('disabled', true);
            }).fail(function(){
                //add information
                const $state = $("<p class='contact-form-state'>Wysyłanie wiadomości nie powiodło się.<br>Spróbuj ponownie za chwilę.</p>");
                btn.after( $state );
            });
        }
    });

}

export default contact;