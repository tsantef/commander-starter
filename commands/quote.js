var Table = require('cli-table');

module.exports = function helloCommand(program) {
	'use strict';

	program
		.command('quote <symbol>')
		.description('Get stock quote for <symbol>')
		.action(function (symbol, command) {

			var opts = {};

			var dataKeys = {
				s: 'Symbol',
				n: 'Name',
				a: 'Ask',
				b: 'Bid',
				w: '52 week Range',
				v: 'Volume',
				e: 'Earnings / Share',
				j1: 'Market Capitalization'
			};

			opts.uri = 'http://finance.yahoo.com/d/quotes.csv?s=' + symbol.toUpperCase() + '&f=' + Object.keys(dataKeys).join('');
			opts.encodeing = 'utf8';

			process.stdout.write('Fetching [' + symbol + '] ');

			program.request(opts, function (err, req, body) {
				var rows;
				if (err) {
					return program.handleError(err);
				}
				body = body.replace(/\r\n$/, '');
				rows = body.split('\r\n');

				var table = new Table({
					head: Object.keys(dataKeys).map(function (key) {
						return dataKeys[key];
					})
				});

				rows.forEach(function (row) {
					var parts = row.split(',').map(function (cell) {
						return cell.replace(/\"/g, '');
					});
					table.push(parts);
				});

				console.log(table.toString());
			});

		});

};
