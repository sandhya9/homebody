var express = require('express');
var router = express.Router();
var dl = require('../digitallife');

var authenticated = false;

dl.authenticate().then(function(result){
   authenticated = (result.status == 0);
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/light/:action', function(req,res){

  var action  = req.param('action');
  var light = 'PE00000005';

  dl.lightSwith(light, action).then(function(result){

    console.log(result);

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

router.get('/setactive/:active', function(req,res){
  var active = req.param('active') == 'true';
  dl.setActive(active);
  res.send(active);

});


module.exports = router;
