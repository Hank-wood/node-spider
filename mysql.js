var mysql = require('mysql');
var http  = require('http');
var cheerio = require('cheerio');

var con = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'xubiao',
	database:'node_movie'

});

con.connect(function(err){
	if(err){
		console.error('error connecting:'+err.stack);
		return;
	}
	// console.log( 'connected as id'+con.threadId );
});

/*con.query('select * from movie_cn',function(err,results){
	//console.log(results);
	results.forEach(function(item,index){
		console.log(item.id);
		console.log(item.name);
		console.log(item.actor);
		console.log(item.content);
		console.log('\n');
	});
});
con.end();*/

var url = 'http://www.imdb.com/movies-in-theaters/?ref_=nv_mv_inth_1';
http.get(url,function(res){
	var html = '';
	res.on('data',function(data){
		html += data;
	});
	res.on('end',function(){
		getData(html);
	});
});

function getData(html){
	// var dataMovies = [];
	var $ = cheerio.load(html);
	var item = $('div.list_item');
	item.each(function(index){
		var dataHtml = $(this).find('table tr').first();
		var pic = dataHtml.find('td').first();
		var picUrl = pic.find('img').attr('src');
		var other = dataHtml.find('td').last();
		var name = other.find('h4 a').first().html();
		var content = other.find('div.outline').first().html();
		var directorM = other.find('div.txt-block').first();
		var director = directorM.find('a').first().html();
		var stars  = '';
		other.find("span[itemprop='actors'] a").each(function(index,item){
			var mid = $(this).html();
			var length = other.find("span[itemprop='actors'] a").length;
			if(index != (length-1) )
				mid += ', ';
			stars += mid;
		});
		//var dataMovie = {
		//	'picUrl':picUrl,
		//	'name':name,
		//	'content':content,
		//	'director':director,
		//	'stars':stars,
		//};
		var sql = "insert  into movie_imdb (picUrl,name,content,director,stars) values ('"+
		picUrl+"','"+name+"','"+content+"','"+director+"','"+stars+"')";

		con.query(sql,function(err,results){
			if (err) 
				{console.log("insert mysql error:"+err.stack);}
			else
			{
				console.log(results);
			}
		});
	});
	// close database
	con.end();
}























