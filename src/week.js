import interval from "./interval";

function weekday(i) {
  return interval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
  }, function(date, offset) {
    date.setDate(date.getDate() + offset * 7);
  }, function(start, end) {
    return Math.floor((end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5);
  });
}

export var sunday = weekday(0);
export var monday = weekday(1);
export var tuesday = weekday(2);
export var wednesday = weekday(3);
export var thursday = weekday(4);
export var friday = weekday(5);
export var saturday = weekday(6);
export default sunday;
