let mysql = require("mysql");
// let fs = require("fs");
// let pluralize = require("pluralize");
// let camelCase = require("camelcase");
// let upperCamelCase = require("uppercamelcase");

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
			if ( err ) reject( err );
            resolve( results );
		});
	} );
}

// const getTables = (api) => {
// 	const params = createConnectionParams(api);
// 	const sql = "SHOW TABLES;";

// 	return query(params,sql)
// 			.then(table_rows => {
// 				let key = `Tables_in_${params.database}`;
// 				table_rows.map(table_row => table_row[key]);
// 				return table_rows;
// 			});
// };

async function getTables(api) {
	const params = createConnectionParams(api);
	const sql = "SHOW TABLES;";
	const table_rows = await query(params,sql);
	const key = `Tables_in_${params.database}`;

	return table_rows.map(table_row => table_row[key]);
};

const getTableInfo = (api,tableName) => {

};

module.exports.tables = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...]")
		.demand(["api"])
		.argv;

	try {
		const tables = await getTables(argv.api);
		console.log(tables);
	} catch (err) {
		console.log(`No tables: ${err}`);
	}
};

module.exports.tableInfo = () => {
	let argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [table]")
		.demand(["api","table"])
		.argv;

	getTableInfo(argv.api, argv.table);
};
