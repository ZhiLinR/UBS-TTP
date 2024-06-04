const database = require('./util/init_db');

const PROFILE_COLLECTION = database.collection(process.env.PROFILE_COLLECTION);

/**
 * Retrieve profiling data for a specific user.
 * 
 * @param {String} uid - unique uid field
 * @return profiling data for the specified user
 */
exports.findByUID = async (uid) => {
    try {
        let result = await PROFILE_COLLECTION.findOne({ uid: { $eq: uid } });
        return result;
    } catch (error) {
        throw new Error("Server Error Occurred");
    }
}

/**
 * Update profiling data for a specific user.
 * 
 * @param {String} uid - unique uid field
 * @return profiling data for the specified user
 */
exports.updateOneByUID = async (uid, json_obj) => {
    try {
        let result = await PROFILE_COLLECTION.updateOne(
            { uid: uid },
            {
                $set: json_obj, //joever stored xss
                $currentDate: { lastModified: true }
            }
        );
        return result;
    } catch (error) {
        throw new Error("Server Error Occurred");
    }
}
