function getElementsByClassName(elem, className)
{
	var hasClassName = new RegExp(className);
	var allElements = elem.getElementsByTagName("*");
	var results = new Array();

	var element;
	for (var i = 0; (element = allElements.item(i)) != null; i++) {
		var elementClass = element.className;
		if (elementClass && elementClass == className)
		
			results.push(element);
	}

	return results;
}

function inArray(arr, str) {
	// checks for each array member in option label, only matches from beginning
	for (var i=0; i < arr.length; i++) {
		if (str.indexOf(arr[i]) == 0) return true;
	}
	return false;
}

var labelRemove = [" All"," (All)", " 5x7 &amp; Lgr", " 8x10 &amp; Lgr", " 11x14 &amp; Lgr", "per page"];

function ShrinkLabel(label)	{
	var k;
	for (i in labelRemove) {
		if ((k = label.indexOf(labelRemove[i])) != -1) return label.substr(0, k);
	}
	return label;
}

var sprayLabels = ["Clear Spray", "Semi-Matte", "Lustre Spray"];
var textureLabels = ["Pebble Texture", "Pebble (All)", "Canvas Texture", "Canvas (All)", "Linen (All)", "Linen Texture"];
var mountLabels = ["Dry Mount", "Gator Foam", "Sintra", "Canvas Only", "Canvas Board", "Canvas to Stretcher", "Canvas to Masonite", "3/4&quot; Standout Mount", "1-1/2&quot; Standout Mount", "Beveled Mount", "Bevel Mount Plus"];

var ht = {};
var master = {};
var spray = {};
var texture = {};
var mount = {};
var masterOrder = new Array();
var items = getElementsByClassName(document, "item");

var item;
for (var i = 0; (item = items[i]) != null; i++) {
	var itemName = getElementsByClassName(item, "item-name")[0].innerHTML;
	var itemQty = parseInt(getElementsByClassName(item, "summary_unit_qty")[0].innerHTML);
	
	if (ht[itemName] == undefined) ht[itemName] = {};
	var htItem = ht[itemName];
	htItem.qty = (htItem.qty || 0) + itemQty;
	
	var options = getElementsByClassName(item, "option");
	for (var j = 0; (option = options[j]) != null; j++) {
		var optCode = getElementsByClassName(option, "code")[0].innerHTML;
		var optName = getElementsByClassName(option, "opt-name")[0].innerHTML;
		if (optCode != "()" || optName == "100# Text per page") {
			var optQty = parseInt(getElementsByClassName(option, "opt-qty")[0].innerHTML);
			ht[itemName][optName] = (ht[itemName][optName] || 0) + optQty;

			if (inArray(sprayLabels, optName)) {
				spray[optName] = 1;
			}
			else if (inArray(textureLabels, optName)) {
				texture[optName] = 1;
			}
			else if (inArray(mountLabels, optName)) {
				mount[optName] = 1;
			}
			else {
				master[optName] = 1;
			}
		}
	}
}

var st = document.getElementById("summary");
var stHTML = "<table cellspacing='0'><tr><th>Qty</th><th>Product</th>";
for (att in spray) {
	var shrunkLabel = ShrinkLabel(att);
	if (shrunkLabel != "") {
		stHTML += "<th>" + shrunkLabel + "</th>";
		masterOrder.push(att);
	}
}
for (att in texture) {
	var shrunkLabel = ShrinkLabel(att);
	if (shrunkLabel != "") {
		stHTML += "<th>" + shrunkLabel + "</th>";
		masterOrder.push(att);
	}
}
for (att in mount) {
	var shrunkLabel = ShrinkLabel(att);
	if (shrunkLabel != "") {
		stHTML += "<th>" + shrunkLabel + "</th>";
		masterOrder.push(att);
	}
}
for (att in master) {
	if (att != "getElementsByClassName") {
		var shrunkLabel = ShrinkLabel(att);
		if (shrunkLabel != "") {
			stHTML += "<th>" + shrunkLabel + "</th>";
			masterOrder.push(att);
		}
	}
}
stHTML += "<th>Emp #</th>";
stHTML += "</tr>";

for (att in ht) {
	if (att != "getElementsByClassName") {
		stHTML += "<tr><td class='unit_qty'>" + ht[att].qty + "</td>";
		stHTML += "<td>" + att + "</td>";
		var opt;
		for (var i = 0; i < masterOrder.length; i++) {
			if ((opt = ht[att][masterOrder[i]]) != null) {
				stHTML += "<td class='unit_qty'>" + ht[att][masterOrder[i]] + "</td>";
			}
			else {
				stHTML += "<td>&nbsp;</td>";
			}
		}
		stHTML += "<td>&nbsp;</td>";  // for Emp #
		stHTML += "</tr>";
	}
}

stHTML += "</table>";
st.innerHTML = stHTML;

if (document.getElementById('ccnum') && document.getElementById('ccnum').innerHTML == "") document.getElementById('ccinfo').style.display = "none";
if (document.getElementById('instructions') && document.getElementById('instructions_text').innerHTML == "") document.getElementById('instructions').style.display = "none";