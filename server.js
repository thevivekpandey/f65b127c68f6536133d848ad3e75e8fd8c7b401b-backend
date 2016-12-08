var express = require("express");
var axios = require("axios");

const PORT = 8000;

var app  = express();

app.get("/run", function(req, res) {
  console.log("Method = " + req.query.method);
  console.log("URL = " + req.query.url);
  url = req.query.url;
  method = req.query.method;
  axios({
    method: method,
    url: url
  }).then(function(response) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(response.data);
  }).catch(function(error) {
    console.log(error);
    res.send(error);
  })
});

app.listen(PORT);
