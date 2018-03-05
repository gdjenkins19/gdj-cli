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
		.usage("--api [API] --path [path_to_file]")
		.demand(["api", "path"])
		.argv;

	await queryList(argv.api, argv.path);
}

module.exports.queryList = queryList;
module.exports.cli = cli;
module.exports.help = `
	Opens a text file list of SQL files, and sends them to the DB for an API.

	Required:
		--api \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)
		--path\tPath to list file. (ex. ./dirname/filename.txt , ../upone/dirname/filename.txt , /full/path/dirname/filename.txt )

	Note:
		The query operations with the --list option will generate a list file.
`;
