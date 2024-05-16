// routes.js
const DEF_ROUTE = process.env.API_PATH.concat(process.env.ROUTE);

module.exports = app => {
    const ADMIN_FORUM = require("./controller/admin_forum.js");
    var router = require("express").Router();

    // TODO: GET posts on forum
    router.get("/getAllPosts", ADMIN_FORUM.getAllPosts);
    router.get("/getPost/:post_id", ADMIN_FORUM.getPostbyID);

    // TODO: POST on forum
    router.post("/newPost", ADMIN_FORUM.getAllPosts);


    // TODO: DELETE posts on forum

    // Route Definition
    app.use(DEF_ROUTE, router);
}