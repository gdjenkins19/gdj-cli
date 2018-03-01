const mysql = require("mysql");
const core = require("fuzion-core-lib");
const fs = require("fs");
const argv = require("optimist")
	.usage("--data [DEMO|ADMIN|EVENT|...] --mode [file|directory|project|list] --path [sql file|directory path] --list [filename]")
	.demand(["path","data","mode"])
	.argv;


module.exports = () => {
	core.dataDisco(core.serviceEnum[argv.data]);

	let connection_params = {
		host: process.env.FUZION_DB_HOST,
		user: process.env.FUZION_DB_USER,
		password: process.env.FUZION_DB_PASS,
		multipleStatements: false
	};

	console.log(`DB_Builder ... ${argv.mode}: ${argv.path}`);

	var sqlArray = [];

	switch (argv.mode) {
		case "file":
			getSqlFromFile(argv.path.toString(), sqlArray)
			break;
		case "directory":
			getSqlFromDirectory(argv.path.toString(), sqlArray);
			break;
		case "project":
			getSqlFromProject(argv.path.toString(), sqlArray);
			break;
		case "list":
			getSqlFromList(argv.path.toString(), sqlArray);
			break;
		default:
			console.log(`DB_Builder ... Unknown --mode (${argv.mode})`);
	}

	//console.log(sqlArray);

	if(sqlArray.length > 0 && !argv.list) {
		runQueries(connection_params, sqlArray, 1);
	}
};

function getSqlFromProject(dirName, sqlArray) {
	console.log(`getSqlFromProject(${dirName})`);
	getSqlFromDirectory(`${dirName}/scripts`,sqlArray);
	getSqlFromDirectory(`${dirName}/sprocs`,sqlArray);
}

function getSqlFromDirectory(dirName, sqlArray) {
	console.log(`getSqlFromDirectory(${dirName})`);
	const items = fs.readdirSync(dirName);
	for(let i=0; i<items.length; i++) {
		if(items[i].match(/\.sql$/) && !items[i].match(/^99\_/)) {
			getSqlFromFile(`${dirName}/${items[i]}`,sqlArray);
		}
	}
}

function getSqlFromList(fileName, sqlArray) {
	var text = fs.readFileSync(fileName, 'utf-8');
	var items = text.split("\n");
	items = items.filter(line => line.length > 0); //remove empty lines
	for(let i=0; i<items.length; i++) {
		if(items[i].match(/\.sql$/) && !items[i].match(/^99\_/)) {
			getSqlFromFile(items[i],sqlArray);
		}
	}
}

function listFile(fileName) {
	if(argv.list) {
		fs.appendFileSync(argv.list, `${fileName}\n`);
	}
}

function getSqlFromFile(fileName, sqlArray) {
	console.log(`getSqlFromFile(${fileName})`);
	listFile(fileName);
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
function runQueries(params, sqlArray, cnt) {
	var sql = sqlArray.shift();
	console.log(`runQueries(${cnt})`);

	var db = sql.match(/USE \`(.+)\`\;/i) || sql.match(/^USE (.+)\;/i);
	if (db) {
		params.database = db[1];
	}

	var conn = mysql.createConnection(params);

	conn.query(sql, function (err, results) {
		if (err) throw err;
		conn.end();

		if (sqlArray.length > 0) {
			runQueries(params, sqlArray, cnt + 1);
		}
	});
}
