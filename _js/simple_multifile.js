// 
// by jeremy
// 
// ccs in myaccount.css / .fileUpload - .fileUploadlist
// 
// supports multiple instances by id specified be php loop 
// 

$(document).ready(function() {

	$(".uploadBtn").change(function(){
	
		var id = $(this).attr('id').replace('uploadBtn_', '');
		
		//alert ( $(this)[0].files[0].name);
		
		var txt='<br>';
		
		//alert(dump($(this)[0].files));
		
		for (var x in $(this)[0].files) {
		
			//alert(dump($(this)[0].files[x]));
			
			var f = $(this)[0].files[x];
			
			if(f.name!='item' && f.name!=undefined&& f.name!='@@iterator'){

				//var reader = new FileReader();
				
				//reader.onload = function (e) {
				
					//var source =  this.result;
				//	var source =   e.target.result;
					
					
				//}
				//reader.readAsDataURL($(this)[0].files[x]);
				
				
				//txt =  txt + '<img src="' + readURL(this) + '"/>';
				
				txt = txt + f.name + "<br>";
				
				
			}
		}
	
		$("#fileUploadlist_" + id + " span" ).html( txt );
		$("#fileUploadlist_" +id ).slideDown('slow', function(){ resize_iframe(); });
		

	});
	

	
	
	$(".fileUploadlist a").click(function(){
	
		var id = $(this).attr('id').replace('remove_', '');
	
		$("#uploadBtn_" +id).val('');
		$("#fileUploadlist_" +id ).slideUp('slow', function(){ $("span", this ).html(''); resize_iframe(); });
		
	});
});
	

	
/* example markup

	<div class="fileUpload pure-button pure-button-primary">
		<span>Attach Photos</span>
		<input multiple accept="image/*" id="uploadBtn_<?=$k?>" name="item_<?=$k?>[]" type="file" class="upload uploadBtn" />
	</div>

	<div class="fileUploadlist" id="fileUploadlist_<?=$k?>" style="display:none;" ><a id="remove_<?=$k?>"  >x</a><span></span> </div>
	
*/

	
function readURL(input) {
    if (input.files && input.files[0]) {
        var image = jQuery(input).data('image-target');

        var reader = new FileReader();

        reader.onload = function (e) {
            //jQuery(image).attr('src', e.target.result);
						//alert(e.target.result);
						return e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}	

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}