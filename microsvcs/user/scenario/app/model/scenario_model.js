const database = require('./init_db')

//Define Forum Collection
const PROFILE_COLLECTION = database.collection(process.env.PROFILE_COLLECTION);

/**
 * Query the defined collection for the User/Scenario microservice.
 * 
 * @param {String} uid - unique uid field
 * @return profiling data for the specified user
 */
exports.findByUID = async (uid) => {
    try {
        let result = await PROFILE_COLLECTION.findOne({ uid: { $eq: uid } });
        return result;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}