const database = require('./util/init_db');
const mongoDB = require('mongodb')
const UTIL = require('../util/variables.js')

const USER_COLLECTION = database.collection(process.env.USER_COLLECTION);
const PROFILE_COLLECTION = database.collection(process.env.PROFILE_COLLECTION);
/**
 * Retrieve user data for a specific user.
 * 
 * @param {String} uid - unique uid field
 * @return profiling data for the specified user
 */
exports.findByUID = async (uid) => {
    try {
        let result = await USER_COLLECTION.findOne({ uid: { $eq: uid } });
        return result;
    } catch (error) {
        throw new Error("db");
    }
}

/**
 * Insertone user into MongoDB
 * 
 * @param {String} email - user's email
 * @param {String} name - name
 * @return success message or error thrown ie duplicate email entry
 */
exports.createNewUser = async (email, name) => {
    try {
        let new_uid = new mongoDB.ObjectId().toString()
        let result = await USER_COLLECTION.insertOne({
            uid: new_uid,
            email: email,
            name: name
        });
        if (!result.acknowledged) { //if it fails to create
            throw new Error(UTIL.database_error_msg)
        } else { // else insert a profile object for the profile collection
            result = await PROFILE_COLLECTION.insertOne({
                uid: new_uid
            });
        }
        return new_uid;
    } catch (error) {
        throw new Error(UTIL.database_error_msg);
    }
}


