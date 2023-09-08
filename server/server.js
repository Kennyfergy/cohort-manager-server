const express = require("express");
const cohorts = require("./modules/cohorts");

const PORT = 5000;
const app = express();

app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/cohorts", (req, res) => {
  console.log("Received get request to /cohorts");

  res.send(cohorts);
});

app.post("/cohorts", (req, res) => {
  console.log("Received post request to /cohorts");
  const body = req.body;
  console.log(body);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
});
