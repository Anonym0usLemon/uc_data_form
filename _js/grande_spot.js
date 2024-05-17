var a = 1; // default value, set at ready
var gsi = 1; // current slide index
var s = 1600; // transition time on auto
var cs = 200; // transition time on click
var __int = 6600; // interval between auto-transitions
var t = 0;
var tc = 0;
var prev = a;

//$(document).ready(function() {
	a = $('.grande_spot_temp .grande_spot_image').length;
	
	$('#gsn_'+gsi).addClass("grande_spot_nav_activ");
	
	$('.grande_spot_nav').click( function() { grandeClick( $(this).attr('id') ) });
	$('#gsn_next').click( function() { grandeClick( String((gsi+1)%a || a) ) });
	$('#gsn_prev').click( function() { grandeClick( String((gsi-1) || a) ) });

	if (a > 1) {
		grandeSpotGo();
		$(".grande_spot_holder").hover( function() { grandeSpotStop() }, function() { grandeSpotGo() } );
		$(".grande_spot_control").hover( function() { $(this).stop().fadeTo("fast", 1) }, function() { $(this).stop().fadeTo("fast", 0.5) } );
		//$(".grande_spot_control").hover( funtion() { $(this).stop().fadeTo("fast", 1) }, function() { $(this).stop().fadeTo("fast", 0.5) } );
	}
//});

function grandeSpot(a,b) {
	if (a > 1) {
		if (b > 0) {  // b > 0 if navbar was clicked
			if (b == gsi) { }  // don't switch if current slide is clicked
			else {
				prev = gsi;
				next = b;
				
				$('#gs_'+next).clone(true).attr("id","gsv_"+next).insertBefore('#gsv_'+prev);  // clone next and place under current
				$('#gsv_'+prev).fadeOut(cs).queue( function() { $(this).remove() } );  // fade out prev, then remove
				
				setTimeout( "$(\'.grande_spot_nav\').removeClass(\"grande_spot_nav_activ\")", cs/2 );
				setTimeout( "$(\'#gsn_\'+next).addClass(\"grande_spot_nav_activ\")", cs/2 );  // switch active nav button in middle of transition
				gsi = next;
			}
		}
		else {  // b=0, auto transition
			if (gsi >= a) { prev = a; next = 1; gsi = 1; }  //loop to back to first slide
			else { prev = gsi; next = gsi+1; }
			
			$('#gs_'+next).clone(true).attr("id","gsv_"+next).insertBefore('#gsv_'+prev);
			$('#gsv_'+prev).fadeOut(s).queue( function() { $(this).remove() } );
			
			setTimeout( "$(\'.grande_spot_nav\').removeClass(\"grande_spot_nav_activ\")", s/2 );
			setTimeout( "$(\'#gsn_\'+next).addClass(\"grande_spot_nav_activ\")", s/2 );
			gsi = next;
			
			grandeSpotGo();
		}
	}
}

function grandeSpotGo() {
	$('.grande_spot_control_box').stop().fadeTo("slow", 0);
	//tc = setTimeout("$(\'.grande_spot_control_box\').stop().fadeTo(\"fast\", 0)", 400)
	t = setTimeout("grandeSpot(a,0)",__int);
}

function grandeSpotStop() {
	var pr = $('#gsv_'+prev).css("opacity");
	if (pr != null) {  // if transitioning, snap to the most visible slide
		if (pr < 0.4) {
			$('#gsv_'+prev).stop();  // prev almost gone, stop fading, remove immediately
		} else {
			grandeClick('gsn_'+prev);  // prev still mostly visible, transition back to it
		}
	}
	clearTimeout(t);
	clearTimeout(tc);
	$('.grande_spot_control_box').stop().fadeTo("fast", 0.5);
}

function grandeClick(click) {  // click = id of nav button
	clearTimeout(t);
	var c = parseInt( click.replace("gsn_", "") );
	grandeSpot(a,c);
}