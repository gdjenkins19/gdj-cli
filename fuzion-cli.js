#!/usr/bin/env node

const argv = require("optimist")
	.usage("--op [gdj1|gdj2]")
	.demand(["op"])
	.argv;

console.log(`fuzion-cli --op {}`);

switch(argv.op) {
	case "gdj1":
		const gdj1 = require("./lib/gdj-cli-1");
		gdj1();
		break;
	case "gdj2":
		const gdj1 = require("./lib/gdj-cli-2");
		gdj2();
		break;
	default:
		fuzionCliError(`fuzion-cli:ERROR unrecognized --op "${argv.op}"`);
		break;
}

function fuzionCliError(errorString) {
	console.log(errorString);
}