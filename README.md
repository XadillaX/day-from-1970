Day From 1970
=============

A node.js module of calculating out witch day, month, year and week from 1970.1.1 via one timestamp.

Application Scenario
-------------

When you want to `GROUP` data `by` ***Week***, ***Day***, ***Month*** and ***Year***, maybe you need it.

This module allows you to pass an `integer` of timestamp as a parameter, and it will calculate out which day is this timestamp from `1970/01/01`, which week is this timestamp from `1970/01/01`, which month and even witch year.

Installation
-------------

```sh
$ npm install day-from-1970
```

Usage
-------------

```javascript
df1970(timestamp, firstday);
```

Timestamp above is the timestamp of one second. And the second parameter is opitional, witch stands for the first day of one week.

> 1 stands for Monday and 7 stands for Sunday. And you can pass 1 ~ 7 as the second parameter.

And it will return an object like:

```json
{
  "day": 16169,
  "week": 2311,
  "month": 532,
  "year": 45
}
```

So the test code is below:

```javascript
var df1970 = require("day-from-1970");
var t = 1396946977;
var list = [];
for(var i = 0; i < 10; i++) {
    list.push(df1970(t));
    t += 86400;
}

console.log(list);
```

Thanks For
-------------

Thanks for `HXJ` to write the C++ version.

Contribute
-------------

If you want to contribute to this repo, you can contact me:

  + admin#xcoder.in
  + [Weibo](http://weibo.com/xadillax)
