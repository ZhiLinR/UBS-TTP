const database = require('./util/init_db');
const { ObjectId } = require('mongodb');
const VAR = require('../util/variables.js');
const collection = database.collection(VAR.FORUM_COMMENTS_COLLECTION);

/**
 * Adds comment to the post using a push upsert to fieldvalue: comments
 * 
 * @param {String} post_id - unique post_id field in each document
 * @param {String} uid - expecting userid of the commentor
 * @param {String} comment - user comment in plaintext
 * @return mongoDB default update response object
 */
exports.addComment = async (post_id, uid, comment) => {
    try {
        let new_comment_id = new ObjectId().toString()
        const doc = {
            "post_id": post_id,
            "comment_id": new_comment_id,
            "created_by_uid": uid,
            "timestamp": new Date().toISOString(),
            "comment_content": comment,
        };
        let result = await collection.insertOne(doc);
        if (result.insertedId) {
            return new_comment_id;
        }
        throw new Error()
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}

/**
 * Adds comment to the post using a push upsert to fieldvalue: comments
 * 
 * @param {String} post_id - unique post_id field in each document
 * @param {JSON} uid - expecting userid of the commentor
 * @param {String} comment - user comment in plaintext
 * @return mongoDB default update response object
 */
exports.deleteComment = async (post_id, uid, comment_id) => {
    try {
        const query = { "post_id": post_id, "created_by_uid": uid, "comment_id": comment_id };
        const result = await collection.deleteOne(query);
        console.log(result)
        if (result.deletedCount === 1) {
            return result;
        } else {
            throw new Error()
        }
    } catch (error) {
        throw new Error("Server Error Occurred")
    }
}

