// routes.js
const DEF_ROUTE = process.env.API_PATH.concat(process.env.ROUTE);

module.exports = app => {
    const SCENARIO = require("./controller/scenario.js");
    var router = require("express").Router();

    //get profiling data
    router.get("/getProfile/:uid", SCENARIO.getProfileByUID);

    // Route Definition
    app.use(DEF_ROUTE, router);
}