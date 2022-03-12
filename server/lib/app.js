const cors = require("cors");
const express = require("express");
var bodyParser = require("body-parser");

const db = require("./db");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send(
    [
      "<h1>Welcome to the server-side of KIFEKOI <span>✅</span></h1><h4>Seems to be working just fine.</h4>",
    ].join("")
  );
});
app.get("/loadjsonfile/:weekid", (req, res) => {
  const data = db.createJsonFile(req.params.weekid);
  res.send(data);
});
app.get("/data", (req, res) => {
  const data = db.getAllData();
  res.send(data);
});
app.get("/data/getbyid/:id", (req, res) => {
  const data = db.getDataById(req.params.id);
  res.send(data);
});
app.post("/data/addnewclient", (req, res) => {
  const data = db.createNewClient(req.body.client);
  res.send(data);
  console.log(data);
});
app.post("/data/addnewproject/:clientid", (req, res) => {
  console.log(req.body);
  const data = db.createNewProject(req.params.clientid, req.body.project);
  res.send(data);
  console.log(data);
});
// Channels

module.exports = app;
