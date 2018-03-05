module.exports.cli = () => {
	const shell = require("shelljs");

	shell.exec("docker stop fuzion-mysql");
	shell.exec("docker volume rm lmysql");
};

module.exports.help = `
	Stops the mysql container (fuzion-mysql) and deletes all databases aand data (lmysl).
`;