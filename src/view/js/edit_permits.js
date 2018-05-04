//Called from the tables page when edit button is clicked
$(document).ready(function () {

    var url_string = window.location.href;
    var url = new URL(url_string);
    var paramValue = url.searchParams.get("permit_id");
    // alert(paramValue);
    $.ajax(
        {
            type: "POST",
            url: "/getEditPermitData",
            data: JSON.stringify({ "permit_id": paramValue }),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                $("#applicant_name").val(res.data[8]);
                $("#contractor").val(res.data[14]);
                $("#action_type").val(res.data[5]);
                $("#permit_type").val(res.data[1]);
                $("#category").val(res.data[4]);
                $('#work_type').val(res.data[6]);
                $("#address").val(res.data[2]);
                $("#datepicker").val(res.data[9]);
                $("#description").val(res.data[3]);
                $("#value").val(res.data[7]);

                console.log(res.data);
            },
            error: function (request, ajaxOptions, thrownError) {
                console.log(request.responseText)
            }
        });
});

function cancelEdit() {
    window.location = "tables.html";
}

function submitForm() {
    //Get the permit id
    var url_string = window.location.href;
    var url = new URL(url_string);
    var paramValue = url.searchParams.get("permit_id");

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

    var data = {
        "permit_id":paramValue,
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

     editPermit(data);
}

function editPermit(data) {
    $.ajax(
        {
            type: "POST",
            url: "/editData",
            data: JSON.stringify({ "data": data }),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                window.location = "tables.html";
            },
            error: function (request, ajaxOptions, thrownError) {
                console.log(request.responseText)
            }
        });
}