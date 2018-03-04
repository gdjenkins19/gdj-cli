#!/usr/bin/env node
const fs = require("fs");
const path = `${__dirname}/lib`;
const argv = require("optimist")
	.demand('o')
	.alias('o','operation')
	.describe('o',"Run a CLI operation.")
	.usage(`fuzion-cli -o operation-name\nfuzion-cli -o "operation-name1|operation-name2|..."\nOperations:${listCliOperations()}`)
	.demand(['o'])
	.argv;

function listCliOperations() {
	let opFiles = fs.readdirSync(path);
	opFiles = opFiles.filter(fileName => (fs.lstatSync(`${path}/${fileName}`).isFile() && fileName.match(/\.js$/)));
	return opFiles.map(file => ' ' + file.replace('.js',''));
}

const ops = argv.o.split('|');

iterateOps(ops);

async function iterateOps(ops) {
	for(op of ops) {
		console.log(`fuzion-cli -o ${op}`);
		try {
			const opMod = require(`${path}/${op}`);
			await opMod.cli();
		} catch (error) {
			console.log(`${error}`);
			//console.log(error);
		}
	}
}

