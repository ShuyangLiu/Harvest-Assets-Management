var express = require('express');
var session = require('express-session');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/agreement', function(req, res){
  var sess = req.session;
  if(!sess.agreement){
     res.render('agreement.html');
  }
  else{
    res.redirect('/home');
  }
});

router.post('/agree.action', function(req, res){
  var sess = req.session;
  sess.agreement = true;
  var result = true;
  res.json(result);
});

router.get('/home',function(req, res) {
  var sess = req.session;
  if(sess.agreement){
      fs.readdir('./Files', function(err, files){
      if (err) {
        throw err;
      }
      res.render('misc/home.html',
      {'files' : files});
    });
  }
  else{
    res.redirect('/agreement');
  }
});

router.get('/about',function(req, res){
  var sess = req.session;
  if(sess.agreement){
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    res.render('about.html',
    {'files' : files});
  });
}
else{
  res.redirect('/agreement');
}
});


router.get('/contacts',function(req, res){
  var sess = req.session;
  if(sess.agreement){
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    res.render('contacts.html',
    {'files' : files});
  });
}
  else{
    res.redirect('/agreement');
  }
});

router.get('/reports', function(req, res){
  var sess = req.session;
  if(sess.agreement){
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
  }
  else{
    res.redirect('/agreement');
  }
});

router.get('/reports/*/*', function(req, res){
  var sess = req.session;
  if(sess.agreement){
  //render the report page for a specific year
  var year = req.params[0];
  var file = req.params[1];
  
  var filename = './Files/'+year+ '/' +file;
  fs.readFile(filename, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
  
  }
  else{
    res.redirect('/agreement');
  }
  
});

router.get('/reports/*',function(req,res){
  var sess = req.session;
  if(sess.agreement){
  var year = req.params[0];
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    //files in the specific folder
    var file = fs.readdirSync('./Files/'+year);
    res.render('year.html',
    {'files' : files,
      'year' : year,
      'file': file});
  });
  }
  else{
    res.redirect('/agreement');
  }
});

router.get('/invest',function(req, res){
  var sess = req.session;
  if(sess.agreement){
  fs.readdir('./Files', function(err, files){
    if (err) {
      throw err;
    }
    res.render('invest.html',
    {'files' : files});
  });
  }
  else{
    res.redirect('/agreement');
  }
});

//Only for testing purpose, will be deleted later
router.get('/test',function(req, res){
  res.render('test.html');
});


module.exports = router;
