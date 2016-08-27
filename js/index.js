$(document).ready(function(){
	$.ajax({
		url:'/server.js',
		type:'get',
		// dataType:'json',
		data:{
			name:'Tom',
			sex:'male'
		}
	})
	.done(function(datap){
		var  data= JSON.parse(datap);
		// console.dir(data);
		var html = '';
		data.forEach(function(item,index){
			console.log(item.content);
			html += 
			"<div class='item'><h5>"+item.id+"&nbsp;&nbsp;"+item.name+"</h5><img style='display:inline-block'src='"+item.picUrl+"'><p style='display:inline-block'>"+item.content+"</p></div>";
		});
		$('#movie_imdb').html( html );
	})
	.fail(function(err){
		console.log(err);
	});
});
