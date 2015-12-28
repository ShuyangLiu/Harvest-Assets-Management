var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home',function(req, res) {
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    res.render('misc/home.html',
    {'files' : files});
  });
  
});

router.get('/about',function(req, res){
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    res.render('about.html',
    {'files' : files});
  });
});

router.get('/contacts',function(req, res){
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    res.render('contacts.html',
    {'files' : files});
  });
});

router.get('/reports',function(req, res){
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    var folders = [];
    for (var i = 0; i < files.length; i++)
    {
      var folder = fs.readdirSync('./Files/'+files[i]);
      folders.push(folder);
    }

    res.render('reports.html',
    {'files' : files,
      'folders': folders});
  });
});

router.get('/reports/*',function(req,res){
  var filename = './Files/'+req.params[0];
  fs.readFile(filename, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
});

router.get('/invest',function(req, res){
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    res.render('invest.html',
    {'files' : files});
  });
});

//Only for testing purpose, will be deleted later
router.get('/test',function(req, res){
  res.render('test.html');
});


module.exports = router;
