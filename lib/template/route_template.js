const ResourceNameService = require("../lib/service/table_name_service");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	let skip = req.query.skip;
	let take = req.query.take;
	let variableNameSvc = new ResourceNameService(req.uow);
	variableNameSvc.getPaged(skip, take, rez => res.send(rez));	
});

router.get("/count", (req, res, next) => {
	let variableNameSvc = new ResourceNameService(req.uow);
	variableNameSvc.getCount(rez => res.send(rez));	
});

router.get("/:id", (req, res, next) => {
	let id = req.params.id;
	let variableNameSvc = new ResourceNameService(req.uow);
	variableNameSvc.getById(id, rez => res.send(rez));	
});

router.post("/", (req, res, next) => {
	let variableNameSvc = new ResourceNameService(req.uow);
	variableNameSvc.create(req.body, rez => res.send(rez));	
});

router.put("/:id", (req, res, next) => {
	req.body.id = req.params.id;
	let variableNameSvc = new ResourceNameService(req.uow);
	variableNameSvc.update(req.body, rez => res.send(rez));
});

router.delete("/:id", (req, res, next) => {
	let variableNameSvc = new ResourceNameService(req.uow);
	variableNameSvc.setStatus(req.params.id, -1, rez => res.send(rez));
});

module.exports.path = "/api-resource"
module.exports.router = router;