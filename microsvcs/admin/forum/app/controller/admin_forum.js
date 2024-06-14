// Import Database Functions
const QUERIES = require("../model/forum_model.js")

// LOCAL FUNCTIONS --------------------------------------------------------

// FUNCTION EXPORTS --------------------------------------------------------
/**
 * Returns an array of all documents contained
 * within the collection on success
 * 
 * No request parameter or query expected.
 */
exports.getAllPosts = async (req, res) => {
    try {
        const result = await QUERIES.getAllDocuments()
        res.status(200).send(result);
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};

/**
 * Returns a single document containing the
 * requested post
 * 
 * 1 request parameter expected.
 * @param {String} post_id - unique post_id field in each document
 */
exports.getPostbyID = async (req, res) => {
    try {
        const post_id = req.params.post_id;
        const result = await QUERIES.getPostbyID(post_id)
        res.status(200).send(result);
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};

