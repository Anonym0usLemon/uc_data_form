var a = 1; // default value, set at ready
var gsi = 1; // current slide index
var cs = 200; // transition time on click
var prev = a;

$(document).ready(function() {
	a = $('.slide_temp .slide_image').length;

	if (a > 1) { //only show buttons when there's more than one slide
		// add nav button for each slide
		var snb = $('.slider_nav_bar');
		for (var i = 1; i <= a; i++) {
			snb.append('<div class="slider_nav_h"><div id="sn_' + i + '" class="slider_nav"></div></div>');
		}

		$('#sn_' + gsi).addClass('slider_nav_activ');

		$('.slider_nav').click(function() { grandeClick($(this).attr('id')); });

		$('.slider_nav, .slider_arrow').hover(function() {
			$(this).css('top', '-26px');
		}, function() {
			$(this).css('top', '0px');
		});

		$('#sa_prev').click(function() { grandeClickPrev() });
		$('#sa_next').click(function() { grandeClickNext() });
		$('.slider_arrow_h').css('visibility', 'visible');

		$('#slidev_1').clone(true).children().appendTo('#slide_1');  // clone first visible slide into first temp slide
	}
});

function grandeSpot(a,b) {
	if (a > 1) {
		b = ( b < 1 ? a : b )	
		if (b != gsi) {
			prev = gsi;
			next = ( b > a ? 1 : b );
			
			$('#slide_'+next).clone(true).attr("id","slidev_"+next).insertBefore('#slidev_'+prev);  // clone next and place under current
			$('#slidev_'+prev).fadeOut(cs).queue( function() { $(this).remove() } );  // fade out prev, then remove

			var reltext = $('#slide_' + next).attr("rel"); // see Jewelry for example
			if (!!reltext) {
				$('#product_info .slide_text').hide();
				$('#' + reltext).show();
			}
			
			setTimeout( "$(\'.slider_nav\').removeClass(\"slider_nav_activ\")", cs/2 );
			setTimeout( "$(\'#sn_\'+next).addClass(\"slider_nav_activ\")", cs/2 );  // switch active nav button in middle of transition
			gsi = next;
		}
	}
}

function grandeClick(click) {  // click = id of nav button	
	var c = parseInt( click.replace("sn_", "") );
	grandeSpot(a, c);
}

function grandeClickNext() {
	grandeSpot(a,gsi+1)
}

function grandeClickPrev() {
	grandeSpot(a,gsi-1)
}