$(document).ready(function () {

  let usernameText = $('#account-username-text');
  let usernameInput = $('#account-username-input');
  let nameText = $('#account-name-text');
  let nameInput = $('#account-name-input');

  let editButton = $('#edit-button');

  editButton.click(function () {
    if (usernameText.show() && nameText.show()) {
      usernameText.hide();
      usernameInput.show();
      nameText.hide();
      nameInput.show();
    } else {
      usernameText.show();
      usernameInput.hide();
      nameText.show();
      nameInput.hide();
    }
  });

});
