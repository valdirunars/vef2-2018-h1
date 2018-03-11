const IDX = {
  IS_VALID_ERROR: 0,
  FIELD: 1,
  ERROR_MESSAGE: 2
}

function isValidError(tuple) {
  return tuple[IDX.IS_VALID_ERROR];
}

exports.createError = (messageObj, code) => {
  return {
    error: messageObj,
    code,
  };
};

exports.validateID = (id) => {
  Number.isNaN(parseInt(id, 10)) === false;
};

exports.validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

exports.validateBook = (book) => {
  const { title, isbn13, author, description, categoryKey } = book;

  const errors = [];
  const isTitleValid = (typeof title === "string") && title.length > 0;
  const isAuthorValid = (typeof author === "string") && author.length > 0;
  const isDescriptionValid = (typeof description === "string") && description.length > 0;
  const isIsbnValid = isbn13.length === 13 && /^\d+$/.test(isbn13);
  const isCategoryKeyValid = /^\d+$/.test(categoryKey);

  return [
    [!isTitleValid, 'title', 'Field "title" must be a non-empty string'],
    [!isAuthorValid, 'author', 'Field "author" must be a non-empty string'],
    [!isDescriptionValid, 'description', 'Field "description" must be a non-empty string'],
    [!isIsbnValid, 'isbn13', 'Field "isbn13" must be a string of 13 numbers'],
    [!isCategoryKeyValid, 'categoryKey', 'Field "categoryKey" must be a number'],
  ].filter(isValidError).map(error => {
    return {
      field: error[IDX.FIELD],
      message: error[IDX.ERROR_MESSAGE],
    }
  });
};

exports.validateUsername = (username) => {
  const containsWhitespace = /\s/.test(username);
  return (typeof username === "string") && username.length >= 3 && !containsWhitespace;
}

exports.validateUser = (user) => {
  const { username, passwordhash, name, image } = user;

  const isUsernameValid = this.validateUsername(username);
  const isPasswordhashValid = (typeof passwordhash === "string") && passwordhash.length > 0;
  const isNameValid = (typeof name === "string") && name.length > 0;
  const isImageValid = (typeof image === "string") && image.length > 0;

  const possibleErrors = [
    [!isUsernameValid, 'username', 'Field "username" must be a non-empty string'],
    [!isPasswordhashValid, 'passwordhash', 'Field "passwordhash" must be a non-empty string'],
    [!isNameValid, 'name', 'Field "name" must be a non-empty string'],
    [!isImageValid, 'image', 'Field "image" must be a string of 13 numbers'],
  ]
  console.log("IDX: " + IDX.IS_VALID_ERROR);
  return possibleErrors.filter(isValidError).map(error => {
    return {
      field: error[IDX.FIELD],
      message: error[IDX.ERROR_MESSAGE],
    }
  });
};
