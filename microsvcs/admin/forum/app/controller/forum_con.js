const QUERIES = require("../model/forum_model.js")
const HANDLER = require("../util/handler.js")

/**
 * Responds with an array of all documents contained
 * within the collection on success
 * 
 * No parameters expected.
 * @success HTTP status 200 & array of documents
 * @error HTTP error status with error message
 */
exports.getAllPosts = async (req, res) => {
    try {
        const result = await QUERIES.getAllPosts()
        res.status(200).send(HANDLER.createSuccessResponse("successful", result));
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send(HANDLER.createErrorResponse(error.message));
        } else {
            res.status(404).send(HANDLER.createErrorResponse(error.message));
        }
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
exports.getPostbyID = async (req, res) => {
    try {
        const post_id = req.params.post_id;
        const result = await QUERIES.getPostbyID(post_id)
        res.status(200).send(HANDLER.createSuccessResponse("successful", result));
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send(HANDLER.createErrorResponse(error.message));
        } else {
            res.status(404).send(HANDLER.createErrorResponse(error.message));
        }
    };
};


/**
 * make a new post
 * 
 * @param {String} req.params.uid - admin id, currently email 
 * @param {JSON} req.body.content - json body/ form data
 */
exports.newPost = async (req, res) => {
    try {
        const uid = req.params.uid;
        const content = req.body;
        const result = await QUERIES.newPost(uid, content)
        res.status(200).send(HANDLER.createSuccessResponse("Post Created", result));
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send(HANDLER.createErrorResponse(error.message));
        } else {
            res.status(404).send(HANDLER.createErrorResponse(error.message));
        }
    };
};

/**
 * update a post
 * 
 * @param {String} req.params.uid - admin id, currently email 
 * @param {JSON} req.body.content - json body/ form data
 */
exports.updatePost = async (req, res) => {
    try {
        const post_id = req.params.post_id;
        const content = req.body;
        const result = await QUERIES.updatePost(post_id, content)
        if (result.modifiedCount == 1) {
            res.status(200).send(HANDLER.createSuccessResponse("Post Updated", result)); 
        } else {
            throw new Error("No Reference Found")
        }
       
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send(HANDLER.createErrorResponse(error.message));
        } else {
            res.status(404).send(HANDLER.createErrorResponse(error.message));
        }
    };
};

/**
 * delete a post using unique post id (document's id)
 * 
 * @param {String} post_id - unique post_id field in each document
 * @param {String} post_id - unique post_id field in each document
 */
exports.deletePost = async (req, res) => {
    try {
        const post_id = req.params.post_id;
        const uid = req.params.uid;
        const result = await QUERIES.deletePost(uid, post_id)
        res.status(200).send(HANDLER.createSuccessResponse("Post Flagged for Deletion", result));
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send(HANDLER.createErrorResponse(error.message));
        } else {
            res.status(404).send(HANDLER.createErrorResponse(error.message));
        }
    };
};

