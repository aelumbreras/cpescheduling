var options = {
  valueNames: ['_id', 'day', 'start', 'end', 'roomtag', 'schedule', 'occupant', 'professor'],
  item: '<tr><td class="_id" hidden><td class="day" hidden><td class="start" hidden><td class="end" hidden></td><td class="roomtag"></td><td class="schedule"></td><td class="occupant"></td><td class="professor"></td></tr>'
};

var userList = new List('users', options, servToClient);
