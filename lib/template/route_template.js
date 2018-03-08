const RESOURCE_NAMEService = require("../lib/service/TABLE_NAME_service");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	let skip = req.query.skip;
	let take = req.query.take;
	let VARIABLE_NAMESvc = new RESOURCE_NAMEService(req.uow);
	VARIABLE_NAMESvc.getPaged(skip, take, rez => res.send(rez));
});

router.get("/count", (req, res, next) => {
	let VARIABLE_NAMESvc = new RESOURCE_NAMEService(req.uow);
	VARIABLE_NAMESvc.getCount(rez => res.send(rez));
});

router.get("/:fuzion_TABLE_NAME_id", (req, res, next) => {
	let id = req.params.fuzion_TABLE_NAME_id;
	let VARIABLE_NAMESvc = new RESOURCE_NAMEService(req.uow);
	VARIABLE_NAMESvc.getById(id, rez => res.send(rez));
});

router.post("/", (req, res, next) => {
	let VARIABLE_NAMESvc = new RESOURCE_NAMEService(req.uow);
	VARIABLE_NAMESvc.create(req.body, rez => res.send(rez));
});

router.put("/:fuzion_TABLE_NAME_id", (req, res, next) => {
	req.body.fuzion_TABLE_NAME_id = req.params.fuzion_TABLE_NAME_id;
	let VARIABLE_NAMESvc = new RESOURCE_NAMEService(req.uow);
	VARIABLE_NAMESvc.update(req.body, rez => res.send(rez));
});

router.delete("/:fuzion_TABLE_NAME_id", (req, res, next) => {
	let VARIABLE_NAMESvc = new RESOURCE_NAMEService(req.uow);
	VARIABLE_NAMESvc.setStatus(req.params.fuzion_TABLE_NAME_id, -1, rez => res.send(rez));
});

module.exports.path = "/API_RESOURCE"
module.exports.router = router;