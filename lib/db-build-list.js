const dbBuildList = async (api, fileName) => {
	console.log(`db-build-list: ${fileName}`);
	const fs = require("fs");
	const { dbBuildFile } = require("./db-build-file");

	var text = fs.readFileSync(fileName, 'utf-8');
	var files = text.split("\n");
	files = files.filter(file => file.length > 0); //remove empty lines

	for(file of files) {
		if(file.match(/\.sql$/) && !file.match(/^99\_/)) {
			await dbBuildFile(api, file);
		}
	}
}

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --path [sql file|directory path]")
		.demand(["api", "path"])
		.argv;

	await dbBuildList(argv.api, argv.path);
}

module.exports.dbBuildList = dbBuildList;
module.exports.cli = cli;