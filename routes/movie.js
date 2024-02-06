const express = require('express')
const router = express.Router()
const MovieController = require('../controller/movie.controller')
const auth = require('../middleware/auth')

router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getOne)
router.post('/create/', auth, MovieController.create)
router.put('/update/:id', auth , MovieController.update)
router.delete('/delete/:id', auth , MovieController.delete)

module.exports = router;