/**
 * Created by apelbaur on 6/9/2014.
 */

'use strict';

//---require
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./server/myBudget/bl');


//--- express use
var app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/ui')));
// simple logger
app.use(function (req, res, next) {
    console.log('req: %s %s', req.method, req.url);
    next();
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});
app.use('/', router);

//--- start server
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Start node server on port %d', server.address().port);
});


