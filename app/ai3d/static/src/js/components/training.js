import validation from "./validation";

function training() {
    const addParticipant = $("#addParticipant"),
        participantsData = $("#participantsData ol"),
        invoiceCheckbox = $("#invoice"),
        userCheckbox = $("#userAsParticipant"),
        userName = $("#personalData #name"),
        userEmail = $("#personalData #mail"),
        participantName = $(".participantData #participantName"),
        participantEmail = $(".participantData #participantEmail"),
        trainingSelect = $(".training-select"),
        firstOption = trainingSelect.find("option:first-child")[0].value;

    const participant = (`
        <li class="participantData" data-aos="fade-up" data-aos-duration="500" data-aos-delay="50" data-aos-once="true">
            <div class="registration-form-row">
                <label class="registration-form-label" for="participantName">Imię i nazwisko</label>
                <input class="registration-form-input" type="text" name="name" id="participantName">
            </div>
            <div class="registration-form-row">
                <label class="registration-form-label" for="participantEmail">Adres email</label>
                <input class="registration-form-input" name="email" id="participantEmail">
            </div>
        </div>
    `)

    addParticipant.on("click", function() {
        participantsData.append(participant);
        participantsData.children().length === 5 ? $(this).remove() : null;
    });

    userCheckbox.on("click", function() {
        if($(this).prop("checked")) {
            participantName.val(userName.val()).prop("readonly", true).css("background", "#f6f7f6");
            userName.bind("keyup change", function() {
                participantName.val($(this).val());
            });

            participantEmail.val(userEmail.val()).prop("readonly", true).css("background", "#f6f7f6");
            userEmail.bind("keyup change", function() {
                participantEmail.val($(this).val());
            });

        } else { 
            participantName.val("").prop("readonly", false).css("background", "#fff");
            participantEmail.val("").prop("readonly", false).css("background", "#fff");
        };
    });

    const invoice = (`
        <div id="invoiceData" data-aos="fade-up" data-aos-duration="500" data-aos-delay="50" data-aos-once="true">
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
                <input class="registration-form-input required" type="tel" placeholder="Tylko cyfry np.500500500" name="tel" id="companyTel">
            </div>
            <div class="registration-form-row">
                <label class="registration-form-label" for="companyEmail">Adres email *</label>
                <input class="registration-form-input required" name="email" id="companyEmail">
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
            btn = $(".registration-btn"),
            containerBtn = $(".registration-btn-container");

        e.preventDefault();
        validation(requiredFields);

        const errors = $(".training-registration-form .error").length;
        
        if (errors === 0) {
            $.ajax({
                url: "entry/",
                method: "POST",
                contentType: "application/json",
                data : JSON.stringify({
                    // "training": 1,
                    // "reporting_person": {
                    //   "name": "aneta",
                    //   "email": "aneta@example.com",
                    //   "phone_number": "100500600"
                    // },
                    // "reporting_person_is_participating": true,
                    // "participants": [
                    //   {
                    //     "name": "string",
                    //     "email": "a@example.com",
                    //     "phone_number": "string"
                    //   }
                    // ],
                    // "invoice": {
                    //   "institution_name": "string",
                    //   "institution_address": "string",
                    //   "phone_number": "string",
                    //   "email": "user@example.com",
                    //   "nip": 0
                    // }
                  })
            }).done(function () {
                fields.val("").css("borderColor", "#ccc");

                $(".registration-form-state").remove();
                const $state = $(`<p class="registration-form-state">Dziękujemy za zapisanie się na szkolenie</p>`);
                containerBtn.append($state);

                btn.addClass("registration-btn-success").prop("disabled", true);

                setTimeout(function(){
                    btn.removeClass("registration-btn-success").prop("disabled", false);
                    $(".registration-form-state").remove();
                },7000);

            }).fail(function () {
                if ($(".registration-form-state").length === 0) {
                    const $state = $(`<p class="registration-form-state">Zapisanie nie powiodło się. Spróbuj ponownie za chwilę</p>`);
                    containerBtn.append($state);
                }
            });
        }
    });
}

export default training;