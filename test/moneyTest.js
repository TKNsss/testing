import formatCurrency from "../scripts/utils/money.js";

// automated testing = using code to test code
/* 
  2 types of test cases
  - basic test cases = tests if the code is working
  - edge cases = tests with values that are tricky
*/
// testing framework = external library that helps us write tests easier
// most testing framework are similar (Jest for ReactJS, MochaJS)

console.log("test suite: formatCurrency");

console.log("converts cents into dollars");

// basic test case
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("works with 0");

// edge test cases
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up to the nearest cent");

if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

// group of related tests = test suite
// ctrl + = to zoom in (web page)
