var express = require('express');
var request = require('request');
var yahooProxy = require('./yahooProxy.js')();
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);

  app.use(express.favicon());
});

app.get('/', function(req, res){
  res.send(	'<html><head></head>	<body>		<header><h1>Yahoo-proxy How-To</h1></header>		<section><p><a target="_blank" href="/quotes?tickers=Algeta.OL,YOHOO">Get quotes for Algeta and Yahoo</a></p></section>		<section><p><a target="_blank" href="/tickers?search=Alget">Search for ticker starting with Alget</a></p></section>	</body>	</html>')
});

console.log("proxy", yahooProxy);

app.get('/quotes', function(req, res){
	var tickers = req.query.tickers;	

	yahooProxy.getQuotes(tickers, function(error,data)
    	{
    	   	sendAsCORSSafeJSON(res,data);
    	}   
    );   
});
app.get('/tickers', function(req, res){
		var search = req.query.search;	
		yahooProxy.searchTickers(search, function(error,data)
	    	{
	    	   	sendAsCORSSafeJSON(res,data);
	    	}   
	    );   
  });   


function sendAsCORSSafeJSON(res,data)
{
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(data);

}



app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});