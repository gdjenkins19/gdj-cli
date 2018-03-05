const queryList = async (api, fileName) => {
	console.log(`query-list: ${fileName}`);
	const fs = require("fs");
	const { queryFile } = require("./query-file");

	var text = fs.readFileSync(fileName, 'utf-8');
	var files = text.split("\n");
	files = files.filter(file => file.length > 0); //remove empty lines

	for(file of files) {
		if(file.match(/\.sql$/) && !file.match(/^99\_/)) {
			await queryFile(api, file);
		}
	}
}

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --path [sql file|directory path]")
		.demand(["api", "path"])
		.argv;

	await queryList(argv.api, argv.path);
}

module.exports.queryList = queryList;
module.exports.cli = cli;