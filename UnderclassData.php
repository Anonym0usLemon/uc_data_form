<?php

function downloadCSV($combinedData) {
  $filename = "uc-data-" . time() . ".csv"; // Use time() for unique filename

  // Build CSV content
  $csvContent = "";
  foreach (explode("|", $combinedData) as $subject) {
    $csvContent .= $subject . PHP_EOL;
  }

  // Set headers for download
  header("Content-Type: text/csv");
  header("Content-Disposition: attachment; filename=" . $filename);
  header("Pragma: public"); // For caching

  // Output CSV content
  echo $csvContent;
  exit; // Terminate script after download
}

if (isset($_POST['csvData'])) {
  $combinedData = $_POST['csvData'];
  downloadCSV($combinedData);
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Underclass Data Submission Form</title>
	<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="UnderclassData.css" type="text/css" />
</head>
<body>
<form id="form1" method="post">
	<nav class="navbar navbar-default navbar-static-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-brand">Underclass Data Submission Form</div>
			<p class="navbar-text navbar-right"><a href="web4.acilab.com/resources/business-forms" class="navbar-link">&laquo; Back to Forms</a></p>
		</div>
	</nav>
	
	<div class="container-fluid">
		<p><span class="glyphicon glyphicon-warning-sign glyphicon-with-text"></span>Orders not submitted in this format will be returned to correct. This may increase turnaround time.</p>
		<p><button type="button" class="btn btn-default" data-toggle="modal" data-target="#instructions"><span class="glyphicon glyphicon-question-sign glyphicon-with-text"></span>How to Use This Form</button></p>
		
		<button type="button" class="btn btn-info" data-toggle="modal" data-target="#columnSetup" style="margin-right:40px;">Choose Columns</button>
		<br /><br />
		
		<button type="submit" id="save-csv" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-save glyphicon-with-text"></span>Save as CSV</button>
		<button type="button" id="load-csv" class="btn btn-default"><span class="glyphicon glyphicon-floppy-open glyphicon-with-text"></span>Load from CSV</button>
		<input type="file" id="file-csv" class="yonder" />
		<input type="hidden" id="csvData" name="csvData">
		<button id="btnSaveCSV" type="submit" name="save-csv" class="hidden" OnClick="btnSaveCSV_Click"></button>

		<table id="data-table">
			<thead>
				<tr>
					<th class="line-number">&nbsp;</th>
					<th class="image-name">Image Name</th>
					<th class="packages">Packages</th>
					<th class="first-name">First Name</th>
					<th class="last-name">Last Name</th>
					<th class="student-id">Student ID</th>
					<th class="teacher">Teacher</th>
					<th class="grade">Grade</th>
					<th class="home-room">Home Room</th>
					<th class="period">Period</th>
					<th class="track">Track</th>
					<th class="year">Year</th>
					<th class="address">Address</th>
					<th class="city">City</th>
					<th class="state">State</th>
					<th class="zip">Zip</th>
					<th class="mother">Mother</th>
					<th class="father">Father</th>
					<th class="home-phone">Home Phone</th>
					<th class="work-phone">Work Phone</th>
					<th class="gender">Gender</th>
					<th class="date-of-birth">Date of Birth</th>
					<th class="school-name">School Name</th>
					<th class="background">Background</th>
					<th class="studioname">StudioName</th>
					<th class="studioaccountnumber">studioaccountnumber</th>
					<th class="ticketcode">ticketcode</th>
					<th class="imagetype">imagetype</th>
					<th class="libraryid">libraryid</th>
					<th class="lunchnumber">lunchnumber</th>
					<th class="patron">patron</th>
					<th class="emailaddress">emailaddress</th>
					<th class="nameyearwallets">nameyearwallets</th>
					<th class="specialinstructions">specialinstructions</th>
				</tr>
			</thead>
			<tbody>
				<tr class="example-line">
					<td class="line-number">Ex.</td>
					<td class="image-name">img-1234.jpg</td>
					<td class="packages">A-1;B-2</td>
					<td class="first-name">Bob</td>
					<td class="last-name">Smith</td>
					<td class="student-id">123456<td>
					<td class="teacher">Jones</td>
					<td class="grade">12</td>
					<td class="home-room">123</td>
					<td class="period"></td>
					<td class="track"></td>
					<td class="year"></td>
					<td class="address"></td>
					<td class="city"></td>
					<td class="state"></td>
					<td class="zip"></td>
					<td class="mother"></td>
					<td class="father"></td>
					<td class="home-phone"></td>
					<td class="work-phone"></td>
					<td class="gender"></td>
					<td class="date-of-birth"></td>					
					<td class="school-name"></td>
					<td class="background">AA</td>
					<td class="studioname"></td>
					<td class="studioaccountnumber"></td>
					<td class="ticketcode"></td>
					<td class="imagetype"></td>
					<td class="libraryid"></td>
					<td class="lunchnumber"></td>
					<td class="patron"></td>
					<td class="emailaddress"></td>
					<td class="nameyearwallets"></td>
					<td class="specialinstructions"></td>
				</tr>
				<tr class="data-line">
					<td class="line-number">1</td>
					<td class="image-name"><input type="text" class="image-name" autocomplete="off" /></td>
					<td class="packages"><input type="text" class="packages" autocomplete="off" /></td>
					<td class="first-name"><input type="text" class="first-name" autocomplete="off" /></td>
					<td class="last-name"><input type="text" class="last-name" autocomplete="off" /></td>
					<td class="student-id"><input type="text" class="student-id" autocomplete="off" /></td>
					<td class="teacher"><input type="text" class="teacher" autocomplete="off" /></td>
					<td class="grade"><input type="text" class="grade" autocomplete="off" /></td>
					<td class="home-room"><input type="text" class="home-room" autocomplete="off" /></td>
					<td class="period"><input type="text" class="period" autocomplete="off" /></td>
					<td class="track"><input type="text" class="track" autocomplete="off" /></td>
					<td class="year"><input type="text" class="year" autocomplete="off" /></td>
					<td class="address"><input type="text" class="address" autocomplete="off" /></td>
					<td class="city"><input type="text" class="city" autocomplete="off" /></td>
					<td class="state"><input type="text" class="state" autocomplete="off" /></td>
					<td class="zip"><input type="text" class="zip" autocomplete="off" /></td>
					<td class="mother"><input type="text" class="mother" autocomplete="off" /></td>
					<td class="father"><input type="text" class="father" autocomplete="off" /></td>
					<td class="home-phone"><input type="text" class="home-phone" autocomplete="off" /></td>
					<td class="work-phone"><input type="text" class="work-phone" autocomplete="off" /></td>
					<td class="gender"><input type="text" class="gender" autocomplete="off" /></td>
					<td class="date-of-birth"><input type="text" class="date-of-birth" autocomplete="off" /></td>
					<td class="school-name"><input type="text" class="school-name" autocomplete="off" /></td>
					<td class="background"><input type="text" class="background" autocomplete="off" /></td>
					<td class="studioname"><input type="text" class="studioname" autocomplete="off" /></td>
					<td class="studioaccountnumber"><input type="text" class="studioaccountnumber" autocomplete="off" /></td>
					<td class="ticketcode"><input type="text" class="ticketcode" autocomplete="off" /></td>
					<td class="imagetype"><input type="text" class="imagetype" autocomplete="off" /></td>
					<td class="libraryid"><input type="text" class="libraryid" autocomplete="off" /></td>
					<td class="lunchnumber"><input type="text" class="lunchnumber" autocomplete="off" /></td>
					<td class="patron"><input type="text" class="patron" autocomplete="off" /></td>
					<td class="emailaddress"><input type="text" class="emailaddress" autocomplete="off" /></td>
					<td class="nameyearwallets"><input type="text" class="nameyearwallets" autocomplete="off" /></td>
					<td class="specialinstructions"><input type="text" class="specialinstructions" autocomplete="off" /></td>
				</tr>
			</tbody>
		</table>

		<!--<thead>
			<tr>
				<th>&nbsp;</th>
				<th class="col-name" rel="First Name">First Name</th>
				<th class="col-name" rel="Last Name">Last Name</th>
				<th class="col-name" rel="Image Name"><div class="tip-container">Image Name<br /><span>(JPEG #)</span><div title="Must include prefix and extension" class="info tooltip"></div></div></th>
				<th class="col-name" rel="Teacher">Teacher</th>
				<th class="col-name" rel="Grade">Grade</th>
				<th class="col-name" rel="Student ID">Student ID</th>
				<th class="col-name" rel="Home Room">Home Room</th>
				<th class="col-name" rel="Period">Period</th>
				<th class="col-name" rel="Track">Track</th>
				<th class="col-name" rel="Packages">Packages</th>
				<th class="col-name" rel="Background" style="width:120px">Background Code<br /><span>(Greenscreen Only)</span></th>
				<th class="col-name" rel="studioname">Studio Name</th>
				<th class="col-name" rel="School Name">School Name</th>
				<th class="col-name" rel="nameyearwallets"><div class="tip-container">Name on Wallets <div title="This column will be used for all named products (EX: calendars, reflections, wallets, etc.)" class="info tooltip"></div></div></th>
			</tr>
		</thead>
		<tbody>
				
		</tbody>-->

		<div id="add-lines" class="btn btn-default btn-sm" style="margin-right:40px"><span class="glyphicon glyphicon-plus glyphicon-with-text"></span>Add more rows</div>
		<span id="clear-form">Clear Form</span>
		<span id="clear-confirm" class="hidden"><b>Are you sure?</b> <span id="clear-yes">Clear</span> / <span id="clear-no">Cancel</span></span>
	</div> <!-- /.container-fluid -->

	<!-- Modal -->
	<div class="modal fade" id="columnSetup" role="dialog" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" title="Cancel">&times;</button>
					<h4 class="modal-title">Column Setup</h4>
				</div>
				<div class="modal-body row">
					<div class="col-md-4">
						<div class="checkbox"><label><input type="checkbox" id="colChk-1" data-rel="image-name" class="required" checked disabled /> Image Name</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-2" data-rel="packages" class="required" checked disabled /> Packages</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-3" data-rel="first-name" /> First Name</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-4" data-rel="last-name" /> Last Name</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-5" data-rel="student-id" /> Student ID</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-6" data-rel="teacher" /> Teacher</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-7" data-rel="grade" /> Grade</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-8" data-rel="home-room" /> Home Room</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-9" data-rel="period" /> Period</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-10" data-rel="track" /> Track</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-11" data-rel="year" /> Year</label></div>
					</div>
					<div class="col-md-4">
						<div class="checkbox"><label><input type="checkbox" id="colChk-12" data-rel="address" /> Address</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-13" data-rel="city" /> City</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-14" data-rel="state" /> State</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-15" data-rel="zip" /> Zip</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-16" data-rel="mother" /> Mother</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-17" data-rel="father" /> Father</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-18" data-rel="home-phone" /> Home Phone</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-19" data-rel="work-phone" /> Work Phone</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-20" data-rel="gender" /> Gender</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-21" data-rel="date-of-birth" /> Date of Birth</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-22" data-rel="school-name" /> School Name</label></div>
						<%-- <div class="checkbox"><label><input type="checkbox" id="colChk-34" data-rel="new-column" /> New Column</label></div> --%>
					</div>
					<div class="col-md-4">
						<div class="checkbox"><label><input type="checkbox" id="colChk-23" data-rel="background" /> Background</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-24" data-rel="studioname" /> StudioName</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-25" data-rel="studioaccountnumber" /> studioaccountnumber</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-26" data-rel="ticketcode" /> ticketcode</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-27" data-rel="imagetype" /> imagetype</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-28" data-rel="libraryid" /> libraryid</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-29" data-rel="lunchnumber" /> lunchnumber</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-30" data-rel="patron" /> patron</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-31" data-rel="emailaddress" /> emailaddress</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-32" data-rel="nameyearwallets" /> nameyearwallets</label></div>
						<div class="checkbox"><label><input type="checkbox" id="colChk-33" data-rel="specialinstructions" /> specialinstructions</label></div>
					</div>
				</div>
				<div class="modal-footer">
					<a id="columnSetupClear" class="btn btn-link btn-danger-link pull-left">Reset</a>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="button" id="columnSetupSave" class="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>
	</div> <!-- /#columnSetup -->

	<div class="modal fade" id="instructions" role="dialog" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" title="Cancel">&times;</button>
					<h4 class="modal-title">How to Use This Form</h4>
				</div>
				<div class="modal-body row">
					<div class="col-xs-12">
						<ol>
							<li>Click <b>Choose Columns</b> to choose the column headings you need.</li>
							<li>Check each column needed, then click <b>Save Changes</b> at the bottom.</li>
							<li>Click <b>+ Add more rows</b> to add additional rows.</li>
							<li><b>Load from CSV</b> to pull up a file you were working on, to continue working on it.</li>
							<li><b>Save as CSV</b> file to your computer when the form is completed. Send it in with your images via DVD or FTP.</li>
						</ol>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div> <!-- /#instructions -->
	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	<script src="./_js/jquery.history.min.js"></script>
	<script src="./_js/papaparse.min.js"></script>
	<script src="./_js/baseConverter.min.js"></script>
	<script src="./_js/bootstrap.confirmation.min.js"></script> <!-- Not in use yet -->
	<script src="UnderclassData.js"></script>
</form>
</body>
</html>