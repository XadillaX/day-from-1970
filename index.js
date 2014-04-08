/**
 * Created by XadillaX on 2014/4/8.
 */
/**
 * Calculate out witch day, month, year and week from 1970.1.1 via one timestamp.
 *
 *                                                                 (Algorithm by HXJ)
 *
 * @param timestamp     timestamp
 * @param [first]       first day of a week
 * @returns {{}}
 */
function witch(timestamp, first) {
    if(undefined === first) first = 7;

    var month = [ 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    var p = 0;
    var tday = parseInt(timestamp / 86400);

    var witchdate = {};

    // 第几天
    witchdate.day = tday + 1;

    var tmon = 0;
    var tyear = 0;
    tyear += parseInt(tday / 1461) * 4;
    tday %= 1461;
    if(tday >= 365 * 2 + 366) {
        tyear += 3;
        tday -= (365 * 2 + 366);
    }
    if(tday >= 365 * 2) {
        tyear += 2;
        tday -= (365 * 2);
    }
    if(tday >= 365) {
        tyear += 1;
        tday -= 365;
    }

    if(tyear % 4 === 2) {
        month[2] = 29;
    }
    var i = 1;
    while(tday - month[i] >= 0 && i < 13) {
        tmon++;
        tday -= month[i];
        i++;
    }
    month[2] = 28;
    var n = (first + 3) % 7;
    if(n === 0) {
        n = 7;
    }
    if(witchdate.day <= n) {
        witchdate.week = 1;
    } else {
        witchdate.week = parseInt((witchdate.day - n - 1) / 7) + 2;
    }
    witchdate.month = tyear * 12 + tmon + 1;
    witchdate.year = tyear + 1;

    return witchdate;
}

module.exports = witch;
