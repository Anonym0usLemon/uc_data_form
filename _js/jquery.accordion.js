// jQuery Accordion Menu
// by Marco van Hylckama Vlieg
// http://www.i-marco.nl

// added 'expanded' class functionality
// removed cookie functionality
// added expandedMenu var - declare in product page (m1, m2, m3...) - default expanded menu

var expandedMenu;
var currentItem;

function initMenus() {
	$('ul.menu ul').hide();
	$.each($('ul.menu'), function(){
	  if(expandedMenu === null || String(expandedMenu).length < 1) {
	    $('#' + this.id + '.expandfirst ul:first').show().prev().addClass('expanded');
	  }
	  else {
	    $('#' + this.id + ' .' + expandedMenu).addClass('expanded').next().show();
	  }
		$('#' + this.id + ' .expandme').show().prev().addClass('expanded');
		if (currentItem !== null) {
			$('#' + this.id + ' #' + currentItem).addClass('accordion-current');
		}
	});
	/*
	$('ul.menu > li a').click(
		function() {
			var checkElement = $(this).next();
			var parent = this.parentNode.parentNode.id;
			if($('#' + parent).hasClass('noaccordion')) {
				if((String(parent).length > 0) && (String(this.className).length > 0)) {
					if($(this).next().is(':visible')) {
						$(this).removeClass('expanded');
					}
					else {
						$(this).addClass('expanded');
					}
					$(this).next().slideToggle('normal');
				}
			}
			if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
				if($('#' + parent).hasClass('collapsible')) {
					$('#' + parent + ' ul:visible').slideUp('normal').prev().removeClass('expanded');
				}
				return false;
			}
			if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
				$('#' + parent + ' ul:visible').slideUp('normal').prev().removeClass('expanded');
				checkElement.slideDown('normal').prev().addClass('expanded');
				return false;
			}
		}
	);
	*/
}
//$(document).ready(function() {initMenus();});
initMenus();