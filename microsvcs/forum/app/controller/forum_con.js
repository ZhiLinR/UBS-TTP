const QUERIES = require("../model/forum_model.js")
const UTIL = require('../util/init_res.js')
/**
 * Responds with an array of all documents contained
 * within the collection on success. Does not contain comments??
 * 
 * No parameters expected.
 * @success HTTP status 200 & array of documents
 * @error HTTP error status with error message
 */
exports.getAllPosts = async (req, res, next) => {
    try {
        const result = await QUERIES.getAllPosts()
        next(UTIL.formatRes(true, 200, "Successfully Retrieved", result))
    } catch (error) {
        next(UTIL.formatRes(false, 500, "Database Error"))
    };
};

/**
 * Responds with a single document containing the
 * requested post
 * 
 * 1 parameter expected.
 * @param {String} post_id - unique post_id field in each document
 * @success HTTP status 200 & array of documents
 * @error HTTP error status with error message
 */
exports.getPostbyID = async (req, res, next) => {
    const post_id = req.params.post_id;
    try {
        const result = await QUERIES.getPostbyID(post_id);

        if (result) {
            next(UTIL.formatRes(true, 200, "Successfully Retrieved", result))
        } else {
            next(UTIL.formatRes(false, 404, "No Reference Found"))
        }
    } catch (error) {
        next(UTIL.formatRes(false, 500, "Database Error"))
    };
};


/**
 * make a new post
 * 
 * @param {JSON} req.body - json body/form data
 */
exports.newPost = async (req, res, next) => {
    const body = req.body;
    try {
        const result = await QUERIES.newPost(body)
        next(UTIL.formatRes(true, 200, "Post Created", result))
    } catch (error) {
        next(UTIL.formatRes(false, 500, "Failed to Create"))
    };
};

/**
 * update a post
 * 
 * @param {String} req.params.post_id - unique post_id; mongo document object ID
 * @param {JSON} req.body - json body/ form data
 */
exports.updatePost = async (req, res, next) => {
    const post_id = req.params.post_id;
    const body = req.body;
    try {
        const result = await QUERIES.updatePost(post_id, body)
        if (result.modifiedCount == 1) {
            next(UTIL.formatRes(true, 200, "Post Updated", result))
        } else {
            next(UTIL.formatRes(false, 404, "No Reference Found"))
        }
    } catch (error) {
        next(UTIL.formatRes(false, 500, "Database Error"))
    };
};

/**
 * delete a post using unique post id (document's id)
 * 
 * @param {String} post_id - unique post_id field in each document
 * @param {String} uid - gets the admin id for who flagged deletion
 */
exports.deletePost = async (req, res, next) => {
    const post_id = req.params.post_id;
    const uid = req.body.admin_uid;
    try {
        const result = await QUERIES.deletePost(uid, post_id)
        if (result.matchedCount) {
            next(UTIL.formatRes(true, 200, "Post Flagged for Deletion"))
        } else {
            next(UTIL.formatRes(false, 404, "No Reference Found"))
        }
    } catch (error) {
        next(UTIL.formatRes(false, 500, "Database Error"))
    };
};

