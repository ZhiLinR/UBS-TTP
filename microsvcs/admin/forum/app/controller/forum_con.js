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
 * @param {String} pid - unique pid field in each document
 * @success HTTP status 200 & array of documents
 * @error HTTP error status with error message
 */
exports.getPostbyID = async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await QUERIES.getPostbyID(pid)
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
 * @param {JSON} req.body - json body/form data
 */
exports.newPost = async (req, res) => {
    try {
        const body = req.body;
        const result = await QUERIES.newPost(body)
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
 * @param {String} req.params.pid - unique pid; mongo document object ID
 * @param {JSON} req.body - json body/ form data
 */
exports.updatePost = async (req, res) => {
    try {
        const pid = req.params.pid;
        const body = req.body;
        const result = await QUERIES.updatePost(pid, body)
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
 * @param {String} pid - unique pid field in each document
 * @param {String} uid - gets the admin id for who flagged deletion
 */
exports.deletePost = async (req, res) => {
    try {
        const pid = req.body.pid;
        const uid = req.body.admin_uid;
        const result = await QUERIES.deletePost(uid, pid)
        res.status(200).send(HANDLER.createSuccessResponse("Post Flagged for Deletion", result));
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send(HANDLER.createErrorResponse(error.message));
        } else {
            res.status(404).send(HANDLER.createErrorResponse(error.message));
        }
    };
};

