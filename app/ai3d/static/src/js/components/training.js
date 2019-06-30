import validation from "./validation";

function training() {
    const addParticipant = $("#addParticipant"),
        participantsData = $("#participantsData"),
        invoiceCheckbox = $("#invoice"),
        userCheckbox = $("#user"),
        participantInput = $("#participantsData .required"),
        nameInput = $("#personalData #name"),
        trainingSelect = $(".training-select"),
        firstOption = trainingSelect.find("option:first-child")[0].value,
        requiredFields = $(".required");

    const participant = (`
        <div class="registration-form-row">
            <label class="registration-form-label" for="participantName">Imię i nazwisko</label>
            <input class="registration-form-input" type="text" name="name" id="participantName">
        </div>
    `)

    addParticipant.on("click", function() {
        $(this).before(participant);
        participantsData.children().length > 6 ? $(this).remove() : null;
    });

    const invoice = (`
        <div id="invoiceData">
            <h3 class="registartion-form-title">Dane instytucji zgłaszającej (dane do faktury)</h3>
            <div class="registration-form-row">
                <label class="registration-form-label" for="companyName">Nazwa firmy instytucji *</label>
                <input class="registration-form-input required" type="text" name="name" id="companyName">
            </div>
            <div class="registration-form-row">
                <label class="registration-form-label" for="companyAddress">Adres siedziby *</label>
                <input class="registration-form-input required" type="text" name="address" id="companyAddress">
            </div>
            <div class="registration-form-row">
                <label class="registration-form-label" for="companyTel">Telefon komórkowy *</label>
                <input class="registration-form-input required" type="number" placeholder="Tylko cyfry np.123456789" name="tel" id="companyTel">
            </div>
            <div class="registration-form-row">
                <label class="registration-form-label" for="companyEmail">Adres email *</label>
                <input class="registration-form-input required" type="email" name="tel" id="companyEmail">
            </div>
            <div class="registration-form-row">
                <label class="registration-form-label" for="companyNIP">NIP</label>
                <input class="registration-form-input" type="number" name="nip" id="companyNIP">
            </div>
        </div>
    `)

    invoiceCheckbox.on("click", function() {
        $(this).prop("checked")
            ? $(this).parent().after(invoice)
            : $("#invoiceData").remove();
    });    

    userCheckbox.on("click", function() {
        if($(this).prop("checked")) {
            participantInput.val(nameInput.val()).prop("readonly", true).css("background", "#f6f7f6");
            nameInput.bind("keyup change", function() {
                participantInput.val($(this).val());
            });
        } else { 
            participantInput.val("");
        };
    });    

    function getDate(url) {
        const dateSelect = $(".date-select");
        $.ajax({
            url: url,
        }).done(function (res) {
            dateSelect.children().length>0 ? dateSelect.empty() : null;
            $.map(res, function (el) {
                return dateSelect.append(`<option id=${el.id}> ${el.data} </option>`);
            });
        });
    }

    getDate("training/"+firstOption);

    trainingSelect.change(function() {
        const selectVal = $(this).find("option:selected").val();
        getDate("training/"+selectVal);
    });

    $(".training-registration-form").on("submit", function(e) {
        const requiredFields= $(".training-registration-form .required"),
            fields = $(".registration-form-input"),
            optionId = $(".date-select option:selected")[0].id,
            btn = $(".registration-form-btn"),
            containerBtn = $(".registration-btn-container"),

            regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            regexPhone =  /^[0-9]{6,12}$/;

        e.preventDefault();
        validation(requiredFields);

        // if (nameVal!=="" && regexEmail.test(emailVal) && regexPhone.test(phoneVal)) {
        //     $.ajax({
        //         url: "training",
        //         method: "POST",
        //         data: {
        //             name: nameVal,
        //             email: emailVal,
        //             phone_number: phoneVal,
        //             id: optionId,
        //         }
        //     }).done(function () {
        //         //clear fields
        //         fields.val("");
        //         fields.css("borderColor", "#ccc");

        //         //add information
        //         $(".registration-form-state").remove();
        //         const $state = $(`<p class="registration-form-state">Dziękujemy za zapisanie się na szkolenie</p>`);
        //         containerBtn.append($state);

        //         //change style btn
        //         btn.addClass("registration-btn-success").prop("disabled", true);

        //         setTimeout(function(){
        //             btn.removeClass("registration-btn-success").prop("disabled", false);
        //             $(".registration-form-state").remove();
        //         },7000);

        //     }).fail(function () {
        //         //add information
        //         if ($(".registration-form-state").length === 0) {
        //             const $state = $(`<p class="registration-form-state">Zapisanie nie powiodło się. Spróbuj ponownie za chwilę</p>`);
        //             containerBtn.append($state);
        //         }
        //     });
        // }
    });
}

export default training;