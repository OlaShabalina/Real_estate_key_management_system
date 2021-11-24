require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const path = require('path');

// routers

const homeRouter = require('./routes/home');
const apiRouter = require('./routes/api');
const addKeysRouter = require('./routes/add-keys');
const errorRouter = require('./routes/error-page');
const editRoute = require('./routes/edit');

// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

// VIEW ENGINE
app.set('view engine', 'ejs');

//Set our static folder(CSS)
app.use(express.static('public'));

// Session configuration
app.use(session({
  cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === true,

  },
  name: 'key_app',
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Will be using flash to display success and error messages
const flash = require('express-flash');
app.use(flash());

//displaying pages using routers

app.use('/add-keys', addKeysRouter);
app.use('/api_key_number', apiRouter);
app.use('/edit', editRoute);
app.use('/', homeRouter);
app.use('/*', errorRouter);


app.listen(PORT, () => {
  console.log(`server is lisning on PORT: ${PORT}`);
});
