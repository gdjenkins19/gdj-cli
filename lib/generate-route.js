const generateRoute = async (api, table, path) => {
	const { dbTableInfo } = require("./db-table-info");
	const tableInfo = await dbTableInfo(api, table);
	buildRoute(tableInfo, path);
	addRoute(tableInfo, path);
};

const cli = async () => {
	const argv = require("optimist")
		.usage("--api [DEMO|ADMIN|EVENT|...] --table [tableName] --path [storage path]")
		.demand(["api","table"])
		.argv;

	const path = argv.path ? argv.path : process.cwd();
	await generateRoute(argv.api, argv.table, path);
};

const buildRoute = async (tableInfo, path) => {
	const fs = require("fs");
	let templateName = `${__dirname}/template/route_template.js`;
	let fileName = `${path}/routes/${tableInfo.tableName}_route.js`;

	let routeTemplate = fs.readFileSync(templateName).toString();

	routeTemplate = routeTemplate.replace(/RESOURCE_NAME/g, tableInfo.resourceName);
	routeTemplate = routeTemplate.replace(/VARIABLE_NAME/g, tableInfo.variableName);
	routeTemplate = routeTemplate.replace(/TABLE_NAME/g, tableInfo.tableName);
	routeTemplate = routeTemplate.replace(/API_RESOURCE/g, tableInfo.apiName);

	fs.writeFileSync(fileName, routeTemplate);
};

const addRoute = async (tableInfo, path) => {
	const fs = require("fs");
	let appFile = `${path}/app.js`;
	let appFileText = fs.readFileSync(appFile).toString();

	appFileText = appFileText.replace(
		/\/\/FUZION\-ROUTE\-OBJECTS\-END/g,
		`const ${tableInfo.variableName} = require("./routes/${tableInfo.tableName}_route");\n//FUZION-ROUTE-OBJECTS-END`
	);

	appFileText = appFileText.replace(
		/\/\/FUZION\-ROUTES\-END/g,
		`app.use(${tableInfo.variableName}.path, ${tableInfo.variableName}.router);\n//FUZION-ROUTES-END`
	);

	fs.writeFileSync(appFile, appFileText);
};

module.exports.generateRoute = generateRoute;
module.exports.cli = cli;
module.exports.help = `
	Generates default Route for a table in a database.

	Required:
		--api  \tData Disco Name for an API (ex. ADMIN, CONTACT, EXHIBITOR, EVENT)
		--table\tName of table to generate (ex. security_role)
		--path \t(Optional: default is './') Specifies path to project (ex. /Users/username/Sites/admin/fuzion-admin-api )
`;