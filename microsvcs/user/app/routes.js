const DEF_ROUTE = "/api";

module.exports = app => {
    const USER = require("./controller/user_con.js");
    const PROFILE = require("./controller/profile_con.js");
    var router = require("express").Router();

    router.get("/profile/:uid", PROFILE.getProfileByUID);
    router.put("/profile/:uid", PROFILE.updateProfileInfo);

    router.post("/profile", USER.createNewUser);

    app.use(DEF_ROUTE, router);
}