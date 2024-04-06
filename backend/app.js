var morgan = require("./utils/config/morgan.js");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const routerApi = require("./routes/index.routes");

const middleware = require("./utils/middleware");

app.use(morgan(":statusColor :method :url :body :response-time ms"));

app.use(cors());
app.use(express.json());

routerApi(app)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
