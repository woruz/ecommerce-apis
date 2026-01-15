const router = require("express").Router();
const cartController = require("./cart.controller");
const validate = require("../../middleware/validate");
const { addToCartSchema } = require("./cart.schema");
const { authMiddleware } = require("../../middleware/auth");

router.use(authMiddleware);

router.post("/items", validate(addToCartSchema), cartController.add);
router.delete("/items/:productId", cartController.remove);
router.get("/", cartController.get);

module.exports = router;
