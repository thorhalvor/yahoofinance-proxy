var express = require('express');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });
  app.use(express.favicon());
});

app.get('/', function(req, res){
  res.send('<html><head></head><body><h1>test</h1></body></html>');
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});