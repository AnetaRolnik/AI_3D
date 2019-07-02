import validation from './validation';

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


    $(".contact-form").on("submit", function(e) {
        const requiredFields = $(".contact-form .required"),
            btn = $(".contact-form-btn"),
            containerBtn = $(".contact-btn-container"),

            nameVal =  $('#contactName').val(),
            surnameVal = $('#contactSurname').val(),
            emailVal = $('#contactEmail').val(),
            messageVal = $('#contactMessage').val();

        e.preventDefault();
        validation(requiredFields);

        const errors = $(".contact-form .error").length;

        if (errors === 0) {
            $.ajax({
                url: "message/",
                method: "POST",
                contentType: "application/json",
                data : JSON.stringify({
                    "sender": {
                      "name": [nameVal, surnameVal].join(" "),
                      "email": emailVal
                    },
                    "body": messageVal
                })
            }).done(function(){
                requiredFields.val("").css("borderColor","#ccc");

                $('.contact-form-state').remove();
                const $state = $("<p class='contact-form-state'>Wiadomość została wysłana</p>");
                containerBtn.append( $state );

                btn.addClass('contact-btn-success').prop('disabled', true);

                setTimeout(function(){
                    btn.removeClass('contact-btn-success').prop('disabled', false);
                    $('.contact-form-state').remove();
                },7000);

            }).fail(function(){
                if ($('.contact-form-state').length === 0) {
                    const $state = $("<p class='contact-form-state'>Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę</p>");
                    containerBtn.append($state);
                }
            });
        }
    });
}

export default contact;