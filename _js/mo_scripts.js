// Selects all checkboxes in a group

function check_all(item){
	
	el = true;
	i = 1;
	
	while(el == true){
		molist = item+i;
		if(document.getElementById(molist)){
		
			document.getElementById(molist).checked = true;
			i++;
		
		}
		
		else el = false;
	}
}

// Unselects all checkboxes in a group
function uncheck_all(item){

	el = true;
	i = 1;
	
	while(el == true){
		molist = item+i;
		if(document.getElementById(molist)){
		
			document.getElementById(molist).checked = false;
			i++;
		}
		
		else el = false;
	}
}

// Disables instruction boxes. Individual ones are enabled when the user checks an item to be made over. - Not using this right now
function disable_input(item){
	
	el = true;
	i = 1;
	
	while(el == true){
		user_text = item+i;
		if(document.getElementById(user_text)){
			document.getElementById(user_text).setAttribute('readOnly', 'readonly');
			i++;
		}
		
		else el = false;
	}
}


function enable(id){ //  Form_Entire_Order  Form_Select_Items
	
	if(id == 'Form_Entire_Order'){
		$("#Form_Select_Items").hide();
		$("#Form_Entire_Order").show();
	}
	
	if(id == 'Form_Select_Items'){
		$("#Form_Entire_Order").hide();
		$("#Form_Select_Items").show();
	}
}

function enable_text(t_id){

	t_id = t_id.replace('mo_list', 'instr_');
	document.getElementById(t_id).removeAttribute('readOnly');

}

function select_alert(item){
	if(typeof sel_msg == 'undefined') sel_msg = false;
	cbox = item.replace('instr_', 'mo_list');
	if((document.getElementById(cbox).checked == false) && (sel_msg == false)){
		alert("You need to use the checkbox on the left to add this item to the makeover list before you can enter any instructions.");
		sel_msg = true;
	}
}

function MOcheckFields(){  return true;

	moform = document.lookupform;

	if(moform.mo_cause.options[moform.mo_cause.options.selectedIndex].value == ''){
		alert('You must select a reason for this make over');
		moform.mo_cause.style.backgroundColor='#ff0000';
		
		return false;
	}

	else if((moform.mo_cause.options[moform.mo_cause.options.selectedIndex].value == 'Other') && (moform.mo_other.value == '')){
		alert('Please use the text box to tell us the reason for the make over');
		moform.mo_other.style.border='1px solid #ff0000';
		
		return false;
	}

	else if(is_checked() == false){

		alert('You must select at least one item to make over.  Use the checkboxes next to the item thumbnails.');
		return false;
		}

	return true;

}

function is_checked(){
	
	ok = false;
	el = true;
	i = 1;
	item = 'mo_list';
	
	while(el == true){
		
		molist = item+i;

		if(document.getElementById(molist)){
			
			if(document.getElementById(molist).checked == true){

			ok = true;
			break;
			}
			i++;
		}
		
		else el = false;
	
	}
	
	return ok;
}


