const database = require('./util/init_db');

const USER_COLLECTION = database.collection(process.env.USER_COLLECTION);

/**
 * Insertone user into MongoDB
 * 
 * @param {String} uid - unique uid field
 * @param {String} name - name
 * @return success message or error thrown ie duplicate email entry
 */
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


