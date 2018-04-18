$(document).ready(function ()
{
    $.ajax(
        {
            type: "POST",
            url: "/getPermits",
            data:{},
            dataType: "json",
            contentType: "application/json",
            success: function (res)
            {
                var html = 
                "<thead>"+
                "<tr>"+
                "  <th>Application/Permit Number</th>"+
                "  <th>Applicant Name</th>"+
                "  <th>Action Type</th>"+
                "  <th>Category</th>"+
                "  <th>Description</th>"+
                "  <th>Work Type</th>"+
                "  <th>Delete</th>"+
                "  <th>Edit</th>"+
                "</tr>"+
                "</thead>"+
                "<tbody>";

                for(var i=0; i<res.permits.length; i++)
                {
                    html += "<tr>";
                    for(var k=0; k<res.permits[i].length; k++)
                    {
                        html+="<td>"+res.permits[i][k]+"</td>";
                    }
                    html+='<td><div><button id="delete_'+res.permits[i][0]+'" value="delete">delete</button></div></td>';
                    html+='<td><div><button id="edit_'+res.permits[i][0]+'"" value="edit">edit</button></div></td>';
                    html += "</tr>";
                }                

                html += "</tbody></table>";                
                
                $("#dataTable").html(html);


                //Configuring buttons
                var id=0;
                var i=0;
                for(i=0; i<res.permits.length; i++)
                {                    
                    id = res.permits[i][0];

                    (function(id)
                    {
                        $("#delete_" + id).on("click", function ()
                        {
                            console.log("deleting..."+id);
                            deletePermit(id);
                        });
                    })(id);
                    
                    (function(id)
                    {
                        $("#edit_" + id).on("click", function ()
                        {
                            console.log("edditing..."+id);
                            editPermit(id);
                        });

                    })(id);
                }
            },
            error: function(request, ajaxOptions, thrownError)
            {
                console.log(request.responseText)
            }
        });
});


function deletePermit(id)
{
    $.ajax(
        {
            type: "POST",
            url: "/deletePermit",
            data: JSON.stringify({"id_permit":id}),
            contentType: "application/json",
            dataType: "json",
            success: function (res)
            {
                console.log(res);
                window.location  = "tables.html"
            },
            error: function(request, ajaxOptions, thrownError)
            {
                console.log(request.responseText)
            }
        });
}

function editPermit(id)
{
    $.ajax(
        {
            type: "POST",
            url: "/editPermit",
            data: JSON.stringify({"id_permit":id}),
            contentType: "application/json",
            dataType: "json",
            success: function (res)
            {
                console.log(res);
                window.location  = "/edit"
            },
            error: function(request, ajaxOptions, thrownError)
            {
                console.log(request.responseText)
            }
        });
}


function searchCategory()
{
    $.ajax(
        {
            type: "POST",
            url: "/getPermitsWithFilter",
            data: JSON.stringify({"filter":$("#search_cat").val()}),
            dataType: "json",
            contentType: "application/json",
            success: function (res)
            {
                console.log('success', res);
                var html = 
                "<thead>"+
                "<tr>"+
                "  <th>Application/Permit Number</th>"+
                "  <th>Applicant Name</th>"+
                "  <th>Action Type</th>"+
                "  <th>Category</th>"+
                "  <th>Description</th>"+
                "  <th>Work Type</th>"+
                "  <th>Delete</th>"+
                "  <th>Edit</th>"+
                "</tr>"+
                "</thead>"+
                "<tbody>";

                for(var i=0; i<res.permits.length; i++)
                {
                    html += "<tr>";
                    for(var k=0; k<res.permits[i].length; k++)
                    {
                        html+="<td>"+res.permits[i][k]+"</td>";
                    }
                    html+='<td><div><button id="delete_'+res.permits[i][0]+'" value="delete">delete</button></div></td>';
                    html+='<td><div><button id="edit_'+res.permits[i][0]+'"" value="edit">edit</button></div></td>';
                    html += "</tr>";
                }                

                html += "</tbody></table>";                
                
                $("#dataTable").html(html);


                //Configuring buttons
                var id=0;
                var i=0;
                for(i=0; i<res.permits.length; i++)
                {                    
                    id = res.permits[i][0];
                    console.log(i, id);

                    (function(id)
                    {
                        $("#delete_" + id).on("click", function ()
                        {
                            console.log("deleting..."+id);
                            deletePermit(id);
                        });
                    })(id);
                    
                    (function(id)
                    {
                        $("#edit_" + id).on("click", function ()
                        {
                            console.log("edditing..."+id);
                            editPermit(id);
                        });

                    })(id);
                }
            },
            error: function(request, ajaxOptions, thrownError)
            {
                console.log(request.responseText)
            }
        });
}