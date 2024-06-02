// routes.js
const DEF_ROUTE = "/api";

module.exports = app => {
    const FORUM = require("./controller/forum_con.js");
    const COMMENTS = require("./controller/comments_con.js");
    var router = require("express").Router();

    // TODO: GET posts on forum
    router.get("/posts", FORUM.getAllPosts);
    router.get("/posts/:post_id", FORUM.getPostbyID);

    // TODO: POST on forum
    // router.post("/newPost", FORUM.getAllPosts);


    // TODO: DELETE posts on forum

    // Routes for Comments--------------------------------------------------------------
    router.put("/posts/:post_id/comments/:uid", COMMENTS.addComment);
    router.delete("/posts/:post_id/comments/:uid", COMMENTS.deleteComment);

    app.use(DEF_ROUTE, router);
}