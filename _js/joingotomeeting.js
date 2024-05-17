function joingotomeeting(){
	var id  = document.getElementById("gotomeeting").value;
	var url = "https://global.gotomeeting.com/join/"

	if (id % 1 === 0 && id.length == 9){
		alert("true");
	}
}
