const { dbQuery, createConnectionParams } = require("./db-query");

async function getTables(api) {
	const sql = "SHOW TABLES;";
	const params = createConnectionParams(api);
	const table_rows = await dbQuery(api, sql); //try catch?

	const key = `Tables_in_${params.database}`;
	return table_rows.map(table_row => table_row[key]);
}

async function cli() {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...]")
		.demand(["api"])
		.argv;

	const tables = await getTables(argv.api)
	console.log(tables);
};

module.exports.getTables = getTables;
module.exports.cli = cli;

