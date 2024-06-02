const QUERIES = require("../model/user.js")

/**
 * Registers a new user using email and name. Email should be unique.
 * 
 * Expecting a JSON object from POST body.
 * @param {String} req.body.email - unique uid field
 * @param {String} req.body.name - unique uid field
 */
exports.createNewUser = async (req, res) => {
    try {
        const uid = req.body.email;
        const name = req.body.name;

        const result = await QUERIES.createNewUser(uid, name)
        if (result.acknowledged) {
            res.status(200).send({ message: "Successfully Registered" });
        }
        
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};


