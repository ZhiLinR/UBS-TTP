const database = require('./util/init_db')
const { ObjectId } = require('mongodb');

const collection = database.collection(process.env.FORUM_COLLECTION);

/**
 * Adds comment to the post using a push upsert to fieldvalue: comments
 * 
 * @param {String} post_id - unique _id field in each document
 * @param {String} uid - expecting userid of the commentor
 * @param {String} comment - user comment in plaintext
 * @return mongoDB default update response object
 */
exports.addComment = async (post_id, uid, comment) => {
    try {
        const filter = { "_id": new ObjectId(post_id) };

        const comment_arry_element = {
            uid: uid,
            comment: comment,
            date: new Date().toISOString()
        }
        //{ upsert: false } so that a new document is never made just in case.
        const options = { upsert: false };
        const updateDoc = {
            $push: {
                comments: comment_arry_element
            },
        };
        const result = await collection.updateOne(filter, updateDoc, options);
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Server Error Occurred")
    }
}

/**
 * Adds comment to the post using a push upsert to fieldvalue: comments
 * 
 * @param {String} post_id - unique _id field in each document
 * @param {JSON} uid - expecting userid of the commentor
 * @param {String} comment - user comment in plaintext
 * @return mongoDB default update response object
 */
exports.deleteComment = async (post_id, uid, comment) => {
    try {
        const filter = { "_id": new ObjectId(post_id) };

        //{ upsert: false } so that a new document is never made just in case.
        const options = { upsert: false };
        const updateDoc = {
            $pull: {
                comments:{ uid: uid, comment: comment  }
            },
        };
        const result = await collection.updateOne(filter, updateDoc, options);
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Server Error Occurred")
    }
}

