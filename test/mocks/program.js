var sinon  = require("sinon");
var commander = require('commander');

module.exports = function MockProgram() {
	var program = new commander.Command();
	program.log = function () {};

	sinon.stub(program, "log").returns(void 0);

	program.request = function (opts, callback) {
		throw new Error('Unexpected request: ' + JSON.stringify(opts, null, 2));
	};

	program.runWith = function (argString) {
		program.parse(['node', './'].concat(argString.split(' ')));
	};

	return program;
};
