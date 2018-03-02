#!/usr/bin/env node
const argv = require("optimist")
	.usage("--op [mysql-reset|mysql-start|db-builder|]")
	.demand(["op"])
	.argv;

console.log(`fuzion-cli --op ${argv.op}`);

const ops = argv.op.split('|');

for(let i=0; i<ops.length; i++) {
	console.log(`fuzion-cli --op ${ops[i]}`);
	switch(ops[i]) {
		case "db-builder":
			require("./lib/db-builder")();
			break;
		case "mysql-start":
			require("./lib/mysql-ops").start();
			break;
		case "mysql-reset":
			require("./lib/mysql-ops").reset();
			break;
		case "db-tables":
			require("./lib/db").tables(tables => {console.log(tables);});
			console.log("here2");
			break;
		case "db-table-info":
			require("./lib/db").tableInfo(info => {console.log(info);});
			console.log("here2");
			break;
		default:
			fuzionCliError(`fuzion-cli:ERROR unrecognized --op "${ops[i]}"`);
			break;
	}
}

function fuzionCliError(errorString) {
	console.log(errorString);
}
