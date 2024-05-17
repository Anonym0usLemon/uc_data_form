$(document).ready(function() {
	$('.slide ul').each(function() {
		var ht = $(this).parent().height();		
		$(this).css('top',-ht+'px');
	});

	$('#topnav .extends').hover(function() {
		slideDown( $(this), 150 );
	}, function() {
		slideUp( $(this), 150 );
	});
	
	function slideDown(target, duration) {
		target = target.find('ul');
		var pt = target.parent();
		var ht = pt.height();
		duration = ((0 - parseInt(target.css('top').split('px')[0])) / ht) * duration;
		pt.show();
		target.stop().stop().delay(50).animate({'top': 0}, duration);
	}
	
	function slideUp(target, duration) {
		target = target.find('ul');
		var pt = target.parent();
		var ht = pt.height();
		duration = ((ht + parseInt(target.css('top').split('px')[0])) / ht) * duration;
		target.stop().stop().delay(50).animate({'top': 0-ht}, duration, function() {
			pt.hide();
		} );
	}
	
  $('#login .user').focus(function(){
    if($(this).val() == '') {
      $(this).css('background-position', '0px -40px');
    }
  });
  $('#login .password').focus(function(){
    if($(this).val() == '') {
      $(this).css('background-position', '0px -60px');
    }
  });
  $('#login .user').blur(function(){
    if($(this).val() == '') {
      $(this).css('background-position', '0px 0px');
    }
  });
  $('#login .password').blur(function(){
    if($(this).val() == '') {
      $(this).css('background-position', '0px -20px');
    }
  });
});