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
    const uid = req.params.uid;
    try {
        const result = await QUERIES.findByUID(uid)
        if (result !== null) {
            next(UTIL.formatRes(true, 200, result))
        } else {
            next(UTIL.formatRes(false, 404, "No Reference Found"))
        }
    } catch (error) {
        next(UTIL.formatRes(false, 500, "Database Error Occured"))
    }

};

exports.updateProfileInfo = async (req, res, next) => {
    const uid = req.params.uid;
    const json_body = req.body;

    try {
        const result = await QUERIES.updateOneByUID(uid, json_body)
        if (result.modifiedCount) {
            next(UTIL.formatRes(true, 200, "Successfully Modified"))
        } else {
            next(UTIL.formatRes(false, 404, "No Reference Found"))
        }
    } catch (error) {
        next(UTIL.formatRes(false, 500, "Database Error Occured"))
    }

};