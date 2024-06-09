// routes.js
const DEF_ROUTE = "/api";

module.exports = app => {
    const FORUM = require("./controller/forum_con.js");
    const COMMENTS = require("./controller/comments_con.js");
    var router = require("express").Router();

    // Forum Specific 
    router.get("/posts", FORUM.getAllPosts);
    router.get("/posts/:post_id", FORUM.getPostbyID);

    router.post("/posts", FORUM.newPost);
    router.put("/posts/:post_id", FORUM.updatePost);
    router.delete("/posts/:post_id", FORUM.deletePost);

    // Comment Specific
    router.post("/posts/:post_id/comments", COMMENTS.addComment);
    router.delete("/posts/:post_id/comments", COMMENTS.deleteComment);

    app.use(DEF_ROUTE, router);
}