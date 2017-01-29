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
  console.log("/run is called");
  url = req.query.url;
  method = req.query.method.toLowerCase();
  headers = {};

  console.log(req.headers);
  if ('headerskey' in req.headers) {
    splitHeaders = req.headers.headerskey.split("QQQ");
    splitHeaders.forEach(function(header) {
      var key = header.split("|||")[0];
      var val = header.split("|||")[1];
      headers[key] = val;
    });
  }
  console.log("See headers");
  console.log(headers);
  
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
