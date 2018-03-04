const shell = require("shelljs");

module.exports.cli = () => {
	shell.exec("docker stop fuzion-mysql");
	shell.exec("docker volume rm lmysql");
};