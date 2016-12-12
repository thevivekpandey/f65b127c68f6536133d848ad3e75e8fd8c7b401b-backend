var express = require("express");
var axios = require("axios");

const PORT = 8000;

var app  = express();

app.get("/run", function(req, res) {
  url = req.query.url;
  method = req.query.method;
  headers = {};
  if ("headerskey" in req.headers) {
    key = req.headers.headerskey.split("|||")[0];
    val = req.headers.headerskey.split("|||")[1];
    console.log(url);
    console.log(method);
    console.log(req.headers);
    console.log(key);
    console.log(val);
    headers[key] = val;
  }

  axios({
    method: method,
    url: url,
    headers: headers
  }).then(function(response) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(response.data);
    res.send(response.data);
  }).catch(function(error) {
    console.log(error);
    console.log("This was the error");
    res.send(error);
  })
});

app.options("/run", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "headerskey");
  res.send();
});
app.listen(PORT);
