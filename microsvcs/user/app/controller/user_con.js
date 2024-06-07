const QUERIES = require("../model/user.js")

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
        if (result.acknowledged) {
            res.status(200).send({ message: { "acknowledged": result.acknowledged } });
        }
    } catch (error) {
        next(error)
    };
};


