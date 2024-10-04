const errorHandle = (err, req, res, next) => {
    const statusCode = req.statusCode ? req.statusCode : 500

    res.status(statusCode)

    res.send({
        message: err.message,
        stack: process.env.APP_ENV == 'production' ? null : err.stack
    })

    if (res.headersSent) {
        return next(err)
    }

    res.status(500).json({ error: err })
}

module.exports = errorHandle