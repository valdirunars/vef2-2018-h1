$(document).ready(function () {
  var files;
  $('input[type=file]').on('change', prepareUpload);
  function prepareUpload(event){
    files = event.target.files;
  }
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
  let profPicInput = $('upload-avatar');

  const passwordLengthError = $('#passwordLengthError');
  const passwordsDontMatch = $('#passwordsDontMatch');

  let editButton = $('#edit-button');

  editButton.click(function () {
    var $this = $(this);
    $('#save-changes').toggle();
    if ($this.text() === 'Edit') {
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

      $this.text('Cancel');
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

      $this.text('Edit');
    }
  });

  $('#save-changes').click(function () {
    const newName = nameInput.val();
    const passwordVal = passwordInput.val();
    const verPassVal = verPassInput.val();

    let updateObj = {};
    if (newName.length > 0 && newName !== auth.user.name) {
      updateObj.name = newName
    }

    if (passwordVal.length > 0 || verPassVal.length > 0) {
      if (passwordVal.length < 5) {
        passwordLengthError.show();
        return
      } else {
        passwordLengthError.hide();
      }

      if (passwordVal !== verPassVal) {
        passwordsDontMatch.show();
        return
      } else {
        passwordsDontMatch.hide();
        if (passwordVal && passwordVal.length > 0) {
          updateObj.password = passwordVal
        }
      }
    }

    if ($('input[type=file]')[0].files[0]) {
      let fd = new FormData();
      fd.append('avatar', $('input[type=file]')[0].files[0]);

      $.ajax({
        url: '/users/me/profile',
        type: 'POST',
        data: fd,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', `Bearer ${auth.token}`);
        },
        success:function(data){
          console.log(JSON.stringify(data));
          updateProfileImage();
        },
        cache: false,
        contentType: false,
        processData: false
      });
    }

    if (updateObj.name || updateObj.password) {
      $.ajax({
        url: '/users/me',
        type: 'PATCH',
        data: JSON.stringify(updateObj),
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', `Bearer ${auth.token}`);
        },

        success: function (data) {
          updateName(newName)
        },
        cache: false,
        contentType: 'application/json',
        processData: false
      });
    }

    $('#AboutModal').modal('toggle');
  });

});
