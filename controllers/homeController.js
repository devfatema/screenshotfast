const index = (req, res) => {
    res.status(201).send({
        message: 'Hello World'
    })
}

module.exports = {
    index
}