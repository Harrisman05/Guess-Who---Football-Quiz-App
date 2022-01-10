("use strict");

/////////////////// Creating summary table node lists
let arrCorrect = ["1 asdlfads", "2 asdgfasd", "3 sdfasdg"];
let arrUser = [" 1 Correct", "2 Incorrect", "3 asdf"];
const summaryTableNodeList = document.querySelectorAll(".summaryTable");
const startGameButton = document.querySelector(".startGameButton");

const youthTableHTML = document.querySelector("#youth");
const seniorTableHTML = document.querySelector("#senior");
const nationalTableHTML = document.querySelector("#national");
const managementTableHTML = document.querySelector("#management");
const performanceTableHTML = document.querySelector("#finalTable");

////////////////// targetting classes in the html markup

const hintTableOnly = document.querySelector("#hint");
const hintButton = document.querySelector(".hintButton");
const timerText = document.querySelector(".timerText");

const guessBox = document.querySelector(".playerGuessBox");
const guessSubmit = document.querySelector(".playerGuessSubmit");
const formMakeGuess = document.querySelector(".formMakeGuess");

const resetButton = document.querySelector(".resetButton");

///////////////////////////////////////////////////////////////

const turnCounterNumber = document.querySelector(".turnCounterNumber");
const turnCounterContainer = document.querySelector(".turnCounterContainer");

let turnCount = 0;

const resetTurnCount = function () {
  turnCount = 0;
  turnCounterNumber.textContent = `${turnCount}/10`;
};

///////////////////////////////////////////////////////////////

let allCorrectPlayers = [];
let allUserGuesses = [];

const gameOverMessage = document.querySelector(".gameOverMessage");

const labelTimer = document.querySelector(".timer");
let timer; // placeholder for checking if timers exist

const startTimer = function () {
  const tick = function () {
    const min = String(Math.floor(time / 60)).padStart(2, 0); // converting time into mins, math.floor to remove decimals, converted to string so padStart can add a 0 at the start of the number
    const sec = String(time % 60).padStart(2, 0); // remainder of time / 60 is the seconds left

    labelTimer.textContent = `${min}:${sec}`;

    // When timer reaches 0 seconds, stop timer and log out user

    if (time === 0) {
      clearInterval(timer);
      console.log("Turn has ended");
      guessSubmit.click();
    }

    // Decrease 1 second
    time--;
  };

  // Set time to 2 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000); // callback function executed every 1000ms (1 second)
  // In each callback call, print the remaining time to UI
  return timer;
};

const resetTimer = function () {
  clearInterval(timer);
  labelTimer.textContent = `00:00`;
  console.log("timer cleared");
};

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
  // console.log("key pressed");
  // console.log(event.key); // console logging the object, its the keyboard event. Read the .key property of the event object. JSON

  if (
    event.key === "Escape" &&
    !rulesModalWindow.classList.contains("hidden")
  ) {
    // console.log("Escape was pressed to exit modal window");
    closeModal(); // close modal now needs to be called, within if code block so won't execute by itself like in event listener handling function
  }

  // && checking that the modal windows is open (! hidden), so that escape key will work
});

const wipeTables = function () {
  document.querySelector("#national").innerHTML = "";
  document.querySelector("#management").innerHTML = "";
};

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

startGameButton.addEventListener("click", function () {
  // Random Generator on Player database array to obtain chosen random player

  const chooseRandomPlayer = function (playerDatabaseArray) {
    let randomNum = Math.floor(Math.random() * playerDatabaseArray.length);

    return playerDatabaseArray[randomNum];
  };

  let random_player = chooseRandomPlayer(playerDatabaseArray);

  // random_player = "Alan Shearer";
  // "Shaun Wright-Phillips"; // "Hermann Hreiðarsson"; // "Thomas Sørensen"; // ("Kevin Campbell"); // "Jussi Jääskeläinen"; // "Alan Shearer"; // BUG // Ugo Ehiogu

  console.log(random_player);

  //////////////////////////////Async from this point///////////////////////////////////////////////////////////

  import(`./summariesJS/${random_player}.js`).then((player) => {
    ///////////// Start turn timer

    if (timer) clearInterval(timer); //check if there is a pre-existing timer, and delete if so
    timer = startTimer();

    ///////////// Wipe summary tables

    wipeTables();

    /////////////////////////////////// Update counter and hide/unhide relevant tables

    turnCount++;
    console.log(turnCount);

    turnCounterNumber.textContent = `${turnCount}/10`;

    if (turnCount === 11) {
      resetTimer();
      timerText.style.display = "none";
      turnCounterNumber.textContent = `10/10`;

      youthTableHTML.style.display = "none";
      seniorTableHTML.style.display = "none";
      nationalTableHTML.style.display = "none";
      managementTableHTML.style.display = "none";
      hintTableOnly.style.display = "none";
      performanceTableHTML.style.display = "table";

      gameOverMessage.style.display = "block";
      startGameButton.style.display = "none";
      hintButton.style.display = "none";
      guessBox.style.display = "none";
      guessSubmit.style.display = "none";
    } else {
      hintButton.style.display = "block";
      guessSubmit.style.display = "block";
      guessBox.style.display = "block";
      hintTableOnly.style.display = "none"; // BUG unhide hint table for flexbox testing
      startGameButton.style.display = "none";
      timerText.style.display = "block";
      turnCounterContainer.style.display = "block";
      for (let i = 0; i < summaryTableNodeList.length; i++) {
        // console.log(summaryTableNodeList);
        summaryTableNodeList[i].classList.remove("hidden");
      }
    }

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
          // console.log(youthPeriod);
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

    // console.log(youthYears);
    // console.log(youthClubs);
    // console.log(youthPeriod);

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

    //////////////////////////////////////// Personal info

    let hintItems = [];

    const generatePersonalInfoarrays = function (personalInfo) {
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
            "<table><thead><tr><th colspan='2' class='topHeader'> <span>👶</span> Youth Career <span>👶</span> </th></tr><tr><th> Years </th> <th> Youth Clubs</th></tr></thead><tbody>";
          break;
        case "senior":
          summaryTable =
            "<table><thead><tr><th colspan='4' class='topHeader'> <span>⚽</span> Senior Career <span>⚽</span> </th></tr><tr><th> Years </th> <th> Senior Clubs </th> <th> Senior Apps </th> <th> Senior Goals </th> </tr></thead><tbody>";
          break;
        case "national":
          summaryTable =
            "<table><thead><tr><th colspan='4' class='topHeader'> <span>🌍</span> National Career <span>🌍</span> </th></tr><tr><th> Years </th> <th> National Groups </th> <th> Apps </th> <th> Goals </th> </tr></thead><tbody>";
          break;
        case "management":
          summaryTable =
            "<table><thead><tr><th  colspan='2' class='topHeader'> <span>💼</span> Management Career <span>💼</span> </th></tr><tr><th> Years </th> <th> Teams managed </th></tr></thead><tbody>";
          break;
        case "hint":
          summaryTable =
            "<table><thead><tr><th colspan='2'class='topHeader'> <span>🔐</span> Personal information <span>🔐</span> </th></tr><tr><th> Item </th> <th> Details </th></tr></thead><tbody>";

          for (let i = 0; i < 4; i++) {
            let itemHeader = [
              "Date of birth",
              "Place of birth",
              "Height",
              "Position(s)",
            ];
            summaryTable += "<tr><td>" + itemHeader[i] + "</td><td>" + hint[i];

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

        console.log(summaryTableHTML.innerHTML);

        summaryTableHTML.innerHTML = summaryTable;
      }
    };

    const generatePerformanceTable = function (correctGuess, userGuess) {
      let performanceTable =
        "<table><thead><tr><th> Correct Guess </th><th> Your Guess </th></tr></thead><tbody>";

      for (let i = 0; i < correctGuess.length; i++) {
        performanceTable +=
          "<tr><td>" +
          correctGuess[i] +
          "</td><td>" +
          userGuess[i] +
          "</td></tr>";

        performanceTable += "</tbody></table>";

        let performanceTableHTML = document.getElementById("finalTable");

        performanceTableHTML.innerHTML = performanceTable;
      }
    };

    const performanceTable = generatePerformanceTable(
      allCorrectPlayers,
      allUserGuesses
    );

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

    //////////////////// BUG Remove after Flexbox testing

    // hintTableOnly.classList.remove("hidden");
    // const hintTable = generateSummaryTables(hint, [], [], [], [], hintItems);

    /////////////////////// BUG

    hintButton.addEventListener("click", function () {
      hintTableOnly.classList.remove("hidden");
      const hintTable = generateSummaryTables(hint, [], [], [], [], hintItems);
      hintButton.style.display = "none";
      hintTableOnly.style.display = "table";
    });

    resetButton.addEventListener("click", function () {
      location.reload();
    });

    guessSubmit.addEventListener(
      "click",
      function (e) {
        let userPlayerGuess = guessBox.value;
        guessBox.value = "";

        let correctPlayerGuess = random_player;
        let correctPlayerGuessNormalised = correctPlayerGuess
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        console.log(correctPlayerGuess);
        allCorrectPlayers.push(correctPlayerGuess);
        console.log(allCorrectPlayers);
        allUserGuesses.push(userPlayerGuess);
        console.log(allUserGuesses);

        if (
          userPlayerGuess === correctPlayerGuess ||
          userPlayerGuess === correctPlayerGuessNormalised
        ) {
          console.log("That is a correct guess");
          // startGameButton.click();
        } else {
          console.log("That is an incorrect guess");
          // startGameButton.click();
        }
        console.log("submit actioned");

        console.log(turnCount);
        startGameButton.click();
      },
      { once: true } //maybe 3 hours to find this solution
    );
  });
});
