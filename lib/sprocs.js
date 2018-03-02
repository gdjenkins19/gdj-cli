const db = require("./db");
const fs = require("fs");
const argv = require("optimist")
	.usage("--api [DEMO|ADMIN|EVENT|...] --table [tableName]")
	.demand(["api","path"])
	.argv;

module.exports.build = async () => {
	const tables = argv.table ? [argv.table] : await db.getTables(argv.api);
	console.log(tables);
	for(table of tables) {
		const tableInfo = await db.getTableInfo(argv.api, table);
		console.log(`${table}: ${tableInfo}`);
		buildSprocs(tableInfo);
	}
}

function buildSprocs(tableInfo) {
	let templates = [
		"sproc_template_count.sql",
		"sproc_template_insert.sql",
		"sproc_template_select_id.sql",
		"sproc_template_select.sql",
		"sproc_template_set_status.sql",
		"sproc_template_update.sql"
	];

	for (let i=0; i<templates.length; i++) {
		buildSproc(templates[i],tableInfo);
	}
}

function buildSproc(template, tableInfo) {
	let sprocName = template.replace("sproc_template",tableInfo.tableName);
	sprocName = sprocName.replace(".sql","_sproc.sql");

	let templateName = `${__dirname}/template/${template}`;
	let fileName = `${argv.path}/${sprocName}`;

	let sprocTemplate = fs.readFileSync(templateName).toString();
	console.log(`opened template: ${templateName}`);

	let table_params = "";
	let insert_cols = "";
	let insert_vals = "";
	let select_cols = "";
	let update_sets = "";

	let column_names = Object.keys(tableInfo.columns);
	let sep = "";

	sep = "";
	sep0 = "";
	sep1 = "";
	sep2 = "";

	column_names.map(key => {
		let param = (key === "id") ? "in_id" : key;
		let param_type = (param.match(/\_id$/) && tableInfo.columns[key].Type === "binary(16)") ? "varchar(32)" : tableInfo.columns[key].Type;
		let value = (param.match(/\_id$/) && tableInfo.columns[key].Type === "binary(16)") ? `unhex(${param})` : param;

		if (["create_timestamp", "last_mod_timestamp"].includes(key)) {
			value = "(SELECT utc_timestamp)";
		}

		table_params += `${sep}${param} ${param_type}`;
		select_cols += `${sep0}\`${key}\``;
		sep = ",\n\t";
		sep0 = ",\n\t\t";

		if (key !== "pk_id") {
			insert_cols += `${sep1}\`${key}\``;
			insert_vals += `${sep1}${value}`;
			sep1 = ",\n\t\t\t";
			if (!["pk_id", "id", "create_timestamp"].includes(key)) {
				update_sets += `${sep2}\`${key}\` = ${value}`;
				sep2 = ",\n\t\t";
			}
		}
	});

	sprocTemplate = sprocTemplate.replace(/db_name/g, tableInfo.dbName);
	sprocTemplate = sprocTemplate.replace(/table_name/g, tableInfo.tableName);
	sprocTemplate = sprocTemplate.replace(/TABLE_PARAMS/g, table_params);
	sprocTemplate = sprocTemplate.replace(/INSERT_COLS/g, insert_cols);
	sprocTemplate = sprocTemplate.replace(/INSERT_VALS/g, insert_vals);
	sprocTemplate = sprocTemplate.replace(/SELECT_COLS/g, select_cols);
	sprocTemplate = sprocTemplate.replace(/UPDATE_SETS/g, update_sets);

	fs.writeFileSync(fileName, sprocTemplate);
}