const QUERIES = require("../model/comments_model.js")
const FORUM_QUERIES = require("../model/forum_model.js")
const HANDLER = require("../util/handler.js")
/**
 * Add a comment
 * 
 * @param {String} req.params.uid user id, unique uid field in db 
 * @param {String} req.params.post_id post_id - unique _id field in each document
 * @param {String} req.body.comment user comment in plaintext
 */
exports.addComment = async (req, res) => {
    try {
        const post_id = req.params.post_id;
        const uid = req.body.uid;
        const comment = req.body.comment;
        // Check if the post exists
        const check = await FORUM_QUERIES.getPostbyID(post_id)
        if (!check.post_id) {
            throw new Error("Reference Not Found")
        }
        const result = await QUERIES.addComment(post_id, uid, comment)
        if (result) {
            res.status(200).send(HANDLER.createSuccessResponse("Comment Added", { "comment_id": result }));
        }
    } catch (error) {
        console.log(error)
        if (error.message == "Server Error Occurred") {
            res.status(500).send(HANDLER.createErrorResponse(error.message));
        } else {
            res.status(404).send(HANDLER.createErrorResponse(error.message));
        }
    };
};

/**
 * Delete a comment
 * 
 * @param {String} req.body.uid unique uid field in db 
 * @param {String} req.body.post_id unique post id
 * @param {String} req.body.comment_id unique comment id
 */
exports.deleteComment = async (req, res) => {
    try {
        const uid = req.body.uid;
        const post_id = req.params.post_id;
        const comment_id = req.body.comment_id;
        const result = await QUERIES.deleteComment(post_id, uid, comment_id)
        res.status(200).send(HANDLER.createSuccessResponse("Comment Deleted", result));
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send(HANDLER.createErrorResponse(error.message));
        } else {
            res.status(404).send(HANDLER.createErrorResponse(error.message));
        }
    };
};
