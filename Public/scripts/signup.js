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
    $('#login-button-homescreen').toggle();
    $('#sign-up-button-homescreen').toggle();
    if (image) {
      $('#user-image').attr('src', image);
    } else {
      $('#user-image').attr('src', '/images/account.png');
    }

    $('#user-name').html(name);
  }

  function finishSignup(result) {
    console.log('Successful signup: ' + JSON.stringify(result));
    $('#sign-up-modal').modal('toggle');
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
    const usernameVal = usernameSignUp.val();
    const passwordVal = passwordSignUp.val();
    let nameVal = name.val();
    if (!nameVal) { nameVal = null; }

    const verPassVal = verPass.val();

    let shouldSignup = true;
    if (typeof usernameVal === 'undefined' || usernameVal === '') {
      shouldSignup = false
      errorMessageUsername.show();
    } else {
      errorMessageUsername.hide();
    }

    if (usernameVal.length > 0 && usernameVal.length < 3) {
      errorMessageUsernameLength.show();
      shouldSignup = false;
    } else {
      errorMessageUsernameLength.hide();
    }

    if (typeof passwordVal === 'undefined' || passwordVal === '') {
      errorMessagePassword.show();
      shouldSignup = false
    } else {
      errorMessagePassword.hide();
    }

    if (passwordVal.length < 5) {
      errorMessagePasswordLength.show();
      shouldSignup = false;
    } else {
      errorMessagePasswordLength.hide();
    }

    if (passwordVal !== verPassVal) {
      errorMessagePasswordNotMatch.show();
      shouldSignup = false;
    } else {
      errorMessagePasswordNotMatch.hide();
    }

    if (shouldSignup) {
      $.ajax({
        url : "/register",// your username checker url
        type : "POST",
        data : {
          'username': usernameVal,
          'name': nameVal,
          'password': passwordVal,
        },
        success : finishSignup,
        error: function (err) {
          console.log("Error: " + err);
        }
      });
    }
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
