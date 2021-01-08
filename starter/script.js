'use strict';
const booking = [];
const createBooking = function (flightNum, numOfPass = 1, price = 199) {
  //before es6 we would set default values of nummOf Pass forexample like this: numOfPass= numOfPass || 1;(this is schort circuting and since numOfPass is falsy, it will become 1)
  //price =price || 199 (same here)

  const bookingArray = {
    flightNum,
    numOfPass,
    price,
  };
  console.log(bookingArray);
  booking.push(bookingArray);
};

createBooking('LH123');
createBooking('LH123', 2, 800);

const flight = 'lh123';
const marija = {
  name: 'Marija',
  passport: 2338485843,
};

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH12333';
//   passenger.name = 'Sasa and ' + passenger.name;
//   if (passenger.passport === 2338485843) {
//     alert('check in');
//   } else {
//     alert('Wrong passport');
//   }
// };
// checkIn(flight, marija);
// console.log(flight, marija);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000);
// };

// newPassport(marija);
// checkIn(flight, marija);
// console.log(flight, marija);

//Higher order functions and first class functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fun) {
  console.log(`original string: ${str}`);
  console.log(`Transormed string: ${fun(str)}`);
  console.log(`Tranformed by ${fun.name}`);
};
transformer('JavaSript is the best', upperFirstWord);
transformer('JavaSript is the best', oneWord);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas');

const transformer1 = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};

transformer1('hey')('marija');

//Call and Apply Methods

const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  //enhanced object literal syntax
  book(flightNum, passName) {
    console.log(
      `${passName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, passName });
  },
};

lufthansa.book(234, 'Marija Stojanovic');
lufthansa.book(267, 'Sasa Stojanovic');
console.log(lufthansa);

const eurowings = {
  airline: 'EuroWings',
  iataCode: 'EW',
  bookings: [],
};
//Call method to manupulate "this"
const book = lufthansa.book;
book.call(eurowings, 23, 'Sarah Smith');
console.log(eurowings);

book.call(lufthansa, 230, 'Mary Jones');
console.log(lufthansa);

//Apply method but takes in [] as argument
const flightData = [543, 'George Jones'];
book.apply(eurowings, flightData);
console.log(eurowings);

book.call(lufthansa, ...flightData);
console.log(lufthansa);

//Bind method to manipulate the "this" keyword explicitly
//doesn't call the function immediately, but returns new function where "this" is bound(set to whatever value we pass into bind)

//define bind once and then you can call it
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
bookEW(34, 'Stephan Jack');
bookLH(344, 'George Costanza');

const bookEW23 = book.bind(eurowings, 23); //preset some arguments(partial application-some parametars are already pre-applied)
bookEW23('martha');

//With event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(23));

const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
console.log(addTax2(0.3)(2000));

//Challenge

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JS', '1: Python', '2: Java', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    console.log(this.answers);
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are  ${this.answers.join(',')}`);
    }
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [4, 5, 6, 3] }, 'string');
