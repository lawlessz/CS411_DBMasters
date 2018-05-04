
function submitForm() {
    var applicant_name = $("#applicant_name").val();
    var contractor= $("#contractor").val();
    var action_type = $("#action_type").val();
    var permit_type = $("#permit_type").val();
    var category = $("#category").val();
    var work_type = $('#work_type').val();
    var address = $("#address").val();
    var application_date = $("#datepicker").val();
    var description = $("#description").val();
    var value = $("#value").val();

    console.log('I got: ' + applicant_name + ' ' + contractor + ' ' + action_type + ' '
    + permit_type + ' ' + category + ' ' + work_type + ' ' + address + ' ' + application_date + ' ' + description
  + ' ' + value);

    var data = {
        "applicant_name": applicant_name,
        "contractor": contractor,
        "action_type": action_type,
        "permit_type":permit_type,
        "category": category,
        "work_type":work_type,
        "address":address,
        "application_date":application_date,
        "description": description,
        "value": value
    };

     createPermit(data);
}

function createPermit(data) {
    $.ajax(
        {
            type: "POST",
            url: "/createPermit",
            data: JSON.stringify({ "data": data }),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                window.location = "tables.html"
            },
            error: function (request, ajaxOptions, thrownError) {
                console.log(request.responseText)
            }
        });
}



