("use strict");

/////////////////// Creating summary table node lists

const summaryTableNodeList = document.querySelectorAll(".summaryTable");

const youthTableHTML = document.querySelector("#youth");

////////////////// targetting classes in the html markup

const hintTableOnly = document.querySelector("#hint");
const hintButton = document.querySelector(".hintButton");

const guessBox = document.querySelector(".playerGuessBox");
const guessSubmit = document.querySelector(".playerGuessSubmit");
const formMakeGuess = document.querySelector(".formMakeGuess");

const resetButton = document.querySelector(".resetButton");

/////////////////////////////////////////Rules button and modal window

const rulesModalWindow = document.querySelector(".rulesModalWindow");

const rulesModalOverlay = document.querySelector(".rulesModalOverlay");

const btnCloseModal = document.querySelector(".rulesCloseModal");

const btnOpenModal = document.querySelector(".rulesOpenModal");

const openModal = function () {
  rulesModalWindow.classList.remove("hidden");
  rulesModalOverlay.classList.remove("hidden");
};

const closeModal = function () {
  rulesModalWindow.classList.add("hidden");
  rulesModalOverlay.classList.add("hidden");
};

btnOpenModal.addEventListener("click", openModal);
rulesModalOverlay.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

// Handling key event////////////////////////////////////////////

document.addEventListener("keydown", function (event) {
  console.log("key pressed");
  console.log(event.key); // console logging the object, its the keyboard event. Read the .key property of the event object. JSON

  if (
    event.key === "Escape" &&
    !rulesModalWindow.classList.contains("hidden")
  ) {
    console.log("Escape was pressed to exit modal window");
    closeModal(); // close modal now needs to be called, within if code block so won't execute by itself like in event listener handling function
  }

  // && checking that the modal windows is open (! hidden), so that escape key will work
});

///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// Read File to player database array

import { playerDatabase } from "./playersDatabase.js";

const generatePlayerDatabaseArray = function (playerDatabase) {
  let playerDatabaseArray = playerDatabase.split("\n");

  for (let i = 0; i < playerDatabaseArray.length; i++) {
    playerDatabaseArray[i] = playerDatabaseArray[i].replace(/\r/g, ""); // this removes all the random /r characters within the strings
  }

  playerDatabaseArray = playerDatabaseArray.filter(Boolean); // remove all empty strings

  return playerDatabaseArray;
};

let playerDatabaseArray = generatePlayerDatabaseArray(playerDatabase);

document
  .querySelector(".startGameButton")
  .addEventListener("click", function () {
    // Random Generator on Player database array to obtain chosen random player

    const chooseRandomPlayer = function (playerDatabaseArray) {
      let randomNum = Math.floor(Math.random() * playerDatabaseArray.length);

      return playerDatabaseArray[randomNum];
    };

    let random_player = chooseRandomPlayer(playerDatabaseArray);

    // random_player = "Kevin Davies"; // "Garry Flitcroft"; // "Alan Shearer"; // BUG // Ugo Ehiogu

    console.log(random_player);

    //////////////////////////////Async from this point///////////////////////////////////////////////////////////

    import(`./summariesJS/${random_player}.js`).then((player) => {
      ///////////// Unhide summary tables

      for (let i = 0; i < summaryTableNodeList.length - 1; i++) {
        // all table except hint table
        summaryTableNodeList[i].classList.remove("hidden");
      }

      // unhide input field

      hintButton.style.display = "block";
      guessSubmit.style.display = "block";
      guessBox.style.display = "block";
      hintTableOnly.style.display = "none";

      ///////////////////////////////////////// Generate chosen player summary

      let chosenPlayerSummary = player.player;

      chosenPlayerSummary = chosenPlayerSummary.split("\n");

      chosenPlayerSummary = chosenPlayerSummary.filter(Boolean);

      while (
        chosenPlayerSummary[chosenPlayerSummary.length - 1][0].match(/\d/g) ===
        null
      ) {
        chosenPlayerSummary.pop();
      }

      let summaryArray = chosenPlayerSummary;

      // console.log(summaryArray);

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
          // console.log(personalInfo);
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
            console.log(youthPeriod);
          }
        }
      };

      // console.log(youthPeriod);
      // console.log(personalInfo);
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
        if (
          summaryArray[0][0] === "N" &&
          summaryArray.includes("Teams managed")
        ) {
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

      // console.log(personalInfo);
      // console.log(youthPeriod);
      // console.log(seniorPeriod);
      // console.log(nationalPeriod);
      // console.log(managementPeriod);

      ///////////////////////////////////// Create Youth Career specfic arrays for use in html ///////////////////////////////////////////////////////////

      let youthYears = [];
      let youthClubs = [];

      // console.log(youthPeriod);

      const generateYouthHTMLarrays = function (youthPeriod) {
        youthPeriod.shift(); // removes "youth" string, which is first item in array
        for (let i = 0; i < youthPeriod.length; i++) {
          let splitArray = youthPeriod[i].split(" "); // splits youthPeriod array into groups of strings
          // console.log(splitArray);
          if (splitArray[0].match(/\d/g) === null) {
            let rejoinClubs = splitArray.join(" "); // re-join the split array to make them strings again
            youthClubs.push(rejoinClubs); // pushes clubs onto youthClubs array
          } else {
            let dateItem = splitArray.shift(); // removes the first string (date) from the group of strings
            youthYears.push(dateItem); // pushes date to its own array
            let rejoinClubs = splitArray.join(" "); // re-join the split array to make them strings again
            youthClubs.push(rejoinClubs); // pushes clubs onto youthClubs array
          }
        }
      };

      generateYouthHTMLarrays(youthPeriod);

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

      // console.log(seniorYears);
      // console.log(seniorClubs);
      // console.log(seniorApps);
      // console.log(seniorGoals);

      // console.log(seniorPeriod);

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

      // console.log(nationalYears);
      // console.log(nationalGroups);
      // console.log(nationalApps);
      // console.log(nationalGoals);

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

      // console.log(managementClubs);
      // console.log(managementYears);
      // console.log(managementPeriod);

      //////////////////////////////////////// Personal info

      let hintItems = [];

      const generatePersonalInfoarrays = function (personalInfo) {
        console.log(personalInfo);

        for (let i = 0; i < personalInfo.length; i++) {
          if (personalInfo.includes("Personal information")) {
            personalInfo.shift();
          }
        }

        personalInfo.shift();

        for (let i = personalInfo.length - 1; i > 0; i--) {
          if (personalInfo.includes("Club information")) {
            personalInfo.pop();
          }
        }

        for (let i = 0; i < 2; i++) {
          let hintSplit = personalInfo[i].split(" ");

          for (let i = 0; i < 3; i++) {
            hintSplit.shift();
          }

          let rejoinedHint = hintSplit.join(" ");
          hintItems.push(rejoinedHint);
        }
        console.log(personalInfo);
        for (let i = 2; i < 4; i++) {
          personalInfo[i];
          let hintSplit = personalInfo[i].split(" ");
          hintSplit.shift();
          let rejoinedHint = hintSplit.join(" ");
          hintItems.push(rejoinedHint);
        }
      };

      generatePersonalInfoarrays(personalInfo);

      ////////////////////////////////////////Generating HTML tables

      let youth = "youth";
      let senior = "senior";
      let national = "national";
      let management = "management";
      let hint = "hint";

      const generateSummaryTables = function (
        tableID = "",
        years = [],
        clubs = [],
        apps = [],
        goals = [],
        hint = []
      ) {
        let summaryTable = "";

        switch (tableID) {
          case "youth":
            summaryTable =
              "<table><thead><tr><th colspan='2'> Youth Career </th></tr><tr><th> Years </th> <th> Youth Clubs</th></tr></thead><tbody>";
            break;
          case "senior":
            summaryTable =
              "<table><thead><tr><th colspan='4'> Senior Career </th></tr><tr><th> Years </th> <th> Senior Clubs </th> <th> Senior Apps </th> <th> Senior Goals </th> </tr></thead><tbody>";
            break;
          case "national":
            summaryTable =
              "<table><thead><tr><th colspan='4'> National Career </th></tr><tr><th> Years </th> <th> National Groups </th> <th> Apps </th> <th> Goals </th> </tr></thead><tbody>";
            break;
          case "management":
            summaryTable =
              "<table><thead><tr><th  colspan='2'> Management Career </th></tr><tr><th> Years </th> <th> Teams managed </th></tr></thead><tbody>";
            break;
          case "hint":
            summaryTable =
              "<table><thead><tr><th colspan='2'> Personal information </th></tr><tr><th> Item </th> <th> Details </th></tr></thead><tbody>";

            for (let i = 0; i < 4; i++) {
              let itemHeader = [
                "Date of birth",
                "Place of birth",
                "Height",
                "Position(s)",
              ];
              summaryTable +=
                "<tr><td>" + itemHeader[i] + "</td><td>" + hint[i];

              summaryTable += "</tbody></table>";

              let summaryTableHTML = document.getElementById(`${tableID}`);

              summaryTableHTML.innerHTML = summaryTable;
            }
        }

        for (let i = 0; i < clubs.length; i++) {
          let clubEmoji;

          if (clubs[i].includes("→")) {
            // allowing emojis to be added to loan spells
            clubEmoji = clubs[i].split(" ");
            clubEmoji.pop();
            clubEmoji.shift();
            clubEmoji = clubEmoji.join(" ");
          } else {
            clubEmoji = clubs[i];
          }

          if (tableID === "youth") {
            // fixing undefined error in youth section (Ugo bug)
            years[i] === undefined ? (years[i] = "") : (years[i] = years[i]);
          }

          summaryTable +=
            "<tr> <td>" +
            years[i] +
            "</td><td>" +
            clubs[i] +
            `<img src='/clubEmojis/${clubEmoji}.png' height='20px' width='20px' alt=''/>`;

          if (Boolean(apps.length)) {
            summaryTable += "</td><td>" + apps[i];
          }

          if (Boolean(goals.length)) {
            summaryTable += "</td><td>" + goals[i];
          }

          summaryTable += "</tbody></table>";

          let summaryTableHTML = document.getElementById(`${tableID}`);

          summaryTableHTML.innerHTML = summaryTable;
        }
      };
      const youthTable = generateSummaryTables(youth, youthYears, youthClubs);
      const seniorTable = generateSummaryTables(
        senior,
        seniorYears,
        seniorClubs,
        seniorApps,
        seniorGoals
      );
      const nationalTable = generateSummaryTables(
        national,
        nationalYears,
        nationalGroups,
        nationalApps,
        nationalGoals
      );
      const managementTable = generateSummaryTables(
        management,
        managementYears,
        managementClubs
      );

      hintButton.addEventListener("click", function () {
        hintTableOnly.classList.remove("hidden");
        const hintTable = generateSummaryTables(
          hint,
          [],
          [],
          [],
          [],
          hintItems
        );
        hintButton.style.display = "none";
        hintTableOnly.style.display = "table";
      });

      resetButton.addEventListener("click", function () {
        for (let i = 0; i < summaryTableNodeList.length; i++) {
          summaryTableNodeList[i].classList.add("hidden");
        }
        guessBox.style.display = "none";
        guessSubmit.style.display = "none";
        hintButton.style.display = "none";
        hintTableOnly.style.display = "none";
      });

      formMakeGuess.addEventListener("submit", (e) => {
        console.log(guessBox.value);
        console.log("submit actioned");
        // prevents the form from actually submitting
      });
    });
  });
