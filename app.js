var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var app           = express();
var config          = require('./config');
var methodOverride  = require('method-override');
var session         = require('express-session');
var Firebase        = require("firebase");
var fs              = require('fs');

//uncomment if there is a need for sending emails
//var nodemailer      = require('nodemailer');
var http            = require('http').Server(app);

// view engine setup
app.engine('html', require('ejs').renderFile);
app.use('/assets', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Handlers for the application.
 */
app.use(require('./routes'));

/*
 * error handlers
*/

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(error, request, response, next){
    if ( !module.parent ) {
        console.error('[ERROR] %s', getTimeNow());
        console.error(error.stack);
    }
    response.status(500).render('error/5xx.html');
});

app.use(function(request, response, next){
    response.status(404).render('error/404.html');
});

/**
 * The bootstrap of the application.
 */
var server = http.listen(config.server.port, function(){
    var host = server.address().address,
        port = server.address().port;
    console.log('[DEBUG] %s Application is listening at http://%s:%s', getTimeNow(), host, port);
});

function getTimeNow() {
    var currentdate = new Date();
    var datetime    = currentdate.getFullYear() + '/' +
                      (currentdate.getMonth() + 1)  + '/' +
                      currentdate.getDate() + ' ' +
                      currentdate.getHours() + ':' +
                      currentdate.getMinutes() + ':' +
                      currentdate.getSeconds();
    return datetime;
}

module.exports = app;
