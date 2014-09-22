var fs = require('fs');
var path = require('path');

module.exports = function commandLoader(program) {
	'use strict';

	var commands = {};

	var commandPath = path.dirname(__filename);

	fs.readdirSync(commandPath).forEach(function (filename) {
		var name = filename.substr(0, filename.lastIndexOf('.'));
		if (name !== 'index') {
			commands[name] = require(path.join(commandPath, filename))(program);
		}
	});

	return commands;
};
