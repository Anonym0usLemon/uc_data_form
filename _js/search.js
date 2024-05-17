// Code retrieved from: http://dotnetslackers.com/articles/aspnet/Implementing-Search-in-ASP-NET-with-Google-Custom-Search.aspx
// Function retrieved from: http://cass-hacks.com/articles/code/js_url_encode_decode/
function URLEncode (clearString) {
	var output = '';
	var x = 0;
	clearString = clearString.toString();
	var regex = /(^[a-zA-Z0-9_.]*)/;
	while (x < clearString.length) {
		var match = regex.exec(clearString.substr(x));
		if (match != null && match.length > 1 && match[1] != '') {
			output += match[1];
			x += match[1].length;
		} else {
			if (clearString[x] == ' ')
				output += '+';
			else {
				var charCode = clearString.charCodeAt(x);
				var hexVal = charCode.toString(16);
				output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
			}
			x++;
		}
	}
	return output;
}
function URLDecode(encodedString) {
	var output = encodedString;
	var binVal, thisString;
	var myregexp = /(%[^%]{2})/;
	while ((match = myregexp.exec(output)) != null
             && match.length > 1
             && match[1] != '') {
		binVal = parseInt(match[1].substr(1), 16);
		thisString = String.fromCharCode(binVal);
		output = output.replace(match[1], thisString);
	}
	return output;
}

// Retrieved from: http://www.htmlcodetutorial.com/forms/index_famsupp_157.html
function SubmitOnEnter(myfield, e)
{
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	else
		return true;
	if (keycode == 13) {
		SearchSite();
		return false;
	}
	else
		return true;
}
function SearchSite() {
	if (document.getElementById('q').value == 'Search ACI') {
		document.getElementById('q').value = '';
	}
	document.location.href = 'http://www.acilab.com/search.aspx?cx=008287387496917738860%3Acpv2cd1czts&cof=FORID%3A9&ie=UTF-8&q=' + URLEncode(document.getElementById('q').value) + '&sa=Search';
}