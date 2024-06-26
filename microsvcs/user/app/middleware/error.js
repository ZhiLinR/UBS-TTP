const UTIL = require('../util/variables.js')


exports.errorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else if (err.code == 11000) {
        res.status(404).send({ error: 'Email Already Exists' });
    } else if (err.status == 500) {
        res.status(err.status).send({ error: 'Database Error Occured' });
    }
    else {
        res.status(err.status);
        res.json({ error: err.message });
    }
}
