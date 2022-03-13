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
app.get("/clients", (req, res) => {
  const data = db.getAllClients();
  res.send(data);
});
app.get("/clients/getbyid/:id", (req, res) => {
  const data = db.getClientById(req.params.id);
  res.send(data);
});
app.get("/projects/getbyid/:idClient/:name", (req, res) => {
  const data = db.getProjectById(req.params.idClient, req.params.name);
  res.send(data);
});
app.post("/clients/addnewclient", (req, res) => {
  const data = db.createNewClient(req.body.client);
  res.send(data);
});
app.post("/projects/addnewproject/:clientid", (req, res) => {
  console.log(req.body);
  const data = db.createNewProject(req.params.clientid, req.body.project);
  res.send(data);
});
// Channels

module.exports = app;
