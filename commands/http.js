var http = require('http');

module.exports = function (program) {
	'use strict';

	function validatePort(rawPort) {
		return parseInt(rawPort, 10) > 1000;
	}

	function createServer(port) {
		port = parseInt(port, 10);

		if (validatePort(port)) {
			console.log('Opening http server on port:', port);
			http.createServer(function (req, res) {
				console.log(req.url);
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Hello World!');
			}).listen(port);
		} else {
			console.error('Invalid or missing port number');
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
						throw new Error(err);
					} else {
						createServer(result.port);
					}
				});
			} else {
				createServer(port);
			}

		});

};
