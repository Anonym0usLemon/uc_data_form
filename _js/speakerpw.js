// If you're already this far, the password probably won't be hard for you to figure out
var password = "928978748478749298"

$(document).ready(function() {
	$('#speaker').hide();

	$('#txtSpeaker').keypress(function(event) {
		if (event.keyCode == 13) {
			$('#btnSpeaker').click();
			return false;
		}
	});

	$('#btnSpeaker').click(function() {
		if ($('#txtSpeaker').val() == decr(password)) {
			$('#speakerPassword').hide();
			$('#speaker a').each(function(index) {
				var href = $(this).attr('href');
				$(this).attr('href', decr(password) + '/' + href);
			});
			$('#speaker').fadeIn();
		}
		else {
			$('#speakerError').show().stop().effect('highlight', {}, 3000);
		}
	});
});

function encr(val) {
	var num_out = "";
	val = escape(val);
	for (i = 0; i < val.length; i++) {
		num_out += val.charCodeAt(i) - 23;
	}
	return num_out;
}

function decr(val) {
	var str_out = "";
	var num_in = "";
	for (i = 0; i < val.length; i += 2) {
		num_in = parseInt(val.substr(i, 2)) + 23;
		num_in = unescape('%' + num_in.toString(16));
		str_out += num_in;
	}
	return str_out;
}