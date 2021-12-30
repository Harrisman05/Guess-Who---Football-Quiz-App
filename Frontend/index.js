// npm init
// npm install

// npm install puppeteer (required after every reload)

"use strict";

const fs = require("fs");

// const sumString = "dsalkhfgl;akshdf;;lhio";

// fs.appendFileSync(`summaries/sumString.txt`, sumString); LEC Checking that fs is working!

const thString = fs.readFile(
  "summaries/Thierry_Henry.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Saved!");
  }
);

while (summaryArr[0] !== "Youth career") {
  // this removes all the club information
  summaryArr.splice(0, 1);
}

summaryArr = summaryArr.filter(Boolean); // this filters out any empty strings, as empty strings are falsy
