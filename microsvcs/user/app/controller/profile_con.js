const QUERIES = require("../model/profile.js")

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
        next(error)
    };
};

exports.updateProfileInfo = async (req, res) => {
    try {
        const uid = req.params.uid;
        const json_body = req.body
        const result = await QUERIES.updateOneByUID(uid, json_body)
        if (result.modifiedCount) {
            res.status(200).send({ message: "success" });
        }
    } catch (error) {
        next(error)
    };
};