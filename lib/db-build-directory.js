const dbBuildDirectory = async (api, dirName, list=null) => {
	console.log(`db-build-directory: ${dirName}`);
	const fs = require("fs");
	const { dbBuildFile } = require("./db-build-file");

	const files = fs.readdirSync(dirName);
	for(file of files) {
		if(file.match(/\.sql$/) && !file.match(/^99\_/)) {
			await dbBuildFile(api, `${dirName}/${file}`, list);
		}
	}
}

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --path [sql file|directory path] --list [path to list file]")
		.demand(["api", "path"])
		.argv;

	await dbBuildDirectory(argv.api, argv.path, argv.list);
}

module.exports.dbBuildDirectory = dbBuildDirectory;
module.exports.cli = cli;
