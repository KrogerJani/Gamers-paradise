var express = require('express')
var app = express()
var path = require('path')

var cors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
};

const bodyparser = require('body-parser')

app.use(cors);
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/routing');

app.use(routes);

module.exports = app