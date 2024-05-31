const database = require('./util/init_db');

//Define User  Collection
const USER_COLLECTION = database.collection(process.env.USER_COLLECTION);

//Define Profile Collection
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

//TODO: POST new User
exports.createNewUser = async (uid, name) => {
    try {
        let result = await USER_COLLECTION.insertOne({
            user_id: uid,
            name: name
        });
        return result;
    } catch (error) {
        if (error.code == 11000) {
            throw new Error("Email already exists.")
        }
        throw new Error("Server Error Occurred")
    }
}

//TODO: UPDATE a User

