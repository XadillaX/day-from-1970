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

        if(undefined === first) first = 7;

        var month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var whichdate = {};

        // calculate the dayspan between timestamp and 1970/1/1
        var tday = parseInt(timestamp / 86400);

        // how much the dayspan is, the nth day is (dayspan + 1)
        whichdate.day = tday + 1;

        var tmon = 0;
        var tyear = 0;
        var startyear = 1970;

        // there are 11323 days from 1970-1-1 to 2000-12-31
        if(tday > 11323) {
            tyear += 31;
            tday -= 11323;
            startyear = 2001;
        }

        // every 400 years have 97 leap years, that is 146097 days.
        tyear += parseInt(tday / 146097) * 400;
        tday %= 146097;

        // then every 100 years have 24 leap years, that is 36524 days.
        tyear += parseInt(tday / 36524) * 100;
        tday %= 36524;

        // then every 4 years have 1 leap year, that is 1461 days.
        tyear += parseInt(tday / 1461) * 4;
        tday %= 1461;

        if(startyear === 1970) {
            if(tday >= 365 * 2 + 366) {
                // Most 3 years left...
                tyear += 3;
                tday -= (365 * 2 + 366);
            } else if(tday >= 365 * 2) {
                // Or 2 years left...
                tyear += 2;
                tday -= (365 * 2);
            } else if(tday >= 365) {
                // Or 1 year...
                tyear += 1;
                tday -= 365;
            }
        } else {
            if(tday >= 365 * 3) {
                // Most 3 years left...
                tyear += 3;
                tday -= (365 * 3);
            } else if(tday >= 365 * 2) {
                // Or 2 years left...
                tyear += 2;
                tday -= (365 * 2);
            } else if(tday >= 365) {
                // Or 1 year...
                tyear += 1;
                tday -= 365;
            }
        }

        // If `tyear % 4` equals to 2, that means this year is a loop year.
        if((1970 + tyear) % 400 === 0 || ((1970 + tyear) % 4 === 0 && (1970 + tyear) % 100 !== 0)) {
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
