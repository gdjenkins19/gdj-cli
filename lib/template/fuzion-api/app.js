
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");

const { serviceEnum, jsonReplacer, auth } = require("fuzion-core-lib");

const UnitOfWork = require("fuzion-data-lib").UnitOfWorkFactory;

//FUZION-ROUTE-OBJECTS-START
//FUZION-ROUTE-OBJECTS-END

const app = express();

app.set("json replacer", jsonReplacer);

//UoW complete transaction & close connection at end of request
app.use((req, res, next) => {
	function complete() {
		if (req.uow) {
			req.uow.complete();
		}
	}
	res.on("finish", complete);
	res.on("close", complete);
	next();
});

//UoW per-request
app.use((req, res, next) => {
	UnitOfWork.create((err, uow) => {
		if (err) console.log(`ERROR: Connection failure in app.js: ${err}`);
		req.uow = uow;
		next();
	});
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/", (req, res, next) => {
	var pathfinder = require("express-pathfinder");
	var routes = pathfinder(app._router.stack, ["GET","POST","PUT","DELETE"]);
	res.status(200).send({status: "OK", data: routes});
});

app.get("/status", (req, res, next) => {
	res.status(200).send({status: "OK"});
});

//FUZION-ROUTES-START
//FUZION-ROUTES-END

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500).send({message: err.message});
});

/**
 * Globals
 */
global.auth = auth;

module.exports = app;
