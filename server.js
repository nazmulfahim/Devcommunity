const express = require("express");
const mongoose = require("mongoose");
const Keys = require("./config/Keys");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//connect to database
mongoose.Promise = global.Promise;
mongoose
  .connect(
    Keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MONGODB DATABASE CONNECTED"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  //express will serve up the assests
  app.use(express.static("client/build"));

  //express will serve up the index.html file
  //if it doesn't recognize the route
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// server runiing
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
