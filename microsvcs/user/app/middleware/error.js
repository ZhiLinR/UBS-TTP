const UTIL = require('../util/variables.js')


exports.errorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else if (err.code == 11000) {
        res.status(500).send({ error: 'Email Already Exists' });
    } else if (err.message == UTIL.database_error_msg) {
        res.status(500).send({ error: 'Database Error Occured' });
    }
    else {
        res.status(404);
        res.json({ error: "check user input" });
    }
}
