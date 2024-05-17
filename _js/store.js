jQuery.fn.imageSwitch = function() {
	return this.each(function() {
		var $$ = jQuery(this);
		
		var target = "#" + $$.attr("rel");
		var source = $$.attr("href");
		
		$$.hover(function() {
			jQuery(target).attr("src", source);				
		}, function() {}
		);

		$$.css({'cursor' : 'pointer'});
	});
};

$(window).bind('load', function () {
  $('div.store-order table u').imageSwitch();
});