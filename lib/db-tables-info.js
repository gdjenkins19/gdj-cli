async function dbTablesInfo(api) {
	const { query, connectionParams } = require("./query");
	const sql = "SHOW TABLES;";
	const params = connectionParams(api);
	const table_rows = await query(api, sql); //try catch?

	const key = `Tables_in_${params.database}`;
	return table_rows.map(table_row => table_row[key]);
}

async function cli() {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...]")
		.demand(["api"])
		.argv;

	const tables = await dbTablesInfo(argv.api)
	console.log(tables);
};

module.exports.dbTablesInfo = dbTablesInfo;
module.exports.cli = cli;
module.exports.help = `
	Returns a list of tables in a database.

	Required:
		--api \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)
`;
