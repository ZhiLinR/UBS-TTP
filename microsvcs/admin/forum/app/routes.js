// routes.js
const DEF_ROUTE = process.env.API_PATH.concat(process.env.ROUTE);

module.exports = app => {
    const FORUM = require("./controller/forum_con.js");
    const COMMENTS = require("./controller/comments_con.js");
    var router = require("express").Router();

    // TODO: GET posts on forum
    router.get("/getAllPosts", FORUM.getAllPosts);
    router.get("/getPost/:post_id", FORUM.getPostbyID);

    // TODO: POST on forum
    // router.post("/newPost", FORUM.getAllPosts);


    // TODO: DELETE posts on forum

    // Routes for Comments--------------------------------------------------------------
    router.put("/comment/:post_id/:uid", COMMENTS.addComment);
    // Route Definition
    app.use(DEF_ROUTE, router);
}