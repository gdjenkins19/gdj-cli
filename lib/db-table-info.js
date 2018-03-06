async function dbTableInfo(api, table) {
	const pluralize = require("pluralize");
	const camelCase = require("camelcase");
	const upperCamelCase = require("uppercamelcase");

	const { query, connectionParams } = require("./query");
	const params = connectionParams(api);
	const sql = `SHOW COLUMNS FROM \`${table}\`;`;
	const columns = await query(api, sql); //try catch?

	let tableInfo = {
		dbName: params.database,
		tableName: table,
		resourceName: upperCamelCase(table),
		variableName: camelCase(table),
		apiName: pluralize(table.replace(/_/g, "-")),
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
module.exports.help = `
	Returns insformation about a table in a database.

	Required:
		--api \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)
		--table\tTable name in the database (ex. user_profile, app_category_api_function_rel)
`;



