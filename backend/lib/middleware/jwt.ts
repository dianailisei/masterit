import * as jwt from 'jsonwebtoken';
function checkAuth (req, res, next) {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                next();
            }
        })
        // next();
    } else {
        res.sendStatus(403)
    }
}


module.exports = {checkAuth}