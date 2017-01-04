var express = require("express");
var axios = require("axios");

const PORT = 8000;

var app  = express();

send = function(res, data) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(data);
}
app.get("/run", function(req, res) {
  url = req.query.url;
  method = req.query.method.toLowerCase();
  console.log(url);
  console.log(method);
  headers = {};
  if ("headerskey" in req.headers) {
    key = req.headers.headerskey.split("|||")[0];
    val = req.headers.headerskey.split("|||")[1];
    headers[key] = val;
  }
  axios({
    url: url,
    method: method,
    headers: headers
  }).then(function(response) {
    console.log(response);
    send(res, {data: response.data, headers: response.headers});
  }).catch(function(error) {
    console.log(error);
    send(res, {data: error.response.data});
  });
});

app.options("/run", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "headerskey");
  res.send();
});
app.listen(PORT);
