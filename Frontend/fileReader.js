// ("use strict");

// import fs from "fs";

// //////////////////////////////////////// Read File to player database array

// const generateArrayFromCSV = function () {
//   let playerDatabaseArray = fs.readFileSync("playersDatabase.txt", "utf8"); // generate long string of players from csv file

//   playerDatabaseArray = playerDatabaseArray.split("\n");

//   for (let i = 0; i < playerDatabaseArray.length; i++) {
//     playerDatabaseArray[i] = playerDatabaseArray[i].replace(/\r/g, ""); // this removes all the random /r characters within the strings
//   }

//   playerDatabaseArray = playerDatabaseArray.filter(Boolean); // remove all empty strings
//   console.log(playerDatabaseArray);
//   return playerDatabaseArray;
// };

// let playerDatabaseArray = generateArrayFromCSV();

// //////////////////////////////////////////////////////////////// choose random player

// const chooseRandomPlayer = function (playerDatabaseArray) {
//   let randomNum = Math.floor(Math.random() * playerDatabaseArray.length);

//   return playerDatabaseArray[randomNum];
// };

// let random_player = chooseRandomPlayer(playerDatabaseArray);

// /////////////////////////////////////////// Generate chosen player summary

// const generateChosenPlayerSummary = function (chosenPlayer) {
//   let chosenPlayerSummary = fs.readFileSync(
//     `summaries/${chosenPlayer}.txt`,
//     "utf8"
//   );
//   chosenPlayerSummary = chosenPlayerSummary.split("\n");
//   console.log(chosenPlayerSummary);
//   while (
//     chosenPlayerSummary[chosenPlayerSummary.length - 1][0].match(/\d/g) === null
//   ) {
//     chosenPlayerSummary.pop();
//   }
//   chosenPlayerSummary = chosenPlayerSummary.filter(Boolean);
//   return chosenPlayerSummary;
// };

// let summaryArray = generateChosenPlayerSummary(random_player);

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

export { summaryArray };
export { random_player };

console.log(summaryArray);
console.log(random_player);
