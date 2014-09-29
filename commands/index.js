var fs = require('fs');
var path = require('path');

module.exports = function commandLoader(program) {
	'use strict';

	var commands = {};
	var loadPath = path.dirname(__filename);

	// Loop though command files
	fs.readdirSync(loadPath).filter(function (filename) {
		return (/\.js$/.test(filename) && filename !== 'index.js');
	}).forEach(function (filename) {
		var name = filename.substr(0, filename.lastIndexOf('.'));

		// Require command
		commands[name] = require(path.join(loadPath, filename));

		// Initialize command
		commands[name](program);
	});

	return commands;
};
