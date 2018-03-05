const { dbQuery, createConnectionParams } = require("./db-query");

async function dbTableInfo(api, table) {
	const params = createConnectionParams(api);
	const sql = `SHOW COLUMNS FROM \`${table}\`;`;
	const columns = await dbQuery(api, sql); //try catch?

	let tableInfo = {
		dbName: params.database,
		tableName: table,
		columns: {}
	};

	columns.map(column => {
		tableInfo.columns[column.Field] = {};
		Object.assign(tableInfo.columns[column.Field], column);
		delete tableInfo.columns[column.Field].Field;
	});

	return tableInfo;
};

const cli = async() => {
	let argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [table]")
		.demand(["api","table"])
		.argv;

	const info = await dbTableInfo(argv.api, argv.table);
	console.log(info);
};

module.exports.dbTableInfo = dbTableInfo;
module.exports.cli = cli;


