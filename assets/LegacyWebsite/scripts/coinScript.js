/**
 * @author Tristen Rivera

  * global variables for the game.
  */
'use strict()';
var amount_to_flip;
var output;
var diffrence;
var headsCount;
var tailsCount;


function bind_events() {
	'use strict';

	// bind the event handler to the event. 
	$("#flip_coin").click(handle_flip);
	$("#flip_again").click(set_up_flip);

	// bind the enter keystroke to the upper boundary text box.
	// 		will look for thee ASCII code for the enter key.
	// LEAVE AS EXAMPLE
	$('#amount').keydown(function (the_event) {
		if (the_event.which === 13) {
			handle_flip();
		}
	});
}

/**
 * Sets up the game to begin play.  This function reads amount of times to flip 
 * from the value entered into the textbox by the user.  The input is check to ensure that
 * it is a valid integer number.
 */
function handle_flip() {
	'use strict';

	var amount_value = $('#amount').val();
	var value = parseInt(amount_value);

	output = "";
	diffrence = "";
	headsCount = 0;
	tailsCount = 0;

	//  If the value is not valid, then append a notification statement to the initialize game divison.
	if (isNaN(value)) {
		$().add('<p class="game_error">The value <strong><em>' + amount_value + '</em></strong> entered is not a valid integer number!  Please revise.</p>')
			.appendTo('#game_input');
		$('#amount').focus();
	} else {

		for (var i = 0; i < value; i++) {
			var number = Math.random();

			if (number < .5) {
				output += "Heads ";
				headsCount++;
			} else {
				output += "Tails ";
				tailsCount++;
			}
		}

		if (headsCount > tailsCount) {
			diffrence = headsCount - tailsCount;
		} else {
			diffrence = tailsCount - headsCount;
		}


		$('#game_input').hide();
		$('#flip_status span').text("Number of Heads/Tails: " + headsCount + "/" + tailsCount + " Difference: " + diffrence);
		$("#flip_status").show();

	}
	update_board(output);
}

/**
 *Updates the text output after flip is pressed
 */
function update_board(output) {
	'use strict';

	$("#output").text(output);
}
/**
 * Shows and hides features of the game and sets global variable values to zero
 */
function set_up_flip() {
	'use strict';

	headsCount = 0;
	tailsCount = 0;
	amount_to_flip = 0;

	$("#output").text("");
	$("#game_input").show();
	$("#flip_status").hide();

	$("#amount")
		.val("")
		.focus;

}
/**
 * Initialize the script file. 
 */
function init() {
	'use strict';

	set_up_flip();
	bind_events();

}

// when DOM is ready for manipulations call the init function
$(init);