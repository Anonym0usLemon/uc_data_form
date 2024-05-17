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

var labelRemove = [" All"," (All)", " 5x7 &amp; Lgr", " 8x10 &amp; Lgr", " 11x14 &amp; Lgr", "per page", "(3 Copies of Same Book)", "(3 Different Books)", "(included)"];

function ShrinkLabel(label)	{
	var k;
	for (var i in labelRemove) {
		if ((k = label.indexOf(labelRemove[i])) != -1) return label.substr(0, k);
	}
	return label;
}

var alwaysInclude = ["80#", "100#", "105#", "UV Coat", "Leather", "Starline", "Velveteen", "Art Cloth", "Photowrap", "Laminate", "Clear Cover", "Frosted Cover", "Sticker", "Protective Seal", "Do not score", "Mounting", "Card Stock", "Metallic", "Texture", "Drymount included.", "Lustre coat included.", "Insert to folders.", "Laminate included.", "Sintra", "Bevel", "Envelopes", "Corners"];
var alwaysExclude = ["Blackw/ Texture"];

function IncludeLabel(label) {
	for (var i in alwaysInclude) {
		if (label.indexOf(alwaysInclude[i]) != -1) return true;
	}
	return false;
}

// Exclusion list added 3-22-2012 NR
function ExcludeLabel(label){
	for (var i in alwaysExclude){
		if (label.indexOf(alwaysExclude[i]) != -1) return true;
	}
	return false;
}

var sprayLabels = ["Clear Spray", "Semi-Matte", "Lustre Spray"];
var textureLabels = ["Pebble Texture", "Pebble (All)", "Canvas Texture", "Canvas (All)", "Linen (All)", "Linen Texture"];
var mountLabels = ["Dry Mount", "Gator Foam", "Sintra", "Canvas Only", "Canvas Board", "Canvas to Stretcher", "Canvas to Masonite", "3/4&quot; Standout Mount", "1-1/2&quot; Standout Mount", "Beveled Mount", "Bevel Mount Plus"];

var doOnce;
var ht = {};
var master = {};
var spray = {};
var texture = {};
var mount = {};
var masterOrder = new Array();
var items = getElementsByClassName(document, "item");

var item;
for (var i = 0; (item = items[i]) != null; i++) {
	var itemName = ShrinkLabel(getElementsByClassName(item, "item-name")[0].innerHTML);
	var itemQty = parseInt(getElementsByClassName(item, "summary_unit_qty")[0].innerHTML);
	
	//Code to add a notification when an order includes misc. or marketing materials - NR 10-16-2012
	if((itemName.substring(0,4) == "Misc") && doOnce != 1){
		OrderServices = document.getElementById("order_services");
		OrdServicesHTML = OrderServices.innerHTML + "<br><font style=\"font-size:larger;\"><b>Miscellaneous items on order.</b></font>";
		OrderServices.innerHTML = OrdServicesHTML;
		
		doOnce = 1;
	}
	
	if (ht[itemName] == undefined) ht[itemName] = {};
	var htItem = ht[itemName];
	htItem.qty = (htItem.qty || 0) + itemQty;
	
	var options = getElementsByClassName(item, "option");
	for (var j = 0; (option = options[j]) != null; j++) {
		var optCode = getElementsByClassName(option, "code")[0].innerHTML;
		var optName = getElementsByClassName(option, "opt-name")[0].innerHTML;
		if (optCode != "()" || (IncludeLabel(optName) && !(ExcludeLabel(optName)))) {
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

//Code to selectively change formatting on specific options - NR 08-27-2012
var gridOptions = ["Artistry Packaging:&nbsp;Boxes - per box", "Artistry Packaging:&nbsp;Folios - per order", "Burn all images to backup CD"];
var highlightOptions = ["Artistry Packaging:&nbsp;Boxes - per box", "Artistry Packaging:&nbsp;Folios - per order", "Burn all images to backup CD", "Color Correct All Images $15.00 per quarter-hour", "Color Correct Images and Burn CD $3.50 for CD + $15.00 per quarter-hour for color correction.", "Check Images for Color Color correct if needed $5.00 to check - standard fee for color correction.", "5x7 Easel Mount / Group Folder", "8x10 Easel Mount / Group Folder","Plain 3x5/7x5", "Plain 5x7/7x5", "Plain 5x7/10x8", "5x7 Prom Folder", "8x10 Prom Folder", "Promo Code", "Punch / Bag Wallets", "Sport 3x5/7x5", "8x10 Sports Mat (Broadway)", "10x13 Sports Mat (Broadway)", "Cover - Rounded Corners", "Cover - Square Corners", "Pages - Rounded Corners", "Pages - Square Corners", "Presentation Pouch"];
var optionLabel;
var orderOption;
var orderOptions = getElementsByClassName(document, "Order_Option");
for (var i = 0; (orderOption = orderOptions[i]) != null; i++) {
	optionLabel = orderOption.innerHTML;
	if (inArray(highlightOptions, optionLabel)) {
		orderOption.innerHTML = "<span style=\"font-size:20.0pt;\"><b>" + optionLabel + "</b></span>";
	}
	if (inArray(gridOptions, optionLabel)){
		stHTML += "<th>" + optionLabel + "</th>";
		masterOrder.push(optionLabel);
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

var fs = 20;
var rn;
if (document.styleSheets[0].rules) { // IE, Chrome
	rn = document.styleSheets[0].rules.length;
	document.styleSheets[0].addRule("#summary table", "font-size: " + fs + "px !important");
	var stwidth = document.getElementById("summary").children[0].offsetWidth;
	while (stwidth > 660 && fs >= 12) {
		fs = fs - 2;
		document.styleSheets[0].removeRule(rn);
		document.styleSheets[0].addRule("#summary table", "font-size: " + fs + "px !important");
		stwidth = document.getElementById("summary").children[0].offsetWidth;
	}
}
else if (document.styleSheets[0].cssRules) { // Firefox
	rn = document.styleSheets[0].cssRules.length;
	document.styleSheets[0].insertRule("#summary table {font-size: " + fs + "px !important;}", rn);
	var stwidth = document.getElementById("summary").children[0].offsetWidth;
	while (stwidth > 660 && fs >= 12) {
		fs = fs - 2;
		document.styleSheets[0].deleteRule(rn);
		document.styleSheets[0].insertRule("#summary table {font-size: " + fs + "px !important;}", rn);
		stwidth = document.getElementById("summary").children[0].offsetWidth;
	}
}

if (document.getElementById('ccnum') && document.getElementById('ccnum').innerHTML == "") document.getElementById('ccinfo').style.display = "none";
if (document.getElementById('instructions') && document.getElementById('instructions_text').innerHTML == "") document.getElementById('instructions').style.display = "none";
