exports.responseHandler = (result, req, res, next) => {
    if (!result["success"]) {
        next(result);
    } else {
        res.status(200).send(result);
    }
};