const userModel = require("../model/userModel");

const sendEmail = async (req, res) => {
    const { email } = req.body

    const user = await userModel.findOne({ email: email }) 

    if (user) {
        return res.status(400).json({
            message: 'Email Already Subscribed'
        })
    }

    const newUser = new userModel();
    newUser.email = email
    await newUser.save()

    res.status(200).json({
        message: 'Email Successfully Subscribed'
    })
}

module.exports = {
    sendEmail
}