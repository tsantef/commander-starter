var program = require('commander');
var commands = require('./commands')(program);
var packageJson = require('./package.json');

// Initialize cli options
program
	.version(packageJson.version)
	.usage('<command> [options]');

// Initialize prompt
program.prompt = require('prompt');
program.prompt.message = '';
program.prompt.delimiter = '';
program.prompt.colors = false;

// Process Commands
program.parse(process.argv);

if (typeof program.args.slice(-1)[0] !== 'object') {
	console.log('Unknown Command: ' + program.args.join(' '));
	program.help();
}
