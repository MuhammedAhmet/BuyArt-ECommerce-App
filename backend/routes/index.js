const express = require("express");
const router = express.Router();
const passport = require("../auth/passport");
const middleware = require("../middleware");
// Routes
const adminRouter = require("./admin");
const authRouter = require("./auth");

router.get("/", (req, res) => {
  res.send("home page bro");
});

router.use(
  "/admin",
  passport.authenticate("bearer", { session: false }),
  middleware.isAdmin,
  adminRouter
);
router.use("/auth", authRouter);

module.exports = router;
adminRouter;
