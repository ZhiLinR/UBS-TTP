const QUERIES = require("../model/profile.js")
const UTIL = require('../util/init_res.js')

/**
 * Responds with a single document containing the
 * requested post
 * 
 * 1 request parameter expected.
 * @param {String} uid - unique uid field
 */
exports.getProfileByUID = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const result = await QUERIES.findByUID(uid)
        if (result === null) {
            throw new Error("No Reference Found")
        }
        next(UTIL.formatRes(true, result))
    } catch (error) {
        next(UTIL.formatRes(false, error.message))
    };
};

exports.updateProfileInfo = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const json_body = req.body
        const result = await QUERIES.updateOneByUID(uid, json_body)
        if (result.modifiedCount) {
            next(UTIL.formatRes(true, result))
        } else {
            throw new Error("No Reference Found")
        }
    } catch (error) {
        next(UTIL.formatRes(false, error.message))
    };
};