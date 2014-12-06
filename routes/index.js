var express = require('express');
var router = express.Router();
var dl = require('../digitallife');
var moment = require('moment');
var accounting = require('accounting');

var authenticated = false;

var inactive = 1.0;

dl.authenticate().then(function(result){
   authenticated = (result.status == 0);
  dl.lightSwith('PE00000005', 'on');
});

/* GET home page. */
/*router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});*/

router.get('/light/:action', function(req,res){

  var action  = req.param('action');
  var light = 'PE00000005';

  dl.lightSwith(light, action).then(function(result){

    if(result.status == 0) {
      res.send('Turned the light ' + action);
    } else {
      res.send('Request failed');
    }

  });
});

router.get('/active', function(req,res){
  res.send(dl.isActive());
})

router.get('/reset', function(req,res){
  inactive = 1.0;
  res.send('OK');
});

router.get('/setactive/:active', function(req,res){
  var active = req.param('active') == 'true';
  dl.setActive(active);
  res.send(active);

});

router.get('/garage/:action', function(req,res){

  var action  = req.param('action');
  var door = 'GC0500A028';

  dl.garageDoor(door, action).then(function(result){

    if(result.status == 0) {
      res.send('Garage Door is ' + action);
    } else {
      res.send('Request failed');
    }
  });
});

router.get('/inactive', function(req,res){

  inactive += .1;


  if(inactive > 3.0) {
    dl.lightSwith('PE00000005','off');
  }

 res.send( accounting.toFixed(inactive, 1) );

});


module.exports = router;
