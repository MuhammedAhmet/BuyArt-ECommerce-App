var express = require("express");
var router = express.Router();
var passport = require("../auth/passport");

const authentication_controller = require("../controllers/authentication_controller");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

router.post("/login", authentication_controller.login);
router.get("/logout", authentication_controller.logout);
router.post("/register", authentication_controller.register);
router.get(
  "/profile",
  passport.authenticate("bearer", { session: false }),
  authentication_controller.profile
);

module.exports = router;
