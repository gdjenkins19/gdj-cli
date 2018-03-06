const ResourceNameRepository = require("../repository/table_name_repository");

const { FuzionResponse, guidId, guidConvert, timeStamp, statusFlag } = require("fuzion-core-lib");

class ResourceNameService {
    constructor(uow) {
        this.variableNameRepo = new ResourceNameRepository(uow);
    }

	getPaged(skip = 0, take = 10, callback) {
		this.variableNameRepo.getPaged(skip, take, (err, result) => {
			let res = new FuzionResponse();
			if (err) {
				res.parseError(err);
				return callback(res);
			}
			let [objects, okPacket] = result;
			res.payload = objects; // guidConvert.batchToString(objects);
			return callback(res);
		});
	}

	getCount(callback) {
		this.variableNameRepo.getCount((err, result) => {
			let res = new FuzionResponse();
			if (err) {
				res.parseError(err);
				return callback(res);
			}
			let [count, okPacket] = result;
			res.payload = {
				count: count[0].count
			}
			return callback(res);
		});
	}

	getById(id, callback) {
		let res = new FuzionResponse();
		if (!id || typeof id !== "string") {
			res.error = true;
			res.message = "ERROR: Param is missing or incorrect type!";
			return callback(res);
		}
		this.variableNameRepo.getById(id, (err, result) => {
			if (err) {
				res.parseError(err);
				return callback(res);
			}
			let [obj, okPacket] = result;
			obj.length > 0 ? obj = obj[0] : {};
			res.payload = obj; //guidConvert.singleToString(obj);
			return callback(res);
		});
	}

	create(data, callback) {
		let res = new FuzionResponse();
		data.id = guidId.generate();
		this.variableNameRepo.insert(data, (err, result) => {
			if (err) res.parseError(err);
			res.payload = data;
			return callback(res);
		});
	}

	update(data, callback) {
		let res = new FuzionResponse();
		this.variableNameRepo.update(data, (err, result) => {
			if (err) res.parseError(err);
			res.payload = data;
			return callback(res);
		});
	}

	setStatus(id, status, callback) {
		let res = new FuzionResponse();
		if (!id || typeof id !== "string") {
			res.error = true;
			res.message = "ERROR: Param is missing or incorrect type!";
			return callback(res);
		}
		this.variableNameRepo.setStatus(id, status, (err, result) => {
			if (err) res.parseError(err);
			res.payload = {
				id: id,
				affected: result.affectedRows
			};
			return callback(res);
		});
	}
}

module.exports = ResourceNameService;