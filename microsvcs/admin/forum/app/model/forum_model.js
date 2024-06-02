const database = require('./util/init_db')
const { ObjectId } = require('mongodb');

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
 * Adds a new document describing the post content to db.
 * 
 * 1 function parameter expected.
 * @param {String} uid - admin id, currently email 
 * @param {JSON} content - json body/ form data
 */
exports.newPost = async (uid, content) => {
    try {
        const doc = {
            admin_uid: uid,
            timestamp: new Date().toISOString(),
            content: content,
        };
        let result = await collection.insertOne(doc);

        return result.insertedId;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}
/**
 * Marks a post for deletion
 * 
 * @param {String} uid - admin id, currently email 
 * @param {String} post_id - unique post_id field in each document
 */
exports.updatePost = async (post_id, content) => {
    try {
        const filter = { "_id": new ObjectId(post_id) };

        //{ upsert: false } so that a new document is never made just in case.
        const options = { upsert: false };
        const updateDoc = {
            $currentDate: {
                lastModified: true,
            },
            $set: {
                content: content
            }
        };
        const result = await collection.updateOne(filter, updateDoc, options);
        return result;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}

/**
 * Marks a post for deletion
 * 
 * @param {String} uid - admin id, currently email 
 * @param {String} post_id - unique post_id field in each document
 */
exports.deletePost = async (uid, post_id) => {
    try {
        const filter = { "_id": new ObjectId(post_id) };

        //{ upsert: false } so that a new document is never made just in case.
        const options = { upsert: false };
        const updateDoc = {
            $currentDate: {
                lastModified: true,
            },
            $set: {
                flag: "D",
                admin_uid: uid
            },
        };
        const result = await collection.updateOne(filter, updateDoc, options);

        return result.insertedId;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}


