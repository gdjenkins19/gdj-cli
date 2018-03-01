const shell = require("shelljs");

module.exports.start = () => {
	shell.exec("sudo launchctl unload -F /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist");
	shell.exec("docker run -it --rm -v lmysql:/var/lib/mysql -p 3306:3306 --name fuzion-mysql -e MYSQL_ROOT_PASSWORD=coffeetime -d mysql:5.7.20");
	shell.exec("sleep 10");
};

module.exports.reset = () => {
	shell.exec("docker stop fuzion-mysql");
	shell.exec("docker volume rm lmysql");
};