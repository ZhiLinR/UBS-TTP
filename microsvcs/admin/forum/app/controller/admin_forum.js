
// LOCAL FUNCTIONS --------------------------------------------------------

// FUNCTION EXPORTS --------------------------------------------------------
/**
 * [Testing] This function returns all posts.
 * 
 * No parameters expected.
 */
exports.getAllPosts = async (req, res) => {
    try {
        res.status(200).send("Completed!");
    } catch (error) {
        if (error == "Errored!") {
            res.status(500).send({ message: error.message });
        } else {
            res.status(404).send({ message: error.message });
        }
    };
};