var sinon  = require("sinon");
var assert = require('chai').assert;
var request = require('request');
var MockProgram = require('../mocks/program');
var QuoteCommand = require('../../commands/quote');

require('colors').mode = 'none'; // turn off colors

describe('Command Quote', function () {
	var quoteCommand;

	beforeEach(function () {
		program = new MockProgram();
		sinon.stub(console, "log").returns(void 0);
		sinon
			.stub(program, 'request')
      .yields(null, null, "\"MSFT\",\"Microsoft Corpora\",46.44,N/A,\"32.80 - 47.57\",26090980,2.63,382.7B\r\n");

		quoteCommand = new QuoteCommand(program);
	});

	afterEach(function () {
		program.request.restore();
		console.log.restore();
	});

	describe('run command', function () {
		it('should fetch quote', function () {
			program.runWith('quote msft');
			assert.equal(program.request.getCall(0).args[0].uri, 'http://finance.yahoo.com/d/quotes.csv?s=MSFT&f=snabwvej1');
		});

		it('should render quote table', function () {
			program.runWith('quote msft');
			assert.equal(console.log.getCall(0).args[0], [
				'┌────────┬───────────────────┬───────┬─────┬───────────────┬──────────┬──────────────────┬───────────────────────┐',
				'│ Symbol │ Name              │ Ask   │ Bid │ 52 week Range │ Volume   │ Earnings / Share │ Market Capitalization │',
				'├────────┼───────────────────┼───────┼─────┼───────────────┼──────────┼──────────────────┼───────────────────────┤',
				'│ MSFT   │ Microsoft Corpora │ 46.44 │ N/A │ 32.80 - 47.57 │ 26090980 │ 2.63             │ 382.7B                │',
				'└────────┴───────────────────┴───────┴─────┴───────────────┴──────────┴──────────────────┴───────────────────────┘'
			].join('\n'));
		});
	});
});
