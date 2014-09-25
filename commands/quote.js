module.exports = function helloCommand(program) {
	'use strict';

	program
		.command('quote <symbol>')
		.description('Get stock quote for <symbol>')
		.action(function (symbol, command) {

			var opts = {};

			opts.uri = 'http://finance.yahoo.com/d/quotes.csv?s=' + symbol.toUpperCase() + '&f=nabs';
			opts.encodeing = 'utf8';

			console.log('Fetching [' + symbol + ']');

			program.request(opts, function (err, req, body) {
				if (err) {
					return program.handleError(err);
				}
				body = body.replace(/\r\n$/, '');
				var rows = body.split('\r\n');
				rows.forEach(function (row) {
					var parts = row.split(',');
					var name = parts[0].replace(/\"/g, '');
					var symbol = parts[3];
					var bid = parts[1];
					if (symbol !== 'N/A') {
						program.successMessage('%s - $%s', name, bid);
					} else {
						program.errorMessage('Unknown symbol: %s', name);
					}
				});
			});

		});

};
