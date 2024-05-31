// Import Database Functions
const QUERIES = require("../model/profile.js")

// FUNCTION EXPORTS --------------------------------------------------------
/**
 * Responds with a single document containing the
 * requested post
 * 
 * 1 request parameter expected.
 * @param {String} uid - unique uid field
 */
exports.getProfileByUID = async (req, res) => {
    try {
        const uid = req.params.uid;
        const result = await QUERIES.findByUID(uid)
        res.status(200).send(result);
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};

//TODO: Update Profile
exports.updateProfileInfo = async (req, res) => {
    try {
        const uid = req.params.uid;
        const json_body = req.body
        const result = await QUERIES.updateOneByUID(uid, json_body)
        if (result.modifiedCount) {
            res.status(200).send({ message: "success" });
        }
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};