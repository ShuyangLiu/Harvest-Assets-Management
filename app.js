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
var auth            = require("http-auth");
var http            = require('http').Server(app);

//htdigest
// var digest = auth.digest({
//     realm: "Private area",
//     file: __dirname + "/htpasswd" 
// });

// view engine setup
app.engine('html', require('ejs').renderFile);
app.use('/assets', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next) {
//     console.log('[DEBUG] path: '+req.path);
//     console.log('[DEBUG] url: '+req.originalUrl);
//     if ('/reports' === req.path) {
//         console.log('[DEBUG] auth needed page');
//         (auth.connect(digest))(req, res, next);
//     }
//     else{
//         if(req.originalUrl=='/reports/*'){
//             console.log('[DEBUG] auth needed page');
//             (auth.connect(digest))(req, res, next);
//         }
//         else{
//             if(req.originalUrl=='/reports/*/*'){
//                 console.log('[DEBUG] auth needed page');
//                 (auth.connect(digest))(req, res, next);
//             }
//             else{
//                 console.log('[DEBUG] NOT an auth needed page');
//                 next();
//             }
//         }
//     }
// });

//setting up session
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'ThisIsASessionSecretttt'
}));

/**
 * Handlers for the application.
 */
app.use(require('./routes'));

/*
 * error handlers
*/

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
