let mysql = require("mysql");

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

const query = (params, sql, callback) => {
	const conn = mysql.createConnection(params);
	conn.query(sql, (err,res) => {
		if(err) callback(err);
		callback(res);
	});
}

function getTables(api, callback) {
	const params = createConnectionParams(api);
	const sql = "SHOW TABLES;";

	query(params, sql, table_rows => {
		const key = `Tables_in_${params.database}`;
		callback( table_rows.map(table_row => table_row[key]) );
	});
};

const getTableInfo = (api, tableName, callback) => {
	const params = createConnectionParams(api);
	let sql = `SHOW COLUMNS FROM \`${tableName}\`;`;

	query(params, sql, columns => {
		callback( columns );
	});
};

module.exports.tables = (callback) => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...]")
		.demand(["api"])
		.argv;

	getTables(argv.api, callback);
};

module.exports.tableInfo = (callback) => {
	let argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [table]")
		.demand(["api","table"])
		.argv;

	getTableInfo(argv.api, argv.table, callback);
};
