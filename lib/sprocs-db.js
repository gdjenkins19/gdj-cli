const sprocsDb = async (api, path) => {
	const { dbTablesInfo } = require("./db-tables-info");
	const { sprocs } = require("./sprocs");
	const tables = await dbTablesInfo(api);

	for(table of tables) {
		await sprocs(api, table, path);
	}
};

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [tableName]")
		.demand(["api","path"])
		.argv;

	await sprocsDb(argv.api, argv.path);
};

module.exports.sprocsDb = sprocsDb;
module.exports.cli = cli;
module.exports.help = `
	Generates CRUD sprocs for all the tables in a database.

	Required:
		--api \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)
		--path\tSpecifies where to store the generated sprocs (ex. (ex. /Users/username/Sites/admin/fuzion-db-scripts/01_FUZION_ADMIN/sprocs )
`;