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

        const nameVal = $('#contactName').val();
        const surnameVal = $('#contactSurname').val();
        const emailVal = $('#contactEmail').val();
        const messageVal = $('#contactMessage').val();

        const btn = $(".contact-form-btn");

        const regexName = /^[a-zA-Z]{2,20}$/;
        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!regexName.test(nameVal)) {
            name.css("border","1px solid red");
        } else {
            name.css("border","1px solid #ccc");
        }

        if (!regexName.test(surnameVal)) {
            surname.css("border","1px solid red");
        } else {
            surname.css("border","1px solid #ccc");
        }

        if (!regexEmail.test(regexEmail)) {
            email.css("border","1px solid red");
        } else {
            email.css("border","1px solid #ccc")
        }

        if (messageVal.length <= 8 || messageVal.length >= 200) {
            message.css("border","1px solid red");
        } else {
            message.css("border","1px solid #ccc");
        }

        if (regexName.test(nameVal) && regexName.test(surnameVal) && regexEmail.test(emailVal) && messageVal.length>=8 && messageVal.length<=200) {
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
                fields.css("border","1px solid #ccc")

                //add information
                const $info = $("<span class='contact-form-info'>Wiadomość została wysłana</span>");
                btn.after( $info );

                //change style btn
                btn.css({
                    "background" : "#5fc9c9",
                    "color" : "white",
                    "cursor" : "not-allowed"
                });
                btn.prop('disabled', true);
            });
        }
    });

}

export default contact;