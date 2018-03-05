const queryProject = async (api, dirName, list=null) => {
	console.log(`query-project: ${dirName}`);
	const { queryDirectory } = require("./query-directory");

	await queryDirectory(api, `${dirName}/scripts`, list);
	await queryDirectory(api, `${dirName}/sprocs`, list);
}

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --path [sql file|directory path] --list [filename]")
		.demand(["api", "path"])
		.argv;

	await queryProject(argv.api, argv.path, argv.list);
}

module.exports.queryProject = queryProject;
module.exports.cli = cli;
