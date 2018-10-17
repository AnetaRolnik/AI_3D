import map from "./components/map";
import scrollNav from "./components/scrollNav";

document.addEventListener("DOMContentLoaded", function(){
    map();
    scrollNav();

    function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
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
        console.log($('#formName').val())
        $.ajax({
            url: "contact",
            method: "POST",
            data : {
                name: $('#formName').val(),
                last_name: $('#formSurname').val(),
                email: $('#formEmail').val(),
                message: $('#formMessage').val(),
            },
            success: function( data ){
                console.log( data )
            }
        });

    });

})

