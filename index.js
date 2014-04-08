/**
 * Created by XadillaX on 2014/4/8.
 */
/**
 * Calculate out witch day, month, year and week from 1970.1.1 via one timestamp.
 *
 *                                                              (-- Algorithm by HXJ)
 *
 * @param timestamp     timestamp
 * @param [first]       first day of a week
 * @returns {{ day: Number, week: Number, month: Number, year: Number }}
 */
function witch(timestamp, first) {
    if(undefined === first) first = 7;

    var month = [ 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    var witchdate = {};

    var p = 0;

    // calculate the dayspan between timestamp and 1970/1/1
    var tday = parseInt(timestamp / 86400);

    // how much the dayspan is, the nth day is (dayspan + 1)
    witchdate.day = tday + 1;

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
    if(n === 0) {
        n = 7;
    }

    // If witchday.day <= n, that means it's first week.
    if(witchdate.day <= n) {//如果第几天小于等于这个n，说明在第一周内
        witchdate.week = 1;
    } else {
        // Get the count of week.
        witchdate.week = parseInt((witchdate.day - n - 1) / 7) + 2;
    }

    // month and year.
    witchdate.month = tyear * 12 + tmon + 1;
    witchdate.year = tyear + 1;

    return witchdate;
}

module.exports = witch;
