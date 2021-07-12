// Server

const express = require("express");
const app = express();
const port = 4000;
const request = require('request');
const cors = require('cors')


app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/launches", (req, res) => {
  request({
    url: "https://api.spacexdata.com/v4/launches/past?limit=50",
    json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.json(body);
    }
  })
});

app.get("/rockets", (req, res) => {
  request({
    url: "https://api.spacexdata.com/v4/rockets",
    json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
	  res.send(body);
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
