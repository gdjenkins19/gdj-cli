const generate = async (api, project, path) => {
	const shell = require("shelljs");
	const core = require("fuzion-core-lib");

	core.dataDisco(core.serviceEnum[api]);

	//Copy Directories and files
	let cmd = `cp -R ${__dirname}/template/fuzion-api/. ${path}`;
	console.log(cmd);
	shell.exec(cmd);

	//Alter files to match API
	cmd = `sed -i '' 's/DEMO/${api}/g' '${path}/bin/www'`;
	console.log(cmd);
	shell.exec(cmd);

	cmd = `sed -i '' 's/fuzion-demo/${project}/g' '${path}/package.json'`;
	console.log(cmd);
	shell.exec(cmd);
};

const cli = async () => {
	const argv = require("optimist")
	.usage("--api [DEMO|ADMIN|EVENT|...] --project fuzion-project-api --path [default is './']")
	.demand(["api","project"])
	.argv;

	const path = argv.path ? argv.path : process.cwd();
	await generate(argv.api, argv.project, path);
}

module.exports.generate = generate;
module.exports.cli = cli;
module.exports.help = `
	Generate Fuzion API scaffolding ...

	--api	DataDisco api name (ex. ADMIN, CONTACT, EXHIBITOR)
	--project github project name (ex. fuzion-admin-api, fuzion-exhibitor-api)
	--path	(optional) path to create project, defaults to ./
`;