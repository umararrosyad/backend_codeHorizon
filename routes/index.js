const express = require('express')
const router = express.Router()
const categoryRouter = require('./category')
const productRouter = require('./product')

router.get("/", (req, res) => {
    res.send("Halo, dunia!");
});
router.use('/categories', categoryRouter)
router.use('/product', productRouter)


module.exports = router;