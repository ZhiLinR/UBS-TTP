exports.responseHandler = (result, req, res, next) => {
    if (!result["success"]) {
        next(result);
    } else {
        res.status(result.status).send(result);
    }
};