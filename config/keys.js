//keys.js figure out what set of cardentials we are in

if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./keys_prod");
} else {
  //we are in development
  module.exports = require("./keys_dev");
}
