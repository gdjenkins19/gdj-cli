const generateRepository = async (api, table, path) => {
	const { dbTableInfo } = require("./db-table-info");
	const tableInfo = await dbTableInfo(api, table);
	buildRepository(tableInfo, path);
};

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [tableName] --path [storage path]")
		.demand(["api","table"])
		.argv;

	const path = argv.path ? argv.path : process.cwd();
	await generateRepository(argv.api, argv.table, path);
};

const buildRepository = async (tableInfo, path) => {
	const fs = require("fs");
	let templateName = `${__dirname}/template/repository_template.js`;
	let fileName = `${path}/lib/repository/${tableInfo.tableName}_repository.js`;

	let repoTemplate = fs.readFileSync(templateName).toString();

	let resource_fields = "";
	let sep = "";
	Object.keys(tableInfo.columns).map(key => {
		resource_fields += `${sep}${key}: null`;
		sep = ",\n\t";
	});

	repoTemplate = repoTemplate.replace(/RESOURCE_NAME/g, tableInfo.resourceName);
	repoTemplate = repoTemplate.replace(/TABLE_NAME/g, tableInfo.tableName);
	repoTemplate = repoTemplate.replace(/RESOURCE_FIELDS/g, resource_fields);
	repoTemplate = repoTemplate.replace(/TABLE_INFO/g, JSON.stringify(tableInfo));

	let paramater_list = new Array(Object.keys(tableInfo.columns).length);
	paramater_list.fill("?");

	repoTemplate = repoTemplate.replace(/PARAMATER_LIST/g, paramater_list.join(","));

	fs.writeFileSync(fileName, repoTemplate);
};

module.exports.generateRepository = generateRepository;
module.exports.cli = cli;
module.exports.help = `
	Generates default Repository for a table in a database.

	Required:
		--api  \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)
		--table\tName of table to generate (ex. security_role)
		--path \t(Optional: default is './lib/respository') Specifies where to store respository.js (ex. /Users/username/Sites/admin/fuzion-admin-api/lib/repository )
`;