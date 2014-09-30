module.exports = function countdownCommand(program) {
	'use strict';

	function validateInteger(name) {
		return function (value) {
			var parsed = parseInt(value, 10);
			if (parsed) {
				return parsed;
			} else {
				program.handleError('Invalid ' + name + ': ' + value);
			}
		};
	}

	program
		.command('countdown <count>')
		.alias('cd')
		.description('Countdown timer')
		.option('-i, --interval <interval>', 'The delay between ticks', validateInteger('Interval'), 1000)
		.action(function(count, command) {

			count = validateInteger('Count')(count);

			(function tick() {
				if (count> 0) {
					console.log('tick ' + count--);
					setTimeout(tick, command.interval);
				}
			}());

		});

};
