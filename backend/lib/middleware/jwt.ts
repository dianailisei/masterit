import * as jwt from 'jsonwebtoken';
function checkAuth(req, res, next) {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        jwt.verify(req.token, process.env.SECRET_KEY, (err, complete) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                res.locals.tokenData = complete;
                next();
            }
        })
        // next();
    } else {
        res.sendStatus(403)
    }
}

function authorizeMentor(req, res, next) {
    let user = res.locals.tokenData.user;
    if (user.email === "admin") {
        next();
    }
    else {
        if (user.role !== "mentor") {
            res.sendStatus(403);
        }
        else {
            next();
        }
    }

}

function authorizeStudent(req, res, next) {
    let user = res.locals.tokenData.user;
    if (user.role !== "student" || (req.params.id && user._id !== req.params.id)) {
        res.sendStatus(403);
    }
    else {
        next();
    }
}

module.exports = { checkAuth, authorizeMentor, authorizeStudent }