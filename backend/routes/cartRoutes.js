const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/",addToCart);
router.get("/",  getCart);
router.delete("/:productId",removeFromCart);

module.exports = router;
