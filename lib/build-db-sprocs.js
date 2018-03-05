const { dbTableInfo } = require("./db-table-info");
const { dbTablesInfo } = require("./db-tables-info");
const { buildTableSprocs } = require("./build-table-sprocs");

const buildDbSprocs = async (api, path) => {
	const tables = await dbTablesInfo(api);
	for(table of tables) {
		await buildTableSprocs(api, table, path);
	}
};

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [tableName]")
		.demand(["api","path"])
		.argv;

	await buildDbSprocs(argv.api, argv.path);
};

module.exports.buildDbSprocs = buildDbSprocs;
module.exports.cli = cli;
