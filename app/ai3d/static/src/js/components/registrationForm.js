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

        const nameVal = $('#userName').val();
        const surnameVal = $('#userSurname').val();
        const emailVal = $('#userEmail').val();
        const telVal = $('#userTel').val();
        const optionId = $('.date-select option:selected')[0].id;

        $.ajax({
            url: "training",
            method: "POST",
            data : {
                name: nameVal,
                last_name: surnameVal,
                email: emailVal,
                phone_number: telVal,
                id: optionId,
            }
        }).done(function(){
            console.log("wyslano");
        });
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