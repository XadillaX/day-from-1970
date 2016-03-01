/**
 * Created by XadillaX on 2014/4/8.
 */
require("should");
var moment = require("moment");
var df = require("../");

describe("Test", function() {
    it("should finish a loop", function() {
        this.timeout(20000);
        var current = 23934;
        var day = 1;
        var week = 1;
        var month = 1;
        var year = 1;
        var cm = moment.unix(current);
        var pm = null;

        while(cm.year() !== 2222) {
            var tmp = df(cm.unix(), 0);

            // console.log(tmp, current, cm.format());
            tmp.day.should.be.eql(day);
            tmp.week.should.be.eql(week);
            tmp.month.should.be.eql(month);
            tmp.year.should.be.eql(year);

            current += 86400;
            pm = cm;
            cm = moment.unix(current);
            if(cm.year() !== pm.year()) {
                year++;
                month++;
                if(cm.day() === 0) week++;
                day++;
            } else if(cm.month() !== pm.month()) {
                month++;
                if(cm.day() === 0) week++;
                day++;
            } else if(cm.week() !== pm.week()) {
                week++;
                day++;
            } else {
                day++;
            }
        }
    });
});
