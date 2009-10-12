var start;
var end;
var range;

module("date range default behavior", {
  setup: resetRange
});

test("creates dange of three days", function() {
  equals(range.start, start);
  equals(range.end, end);
  equals(range.days(), 3);
  ok(!range.hasDate(new Date('09/9/2009')));
  ok(range.hasDate(new Date('09/10/2009')));
  ok(range.hasDate(new Date('09/11/2009')));
  ok(range.hasDate(new Date('09/12/2009')));
  ok(!range.hasDate(new Date('09/13/2009')));
});

test("range is movable", function() {
  range.shiftDays(2);
  equals(range.start.getDate(), 12);
  equals(range.end.getDate(), 12 + 2);
});

test("range is expandable", function() {
  range.expandTo(new Date('09/15/2009'));
  equals(range.days(), 6);
});

test("two ranges can do interception", function() {
  var range2 = new DateRange(new Date('09/11/2009'), new Date('09/19/2009'));
  equals(range.and(range2).days(), 2);
  range2 = new DateRange(new Date('09/16/2009'), new Date('09/19/2009'));
  equals(range.and(range2).days(), 0);
});

module("date range with time behavior", {
  setup: resetRange
});

test("date range can have times", function() {
  range.setTimes('10:00','14:30');
  equals(range.days(), 2);
  equals(range.hours(), 4);
  equals(range.minutes(), 30);
  equals(range.toString(), "2 Päivää 4,5 tuntia");
  range.setTimes('17:00', '16:00');
  equals(range.days(), 1);
  equals(range.hours(), 23);
  equals(range.minutes(), 0);


});

function resetRange() {
  start = new Date('09/10/2009');
  end = new Date('09/12/2009');
  range = new DateRange(end, start);
}