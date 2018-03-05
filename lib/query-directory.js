const queryDirectory = async (api, dirName, list=null) => {
	console.log(`query-directory: ${dirName}`);
	const fs = require("fs");
	const { queryFile } = require("./query-file");

	const files = fs.readdirSync(dirName);
	for(file of files) {
		if(file.match(/\.sql$/) && !file.match(/^99\_/)) {
			await queryFile(api, `${dirName}/${file}`, list);
		}
	}
}

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --path [sql file|directory path] --list [path to list file]")
		.demand(["api", "path"])
		.argv;

	await queryDirectory(argv.api, argv.path, argv.list);
}

module.exports.queryDirectory = queryDirectory;
module.exports.cli = cli;
