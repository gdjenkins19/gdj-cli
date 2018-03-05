module.exports.cli = () => {
	const shell = require("shelljs");

	shell.exec("docker stop fuzion-mysql");
	shell.exec("docker volume rm lmysql");
};