const database = require('./util/init_db')

const collection = database.collection(process.env.FORUM_COLLECTION);

/**
 * Query the defined collection for the Admin/Forum microservice
 * and returns all documents as an Array. 
 * 
 * No parameters expected.
 * @return An Array of all documents contained in the collection.
 */
exports.getAllPosts = async () => {
    try {
        let result = await collection.find().toArray();
        return result;
    } catch (error) {
        throw new Error("Server Error Occurred");
    }
}

/**
 * Query the defined collection for the Admin/Forum microservice
 * for 1 specified document.
 * 
 * 1 function parameter expected.
 * @param {String} post_id - unique post_id field in each document
 * @return 1 matching post of the collection
 */
exports.getPostbyID = async (post_id) => {
    try {
        let result = await collection.findOne({ post_id: { $eq: post_id } });
        return result;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}

/**
 * Query the defined collection for the Admin/Forum microservice
 * for 1 specified document.
 * 
 * 1 function parameter expected.
 * @param {String} post_id - unique post_id field in each document
 * @return 1 matching post of the collection
 */
exports.updatePost = async (post_id) => {
    try {
        let result = await collection.findOne({ post_id: { $eq: post_id } });
        return result;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}

/**
 * Query the defined collection for the Admin/Forum microservice
 * for 1 specified document.
 * 
 * 1 function parameter expected.
 * @param {String} post_id - unique post_id field in each document
 * @return 1 matching post of the collection
 */
exports.newPost = async (post_content) => {
    try {
        const doc = {
            admin_uid: post_content.admin_id,
            timestamp: new Date().toISOString(),
        };
        let result = await collection.insertOne(doc);

        // _id: ${result.insertedId}
        return result.insertedId;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}


