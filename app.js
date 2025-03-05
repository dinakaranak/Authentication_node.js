const express = require('express');
const APP_SERVER = express();

APP_SERVER.use("/api",require("./Routes/loginroute"));
APP_SERVER.use("/api",require("./Routes/studentroute"));



module.exports = APP_SERVER;
