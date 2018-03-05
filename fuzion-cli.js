#!/usr/bin/env node
const fs = require("fs");
const path = `${__dirname}/lib`;
const argv = require("optimist")
	.demand('op')
	.usage(`\nfuzion-cli -op operation-name\nfuzion-cli -op operation-name --help\nfuzion-cli -op "operation-name1|operation-name2|..."\n\nOperations:${listCliOperations()}`)
	.argv;

function listCliOperations() {
	let opFiles = fs.readdirSync(path);
	opFiles = opFiles.filter(fileName => (fs.lstatSync(`${path}/${fileName}`).isFile() && fileName.match(/\.js$/)));
	return opFiles.map(file => '\n\t' + file.replace('.js',''));
}

const ops = argv.op.split('|');

iterateOps(ops);

async function iterateOps(ops) {
	for(op of ops) {
		console.log(`fuzion-cli -op ${op}`);
		try {
			const opMod = require(`${path}/${op}`);
			await (argv.help) ? console.log(opMod.help) : opMod.cli();
		} catch (error) {
			console.log(`${error}`);
			//console.log(error);
		}
	}
}

