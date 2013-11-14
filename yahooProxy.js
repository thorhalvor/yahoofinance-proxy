var request = require('request');

function YahooProxy(){	
};
	
YahooProxy.prototype.getQuotes = function(tickers, callback){

var env  = "store://datatables.org/alltableswithkeys"

var query = "select * from yahoo.finance.quotes where symbol=\""+tickers+"\"";
	var url = "http://query.yahooapis.com/v1/public/yql?format=json&env="+env+"&q="+query+"&callback=";
	loadData(url, function(error,data)
		{
			data = JSON.parse(data);		    			
			var quotes = [];
			quotes.push(data.query.results.quote);
		   	callback(error, {quotes:quotes});
		}   
	);   

};

YahooProxy.prototype.searchTickers = function(searchquery,callback){
	
		var cb="YAHOO.Finance.SymbolSuggest.ssCallback";
	  	var url = "http://d.yimg.com/autoc.finance.yahoo.com/autoc?query="+searchquery+"&callback="+cb;
	    
	    loadData(url, function(error,data)
	    	{
	    		if(error) callback(error,data);

			    var jsonpData = data;
		        var startPos = jsonpData.indexOf('({');
		        var endPos = jsonpData.indexOf('})');
		        var jsonString = jsonpData.substring(startPos+1, endPos+1);
		        
		        var json = JSON.parse(jsonString);		    
		        var tickers = json.ResultSet.Result;

				console.log("-------------")
		        console.log("-------------")
		        console.log(tickers);

		        callback(error, {"tickers":tickers});	    	   	

	    	 }   
	    );  
};

var loadData = function(url,callback)
{
	console.info('Requesting '+url);
	request(url, function (err, res, body){				 

			 if(!err && res.statusCode === 200){			 				 	
			 	callback(null, body);
			 }
			 else{
			 	console.log("ERROR");
			 	callback(err, JSON.stringify({Error: 'Error ' + res.statusCode + ' accessing ' + url}));
			 } 
    	});
}


module.exports = function(){
	 return new YahooProxy(arguments);
};