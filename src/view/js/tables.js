$(document).ready(function () {
    $.ajax(
        {
            type: "POST",
            url: "/getPermits",
            data: {},
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                var html =
                    "<thead>" +
                    "<tr>" +
                    "<th>Delete</th>" +
                    "<th>Edit</th>" +
                    "<th>Application/Permit Number</th>" +
                    "<th>Permit Type</th>" +
                    "<th>Address</th>" +
                    "<th>Description</th>" +
                    "<th>Category</th>" +
                    "<th>Action Type</th>" +
                    "<th>Work Type</th>" +
                    "<th>Value</th>" +
                    "<th>Applicant Name</th>" +
                    "<th>Application Date</th>" +
                    "<th>Issue Date</th>" +
                    "<th>Final Date</th>" +
                    "<th>Expiration Date</th>" +
                    "<th>Status</th>" +
                    "<th>Contractor</th>" +
                    "<th>Permit and Complaint Status</th>" +
                    "<th>Master Use Permit</th>" +
                    "<th>Latitude</th>" +
                    "<th>Longitude</th>" +
                    "<th>Location</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>";

                for (var i = 0; i < res.permits.length; i++) {
                    html += "<tr>";
                    html += '<td><div><button class="btn btn-primary" id="delete_' + res.permits[i][0] + '" value="delete">Delete</button></div></td>';
                    html += '<td><div><button class="btn btn-primary" id="edit_' + res.permits[i][0] + '"" value="edit">Edit</button></div></td>';
                    for (var k = 0; k < res.permits[i].length; k++) {
                        if (res.permits[i][k] != null) {
                            html += "<td>" + res.permits[i][k] + "</td>";
                        } else {
                            html += "<td> </td>";
                        }
                    }
                    html += "</tr>";
                }

                html += "</tbody></table>";

                $("#dataTable").html(html);


                //Configuring buttons
                var id = 0;
                var i = 0;
                for (i = 0; i < res.permits.length; i++) {
                    id = res.permits[i][0];

                    (function (id) {
                        $("#delete_" + id).on("click", function () {
                            console.log("deleting..." + id);
                            deletePermit(id);
                        });
                    })(id);

                    (function (id) {
                        $("#edit_" + id).on("click", function () {
                            console.log("edditing..." + id);
                            editPermit(id);
                        });

                    })(id);
                }
            },
            error: function (request, ajaxOptions, thrownError) {
                console.log(request.responseText)
            }
        });
});

function fnExcelReport() {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + $('#dataTable').html();
    tab_text = tab_text + '</table></body></html>';
    var data_type = 'data:application/vnd.ms-excel';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, 'Permit_data.xls');
        }
    } else {
        $('#exportLink').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
        $('#exportLink').attr('download', 'Permit_data.xls');
    }
}

function deletePermit(id) {
    $.ajax(
        {
            type: "POST",
            url: "/deletePermit",
            data: JSON.stringify({ "id_permit": id }),
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

function editPermit(id) {
    //Calling permits data from permits.js
    console.log("I'm inside edit permits!!")
    window.location = "edit_application.html?permit_id=" + id;
}

function searchCategory() {
    $.ajax(
        {
            type: "POST",
            url: "/getPermitsWithFilter",
            //data: JSON.stringify({ "filter": $("#search_cat").val(), "column": JSON.parse($("#graphX").val()).db}),
            data: JSON.stringify({ "filter": $("#search_cat").val(), "column": JSON.parse($("#graphX2").val()}),
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                console.log('success', res);
                var html =
                    "<thead>" +
                    "<tr>" +
                    "<th>Delete</th>" +
                    "<th>Edit</th>" +
                    "<th>Application/Permit Number</th>" +
                    "<th>Permit Type</th>" +
                    "<th>Address</th>" +
                    "<th>Description</th>" +
                    "<th>Category</th>" +
                    "<th>Action Type</th>" +
                    "<th>Work Type</th>" +
                    "<th>Value</th>" +
                    "<th>Applicant Name</th>" +
                    "<th>Application Date</th>" +
                    "<th>Issue Date</th>" +
                    "<th>Final Date</th>" +
                    "<th>Expiration Date</th>" +
                    "<th>Status</th>" +
                    "<th>Contractor</th>" +
                    "<th>Permit and Complaint Status</th>" +
                    "<th>Master Use Permit</th>" +
                    "<th>Latitude</th>" +
                    "<th>Longitude</th>" +
                    "<th>Location</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>";

                for (var i = 0; i < res.permits.length; i++) {
                    html += "<tr>";
                    html += '<td><div><button id="delete_' + res.permits[i][0] + '" value="delete">delete</button></div></td>';
                    html += '<td><div><button id="edit_' + res.permits[i][0] + '"" value="edit">edit</button></div></td>';
                    for (var k = 0; k < res.permits[i].length; k++) {
                        if (res.permits[i][k] != null) {
                            html += "<td>" + res.permits[i][k] + "</td>";
                        } else {
                            html += "<td> </td>";
                        }
                    }
                    html += "</tr>";
                }

                html += "</tbody></table>";

                $("#dataTable").html(html);

                //Configuring buttons
                var id = 0;
                var i = 0;
                for (i = 0; i < res.permits.length; i++) {
                    id = res.permits[i][0];
                    console.log(i, id);

                    (function (id) {
                        $("#delete_" + id).on("click", function () {
                            console.log("deleting..." + id);
                            deletePermit(id);
                        });
                    })(id);

                    (function (id) {
                        $("#edit_" + id).on("click", function () {
                            console.log("edditing..." + id);
                            editPermit(id);
                        });

                    })(id);
                }
            },
            error: function (request, ajaxOptions, thrownError) {
                console.log(request.responseText)
            }
        });
}

function visualizePage() {
    window.location = "charts.html"
}