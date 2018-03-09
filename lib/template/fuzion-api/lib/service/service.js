const { FuzionResponse, guidId, guidConvert, timeStamp, statusFlag } = require("fuzion-core-lib");

class Service {
    constructor(repo) {
        this.repo = repo;
    }

	getPaged(skip = 0, take = 10, callback) {
		this.repo.getPaged(skip, take, (err, result) => {
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
		this.repo.getCount((err, result) => {
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
		this.repo.getById(id, (err, result) => {
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
		data[this.repo.getTableId()] = guidId.generate();
		this.generateNameFromFriendlyName(data);
		this.repo.insert(data, (err, result) => {
			if (err) res.parseError(err);
			res.payload = data;
			return callback(res);
		});
	}

	update(data, callback) {
		let res = new FuzionResponse();
		this.generateNameFromFriendlyName(data);
		this.repo.update(data, (err, result) => {
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
		this.repo.setStatus(id, status, (err, result) => {
			if (err) res.parseError(err);
			res.payload = {
				affected: result.affectedRows
			};
			res.payload[this.repo.getTableId()] = id;

			return callback(res);
		});
	}

	delete(id, callback) {
		let res = new FuzionResponse();
		if (!id || typeof id !== "string") {
			res.error = true;
			res.message = "ERROR: Param is missing or incorrect type!";
			return callback(res);
		}
		this.repo.delete(id, (err, result) => {
			if (err) res.parseError(err);
			res.payload = {
				affected: result.affectedRows
			};
			res.payload[this.repo.getTableId()] = id;

			return callback(res);
		});
	}

	generateNameFromFriendlyName(data) {
		for(let key in data) {
			if(key.match(/_friendly_name$/)) {
				const name_key = key.replace('_friendly','');
				data[name_key] = generateName(data.key);
				return;
			}
		}
	}

	generateName(friendlyName) {
		let name = friendlyName.trim();
		name = name.replace(/\s+/g,'_');; //spaces to _
		name = name.replace(/\W/g,''); //remove all non-alphanumerics [^0-9a-zA-Z_]
		return name.toUpperCase();
	}
}

module.exports = Service;