require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('./backend/database/validator');
const login = require('./backend/login-api');
const users = require('./backend/user-api');
const bookApi = require('./backend/book-api');
const categoryApi = require('./backend/category-api');
const books = require('./backend/database/books');
const auth = require('./backend/auth')();

const app = new express();

app.use(auth.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Share public folder
app.use(express.static('public'));

app.use('/', login);
app.use('/users', users);
app.use('/categories', categoryApi);
app.use('/books', bookApi);

const hostname = '127.0.0.1';
const port = process.env.PORT;

app.get('/', /*auth.authenticate(),*/ async (req, res) => {
  const categories = await books.readAllCategories();
  if (categories.error) {
    return res.json(categories);
  }
  const booksFirstPage = await books.readAll(undefined, 17, 0);
  res.render('index', {
    title: 'Books', //+ JSON.stringify(req.user.username)
    categories,
    books: booksFirstPage,
  });
});

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
