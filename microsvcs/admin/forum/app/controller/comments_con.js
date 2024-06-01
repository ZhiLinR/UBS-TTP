// Import Database Functions
const QUERIES = require("../model/comments_model.js")

// LOCAL FUNCTIONS --------------------------------------------------------

// FUNCTION EXPORTS --------------------------------------------------------
/**
 * Add a comment
 * 
 * @param {String} req.params.uid user id, currently email 
 * @param {String} req.params.post_id post_id - unique _id field in each document
 * @param {String} req.body.comment user comment in plaintext
 */
exports.addComment = async (req, res) => {
    try {
        const uid = req.params.uid;
        const post_id = req.params.post_id;
        const comment = req.body.comment;

        const result = await QUERIES.addComment(post_id, uid, comment)
        // Check if it has been successfully modified
        if (result.modifiedCount) {
            res.status(200).send({ message: "comment added" });
        } else {
            throw new Error("Incorrect Parameters.")
        }

    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};
