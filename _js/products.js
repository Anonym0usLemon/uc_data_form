$(function() {
	$('.stripe tbody').find('tr:odd').addClass('odd');

	$('#product-tabs').tabs();
	$('.picture-table').each(function(index) {
		var self = $(this);
		var target = $('#' + self.attr('rel'));
		target.attr('rel', target.css('background-image'));
		self.find('th[rel]').each(function(index) {
			var line = $(this);
			line
				.mouseenter(function(event) {
					target.css('background-image', 'url("' + line.attr('rel') + '")');
					line.addClass('highlight');
					var sh = self.outerHeight();
					var th = target.outerHeight();
					var ty = (line.outerHeight() * (index + 3)) - (th / 2);
					if (ty < 0) {
						ty = 0;
					}
					if (ty + target.outerHeight() > sh) {
						ty = sh - th;
					}
					target.css('top', ty + 'px');
				})
				.mouseleave(function(event) {
					target.css('background-image', target.attr('rel'));
					line.removeClass('highlight');
				});
		});
	});
	var myFile = document.location.toString();
	if (myFile.match('#')) { // the URL contains an anchor
		// click the navigation item corresponding to the anchor
		var initialSlide = myFile.split('#')[1];
		grandeClick(initialSlide);
	}

	$('.togglePricing').click(function() {
		var self = $(this);
		if (self.hasClass('open')) {
			self.text('+ show pricing');
		}
		else {
			self.text('- hide pricing');
		}
		self.siblings('.pricing-area').slideToggle('fast');
		self.toggleClass('open');
	});
});