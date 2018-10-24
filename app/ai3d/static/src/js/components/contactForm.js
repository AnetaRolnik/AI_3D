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

        let nameVal = $('#contactName').val();
        let surnameVal = $('#contactSurname').val();
        let emailVal = $('#contactEmail').val();
        let messageVal = $('#contactMessage').val();
        let fields = $(".contact-form .field");
        let btn = $(".contact-form-btn");

        const regexName = /^[a-zA-Z]{2,20}$/;
        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!regexName.test(nameVal)) {
            console.log("niepoprawne imię");
        }

        if (!regexName.test(surnameVal)) {
            console.log("niepoprawne nazwisko")
        }

        if (!regexEmail.test(regexEmail)) {
            console.log("niepoprawny mail");
        }

        if (messageVal.length <= 8 || messageVal.length >= 200) {
            console.log("niepoprawna wiadomość");
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