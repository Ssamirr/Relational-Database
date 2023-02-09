const { user } = require("../models/User");
var jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer')
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

console.log(MAIL_USER)
console.log(MAIL_PASSWORD)

const transporter = nodemailer.createTransport({
    direct: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    },
    secure: true
})

const userController = {
    getAll: (req, res) => {
        user.find({ isDeleted: false }, function (err, docs) {
            if (!err) {
                res.json(docs)
            }
            else {
                res.status(500).json(err);
            }
        }
        )
    },
    add: (req, res) => {
        let newUser = new user({
            userName: req.body.userName,
            password: req.body.password,
            isDeleted: false,
            date: req.body.date,
        })

        newUser.save(function (err, doc) {
            if (!err) {
                let privateKey = "ironmaiden";
                let token = jwt.sign({ userName: newUser.userName }, privateKey, {
                    algorithm: 'HS256',
                    expiresIn: '5h'
                });
                res.json({ 'token': token })

                let mailOptions = {
                    from: MAIL_USER,
                    to: doc.userName,
                    subject: 'Welcome',
                    text: 'Hello'
                };

                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        console.log("Err", err);
                    } else {
                        console.log("Success", data);
                    }
                });

            }
            else {
                res.status(500).json(err)
            }
        })
    },
}

module.exports = {
    userController
}