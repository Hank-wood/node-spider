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
			response.writeHead(200,{'Content-Type':'text/html','Cache-Control':'no-cache'});
			break;
		case 'css':
			response.writeHead(200,{'Content-Type':'text/css','Cache-Control':'no-cache'});
			break;
		case 'js':
			response.writeHead(200,{'Content-Type':'application/x-javascript','Cache-Control':'no-cache'});
			break;
		case 'audio':
			response.writeHead(200,{
				'Content-Type':'audio/mp3',
				'Connection':'keep-alive',
				// 'Cache-Control':'no-store'
			});
			break;
	}

	//Ajax Request
	if( url.indexOf('server.js') > -1)
	{
		handleAjax(request,response);
		return;
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

function handleAjax(request,response){
	var movieDatas = [];
	var con = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'xubiao',
		database:'node_movie'
	});

	con.connect(function(err){
		if(err){
			console.error('error connecting:'+err.stack);
			return "database fail";
		}
	});
	con.query('select * from movie_imdb',function(err,results){
		var movieData = {};
		results.forEach(function(item,index){
			movieData = {
				'id':item.id,
				'picUrl':item.picUrl,
				'name':item.name,
				'content':item.content,
				'director':item.director,
				'stars':item.stars
			};
			movieDatas.push( movieData );
		});

		response.writeHead(200,{'Content-Type':'text/plain'});
		// response.write( movieDatas );
		response.write( JSON.stringify(movieDatas) );
		response.end();
	});
	con.end();
}
