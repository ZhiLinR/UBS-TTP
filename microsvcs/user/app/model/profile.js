const database = require('./util/init_db');
const UTIL = require('../util/variables.js')
const PROFILE_COLLECTION = database.collection(process.env.PROFILE_COLLECTION);

/**
 * Retrieve profiling data for a specific user.
 * 
 * @param {String} uid - unique uid field
 * @return profiling data for the specified user
 */
exports.findByUID = async (uid) => {
    try {
        let result = await PROFILE_COLLECTION.findOne({ uid: { $eq: uid } }, { projection: { _id: 0 } });
        return result;
    } catch (error) {
        throw new Error(UTIL.database_error_msg);
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
        throw new Error(UTIL.database_error_msg);
    }
}
