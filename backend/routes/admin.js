const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
///////////////////////////////////////////////////////////
router.get("/products", adminController.product.index);
router.post("/products", adminController.product.store);
router.put("/products/:id", adminController.product.update);
router.delete("/products/:id", adminController.product.delete);
router.get("/products/:id", adminController.product.show);
///////////////////////////////////////////////////////////
router.get("/artist_profile", adminController.artist_profile.index);
router.post("/artist_profile", adminController.artist_profile.store);
router.put("/artist_profile/:id", adminController.artist_profile.update);
router.delete("/artist_profile/:id", adminController.artist_profile.delete);
router.get("/artist_profile/:id", adminController.artist_profile.show);
///////////////////////////////////////////////////////////
router.get("/order", adminController.order.index);
router.post("/order", adminController.order.store);
router.put("/order/:id", adminController.order.update);
router.delete("/order/:id", adminController.order.delete);
router.get("/order/:id", adminController.order.show);
///////////////////////////////////////////////////////////
router.get("/transaction", adminController.transaction.index);
router.post("/transaction", adminController.transaction.store);
router.put("/transaction/:id", adminController.transaction.update);
router.delete("/transaction/:id", adminController.transaction.delete);
router.get("/transaction/:id", adminController.transaction.show);
///////////////////////////////////////////////////////////
router.get("/user", adminController.user.index);
router.post("/user", adminController.user.store);
router.put("/user/:id", adminController.user.update);
router.delete("/user/:id", adminController.user.delete);
router.get("/user/:id", adminController.user.show);
///////////////////////////////////////////////////////////

module.exports = router; //require('./admin')
