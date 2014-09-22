var http = require('http');

module.exports = function httpCommand(program) {
	'use strict';

	function validatePort(rawPort) {
		return parseInt(rawPort, 10) > 1000;
	}

	function createServer(portRaw) {
		var port = parseInt(portRaw, 10);

		if (validatePort(port)) {
			program.successMessage('Opening http server on port: %s', port);
			http.createServer(function (req, res) {
				program.log(req.url);
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Hello World!');
			}).listen(port);
		} else {
			program.errorMessage('Port number (%s) is invalid', portRaw);
			process.exit(1);
		}
	}

	program
		.command('http [port]')
		.description('Listen for http requests on <port>')
		.action(function(port) {

			if (!port) {
				program.prompt.get({
					properties: {
						port: {
							description: 'Enter a port number:',
							conform: validatePort,
							pattern: /^\d+$/
						}
					}
				}, function (err, result) {
					if (err) {
						return program.handleError(err);
					} else {
						createServer(result.port);
					}
				});
			} else {
				createServer(port);
			}

		});

};
