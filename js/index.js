document.getElementById('btn').addEventListener('click',function(e){
	alert("Hello World!");
	
});

var data = $('#p').html();
$('#p').click(function(){
	$(this).html("哈哈，你点击了");
	if( $(this).html()=='哈哈，你点击了' )
		$(this).html(data);
});
