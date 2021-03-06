const db = require('./database');
const validator = require('./validator');
const bc = require('bcrypt');

async function create(user) {
  const errorMessage = validator.validateUser(user);
  if (errorMessage.length > 0) {
    return validator.createError(errorMessage, 400);
  }

  let img = null;
  if (user.image) {
    img = user.image
  }

  const { username, passwordhash, name } = user;

  const query = 'INSERT INTO Users(username, passwordhash, name, image) VALUES($1, $2, $3, $4) returning username;';
  const params = [
    username,
    passwordhash,
    name,
    img,
  ];

  try {
    const result = await db.query(query, params);
    return result[0].username;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function preparePotentialUser(httpBody) {
  const saltRounds = 10;
  const hash = await bc.hash(httpBody.password, saltRounds);

  const idLessUser = {
    username: httpBody.username,
    passwordhash: hash,
    name: httpBody.name,
    image: httpBody.image,
  }

  return idLessUser;
}

async function authenticate(user, password) {
  console.log("Authenticating... " + JSON.stringify(user));
  return await bc.compare(password, user.passwordhash);
}

async function readAll() {
  const query = 'SELECT * FROM Users;';
  const params = [];
  try {
    const result = await db.query(query, params);
    return result;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function readOne(usernameOrID, trimPrivateVars) {
  let query;
  const params = [usernameOrID];
  if (validator.validateID(usernameOrID)) {
    query = 'SELECT * FROM Users WHERE id=$1;';
  } else if (validator.validateUsername(usernameOrID)) {
    query = 'SELECT * FROM Users WHERE username=$1;';
  } else {
    return validator.createError({ error: 'Invalid username or ID' }, 400);
  }

  const result = await db.query(query, params);
  if (result.length > 0) {
    const rawUser = result[0];
    if (!trimPrivateVars) {
      return rawUser
    } else {
      return {
        id: rawUser.id,
        username: rawUser.username,
        name: rawUser.name,
        image: rawUser.image,
      }
    }
  }
  return validator.createError({ error: 'User not found' }, 404);
}

async function update(id, user, trimPrivateVars) {
  if (!validator.validateID(id)) {
    return validator.createError({ error: 'Invalid id' }, 400);
  }

  const { name, passwordhash, image } = user;

  const query = 'UPDATE Users SET passwordhash=$1, name=$2, image=$3 WHERE id=$4 returning id;';
  const params = [passwordhash, name, image, id];

  try {
    const results = await db.query(query, params);
    if (results.length > 0) {
      const user = await this.readOne(results[0].id);
      if (!trimPrivateVars) {
        return user;
      } else {
        return {
          id: user.id,
          username: user.username,
          name: user.name,
          image: user.image,
        }
      }
    }
    return validator.createError({ error: 'User not found' }, 404);
  } catch (error) {
    return validator.createError({ error: error.message }, 400);
  }
}

async function del(id) {
  const query = 'DELETE FROM Users WHERE id=$1';
  const params = [id];
  try {
    await db.query(query, params);
    return 200;
  } catch (err) {
    return 404;
  }
}

async function markAsRead(userID, bookID) {
  if (!validator.validateID(bookID)) {
    return validator.createError({ error: 'Invalid bookID' }, 400);
  }
  if (!validator.validateID(userID)) {
    return validator.createError({ error: 'Invalid userID' }, 400);
  }
  const query = 'INSERT INTO ReadBooks VALUES($1, $2)';
  const params = [userID, bookID];
  try {
    const result = await db.query(query, params);
    return result;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function getAllRead(userID) {
  if (!validator.validateID(userID)) {
    return validator.createError({ error: 'Invalid userID' }, 400);
  }

  const query = 'SELECT * FROM Books JOIN (SELECT * FROM ReadBooks WHERE user_id = $1) read ON id = read.book_id;';
  const params = [userID];
  try {
    const result = await db.query(query, params);
    return result;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function removeRead(userID, bookID) {
  if (!validator.validateID(bookID)) {
    return validator.createError({ error: 'Invalid bookID' }, 400);
  }
  if (!validator.validateID(userID)) {
    return validator.createError({ error: 'Invalid userID' }, 400);
  }
  const query = 'DELETE FROM ReadBooks WHERE user_id = $1 AND book_id = $2;';
  const params = [userID, bookID];
  try {
    const result = await db.query(query, params);
    return result;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

module.exports = {
  create,
  readAll,
  readOne,
  update,
  del,
  preparePotentialUser,
  authenticate,
  getAllRead,
  markAsRead,
  removeRead,
};
