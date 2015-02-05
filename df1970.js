/**
 * Created by XadillaX on 2014/4/8.
 */
"use strict";

var df1970 = (function() {
    function _getCurrentTimezone() {
        return -parseInt((new Date()).getTimezoneOffset() / 60);
    }

    /**
     * Calculate out which day, month, year and week from 1970.1.1 via one timestamp.
     *
     *                                                              (-- Algorithm by HXJ)
     * @param timestamp     timestamp
     * @param [timezone]    the timezone, default to your current timezone
     * @param [first]       first day of a week
     * @returns {{ day: Number, week: Number, month: Number, year: Number }}
     */
    function which(timestamp, timezone, first) {
        if(undefined === timezone) {
            // default to current timezone
            timezone = _getCurrentTimezone();
        } else {
            var temp = parseInt(timezone);
            if(!isNaN(temp)) {
                if(Math.abs(temp) > 12) {
                    temp = parseInt(temp / 60);
                }

                timezone = temp;
            } else {
                timezone = _getCurrentTimezone();
            }
        }

        timestamp += (timezone * 3600);
        console.log(timestamp);

        if(undefined === first) first = 7;

        var month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var whichdate = {};

        // calculate the dayspan between timestamp and 1970/1/1
        var tday = parseInt(timestamp / 86400);

        // how much the dayspan is, the nth day is (dayspan + 1)
        whichdate.day = tday + 1;

        var tmon = 0;
        var tyear = 0;

        // every four years have one leap year, that is 1461 days.
        tyear += parseInt(tday / 1461) * 4;
        tday %= 1461;

        // Most 3 years left...
        if(tday >= 365 * 2 + 366) {
            tyear += 3;
            tday -= (365 * 2 + 366);
        }

        // Or 2 years left...
        if(tday >= 365 * 2) {
            tyear += 2;
            tday -= (365 * 2);
        }

        // Or 1 year...
        if(tday >= 365) {
            tyear += 1;
            tday -= 365;
        }

        // If `tyear % 4` equals to 2, that means this year is a loop year.
        if(tyear % 4 === 2) {
            month[2] = 29;
        }

        // traversal for 12 month.
        var i = 1;
        while(tday - month[i] >= 0 && i < 13) {
            tmon++;
            tday -= month[i];
            i++;
        }

        // change it back to nonleap year.
        month[2] = 28;

        // the day count of first week as `first` is the first day of one week
        // because 1970/1/1 is Thursday
        var n = (first + 3) % 7;

        // first week can't be 0, so it's 7.
        n = !n ? 7 : n;

        // If whichday.day <= n, that means it's first week.
        if(whichdate.day <= n) {
            // 如果第几天小于等于这个n，说明在第一周内
            whichdate.week = 1;
        } else {
            // Get the count of week.
            whichdate.week = parseInt((whichdate.day - n - 1) / 7) + 2;
        }

        // month and year.
        whichdate.month = tyear * 12 + tmon + 1;
        whichdate.year = tyear + 1;

        return whichdate;
    }

    if(typeof exports !== "undefined") module.exports = which;

    return which;
})();

if(typeof df1970 !== "function") {
    console.warn("Broken function of df1970.");
}

