const express = require('express')
const router = express.Router()
const CategoryController = require('../controller/category.controller')


router.get('/', CategoryController.getAll)
router.get("/:id", CategoryController.getOne);
router.post("/create/", CategoryController.create);
router.put("/update/:id", CategoryController.update);
router.delete("/delete/:id", CategoryController.delete);

module.exports = router;