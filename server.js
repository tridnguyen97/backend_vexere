const express = require("express");
const mongoose = require("mongoose");

const config = require("./config")

console.log(process.env.NODE_ENV)
console.log(process.env.mongoUri)
// for heroku deployment
/*
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log("Connect to DB successfully"))
  .catch(err => console.log(err))
*/
mongoose.connect("mongodb://localhost:27017/fs08-vexere", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log("Connect to DB successfully"))
  .catch(err => console.log(err))

const app = express();

app.use(express.json())

// enable-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  // them token vao de lay token cho client xu ly authentication 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  next();
});



app.use("/images", express.static("uploads"))

app.use("/api", require("./routes/api"));

const port = 5000 || config.port;
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

/* environment

+ local/dev
+ staging
+ production

$ export NODE_ENV = local
*/