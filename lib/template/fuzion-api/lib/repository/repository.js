class Repository {

	constructor(table, fields, uow) {
		this.table = table;
		this.fields = fields;
		this.uow = uow;
	};

	getPaged(skip, take, callback) {
		this.uow.query(`call table_select(?, ?, ?)`, [this.table, skip, take], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	getById(id, callback) {
		this.uow.query(`call table_select_id(?, ?)`, [this.table, id], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	getCount(callback) {
		this.uow.query(`call table_count(?)`, [this.table], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	setStatus(id, status, callback) {
		this.uow.query(`call table_set_status_id(?, ?, ?)`, [this.table, id, status], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	delete(id, status, callback) {
		this.uow.query(`call table_delete_id(?, ?)`, [this.table, id], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	//sets the table values of in order list adding additionals to the end
	//converts to an array for passing to query
	mapParamsToResourceArray(params) {
		const { entityValues } = require("fuzion-core-lib");

		Object.keys(this.fields).map(key => {
			if(params[key] !== undefined && params[key] !== null) this.fields[key] = params[key];
		});

		return entityValues(this.fields);
	};

	getPlaceHolders() {
		let placeholders = new Array(Object.keys(this.fields).length);
		return placeholders.fill('?').join(',');
	}

	getTableId() {
		return `fuzion_${this.table}_id`;
	}
};

module.exports = Repository;