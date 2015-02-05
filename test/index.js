/**
 * Created by XadillaX on 2014/4/8.
 */
var df1970 = require("../");

var t = 1420041600;
var list1 = [];
var list2 = [];
for(var i = 0; i < 10; i++) {
    list1.push(df1970(t, 0));
    list2.push(df1970(t));
    t += 86400;
}

console.log(list1);
console.log(list2);

var t = 57600;
var list3 = [];
var list4 = [];
for(var i = 0; i < 10; i++) {
    list3.push(df1970(t, 0));
    list4.push(df1970(t));
    t += 86400;
}

console.log(list3);
console.log(list4);

