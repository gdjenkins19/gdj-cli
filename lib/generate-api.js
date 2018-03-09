const generateApi = async (api, path) => {
	const { dbTablesInfo } = require("./db-tables-info");
	const tables = await dbTablesInfo(api);
	const { generateRepository } = require("./generate-repository");
	const { generateService } = require("./generate-service");
	const { generateRoute } = require("./generate-route");

	for(table of tables) {
		await generateRepository(api,table,path);
		await generateService(api,table,path);
		await generateRoute(api,table,path);
	};
};

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --path [storage path]")
		.demand(["api"])
		.argv;

	const path = argv.path ? argv.path : process.cwd();
	await generateApi(argv.api, path);
};

module.exports.generateApi = generateApi;
module.exports.cli = cli;
module.exports.help = `
	Generates default Api for a running database specified by --api.

	Required:
		--api  \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)

	Optional
		--path \t(default is './') Specifies where to store the api (ex. /Users/username/Sites/admin/fuzion-admin-api )
`;