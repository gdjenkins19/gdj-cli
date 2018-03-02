let mysql = require("mysql");
let pluralize = require("pluralize");
let camelCase = require("camelcase");
let upperCamelCase = require("uppercamelcase");

function createConnectionParams(api) {
	const core = require("fuzion-core-lib");
	core.dataDisco(core.serviceEnum[api]);

	const connection_params = {
		host: process.env.FUZION_DB_HOST,
		user: process.env.FUZION_DB_USER,
		password: process.env.FUZION_DB_PASS,
		database: process.env.FUZION_DB_SCHEMA,
		multipleStatements: false
	};

	return connection_params;
}

const query = (params, sql) => {
	return new Promise( (resolve,reject) => {
		const conn = mysql.createConnection(params);
		conn.query(sql, function (err, results) {
			conn.destroy();
			if ( err ) reject( err );
            resolve( results );
		});
	} );
}

async function getTables(api) {
	const params = createConnectionParams(api);
	const sql = "SHOW TABLES;";
	const table_rows = await query(params, sql); //try catch?

	const key = `Tables_in_${params.database}`;
	return table_rows.map(table_row => table_row[key]);
}

async function cliTables() {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...]")
		.demand(["api"])
		.argv;

	const tables = await getTables(argv.api)
	console.log(tables);
};

async function getTableInfo(api, tableName) {
	const params = createConnectionParams(api);
	const sql = `SHOW COLUMNS FROM \`${tableName}\`;`;
	const columns = await query(params, sql); //try catch?

	let tableInfo = {
		dbName: params.database,
		tableName: tableName,
		columns: {}
	};

	columns.map(column => {
		tableInfo.columns[column.Field] = {};
		Object.assign(tableInfo.columns[column.Field], column);
		delete tableInfo.columns[column.Field].Field;
	});

	return tableInfo;
};

async function cliTableInfo() {
	let argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [table]")
		.demand(["api","table"])
		.argv;

	const info = await getTableInfo(argv.api, argv.table);
	console.log(info);
};

module.exports.getTables = getTables;
module.exports.cliTables = cliTables;
module.exports.getTableInfo = getTableInfo;
module.exports.cliTableInfo = cliTableInfo;

