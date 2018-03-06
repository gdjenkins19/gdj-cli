const generate = async (path, api) => {
	const shell = require("shelljs");

	//Copy Directories and files
	let cmd = `cp -R ${__dirname}/template/fuzion-api/. ${path}`;
	console.log(cmd);
	shell.exec(cmd);

	//Alter files to match API
	cmd = `sed -i '' 's/DEMO/${api}/g' '${path}/bin/www'`;
	console.log(cmd);
	shell.exec(cmd);
};

const cli = async () => {
	const argv = require("optimist")
	.usage("--api [DEMO|ADMIN|EVENT|...] --path [default is './']")
	.demand(["api"])
	.argv;

	const path = argv.path ? argv.path : process.cwd();
	await generate(path, argv.api);
}

module.exports.generate = generate;
module.exports.cli = cli;
module.exports.help = `Generate Fuzion API scaffolding.`;