$(document).ready(function () {

  let usernameText = $('#account-username-text');
  let usernameInput = $('#account-username-input');
  let nameText = $('#account-name-text');
  let nameInput = $('#account-name-input');
  let passwordHeader = $('#account-password-h');
  let passwordInput = $('#account-password-input');
  let verPassHeader = $('#account-verPass-h');
  let verPassInput = $('#account-verPass-input')
  let profPicHeader = $('#account-profPic-h');
  let profPicButton = $('.uploadProfilePic-btn-wrapper');

  let editButton = $('#edit-button');

  editButton.click(function () {
    var $this = $(this);
    if (usernameText.show() && nameText.show()) {
      usernameText.hide();
      usernameInput.show();
      nameText.hide();
      nameInput.show();

      passwordHeader.show();
      passwordInput.show();
      verPassHeader.show();
      verPassInput.show();

      profPicHeader.show();
      profPicButton.show();

      $this.text('Save changes');
    } else {
      usernameText.show();
      usernameInput.hide();
      nameText.show();
      nameInput.hide();

      passwordHeader.hide();
      passwordInput.hide();
      verPassHeader.hide();
      verPassInput.hide();

      profPicHeader.hide();
      profPicButton.hide();
      profPicInput.hide();

      $this.text('Edit');
    }
  });

});
