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

        const name = $('#contactName'),
            surname = $('#contactSurname'),
            email =  $('#contactEmail'),
            message = $('#contactMessage'),
            fields = $(".contact-form .field"),

            nameVal = name.val(),
            surnameVal = surname.val(),
            emailVal = email.val(),
            messageVal = message.val(),

            btn = $(".contact-form-btn"),

            //form validation
            regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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

        if (surnameVal==='') {
            surname.next().remove();
            surname.after($("<span class='tooltiptext'>Uzupełnij pole</span>"));
            surname.parent().addClass('tooltip');
            surname.css("borderColor","red");
        } else {
            surname.next().remove();
            surname.parent().removeClass('tooltip');
            surname.css("borderColor","#ccc");
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

        if (messageVal==='' || messageVal.length < 8) {
            message.next().remove();
            message.after($("<span class='tooltiptext'>Wpisz co najmniej 8 znaków</span>"));
            message.parent().addClass('tooltip');
            message.css("borderColor", "red");
        } else {
            email.next().remove();
            email.parent().removeClass('tooltip');
            email.css("borderColor","#ccc");
        }

        if (nameVal!=='' && surnameVal!=='' && regexEmail.test(emailVal) && messageVal.length>=8) {
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
                fields.css("borderColor","#ccc");

                //add information
                $('.contact-form-state').remove();
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
                if ($('.contact-form-state').length === 0) {
                    const $state = $("<p class='contact-form-state'>Wysyłanie wiadomości nie powiodło się.<br>Spróbuj ponownie za chwilę.</p>");
                    btn.after($state);
                }
            });
        }
    });

}

export default contact;