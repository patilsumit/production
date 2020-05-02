let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let cors = require('cors');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Origin,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//DB Config
const DB = require('./config/db_connection').MongoURI;

//Connect To Mongo
mongoose.connect(DB, {useNewUrlParser: true})
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



var todoRouter = require('./routes/todos.route');
var userRouter = require('./routes/users.route');

app.use('/api', todoRouter.router);
app.use('/api', userRouter.router);




module.exports = app;
