var sinon  = require("sinon");
var assert = require('chai').assert;
var MockProgram = require('../mocks/program');
var HelloCommand = require('../../commands/hello');

describe('Command Hello', function () {
	var helloCommand;

	beforeEach(function () {
		sinon.stub(console, "log").returns(void 0);
		program = new MockProgram();
		helloCommand = new HelloCommand(program);
	});

	afterEach(function () {
		console.log.restore();
	});

	describe('run command', function () {
		it('should log the name argument', function () {
			program.runWith('hello test-name');
			assert.equal(console.log.getCall(0).args[0], 'Hello test-name');
		});

		it('should log name to program log', function () {
			program.runWith('hello test-name');
			assert.equal(program.log.getCall(0).args[0], 'test-name');
		});
	});
});
