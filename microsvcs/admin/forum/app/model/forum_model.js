const database = require('./util/init_db')
const { ObjectId } = require('mongodb');
const VAR = require('../util/variables.js');
const collection = database.collection(VAR.FORUM_COLLECTION);

/**
 * finds all posts not flagged for deletion
 * 
 * No parameters expected.
 * @return An Array of all documents contained in the collection.
 */
exports.getAllPosts = async () => {
    try {
        const query = { status: { flag: { $not: { $eq: "D" } } } };

        let result = await collection.find(query).toArray();

        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Server Error Occurred");
    }
}

/**
 * find post by the unique pid
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
 * @param {String} uid - admin id, unique uid field in db 
 * @param {JSON} content - json body/ form data
 */
exports.newPost = async (body) => {
    try {
        let new_post_id = new ObjectId().toString()
        const doc = {
            "post_id": new_post_id,
            "created_by": body.admin_uid,
            "timestamp": new Date().toISOString(),
            "post_content": body.main_content,
        };
        let result = await collection.insertOne(doc);

        return result.new_post_id;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}
/**
 * Update a post.
 * 
 * @param {String} post_id - unique post_id field in each document
 * @param {String} content - replaces content field
 */
exports.updatePost = async (post_id, body) => {
    try {
        const filter = { $and: [{ "post_id": post_id, "created_by": body.admin_uid }] };

        //{ upsert: false } so that a new document is never made.
        const options = { upsert: false };
        const updateDoc = {
            $currentDate: {
                lastModified: true,
            },
            $set: {
                "post_content": body.main_content //TODO: Look at only replacing fields mentioned in this object
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
 * @param {String} uid - admin id, unique uid field in db
 * @param {String} post_id - unique post_id field in each document
 */
exports.deletePost = async (uid, post_id) => {
    try {
        const filter = { "_id": new ObjectId(post_id) };

        //{ upsert: false } so that a new document is never made.
        const options = { upsert: false };
        const updateDoc = {
            $currentDate: {
                lastModified: true,
            },
            $set: {
                status: {
                    "flag": "D",
                    "raised_by": uid
                }
            },
        };
        const result = await collection.updateOne(filter, updateDoc, options);

        return result;
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}


