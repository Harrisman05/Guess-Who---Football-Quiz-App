// npm init-y // - generates json file (no need to do again)
// npm install puppeteer (required after every reload)

const puppeteer = require("puppeteer"); // initialise puppeteer library
const fs = require("fs");

const thierryHenry = "Thierry_Henry";
const xavi = "Xavi";

const jamieCarragher = "Jamie_Carragher";

const robbieSavage = "Robbie_Savage";
const arjenRobben = "Arjen_Robben";
const cristianoRonaldo = "Cristiano_Ronaldo";
const androsTownsend = "Andros_Townsend";

const jonTaylor = "Jon_Taylor";

const tonyHibbert = "Tony_Hibbert";
const colinKazimRichards = "Colin Kazim Richards";
const ahmedElmohamady = "Ahmed_Elmohamady";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/" + thierryHenry);

  const careerSummary = await page.evaluate(
    () => document.querySelector("table").innerText
  );

  let summaryArr = careerSummary.split("\n"); // this splits the very long careerSummary string into individual elements in an array

  for (let i = 0; i < summaryArr.length; i++) {
    summaryArr[i] = summaryArr[i].replace(/\t/g, " "); // this removes all the random /t characters within the strings
  }

  let rejoinedSummaryArr = summaryArr.join("\n");

  fs.appendFile(
    `summaries/${thierryHenry}.txt`,
    rejoinedSummaryArr,
    function (err) {
      if (err) throw err;
      console.log("Saved");
    }
  );

  await browser.close();
})();

while (summaryArr[0] !== "Youth career") {
  // this removes all the club information
  summaryArr.splice(0, 1);
}

summaryArr = summaryArr.filter(Boolean); // this filters out any empty strings, as empty strings are falsy

//   while (summaryArr[summaryArr.length - 1][0].match(/\d/g) === null) {
//     // this remove the Senior club appearances and Honours, as the first string of these array    items don't contain a number
//     summaryArr.pop(); // removes the last element in the array
//   }

//   console.log(summaryArr);

//   let youthPeriod = [];
//   let seniorPeriod = [];
//   let nationalPeriod = [];
//   let managementPeriod = [];

//   if (summaryArr[0] === "Youth career") {
//     while (summaryArr[0] !== "Senior career*") {
//       // filter the first section (youth career) into separate array
//       let item = summaryArr.shift();
//       youthPeriod.push(item);
//     }
//   }

//   if (
//     summaryArr[0] === "Senior career*" &&
//     (summaryArr.includes("National team‡") ||
//       summaryArr.includes("National team"))
//   ) {
//     while (summaryArr[0][0] !== "N") {
//       // filter the second section (senior career) into separate array
//       let item = summaryArr.shift();
//       seniorPeriod.push(item);
//     }
//   } else {
//     seniorPeriod = summaryArr;
//   }

//   if (summaryArr[0][0] === "N" && summaryArr.includes("Teams managed")) {
//     // filter the national career into separate array if they have a management career as well
//     while (summaryArr[0][0] !== "T") {
//       let item = summaryArr.shift();
//       nationalPeriod.push(item);
//     }
//     managementPeriod = summaryArr; // if they have a management career, the remainder of the summary array will become the management career
//   } else if (
//     summaryArr.includes("National team‡") ||
//     summaryArr.includes("National team")
//   ) {
//     // make sure non-national and manager types don't get remainder assigned
//     nationalPeriod = summaryArr; // if they have a national career and no management career, then the remainder of the summary array will be their national career
//   }

//   // console.log(summaryArr);
//   // console.log(youthPeriod);
//   // console.log(seniorPeriod);
//   // console.log(nationalPeriod);
//   // console.log(managementPeriod);

//   ///////////////////////////////////// Youth Career ///////////////////////////////////////////////////////////

//   let youthYears = [];
//   let youthClubs = [];

//   youthPeriod.shift(); // removes "youth" string, which is first item in array
//   for (let i = 0; i < youthPeriod.length; i++) {
//     let splitArray = youthPeriod[i].split(" "); // splits youthPeriod array into groups of strings
//     let dateItem = splitArray.shift(); // removes the first string (date) from the group of strings
//     youthYears.push(dateItem); // pushes date to its own array
//     let rejoinClubs = splitArray.join(" "); // re-join the split array to make them strings again
//     youthClubs.push(rejoinClubs); // pushes clubs onto youthClubs array
//   }

//   // console.log(youthClubs);  // could do, could use regular expression to remove [] and 123 characters from robbie savage youth clus
//   // console.log(youthYears);
//   // console.log(youthPeriod);

//   //////////////////////////////////// Senior Career ///////////////////////////////////////////////////////////

//   let seniorYears = [];
//   let seniorClubs = [];
//   let seniorApps = [];
//   let seniorGoals = [];

//   if (seniorPeriod[seniorPeriod.length - 1][0].match(/\d/g) === null) {
//     // removes "Total numApps numGoals" from end of array if applicable
//     seniorPeriod.pop();
//   }

//   seniorPeriod.splice(0, 2); // removes "Senior career*" and "Years Team Apps (Gls)" from list

//   for (let i = 0; i < seniorPeriod.length; i++) {
//     let splitArray = seniorPeriod[i].split(" ");
//     let dateItem = splitArray.shift();
//     seniorYears.push(dateItem);
//     let goalsItem = splitArray.pop();
//     seniorGoals.push(goalsItem);
//     let appsItem = splitArray.pop();
//     seniorApps.push(appsItem);
//     let rejoinClubs = splitArray.join(" ");
//     seniorClubs.push(rejoinClubs);
//   }

//   // console.log(seniorYears);
//   // console.log(seniorClubs);
//   // console.log(seniorApps);
//   // console.log(seniorGoals);

//   // console.log(seniorPeriod);

//   //////////////////////////////////// International Career ///////////////////////////////////////////////////////////

//   // Truthy/falsy check. If national period .length is empty (evaluates to zero), it will evaluate to false.
//   // if true, national length has items in it, so the if code block will execute.

//   if (Boolean(nationalPeriod.length)) {
//     nationalPeriod.splice(0, 1); // this removes first item in array called "national team" so that just data is present

//     let nationalYears = [];
//     let nationalGroups = [];
//     let nationalApps = [];
//     let nationalGoals = [];

//     for (let i = 0; i < nationalPeriod.length; i++) {
//       let splitArray = nationalPeriod[i].split(" ");
//       let dateItem = splitArray.shift();
//       nationalYears.push(dateItem);
//       let goalsItem = splitArray.pop();
//       nationalGoals.push(goalsItem);
//       let appsItem = splitArray.pop();
//       nationalApps.push(appsItem);
//       let rejoinGroups = splitArray.join(" ");
//       nationalGroups.push(rejoinGroups);
//     }

//     // console.log(nationalYears);
//     // console.log(nationalGroups);
//     // console.log(nationalApps);
//     // console.log(nationalGoals);
//   }

//   //////////////////////////////////// Managerial Career ///////////////////////////////////////////////////////////

//   if (Boolean(managementPeriod.length)) {
//     managementPeriod.shift(); // this removes first item in array called "national team" so that just data is present

//     let managementYears = [];
//     let managementClubs = [];

//     for (let i = 0; i < managementPeriod.length; i++) {
//       let splitArray = managementPeriod[i].split(" "); // splits managementPeriod array into groups of strings
//       let dateItem = splitArray.shift(); // removes the first string (date) from the group of strings
//       managementYears.push(dateItem); // pushes date to its own array
//       let rejoinClubs = splitArray.join(" "); // re-join the split array to make them strings again
//       managementClubs.push(rejoinClubs); // pushes clubs onto managementClubs array
//     }

//     // console.log(managementClubs);
//     // console.log(managementYears);
//     // console.log(managementPeriod);
//   }

// ///////////////////////////////////////////// generate html //////////////////////////////////////////////////

// // youthTable = "<table><thead><tr><th> Years </th> <th> Youth Clubs</th></tr></thead><tbody>";

// // for (let i = 0; i < youthYears.length; i++) {
// //     youthTable += "<tr><td>"  + youthYears[i] + "</td><td>" + youthClubs[i] + '</td></tr>';
// // }

// // youthTable += "</tbody></table>";

// // // Display data in HTML table

// // youthTableHTML.innerHTML = youthTable;
