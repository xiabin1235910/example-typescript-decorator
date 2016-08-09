/**
 * Created by Ben on 8/9/2016.
 */
import {deviceController} from "./controller/deviceController";
import * as winston from "winston";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,jwt");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});

app.use('/api', [
    new deviceController().getRouter()
]);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //var err = new Error('Not Found');
    //err.status = 404;
    let err = {
        statusCode: 404,
        text: 'ERR_404'
    };
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    if (err.text) {
        res.status(err.statusCode);
        res.jsonp({text: err.text});
    } else {
        res.status(500);
        winston.error(err);
        res.jsonp({text: 'ERR_500'});
    }
});

module.exports = app;