const QUERIES = require("../model/user.js")
const UTIL = require('../util/init_res.js')
/**
 * Registers a new user using email and name. Email should be unique.
 * 
 * Expecting a JSON object from POST body.
 * @param {String} req.body.email - user's email
 * @param {String} req.body.name - user's name
 */
exports.createNewUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const result = await QUERIES.createNewUser(email, name)
        next(UTIL.formatRes(true, { "uid": result}))
    } catch (error) {
        next(UTIL.formatRes(false, error.message))
    };
};


