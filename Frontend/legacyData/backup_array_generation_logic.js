////////////////////////////////////////// Generate chosen player summary

// const generateChosenPlayerSummary = function (chosenPlayer) {
//   console.log(player);

// let chosenPlayerSummary = fs.readFileSync(
//   `summaries/${chosenPlayer}.txt`,
//   "utf8"
// );
// chosenPlayerSummary = chosenPlayerSummary.split("\n");
// console.log(chosenPlayerSummary);
// while (
//   chosenPlayerSummary[chosenPlayerSummary.length - 1][0].match(/\d/g) === null
// ) {
//   chosenPlayerSummary.pop();
// }
// chosenPlayerSummary = chosenPlayerSummary.filter(Boolean);
// return chosenPlayerSummary;
// // };

// let summaryArray = generateChosenPlayerSummary(random_player);

// ///////////////////////////////////////////// Generate personal info
// // TODO add regular expression to remove numbers in square brackets from strings
// let personalInfo = [];

// const generatePersonalInfo = function (summaryArray) {
//   while (summaryArray[0] !== "Youth career") {
//     let infoItem = summaryArray.splice(0, 1).toString();
//     personalInfo.push(infoItem);
//   }
// };

// generatePersonalInfo(summaryArray);

// /////////////////////////////////////////////////////// generate youthPeriod

// let youthPeriod = [];
// let seniorPeriod = [];
// let nationalPeriod = [];
// let managementPeriod = [];

// const generateYouthPeriod = function (summaryArray) {
//   if (summaryArray[0] === "Youth career") {
//     while (summaryArray[0] !== "Senior career*") {
//       // filter the first section (youth career) into separate array
//       let item = summaryArray.shift();
//       youthPeriod.push(item);
//     }
//   }
// };

// generateYouthPeriod(summaryArray);

// ////////////////////////////////////////////////////// generate SeniorPeriod
// const generateSeniorPeriod = function (summaryArray) {
//   if (
//     summaryArray[0] === "Senior career*" &&
//     (summaryArray.includes("National team‡") ||
//       summaryArray.includes("National team"))
//   ) {
//     while (summaryArray[0][0] !== "N") {
//       let item = summaryArray.shift(); // filter the second section (senior career) into separate array
//       seniorPeriod.push(item);
//     }
//   } else {
//     seniorPeriod = summaryArray;
//   }
// };

// generateSeniorPeriod(summaryArray);

// ////////////////////////////////////////////////////// generate National Period (if applicable)

// const generateNationalPeriod = function (summaryArray) {
//   if (summaryArray[0][0] === "N" && summaryArray.includes("Teams managed")) {
//     while (summaryArray[0][0] !== "T") {
//       // filter the national career into separate array if they have a management career as well
//       let item = summaryArray.shift();
//       nationalPeriod.push(item);
//     }
//     managementPeriod = summaryArray; // if they have a management career, the remainder of the summary array will become the management career
//   } else if (
//     summaryArray.includes("National team‡") ||
//     summaryArray.includes("National team")
//   ) {
//     // make sure non-national and manager types don't get remainder assigned
//     nationalPeriod = summaryArray; // if they have a national career and no management career, then the remainder of the summary array will be their national career
//   }
// };

// generateNationalPeriod(summaryArray);

// ////////////////////////////////////////// log all periods to check they work

// console.log(personalInfo);
// console.log(youthPeriod);
// console.log(seniorPeriod);
// console.log(nationalPeriod);
// console.log(managementPeriod);

// ///////////////////////////////////// Create Youth Career specfic arrays for use in html ///////////////////////////////////////////////////////////

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

////// fileReader code

// ("use strict");

// import fs from "fs";

//////////////////////////////// back up generate html tables

// // // ///////////////////////////////////////////// generate html //////////////////////////////////////////////////

////////////////////////////////////////// Generate youthTableHTML

let youthTable =
  "<table><thead><tr><th> Years </th> <th> Youth Clubs</th></tr></thead><tbody>";

for (let i = 0; i < youthClubs.length; i++) {
  let clubEmoji;

  if (youthClubs[i].includes("→")) {
    clubEmoji = youthClubs[i].split(" ");
    clubEmoji.pop();
    clubEmoji.shift();
    clubEmoji = clubEmoji.join(" ");
  } else {
    clubEmoji = youthClubs[i];
  }

  youthYears[i] === undefined
    ? (youthYears[i] = "")
    : (youthYears[i] = youthYears[i]);

  youthTable +=
    "<tr><td>" +
    youthYears[i] +
    "</td><td>" +
    youthClubs[i] +
    `<img src='/clubEmojis/${clubEmoji}.png' height='20px' width='20px' alt=''/>` +
    "</td></tr>";
}

youthTable += "</tbody></table>";

let youthTableHTML = document.getElementById("youth");

youthTableHTML.innerHTML = youthTable;

// ////////////////////////////////////////// Generate seniorTableHTML

let seniorTable =
  "<table><thead><tr><th> Years </th> <th> Senior Clubs </th> <th> Senior Apps </th> <th> Senior Goals </th> </tr></thead><tbody>";

for (let i = 0; i < seniorYears.length; i++) {
  let clubEmoji;

  if (seniorClubs[i].includes("→")) {
    clubEmoji = seniorClubs[i].split(" ");
    clubEmoji.pop();
    clubEmoji.shift();
    clubEmoji = clubEmoji.join(" ");
  } else {
    clubEmoji = seniorClubs[i];
  }

  seniorTable +=
    "<tr><td>" +
    seniorYears[i] +
    "</td><td>" +
    seniorClubs[i] +
    `<img src='/clubEmojis/${clubEmoji}.png' height='20px' width='20px' alt=''/>` +
    "</td><td>" +
    seniorApps[i] +
    "</td> <td>" +
    seniorGoals[i] +
    "</td> </tr>";
}

seniorTable += "</tbody></table>";

console.log(seniorTable);

let seniorTableHTML = document.getElementById("senior");

seniorTableHTML.innerHTML = seniorTable;

////////////////////////////////////////// Generate nationalTableHTML

let nationalTable =
  "<table><thead><tr><th> Years </th> <th> National Groups </th> <th> Apps </th> <th> Goals </th> </tr></thead><tbody>";

for (let i = 0; i < nationalYears.length; i++) {
  let clubEmoji;

  if (nationalGroups[i].includes("→")) {
    clubEmoji = nationalGroups[i].split(" ");
    clubEmoji.pop();
    clubEmoji.shift();
    clubEmoji = clubEmoji.join(" ");
  } else {
    clubEmoji = nationalGroups[i];
  }

  nationalTable +=
    "<tr> <td>" +
    nationalYears[i] +
    "</td> <td>" +
    nationalGroups[i] +
    `<img src='/clubEmojis/${clubEmoji}.png' height='20px' width='20px' alt=''/>` +
    "</td> <td>" +
    nationalApps[i] +
    "</td> <td>" +
    nationalGoals[i] +
    "</td> </tr>";
}

nationalTable += "</tbody></table>";

console.log(nationalTable);

let nationalTableHTML = document.getElementById("national");

nationalTableHTML.innerHTML = nationalTable;

////////////////////////////////////////// Generate ManagementTableHTML

let managementTable =
  "<table><thead><tr><th> Years </th> <th> Teams Managed </th> </tr></thead><tbody>";

for (let i = 0; i < managementYears.length; i++) {
  let clubEmoji;

  if (managementClubs[i].includes("→")) {
    clubEmoji = managementClubs[i].split(" ");
    clubEmoji.pop();
    clubEmoji.shift();
    clubEmoji = clubEmoji.join(" ");
  } else {
    clubEmoji = managementClubs[i];
  }

  managementTable +=
    "<tr> <td>" +
    managementYears[i] +
    "</td><td>" +
    managementClubs[i] +
    `<img src='/clubEmojis/${clubEmoji}.png' height='20px' width='20px' alt=''/>` +
    "</td> </tr>";
}

managementTable += "</tbody></table>";

console.log(managementTable);

let managementTableHTML = document.getElementById("management");

managementTableHTML.innerHTML = managementTable;

let summaryTable = "";
