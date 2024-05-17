var a = 1; // default value, set at ready
var gsi = 1; // current slide index
var s = 600; // transition time on auto
var cs = 200; // transition time on click
var __int = 4000; // interval between auto-transitions
var prev = a;

$(document).ready(function() {
	a = $('#image_holder #image_temp .product_image').length;

	$('#image_thumbs img').click(function() {
		//clearTimeout(t);
		grandeClick($(this).attr('id'));
	});

	$('#imagev_1').clone(true).children().appendTo('#image_1');  // clone first visible slide into first temp slide
	
	//if (a > 1) {
	//	grandeSpotGo();
    //}

    var myFile = document.location.toString();

	if (myFile.match('#')) { // the URL contains an anchor
		// click the navigation item corresponding to the anchor
		var initialSlide = myFile.split('#')[1];
		grandeClick(initialSlide);
	}
});

function grandeSpot(a,b) {
	if (a > 1) {
		if (b != gsi) {
			prev = gsi;
			next = (b < 1 ? (gsi % a) + 1 : b);

			$('#image_thumbs img').removeClass('activ');
			$('#thumb_' + next).addClass('activ');

			$('#image_' + next).clone(true).attr("id", "imagev_" + next).insertBefore('#imagev_' + prev);  // clone next and place under current
			$('#imagev_' + prev).fadeOut((b < 1 ? s : cs)).queue(function() { $(this).remove() });  // fade out prev, then remove

			var reltext = $('#image_' + next).attr("rel"); // see Gallery Canvas for example
			if (!!reltext) {
				$('#product_info .slide_text').hide();
				$('#' + reltext).show();
			}

			gsi = next;

			if (b < 1) grandeSpotGo();
		}
	}
}

function grandeSpotGo() {
	t = setTimeout("grandeSpot(a,0)", __int);
}

function grandeClick(click) {  // click = id of nav button	
	var c = parseInt( click.replace("thumb_", "") );
	grandeSpot(a, c);
}