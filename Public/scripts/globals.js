// Globals

let auth = {
  // Auth token for requests 'Authorization: Bearer ${token}'
  token: null,

  // A mutable value containing the information about the logged in user
  user: null,
};

let pageConfig = {
  // A mutable value, contains the state of paging
  offset: 8,

  // static constants
  initialOffset: 0,
  initialLimit: 8,
};

pageConfig.limit = function() {
  return this.offset === 0 ? 8 : 9
}

let setToken;
let updateProfileImage;
let updateName;
