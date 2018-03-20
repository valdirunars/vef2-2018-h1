// Globals

let auth = {
  token: null,
  user: null,
};

let token;

// signup.js

$(document).ready(function () {

  let LoginNowButton = $('#login-button-homescreen');
  let signUpNowButton = $('#sign-up-button-homescreen');
  let verPass = $('#verPassword');
  let passwordLogin = $('#password-login');
  let passwordSignUp = $('#password-sign-up');
  let name = $('#name');
  let usernameLogin = $('#username-login');
  let usernameSignUp = $('#username-sign-up')
  let loginButton = $('#login-button');
  let signUpButton = $('#sign-up-button')

  let errorMessageUsername = $('.username-is-required');
  let errorMessageUsernameLength = $('#username-length');
  let errorMessagePassword = $('.password-is-required');
  let errorMessagePasswordLength = $('#password-length');
  let errorMessageFullName = $('#full-name-required');
  let errorMessageverifyPass = $('#confirm-password-alert');
  let errorMessagePasswordNotMatch = $('#password-not-match');

  function showUserUI() {
    const user = auth.user;
    const image = user.image;
    const name = user.name;

    $('#login-modal').modal('toggle');
    $('#user').toggle();
    $('#auth-button-container').toggle();
    if (image) {
      $('#user-image').attr('src', image);
    } else {
      $('#user-image').attr('src', '/images/account.png');
    }

    $('#user-name').html(name);
  }

  function setToken(tok) {
    $.ajax({
            url: '/users/me',
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${tok}`,
            },
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
              auth.token = tok;
              auth.user = result;
              showUserUI();
            },
            error: function (error) {
              if (error) {
                console.log(error);
              }
            }
        });
  }

  function toggleShowOn(e, onCondition) {
    if (onCondition) {
      e.show();
    } else {
      e.hide();
    }
  }

  function showError(e, errorMessage) {
    if (e.val() === '') {
      errorMessage.show();
    } else {
      errorMessage.hide();
    }
  }

  signUpNowButton.click(function () {
    console.log("signUpNowButton");
    usernameSignUp.val('');
    passwordSignUp.val('');
    name.val('');
    verPass.val('');

    errorMessageUsername.hide();
    errorMessagePassword.hide();
    errorMessageFullName.hide();
    errorMessageverifyPass.hide();
  });

  LoginNowButton.click(function () {
    usernameLogin.val('');
    passwordLogin.val('');

    errorMessageUsername.hide();
    errorMessagePassword.hide();
  });

  loginButton.click(function () {
    let shouldLogin = true;
    if (usernameLogin.val() === '') {
      errorMessageUsername.show();
      shouldLogin = false;
    } else { errorMessageUsername.hide(); }

    if (passwordLogin.val() === '') {
      errorMessagePassword.show();
      shouldLogin = false;
    } else { errorMessagePassword.hide(); }

    if (shouldLogin) { login(); }
  });

  signUpButton.click(function () {

    showError(usernameSignUp, errorMessageUsername);
    showError(passwordSignUp, errorMessagePassword);
    showError(name, errorMessageFullName);
    showError(verPass, errorMessageverifyPass);

    // TODO: finna út afhverju errorMessageUsernameLength byrtist ekki
    toggleShowOn(errorMessageUsernameLength, usernameSignUp.val().length > 0 && usernameSignUp.val().length <= 2);
    if (passwordSignUp.val() !== verPass.val()) {
      errorMessagePasswordNotMatch.show();
      if (errorMessageverifyPass.show()) {
        errorMessageverifyPass.hide();
      } else {
        errorMessageverifyPass.show();
      }
    } else {
      errorMessagePasswordNotMatch.hide();
    }

    //toggleShowOn(errorMessagePasswordNotMatch, passwordSignUp.val() !== verPass.val());
    toggleShowOn(errorMessagePasswordLength, passwordSignUp.val().length > 0 && passwordSignUp.val().length <= 5);

    /*username.val('');
    password.val('');
    name.val('');
    verPass.val('');*/

    // username already exists
    // $.get('/users/${username}', null, function (data, status){}, "json")
  });

  function login() {
    $.ajax({
      url : "/login",// your username checker url
      type : "POST",
      data : {
        "username": usernameLogin.val(),
        "password": passwordLogin.val(),
      },
      success : function (data) {
        setToken(data.token);
      },
      error: function (err) {
        console.log("Error: " + err);
      }
    });
  }

});
