module.exports = function commandLoader(program) {
	'use strict';

	program
		.command('hello <name>')
		.description('Say hello to <name>')
		.action(function(name, command) {

			console.log('Hello ' + name);

		});

};
