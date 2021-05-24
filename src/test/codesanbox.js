function timeToRFC (dateTime) {
  const rfcTimePattern = /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[\+-]\d{2}:\d{2})?)$/gm;
  if (rfcTimePattern.test(dateTime)) {
    return new Date(dateTime).toISOString();
  }

  var fixedTime = fixTimeStr(dateTime);

  if (!Date.parse(fixedTime)) {
    return dateTime;
  }

  return new Date(fixedTime).toISOString();
}

function fixTimeStr (dateTime) {
  var arr = dateTime.split(' ');
  arr[0] = arr[0].split('-').reverse().join('-') + 'T';
  return arr.join('');
}

console.log('RFC time >>> ',timeToRFC('24-03-2021 01:55:47'));
console.log('RFC time 2 >>> ',timeToRFC('2021-03-23T23:55:47.000Z'));
// console.log(timeToRFC('24-03-2021 01:55:47'));
// console.log(Date.parse('24-03-2021 01:55:47'));
// console.log('Date >>>', new Date('24 03 2021'));
// console.log('My date-time >>>', new Date(2021, 2, 24, 1, 55, 47));
// var birthday = new Date(1995, 11, 17, 3, 24, 0);
