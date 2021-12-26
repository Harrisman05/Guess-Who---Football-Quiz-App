// npm init-y // - generates json file (no need to do again)
// npm install puppeteer (required after every reload)

const thierryHenry = "Thierry_Henry";
const xavi = "Xavi";

const carragher = "Jamie_Carragher";

const robbieSavage = "Robbie_Savage";
const arjenRobben = "Arjen_Robben";
const cristianoRonaldo = "Cristiano_Ronaldo";
const androsTownsend = "Andros_Townsend";

const jonTaylor = "Jon_Taylor";

const puppeteer = require("puppeteer"); // initialise puppeteer library

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://en.wikipedia.org/wiki/" + thierryHenry);

    const careerSummary = await page.evaluate( () =>
    document.querySelector('table').innerText);

    let summaryArr = careerSummary.split("\n");

    for (let i = 0; i < summaryArr.length; i++) {
        summaryArr[i] = summaryArr[i].replace(/\t/g, " ");
    }

    while (summaryArr[0] !== "Youth career") { // this removes all the club information
        summaryArr.splice(0,1);
    }

    summaryArr = summaryArr.filter(Boolean); // this filters out any empty strings, as empty strings are falsy 

    while (summaryArr[summaryArr.length - 1][0].match(/\d/g) === null) {  // this remove the Senior club appearances and Honours, as the first string of these array    items don't contain a number 
        summaryArr.pop() // removes the last element in the array
 } 

    console.log(summaryArr)

    let youthPeriod = [];
    let seniorPeriod = [];
    let nationalPeriod = [];
    let managementPeriod = []


    if (summaryArr[0] === "Youth career") {
        while (summaryArr[0] !== "Senior career*") {  // filter the first section (youth career) into separate array
            let item = summaryArr.shift();
            youthPeriod.push(item);
        }
    }

    if (summaryArr[0] === "Senior career*" && (summaryArr.includes("National team‡") || summaryArr.includes("National team"))) {
        while (summaryArr[0][0] !== "N") {  // filter the second section (senior career) into separate array
            let item = summaryArr.shift();
            seniorPeriod.push(item);
        }
    }   else {
        seniorPeriod = summaryArr;
    }   

    if (summaryArr[0][0] === "N" && summaryArr.includes("Teams managed")) { // filter the national career into separate array if they have a management career as well
        while (summaryArr[0][0] !== "T") {
            let item = summaryArr.shift(); 
            nationalPeriod.push(item);
        }
        managementPeriod = summaryArr; // if they have a management career, the remainder of the summary array will become the management career
    } else if (summaryArr.includes("National team‡") || summaryArr.includes("National team")) {  // make sure non-national and manager types don't get remainder assigned
        nationalPeriod = summaryArr; // if they have a national career and no management career, then the remainder of the summary array will be their national career
    }
    

    // console.log(summaryArr);
    console.log(youthPeriod);
    console.log(seniorPeriod);
    console.log(nationalPeriod);
    console.log(managementPeriod);


    await browser.close();

})();

// how to disect the array data //

/* arr[13]
'1999–2007 Arsenal 254 (174)'

arr[13].split(' ');
(4) ['1999–2007', 'Arsenal', '254', '(174)']

let serviceYears = []
undefined

let apps = []
undefined

let goals = []
undefined

serviceYears.push(arrSplit[0]); 
apps.push(arrSplit[arrSplit.length - 1]);
goals.push(arrSplit[arrSplit.length - 2]);
1

serviceYears
['1999–2007']

apps
['(174)']

goals
['254']

*/