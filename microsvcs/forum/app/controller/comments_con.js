const QUERIES = require("../model/comments_model.js")
const FORUM_QUERIES = require("../model/forum_model.js")
const UTIL = require('../util/init_res.js')

/**
 * Add a comment
 * 
 * @param {String} req.params.uid user id, unique uid field in db 
 * @param {String} req.params.post_id post_id - unique _id field in each document
 * @param {String} req.body.comment user comment in plaintext
 */
exports.addComment = async (req, res, next) => {
    const post_id = req.params.post_id;
    const uid = req.body.uid;
    const comment = req.body.comment;
    try {
        const check = await FORUM_QUERIES.getPostbyID(post_id)
        if (!check) {
            next(UTIL.formatRes(false, 404, "No Reference Found"))
        }
        const result = await QUERIES.addComment(post_id, uid, comment)
        if (result) {
            next(UTIL.formatRes(true, 200, "Comment Added", { "comment_id": result }))
        }
    } catch (error) {
        next(UTIL.formatRes(false, 500, "Database Error"))
    };
};

/**
 * Delete a comment
 * 
 * @param {String} req.body.uid unique uid field in db 
 * @param {String} req.params.post_id unique post id
 * @param {String} req.body.comment_id unique comment id
 */
exports.deleteComment = async (req, res, next) => {
    const uid = req.body.uid;
    const post_id = req.params.post_id;
    const comment_id = req.body.comment_id;
    try {
        const result = await QUERIES.deleteComment(post_id, uid, comment_id)
        if (result.deletedCount === 1) {
            next(UTIL.formatRes(true, 200, "Comment Deleted"));
        } else {
            next(UTIL.formatRes(false, 404, "No Reference Found"))
        }
    } catch (error) {
        console.log(error)
        next(UTIL.formatRes(false, 500, "Database Error"));
    };
};
