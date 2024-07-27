/**
 * @author Tristen Rivera

  * global variables for the game.
  */
'use strict()';
var number_to_guess;
var upper_boundary;
var count_guesses;

/**
 * Bind the onclick event to the event handler for the Start Game button.
 * A portion of this function was completed for you to use as an example.
 * The portions you are to do on your own are very similar.
 */
function bind_events() {
	'use strict';

	// bind the event handler to the event. 
	$('#start_game').click(handle_start); // LEAVE AS EXAMPLE
	$("#make_guess").click(handle_guess);
	$("#play_again").click(set_up_game);

	// bind the enter keystroke to the upper boundary text box.
	// 		will look for thee ASCII code for the enter key.
	// LEAVE AS EXAMPLE
	$('#upper_boundary').keydown(function (the_event) {
		if (the_event.which === 13) {
			handle_start();
		}
	});

	$("#guess").keydown(function (event) {
		if (event.which === 13) {
			handle_guess();
		}
	});
}

/**
 * Sets up the game to begin play.  This function reads in the upper boundary of the range 
 * from the value entered into the textbox by the user.  The input is check to ensure that
 * it is a valid integer number.
 */
function handle_start() {
	'use strict';

	var upper_boundary_value = $('#upper_boundary').val();
	var upper_val = parseInt(upper_boundary_value);

	//  If the value is not valid, then append a notification statement to the initialize game divison.
	if (isNaN(upper_val)) {
		$().add('<p class="game_error">The value <strong><em>' + upper_boundary_value + '</em></strong> entered is not a valid integer number!  Please revise.</p>')
			.appendTo('#initialize_game');
		$('#upper_boundary').focus();
	} else {
		// The number is valid so generate a random number between 1 and upper boundary.
		number_to_guess = Math.floor(Math.random() * upper_val) + 1;

		// Append the upper boundary value so it reads "I have chosen a number between 1 and X" where X is the number_to_guess.
		$('#play_game span').text(upper_boundary_value);

		// reset the count guesses variable
		count_guesses = 0;

		// Hide the initialize game section of user interface.
		$('#initialize_game').hide();

		// show the play game section of user interface and manipulate the buttons player can see.
		$('#play_game').show();
		$('#play_again').hide();
		$('#make_guess').show();
	}
	update_board(count_guesses);
}
/**
 *Compares the users guess with the random choice of the computer
 */
function handle_guess() {
	'use strict';
	var user_guess = $("#guess").val();
	user_guess = parseInt(user_guess);

	if (isNaN(user_guess)) {
		$("#game_status").add('<p class="game_error">The value <strong><em>' + user_guess + '</em></strong> entered is not a valid integer number!  Please revise.</p>')
			.appendTo("#game_status");
	}

	if (user_guess < number_to_guess) {
		$("#game_status").add("<p>The value <strong><em>" + user_guess + "</em></strong> is too low.</p>")
			.appendTo("#game_status");

		count_guesses++;
	}

	if (user_guess > number_to_guess) {
		$("#game_status").add("<p>The value <strong><em>" + user_guess + "</em></strong> is too high.</p>")
			.appendTo("#game_status");

		count_guesses++;
	}

	if (user_guess === number_to_guess) {
		$("#game_status").add("<p class='game_correct'>The value <strong><em>" + user_guess + "</em></strong> is correct!</p>")
			.appendTo("#game_status");

		count_guesses++;

		$("#make_guess").hide();
		$("#play_again").show();

		$("#guessingDino").css('background-image', 'url("images/Congratulations.jpg")');
	}

	update_board(count_guesses);

}
/**
 *Updates the guess counter everytime the user presses guess
 */
function update_board() {
	'use strict';
	$("#count span").text(count_guesses);

	$("#guess")
		.val("")
		.focus();

}
/**
 * Shows and hides features of the game and sets global variable values to zero
 */
function set_up_game() {
	'use strict';

	$("#initialize_game").show();
	$("#play_game").hide();

	number_to_guess = 0;
	upper_boundary = 0;
	count_guesses = 0;

	$("#game_status").html("");

	$("#upper_boundary")
		.val("")
		.focus;

	$("#guessingDino").css('background-image', 'url("images/Confused Dinos.jpg")');

}


/**
 * Initialize the script file. 
 */
function init() {
	'use strict';

	set_up_game();
	bind_events();

}

// when DOM is ready for manipulations call the init function
$(init);
