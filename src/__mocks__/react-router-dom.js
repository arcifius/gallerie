import React from "react";
const rrd = require("react-router-dom");

rrd.BrowserRouter = rrd.MemoryRouter;
module.exports = rrd;
