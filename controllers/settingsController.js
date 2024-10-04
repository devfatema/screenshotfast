const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const User = require('../model/userModel')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');

var bucketName = process.env.AWS_BUCKET_NAME;
var region = process.env.AWS_BUCKET_REGION;
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const profileUpdate = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0]);
    }

    AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });

    const s3 = new AWS.S3({
        params: {
            Bucket: bucketName,
        },
        region: region,
    })
    
    const { name, email, username } = req.body;
    const user = await User.findOne({ email: req.email }).exec()
    const checkUsername = await User.findOne({ username: req.username }).exec()

    if (user)
    {
        if (user.email !== req.email)
        {
            return res.status(400).send({ msg: 'Email already exists' });
        }
    }

    if (checkUsername)
    {
        if (checkUsername.username !== req.username)
        {
            return res.status(400).send({ msg: 'Username already exists' });
        }
    }

    const avatar = req.files?.avatar;

    if (avatar) {
        const contentType = avatar.mimetype;

        const uuid = uuidv4();
        const timestamp = Date.now().toString();
        const originalName = path.parse(avatar.name).name.replace(/[^a-zA-Z0-9]/g, '_'); // Replaces non-alphanumeric characters with underscores
        const extension = path.extname(avatar.name);
        const file_key = `uploads/avatar/${uuid}_${timestamp}_${originalName}${extension}`;

        const params = {
            Bucket: bucketName,
            Key: file_key,
            Body: avatar.data,
            ContentType: contentType
        }

        const upload = s3.putObject(params).on('httpUploadProgress', evt => {
            console.log('uploading to s3...', parseInt((evt.loaded * 100) / evt.total).toString())
        }).promise()



        await upload.then(data => {
            console.log('SuccessFully Uploaded to S3', file_key)
        })
    } else {
        var file_key  = user.avatar
    }


    
    user.name = name;
    user.email = email;
    user.username = username;
    user.avatar = file_key;
    await user.save()

    return res.send({
        message: 'Profile Update Successfully'
    })

}

const profileData = async (req, res) => {
    const user = await User.findOne({ email: req.email }).exec()

    return res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar
    })
}

const changePassword = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0]);
    }

    const user = await User.findOne({ _id: req.id })

    const password = req.body.password
    const current_password = req.body.current_password

    if (!user.password)
    {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        user.password = hashPassword
        user.save()

        return res.status(200).send({
            message: 'The Password Successfully Updated'
        })
    } 

    const isValidPassword = await bcrypt.compare(req.body.current_password, user.password);

    if (isValidPassword) {

        if (current_password === password) {

            return res.status(401).send({
                msg: "The CurrentPassword & Password Can't be same."
            })

        } else {

            const hashPassword = await bcrypt.hash(req.body.password, 10)
            user.password = hashPassword
            user.save()

            return res.status(200).send({
                message: 'The Password Successfully Changed'
            })
        }
    } else {
        return res.status(401).send({
            msg: 'The Current Password is Invalid'
        })
    }
    
}

module.exports = {
    profileUpdate,
    profileData,
    changePassword
}