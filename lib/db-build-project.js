const fs = require("fs");
const { dbBuildDirectory } = require("./db-build-directory");

const dbBuildProject = async (api, dirName, list=null) => {
	console.log(`db-build-project: ${dirName}`);

	await dbBuildDirectory(api, `${dirName}/scripts`, list);
	await dbBuildDirectory(api, `${dirName}/sprocs`, list);
}

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --path [sql file|directory path] --list [filename]")
		.demand(["api", "path"])
		.argv;

	await dbBuildProject(argv.api, argv.path, argv.list);
}

module.exports.dbBuildProject = dbBuildProject;
module.exports.cli = cli;
