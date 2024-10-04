const jwt = require('jsonwebtoken')

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const { name, account_type, username, id, email } = decode
        req.name = name
        req.username = username,
        req.id = id
        req.email = email
        req.account_type = account_type
        next();
    } catch {
        next({
            error: 'Authentication failed',
            status: 401,
            message: 'Authentication failed'
        })
    }
}


module.exports = checkLogin