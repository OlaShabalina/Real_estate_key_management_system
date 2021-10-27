require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// routers

const homeRouter = require('./routes/homepage');
const errorRouter = require('./routes/errorPage')

// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

// VIEW ENGINE
app.set('view engine', 'ejs');

//Set our static folder(CSS)
app.use(express.static('public'));


//displaying pages using routers

app.use('/', homeRouter);
app.use('*', errorRouter);


app.listen(PORT, () => {
  console.log(`server is lisning on PORT: ${PORT}`);
});
