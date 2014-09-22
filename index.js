var program = require('commander');
var packageJson = require('./package.json');

// Initialize cli options
program
	.version(packageJson.version)
	.usage('<command> [options]');

// Process Commands
program.parse(process.argv);

if (typeof program.args.slice(-1)[0] !== 'object') {
	console.log('Unknown Command: ' + program.args.join(' '));
	program.help();
}
