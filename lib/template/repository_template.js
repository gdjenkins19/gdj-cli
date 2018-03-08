const Repository = require("./repository");

const RESOURCE_NAMEFields = {
	RESOURCE_FIELDS
};

class RESOURCE_NAMERepository extends Repository {
	constructor(uow) {
		super("TABLE_NAME", RESOURCE_NAMEFields, uow);
		this.uow = uow;
	};

	insert(params, callback) {
		const placeHolders = this.getPlaceHolders();
		const paramArray = this.mapParamsToResourceArray(params);
		this.uow.query(`call insert_TABLE_NAME(${placeHolders})`, paramArray, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};

	update(params, callback) {
		const placeHolders = this.getPlaceHolders();
		const paramArray = this.mapParamsToResourceArray(params);
		this.uow.query(`call update_TABLE_NAME(${placeHolders})`, paramArray, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	};
}

module.exports = RESOURCE_NAMERepository;