class ResourceNameRepository {
	constructor(uow) {
		this.uow = uow;
	};

	getPaged(skip, take, callback) {
		this.uow.query("call select_table_name_paged(?, ?)", [skip, take], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	getById(id, callback) {
		this.uow.query("call select_table_name_by_id(?)", [id], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	getCount(callback) {
		this.uow.query("call select_table_name_count()", null, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	insert(params, callback) {
		this.uow.query("call insert_table_name(PARAMATER_LIST)", this.mapParamsToResourceArray(params), (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	update(params, callback) {
		this.uow.query("call update_table_name(PARAMATER_LIST)", this.mapParamsToResourceArray(params), (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	setStatus(id, status, callback) {
		this.uow.query("call set_status_table_name(?, ?)", [id, status], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	//sets the table values of in order list adding additionals to the end
	//converts to an array for passing to query
	mapParamsToResourceArray(params) {
		const { entityValues } = require("fuzion-core-lib");
		const fields = this.dbFields();

		Object.keys(fields).map(key => {
			if(params[key] !== undefined && params[key] !== null) fields[key] = params[key];
		});

		return entityValues(fields);
	};

	//In order list of all table columns
	dbFields() {
		return {
			RESOURCE_FIELDS
		};
	};
}

module.exports = ResourceNameRepository;