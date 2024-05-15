// routes.js
const DEF_ROUTE = process.env.API_PATH.concat(process.env.ROUTE);

module.exports = app => {
    const ADMIN_FORUM = require("./controller/admin_forum.js");
    var router = require("express").Router();

    // TODO: POST on forum
    //Sample: router.delete("/removeFromCart", products.removeCartItem)
    router.get("/getPosts", ADMIN_FORUM.getAllPosts);

    // TODO: GET posts on forum

    // TODO: DELETE posts on forum

    // Route Definition
    app.use(DEF_ROUTE, router);
}