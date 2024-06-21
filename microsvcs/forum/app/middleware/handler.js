exports.responseHandler = (result, req, res, next) => {
    res.status(result.status).send(result);

}