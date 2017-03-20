$(document).ready(function(){

	//aesthetics
	$('#users tbody tr').css("background-color", "rgba(19, 35, 47, 0.9)");

	//unlighted row
	$(document).click(function(e) {
	   if(!$(e.target).is('#users td, .crudBtn')) {
	 		$('#users tbody tr').removeClass('clicked');
			$('#users tbody tr').css("background-color", "rgba(19, 35, 47, 0.9");
			$('#btnEdit, #btnDelete').attr("disabled", "true");
	 	}
	});

	//populate End & Start Selection
	var selectItems = "";
	$.each(time, function(i, t){
		selectItems += '<option>' + t + '</option>';
	});
	$('#inputStartTime, #inputEndTime').html(selectItems);
	$('#inputStartTime, #inputEndTime').addClass('selectpicker');

	//selectpicker.js
	$('.selectpicker').selectpicker();

	//submitting
	$('.modal-footer #submit').on('click', function(){
		$('.modal-footer span').text('Submitting...');
	})

	//table-sorting aesthetics
	$('#users th').on('click', function() {
		$('span').removeClass('selected');
		$('span', this).addClass('selected');
		var spanTxt = $('span', this).text();
		if (spanTxt == "▲") {
			$('span', this).text('▼');
		}
		else {
			$('span', this).text('▲');
		}
		$('th span').not('span.selected').text('');
	});

	//highlight selected row
	$('#users tbody tr').on('click', function() {
		$('#users tbody tr').removeClass('clicked');
		$(this).addClass('clicked');
		$('#users tbody tr').css("background-color", "rgba(19, 35, 47, 0.9");
		$('#btnEdit, #btnDelete').removeAttr("disabled");
		$(this).css("background-color", "#315c7f");
	});

	//CUD Handler
	$('#search-container .crudBtn').on('click', function() {
		$('#schedModal select, #schedModal .dropdown-toggle').removeAttr("disabled style");
		$('#submit').text('Submit');
		if ($(this).is('#btnAdd')) {
			$('#schedModal form').attr("action", "/insert");
			$('.modal-title').text('Add A Schedule');
			$('#idHolder').val('');
			$('#schedModal select').selectpicker('val');
		}
		else if ($(this).is('#btnEdit')) {
			$('#schedModal form').attr("action", "/update");
			$('.modal-title').text('Edit Schedule');
			$('#idHolder').val($('.clicked ._id').text());
			$('#inputRoom').selectpicker('val', $('.clicked .roomtag').text());
			$('#inputDay').selectpicker('val', $('.clicked .day').text());
			var occupant = $('.clicked .occupant').text().split('-');
			$('#inputYear').selectpicker('val', occupant[0]);
			$('#inputSection').selectpicker('val', occupant[1]);
			$('#inputEndTime').selectpicker('val', $('.clicked .end').text());
			$('#inputStartTime').selectpicker('val', $('.clicked .start').text());
			$('#inputProf').selectpicker('val', $('.clicked .professor').text());
		}else { //btnDel
				$('#schedModal form').attr("action", "/delete");
				$('.modal-title').text('Delete This Schedule?');
				$('#idHolder').val($('.clicked ._id').text());
				$('#inputRoom').selectpicker('val', $('.clicked .roomtag').text());
				$('#inputDay').selectpicker('val', $('.clicked .day').text());
				var occupant = $('.clicked .occupant').text().split('-');
				$('#inputYear').selectpicker('val', occupant[0]);
				$('#inputSection').selectpicker('val', occupant[1]);
				$('#inputEndTime').selectpicker('val', $('.clicked .end').text());
				$('#inputStartTime').selectpicker('val', $('.clicked .start').text());
				$('#inputProf').selectpicker('val', $('.clicked .professor').text());
				$('#submit').text('Yes');
				$('#schedModal select, #schedModal .dropdown-toggle').attr("disabled", "true").css("cursor", "not-allowed");
		}
	});


	//clock
	function update() {
		$('#clock').html(moment().format('MMMM DD, YYYY ddd h:mm:ss A'));
	}
	setInterval(update, 300);

});
