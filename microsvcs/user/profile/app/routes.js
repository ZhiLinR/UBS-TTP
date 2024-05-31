// routes.js
const DEF_ROUTE = process.env.API_PATH.concat(process.env.ROUTE);

module.exports = app => {
    const USER = require("./controller/user_controller.js");
    var router = require("express").Router();

    //get profiling data
    router.get("/getProfile/:uid", USER.getProfileByUID);
    router.post("/register", USER.createNewUser);

    // Route Definition
    app.use(DEF_ROUTE, router);
}