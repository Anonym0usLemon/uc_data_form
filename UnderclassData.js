$(function () {
	$('.hidden').hide().removeClass('hidden');

	var lines = 1;
	addLineGroup();

	var c = getParameterByName('c');
	if (c !== "") {
		History.getState().data.c = c;
		setCheckboxes(c);
		updateColumns(c);
	}
	else {
		var c = getStateCode();
		History.replaceState({ c: c }, null, "?c=" + c);
		updateColumns(c);
	}

	function clearCheckboxes() {
		$('#columnSetup input[type=checkbox]').each(function () {
			if (!$(this).hasClass('required')) {
				$(this).prop('checked', false);
			}
		});
	}

	function setCheckboxes(c) {
		clearCheckboxes();
		var bin = dec2bin(c);
		for (var i = 0; i < bin.length; i++) {
			if (bin[i] === "1") {
				$('#colChk-' + (i + 1)).prop('checked', true);
			}
		}
	}

	function updateColumns(c) {
		var $table = $('#data-table');
		$table.find('.selected').removeClass('selected');

		var bin = dec2bin(c);
		for (var i = bin.length; i--;) {
			if (bin[i] === "1") {
				var $chk = $('#colChk-' + (i + 1));
				$table.find('.' + $chk.attr('data-rel')).addClass('selected');
			}
		}
	}

	$('#columnSetupClear').click(function () {
		clearCheckboxes();
	});

	$('#columnSetupSave').click(function () {
		var c = getStateCode();
		History.replaceState({ c: c }, null, "?c=" + c);
		$('#columnSetup').modal('hide');
	});

	$('#columnSetup').on('hidden.bs.modal', function (e) {
		var c = History.getState().data.c;
		setCheckboxes(c);
		updateColumns(c);
	})

	$('#add-lines').click(function () {
		addLineGroup();
	});

	function addLine() {
		lines++;
		var $newLine = $('#data-table .data-line:first').clone(true);
		$newLine.find('input[type=text]').val('');
		$newLine.find('.line-number').text(lines);
		$('#data-table tbody').append($newLine);
	}

	function addLineGroup() {
		for (var i = Math.floor((lines + 5) / 5) * 5; lines < i;) {
			addLine();
		}
	}

	function getStateCode() {
		var c = [];
		var i = 0;

		$('#columnSetup input[type=checkbox]').each(function () {
			i = parseInt($(this).attr('id').replace('colChk-', ''));

			if ($(this).is(':checked')) {
				c[i] = "1"
			}
			else {
				c[i] = "0"
			}
		});

		for (var i = 0; i < c.length; i++) {
			if (c[i] === undefined) c[i] = "0";
		}

		var dec = bin2dec(c.join(''));
		return dec;
	}

	$('#load-csv').click(function () {
		$('#file-csv').click();
	});

	$('#file-csv').change(function () {
		parseCSV();
	});

	function parseCSV() {
		if ($('#file-csv')[0].files.length < 1) return;

		Papa.parse($('#file-csv')[0].files[0], {
			header: true,
			complete: function (results) {
				clearCheckboxes();
				clearForm();

				for (var i = results.meta.fields.length; i--;) {
					$('#columnSetup input[data-rel="' + results.meta.fields[i].toLowerCase().replace(/\s/g, '-') + '"]').prop('checked', true);
				}

				while (lines < results.data.length) addLineGroup();

				$rows = $('#data-table .data-line')
				for (var i = 0, len = results.data.length; i < len; i++) {
					for (var key in results.data[i]) {
						$rows.eq(i).find('input.' + key.toLowerCase().replace(/\s/g, '-')).val(results.data[i][key]);
					}
				}

				var c = getStateCode();
				updateColumns(c);
				History.replaceState({ c: c }, null, "?c=" + c);

				$('#file-csv').val('');
			}
		});
	}

	$('#save-csv').click(function () {
		setCSVData();
		$('#btnSaveCSV').click();
	});

	function setCSVData() {
		var result = "";
		var notBlank = true;

		var $colNames = $('#data-table thead .selected');
		var colCount = $colNames.length;
		for (var i = 0; i < colCount; i++) {
			result += ((i > 0) ? ',' : '') + $colNames.eq(i).text();
		}

		var $rows = $('#data-table .data-line');
		var $cols, val, line, notBlank;
		for (var i = 0, len = $rows.length; i < len; i++) {
			line = "|";
			notBlank = false;
			$cols = $rows.eq(i).find('td.selected input');
			for (var j = 0; j < colCount; j++) {
				val = $cols.eq(j).val();
				if (val.indexOf(',') >= 0) val = '"' + val + '"';
				val = val.replace(/\|/g, ' ');
				line += ((j > 0) ? ',' : '') + val;
				notBlank = notBlank || (val !== "");
			}
			if (notBlank) result += line;
		}

		$('#csvData').val(result);
	}

	$('#clear-form').click(function () {
		$('#clear-form').hide();
		$('#clear-confirm').show();
	});

	$('#clear-yes').click(function () {
		$('#clear-confirm').hide();
		$('#clear-form').show();
		clearForm();
	});

	$('#clear-no').click(function () {
		$('#clear-confirm').hide();
		$('#clear-form').show();
	});

	var clearForm = function () {
		$('#data-table .data-line').slice(1).remove();
		$('#data-table .data-line input[type=text]').val('');
		lines = 1;
		addLineGroup();
	};
});

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}