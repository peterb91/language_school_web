// Javascript handler for confirm password validation 
var password = document.getElementById('password');
var confirm_password = document.getElementById('confirm_password');

function validatePassword(){
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

// jQuery handler for enabling/disabling of password edit in student panel
$('#password_edit').click(function() {
    $("#password").prop("disabled", !$("#password").prop("disabled"));
    $("#confirm_password").prop("disabled", !$("#confirm_password").prop("disabled"));
  });