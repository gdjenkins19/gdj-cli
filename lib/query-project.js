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
module.exports.help = `
	Opens a fuzion-db-scripts project, and sends the .sql files to the DB for an API.

	Required:
		--api \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)
		--path\tPath to fuzion-db-scripts project directory (ex. /Users/username/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN )

	Optional:
		--list\tPathe to a list file. The files will not be sent to the DB, but will be written to the list file.

	Note:
		Excludes 99_.*.sql Big Ass Script Files.
		Runs Scripts in /scripts directory.
		Runs Scripts in /sprocs directory.
`;

