var _intervalId = null;

module.exports = {
	start: function () {
		process.stdout.write('.');
		if (process.stdout.isTTY) {
			_intervalId = _intervalId || setInterval(function () {
				process.stdout.write('.');
			}, 1000);
		}
	},
	stop: function () {
		if (process.stdout.isTTY && _intervalId) {
			clearInterval(_intervalId);
			_intervalId = null;
			console.log('');
		}
	}
};
