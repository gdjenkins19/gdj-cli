#!/usr/bin/env node
const argv = require("optimist")
	.usage("--op [mysql-reset|mysql-start|db-builder|db-tables|db-table-info]")
	.demand(["op"])
	.argv;

console.log(`fuzion-cli --op ${argv.op}`);

const ops = argv.op.split('|');

iterateOps(ops);

async function iterateOps(ops) {
	for(let i=0; i<ops.length; i++) {
		console.log(`fuzion-cli --op ${ops[i]}`);
		await callAsync(ops[i]);
	}
}

async function callAsync(op) {
	switch(op) {
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
			await require("./lib/db").cliTables();
			break;
		case "db-table-info":
			await require("./lib/db").cliTableInfo();
			break;
		default:
			fuzionCliError(`fuzion-cli:ERROR unrecognized --op "${op}"`);
			break;
	}
}

function fuzionCliError(errorString) {
	console.log(errorString);
}
