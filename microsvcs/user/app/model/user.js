const database = require('./util/init_db');
const mongoDB = require('mongodb')

const USER_COLLECTION = database.collection(process.env.USER_COLLECTION);

/**
 * Insertone user into MongoDB
 * 
 * @param {String} email - user's email
 * @param {String} name - name
 * @return success message or error thrown ie duplicate email entry
 */
exports.createNewUser = async (email, name) => {
    try {
        let result = await USER_COLLECTION.insertOne({
            uid: new mongoDB.ObjectId(),
            email: email,
            name: name
        });
        return result;
    } catch (error) {
        throw new Error("db")
    }
}


