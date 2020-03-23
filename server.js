var express = require("express");
var mongoose = require("mongoose");
const logger = require("morgan");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));
//app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
