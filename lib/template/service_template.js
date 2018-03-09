const Service = require("./service");
const RESOURCE_NAMERepository = require("../repository/TABLE_NAME_repository");

class RESOURCE_NAMEService extends Service {
    constructor(uow) {
		super(new RESOURCE_NAMERepository(uow));
    }
}

module.exports = RESOURCE_NAMEService;