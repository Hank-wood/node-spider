var http = require('http');
var fs   = require('fs');
var url  = require('url');
var querystring = require('querystring');
var mysql = require('mysql');
var util = require('util');

http.createServer(function(request,response){
	var url = request.url.trim();
	var dataReturn = "";
	
	if(url =='/favicon.ico')
		return;
	console.log("current url : "+url);	

	var type = url.split( '/' )[1];
	switch(type)
	{
		case '' || 'html':
			response.writeHead(200,{'Content-Type':'text/html'});
			break;
		case 'css':
			response.writeHead(200,{'Content-Type':'text/css'});
			break;
		case 'js':
			response.writeHead(200,{'Content-Type':'application/x-javascript'});
			break;
		case 'audio':
			response.writeHead(200,{
				'Content-Type':'audio/mp3',
				'Connection':'keep-alive',
				// 'Cache-Control':'no-store'
			});
			break;
	}

	if( url == '/' )
		url = '/html/index.html'; // default index
	var rootRoad = '/home/xubiao/node-spider/node-spider';
	var URI = rootRoad + url;
	fs.readFile( URI , function(err,data){
		if( err )
		{
			for404( response );
			return;
		}
		response.write( data );
		response.end();
	});
})
.listen(8080,function(err){
	console.log("The server is on ...");
});

function for404( response )
{
	/*var errorData = fs.readFileSync("./html/404.html");
	response.writeHead(200,{'Content-Type':'text/html'});
	response.write( errorData );
	response.end();
	console.log('current url : 404 ');*/

	// redirect url
	response.writeHead(302, {
	  'Location': '/html/404.html',
	});
	response.end();
}

