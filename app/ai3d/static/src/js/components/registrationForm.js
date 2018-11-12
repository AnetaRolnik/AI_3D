function register() {
    const trainingSelect = $(".training-select");
    const firstOption = trainingSelect.find('option:first-child')[0].value;

    getDate("training/"+firstOption);
    trainingSelect.change(function() {
        const selectVal = $(this).find('option:selected').val();
        getDate("training/"+selectVal);
    });
}

function getDate(url) {
    const dateSelect = $(".date-select");

    $.ajax({
        url: url,
    }).done(function (res) {
        dateSelect.children().length>0 ? dateSelect.empty() : null;
        $.map(res, function (el) {
            return dateSelect.append("<option>" + el.data + "</option>");
        });
    });
}


export default register;