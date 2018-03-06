const generateService = async (api, table, path) => {
	const { dbTableInfo } = require("./db-table-info");
	const tableInfo = await dbTableInfo(api, table);
	buildService(tableInfo, path);
};

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [tableName] --path [storage path]")
		.demand(["api","table"])
		.argv;

	const path = argv.path ? argv.path : process.cwd();
	await generateService(argv.api, argv.table, path);
};

const buildService = async (tableInfo, path) => {
	let templateName = `${__dirname}/lib/template/service_template.js`;
	let fileName = `${path}/liv/service/${tableInfo.tableName}_service.js`;

	let servTemplate = fs.readFileSync(templateName).toString();

	servTemplate = servTemplate.replace(/ResourceName/g, tableInfo.resourceName);
	servTemplate = servTemplate.replace(/table\_name/g, tableInfo.tableName);
	servTemplate = servTemplate.replace(/variableName/g, tableInfo.variableName);

	fs.writeFileSync(fileName, servTemplate);
};

module.exports.generateService = generateService;
module.exports.cli = cli;
module.exports.help = `
	Generates default service for a table in a database.

	Required:
		--api  \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)
		--table\tName of table to generate (ex. security_role)
		--path \t(Optional: default is './lib/service') Specifies where to store service.js (ex. /Users/username/Sites/admin/fuzion-admin-api/lib/service )
`;