exports.createErrorResponse = (errormessage) => {
    return {
        message: errormessage
    }
}

exports.createSuccessResponse = (successmessage, result) => {
    if (result === undefined) {
        return {
            message: successmessage,
        }
    }
    return {
        message: successmessage,
        content: result
    }
}