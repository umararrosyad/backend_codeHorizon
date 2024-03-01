const express = require("express");
const router = express.Router();
const rajaongkirController = require("../controllers/rajaOngkirController");

// router.post("/:user_id/addresses", rajaongkirController.create);
router.get("/cities/", rajaongkirController.getCity);
router.get("/provinces/", rajaongkirController.getProvince);
router.post("/cost/", rajaongkirController.getCost);
// router.get("/:user_id/addresses/:id", rajaongkirController.getOne);
// router.put("/:user_id/addresses/:id", rajaongkirController.update);
// router.delete("/:user_id/addresses/:id", rajaongkirController.delete);

module.exports = router;
