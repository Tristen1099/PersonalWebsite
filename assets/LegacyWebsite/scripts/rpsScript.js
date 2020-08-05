/**
 * Global variables.  Have access to the variable 
 * throughout the script file. 
 */
var canvas;
var ctx;
var x;
var y;


/** 
Add the following variable definitions
1.  declare a player object using the object literal notation
      define score and choice properties and assign the values 0 and "" respectively.
2.  declare a dinosaur object using the object literal notation
      define score and choice properties and assign the values 0 and "" respectively.

*/
var player = new Object();
player.choice = "";
player.score = 0;
var dinosaur = new Object();
dinosaur.choice = "";
dinosaur.score = 0;

/**
 * This is a generic function that draws the text on the canvas.
 */
function drawText(textToPrint, x, y, hexColor, fontSize) {
	'use strict';
	ctx.font = fontSize + " Arial";
	ctx.fillStyle = hexColor;
	ctx.fillText(textToPrint, x, y);
}

/**
 * draw the player and dinosaur score on the canvas.
 */
function drawScore(playerScore, dinosaurScore) {
	'use strict';
	drawText("Player's Score: " + playerScore, 20, 25, "#0095DD", "22px");
	drawText("Dinosaur's Score: " + dinosaurScore, x, 25, "#4400DD", "22px");
}

/**
 * draw the winner on the canvas.
 */
function drawOutcome(outcomeText) {
	'use strict';
	drawText(outcomeText, 20, 300, "#004433", "22px");
}

/**
 * draw the choice for each player.
 */
function drawChoice(playerChoice, dinosaurChoice) {
	'use strict';
	drawText("Player's Choice: " + playerChoice, 20, y, "#0095DD", "22px");
	drawText("Dinosaur's Choice: " + dinosaurChoice, x, y, "#4400DD", "22px");
}


/**
 * get_user_choice: Asks the user for a choice. Must ensure that player enters
 *   	rock, fern, herbivor, or exit.
 *  @param none
 * 	@return the player's choice
 */
function getUserChoice() {
	"use strict";

	var userChoice = prompt("Do you choose rock, fern, or herbivor?");

	while (!(userChoice === "rock" || userChoice === "fern" || userChoice === "herbivor" || userChoice === null)) {
		userChoice = prompt("Do you choose rock, fern, or herbivor?");

	}

	if (userChoice === null || userChoice === "") {
		userChoice = "empty";
	}

	player.choice = userChoice;
	return player.choice;
}

/**
 * get_dinosaur_choice: The dinosaur makes their choice based on a random number between
 * 		0 and 1. If the random number returns in the range of 0 to 0.34 (exclusive)
 *		then the choice will be "rock".
 *
 *		otherwise if the random number is less than 0.67 then 
 *		the choice will be "fern".
 *
 *		otherwise it will be "herbivor"
 *  @param none
 *  @return the dinosaur's choice
 */
function getdinosaurChoice() {
	"use strict";

	var dinosaurChoice = Math.random();

	if (dinosaurChoice < .34) {
		dinosaurChoice = "rock";
	} else if (dinosaurChoice < .67) {
		dinosaurChoice = "fern";
	} else {
		dinosaurChoice = "herbivor";
	}

	dinosaur.choice = dinosaurChoice;

	return dinosaurChoice;
}

/**
 * compare: compare the choices made by the dinosaur and the player.
 *		Contains the logic for the game.
 * @param user - the user object
 * @param dinosaur - the dinosaur object
 * @return the winning phrase.
 */
function compare(user, dinosaur) {
	var outcome = "No outcome";
	var meteor = Math.random();
	var percent = document.getElementById("percent").value;
	meteor = (meteor * 100);

	if (meteor > percent) {

		if (user.choice === dinosaur.choice) {
			return outcome = "The result is a tie.";
		}

		if (user.choice === "rock") {
			if (dinosaur.choice === "herbivor") {
				player.score++;
				return outcome = "Player wins!";
			} else {
				dinosaur.score++;
				return outcome = "Dinosaur wins!";
			}
		}

		if (user.choice === "fern") {
			if (dinosaur.choice === "rock") {
				player.score++;
				return outcome = "Player wins!";
			} else {
				dinosaur.score++;
				return outcome = "Dinosaur wins!";
			}
		}

		if (user.choice === "herbivor") {
			if (dinosaur.choice === "fern") {
				player.score++;
				return outcome = "Player wins!";
			} else {
				dinosaur.score++;
				return outcome = "Dinosaur wins!";
			}
		}

		if (user.choice === "empty") {
			return outcome = "You did not make a choice :(";
		}

	} else {

		dinosaur.score = 0;
		player.score = 0;
		return outcome = "Meteor destroys all!!!";

	}
}

/**
 * The play function that orchestrates the flow of the game.
 * @param none
 * @return none
 */
function play() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	getUserChoice();
	getdinosaurChoice();
	drawChoice(player.choice, dinosaur.choice);
	drawOutcome(compare(player, dinosaur));
	drawScore(player.score, dinosaur.score);
}




/**
 * 	initialization of the script file
 */
function init() {
	// The initialization for the script file.
	//			
	//			1. Reference the canvas object from the HTML by getting the element by id myCanvas
	//			2. initialize the ctx variable by accessing the 2d context of the canvas.
	//			3. Initialize x and y variables to half the canvas width and height
	//			4. Add an event listener for the click event on the play again button
	//			5. Call play
	"use strict";
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	x = canvas.width / 2;
	y = canvas.height / 2;

	// event listener for the enter key
	document.getElementById("play_key").addEventListener("click", function () {
		play();
	});


}

// call the global event handler assigning
// it an anonymous function that calls init.
window.onload = function () {
	init(); // Initialization function call.
}
