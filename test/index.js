/**
 * Created by XadillaX on 2014/4/8.
 */
require("should");
var moment = require("moment");
var df = require("../");

describe("Test", function() {
    it("should finish a loop in UTC", function() {
        this.timeout(20000);
        var current = 80000;
        var day = 1;
        var week = 1;
        var month = 1;
        var year = 1;
        var cm = moment.unix(current).utc();
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
            cm = moment.unix(current).utc();
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

    it("should finish a loop in +8", function() {
        this.timeout(20000);
        var current = 80000;
        var day = 2;
        var week = 1;
        var month = 1;
        var year = 1;
        var cm = moment.unix(current).utc(8);
        var pm = null;

        while(cm.year() !== 2222) {
            var tmp = df(cm.unix(), 8);

            // console.log(tmp, current, cm.format());
            tmp.day.should.be.eql(day);
            tmp.week.should.be.eql(week);
            tmp.month.should.be.eql(month);
            tmp.year.should.be.eql(year);

            current += 86400;
            pm = cm;
            cm = moment.unix(current).utc(8);
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
