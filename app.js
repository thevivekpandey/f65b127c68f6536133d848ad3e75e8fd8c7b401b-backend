var express = require("express");
var axios = require("axios");

const PORT = 8000;

var app  = express();

send = function(res, data, startTime) {
  res.header("Access-Control-Allow-Origin", "*");
  interval = new Date() - startTime;
  data.interval = interval;
  res.send(data);
}
app.get("/run", function(req, res) {
  url = req.query.url;
  method = req.query.method.toLowerCase();
  headers = {};
  if ("headerskey" in req.headers) {
    key = req.headers.headerskey.split("|||")[0];
    val = req.headers.headerskey.split("|||")[1];
    headers[key] = val;
  }
  startTime = new Date();
  axios({
    url: url,
    method: method,
    headers: headers
  }).then(function(response) {
    send(res, {data: response.data, headers: response.headers, status: response.status}, startTime);
  }).catch(function(error) {
    send(res, {data: error.response.data, status: error.response.status}, startTime);
  });
});

app.options("/run", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "headerskey");
  res.send();
});
app.listen(PORT);
