$(document).ready(function () {

  let usernameText = $('#account-username-text');
  let usernameInput = $('#account-username-input');
  let nameText = $('#account-name-text');
  let nameInput = $('#account-name-input');
  let passwordHeader = $('#account-password-h');
  let passwordInput = $('#account-password-input');
  let verPassHeader = $('#account-verPass-h');
  let verPassInput = $('#account-verPass-input')

  let editButton = $('#edit-button');

  editButton.click(function () {
    if (usernameText.show() && nameText.show()) {
      usernameText.hide();
      usernameInput.show();
      nameText.hide();
      nameInput.show();

      passwordHeader.show();
      passwordInput.show();
      verPassHeader.show();
      verPassInput.show();
    } else {
      usernameText.show();
      usernameInput.hide();
      nameText.show();
      nameInput.hide();

      passwordHeader.hide();
      passwordInput.hide();
      verPassHeader.hide();
      verPassInput.hide();
    }
  });

});
