// Import Database Functions
const QUERIES = require("../model/scenario_model.js")

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

