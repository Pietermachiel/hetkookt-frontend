// var newdate = new Date();
// var year = newdate.getFullYear();
// const month = newdate.getMonth();
// const date = newdate.getDate();
// const seconds = newdate.setDate(newdate.getDate());
// console.log("newdate");
// console.log(newdate); // Fri Feb 28 2020 09:43:38 GMT+0100 (Midden-Europese standaardtijd)
// console.log(year); // 2020
// console.log(month); // 1 ???
// console.log(date); //28

var day = new Date();
var next1Day = new Date(day);
next1Day.setDate(day.getDate() + 1);
var next2Day = new Date(day);
next2Day.setDate(day.getDate() + 2);

const event = new Date(); // new Date(Date.UTC(2012, 11, 20, 3, 0, 0))  -> expected output: donderdag 20 december 2012
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

const today = event.toLocaleDateString("nl-NL", options);

// console.log(event);
// console.log(today); // vandaag
// console.log(year);
// console.log(month);
// console.log(date);
// console.log(seconds);
// console.log(next1Day);
// const tomorrow = next1Day.toLocaleDateString("nl-NL", options);
// console.log(tomorrow); // morgen
// const overmorgen = next2Day.toLocaleDateString("nl-NL", options);
// console.log(overmorgen); // morgen

export default today;
