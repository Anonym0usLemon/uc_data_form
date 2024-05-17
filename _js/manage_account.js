
$(document).ready(function() {

	$('.input').hide();

	$(".input a").click(function(){
		var id = $(this).parents('p').attr('id');
		resetRow(id)
	
	});

	$(".edit a").click(function(){

		var editmode = $(this).hasClass('edit-mode') ? false : true;

		var id = $(this).parents('p').attr('id');
		var inputs = $('#' + id + ' .input');
		var values = $('#' + id + ' .value');
		var button = $(this);
		
		//if(id == 'PHONE2'){validatephonenum( $("input[name=PHONE2]").val() )}

		if($(this).hasClass('edit-mode')){
			
			button.text('Saving...');
			$.ajax({
				url: "https://acilab.com/My_Account/update.php?a=update",
				type: "POST",
				//data: $('#' + id + ' input','#' + id + ' select').serialize(),
				//data: $('#' + id + ' input').serialize(),
				data: $('#' + id + ' .item').serialize(),
				//data: { name: "John" },
				dataType: 'json',
				success: function(json){
					button.text('Edit');
					inputs.hide();
					values.show();
					button.removeClass('edit-mode');
					//$('#' + id).css('background', '');
					$('#'+ id + ' .value').text(json['value']);
					//$('#'+ id + ' .value').text(json['value']);
					$('#'+ id + ' .value').css( "color", json['color'] );
					//alert(json);
				}
			});
		}else{
			//$('#' + id).css('background', '#FFBF6D');
			button.text('Save');
			inputs.show();
			values.hide();
			button.addClass('edit-mode');
		}

	});

	
	function resetRow(id){
		$('#' + id).css('background', '');
		$('#' + id + ' .input').hide();
		$('#' + id + ' .value').show();
		$('#' + id + ' .edit a').removeClass('edit-mode').text('Edit');
	}


});




