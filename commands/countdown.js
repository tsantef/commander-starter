module.exports = function (program) {
	'use strict';

	program
		.command('countdown <count>')
		.alias('cd')
		.description('Countdown timer')
		.option('-i, --interval <interval>', 'The delay between ticks', parseInt)
		.action(function(count, command) {

			count = parseInt(count, 10);

			(function tick() {
				if (count> 0) {
					console.log('tick ' + count--);
					setTimeout(tick, command.interval);
				}
			}());

		});

};
