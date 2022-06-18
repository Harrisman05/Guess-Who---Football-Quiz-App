# Guess-Who---Football-Quiz-App

## A quiz game where the user has to guess the footballer using data displayed on screen 

This is a full stack project whereby datasets where extract using a Node.js library called
Puppeteer API, which crawled through wikipedia to extract the player's club/goalscoring history.
This consituted the backend of the project.

Then these datasets are randomly and dynamically imported into the frontend to form the quiz.
10 questions per round.

## How to install and run project

* Clone this repository
* In the Frontend directory, simply open index.html on a browser and the project will load

## How it works:

* Extracting datasets with Puppeteer
  * Using the Puppeteer API, a headless chrome browser is opened and then the wikipedia page of a 
  football player is navigated to. 
  * The table dataset is extracted using querySelector and then is written to file
  (using fs library) to store the data in a .txt file.
  * The code below shows generation of a dataset for Shaun Wright-Philips (hard-coded)
  
<p align="center">
    <img src="https://github.com/Harrisman05/Guess-Who---Football-Quiz-App/blob/main/Backend/generate_player_dataset_puppeteer_api.png" width="50%" height="50%"/> <img src="https://github.com/Harrisman05/Guess-Who---Football-Quiz-App/blob/main/Backend/red_arrow.png" width="15%" height="15%"/> <img src="https://github.com/Harrisman05/Guess-Who---Football-Quiz-App/blob/main/Backend/player_dataset_raw_data.png" width="25%" height="25%"/>
</p>

* Datasets presented in frontend
  * The .txt files are converted in JavaScript files, and then dynamically imported into the frontend using an RNG generator
  * The gif below provides a part demonstration of how the game works: 

<p align="center">
    <img src="https://github.com/Harrisman05/Guess-Who---Football-Quiz-App/blob/main/Frontend/guess_who_demo.gif"/> 
</p>
