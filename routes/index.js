const express = require('express')
const router = express.Router()
const categoryRouter = require('./category')

router.get("/", (req, res) => {
    res.send("Halo, dunia!");
});
router.use('/categories', categoryRouter)


module.exports = router;