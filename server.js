var http = require('http');
var fs   = require('fs');
var url  = require('url');
var querystring = require('querystring');
var mysql = require('mysql');
var util = require('util');

http.createServer(function(request,response){
//	response.writeHead(200,{'Content-Type':'text/plain'});
//	response.write( util.inspect(request) );
//	response.end();
	var url = request.url.trim();
	var dataReturn = "";
	
	if(url !='/favicon.ico')
		console.log("current url : "+url);	
	if(url == '/')
	{
		response.writeHead(200,{'Content-Type':'text/html'});
		dataReturn = getHtml('index');
	}
	else if( url == "/css/index.css" )
	{
		response.writeHead(200,{'Content-Type':'text/css'});
		dataReturn = getCss('index');
	}
	else if( url == "/js/index.js" )
	{
		response.writeHead(200,{'Content-Type':'application/x-javascript'});
		dataReturn = getJs('index');
	}
	else
	{
		dataReturn = "everyting will change";
	}
	// response.writeHead(200,{'Content-Type':'text/plain'});
	// response.writeHead(200,{'Content-Type':'text/html'});
	response.write( dataReturn );
	response.end();

})
.listen(8080,function(err){
	console.log("The server is on ...");
});

/*function showHtml(page)
{//async wrong

	var html = "";
	var readStream = fs.createReadStream("index.html");
	readStream.setEncoding('UTF-8');
	readStream.on('data',function(data){
		html += data;
	});
	readStream.on('end',function(){
		// console.log(html);
	});
	readStream.on('error',function(err){
		util.inspect( err );
	});
}*/
function getHtml(page){
	//sync
	var uri = "./html/"+page+".html";
	var html = fs.readFileSync(uri);
	return html;
}

function getCss(page){
	//sync
	var uri = "./css/"+page+".css";
	var css = fs.readFileSync(uri);
	// console.log( css.toString() );
	return css;
}

function getJs(page){
	//sync
	var uri = "./js/"+page+".js";
	var js = fs.readFileSync(uri);
	// console.log( css.toString() );
	return js;
	/*var uri = "./js/"+page+".js";
	fs.readFile(uri,function(err,data){
		return data;
	});*/
}


