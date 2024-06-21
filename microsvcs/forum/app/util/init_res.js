
/**
 * format the response for next() response or error handling middlewares. 
 * The error handling middleware checks the message passed in to determine which code to send.
 * @param {*} success whether the operation succeeded or not. 
 * @param {*} message the message to send 
 * @returns {JSON} { "success": bool, "message": to be defined }
 */
exports.formatRes = (success, status, message, content) => {
    if (success) {
        return { "success": true, "status": status, "message": message, "content": content }
    } else {
        return { "success": false, "status": status, "message": message }
    }
}