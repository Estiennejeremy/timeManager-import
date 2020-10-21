var express = require("express");
var history = require("connect-history-api-fallback");

var app = express();

app.use(
  history({
    verbose: true
  })
);

var directory = "/" + (process.env.STATIC_DIR || "dist");
app.use(express.static(__dirname + directory));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on: ", port);
});
