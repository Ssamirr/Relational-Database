const { user } = require("../models/User");
var jwt = require('jsonwebtoken');

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