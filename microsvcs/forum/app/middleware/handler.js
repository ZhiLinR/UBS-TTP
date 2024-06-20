exports.responseHandler = (result, req, res, next) => {
    console.log("hit")
    if (result.success) {
        res.status(200).send(result);
    }
    else {
        res.status(500).send({ error: 'Something failed!' });
    }
}