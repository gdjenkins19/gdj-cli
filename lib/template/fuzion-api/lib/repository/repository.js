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

	getByNamedId(name, id, callback) {
		this.uow.query(`call table_select_id(?, ?, ?)`, [this.table, name, id], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	getById(id, callback) {
		this.getByNamedId(`fuzion_${this.table}_id`, id, callback);
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

	delete(id, callback) {
		this.uow.query(`call table_delete_id(?, ?)`, [this.table, id], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	//sets the table values of in order list adding additionals to the end
	//converts to an array for passing to query
	mapParamsToResourceArray(params,fields=null) {
		const { entityValues } = require("fuzion-core-lib");
		if(fields === null) fields = Object.assign({}, this.fields);

		Object.keys(fields).map(key => {
			if(params[key] !== undefined && params[key] !== null) fields[key] = params[key];
		});

		return entityValues(fields);
	};

	getPlaceHolders(fields=null) {
		if(fields === null) fields = this.fields;
		let placeholders = new Array(Object.keys(fields).length);
		return placeholders.fill('?').join(',');
	}

	getTableId() {
		return `fuzion_${this.table}_id`;
	}
};

module.exports = Repository;