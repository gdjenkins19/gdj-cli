module.exports.cli = () => {
	const shell = require("shelljs");
	const fs = require("fs");

	if (!fs.existsSync("/etc/consul.d")) {
		shell.exec(`sudo cp -R ${__dirname}/template/consul.d /etc/`);
	}

	shell.exec("sudo /etc/consul.d/consul agent -config-dir=/etc/consul.d");
};

module.exports.help = `
	1. Installs consul to /etc (if not installed)
	2. Starts the consul service. (localhost:8500)
`;
