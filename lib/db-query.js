const createConnectionParams = (api, noDb=false) => {
	const core = require("fuzion-core-lib");

	core.dataDisco(core.serviceEnum[api]);

	const connection_params = {
		host: process.env.FUZION_DB_HOST,
		user: process.env.FUZION_DB_USER,
		password: process.env.FUZION_DB_PASS,
		database: process.env.FUZION_DB_SCHEMA,
		multipleStatements: false
	};

	if(noDb) delete connection_params.database;

	return connection_params;
}

const dbQuery = (api, sql, noDb=false) => {
	return new Promise( (resolve,reject) => {
		const mysql = require("mysql");
		const params = createConnectionParams(api, noDb);
		const conn = mysql.createConnection(params);

		conn.query(sql, function (err, results) {
			conn.destroy();
			if ( err ) reject( err );
            resolve( results );
		});
	} );
}

const cli = async () => {
	let argv = require("optimist")
		.usage('--api [DEMO|ADMIN|EVENT|...] --sql "sql statement to execute"')
		.demand(["api","sql"])
		.argv;

	const result = await dbQuery(argv.api, argv.sql);
	console.log(result);
};

module.exports.dbQuery = dbQuery;
module.exports.createConnectionParams = createConnectionParams;
module.exports.cli = cli;
