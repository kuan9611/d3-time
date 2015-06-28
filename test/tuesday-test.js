var tape = require("tape"),
    time = require("../"),
    date = require("./date");

require("./dateEqual");

tape("tuesdays in an alias for tuesday.range", function(test) {
  test.equal(time.tuesdays, time.tuesday.range);
  test.end();
});

tape("tuesday.floor(date) returns Tuesdays", function(test) {
  test.dateEqual(time.tuesday.floor(date.local(2011, 00, 02, 23, 59, 59)), date.local(2010, 11, 28));
  test.dateEqual(time.tuesday.floor(date.local(2011, 00, 03, 00, 00, 00)), date.local(2010, 11, 28));
  test.dateEqual(time.tuesday.floor(date.local(2011, 00, 03, 00, 00, 01)), date.local(2010, 11, 28));
  test.dateEqual(time.tuesday.floor(date.local(2011, 00, 03, 23, 59, 59)), date.local(2010, 11, 28));
  test.dateEqual(time.tuesday.floor(date.local(2011, 00, 04, 00, 00, 00)), date.local(2011, 00, 04));
  test.dateEqual(time.tuesday.floor(date.local(2011, 00, 04, 00, 00, 01)), date.local(2011, 00, 04));
  test.end();
});

tape("tuesday.count(start, end) counts Tuesdays after start (exclusive) and before end (inclusive)", function(test) {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  test.equal(time.tuesday.count(date.local(2014, 00, 01), date.local(2014, 00, 06)), 0);
  test.equal(time.tuesday.count(date.local(2014, 00, 01), date.local(2014, 00, 07)), 1);
  test.equal(time.tuesday.count(date.local(2014, 00, 01), date.local(2014, 00, 08)), 1);
  test.equal(time.tuesday.count(date.local(2014, 00, 01), date.local(2014, 00, 14)), 2);

  //     January 2013
  // Su Mo Tu We Th Fr Sa
  //        1  2  3  4  5
  //  6  7  8  9 10 11 12
  // 13 14 15 16 17 18 19
  // 20 21 22 23 24 25 26
  // 27 28 29 30 31
  test.equal(time.tuesday.count(date.local(2013, 00, 01), date.local(2013, 00, 07)), 0);
  test.equal(time.tuesday.count(date.local(2013, 00, 01), date.local(2013, 00, 08)), 1);
  test.equal(time.tuesday.count(date.local(2013, 00, 01), date.local(2013, 00, 09)), 1);
  test.end();
});

tape("tuesday.count(start, end) observes daylight saving", function(test) {
  test.equal(time.tuesday.count(date.local(2011, 00, 01), date.local(2011, 02, 13, 01)), 10);
  test.equal(time.tuesday.count(date.local(2011, 00, 01), date.local(2011, 02, 13, 03)), 10);
  test.equal(time.tuesday.count(date.local(2011, 00, 01), date.local(2011, 02, 13, 04)), 10);
  test.equal(time.tuesday.count(date.local(2011, 00, 01), date.local(2011, 10, 06, 00)), 44);
  test.equal(time.tuesday.count(date.local(2011, 00, 01), date.local(2011, 10, 06, 01)), 44);
  test.equal(time.tuesday.count(date.local(2011, 00, 01), date.local(2011, 10, 06, 02)), 44);
  test.end();
});
