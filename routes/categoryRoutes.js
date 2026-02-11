const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");

router.get("/", controller.list);
router.get("/new", controller.create_get);
router.post("/new", controller.create_post);
router.get("/:id", controller.detail);
router.get("/:id/update", controller.update_get);
router.post("/:id/update", controller.update_post);
router.post("/:id/delete", controller.delete_post);


module.exports = router;