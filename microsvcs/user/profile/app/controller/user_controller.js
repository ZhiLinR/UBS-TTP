// Import Database Functions
const QUERIES = require("../model/user.js")

// LOCAL FUNCTIONS --------------------------------------------------------

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

/**
 * Responds with a single document containing the
 * requested post
 * 
 * Expecting a JSON object from POST body.
 * @param {String} uid - unique uid field
 */
exports.createNewUser = async (req, res) => {
    try {
        const uid = req.body.email;
        const name = req.body.name;

        const result = await QUERIES.createNewUser(uid, name)
        res.status(200).send(result);
    } catch (error) {
        if (error.message == "Server Error Occurred") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};


