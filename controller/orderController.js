const { order } = require("../models/Order");

const orderController = {
    getAll: (req, res) => {
        order.find({ isDeleted: false }).populate('categoryId')
            .populate({ path: "buyerId", populate: { path: 'buyerAdress' } })
            .exec((err, docs) => {
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
        let newProduct = new order({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productDescription: req.body.productDescription,
            categoryId: req.body.categoryId,
            buyerId: req.body.buyerId,
            isDeleted: false,
            date: req.body.date,
        })

        newProduct.save(function (err, doc) {
            if (!err) {
                res.json(doc)
            }
            else {
                res.status(500).json(err)
            }
        })
    },
    getById: (req, res) => {
        let id = req.params.id;
        order.findById(id).populate('categoryId')
            .populate({ path: "buyerId", populate: { path: 'buyerAdress' } })
            .exec((err, doc) => {
                if (!err) {
                    res.json(doc)
                } else {
                    res.status(500).json(err);
                }
            })
    },
    delete: (req, res) => {
        let id = req.params.id;
        order.findByIdAndUpdate(id, {isDeleted:true}, { new: true }, (err, doc) => {
            if (!err) {
                res.json(doc)
            } else {
                res.status(500).json(err);
            }
        })
    },
    update: (req, res) => {
        let id = req.params.id;
        order.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true }, (err, doc) => {
            if (!err) {
                res.json(doc)
            } else {
                res.status(500).json(err);
            }
        })
    }
}

module.exports = {
    orderController
}