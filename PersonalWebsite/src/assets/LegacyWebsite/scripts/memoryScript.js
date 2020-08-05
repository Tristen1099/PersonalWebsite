/**
 * @author Tristen Rivera

  * global variables for the game.
  */
'use strict()';
var level;
var highScore;
var highScoreHard;
var gameSequence;
var userSequence;

/**
 * Bind the onclick event to the event handler for the Start Game button.
 * A portion of this function was completed for you to use as an example.
 * The portions you are to do on your own are very similar.
 */
function bind_events() {
	'use strict';

	// bind the event handler to the event. 
	$("#startGame").click(set_up_game);
	$("#easyMode").click(play_easy_game);
	$("#hardMode").click(play_hard_game);
	$("#submitLevel").click(compareSequences);
	$("#submitLevelHard").click(compareSequencesHard);
	$("#green").click(handle_green);
	$("#red").click(handle_red);
	$("#yellow").click(handle_yellow);
	$("#blue").click(handle_blue);
	$("#greenHard").click(handle_green_hard);
	$("#redHard").click(handle_red_hard);
	$("#yellowHard").click(handle_yellow_hard);
	$("#blueHard").click(handle_blue_hard);
	$("#limeHard").click(handle_lime_hard);
	$("#purpleHard").click(handle_purple_hard);
	$("#indigoHard").click(handle_indigo_hard);
	$("#orangeHard").click(handle_orange_hard);
	$("#magentaHard").click(handle_magenta_hard);
	$("#playAgain").click(set_up_game);
}

function get_game_sequence() {
	'use strict';
	gameSequence = "";
	var i = 0;
	var green = new Audio('audio/Green.m4a');
	var red = new Audio('audio/Red.m4a');
	var yellow = new Audio('audio/Yellow.m4a');
	var blue = new Audio('audio/Blue.m4a');


	function generateGameSequence() {
		var changedColor;

		setTimeout(function () {

			var value = Math.floor(Math.random() * Math.floor(100));
			changedColor = 0;

			if (value < 25) {
				gameSequence += "1";
				$("#green img:last-child").remove();
				$('#green').prepend('<img id="greenBright" src="images/greenBright.jpg" />');
				green.play();
				changedColor = 1;

			} else if (value < 50) {
				gameSequence += "2";
				$("#red img:last-child").remove();
				$('#red').prepend('<img id="redBright" src="images/redBright.jpg" />');
				red.play();
				changedColor = 2;
			} else if (value < 75) {
				gameSequence += "3";
				$("#yellow img:last-child").remove();
				$('#yellow').prepend('<img id="yellowBright" src="images/yellowBright.jpg" />');
				yellow.play();
				changedColor = 3;
			} else {
				gameSequence += "4";
				$("#blue img:last-child").remove();
				$('#blue').prepend('<img id="blueBright" src="images/blueBright.jpg" />');
				blue.play();
				changedColor = 4;
			}

			i++;
			console.log(gameSequence);
			if (i < level) {
				generateGameSequence();
			}
		}, 1200);

		setTimeout(function () {
			if (changedColor === 1) {
				$("#green img:last-child").remove();
				$('#green').prepend('<img id="green" src="images/green.jpg" />');
			}
			if (changedColor === 2) {
				$("#red img:last-child").remove();
				$('#red').prepend('<img id="red" src="images/red.jpg" />');
			}
			if (changedColor === 3) {
				$("#yellow img:last-child").remove();
				$('#yellow').prepend('<img id="yellow" src="images/yellow.jpg" />');
			}
			if (changedColor === 4) {
				$("#blue img:last-child").remove();
				$('#blue').prepend('<img id="blue" src="images/blue.jpg" />');
			}
		}, 1500);

	}

	generateGameSequence();
}

function get_game_sequence_hard() {
	'use strict';
	gameSequence = "";
	var i = 0;
	var green = new Audio('audio/Green.m4a');
	var red = new Audio('audio/Red.m4a');
	var yellow = new Audio('audio/Yellow.m4a');
	var blue = new Audio('audio/Blue.m4a');
	var orange = new Audio('audio/Orange.m4a');
	var lime = new Audio('audio/Lime.m4a');
	var purple = new Audio('audio/Purple.m4a');
	var indigo = new Audio('audio/Indigo.m4a');
	var magenta = new Audio('audio/Magenta.m4a');


	function generateGameSequence() {
		var changedColor;

		setTimeout(function () {


			var value = Math.floor(Math.random() * Math.floor(90));

			changedColor = 0;

			if (value < 10) {
				gameSequence += "1";
				$("#greenHard img:last-child").remove();
				$('#greenHard').prepend('<img id="greenBright" src="images/greenBright.jpg" />');
				green.play();
				changedColor = 1;

			} else if (value < 20) {
				gameSequence += "2";
				$("#redHard img:last-child").remove();
				$('#redHard').prepend('<img id="redBright" src="images/redBright.jpg" />');
				red.play();
				changedColor = 2;
			} else if (value < 30) {
				gameSequence += "3";
				$("#yellowHard img:last-child").remove();
				$('#yellowHard').prepend('<img id="yellowBright" src="images/yellowBright.jpg" />');
				yellow.play();
				changedColor = 3;
			} else if (value < 40) {
				gameSequence += "4";
				$("#blueHard img:last-child").remove();
				$('#blueHard').prepend('<img id="blueBright" src="images/blueBright.jpg" />');
				blue.play();
				changedColor = 4;
			} else if (value < 50) {
				gameSequence += "5";
				$("#limeHard img:last-child").remove();
				$('#limeHard').prepend('<img id="limeBright" src="images/limeBright.jpg" />');
				lime.play();
				changedColor = 5;
			} else if (value < 60) {
				gameSequence += "6";
				$("#purpleHard img:last-child").remove();
				$('#purpleHard').prepend('<img id="purpleBright" src="images/purpleBright.jpg" />');
				purple.play();
				changedColor = 6;
			} else if (value < 70) {
				gameSequence += "7";
				$("#magentaHard img:last-child").remove();
				$('#magentaHard').prepend('<img id="magentaBright" src="images/magentaBright.jpg" />');
				magenta.play();
				changedColor = 7;
			} else if (value < 80) {
				gameSequence += "8";
				$("#indigoHard img:last-child").remove();
				$('#indigoHard').prepend('<img id="indigoBright" src="images/indigoBright.jpg" />');
				indigo.play();
				changedColor = 8;
			} else {
				gameSequence += "9";
				$("#orangeHard img:last-child").remove();
				$('#orangeHard').prepend('<img id="orangeBright" src="images/orangeBright.jpg" />');
				orange.play();
				changedColor = 9;
			}

			i++;
			console.log(gameSequence);
			if (i < level) {
				generateGameSequence();
			}
		}, 1100);

		setTimeout(function () {
			if (changedColor === 1) {
				$("#greenHard img:last-child").remove();
				$('#greenHard').prepend('<img id="greenHard" src="images/green.jpg" />');
			}
			if (changedColor === 2) {
				$("#redHard img:last-child").remove();
				$('#redHard').prepend('<img id="redHard" src="images/red.jpg" />');
			}
			if (changedColor === 3) {
				$("#yellowHard img:last-child").remove();
				$('#yellowHard').prepend('<img id="yellowHard" src="images/yellow.jpg" />');
			}
			if (changedColor === 4) {
				$("#blueHard img:last-child").remove();
				$('#blueHard').prepend('<img id="blueHard" src="images/blue.jpg" />');
			}
			if (changedColor === 5) {
				$("#limeHard img:last-child").remove();
				$('#limeHard').prepend('<img id="limeHard" src="images/lime.jpg" />');
			}
			if (changedColor === 6) {
				$("#purpleHard img:last-child").remove();
				$('#purpleHard').prepend('<img id="purpleHard" src="images/purple.jpg" />');
			}
			if (changedColor === 7) {
				$("#magentaHard img:last-child").remove();
				$('#magentaHard').prepend('<img id="magentaHard" src="images/magenta.jpg" />');
			}
			if (changedColor === 8) {
				$("#indigoHard img:last-child").remove();
				$('#indigoHard').prepend('<img id="indigoHard" src="images/indigo.jpg" />');
			}
			if (changedColor === 9) {
				$("#orangeHard img:last-child").remove();
				$('#orangeHard').prepend('<img id="orangeHard" src="images/orange.jpg" />');
			}
		}, 1400);

	}

	generateGameSequence();
}

function play_easy_game() {
	'use strict';

	$("#gameMode").hide();
	$("#images").show();
	$("#submitLevel").show();
	get_game_sequence();
}

function play_hard_game() {
	'use strict';

	$("#gameMode").hide();
	$("#imagesHard").show();
	$("#submitLevelHard").show();
	get_game_sequence_hard();
}

function compareSequences() {
	'use strict';

	if (userSequence === gameSequence) {
		alert("Good Job!");
		level += 1;
		userSequence = "";
		play_easy_game();
	} else {
		alert(":( You have lost.");
		if (level > highScore) {
			highScore = level;
		}
		$("#images").hide();
		$("#submitLevel").hide();
		$("#gameInfo span").text("You made it to level " + level + ". The high score is level " + highScore + ".");
		$("#gameInfo").show();
	}

}

function compareSequencesHard() {
	'use strict';

	if (userSequence === gameSequence) {
		alert("Good Job!");
		level += 1;
		userSequence = "";
		play_hard_game();
	} else {
		alert(":( You have lost.");
		if (level > highScore) {
			highScore = level;
		}
		$("#imagesHard").hide();
		$("#submitLevelHard").hide();
		$("#gameInfo span").text("You made it to level " + level + ". The high score is level " + highScore + ".");
		$("#gameInfo").show();
	}

}

function handle_green() {
	'use strict';

	userSequence += "1";
}

function handle_red() {
	'use strict';

	userSequence += "2";
}

function handle_yellow() {
	'use strict';

	userSequence += "3";
}

function handle_blue() {
	'use strict';

	userSequence += "4";
}

function handle_green_hard() {
	'use strict';

	userSequence += "1";
}

function handle_red_hard() {
	'use strict';

	userSequence += "2";
}

function handle_yellow_hard() {
	'use strict';

	userSequence += "3";
}

function handle_blue_hard() {
	'use strict';

	userSequence += "4";
}

function handle_lime_hard() {
	'use strict';

	userSequence += "5";
}
function handle_purple_hard() {
	'use strict';

	userSequence += "6";
}

function handle_magenta_hard() {
	'use strict';

	userSequence += "7";
}

function handle_indigo_hard() {
	'use strict';

	userSequence += "8";
}

function handle_orange_hard() {
	'use strict';

	userSequence += "9";
}

/**
 * Shows and hides features of the game and sets global variable values to zero
 */
function set_up_game() {
	'use strict';

	level = 1;
	gameSequence = "";
	userSequence = "";

	$("#startGame").hide();
	$("#memoryDino").hide();
	$("#gameMode").show();
	$("#gameInfo").hide();

}


/**
 * Initialize the script file. 
 */
function init() {
	'use strict';

	bind_events();
	highScore = 0;
	highScoreHard = 0;
	$("#gameMode").hide();
	$("#images").hide();
	$("#imagesHard").hide();
	$("#submitLevel").hide();
	$("#submitLevelHard").hide();
	$("#gameInfo").hide();
}

// when DOM is ready for manipulations call the init function
$(init);
