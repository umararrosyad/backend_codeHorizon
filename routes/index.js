const express = require('express')
const rou = express.Router()
const productRouter = require('./product')
// const movieRouter = require('./movies')


rou.use('/product', productRouter)
// rou.use('/movie', movieRouter)
module.exports = rou