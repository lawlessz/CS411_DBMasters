$(document).ready(function ()
{
    $.ajax(
        {
            type: "POST",
            url: "/getUserTypes",
            data:{},
            dataType: "json",
            contentType: "application/json",
            success: function (res)
            {
               if(res != undefined && res.result != undefined && res.result.length > 0){
                   var menu = document.getElementById("inputRole");
                   //For adding Select option
                    var selectOption = document.createElement("option");
                    selectOption.value = 0; //The id_user_type
                    selectOption.innerHTML = "-Select-"; //The access name
                    menu.appendChild(selectOption);
                   
                    for(var i = 0; i < res.result.length; i++) {
                       var newOption = document.createElement("option");
                       newOption.value = res.result[i][0]; //The id_user_type
                       newOption.innerHTML = res.result[i][1]; //The access name
                       menu.appendChild(newOption);
                    }
               }
            },
            error: function(request, ajaxOptions, thrownError)
            {
                console.log(request.responseText)
            }
        });
}); //Dropdown load ends


function performLoginCheck() {
    //perform basic validations on the form
    var inputUser = document.getElementById("inputUser");
    var password = document.getElementById("inputPassword");
    var role = document.getElementById("inputRole");
    var validFlag = true;
    if (!inputUser.checkValidity()) {
        document.getElementById("invalidUser").innerHTML = "Please enter a valid email or username.";
        validFlag = false;
    } else {
        document.getElementById("invalidUser").innerHTML = "";
    }
    if (!password.checkValidity()) {
        document.getElementById("invalidPassword").innerHTML = "Please enter a valid password.";
        validFlag = false;
    } else {
        document.getElementById("invalidPassword").innerHTML = "";
    }
    if (!role.checkValidity() || role.value == 0) {
        document.getElementById("invalidRole").innerHTML = "Please select a role.";
        validFlag = false;
    } else {
        document.getElementById("invalidRole").innerHTML = "";
    }
    if (validFlag) {
        validFlag = false;
        doLogin(inputUser.value, password.value, role.value);
    }

}

function doLogin(inputUser, password, role) {
    $.ajax(
        {
            type: "POST",
            url: "/loginAction",
            data: JSON.stringify({ "user": inputUser, "password": password, "role": role }),
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                console.log('Im inside!!');
                if (res != undefined && res.user != undefined && res.user.length <= 0) {
                    console.log('No users found!!');
                    document.getElementById("incorrectUser").innerHTML = "Username does not exist!";
                }
                //Username-password does not match
                if (res != undefined && res.user != undefined && res.user.length >= 0) {
                    //Check email or user name
                    if ((res.user[0][2] == inputUser && res.user[0][3] == password && res.user[0][4] == role) || (res.user[0][1] == inputUser && res.user[0][3] == password && res.user[0][4] == role)) {
                        window.location = "maps.html"
                    } else {
                        document.getElementById("incorrectUser").innerHTML = "Username,password and role combination don't match!";
                    }
                }
            },
            error: function (request, ajaxOptions, thrownError) {
                console.log(request.responseText)

            }
        });

} //doLogin ends

function registerUser() {
    var email = document.getElementById("inputEmail");
    var userName = document.getElementById("inputName")
    var password = document.getElementById("inputPassword");
    var role = document.getElementById("inputRole");
    console.log('I got' + email.value + " " + userName.value + " " + password.value + " " + role.value);
    $.ajax(
        {
            type: "POST",
            url: "/registerAction",
            data: JSON.stringify({
                "email": email.value,
                "userName": userName.value,
                "password": password.value,
                "role": role.value
            }),
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                if (res != undefined && res.hasOwnProperty('result')) {
                    if (res.result > 0) {
                        document.getElementById("resultMessage").innerHTML = "User Registered successfully"
                        document.getElementById("resultMessage").style.color = "blue"
                        document.getElementById('loginLink').href = "login.html";
                    } else {
                        document.getElementById("resultMessage").innerHTML = "Some error occurred.Please try again"
                        document.getElementById("resultMessage").style.color = "red"
                    }

                } else if (res != undefined && res.hasOwnProperty('error')) {
                    document.getElementById("resultMessage").innerHTML = res.error
                    document.getElementById("resultMessage").style.color = "red"
                }
            },
            error: function (request, ajaxOptions, thrownError) {
                console.log(request.responseText)

            }

        });
} //register User ends

function forgotPassword(){
    var inputData = document.getElementById("inputUser")
    var newPassword = document.getElementById("newPassword")
    $.ajax(
        {
            type: "POST",
            url: "/forgotPassword",
            data:JSON.stringify(
                {"user" : inputData.value,
                 "new_password" : newPassword.value
                }),
            dataType: "json",
            contentType: "application/json",
            success: function (res)
            {
                if (res != undefined && res.hasOwnProperty('success')) {
                    document.getElementById("resultMessage").innerHTML = "Password reset successfully.Please login with new password"
                    document.getElementById("resultMessage").style.color = "blue"
                    document.getElementById('loginLink').href = "login.html";
                }else if (res != undefined && res.hasOwnProperty('error')){
                    document.getElementById("resultMessage").innerHTML = res.error
                    document.getElementById("resultMessage").style.color = "red"
                }
            },
            error: function (request,ajaxOptions,thrownError){
                 console.log(request.responseText)
            }
        });
}//forgot password ends
