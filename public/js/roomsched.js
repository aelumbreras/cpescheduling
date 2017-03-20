$(document).ready(function(){

	//creates room tags base on number of roomname
	var output = '<div class="row fromjqy">';
	$.each(roomnames, function(key, names){
		output += '<div class="col-md-3 col-xs-6">';
		output += '<div id="room' + names + '" class="room-stat panel">';
		output += '<div class="panel-heading text-center panel-vacant">';
		output += '<h3 class="panel-title">Room ' + names + '</h3>';
		output += '</div>';
		output += '<div class="panel-body">';
		output += '<p class="text-center">Vacant</p>';
		output += '</div>';
		output += '</div>';
		output += '</div>';
		if ((key + 1) % 4 == 0) {
			output += '</div>';
			output += '<div class="row fromjqy">';
		}
	});
	output += '</div>';
	$('#rooms-container').html(output);

	function update() {
		$('#clock').html(moment().format('MMMM DD, YYYY ddd h:mm:ss A'));
		if (moment().format('mm:ss') == "30:00" || moment().format('mm:ss') == "00:00") {
			postSched();
		}
	}
	setInterval(update, 300);

	function postSched(){

		var dayToday = moment().format('ddd');
		$.each(schedules, function(key, sched){
			if (sched.day == dayToday && isWithinSched(sched.start, sched.end)) {

				$('#room' + sched.roomtag + ' .panel-heading').removeClass("panel-vacant").addClass("panel-occupied");
				var content = '';
				content += '<p>Schedule: ' 	+ sched.schedule + '</p>';
				content += '<p>Occupant: ' 	+ sched.occupant + '</p>';
				content += '<p>Professor: ' + sched.professor + '</p>';
				$('#room'+ sched.roomtag + ' .panel-body').html(content);
			}
			else {
				$('#room' + sched.roomtag + ' .panel-heading').removeClass("panel-occupied").addClass("panel-vacant");
				$('#room' + sched.roomtag + ' .panel-body').html('<p class="text-center">Vacant</p>');
			}
		});
	}

	function isWithinSched(schedStart, schedEnd) {

		var currentTime= moment(moment(), "HH:mm a");
		var startTime = moment(schedStart, "HH:mm a");
		var endTime = moment(schedEnd, "HH:mm a");

		if ( (startTime.hour() >=12 && endTime.hour() <=12 ) || endTime.isBefore(startTime) ) {

			endTime.add(1, "days");

			if (currentTime.hour() <= 12 ) {
				currentTime.add(1, "days");
			}
		}
		var isBetween = currentTime.isBetween(startTime, endTime);

		return isBetween;

	}

	postSched();


});
