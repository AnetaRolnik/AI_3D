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
        let nameVal = $('#contactName').val();
        let surnameVal = $('#contactSurname').val();
        let emailVal = $('#contactEmail').val();
        let messageVal = $('#contactMessage').val();
        let fields = $(".contact-form .field");
        let btn = $(".contact-form-btn");

        event.preventDefault();
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
            const $info = $("<span class='contact-form-info'>Formularz został wysłany</span>");
            btn.after( $info );

            //change style btn
            btn.css({
                "background" : "#5fc9c9",
                "color" : "white",
                "cursor" : "not-allowed"
            });
            btn.prop('disabled', true);
        });
    });

}

export default contact;