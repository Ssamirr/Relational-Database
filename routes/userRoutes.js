const express = require('express')
const { userController } = require('../controller/userController')
const router = express.Router()



router.get('/',userController.getAll)
router.post('/',userController.add)


module.exports = router;