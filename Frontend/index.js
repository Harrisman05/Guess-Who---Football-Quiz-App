// npm init
// npm install

("use strict");

// import { random_player } from "./fileReader.js";
// import { summaryArray } from "./fileReader.js";

let summaryArray = [
  "Rory Delap",
  "Delap playing for Stoke City in 2010",
  "",
  "Personal information",
  "Full name Rory John Delap",
  "Date of birth 6 July 1976 (age 45)",
  "Place of birth Sutton Coldfield, England",
  "Height 6 ft 0 in (1.83 m)",
  "Position(s) Midfielder",
  "Club information",
  "Current team Stoke City (first-team coach)",
  "Youth career",
  "1992–1994 Carlisle United",
  "Senior career*",
  "Years Team Apps (Gls)",
  "1994–1998 Carlisle United 65 (7)",
  "1998–2001 Derby County 103 (11)",
  "2001–2006 Southampton 132 (5)",
  "2006–2007 Sunderland 12 (1)",
  "2006 → Stoke City (loan) 2 (0)",
  "2007–2013 Stoke City 178 (8)",
  "2013 → Barnsley (loan) 6 (0)",
  "2013 Burton Albion 6 (1)",
  "Total  504 (33)",
  "National team",
  "1996–1998 Republic of Ireland U21 6 (1)",
  "1998–2004 Republic of Ireland 11 (0)",
  "Teams managed",
  "2019 Stoke City (caretaker)",
  "* Senior club appearances and goals counted for the domestic league only",
];

let random_player = "Rory Delap";

//////////////////////////////////////// Read File to player database array

// done in fileReader. export the array to here

//////////////////////////////////////////// Random Generator on Player database array to obtain chosen random player

/////////////////////////////////////////// Generate chosen player summary

// done in fileReader. export the array to here

///////////////////////////////////////////// Generate personal info
// TODO add regular expression to remove numbers in square brackets from strings
let personalInfo = [];

const generatePersonalInfo = function (summaryArray) {
  while (summaryArray[0] !== "Youth career") {
    let infoItem = summaryArray.splice(0, 1).toString();
    personalInfo.push(infoItem);
  }
};

generatePersonalInfo(summaryArray);

/////////////////////////////////////////////////////// generate youthPeriod

let youthPeriod = [];
let seniorPeriod = [];
let nationalPeriod = [];
let managementPeriod = [];

const generateYouthPeriod = function (summaryArray) {
  if (summaryArray[0] === "Youth career") {
    while (summaryArray[0] !== "Senior career*") {
      // filter the first section (youth career) into separate array
      let item = summaryArray.shift();
      youthPeriod.push(item);
    }
  }
};

generateYouthPeriod(summaryArray);

////////////////////////////////////////////////////// generate SeniorPeriod
const generateSeniorPeriod = function (summaryArray) {
  if (
    summaryArray[0] === "Senior career*" &&
    (summaryArray.includes("National team‡") ||
      summaryArray.includes("National team"))
  ) {
    while (summaryArray[0][0] !== "N") {
      let item = summaryArray.shift(); // filter the second section (senior career) into separate array
      seniorPeriod.push(item);
    }
  } else {
    seniorPeriod = summaryArray;
  }
};

generateSeniorPeriod(summaryArray);

////////////////////////////////////////////////////// generate National Period (if applicable)

const generateNationalPeriod = function (summaryArray) {
  if (summaryArray[0][0] === "N" && summaryArray.includes("Teams managed")) {
    while (summaryArray[0][0] !== "T") {
      // filter the national career into separate array if they have a management career as well
      let item = summaryArray.shift();
      nationalPeriod.push(item);
    }
    managementPeriod = summaryArray; // if they have a management career, the remainder of the summary array will become the management career
  } else if (
    summaryArray.includes("National team‡") ||
    summaryArray.includes("National team")
  ) {
    // make sure non-national and manager types don't get remainder assigned
    nationalPeriod = summaryArray; // if they have a national career and no management career, then the remainder of the summary array will be their national career
  }
};

generateNationalPeriod(summaryArray);

////////////////////////////////////////// log all periods to check they work

console.log(personalInfo);
console.log(youthPeriod);
console.log(seniorPeriod);
console.log(nationalPeriod);
console.log(managementPeriod);

///////////////////////////////////// Create Youth Career specfic arrays for use in html ///////////////////////////////////////////////////////////

let youthYears = [];
let youthClubs = [];

const generateYouthHTMLarrays = function (youthPeriod) {
  youthPeriod.shift(); // removes "youth" string, which is first item in array
  for (let i = 0; i < youthPeriod.length; i++) {
    let splitArray = youthPeriod[i].split(" "); // splits youthPeriod array into groups of strings
    let dateItem = splitArray.shift(); // removes the first string (date) from the group of strings
    youthYears.push(dateItem); // pushes date to its own array
    let rejoinClubs = splitArray.join(" "); // re-join the split array to make them strings again
    youthClubs.push(rejoinClubs); // pushes clubs onto youthClubs array
  }
};

generateYouthHTMLarrays(youthPeriod);

// TODO // could do, could use regular expression to remove [] and 123 characters from robbie savage youth clubs

console.log(youthYears);
console.log(youthClubs);
console.log(youthPeriod);

//   //////////////////////////////////// Senior Career ///////////////////////////////////////////////////////////

let seniorYears = [];
let seniorClubs = [];
let seniorApps = [];
let seniorGoals = [];

const generateSeniorHTMLarrays = function (seniorPeriod) {
  if (seniorPeriod[seniorPeriod.length - 1][0].match(/\d/g) === null) {
    // removes "Total numApps numGoals" from end of array if applicable
    seniorPeriod.pop();
  }

  seniorPeriod.splice(0, 2); // removes "Senior career*" and "Years Team Apps (Gls)" from list

  for (let i = 0; i < seniorPeriod.length; i++) {
    let splitArray = seniorPeriod[i].split(" ");
    let dateItem = splitArray.shift();
    seniorYears.push(dateItem);
    let goalsItem = splitArray.pop();
    seniorGoals.push(goalsItem);
    let appsItem = splitArray.pop();
    seniorApps.push(appsItem);
    let rejoinClubs = splitArray.join(" ");
    seniorClubs.push(rejoinClubs);
  }
};

generateSeniorHTMLarrays(seniorPeriod);

console.log(seniorYears);
console.log(seniorClubs);
console.log(seniorApps);
console.log(seniorGoals);

console.log(seniorPeriod);

//   //////////////////////////////////// International Career ///////////////////////////////////////////////////////////

// Truthy/falsy check. If national period .length is empty (evaluates to zero), it will evaluate to false.
// if true, national length has items in it, so the if code block will execute.

let nationalYears = [];
let nationalGroups = [];
let nationalApps = [];
let nationalGoals = [];

const generateNationalHTMLarrays = function (nationalPeriod) {
  if (Boolean(nationalPeriod.length)) {
    nationalPeriod.splice(0, 1); // this removes first item in array called "national team" so that just data is present

    for (let i = 0; i < nationalPeriod.length; i++) {
      let splitArray = nationalPeriod[i].split(" ");
      let dateItem = splitArray.shift();
      nationalYears.push(dateItem);
      let goalsItem = splitArray.pop();
      nationalGoals.push(goalsItem);
      let appsItem = splitArray.pop();
      nationalApps.push(appsItem);
      let rejoinGroups = splitArray.join(" ");
      nationalGroups.push(rejoinGroups);
    }
  }
};

generateNationalHTMLarrays(nationalPeriod);

console.log(nationalYears);
console.log(nationalGroups);
console.log(nationalApps);
console.log(nationalGoals);

//   //////////////////////////////////// Managerial Career ///////////////////////////////////////////////////////////

let managementYears = [];
let managementClubs = [];

const generateManagementHTMLarrays = function (managementPeriod) {
  if (Boolean(managementPeriod.length)) {
    managementPeriod.shift(); // this removes first item in array called "national team" so that just data is present

    for (let i = 0; i < managementPeriod.length; i++) {
      let splitArray = managementPeriod[i].split(" "); // splits managementPeriod array into groups of strings
      let dateItem = splitArray.shift(); // removes the first string (date) from the group of strings
      managementYears.push(dateItem); // pushes date to its own array
      let rejoinClubs = splitArray.join(" "); // re-join the split array to make them strings again
      managementClubs.push(rejoinClubs); // pushes clubs onto managementClubs array
    }
  }
};

generateManagementHTMLarrays(managementPeriod);

console.log(managementClubs);
console.log(managementYears);
console.log(managementPeriod);

// // ///////////////////////////////////////////// generate html //////////////////////////////////////////////////

console.log(youthYears);
console.log(youthClubs);

let youthTable =
  "<table><thead><tr><th> Years </th> <th> Youth Clubs</th></tr></thead><tbody>";

for (let i = 0; i < youthYears.length; i++) {
  youthTable +=
    "<tr><td>" + youthYears[i] + "</td><td>" + youthClubs[i] + "</td></tr>";
}

youthTable += "</tbody></table>";

console.log(youthTable);

// Display data in HTML table

// let text = document.getElementById("text");

// text.innerHTML = youthTable;

// document
//   .querySelector(".startGameButton")
//   .addEventListener("click", function () {
//     console.log((this.style.color = "red"));
//     console.log("HHHHHHH");
//   });
