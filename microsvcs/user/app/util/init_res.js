
/**
 * format the response for next() response or error handling middlewares. 
 * The error handling middleware checks the message passed in to determine which code to send.
 * @param {*} success whether the operation succeeded or not. 
 * @param {*} body the message to send 
 * @returns {JSON} { "success": bool, "message": to be defined }
 */
exports.formatRes = (success, status, body) => {
    if (success) {
        return { "success": true, "status": status, "message": body }
    } else {
        return { "success": false, "status": status, "message": body }
    }
}