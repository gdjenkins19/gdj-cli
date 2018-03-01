#!/usr/bin/env node
const shell = require("shelljs");
const argv = require("optimist")
	.usage("--op [mysql-reset|mysql-start|db-builder]")
	.demand(["op"])
	.argv;

console.log(`fuzion-cli --op ${argv.op}`);

const ops = argv.op.split('|');

for(let i=0; i<ops.length; i++) {
	console.log(`fuzion-cli --op ${ops[i]}`);
	switch(ops[i]) {
		case "db-builder":
			const dbBuilder = require("./lib/db-builder");
			dbBuilder();
			break;
		case "mysql-start":
			shell.exec("sudo launchctl unload -F /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist");
			shell.exec("docker run -it --rm -v lmysql:/var/lib/mysql -p 3306:3306 --name fuzion-mysql -e MYSQL_ROOT_PASSWORD=coffeetime -d mysql:5.7.20");
			shell.exec("sleep 10");
			break;
		case "mysql-reset":
			shell.exec("docker stop fuzion-mysql");
			shell.exec("docker volume rm lmysql");
			break;
		default:
			fuzionCliError(`fuzion-cli:ERROR unrecognized --op "${ops[i]}"`);
			break;
	}
}

function fuzionCliError(errorString) {
	console.log(errorString);
}


