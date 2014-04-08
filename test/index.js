/**
 * Created by XadillaX on 2014/4/8.
 */
var df1970 = require("../");

var t = 1396946977;
var list = [];
for(var i = 0; i < 10; i++) {
    list.push(df1970(t));
    t += 86400;
}

console.log(list);
