module.exports.cli = () => {
	const shell = require("shelljs");

	shell.exec("sudo launchctl unload -F /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist");
	shell.exec("docker run -it --rm -v lmysql:/var/lib/mysql -p 3306:3306 --name fuzion-mysql -e MYSQL_ROOT_PASSWORD=coffeetime -d mysql:5.7.20");
	shell.exec("sleep 10");
};
