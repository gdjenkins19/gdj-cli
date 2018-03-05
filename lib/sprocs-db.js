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

module.exports.sprocs = sprocs;
module.exports.cli = cli;
