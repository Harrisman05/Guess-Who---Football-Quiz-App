// npm init
// npm install

("use strict");

import { playerDatabase } from "./playersDatabase.js";

//////////////////////////////////////// Read File to player database array

const generatePlayerDatabaseArray = function (playerDatabase) {
  let playerDatabaseArray = playerDatabase.split("\n");

  for (let i = 0; i < playerDatabaseArray.length; i++) {
    playerDatabaseArray[i] = playerDatabaseArray[i].replace(/\r/g, ""); // this removes all the random /r characters within the strings
  }

  playerDatabaseArray = playerDatabaseArray.filter(Boolean); // remove all empty strings

  return playerDatabaseArray;
};

let playerDatabaseArray = generatePlayerDatabaseArray(playerDatabase);

//////////////////////////////////////////// Random Generator on Player database array to obtain chosen random player

const chooseRandomPlayer = function (playerDatabaseArray) {
  let randomNum = Math.floor(Math.random() * playerDatabaseArray.length);

  return playerDatabaseArray[randomNum];
};

let random_player = chooseRandomPlayer(playerDatabaseArray);

console.log(random_player);

random_player = "Luke Young"; // Luke Young, Ugo Ehiogu, Sylvain Distin

import(`./summariesJS/${random_player}.js`).then((player) => {
  ///////////////////////////////////////// Generate chosen player summary

  let chosenPlayerSummary = player.player;

  chosenPlayerSummary = chosenPlayerSummary.split("\n");

  console.log(chosenPlayerSummary);

  chosenPlayerSummary = chosenPlayerSummary.filter(Boolean);

  while (
    chosenPlayerSummary[chosenPlayerSummary.length - 1][0].match(/\d/g) === null
  ) {
    chosenPlayerSummary.pop();
  }

  let summaryArray = chosenPlayerSummary;

  console.log(summaryArray);

  /////////////////////////////////////////// Generate personal info
  // TODO add regular expression to remove numbers in square brackets from strings
  let personalInfo = [];

  const generatePersonalInfo = function (summaryArray) {
    while (
      summaryArray[0] !== "Youth career" &&
      summaryArray[0] !== "Senior career*"
    ) {
      let infoItem = summaryArray.splice(0, 1).toString();
      personalInfo.push(infoItem);
      console.log(personalInfo);
    }
  };

  generatePersonalInfo(summaryArray);

  /////////////////////////////////////////////////////// generate youthPeriod

  console.log("made it to youth period generation");

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

  console.log(youthPeriod);
  console.log(personalInfo);
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

  let text = document.getElementById("text");

  text.innerHTML = youthTable;
});
