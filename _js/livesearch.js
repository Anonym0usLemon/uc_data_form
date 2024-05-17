var xmlHttp

function showResult(str)
{
	if (str.length==0)
	{ 
		document.getElementById("livesearch").
		innerHTML="";
		document.getElementById("livesearch").
		style.display="none";//style.border="0px";
		return
	}

	xmlHttp=GetXmlHttpObject()

	if (xmlHttp==null)
	{
		alert ("Browser does not support HTTP Request")
		return
	}
	
	if (str.length <= 2)
	{
		document.getElementById("livesearch").
		innerHTML="";
		document.getElementById("livesearch").
		style.display="none";//style.border="0px";
		return
	}
	
	if (str.length > 2)
	{ 
	var url="/My_Account/?f=order_status&a=live_search"
	url=url+"&r="+str
	url=url+"&sid="+Math.random()
	document.getElementById("livesearch").innerHTML = 'searching...'
		document.getElementById("livesearch").
		style.display="inline";//style.border="1px solid #A5ACB2";
	xmlHttp.onreadystatechange=stateChanged 
	xmlHttp.open("GET",url,true)
	xmlHttp.send(null)
	}
} 

function stateChanged() 
{ 
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{ 
		document.getElementById("livesearch").
		innerHTML=xmlHttp.responseText;
		document.getElementById("livesearch").
		style.display="inline";//style.border="1px solid #A5ACB2";
	} 
}

function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
 		catch (e)
		{
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}