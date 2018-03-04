const mysql = require("mysql");
const core = require("fuzion-core-lib");
const fs = require("fs");

const dbBuildFile = async (api, path, list=null) => {
	console.log(`db-build-file: ${path}`);

	core.dataDisco(core.serviceEnum[api]);

	let connection_params = {
		host: process.env.FUZION_DB_HOST,
		user: process.env.FUZION_DB_USER,
		password: process.env.FUZION_DB_PASS,
		multipleStatements: false
	};

	if (list) {
		fs.appendFileSync(list, `${path.toString()}\n`);
	} else {
		const sqlArray = getSqlFromFile(path.toString());
		await runQueries(connection_params, sqlArray);
	}
};

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --path [sql file|directory path] --list [path to list text file]")
		.demand(["api", "path"])
		.argv;

	await dbBuildFile(argv.api, argv.path, argv.list);
}

module.exports.dbBuildFile = dbBuildFile;
module.exports.cli = cli;

function getSqlFromFile(fileName, sqlArray) {
	var sqlArray = [];
	const lines = getLinesFromFile(fileName);

	//Convert Array of lines into an array of SQL Statements
	//State machine
	var state = 0;
	var curr = "";
	var sep = "";

	lines.forEach(function (line) {
		//console.log(`l: ${line}`);
		switch (state) {
			case 0:
				//Beginning of a new SQL statement
				if (line.search(/delimiter \/\//) > -1) {
					//Ignoring the first line since don't need the DELIMITER when running single statements
					state = 2;
				} else {
					curr = curr + sep + line;
					sep = " ";
					state = line.search(/\;/) === -1 ? 1 : 0;
				}
				break;
			case 1:
				//Building Regular Statemnt
				curr = curr + sep + line;
				state = line.search(/\;/) === -1 ? 1 : 0;
				break;
			case 2:
				//Building Delimiter|Create|Function
				curr = curr + sep + line;
				sep = " ";
				if (line.search(/end \/\//) > -1) {
					curr = curr.replace(/end \/\/.*$/i, "end");
					state = 3;
				}
				break;
			case 3:
				//Ignoring after 'END' in Delimiter|Create|Function
				state = line.search(/delimiter/) > -1 ? 0 : 3;
				break;
		}
		//If state has been set to 0, then go ahead and reset and save SQL statement that has been created
		if (state === 0) {
			sqlArray.push(curr);
			curr = "";
			sep = "";
		}
	});
	return sqlArray;
}

function getLinesFromFile(fileName) {
	//Get the SQL File as an array of strings and no empty lines
	var text = fs.readFileSync(fileName, 'utf-8');
	var lines = text.split("\n");

	lines = lines.map(x => x.replace("\r", ""));
	lines = lines.map(x => x.replace("\t", " "));
	lines = lines.map(x => x.replace(/  +/, " "));
	lines = lines.filter(line => line.length > 0); //remove empty lines
	lines = lines.filter(line => line.search(/^\s*\-\-/) === -1); //remove comments
	lines = lines.map(x => x.replace(/\-\-.*/, ""));

	return lines;
}

// SQL file should start with a create schema command (no database in params!)
// SQL should include a 'use `database_name`;' command, we use it to set the database in params later
async function runQueries(params, sqlArray) {
	for(sql of sqlArray) {
		var db = sql.match(/USE \`(.+)\`\;/i) || sql.match(/^USE (.+)\;/i);
		if (db) {
			params.database = db[1];
		}
		const results = await query(params, sql);
	}
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
